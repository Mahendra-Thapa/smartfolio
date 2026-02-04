import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Portfolio table storing user's portfolio information
 */
export const portfolios = mysqlTable("portfolios", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  templateId: varchar("templateId", { length: 64 }).notNull(),
  userProfile: mysqlEnum("userProfile", ["student", "fresher", "professional"]).default("student").notNull(),
  status: mysqlEnum("status", ["draft", "published"]).default("draft").notNull(),
  shareToken: varchar("shareToken", { length: 64 }).unique(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Portfolio = typeof portfolios.$inferSelect;
export type InsertPortfolio = typeof portfolios.$inferInsert;

/**
 * Portfolio data table storing detailed portfolio content
 */
export const portfolioData = mysqlTable("portfolioData", {
  id: int("id").autoincrement().primaryKey(),
  portfolioId: int("portfolioId").notNull(),
  aboutMe: text("aboutMe"),
  skills: text("skills"),
  experience: text("experience"),
  education: text("education"),
  projects: text("projects"),
  socialLinks: text("socialLinks"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type PortfolioData = typeof portfolioData.$inferSelect;
export type InsertPortfolioData = typeof portfolioData.$inferInsert;

/**
 * Portfolio templates table
 */
export const portfolioTemplates = mysqlTable("portfolioTemplates", {
  id: varchar("id", { length: 64 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  category: mysqlEnum("category", ["professional", "modern", "creative"]).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type PortfolioTemplate = typeof portfolioTemplates.$inferSelect;
export type InsertPortfolioTemplate = typeof portfolioTemplates.$inferInsert;