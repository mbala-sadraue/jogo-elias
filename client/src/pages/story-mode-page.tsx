import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import StoryMode from "@/components/story-mode";
import { fadeIn } from "@/lib/animations";
import { motion } from "framer-motion";

export default function StoryModePage() {
  const [_, navigate] = useLocation();
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
      <StoryMode 
        playerNames={playerNames}
        onComplete={handleComplete}
        onBack={handleBack}
      />
    </motion.div>
  );
}