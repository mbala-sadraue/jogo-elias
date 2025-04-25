import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Settings, Heart } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CategoryCard, { CategoryType } from "@/components/category-card";
import RecentGameCard from "@/components/recent-game-card";
import StatsCard from "@/components/stats-card";
import BottomNav from "@/components/bottom-nav";
import { useAuth } from "@/hooks/use-auth";
import { fadeIn, staggerContainer, slideUp } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import { Game } from "@shared/schema";

export default function HomePage() {
  const { user } = useAuth();
  const [_, navigate] = useLocation();

  // Fetch user stats
  const { data: stats } = useQuery<{
    daysTogether: number;
    gamesPlayed: number;
    challengesCompleted: number;
  }>({
    queryKey: ["/api/stats"],
  });

  // Fetch recent games
  const { data: recentGames } = useQuery<Game[]>({
    queryKey: ["/api/games/recent"],
  });

  const handleCategorySelect = (category: CategoryType) => {
    navigate(`/gameplay/${category}`);
  };

  const handleContinueGame = (gameId: string) => {
    navigate(`/gameplay/${gameId}`);
  };

  return (
    <motion.div
      className="min-h-screen bg-light dark:bg-dark pb-20"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={fadeIn}
    >
      <div className="relative">
        {/* Header */}
        <motion.div 
          className="bg-primary p-4 rounded-b-3xl"
          variants={slideUp}
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-bold text-white text-xl">Olá, {user?.username}!</h1>
              <p className="text-white/80 text-sm">O que vamos jogar hoje?</p>
            </div>
            <div className="flex items-center">
              <div className="flex -space-x-2">
                {/* Avatar 1 - User */}
                <Avatar className="w-10 h-10 border-2 border-white">
                  <AvatarFallback className="bg-primary-light text-white">
                    {user?.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                
                {/* Avatar 2 - Partner (if exists) */}
                <Avatar className="w-10 h-10 border-2 border-white">
                  <AvatarFallback className="bg-secondary-light text-white">
                    <Heart className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
              </div>
              <Button variant="ghost" size="icon" className="ml-4 p-2 rounded-full bg-white/20 text-white">
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {/* Stats cards */}
          <motion.div 
            className="mt-6 pb-2 overflow-x-auto no-scrollbar flex space-x-4 px-1"
            variants={staggerContainer}
          >
            <StatsCard 
              title="Dias juntos" 
              value={stats?.daysTogether || 0} 
            />
            <StatsCard 
              title="Jogos" 
              value={stats?.gamesPlayed || 0} 
            />
            <StatsCard 
              title="Desafios" 
              value={stats?.challengesCompleted || 0} 
            />
          </motion.div>
        </motion.div>
        
        {/* Recent & Continue */}
        <div className="px-4 py-6">
          {recentGames && recentGames.length > 0 && (
            <motion.div variants={slideUp}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-medium text-lg text-dark dark:text-light">Continue de onde parou</h2>
                <button className="text-primary text-sm font-medium">Ver todos</button>
              </div>
              
              {/* Recent game card */}
              <RecentGameCard 
                game={recentGames[0]} 
                onContinue={handleContinueGame} 
              />
            </motion.div>
          )}
          
          {/* Category selection */}
          <motion.h2 
            className="font-medium text-lg text-dark dark:text-light mb-4"
            variants={slideUp}
          >
            Escolha uma categoria
          </motion.h2>
          
          <motion.div 
            className="grid grid-cols-2 gap-4"
            variants={staggerContainer}
          >
            <motion.div variants={slideUp}>
              <CategoryCard 
                category="suave" 
                onClick={handleCategorySelect} 
              />
            </motion.div>
            <motion.div variants={slideUp}>
              <CategoryCard 
                category="picante" 
                onClick={handleCategorySelect} 
              />
            </motion.div>
            <motion.div variants={slideUp}>
              <CategoryCard 
                category="selvagem" 
                onClick={handleCategorySelect} 
              />
            </motion.div>
            <motion.div variants={slideUp}>
              <CategoryCard 
                category="extremo" 
                onClick={handleCategorySelect} 
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Bottom Navigation */}
      <BottomNav />
    </motion.div>
  );
}
