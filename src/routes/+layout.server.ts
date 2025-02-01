export async function load({ locals }) {
  // We don't want to accidentally leak data, so we take this precaution, in exchange
  // for some duplicated code
  const person = locals.person
    ? {
        doubloonsBalance: locals.person.doubloonsBalance,
        voteBalance: locals.person.voteBalance,
        shipsAwaitingVoteRequirement:
          locals.person.shipsAwaitingVoteRequirement,
        totalHoursLogged: locals.person.totalHoursLogged,
        autonumber: locals.person.autonumber,
      }
    : undefined;
  return {
    slackSession: locals.slackSession,
    person,
    ships: locals.ships,
    shopItems: locals.shopItems,
  };
}
