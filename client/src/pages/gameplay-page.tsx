import { useState, useEffect } from "react";
import { useLocation, useParams } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Timer, Trophy, HelpCircle, Flame } from "lucide-react";
import { fadeIn, slideFromRight } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import ChallengeCard from "@/components/challenge-card";
import { CategoryType } from "@/components/category-card";
import { useToast } from "@/hooks/use-toast";

import { GameChallenge } from "@/data/challenges";
import { getExpandedChallenges, getRandomExpandedChallenge } from "@/data/expanded-challenges";

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
  
  // Estado para alternar entre mostrar tipo ou desafio
  const [showingType, setShowingType] = useState(true);
  // Estado para armazenar o tipo atual (pergunta ou desafio)
  const [currentType, setCurrentType] = useState<"pergunta" | "desafio">("pergunta");
  
  // Carregar jogadores da sessionStorage
  useEffect(() => {
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
    
    // Inicializa o jogo com um tipo aleatório
    startNewRound();
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
  
  // Escolher um tipo aleatório entre pergunta e desafio
  const getRandomType = (): "pergunta" | "desafio" => {
    return Math.random() < 0.5 ? "pergunta" : "desafio";
  };
  
  // Iniciar uma nova rodada
  const startNewRound = () => {
    // Seleciona aleatoriamente entre pergunta ou desafio
    const newType = getRandomType();
    setCurrentType(newType);
    
    // Mostrar o tipo selecionado
    setShowingType(true);
    
    // Após 1.5 segundo, mostrar o desafio
    setTimeout(() => {
      setShowingType(false);
    }, 1500);
    
    // Resetar o índice do desafio
    setCurrentChallengeIndex(0);
  };
  
  const handleCompleteChallenge = () => {
    // Parar o timer se estiver ativo
    if (timerActive) {
      setTimerActive(false);
      setTimer(null);
    }
    
    // Incrementar o contador de desafios completados
    setCompletedChallenges(prev => prev + 1);
    
    // Avançar para o próximo jogador
    setCurrentPlayerIndex(prev => (prev + 1) % players.length);
    
    // Iniciar nova rodada
    startNewRound();
    
    toast({
      title: "Desafio concluído!",
      description: "Agora é a vez de " + players[(currentPlayerIndex + 1) % players.length]
    });
  };
  
  const handleSkipChallenge = () => {
    // Parar o timer se estiver ativo
    if (timerActive) {
      setTimerActive(false);
      setTimer(null);
    }
    
    // Avançar para o próximo jogador
    setCurrentPlayerIndex(prev => (prev + 1) % players.length);
    
    // Iniciar nova rodada
    startNewRound();
    
    toast({
      title: "Desafio pulado",
      description: "Agora é a vez de " + players[(currentPlayerIndex + 1) % players.length]
    });
  };
  
  const handleBackClick = () => {
    navigate('/home');
  };
  
  // Usar a categoria correspondente ou padrão "suave"
  const category = categoryId as CategoryType || "suave";
  
  // Obter desafios expandidos pelo tipo atual e categoria
  const getExpandedChallengesByType = (categoryType: CategoryType, challengeType: "pergunta" | "desafio"): GameChallenge[] => {
    // Usar a função de desafios expandidos que possui mais conteúdo
    return getExpandedChallenges(categoryType, challengeType);
  };
  
  // Obter desafios filtrados pelo tipo atual
  const filteredChallenges = getExpandedChallengesByType(category, currentType);
  
  if (filteredChallenges.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary to-primary-dark flex items-center justify-center">
        <div className="text-center text-white p-6">
          <h2 className="text-2xl font-bold mb-4">Nenhum {currentType} encontrado</h2>
          <p className="mb-6">Não conseguimos encontrar {currentType}s para esta categoria.</p>
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
  
  const currentChallenge = filteredChallenges[currentChallengeIndex];
  const currentPlayer = players[currentPlayerIndex] || "Jogador";
  const totalChallenges = filteredChallenges.length;
  const progress = Math.round((completedChallenges / 20) * 100); // Limitando a 20 desafios para barra de progresso
  
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
                {currentPlayer}
              </h2>
              <div className="flex items-center mt-1">
                <span className="text-xs px-2 py-0.5 bg-white/20 text-white rounded-full">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </span>
              </div>
            </div>
          </div>
          
          {/* Players */}
          {players.length > 1 && (
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
          )}
          
          {/* Progress bar */}
          <div className="mt-4 relative px-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-white/80">Progresso</span>
              <span className="text-xs text-white">
                {completedChallenges}/20
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
      
      {/* Type Indicator or Current Challenge */}
      <div className="px-4 pt-4 pb-20">
        {showingType ? (
          <motion.div 
            className="py-4"
            variants={slideFromRight}
            initial="hidden"
            animate="visible"
          >
            <div className="text-center text-white mb-6">
              <h2 className="text-2xl font-bold">
                {currentType === "pergunta" ? "Pergunta" : "Desafio"}
              </h2>
              <p className="text-white/80">É a vez de {currentPlayer}</p>
            </div>
            
            <div className="flex justify-center">
              {currentType === "pergunta" ? (
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-500/80 to-blue-700/80 flex items-center justify-center">
                  <HelpCircle className="h-16 w-16 text-white" />
                </div>
              ) : (
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-orange-500/80 to-orange-700/80 flex items-center justify-center">
                  <Flame className="h-16 w-16 text-white" />
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            className="py-4"
            variants={slideFromRight}
            key={currentChallenge?.id || "no-challenge"}
          >
            {currentChallenge && (
              <>
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
              </>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}