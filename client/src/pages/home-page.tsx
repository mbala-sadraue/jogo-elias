import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Shuffle, Users, UserPlus, ChevronRight, Settings, Smartphone } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import CategoryCard, { CategoryType } from "@/components/category-card";
import { fadeIn, staggerContainer, slideUp } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import DeviceInfo from "@/components/device-info";
import useCapacitor from "@/hooks/use-capacitor";

export default function HomePage() {
  const [_, navigate] = useLocation();
  const [players, setPlayers] = useState<string[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<string>("ELONDA");
  const [showDeviceInfo, setShowDeviceInfo] = useState(false);
  const { isNative } = useCapacitor();
  
  useEffect(() => {
    // Carrega os jogadores da sessionStorage
    const storedPlayers = sessionStorage.getItem("players");
    if (storedPlayers) {
      const parsedPlayers = JSON.parse(storedPlayers);
      setPlayers(parsedPlayers);
      setCurrentPlayer(parsedPlayers[0] || "ELONDA");
    } else {
      // Se não houver jogadores configurados, redireciona para a tela de configuração
      navigate("/");
    }
  }, [navigate]);

  const handleCategorySelect = (category: CategoryType) => {
    navigate(`/gameplay/${category}`);
  };
  
  const nextPlayer = () => {
    const currentIndex = players.indexOf(currentPlayer);
    const nextIndex = (currentIndex + 1) % players.length;
    setCurrentPlayer(players[nextIndex]);
  };

  const shufflePlayers = () => {
    const shuffled = [...players].sort(() => Math.random() - 0.5);
    sessionStorage.setItem("players", JSON.stringify(shuffled));
    setPlayers(shuffled);
    setCurrentPlayer(shuffled[0]);
  };
  
  const toggleDeviceInfo = () => {
    setShowDeviceInfo(!showDeviceInfo);
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-primary to-primary-dark pb-20"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={fadeIn}
    >
      <div className="relative">
        {/* Device Info Modal */}
        {showDeviceInfo && (
          <div className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-black/50">
            <div className="w-full max-w-sm">
              <DeviceInfo onClose={toggleDeviceInfo} />
            </div>
          </div>
        )}
        
        {/* Header */}
        <motion.div 
          className="p-6 rounded-b-3xl"
          variants={slideUp}
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-bold text-white text-2xl">ELONDA</h1>
              <div className="flex items-center">
                <p className="text-white/80 text-sm">Jogo para amigos</p>
                {isNative && (
                  <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full ml-2 flex items-center">
                    <Smartphone className="h-3 w-3 mr-1" />
                    App
                  </span>
                )}
              </div>
            </div>
            <div className="flex space-x-2">
              {isNative && (
                <Button 
                  variant="ghost" 
                  onClick={toggleDeviceInfo}
                  size="icon" 
                  className="p-2 rounded-full bg-white/20 text-white"
                >
                  <Smartphone className="h-5 w-5" />
                </Button>
              )}
              <Button 
                variant="ghost" 
                onClick={() => navigate("/")}
                size="icon" 
                className="p-2 rounded-full bg-white/20 text-white"
              >
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {/* Player Turn Section */}
          <motion.div 
            className="mt-8 bg-white/10 rounded-xl p-4 backdrop-blur-sm"
            variants={slideUp}
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-white text-lg font-semibold flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Turno de
              </h2>
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-2 rounded-full bg-white/20 text-white"
                onClick={shufflePlayers}
              >
                <Shuffle className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center bg-white/20 p-3 rounded-lg">
              <Avatar className="w-12 h-12 border-2 border-white">
                <AvatarFallback className="bg-primary-light text-white font-bold text-lg">
                  {currentPlayer.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="ml-3 flex-1">
                <h3 className="text-white font-bold text-xl">{currentPlayer}</h3>
                <p className="text-white/70 text-xs">É a sua vez de jogar</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="p-2 rounded-full bg-white/20 text-white"
                onClick={nextPlayer}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="mt-3 flex -space-x-2 overflow-hidden">
              {players.map((player, index) => (
                <Avatar key={index} className="inline-block w-8 h-8 border-2 border-white">
                  <AvatarFallback 
                    className={`${player === currentPlayer ? 'bg-secondary' : 'bg-primary-light'} text-white font-semibold`}
                  >
                    {player.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              ))}
              <Button 
                variant="ghost" 
                size="icon" 
                className="w-8 h-8 rounded-full bg-white/20 text-white ml-2 border-2 border-white"
                onClick={() => navigate("/")}
              >
                <UserPlus className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Category selection */}
        <div className="px-6 py-6">
          <motion.h2 
            className="font-bold text-xl text-white mb-4"
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
    </motion.div>
  );
}
