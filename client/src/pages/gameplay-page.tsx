import { useState, useEffect } from "react";
import { useLocation, useParams } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Users, Timer, Trophy } from "lucide-react";
import { fadeIn, slideFromRight } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import ChallengeCard from "@/components/challenge-card";
import { CategoryType } from "@/components/category-card";
import { useToast } from "@/hooks/use-toast";

import { ALL_CHALLENGES, GameChallenge, getChallengesByCategory } from "@/data/challenges";

export default function GameplayPage() {
  const { toast } = useToast();
  const { categoryId } = useParams();
  const [_, navigate] = useLocation();
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [timer, setTimer] = useState<number | null>(null);
  const [players, setPlayers] = useState<string[]>([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [completedChallenges, setCompletedChallenges] = useState(0);
  const [gameOptions, setGameOptions] = useState({ intensity: "suave" });
  const [timerActive, setTimerActive] = useState(false);
  
  useEffect(() => {
    // Carregar jogadores da sessionStorage
    const storedPlayers = sessionStorage.getItem("players");
    const storedOptions = sessionStorage.getItem("gameOptions");
    
    if (storedPlayers) {
      setPlayers(JSON.parse(storedPlayers));
    } else {
      navigate("/");
      return;
    }
    
    if (storedOptions) {
      setGameOptions(JSON.parse(storedOptions));
    }
  }, [navigate]);
  
  // Função para formatar o tempo do timer
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  // Iniciar ou parar o timer
  const toggleTimer = (durationString?: string) => {
    if (timerActive) {
      setTimerActive(false);
      setTimer(null);
      return;
    }
    
    if (!durationString) return;
    
    // Extrai o tempo da string de duração (formato: "X min" ou "Y seg")
    let seconds = 0;
    if (durationString.includes("min")) {
      const mins = parseInt(durationString.split(" ")[0]);
      seconds = mins * 60;
    } else if (durationString.includes("seg")) {
      seconds = parseInt(durationString.split(" ")[0]);
    }
    
    if (seconds > 0) {
      setTimer(seconds);
      setTimerActive(true);
    }
  };
  
  // Efeito para contar o timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (timerActive && timer !== null && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => {
          if (prev !== null && prev > 0) {
            return prev - 1;
          } else {
            setTimerActive(false);
            toast({
              title: "Tempo esgotado!",
              description: "O tempo para este desafio acabou.",
            });
            return null;
          }
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [timerActive, timer, toast]);
  
  const handleCompleteChallenge = () => {
    // Parar o timer se estiver ativo
    if (timerActive) {
      setTimerActive(false);
      setTimer(null);
    }
    
    // Incrementar o contador de desafios completados
    setCompletedChallenges(prev => prev + 1);
    
    // Avançar para o próximo desafio ou finalizar o jogo
    if (challenges && currentChallengeIndex < challenges.length - 1) {
      setCurrentChallengeIndex(prev => prev + 1);
      
      // Avançar para o próximo jogador
      setCurrentPlayerIndex(prev => (prev + 1) % players.length);
      
      toast({
        title: "Desafio concluído!",
        description: "Agora é a vez de " + players[(currentPlayerIndex + 1) % players.length]
      });
    } else {
      // Jogo completado
      toast({
        title: "Jogo finalizado!",
        description: "Todos os desafios foram completados com sucesso.",
      });
      
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  };
  
  const handleSkipChallenge = () => {
    // Parar o timer se estiver ativo
    if (timerActive) {
      setTimerActive(false);
      setTimer(null);
    }
    
    // Avançar para o próximo desafio ou finalizar o jogo
    if (challenges && currentChallengeIndex < challenges.length - 1) {
      setCurrentChallengeIndex(prev => prev + 1);
      
      // Avançar para o próximo jogador
      setCurrentPlayerIndex(prev => (prev + 1) % players.length);
      
      toast({
        title: "Desafio pulado",
        description: "Agora é a vez de " + players[(currentPlayerIndex + 1) % players.length]
      });
    } else {
      // Jogo completado
      toast({
        title: "Jogo finalizado!",
        description: "Todos os desafios foram completados.",
      });
      
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  };
  
  const handleBackClick = () => {
    navigate('/home');
  };
  
  // Usar os desafios da categoria correspondente 
  const category = categoryId as CategoryType || "suave";
  // Obter desafios e garantir que todos tenham índice
  const challenges = getChallengesByCategory(category);
  
  if (challenges.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary to-primary-dark flex items-center justify-center">
        <div className="text-center text-white p-6">
          <h2 className="text-2xl font-bold mb-4">Categoria não encontrada</h2>
          <p className="mb-6">Não conseguimos encontrar desafios para esta categoria.</p>
          <Button 
            onClick={() => navigate('/home')}
            className="bg-white text-primary hover:bg-white/90"
          >
            Voltar para o início
          </Button>
        </div>
      </div>
    );
  }
  
  const currentChallenge = challenges[currentChallengeIndex];
  const currentPlayer = players[currentPlayerIndex];
  const totalChallenges = challenges.length;
  const progress = Math.round((completedChallenges / totalChallenges) * 100);
  
  return (
    <motion.div
      className={`min-h-screen bg-gradient-${category}`}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={fadeIn}
    >
      {/* Game Header */}
      <div className="relative">
        <motion.div 
          className="p-4 rounded-b-3xl"
          variants={slideFromRight}
        >
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="icon" 
              className="p-2 rounded-full bg-white/20 text-white"
              onClick={handleBackClick}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center space-x-2">
              {timerActive && timer !== null ? (
                <div className="px-3 py-1 bg-white/20 rounded-full text-white flex items-center">
                  <Timer className="h-4 w-4 mr-1" />
                  <span>{formatTime(timer)}</span>
                </div>
              ) : (
                <div className="px-3 py-1 bg-white/20 rounded-full text-white flex items-center">
                  <Trophy className="h-4 w-4 mr-1" />
                  <span>{completedChallenges} pts</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Jogador atual */}
          <div className="mt-4 flex items-center justify-center">
            <div className="flex flex-col items-center mb-2">
              <Avatar className="w-16 h-16 border-2 border-white">
                <AvatarFallback className="bg-primary-light text-white font-bold text-xl">
                  {currentPlayer?.charAt(0).toUpperCase() || "?"}
                </AvatarFallback>
              </Avatar>
              <h2 className="font-bold text-white text-lg mt-2">
                {currentPlayer || "Jogador"}
              </h2>
              <div className="flex items-center mt-1">
                <span className="text-xs px-2 py-0.5 bg-white/20 text-white rounded-full">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </span>
              </div>
            </div>
          </div>
          
          {/* Players */}
          <div className="mt-3 flex justify-center -space-x-2 overflow-hidden">
            {players.map((player, index) => (
              <Avatar 
                key={index} 
                className={`inline-block w-8 h-8 border-2 ${currentPlayerIndex === index ? 'border-yellow-300 scale-110 z-10' : 'border-white opacity-70'} transition-all`}
              >
                <AvatarFallback 
                  className={`${currentPlayerIndex === index ? 'bg-secondary' : 'bg-primary-light'} text-white font-semibold`}
                >
                  {player.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
          
          {/* Progress bar */}
          <div className="mt-4 relative px-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-white/80">Progresso</span>
              <span className="text-xs text-white">
                {completedChallenges}/{totalChallenges}
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
      <div className="px-4 pt-4 pb-20">
        <motion.div 
          className="py-4"
          variants={slideFromRight}
          key={currentChallenge.id}
        >
          <ChallengeCard
            challenge={currentChallenge}
            onComplete={handleCompleteChallenge}
            onSkip={handleSkipChallenge}
            playerNames={[currentPlayer, players[(currentPlayerIndex + 1) % players.length]]}
          />
          
          {!timerActive && currentChallenge.duration && (
            <div className="flex justify-center mt-4">
              <Button
                variant="outline" 
                onClick={() => toggleTimer(currentChallenge.duration)}
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                <Timer className="h-4 w-4 mr-2" />
                Iniciar timer ({currentChallenge.duration})
              </Button>
            </div>
          )}
          
          {timerActive && (
            <div className="flex justify-center mt-4">
              <Button
                variant="outline" 
                onClick={() => toggleTimer()}
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                <Timer className="h-4 w-4 mr-2" />
                Parar timer
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
