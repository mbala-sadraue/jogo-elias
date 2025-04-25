import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import GameModeSelector from "@/components/game-mode-selector";
import { GameMode } from "@/types/game-modes";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { fadeIn, slideFromRight } from "@/lib/animations";
import { useToast } from "@/hooks/use-toast";

export default function ModeSelectionPage() {
  const [_, navigate] = useLocation();
  const { toast } = useToast();
  const [playerNames, setPlayerNames] = useState<string[]>([]);
  
  useEffect(() => {
    // Carregar jogadores da sessionStorage
    const storedPlayers = sessionStorage.getItem("players");
    
    if (storedPlayers) {
      setPlayerNames(JSON.parse(storedPlayers));
    } else {
      navigate("/");
      return;
    }
  }, [navigate]);
  
  const handleModeSelect = (mode: GameMode) => {
    switch (mode) {
      case "classic":
        navigate("/home");
        break;
      case "story":
        navigate("/story-mode");
        break;
      case "roleplay":
        navigate("/roleplay-mode");
        break;
      case "roulette":
        navigate("/roulette-mode");
        break;
      case "mood-gauge":
        toast({
          title: "Modo em Desenvolvimento",
          description: "O Medidor de Clima estará disponível em breve!",
          variant: "default"
        });
        break;
      case "secret-vault":
        toast({
          title: "Modo em Desenvolvimento",
          description: "O Cofre Secreto estará disponível em breve!",
          variant: "default"
        });
        break;
      case "sync-challenge":
        toast({
          title: "Modo em Desenvolvimento",
          description: "Os Desafios em Dupla estarão disponíveis em breve!",
          variant: "default"
        });
        break;
      default:
        navigate("/home");
    }
  };
  
  const handleBack = () => {
    navigate("/");
  };
  
  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-primary to-primary-dark pb-20"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={fadeIn}
    >
      <div className="container pt-8 px-4">
        <motion.div variants={slideFromRight} className="mb-6">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleBack}
            className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </motion.div>
        
        <motion.h1 
          className="text-3xl md:text-4xl font-bold text-white text-center mb-4"
          variants={slideFromRight}
        >
          ELONDA
        </motion.h1>
        
        <motion.p 
          className="text-white/80 text-center mb-8"
          variants={slideFromRight}
          custom={1}
        >
          Olá, {playerNames.join(" & ")}! Escolha um modo de jogo para começar:
        </motion.p>
        
        <GameModeSelector onSelectMode={handleModeSelect} />
      </div>
    </motion.div>
  );
}