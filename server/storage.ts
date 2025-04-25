import { db } from "@db";
import { User, InsertUser, users, couples, Couple, InsertCouple, games, InsertGame, Game, gameChallenges, challenges, categories, stats } from "@shared/schema";
import { eq, and, desc, sql } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { pool } from "@db";
import { nanoid } from "nanoid";

const PostgresSessionStore = connectPg(session);

export interface IStorage {
  // User related methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Couple related methods
  getCouple(id: number): Promise<Couple | undefined>;
  getCoupleByUserId(userId: number): Promise<Couple | undefined>;
  createCouple(couple: InsertCouple): Promise<Couple>;
  pairCouple(coupleId: number, user2Id: number): Promise<Couple>;
  
  // Game related methods
  getGame(id: number): Promise<Game | undefined>;
  getGamesByCoupleId(coupleId: number): Promise<Game[]>;
  getRecentGame(coupleId: number): Promise<Game | undefined>;
  createGame(game: InsertGame): Promise<Game>;
  updateGameProgress(gameId: number): Promise<Game>;
  
  // Challenge related methods
  getChallengesByGameId(gameId: number): Promise<any[]>;
  markChallengeCompleted(gameId: number, challengeId: number): Promise<void>;
  markChallengeSkipped(gameId: number, challengeId: number): Promise<void>;
  
  // Stats related methods
  getCoupleStats(coupleId: number): Promise<any>;
  updateCoupleStats(coupleId: number, stats: any): Promise<void>;
  
  // Other
  generatePairingCode(): string;
  sessionStore: session.SessionStore;
}

export class DatabaseStorage implements IStorage {
  sessionStore: session.SessionStore;
  
  constructor() {
    this.sessionStore = new PostgresSessionStore({ 
      pool, 
      createTableIfMissing: true,
      tableName: 'session'
    });
  }
  
