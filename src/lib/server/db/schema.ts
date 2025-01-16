import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const slackSessionsTable = sqliteTable("slack_sessions", {
	sessionId: text().primaryKey(),
	userId: text().notNull(),
	name: text().notNull(),
	firstName: text().notNull(),
	pfp: text().notNull(),
	email: text().notNull(),
});

export type SlackSession = typeof slackSessionsTable.$inferSelect;