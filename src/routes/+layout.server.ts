export async function load({ locals }) {
  return {
    slackSession: locals.slackSession,
    // Sanitize the person object
    person: {
      doubloonsBalance: locals.person?.doubloonsBalance,
      voteBalance: locals.person?.voteBalance,
      shipsAwaitingVoteRequirement: locals.person?.shipsAwaitingVoteRequirement,
      totalHoursLogged: locals.person?.totalHoursLogged,
      autonumber: locals.person?.autonumber,
    },
    ships: locals.ships,
    shopItems: locals.shopItems,
  };
}
