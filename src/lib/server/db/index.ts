import { drizzle } from 'drizzle-orm/libsql';
import { DATABASE_URL } from '$env/static/private';

export const db = drizzle({
    connection: {
        url: DATABASE_URL,
    }
});

export { slackSessionsTable, type SlackSession } from './schema'