CREATE TABLE `slack_sessions` (
	`sessionId` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`name` text NOT NULL,
	`firstName` text NOT NULL,
	`pfp` text NOT NULL,
	`email` text NOT NULL
);
