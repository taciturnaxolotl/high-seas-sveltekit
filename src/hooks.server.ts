import { sequence } from "@sveltejs/kit/hooks";
import { db, slackSessionsTable } from "./lib/server/db";
import { eq } from "drizzle-orm";
import { fetchShips } from "./lib/server/data";
import airtable from "./lib/server/airtable";
import TTLCache from "@isaacs/ttlcache";
import type { FieldSet, Record as AirtableRecord } from "airtable";
import { redirect, type Handle } from "@sveltejs/kit";

const slackMiddleware: Handle = async ({ event, resolve }) => {
  const sessionId = event.cookies.get("session");
  if (!sessionId) return resolve(event);
  const slackSessions = await db
    .select()
    .from(slackSessionsTable)
    .where(eq(slackSessionsTable.sessionId, sessionId))
    .execute();
  if (slackSessions.length === 0) return resolve(event);
  const slackSession = slackSessions[0];
  event.locals.slackSession = slackSession;

  return resolve(event);
};

const personCache = new TTLCache({
  ttl: 1000 * 60 * 2,
});
const personMiddleware: Handle = async ({ event, resolve }) => {
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
  };

  console.warn("Banlist is not being checked!");
  return resolve(event);
};

const loadShipsMiddleware: Handle = async ({ event, resolve }) => {
  const isShipyardPage =
    event.url.pathname.startsWith("/shipyard") ||
    event.url.pathname.startsWith("/debug");
  if (!isShipyardPage || !event.locals.slackSession) return resolve(event);

  const ships = await fetchShips(event.locals.slackSession.userId);
  event.locals.ships = ships;

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

export const handle = sequence(
  slackMiddleware,
  redirectMiddleware,
  personMiddleware,
  loadShipsMiddleware
);
