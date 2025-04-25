import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { insertGameSchema, insertCoupleSchema } from "@shared/schema";
import { z } from "zod";
import { format } from "date-fns";
import { eq } from "drizzle-orm";
import { db } from "@db";
import { challenges, categories } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication routes
  setupAuth(app);
  
  // API prefix for all routes
  const apiPrefix = "/api";
  
  // ======================
  // === Couple routes ===
  // ======================
  
  // Create a couple for the current user
  app.post(`${apiPrefix}/couples`, async (req, res) => {
    try {
      if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
      
      // Check if user already has a couple
      const existingCouple = await storage.getCoupleByUserId(req.user.id);
      if (existingCouple) {
        return res.status(400).json({ message: "User already has a couple" });
      }
      
      // Generate pairing code
      const pairingCode = storage.generatePairingCode();
      
      const coupleData = {
        user1Id: req.user.id,
        pairingCode
      };
      
      const validatedData = insertCoupleSchema.parse(coupleData);
      const couple = await storage.createCouple(validatedData);
      
      return res.status(201).json(couple);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.errors });
      }
      console.error("Error creating couple:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Pair with a couple using pairing code
  app.post(`${apiPrefix}/couples/pair`, async (req, res) => {
    try {
      if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
      
      const { pairingCode } = req.body;
      if (!pairingCode) {
        return res.status(400).json({ message: "Pairing code is required" });
      }
      
      // Find the couple with this pairing code
      const couples = await db.query.couples.findMany({
        where: eq(couples.pairingCode, pairingCode)
      });
      
      if (couples.length === 0) {
        return res.status(404).json({ message: "Invalid pairing code" });
      }
      
      const couple = couples[0];
      
      // Check if couple is already paired
      if (couple.isPaired) {
        return res.status(400).json({ message: "Couple is already paired" });
      }
      
      // Check if user is trying to pair with themselves
      if (couple.user1Id === req.user.id) {
        return res.status(400).json({ message: "Cannot pair with yourself" });
      }
      
      // Update couple with user2Id
      const updatedCouple = await storage.pairCouple(couple.id, req.user.id);
      
      return res.status(200).json(updatedCouple);
    } catch (error) {
      console.error("Error pairing couple:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Get current user's couple
  app.get(`${apiPrefix}/couples/me`, async (req, res) => {
    try {
      if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
      
      const couple = await storage.getCoupleByUserId(req.user.id);
      if (!couple) {
        return res.status(404).json({ message: "No couple found" });
      }
      
      return res.status(200).json(couple);
    } catch (error) {
      console.error("Error getting couple:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // ======================
  // === Stats routes ===
  // ======================
  
  // Get couple stats
  app.get(`${apiPrefix}/stats`, async (req, res) => {
    try {
      if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
      
      const couple = await storage.getCoupleByUserId(req.user.id);
      if (!couple) {
        return res.status(404).json({ message: "No couple found" });
      }
      
      const coupleStats = await storage.getCoupleStats(couple.id);
      
      // Calculate days together
      const daysTogether = couple.daysSince;
      
      return res.status(200).json({
        daysTogether,
        gamesPlayed: coupleStats.gamesPlayed,
        challengesCompleted: coupleStats.challengesCompleted
      });
    } catch (error) {
      console.error("Error getting stats:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // ======================
  // === Game routes ===
  // ======================
  
  // Get recent games
  app.get(`${apiPrefix}/games/recent`, async (req, res) => {
    try {
      if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
      
      const couple = await storage.getCoupleByUserId(req.user.id);
      if (!couple) {
        return res.status(404).json({ message: "No couple found" });
      }
      
      // Get the most recent unfinished game if exists
      const recentGame = await storage.getRecentGame(couple.id);
      
      if (!recentGame) {
        return res.status(200).json([]);
      }
      
      return res.status(200).json([recentGame]);
    } catch (error) {
      console.error("Error getting recent games:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Create a new game
  app.post(`${apiPrefix}/games`, async (req, res) => {
    try {
      if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
      
      const couple = await storage.getCoupleByUserId(req.user.id);
      if (!couple) {
        return res.status(404).json({ message: "No couple found" });
      }
      
      // Get game data from request
      const { category } = req.body;
      if (!category) {
        return res.status(400).json({ message: "Category is required" });
      }
      
      // Get challenges for this category
      const categoryData = await db.query.categories.findFirst({
        where: eq(categories.name, category)
      });
      
      if (!categoryData) {
        return res.status(404).json({ message: "Category not found" });
      }
      
      const categoryId = categoryData.id;
      
      // Get challenges for this category
      const categoryChallenges = await db.select()
        .from(challenges)
        .where(eq(challenges.categoryId, categoryId))
        .limit(20);
      
      if (categoryChallenges.length === 0) {
        return res.status(404).json({ message: "No challenges found for this category" });
      }
      
      // Create game
      const gameData = {
        coupleId: couple.id,
        title: `${categoryData.name.charAt(0).toUpperCase() + categoryData.name.slice(1)} Game`,
        category: categoryData.name,
        totalChallenges: categoryChallenges.length,
        estimatedTime: categoryChallenges.length * 5, // Rough estimate: 5 minutes per challenge
      };
      
      const validatedData = insertGameSchema.parse(gameData);
      const game = await storage.createGame(validatedData);
      
      // Create game challenges
      const gameChallengeValues = categoryChallenges.map((challenge, index) => ({
        gameId: game.id,
        challengeId: challenge.id,
        order: index + 1,
        isCompleted: false,
        isSkipped: false,
      }));
      
      await db.insert(gameChallenges).values(gameChallengeValues);
      
      return res.status(201).json(game);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.errors });
      }
      console.error("Error creating game:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Get game data and challenges
  app.get(`${apiPrefix}/games/play/:id`, async (req, res) => {
    try {
      if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
      
      const { id } = req.params;
      
      // Check if id is a category name
      if (isNaN(Number(id))) {
        // It's a category name, create a new game
        const categoryName = id;
        
        const couple = await storage.getCoupleByUserId(req.user.id);
        if (!couple) {
          return res.status(404).json({ message: "No couple found" });
        }
        
        // Get category data
        const categoryData = await db.query.categories.findFirst({
          where: eq(categories.name, categoryName)
        });
        
        if (!categoryData) {
          return res.status(404).json({ message: "Category not found" });
        }
        
        // Get challenges for this category
        const categoryChallenges = await db.select()
          .from(challenges)
          .where(eq(challenges.categoryId, categoryData.id))
          .limit(20);
        
        if (categoryChallenges.length === 0) {
          return res.status(404).json({ message: "No challenges found for this category" });
        }
        
        // Create game
        const gameData = {
          coupleId: couple.id,
          title: `${categoryData.name.charAt(0).toUpperCase() + categoryData.name.slice(1)} Game`,
          category: categoryData.name,
          totalChallenges: categoryChallenges.length,
          estimatedTime: categoryChallenges.length * 5, // Rough estimate: 5 minutes per challenge
        };
        
        const validatedData = insertGameSchema.parse(gameData);
        const game = await storage.createGame(validatedData);
        
        // Create game challenges
        const gameChallengeValues = categoryChallenges.map((challenge, index) => ({
          gameId: game.id,
          challengeId: challenge.id,
          order: index + 1,
          isCompleted: false,
          isSkipped: false,
        }));
        
        await db.insert(gameChallenges).values(gameChallengeValues);
        
        // Get challenges for this game
        const gameChallenges = await storage.getChallengesByGameId(game.id);
        
        // Transform data
        const challenges = gameChallenges.map(gc => ({
          id: gc.challenge.id,
          title: gc.challenge.title,
          description: gc.challenge.description,
          type: gc.challenge.type,
          duration: gc.challenge.duration,
          isCompleted: gc.gameChallenge.isCompleted,
          isSkipped: gc.gameChallenge.isSkipped,
        }));
        
        return res.status(200).json({ game, challenges });
      } else {
        // It's a game ID, get game data
        const gameId = Number(id);
        const game = await storage.getGame(gameId);
        
        if (!game) {
          return res.status(404).json({ message: "Game not found" });
        }
        
        // Verify that this game belongs to the user's couple
        const couple = await storage.getCoupleByUserId(req.user.id);
        if (!couple || game.coupleId !== couple.id) {
          return res.status(403).json({ message: "Forbidden" });
        }
        
        // Get challenges for this game
        const gameChallenges = await storage.getChallengesByGameId(gameId);
        
        // Transform data
        const challenges = gameChallenges.map(gc => ({
          id: gc.challenge.id,
          title: gc.challenge.title,
          description: gc.challenge.description,
          type: gc.challenge.type,
          duration: gc.challenge.duration,
          isCompleted: gc.gameChallenge.isCompleted,
          isSkipped: gc.gameChallenge.isSkipped,
        }));
        
        return res.status(200).json({ game, challenges });
      }
    } catch (error) {
      console.error("Error getting game:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Get completed game data
  app.get(`${apiPrefix}/games/completed/:id`, async (req, res) => {
    try {
      if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
      
      const gameId = Number(req.params.id);
      const game = await storage.getGame(gameId);
      
      if (!game) {
        return res.status(404).json({ message: "Game not found" });
      }
      
      // Verify that this game belongs to the user's couple
      const couple = await storage.getCoupleByUserId(req.user.id);
      if (!couple || game.coupleId !== couple.id) {
        return res.status(403).json({ message: "Forbidden" });
      }
      
      // Calculate stats
      const gameChallenges = await storage.getChallengesByGameId(gameId);
      const completedChallenges = gameChallenges.filter(gc => gc.gameChallenge.isCompleted).length;
      
      // Calculate time spent (difference between completedAt and startedAt, in minutes)
      const timeSpent = game.completedAt ? 
        Math.round((game.completedAt.getTime() - game.startedAt.getTime()) / (1000 * 60)) : 
        0;
      
      // Format date
      const date = format(game.completedAt || game.startedAt, "dd/MM/yyyy");
      
      return res.status(200).json({
        game,
        stats: {
          challengesCompleted: completedChallenges,
          timeSpent,
          date
        }
      });
    } catch (error) {
      console.error("Error getting completed game:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // ======================
  // === Challenge routes ===
  // ======================
  
  // Mark challenge as completed
  app.post(`${apiPrefix}/challenges/:id/complete`, async (req, res) => {
    try {
      if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
      
      const challengeId = Number(req.params.id);
      const { gameId } = req.body;
      
      if (!gameId) {
        return res.status(400).json({ message: "Game ID is required" });
      }
      
      // Verify that this game belongs to the user's couple
      const game = await storage.getGame(gameId);
      if (!game) {
        return res.status(404).json({ message: "Game not found" });
      }
      
      const couple = await storage.getCoupleByUserId(req.user.id);
      if (!couple || game.coupleId !== couple.id) {
        return res.status(403).json({ message: "Forbidden" });
      }
      
      // Mark challenge as completed
      await storage.markChallengeCompleted(gameId, challengeId);
      
      // Get updated game data
      const updatedGame = await storage.getGame(gameId);
      
      return res.status(200).json(updatedGame);
    } catch (error) {
      console.error("Error completing challenge:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Mark challenge as skipped
  app.post(`${apiPrefix}/challenges/:id/skip`, async (req, res) => {
    try {
      if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
      
      const challengeId = Number(req.params.id);
      const { gameId } = req.body;
      
      if (!gameId) {
        return res.status(400).json({ message: "Game ID is required" });
      }
      
      // Verify that this game belongs to the user's couple
      const game = await storage.getGame(gameId);
      if (!game) {
        return res.status(404).json({ message: "Game not found" });
      }
      
      const couple = await storage.getCoupleByUserId(req.user.id);
      if (!couple || game.coupleId !== couple.id) {
        return res.status(403).json({ message: "Forbidden" });
      }
      
      // Mark challenge as skipped
      await storage.markChallengeSkipped(gameId, challengeId);
      
      // Get updated game data
      const updatedGame = await storage.getGame(gameId);
      
      return res.status(200).json(updatedGame);
    } catch (error) {
      console.error("Error skipping challenge:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  const httpServer = createServer(app);
  return httpServer;
}
