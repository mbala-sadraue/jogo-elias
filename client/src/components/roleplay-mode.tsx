import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { RoleplayCard } from "@/types/game-modes";
import { Button } from "@/components/ui/button";
import { Sparkles, Shuffle, Clock, SkipForward, CheckCircle, Heart, Timer } from "lucide-react";
import { fadeIn, cardAnimation, slideFromRight } from "@/lib/animations";
import { roleplayCards } from "@/data/roleplay-cards";
import { CategoryType } from "@/components/category-card";

interface RoleplayModeProps {
  playerNames: string[];
  intensity?: CategoryType;
  onComplete: () => void;
  onBack: () => void;
}

export default function RoleplayMode({
  playerNames,
  intensity = "picante",
  onComplete,
  onBack
}: RoleplayModeProps) {
  const [currentCard, setCurrentCard] = useState<RoleplayCard | null>(null);
  const [previousCards, setPreviousCards] = useState<RoleplayCard[]>([]);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [timerActive, setTimerActive] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [availableCards, setAvailableCards] = useState<RoleplayCard[]>([]);

  // Inicializar com cartões da intensidade escolhida
  useEffect(() => {
    const filteredCards = roleplayCards.filter(card => card.intensity === intensity);
    if (filteredCards.length > 0) {
      setAvailableCards(shuffle([...filteredCards]));
    }
  }, [intensity]);

  // Selecionar um novo cartão quando necessário
  useEffect(() => {
    if (availableCards.length > 0 && !currentCard) {
      const newCard = availableCards[0];
      setCurrentCard(newCard);
      setAvailableCards(availableCards.slice(1));
    }
  }, [availableCards, currentCard]);

  // Timer lógica
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (timerActive && timeRemaining !== null && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev !== null && prev > 0) {
            return prev - 1;
          } else {
            setTimerActive(false);
            return 0;
          }
        });
      }, 1000);
    } else if (timeRemaining === 0) {
      setTimerActive(false);
    }
    
    return () => clearInterval(timer);
  }, [timerActive, timeRemaining]);

  // Embaralhar array
  function shuffle<T>(array: T[]): T[] {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  // Converter string de duração para segundos
  const durationToSeconds = (durationStr: string): number => {
    if (durationStr.includes("min")) {
      return parseInt(durationStr) * 60;
    }
    return parseInt(durationStr);
  };

  // Formatar segundos para exibição MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const startTimer = () => {
    if (currentCard) {
      const duration = durationToSeconds(currentCard.duration);
      setTimeRemaining(duration);
      setTimerActive(true);
    }
  };

  const stopTimer = () => {
    setTimerActive(false);
  };

  const resetTimer = () => {
    if (currentCard) {
      const duration = durationToSeconds(currentCard.duration);
      setTimeRemaining(duration);
      setTimerActive(false);
    }
  };

  const handleNextCard = () => {
    if (currentCard) {
      // Adicionar cartão atual ao histórico
      setPreviousCards(prev => [...prev, currentCard]);
      
      // Resetar estado
      setTimerActive(false);
      setTimeRemaining(null);
      setIsFlipped(false);
      
      // Verificar se há mais cartões disponíveis
      if (availableCards.length === 0) {
        // Se todos os cartões foram usados
        setCurrentCard(null);
        setCompleted(true);
        setTimeout(onComplete, 2000); // Redirecionar após 2 segundos
      } else {
        // Selecionar próximo cartão
        const nextCard = availableCards[0];
        setCurrentCard(nextCard);
        setAvailableCards(availableCards.slice(1));
      }
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  // Obter gradiente com base na intensidade
  const getGradientByIntensity = (intensity: CategoryType): string => {
    switch (intensity) {
      case "suave":
        return "bg-gradient-suave";
      case "picante":
        return "bg-gradient-picante";
      case "selvagem":
        return "bg-gradient-selvagem";
      case "extremo":
        return "bg-gradient-extremo";
      default:
        return "bg-gradient-picante";
    }
  };

  // Se todos os cartões foram usados e o jogo foi concluído
  if (completed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
        <motion.div 
          className="text-center p-8"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          <CheckCircle className="h-16 w-16 text-green-400 mb-4 mx-auto" />
          <h2 className="text-2xl font-bold text-white mb-2">Roleplay Concluído!</h2>
          <p className="text-white/70 mb-8">Vocês experimentaram todos os cenários disponíveis.</p>
          
          <div className="flex justify-center">
            <Button
              onClick={onComplete}
              className="bg-white text-primary hover:bg-white/90"
            >
              Voltar ao Menu
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Renderização quando não há cartão carregado
  if (!currentCard) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
        <div className="text-center p-8">
          <Sparkles className="h-16 w-16 text-white mb-4 mx-auto animate-pulse" />
          <h2 className="text-2xl font-bold text-white mb-2">Carregando cenários...</h2>
          <p className="text-white/70">Preparando experiências de roleplay</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${getGradientByIntensity(currentCard.intensity)}`}>
      <div className="container p-4 mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="ghost" 
            className="text-white/80 hover:text-white"
            onClick={onBack}
          >
            Voltar
          </Button>
          
          <div className="flex items-center space-x-1">
            <Heart className="h-4 w-4 text-red-400" />
            <span className="text-white text-sm font-medium">
              {previousCards.length + 1}/{previousCards.length + availableCards.length + 1}
            </span>
          </div>
        </div>
        
        <motion.div
          key={currentCard.id}
          className="flip-card max-w-lg mx-auto"
          variants={cardAnimation}
          initial="hidden"
          animate="visible"
        >
          <div className={`flip-card-inner h-[500px] ${isFlipped ? 'flipped' : ''}`}>
            {/* Frente do cartão - detalhes dos papéis */}
            <div 
              className="flip-card-front absolute inset-0 rounded-2xl overflow-hidden shadow-xl"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <div className={`h-full w-full ${getGradientByIntensity(currentCard.intensity)} p-6 relative`}>
                <div className="absolute top-3 right-3 px-3 py-1 bg-white/20 rounded-full text-sm text-white">
                  {currentCard.intensity.charAt(0).toUpperCase() + currentCard.intensity.slice(1)}
                </div>
                
                <div className="flex flex-col h-full">
                  <div className="mb-8 text-center">
                    <Sparkles className="h-16 w-16 text-white mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-white">
                      Cartão de Roleplay
                    </h2>
                    <p className="text-white/80 text-sm">
                      Toque para revelar os papéis
                    </p>
                  </div>
                  
                  <div className="flex-1"></div>
                  
                  <Button
                    onClick={handleFlip}
                    className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30"
                  >
                    Revelar Papéis
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Verso do cartão - conteúdo completo */}
            <div 
              className="flip-card-back absolute inset-0 rounded-2xl overflow-hidden shadow-xl"
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
              <div className={`h-full w-full ${getGradientByIntensity(currentCard.intensity)} p-6 flex flex-col`}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">Seus Papéis</h3>
                  
                  <div className="px-2 py-1 bg-white/20 rounded-lg text-xs text-white flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {currentCard.duration}
                  </div>
                </div>
                
                <div className="mb-6 space-y-4">
                  <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                    <h4 className="text-white/70 text-sm mb-1">Papel de {playerNames[0] || "Jogador 1"}</h4>
                    <p className="text-white font-semibold">{currentCard.role1}</p>
                  </div>
                  
                  <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                    <h4 className="text-white/70 text-sm mb-1">Papel de {playerNames[1] || "Jogador 2"}</h4>
                    <p className="text-white font-semibold">{currentCard.role2}</p>
                  </div>
                </div>
                
                <div className="bg-black/20 rounded-xl p-4 mb-auto">
                  <h4 className="text-white font-medium mb-2">Cenário:</h4>
                  <p className="text-white/90">{currentCard.scenario}</p>
                </div>
                
                <div className="mt-4">
                  {timeRemaining === null ? (
                    <Button
                      onClick={startTimer}
                      className="w-full bg-white text-primary-dark hover:bg-white/90"
                    >
                      <Timer className="h-4 w-4 mr-2" />
                      Iniciar Timer ({currentCard.duration})
                    </Button>
                  ) : (
                    <div className="space-y-3">
                      <div className="w-full bg-white/10 rounded-lg py-3 text-center">
                        <span className="text-2xl font-bold text-white">
                          {timerActive ? formatTime(timeRemaining) : "Em Pausa"}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2">
                        {timerActive ? (
                          <Button
                            onClick={stopTimer}
                            variant="outline"
                            className="border-white/30 text-white hover:bg-white/10"
                          >
                            Pausar
                          </Button>
                        ) : (
                          <Button
                            onClick={startTimer}
                            variant="outline"
                            className="border-white/30 text-white hover:bg-white/10"
                          >
                            Continuar
                          </Button>
                        )}
                        
                        <Button
                          onClick={resetTimer}
                          variant="outline"
                          className="border-white/30 text-white hover:bg-white/10"
                        >
                          Reiniciar
                        </Button>
                        
                        <Button
                          onClick={handleNextCard}
                          className="bg-white text-primary-dark hover:bg-white/90"
                        >
                          <SkipForward className="h-4 w-4 mr-1" />
                          Próximo
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="mt-6 text-center"
          variants={fadeIn}
        >
          <p className="text-white/70 text-sm mb-2">
            Use sua imaginação e divirta-se interpretando seus papéis!
          </p>
          
          <div className="flex justify-center mt-4">
            <Button
              variant="ghost"
              className="text-white/80 hover:text-white px-4"
              onClick={handleFlip}
            >
              {isFlipped ? "Esconder Detalhes" : "Ver Detalhes"}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}