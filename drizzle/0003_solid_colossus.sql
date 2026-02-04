CREATE TABLE `portfolioData` (
	`id` int AUTO_INCREMENT NOT NULL,
	`portfolioId` int NOT NULL,
	`aboutMe` text,
	`skills` text,
	`experience` text,
	`education` text,
	`projects` text,
	`socialLinks` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `portfolioData_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `portfolioTemplates` (
	`id` varchar(64) NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`category` enum('professional','modern','creative') NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `portfolioTemplates_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `portfolios` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`templateId` varchar(64) NOT NULL,
	`userProfile` enum('student','fresher','professional') NOT NULL DEFAULT 'student',
	`status` enum('draft','published') NOT NULL DEFAULT 'draft',
	`shareToken` varchar(64),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `portfolios_id` PRIMARY KEY(`id`),
	CONSTRAINT `portfolios_shareToken_unique` UNIQUE(`shareToken`)
);
