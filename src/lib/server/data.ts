import airtable from "./airtable"

// #region fships
export async function fetchShips(slackId: string, maxRecords?: number) {
    const filterFormula = `AND(
        TRUE(),
        '${slackId}' = {entrant__slack_id},
        {project_source} = 'high_seas',
        {ship_status} != 'deleted'
    )`
    const query: { filterByFormula?: string; maxRecords?: number } = {
        filterByFormula: filterFormula,
    }
    if (maxRecords) query.maxRecords = maxRecords
    const ships = await airtable("ships").select(query).all()

    return ships.map((r) => {
        const reshippedToIdRaw = r.fields.reshipped_to as [string] | null
        const reshippedToId = reshippedToIdRaw ? reshippedToIdRaw[0] : null

        const reshippedFromIdRaw = r.fields.reshipped_from as [string] | null
        const reshippedFromId = reshippedFromIdRaw ? reshippedFromIdRaw[0] : null
        const reshippedAll = r.fields.reshipped_all as [string] | null
        const reshippedFromAll = r.fields.reshipped_from_all as [string] | null

        const wakatimeProjectNameRaw = r.fields.wakatime_project_name as
            | string
            | null
        const wakatimeProjectNames = wakatimeProjectNameRaw
            ? wakatimeProjectNameRaw.split('$$xXseparatorXx$$')
            : []

        const ship: Ship = {
            id: r.id,
            autonumber: r.fields.autonumber as number,
            title: r.fields.title as string,
            repoUrl: r.fields.repo_url as string,
            deploymentUrl: r.fields.deploy_url as string,
            readmeUrl: r.fields.readme_url as string,
            screenshotUrl: r.fields.screenshot_url as string,
            voteRequirementMet: Boolean(r.fields.vote_requirement_met),
            voteBalanceExceedsRequirement: Boolean(
                r.fields.vote_balance_exceeds_requirement,
            ),
            matchupsCount: r.fields.matchups_count as number,
            doubloonPayout: r.fields.doubloon_payout as number,
            shipType: r.fields.ship_type as ShipType,
            shipStatus: r.fields.ship_status as ShipStatus,
            wakatimeProjectNames,
            hours: r.fields.hours as number,
            creditedHours: r.fields.credited_hours as number,
            totalHours: r.fields.total_hours as number,
            createdTime: r.fields.created_time as string,
            updateDescription: r.fields.update_description as string | null,
            reshippedFromId,
            reshippedToId,
            reshippedAll,
            reshippedFromAll,
            paidOut: Boolean(r.fields.paid_out),
            yswsType: r.fields.yswsType as YswsType,
            feedback: r.fields.ai_feedback_summary as string | null,
        }

        return ship
    }).sort((a, b) => a.autonumber - b.autonumber)
}
// #endregion fships

// #region Types
export type ShipType = 'project' | 'update'
export type ShipStatus = 'shipped' | 'staged' | 'deleted'
export type YswsType =
    | 'none'
    | 'onboard'
    | 'blot'
    | 'sprig'
    | 'bin'
    | 'hackpad'
    | 'llm'
    | 'boba'
    | 'cascade'
    | 'retrospect'
    | 'hackcraft'
    | 'cider'
    | 'browser buddy'
    | 'cargo-cult'
    | 'fraps'
    | 'riceathon'
    | 'counterspell'
    | 'anchor'
    | 'dessert'
    | 'asylum'
export interface Ship extends EditableShipFields {
    id: string // The Airtable row's ID.
    autonumber: number
    // doubloonsPaid?: number;
    matchupsCount: number
    hours: number | null
    creditedHours: number | null
    totalHours: number | null
    voteRequirementMet: boolean
    voteBalanceExceedsRequirement: boolean
    doubloonPayout: number
    shipType: ShipType
    shipStatus: ShipStatus
    wakatimeProjectNames: string[]
    createdTime: string
    updateDescription: string | null
    reshippedFromId: string | null
    reshippedToId: string | null
    reshippedAll: string[] | null
    reshippedFromAll: string[] | null
    paidOut: boolean
    yswsType: YswsType
    feedback: string | null
}
export interface EditableShipFields {
    title: string
    repoUrl: string
    deploymentUrl?: string
    readmeUrl: string
    screenshotUrl: string
}
export interface Person {
    fullName: string
    email: string
    autonumber: number
    voteBalance: number
    shipsAwaitingVoteRequirement: number
    totalHoursLogged: number
    doubloonsBalance: number
}
// #endregion Types