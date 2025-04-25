import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useParams } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Timer, Trophy, HelpCircle, Flame, Gift, AlertTriangle, RotateCcw } from "lucide-react";
import { fadeIn, slideFromRight } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import ChallengeCard from "@/components/challenge-card";
import { CategoryType } from "@/components/category-card";
import { useToast } from "@/hooks/use-toast";

import { ChallengeType, GameChallenge } from "@/data/challenges";
import { getExpandedChallenges, getRandomExpandedChallenge } from "@/data/expanded-challenges";

// Interface para a roleta de tipos de conteúdo
interface RouletteItem {
  type: ChallengeType;
  icon: React.ElementType;
  label: string;
  color: string;
  bgClass: string;
}

export default function GameplayPage() {
  const { toast } = useToast();
  const { categoryId } = useParams();
  const [_, navigate] = useLocation();
  const [timer, setTimer] = useState<number | null>(null);
  const [players, setPlayers] = useState<string[]>([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [completedChallenges, setCompletedChallenges] = useState(0);
  const [gameOptions, setGameOptions] = useState({
    intensity: "suave",
    timer: true,
    challengeInPairs: false,
    dynamicIntensity: false,
    competitiveMode: false,
    partyMode: false
  });
  const [timerActive, setTimerActive] = useState(false);
  
  // Estado para indicar se estamos em modo roleta (selecionando tipo)
  const [rouletteMode, setRouletteMode] = useState(true);
  // Estado para armazenar o desafio atual
  const [currentChallenge, setCurrentChallenge] = useState<GameChallenge | null>(null);
  // Estado para armazenar se a roleta está girando
  const [isSpinning, setIsSpinning] = useState(false);
  // Estado para armazenar o tipo de conteúdo selecionado
  const [selectedContentType, setSelectedContentType] = useState<ChallengeType>("desafio");
  // Pares de jogadores quando necessário
  const [pairPlayerIndices, setPairPlayerIndices] = useState<number[]>([]);
  
  // Usar a categoria correspondente ou padrão "suave"
  const category = categoryId as CategoryType || "suave";
  
  // Configuração da roleta de tipos de conteúdo
  const rouletteItems: RouletteItem[] = [
    { 
      type: "pergunta", 
      icon: HelpCircle, 
      label: "Pergunta", 
      color: "bg-blue-500", 
      bgClass: "from-blue-500 to-blue-700"
    },
    { 
      type: "desafio", 
      icon: Flame, 
      label: "Desafio", 
      color: "bg-red-500", 
      bgClass: "from-red-500 to-red-700"
    },
    { 
      type: "prêmio", 
      icon: Gift, 
      label: "Prêmio", 
      color: "bg-green-500", 
      bgClass: "from-green-500 to-green-700"
    },
    { 
      type: "penalidade", 
      icon: AlertTriangle, 
      label: "Penalidade", 
      color: "bg-yellow-500", 
      bgClass: "from-yellow-500 to-yellow-700"
    }
  ];
  
  // Carregar jogadores e opções do jogo da sessionStorage
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
    
    // Inicializar o modo roleta
    setRouletteMode(true);
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
    
    // Extrai o tempo da string de duração (formato: "Xmin" ou "Ys")
    let seconds = 0;
    if (durationString.includes("min")) {
      const mins = parseInt(durationString.split("min")[0]);
      seconds = mins * 60;
    } else if (durationString.includes("s")) {
      seconds = parseInt(durationString.split("s")[0]);
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
  
  // Calcular a intensidade dinâmica com base na rodada atual
  const getCurrentIntensity = useCallback((): CategoryType => {
    if (!gameOptions.dynamicIntensity) return category;

    // A intensidade aumenta a cada 3 rodadas
    const intensityLevels: CategoryType[] = ['suave', 'picante', 'selvagem', 'extremo'];
    const currentIntensityIndex = intensityLevels.indexOf(category);
    const roundFactor = Math.floor((completedChallenges) / 3);
    const newIntensityIndex = Math.min(currentIntensityIndex + roundFactor, intensityLevels.length - 1);

    return intensityLevels[newIntensityIndex];
  }, [category, completedChallenges, gameOptions.dynamicIntensity]);
  
  // Selecionar aleatoriamente um parceiro para desafios em pares
  const selectRandomPair = useCallback(() => {
    if (players.length < 2) return;
    
    const currentIdx = currentPlayerIndex;
    let otherPlayerIndices = Array.from({length: players.length}, (_, i) => i).filter(i => i !== currentIdx);

    // Embaralhar para escolher aleatoriamente
    otherPlayerIndices.sort(() => Math.random() - 0.5);

    // Selecionar o primeiro jogador diferente
    setPairPlayerIndices([currentIdx, otherPlayerIndices[0]]);
  }, [currentPlayerIndex, players.length]);

  // Preparar novo desafio
  const prepareNewChallenge = useCallback(() => {
    const currentIntensity = getCurrentIntensity();
    
    // Selecionar um desafio aleatório da categoria e tipo selecionado
    const newChallenge = getRandomExpandedChallenge(currentIntensity, selectedContentType);
    
    // Se for um desafio em pares, selecionar os jogadores
    if (gameOptions.challengeInPairs && players.length >= 2) {
      selectRandomPair();
    }
    
    // Estabelecer o desafio atual
    setCurrentChallenge(newChallenge);
    
    // Desativar modo roleta
    setRouletteMode(false);
    
    // Resetar estado da roleta
    setIsSpinning(false);
  }, [selectedContentType, getCurrentIntensity, gameOptions.challengeInPairs, players.length, selectRandomPair]);
  
  // Função para girar a roleta e selecionar um tipo
  const handleSpinRoulette = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    
    // Simular a roleta girando
    const spinDuration = 2000; // 2 segundos
    const intervalTime = 100; // Mudar a cada 100ms para efeito visual
    
    let counter = 0;
    const maxCycles = spinDuration / intervalTime;
    
    const interval = setInterval(() => {
      counter++;
      // Mudar o tipo de conteúdo para simular a roleta girando
      const randomIndex = Math.floor(Math.random() * rouletteItems.length);
      setSelectedContentType(rouletteItems[randomIndex].type);
      
      // Parar após um tempo definido
      if (counter >= maxCycles) {
        clearInterval(interval);
        
        // Selecionar um resultado final aleatório
        const finalIndex = Math.floor(Math.random() * rouletteItems.length);
        const finalType = rouletteItems[finalIndex].type;
        setSelectedContentType(finalType);
        
        setTimeout(() => {
          setIsSpinning(false);
          // Preparar desafio após a roleta parar
          if (!gameOptions.partyMode) {
            prepareNewChallenge();
          }
        }, 500);
      }
    }, intervalTime);
  };
  
  // Selecionar diretamente um tipo da roleta
  const handleRouletteSelect = (contentType: ChallengeType) => {
    setSelectedContentType(contentType);
    
    // Se estiver no modo festa, manter a roleta ativa
    if (!gameOptions.partyMode) {
      setRouletteMode(false);
      // Preparar desafio
      prepareNewChallenge();
    }
  };
  
  // Obter nomes de jogadores para desafio em pares
  const getPairPlayerNames = (): string[] => {
    if (pairPlayerIndices.length !== 2) return [players[currentPlayerIndex]];
    return pairPlayerIndices.map(index => players[index]);
  };
  
  // Lidar com o desafio concluído
  const handleCompleteChallenge = () => {
    // Parar o timer se estiver ativo
    if (timerActive) {
      setTimerActive(false);
      setTimer(null);
    }
    
    // Incrementar o contador de desafios completados
    setCompletedChallenges(prev => prev + 1);
    
    // Avançar para o próximo jogador
    const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
    setCurrentPlayerIndex(nextPlayerIndex);
    
    // Verificar se deve repetir o mesmo jogador (caso seja um prêmio)
    if (selectedContentType === 'prêmio') {
      toast({
        title: "Prêmio concluído!",
        description: `${players[currentPlayerIndex]}, você ganhou mais um turno!`
      });
      
      // Voltar para a roleta para o mesmo jogador
      setRouletteMode(true);
    } else {
      // Mostrar toast de conclusão
      toast({
        title: "Desafio concluído!",
        description: "Agora é a vez de " + players[nextPlayerIndex]
      });
      
      // Voltar para o modo roleta
      setRouletteMode(true);
    }
  };
  
  // Lidar com pular desafio
  const handleSkipChallenge = () => {
    // Parar o timer se estiver ativo
    if (timerActive) {
      setTimerActive(false);
      setTimer(null);
    }
    
    // Se estiver em modo competitivo, aplicar uma penalidade
    if (gameOptions.competitiveMode) {
      setSelectedContentType('penalidade');
      prepareNewChallenge();
      
      toast({
        title: "Desafio pulado!",
        description: "Você receberá uma penalidade.",
        variant: "destructive"
      });
    } else {
      // Avançar para o próximo jogador
      const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
      setCurrentPlayerIndex(nextPlayerIndex);
      
      // Mostrar toast de desafio pulado
      toast({
        title: "Desafio pulado",
        description: "Agora é a vez de " + players[nextPlayerIndex]
      });
      
      // Voltar para o modo roleta
      setRouletteMode(true);
    }
  };
  
  // Voltar para a página inicial
  const handleBackClick = () => {
    navigate('/home');
  };
  
  // Encontrar item da roleta pelo tipo
  const getRouletteItemByType = (type: ChallengeType): RouletteItem => {
    return rouletteItems.find(item => item.type === type) || rouletteItems[0];
  };
  
  // Obter desafios filtrados pelo tipo atual
  const filteredChallenges = getExpandedChallenges(category, selectedContentType);
  
  if (filteredChallenges.length === 0 && !rouletteMode) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary to-primary-dark flex items-center justify-center">
        <div className="text-center text-white p-6">
          <h2 className="text-2xl font-bold mb-4">Nenhum {selectedContentType} encontrado</h2>
          <p className="mb-6">Não conseguimos encontrar {selectedContentType}s para esta categoria.</p>
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
  
  const currentPlayer = players[currentPlayerIndex] || "Jogador";
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
                  {getCurrentIntensity().charAt(0).toUpperCase() + getCurrentIntensity().slice(1)}
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
      
      {/* Roulette Mode or Current Challenge */}
      <div className="px-4 pt-4 pb-20">
        {rouletteMode ? (
          <motion.div 
            className="py-4"
            variants={slideFromRight}
            initial="hidden"
            animate="visible"
          >
            <div className="text-center text-white mb-6">
              <h2 className="text-2xl font-bold">
                Escolha o seu destino
              </h2>
              <p className="text-white/80">É a vez de {currentPlayer}</p>
            </div>
            
            {/* Roulette Wheel */}
            <div className="flex flex-col items-center">
              <div className="relative mb-8">
                <div className="w-48 h-48 rounded-full border-4 border-white/30 bg-gradient-to-br from-primary/50 to-primary-dark/50 flex items-center justify-center relative overflow-hidden">
                  {/* Spinning Indicator */}
                  {isSpinning && (
                    <div className="absolute inset-0 flex items-center justify-center animate-spin">
                      <RotateCcw className="h-12 w-12 text-white/50" />
                    </div>
                  )}
                  
                  {/* Content Type Display */}
                  <div className={`w-40 h-40 rounded-full ${getRouletteItemByType(selectedContentType).bgClass} bg-gradient-to-br flex items-center justify-center transition-all duration-300 ${isSpinning ? 'scale-90 opacity-90' : 'scale-100 opacity-100'}`}>
                    <div className="text-center">
                      {React.createElement(getRouletteItemByType(selectedContentType).icon, {
                        className: "h-12 w-12 text-white mx-auto mb-2"
                      })}
                      <span className="block text-lg font-bold text-white">
                        {getRouletteItemByType(selectedContentType).label}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Spin Button */}
                <button 
                  onClick={handleSpinRoulette}
                  disabled={isSpinning}
                  className={`absolute left-1/2 -translate-x-1/2 -top-5 px-4 py-2 rounded-full text-white font-medium ${isSpinning ? 'bg-gray-500/80' : 'bg-primary hover:bg-primary/90'} transition-colors`}
                >
                  Girar
                </button>
              </div>
              
              {/* Quick Selection Buttons */}
              <div className="grid grid-cols-2 gap-3 w-full max-w-md mt-4">
                {rouletteItems.map((item) => (
                  <button
                    key={item.type}
                    onClick={() => handleRouletteSelect(item.type)}
                    disabled={isSpinning}
                    className={`py-3 px-4 rounded-xl flex items-center justify-center bg-gradient-to-br ${item.bgClass} text-white font-medium ${isSpinning ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'} transition-all`}
                  >
                    {React.createElement(item.icon, { className: "h-5 w-5 mr-2" })}
                    {item.label}
                  </button>
                ))}
              </div>
              
              {/* Selected Content Info */}
              {!isSpinning && (
                <div className="mt-8 text-center">
                  <p className="text-white text-sm">
                    Clique em "Girar" para deixar o destino decidir ou selecione diretamente um tipo de conteúdo.
                  </p>
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
                  playerNames={getPairPlayerNames()}
                  forbiddenEnabled={true}
                  pairMode={gameOptions.challengeInPairs}
                  showReward={selectedContentType === "prêmio"}
                  competitiveMode={gameOptions.competitiveMode}
                />
                
                {!timerActive && currentChallenge.duration && gameOptions.timer && (
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