  // User related methods
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }
  
  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }
  
  async createUser(user: InsertUser): Promise<User> {
    const result = await db.insert(users).values(user).returning();
    return result[0];
  }
  
  // Couple related methods
  async getCouple(id: number): Promise<Couple | undefined> {
    const result = await db.select().from(couples).where(eq(couples.id, id));
    return result[0];
  }
  
  async getCoupleByUserId(userId: number): Promise<Couple | undefined> {
    const result = await db.select()
      .from(couples)
      .where(
        sql`${couples.user1Id} = ${userId} OR ${couples.user2Id} = ${userId}`
      );
    return result[0];
  }
  
  async createCouple(couple: InsertCouple): Promise<Couple> {
    const result = await db.insert(couples).values(couple).returning();
    
    // Initialize stats for the new couple
    await db.insert(stats).values({
      coupleId: result[0].id,
      gamesPlayed: 0,
      challengesCompleted: 0,
      challengesSkipped: 0,
      totalTimeSpent: 0,
      categoryStats: {},
    });
    
    return result[0];
  }
  
  async pairCouple(coupleId: number, user2Id: number): Promise<Couple> {
    const result = await db.update(couples)
      .set({
        user2Id,
        isPaired: true,
        updatedAt: new Date()
      })
      .where(eq(couples.id, coupleId))
      .returning();
    return result[0];
  }
  
  // Game related methods
  async getGame(id: number): Promise<Game | undefined> {
    const result = await db.select().from(games).where(eq(games.id, id));
    return result[0];
  }
  
  async getGamesByCoupleId(coupleId: number): Promise<Game[]> {
    return await db.select()
      .from(games)
      .where(eq(games.coupleId, coupleId))
      .orderBy(desc(games.startedAt));
  }
  
  async getRecentGame(coupleId: number): Promise<Game | undefined> {
    const result = await db.select()
      .from(games)
      .where(and(
        eq(games.coupleId, coupleId),
        eq(games.isCompleted, false)
      ))
      .orderBy(desc(games.startedAt))
      .limit(1);
    return result[0];
  }
  
  async createGame(game: InsertGame): Promise<Game> {
    const result = await db.insert(games).values(game).returning();
    return result[0];
  }
  
  async updateGameProgress(gameId: number): Promise<Game> {
    // Count completed challenges
    const completed = await db.select({ count: sql`count(*)` })
      .from(gameChallenges)
      .where(and(
        eq(gameChallenges.gameId, gameId),
        eq(gameChallenges.isCompleted, true)
      ));
    
    // Get total challenges
    const game = await this.getGame(gameId);
    const totalChallenges = game?.totalChallenges || 0;
    
    // Calculate progress
    const completedCount = Number(completed[0].count);
    const progress = Math.round((completedCount / totalChallenges) * 100);
    
    // Check if game is completed
    const isCompleted = completedCount === totalChallenges;
    
    // Update game
    const result = await db.update(games)
      .set({
        completedChallenges: completedCount,
        progress,
        isCompleted,
        completedAt: isCompleted ? new Date() : null,
      })
      .where(eq(games.id, gameId))
      .returning();
    
    // Update stats if game is completed
    if (isCompleted && game) {
      const coupleStats = await this.getCoupleStats(game.coupleId);
      await this.updateCoupleStats(game.coupleId, {
        gamesPlayed: coupleStats.gamesPlayed + 1,
      });
    }
    
    return result[0];
  }
  
  // Challenge related methods
  async getChallengesByGameId(gameId: number): Promise<any[]> {
    return await db.select({
      gameChallenge: gameChallenges,
      challenge: challenges,
    })
      .from(gameChallenges)
      .innerJoin(challenges, eq(gameChallenges.challengeId, challenges.id))
      .where(eq(gameChallenges.gameId, gameId))
      .orderBy(gameChallenges.order);
  }
  
  async markChallengeCompleted(gameId: number, challengeId: number): Promise<void> {
    // Mark challenge as completed
    await db.update(gameChallenges)
      .set({
        isCompleted: true,
        isSkipped: false,
        completedAt: new Date(),
      })
      .where(and(
        eq(gameChallenges.gameId, gameId),
        eq(gameChallenges.challengeId, challengeId)
      ));
    
    // Update game progress
    await this.updateGameProgress(gameId);
    
    // Update couple stats
    const game = await this.getGame(gameId);
    if (game) {
      const coupleStats = await this.getCoupleStats(game.coupleId);
      await this.updateCoupleStats(game.coupleId, {
        challengesCompleted: coupleStats.challengesCompleted + 1,
      });
    }
  }
  
  async markChallengeSkipped(gameId: number, challengeId: number): Promise<void> {
    // Mark challenge as skipped
    await db.update(gameChallenges)
      .set({
        isSkipped: true,
        completedAt: new Date(),
      })
      .where(and(
        eq(gameChallenges.gameId, gameId),
        eq(gameChallenges.challengeId, challengeId)
      ));
    
    // Update game progress
    await this.updateGameProgress(gameId);
    
    // Update couple stats
    const game = await this.getGame(gameId);
    if (game) {
      const coupleStats = await this.getCoupleStats(game.coupleId);
      await this.updateCoupleStats(game.coupleId, {
        challengesSkipped: coupleStats.challengesSkipped + 1,
      });
    }
  }
  
  // Stats related methods
  async getCoupleStats(coupleId: number): Promise<any> {
    const result = await db.select().from(stats).where(eq(stats.coupleId, coupleId));
    
    if (result.length === 0) {
      // Create stats if they don't exist
      const newStats = await db.insert(stats).values({
        coupleId,
        gamesPlayed: 0,
        challengesCompleted: 0,
        challengesSkipped: 0,
        totalTimeSpent: 0,
        categoryStats: {},
      }).returning();
      return newStats[0];
    }
    
    return result[0];
  }
  
  async updateCoupleStats(coupleId: number, updatedStats: any): Promise<void> {
    const currentStats = await this.getCoupleStats(coupleId);
    await db.update(stats)
      .set({
        ...currentStats,
        ...updatedStats,
        updatedAt: new Date(),
      })
      .where(eq(stats.coupleId, coupleId));
  }
  
  // Other
  generatePairingCode(): string {
    return nanoid(8).toUpperCase();
  }
}

export const storage = new DatabaseStorage();
