import { sequence } from "@sveltejs/kit/hooks";
import { db, slackSessionsTable } from "./lib/server/db";
import { eq } from "drizzle-orm";
import { fetchShips } from "./lib/server/data";
import { getShop } from "./lib/server/shop";
import airtable from "./lib/server/airtable";
import TTLCache from "@isaacs/ttlcache";
import type { FieldSet, Record as AirtableRecord } from "airtable";
import { redirect, type Handle } from "@sveltejs/kit";

const slackMiddleware: Handle = async ({ event, resolve }) => {
  const start = performance.now();
  const sessionId = event.cookies.get("session");
  if (!sessionId) return resolve(event);
  const slackSessions = await db
    .select()
    .from(slackSessionsTable)
    .where(eq(slackSessionsTable.sessionId, sessionId))
    .execute();
  if (slackSessions.length === 0) {
    console.log(
      `slackMiddleware (early exit) took ${performance.now() - start}ms`
    );
    return resolve(event);
  }
  const slackSession = slackSessions[0];
  event.locals.slackSession = slackSession;

  console.log(`slackMiddleware took ${performance.now() - start}ms`);
  return resolve(event);
};

const personCache = new TTLCache({
  ttl: 1000 * 60 * 4,
});
const personMiddleware: Handle = async ({ event, resolve }) => {
  const start = performance.now();
  const slackSession = event.locals.slackSession;
  if (!slackSession) return resolve(event);

  const person = await (async () => {
    const cachedPerson = personCache.get(slackSession.userId);
    if (cachedPerson) return cachedPerson as AirtableRecord<FieldSet>;
    const people = await airtable("people")
      .select({
        filterByFormula: `{slack_id} = "${slackSession.userId}"`,
      })
      .all();

    const person = people[0];
    personCache.set(slackSession.userId, person);
    console.log("personMiddleware - person not cached");
    return person;
  })();
  if (!person) {
    // person = await airtable('people').create({
    //     email: slackSession.email,
    //     slack_id: slackSession.userId,
    // })
    throw new Error("Not creating an Airtable person record.");
  }
  event.locals.person = {
    fullName: person.fields.full_name as string,
    email: person.fields.email as string,
    autonumber: person.fields.autonumber as number,
    voteBalance: person.fields.vote_balance as number,
    shipsAwaitingVoteRequirement: person.fields
      .ships_awaiting_vote_requirement as number,
    totalHoursLogged: person.fields.total_hours_logged as number,
    doubloonsBalance: person.fields.doubloons_balance as number,
    recordId: person.id,
  };

  console.warn("Banlist is not being checked!");
  console.log(`personMiddleware took ${performance.now() - start}ms`);
  return resolve(event);
};

const loadDataMiddleware: Handle = async ({ event, resolve }) => {
  await Promise.all([
    (async () => {
      const start = performance.now();
      if (!event.locals.slackSession) return;

      const shopItems = await getShop();
      event.locals.shopItems = shopItems;

      console.log(`loadShop took ${performance.now() - start}ms`);
    })(),
    (async () => {
      const start = performance.now();
      if (!event.locals.slackSession) return;

      const ships = await fetchShips(event.locals.slackSession.userId);
      event.locals.ships = ships;

      console.log(`loadShips took ${performance.now() - start}ms`);
    })(),
  ]);

  return resolve(event);
};

const redirectMiddleware: Handle = async ({ event, resolve }) => {
  if (
    !event.locals.slackSession &&
    event.url.pathname !== "/" &&
    event.url.pathname !== "/api/slack-callback"
  )
    return redirect(302, "/");
  return resolve(event);
};

const instrumentStartMiddleware: Handle = async ({ event, resolve }) => {
  console.log("Starting instrumentation");
  event.locals.startTime = performance.now();
  return resolve(event);
};

const instrumentEndMiddleware: Handle = async ({ event, resolve }) => {
  const endTime = performance.now();
  console.log(`Request took ${endTime - event.locals.startTime}ms`);
  return resolve(event);
};

export const handle = sequence(
  instrumentStartMiddleware,
  slackMiddleware,
  redirectMiddleware,
  personMiddleware,
  loadDataMiddleware,
  instrumentEndMiddleware
);
