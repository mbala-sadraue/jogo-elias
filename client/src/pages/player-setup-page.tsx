import { useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Plus, Trash2, Heart, Users, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fadeIn, slideUp } from "@/lib/animations";

export default function PlayerSetupPage() {
  const [players, setPlayers] = useState<string[]>(["ELONDA", ""]);
  const [_, navigate] = useLocation();

  const handlePlayerNameChange = (index: number, value: string) => {
    const newPlayers = [...players];
    newPlayers[index] = value;
    setPlayers(newPlayers);
  };

  const addPlayer = () => {
    if (players.length < 6) {
      setPlayers([...players, ""]);
    }
  };

  const removePlayer = (index: number) => {
    if (players.length > 2) {
      const newPlayers = [...players];
      newPlayers.splice(index, 1);
      setPlayers(newPlayers);
    }
  };

  const handleStartGame = () => {
    // Filtra nomes vazios e armazena na sessionStorage
    const validPlayers = players.filter(name => name.trim() !== "");
    if (validPlayers.length >= 2) {
      sessionStorage.setItem("players", JSON.stringify(validPlayers));
      navigate("/home");
    }
  };

  const isFormValid = players.filter(name => name.trim() !== "").length >= 2;

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-primary to-primary-dark p-6 pt-12 flex flex-col"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={fadeIn}
    >
      <div className="max-w-md mx-auto w-full">
        <motion.div className="text-center mb-8" variants={slideUp}>
          <div className="inline-block p-5 rounded-full bg-white/10 mb-6">
            <Users className="text-white h-16 w-16" />
          </div>
          <h1 className="font-bold text-3xl text-white mb-2">
            ELONDA
          </h1>
          <p className="text-white/80 text-lg">
            Jogo para Casais e Amigos
          </p>
        </motion.div>

        <motion.div variants={slideUp} className="bg-white/10 rounded-xl p-6 backdrop-blur-sm mb-8">
          <h2 className="text-white font-bold text-xl mb-4 flex items-center">
            <Users className="mr-2 h-5 w-5" />
            Jogadores
          </h2>
          
          <div className="space-y-4">
            {players.map((player, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  placeholder={`Nome do Jogador ${index + 1}`}
                  value={player}
                  onChange={(e) => handlePlayerNameChange(index, e.target.value)}
                  className="bg-white/20 border-white/20 text-white placeholder:text-white/50 focus:border-white"
                />
                {index >= 2 && (
                  <Button 
                    variant="destructive" 
                    size="icon"
                    onClick={() => removePlayer(index)}
                    className="flex-shrink-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
          
          {players.length < 6 && (
            <Button 
              variant="outline" 
              className="mt-4 w-full text-white border-white/20 hover:bg-white/20"
              onClick={addPlayer}
            >
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Jogador
            </Button>
          )}
        </motion.div>
        
        <motion.div variants={slideUp}>
          <Button 
            className="w-full py-6 bg-white text-primary hover:bg-white/90 font-semibold text-lg flex items-center justify-center"
            onClick={handleStartGame}
            disabled={!isFormValid}
          >
            <Sparkles className="mr-2 h-5 w-5" />
            Começar o Jogo
          </Button>
          
          <p className="text-white/70 text-center mt-4 text-sm">
            Adicione pelo menos 2 jogadores para começar
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}