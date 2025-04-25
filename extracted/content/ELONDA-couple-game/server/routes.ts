import express, { type Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertChallengeSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  const apiRouter = express.Router();
  
  // Get all challenges
  apiRouter.get("/challenges", async (req, res) => {
    try {
      const challenges = await storage.getChallenges();
      res.json(challenges);
    } catch (error) {
      console.error("Error retrieving challenges:", error);
      res.status(500).json({ message: "Failed to retrieve challenges", error: error instanceof Error ? error.message : String(error) });
    }
  });
  
  // Get challenges by intensity
  apiRouter.get("/challenges/intensity/:intensity", async (req, res) => {
    try {
      const { intensity } = req.params;
      const challenges = await storage.getChallengesByIntensity(intensity);
      res.json(challenges);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve challenges by intensity" });
    }
  });
  
  // Get challenges by relationship type
  apiRouter.get("/challenges/relationship/:type", async (req, res) => {
    try {
      const { type } = req.params;
      const challenges = await storage.getChallengesByRelationship(type);
      res.json(challenges);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve challenges by relationship type" });
    }
  });
  
  // Create a new challenge
  apiRouter.post("/challenges", async (req, res) => {
    try {
      const result = insertChallengeSchema.safeParse(req.body);
      
      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ message: validationError.message });
      }
      
      const challenge = await storage.createChallenge(result.data);
      res.status(201).json(challenge);
    } catch (error) {
      res.status(500).json({ message: "Failed to create challenge" });
    }
  });
  
  // Mount the API router
  app.use("/api", apiRouter);
  
  const httpServer = createServer(app);
  
  return httpServer;
}
