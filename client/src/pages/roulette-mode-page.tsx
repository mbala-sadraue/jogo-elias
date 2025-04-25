import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import RouletteMode from "@/components/roulette-mode";
import { fadeIn } from "@/lib/animations";
import { motion } from "framer-motion";
import { CategoryType } from "@/components/category-card";

export default function RouletteModePage() {
  const [_, navigate] = useLocation();
  const [playerNames, setPlayerNames] = useState<string[]>([]);
  const [intensity, setIntensity] = useState<CategoryType>("picante");
  
  useEffect(() => {
    // Carregar jogadores e configurações da sessionStorage
    const storedPlayers = sessionStorage.getItem("players");
    const storedOptions = sessionStorage.getItem("gameOptions");
    
    if (storedPlayers) {
      setPlayerNames(JSON.parse(storedPlayers));
    } else {
      navigate("/");
      return;
    }
    
    if (storedOptions) {
      const options = JSON.parse(storedOptions);
      setIntensity(options.intensity || "picante");
    }
  }, [navigate]);
  
  const handleComplete = () => {
    navigate("/mode-selection");
  };
  
  const handleBack = () => {
    navigate("/mode-selection");
  };
  
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={fadeIn}
      className="min-h-screen"
    >
      <RouletteMode 
        playerNames={playerNames}
        intensity={intensity}
        onComplete={handleComplete}
        onBack={handleBack}
      />
    </motion.div>
  );
}