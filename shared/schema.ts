import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const challenges = pgTable("challenges", {
  id: serial("id").primaryKey(),
  text: text("text").notNull(),      // Texto em português (padrão)
  text_en: text("text_en"),          // Texto em inglês
  text_es: text("text_es"),          // Texto em espanhol
  text_ru: text("text_ru"),          // Texto em russo
  text_fr: text("text_fr"),          // Texto em francês
  intensity: text("intensity").notNull(),
  relationshipType: text("relationshipType"),
  type: text("type"),
  requiresPair: boolean("requiresPair"),
  hasForbiddenVersion: boolean("hasForbiddenVersion"),
  forbiddenText: text("forbiddenText"),
  forbiddenText_en: text("forbiddenText_en"),
  forbiddenText_es: text("forbiddenText_es"),
  forbiddenText_ru: text("forbiddenText_ru"),
  forbiddenText_fr: text("forbiddenText_fr"),
  tags: text("tags").array(),
  isReward: boolean("isReward"),     // Indica se é um prêmio
});

export const insertChallengeSchema = createInsertSchema(challenges).pick({
  text: true,
  text_en: true,
  text_es: true,
  text_ru: true,
  text_fr: true,
  intensity: true,
  relationshipType: true,
  type: true,
  requiresPair: true,
  hasForbiddenVersion: true,
  forbiddenText: true,
  forbiddenText_en: true,
  forbiddenText_es: true,
  forbiddenText_ru: true,
  forbiddenText_fr: true,
  tags: true,
  isReward: true,
});

export type InsertChallenge = z.infer<typeof insertChallengeSchema>;
export type Challenge = typeof challenges.$inferSelect;
