import { useEffect, useRef } from "react";
import { useLocation, useParams } from "wouter";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { fadeIn, slideUp } from "@/lib/animations";
import { triggerConfetti } from "@/lib/confetti";
import { Game } from "@shared/schema";

export default function CelebrationPage() {
  const { gameId } = useParams();
  const [_, navigate] = useLocation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Fetch completed game data
  const { data: gameData } = useQuery<{
    game: Game;
    stats: {
      challengesCompleted: number;
      timeSpent: number;
      date: string;
    }
  }>({
    queryKey: ['/api/games/completed', gameId],
  });
  
  useEffect(() => {
    let cleanup: () => void;
    
    if (canvasRef.current) {
      cleanup = triggerConfetti(canvasRef.current);
    }
    
    return () => {
      if (cleanup) cleanup();
    };
  }, []);
  
  const handleShareMoment = () => {
    // Implementation for sharing
    // This could be implemented in the future
    alert("Esta funcionalidade será implementada em breve!");
  };
  
  const handleReturnHome = () => {
    navigate('/');
  };
  
  if (!gameData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-white border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  const { game, stats } = gameData;
  
  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-primary to-secondary text-white flex flex-col items-center justify-center p-8"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={fadeIn}
    >
      <div className="celebration-content text-center">
        <motion.div 
          className="inline-block p-6 bg-white/20 rounded-full mb-6"
          variants={slideUp}
          initial={{ rotate: -10, scale: 0.8, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <Trophy className="h-16 w-16" />
        </motion.div>
        
        <motion.h1 
          className="font-bold text-3xl mb-3"
          variants={slideUp}
        >
          Parabéns, Casal!
        </motion.h1>
        
        <motion.p 
          className="text-white/80 text-lg mb-8"
          variants={slideUp}
        >
          Vocês completaram o jogo "{game.title}"
        </motion.p>
        
        <motion.div 
          className="stats-container bg-white/10 rounded-xl p-6 mb-8"
          variants={slideUp}
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <h3 className="text-sm font-medium text-white/70">Desafios completados</h3>
              <p className="text-3xl font-bold">{stats.challengesCompleted}</p>
            </div>
            <div className="text-center">
              <h3 className="text-sm font-medium text-white/70">Tempo total</h3>
              <p className="text-3xl font-bold">{stats.timeSpent} min</p>
            </div>
            <div className="text-center">
              <h3 className="text-sm font-medium text-white/70">Categoria</h3>
              <p className="text-xl font-bold">
                {game.category.charAt(0).toUpperCase() + game.category.slice(1)}
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-sm font-medium text-white/70">Data</h3>
              <p className="text-xl font-bold">{stats.date}</p>
            </div>
          </div>
        </motion.div>
        
        <div className="action-buttons space-y-4">
          <motion.div variants={slideUp}>
            <Button 
              className="w-full py-3 px-8 rounded-xl bg-white text-primary font-medium"
              onClick={handleShareMoment}
            >
              Salvar momento
            </Button>
          </motion.div>
          
          <motion.div variants={slideUp}>
            <Button 
              variant="secondary"
              className="w-full py-3 px-8 rounded-xl bg-white/30 text-white font-medium"
              onClick={handleReturnHome}
            >
              Voltar ao início
            </Button>
          </motion.div>
        </div>
      </div>
      
      {/* Canvas for confetti effect */}
      <canvas 
        ref={canvasRef} 
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-50"
      />
    </motion.div>
  );
}
