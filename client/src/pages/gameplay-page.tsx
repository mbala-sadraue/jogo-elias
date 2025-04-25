import { useState, useEffect } from "react";
import { useLocation, useParams } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fadeIn, slideFromRight } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import ChallengeCard from "@/components/challenge-card";
import { CategoryType } from "@/components/category-card";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Challenge, Game } from "@shared/schema";

export default function GameplayPage() {
  const { categoryId } = useParams();
  const [_, navigate] = useLocation();
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  
  // Fetch game data
  const { data: gameData, isLoading } = useQuery<{
    game: Game;
    challenges: Challenge[];
  }>({
    queryKey: ['/api/games/play', categoryId],
  });
  
  const completeMutation = useMutation({
    mutationFn: async (challengeId: string) => {
      const res = await apiRequest('POST', `/api/challenges/${challengeId}/complete`, {
        gameId: gameData?.game.id
      });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/games/play', categoryId] });
      
      // Move to next challenge
      if (gameData && currentChallengeIndex < gameData.challenges.length - 1) {
        setCurrentChallengeIndex(prev => prev + 1);
      } else {
        // Game completed
        navigate(`/celebration/${gameData?.game.id}`);
      }
    }
  });
  
  const skipMutation = useMutation({
    mutationFn: async (challengeId: string) => {
      const res = await apiRequest('POST', `/api/challenges/${challengeId}/skip`, {
        gameId: gameData?.game.id
      });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/games/play', categoryId] });
      
      // Move to next challenge
      if (gameData && currentChallengeIndex < gameData.challenges.length - 1) {
        setCurrentChallengeIndex(prev => prev + 1);
      } else {
        // Game completed
        navigate(`/celebration/${gameData?.game.id}`);
      }
    }
  });
  
  const handleCompleteChallenge = () => {
    if (gameData) {
      completeMutation.mutate(gameData.challenges[currentChallengeIndex].id);
    }
  };
  
  const handleSkipChallenge = () => {
    if (gameData) {
      skipMutation.mutate(gameData.challenges[currentChallengeIndex].id);
    }
  };
  
  const handleBackClick = () => {
    navigate('/');
  };
  
  if (isLoading || !gameData) {
    return (
      <div className="min-h-screen bg-light dark:bg-dark flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  const game = gameData.game;
  const challenges = gameData.challenges;
  const currentChallenge = challenges[currentChallengeIndex];
  const category = game.category as CategoryType;
  const progress = Math.round((game.completedChallenges / game.totalChallenges) * 100);
  
  return (
    <motion.div
      className="min-h-screen bg-light dark:bg-dark"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={fadeIn}
    >
      {/* Game Header */}
      <div className="relative">
        <motion.div 
          className={`bg-${category} p-4 rounded-b-3xl`}
          variants={slideFromRight}
        >
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className="p-2 rounded-full bg-white/20 text-white mr-3"
              onClick={handleBackClick}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="font-bold text-white text-xl">{game.title}</h1>
              <div className="flex items-center">
                <span className="text-xs px-2 py-0.5 bg-white/20 text-white rounded-full mr-2">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </span>
                <div className="flex items-center">
                  <span className="text-white/80 text-xs">~{game.estimatedTime} min</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="mt-4 relative pt-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-white/80">Progresso</span>
              <span className="text-xs text-white">
                {game.completedChallenges}/{game.totalChallenges}
              </span>
            </div>
            <Progress 
              value={progress} 
              className="h-2 bg-white/20"
              indicatorClassName="bg-white/50"
            />
          </div>
        </motion.div>
      </div>
      
      {/* Current Card/Challenge */}
      <div className="px-4 pt-8 pb-24">
        <motion.div 
          className="py-4"
          variants={slideFromRight}
          key={currentChallenge.id}
        >
          <ChallengeCard
            challenge={{
              id: currentChallenge.id,
              title: currentChallenge.title,
              description: currentChallenge.description,
              type: currentChallenge.type,
              duration: currentChallenge.duration,
              index: currentChallengeIndex + 1,
              category: category
            }}
            onComplete={handleCompleteChallenge}
            onSkip={handleSkipChallenge}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
