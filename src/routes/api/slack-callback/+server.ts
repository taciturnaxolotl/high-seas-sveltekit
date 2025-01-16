import { PUBLIC_SLACK_CLIENT_ID } from '$env/static/public';
import { SLACK_CLIENT_SECRET } from '$env/static/private';
import { MISSING_SLACK_OAUTH_CODE, BAD_SLACK_OPENID_RESPONSE_STATUS, INVALID_SLACK_OAUTH_CODE, WRONG_SLACK_WORKSPACE } from "$lib/server/errors";
import { parseJwt, generateToken } from "$lib/server/auth";
import { db, slackSessionsTable } from "$lib/server/db";
import { json, redirect } from '@sveltejs/kit';

export async function GET({ url, cookies }) {
    const searchParams = url.searchParams;
    const code = searchParams.get('code');
    if (!code) {
        return json({ error: MISSING_SLACK_OAUTH_CODE }, { status: 400 })
    }

    const exchangeUrl = new URL("https://slack.com/api/openid.connect.token");
    const exchangeSearchParams = exchangeUrl.searchParams;
    exchangeSearchParams.append('client_id', PUBLIC_SLACK_CLIENT_ID);
    exchangeSearchParams.append('client_secret', SLACK_CLIENT_SECRET);
    exchangeSearchParams.append('code', code);

    const oidcResponse = await fetch(exchangeUrl, { method: 'POST' })
    if (oidcResponse.status !== 200) {
        return json({ error: BAD_SLACK_OPENID_RESPONSE_STATUS }, { status: 400 })
    }

    const responseJson = await oidcResponse.json()
    if (!responseJson.ok) {
        console.error(responseJson)
        return json(
            { error: responseJson.error === "invalid_code" ? INVALID_SLACK_OAUTH_CODE : BAD_SLACK_OPENID_RESPONSE_STATUS },
            { status: 401 }
        );
    }

    const jwt = parseJwt(responseJson.id_token)
    if (jwt["https://slack.com/team_domain"] !== "hackclub") {
        return json({ error: WRONG_SLACK_WORKSPACE }, { status: 401 });
    }

    const sessionId = generateToken();
    await db.insert(slackSessionsTable).values({
        sessionId,
        userId: jwt["https://slack.com/user_id"],
        name: jwt.name,
        firstName: jwt.given_name,
        pfp: jwt.picture,
        email: jwt.email,
    })
    cookies.set("session", sessionId, { path: "/" })

    throw redirect(301, "/shipyard");
}
