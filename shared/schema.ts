import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Couples table - to link two users together
export const couples = pgTable("couples", {
  id: serial("id").primaryKey(),
  user1Id: integer("user1_id").references(() => users.id).notNull(),
  user2Id: integer("user2_id").references(() => users.id),
  pairingCode: text("pairing_code").notNull().unique(),
  isPaired: boolean("is_paired").default(false).notNull(),
  daysSince: integer("days_since").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Game categories
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  description: text("description").notNull(),
  color: text("color").notNull(),
  icon: text("icon").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Challenges table
export const challenges = pgTable("challenges", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  type: text("type").notNull(), // "desafio", "pergunta", etc.
  duration: text("duration").notNull(),
  categoryId: integer("category_id").references(() => categories.id).notNull(),
  difficulty: integer("difficulty").default(1).notNull(), // 1-5
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Games table - a session of gameplay
export const games = pgTable("games", {
  id: serial("id").primaryKey(),
  coupleId: integer("couple_id").references(() => couples.id).notNull(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  isCompleted: boolean("is_completed").default(false).notNull(),
  completedChallenges: integer("completed_challenges").default(0).notNull(),
  totalChallenges: integer("total_challenges").notNull(),
  estimatedTime: integer("estimated_time").notNull(),
  progress: integer("progress").default(0).notNull(),
  startedAt: timestamp("started_at").defaultNow().notNull(),
  completedAt: timestamp("completed_at"),
});

// Game challenges - links challenges to specific games
export const gameChallenges = pgTable("game_challenges", {
  id: serial("id").primaryKey(),
  gameId: integer("game_id").references(() => games.id).notNull(),
  challengeId: integer("challenge_id").references(() => challenges.id).notNull(),
  order: integer("order").notNull(),
  isCompleted: boolean("is_completed").default(false).notNull(),
  isSkipped: boolean("is_skipped").default(false).notNull(),
  completedAt: timestamp("completed_at"),
});

// Stats table - to store couple achievements and statistics
export const stats = pgTable("stats", {
  id: serial("id").primaryKey(),
  coupleId: integer("couple_id").references(() => couples.id).notNull(),
  gamesPlayed: integer("games_played").default(0).notNull(),
  challengesCompleted: integer("challenges_completed").default(0).notNull(),
  challengesSkipped: integer("challenges_skipped").default(0).notNull(),
  totalTimeSpent: integer("total_time_spent").default(0).notNull(), // in minutes
  categoryStats: jsonb("category_stats").default({}).notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  couples1: many(couples, { relationName: "user1_couples" }),
  couples2: many(couples, { relationName: "user2_couples" }),
}));

export const couplesRelations = relations(couples, ({ one, many }) => ({
  user1: one(users, {
    fields: [couples.user1Id],
    references: [users.id],
    relationName: "user1_couples",
  }),
  user2: one(users, {
    fields: [couples.user2Id],
    references: [users.id],
    relationName: "user2_couples",
  }),
  games: many(games),
  stats: many(stats),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  challenges: many(challenges),
}));

export const challengesRelations = relations(challenges, ({ one, many }) => ({
  category: one(categories, {
    fields: [challenges.categoryId],
    references: [categories.id],
  }),
  gameChallenges: many(gameChallenges),
}));

export const gamesRelations = relations(games, ({ one, many }) => ({
  couple: one(couples, {
    fields: [games.coupleId],
    references: [couples.id],
  }),
  gameChallenges: many(gameChallenges),
}));

export const gameChallengesRelations = relations(gameChallenges, ({ one }) => ({
  game: one(games, {
    fields: [gameChallenges.gameId],
    references: [games.id],
  }),
  challenge: one(challenges, {
    fields: [gameChallenges.challengeId],
    references: [challenges.id],
  }),
}));

export const statsRelations = relations(stats, ({ one }) => ({
  couple: one(couples, {
    fields: [stats.coupleId],
    references: [couples.id],
  }),
}));

// Schemas for validation
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertCoupleSchema = createInsertSchema(couples).pick({
  user1Id: true,
  pairingCode: true,
});

export const insertGameSchema = createInsertSchema(games).pick({
  coupleId: true,
  title: true,
  category: true,
  totalChallenges: true,
  estimatedTime: true,
});

export const insertChallengeSchema = createInsertSchema(challenges);
export const insertCategorySchema = createInsertSchema(categories);

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertCouple = z.infer<typeof insertCoupleSchema>;
export type InsertGame = z.infer<typeof insertGameSchema>;
export type InsertChallenge = z.infer<typeof insertChallengeSchema>;
export type InsertCategory = z.infer<typeof insertCategorySchema>;

export type User = typeof users.$inferSelect;
export type Couple = typeof couples.$inferSelect;
export type Game = typeof games.$inferSelect;
export type Challenge = typeof challenges.$inferSelect;
export type Category = typeof categories.$inferSelect;
export type GameChallenge = typeof gameChallenges.$inferSelect;
export type Stat = typeof stats.$inferSelect;
