import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { RouletteAction, RouletteBodyPart } from "@/types/game-modes";
import { Button } from "@/components/ui/button";
import { 
  RotateCcw, Shuffle, Dices, MoveDiagonal, Timer, 
  RefreshCcw, ArrowRight, ThumbsUp, Heart 
} from "lucide-react";
import { fadeIn, rotateIn, pulse } from "@/lib/animations";
import { rouletteActions, rouletteBodyParts } from "@/data/roulette-data";
import { CategoryType } from "@/components/category-card";

interface RouletteModeProps {
  playerNames: string[];
  intensity?: CategoryType;
  onComplete: () => void;
  onBack: () => void;
}

export default function RouletteMode({
  playerNames,
  intensity = "picante",
  onComplete,
  onBack
}: RouletteModeProps) {
  const [actions, setActions] = useState<RouletteAction[]>([]);
  const [bodyParts, setBodyParts] = useState<RouletteBodyPart[]>([]);
  const [selectedAction, setSelectedAction] = useState<RouletteAction | null>(null);
  const [selectedBodyPart, setSelectedBodyPart] = useState<RouletteBodyPart | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [combinationCount, setCombinationCount] = useState(0);
  const [timerValue, setTimerValue] = useState(30); // 30 segundos padrão
  const [timerActive, setTimerActive] = useState(false);
  const [liked, setLiked] = useState<Set<string>>(new Set());
  
  const actionWheelRef = useRef<HTMLDivElement>(null);
  const bodyPartWheelRef = useRef<HTMLDivElement>(null);

  // Carregar dados baseados na intensidade selecionada
  useEffect(() => {
    const filteredActions = rouletteActions.filter(
      a => a.intensity === intensity || a.intensity === 'suave'
    );
    setActions(filteredActions);
    setBodyParts(rouletteBodyParts);
  }, [intensity]);

  // Lógica do timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (timerActive && timerValue > 0) {
      interval = setInterval(() => {
        setTimerValue(prev => prev - 1);
      }, 1000);
    } else if (timerValue === 0) {
      setTimerActive(false);
    }
    
    return () => clearInterval(interval);
  }, [timerActive, timerValue]);

  const getRandomElement = <T extends unknown>(items: T[]): T => {
    const randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
  };

  const spinWheels = () => {
    if (spinning || actions.length === 0 || bodyParts.length === 0) return;
    
    setSpinning(true);
    setSelectedAction(null);
    setSelectedBodyPart(null);
    
    // Animação de girar as roletas
    if (actionWheelRef.current) {
      actionWheelRef.current.style.transition = "transform 2s cubic-bezier(0.17, 0.67, 0.83, 0.67)";
      actionWheelRef.current.style.transform = `rotate(${Math.random() * 3600}deg)`;
    }
    
    if (bodyPartWheelRef.current) {
      bodyPartWheelRef.current.style.transition = "transform 2.5s cubic-bezier(0.17, 0.67, 0.83, 0.67)";
      bodyPartWheelRef.current.style.transform = `rotate(${Math.random() * 3600}deg)`;
    }
    
    // Esperar a animação terminar antes de selecionar
    setTimeout(() => {
      const action = getRandomElement(actions);
      const bodyPart = getRandomElement(bodyParts);
      
      setSelectedAction(action);
      setSelectedBodyPart(bodyPart);
      setSpinning(false);
      setCombinationCount(prev => prev + 1);
      
      // Resetar e iniciar o timer
      setTimerValue(30);
      setTimerActive(true);
    }, 2500);
  };

  const resetWheels = () => {
    if (spinning) return;
    
    if (actionWheelRef.current) {
      actionWheelRef.current.style.transition = "transform 0.5s ease";
      actionWheelRef.current.style.transform = "rotate(0deg)";
    }
    
    if (bodyPartWheelRef.current) {
      bodyPartWheelRef.current.style.transition = "transform 0.5s ease";
      bodyPartWheelRef.current.style.transform = "rotate(0deg)";
    }
    
    setSelectedAction(null);
    setSelectedBodyPart(null);
    setTimerActive(false);
  };

  const handleNextCombination = () => {
    resetWheels();
    setTimeout(spinWheels, 500);
  };

  const toggleTimer = () => {
    setTimerActive(!timerActive);
  };

  const resetTimer = () => {
    setTimerValue(30);
    setTimerActive(false);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const toggleLike = () => {
    if (!selectedAction || !selectedBodyPart) return;
    
    const combinationId = `${selectedAction.id}-${selectedBodyPart.id}`;
    const newLiked = new Set(liked);
    
    if (newLiked.has(combinationId)) {
      newLiked.delete(combinationId);
    } else {
      newLiked.add(combinationId);
    }
    
    setLiked(newLiked);
    
    // Salvar no localStorage
    localStorage.setItem('likedCombinations', JSON.stringify(Array.from(newLiked)));
  };

  const isLiked = (): boolean => {
    if (!selectedAction || !selectedBodyPart) return false;
    return liked.has(`${selectedAction.id}-${selectedBodyPart.id}`);
  };

  const getActionTypeIcon = (type: string) => {
    switch (type) {
      case "action":
        return <MoveDiagonal className="h-4 w-4" />;
      case "command":
        return <ArrowRight className="h-4 w-4" />;
      case "question":
        return <Dices className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getActionTypeLabel = (type: string) => {
    switch (type) {
      case "action":
        return "Ação";
      case "command":
        return "Comando";
      case "question":
        return "Pergunta";
      default:
        return "Ação";
    }
  };

  // Obter gradiente com base na intensidade
  const getGradientByIntensity = (selectedIntensity: CategoryType): string => {
    switch (selectedIntensity) {
      case "suave":
        return "bg-gradient-suave";
      case "picante":
        return "bg-gradient-picante";
      case "selvagem":
        return "bg-gradient-selvagem";
      case "extremo":
        return "bg-gradient-extremo";
      default:
        return "bg-gradient-roulette";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-600 to-rose-900">
      <div className="container p-4 mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="ghost" 
            className="text-white/80 hover:text-white"
            onClick={onBack}
          >
            Voltar
          </Button>
          
          <div className="flex items-center space-x-2">
            <span className="text-white text-sm">Combinações: {combinationCount}</span>
          </div>
        </div>
        
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="max-w-xl mx-auto"
        >
          <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 mb-6">
            <h2 className="text-xl font-bold text-white text-center mb-4">
              Roleta Sensual
            </h2>
            
            <p className="text-white/80 text-center mb-6">
              Gire as roletas para criar combinações únicas de ações e partes do corpo.
            </p>
            
            {/* Área das roletas */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {/* Roleta de Ações */}
              <div className="bg-black/20 rounded-xl p-4 flex flex-col items-center">
                <h3 className="text-white text-sm mb-3">Ação</h3>
                <div className="relative w-28 h-28 mb-2">
                  <div 
                    ref={actionWheelRef}
                    className="w-full h-full rounded-full bg-gradient-to-br from-fuchsia-600 to-fuchsia-800 flex items-center justify-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-black/30 flex items-center justify-center">
                      <Shuffle className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -mt-2">
                    <div className="w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-white"></div>
                  </div>
                </div>
                {selectedAction && (
                  <motion.div 
                    className="bg-white/10 rounded-lg p-2 w-full text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="flex items-center justify-center space-x-1 text-xs text-white/70 mb-1">
                      {getActionTypeIcon(selectedAction.type)}
                      <span>{getActionTypeLabel(selectedAction.type)}</span>
                    </div>
                    <p className="text-white font-medium">{selectedAction.text}</p>
                  </motion.div>
                )}
              </div>
              
              {/* Roleta de Partes do Corpo */}
              <div className="bg-black/20 rounded-xl p-4 flex flex-col items-center">
                <h3 className="text-white text-sm mb-3">Parte do Corpo</h3>
                <div className="relative w-28 h-28 mb-2">
                  <div 
                    ref={bodyPartWheelRef}
                    className="w-full h-full rounded-full bg-gradient-to-br from-rose-600 to-rose-800 flex items-center justify-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-black/30 flex items-center justify-center">
                      <Shuffle className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -mt-2">
                    <div className="w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-white"></div>
                  </div>
                </div>
                {selectedBodyPart && (
                  <motion.div 
                    className="bg-white/10 rounded-lg p-2 w-full text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="flex items-center justify-center space-x-1 text-xs text-white/70 mb-1">
                      <Heart className="h-3 w-3" />
                      <span>Sensibilidade: {selectedBodyPart.sensitivity}/10</span>
                    </div>
                    <p className="text-white font-medium">{selectedBodyPart.name}</p>
                  </motion.div>
                )}
              </div>
            </div>
            
            {/* Área de combinação */}
            {selectedAction && selectedBodyPart && (
              <motion.div
                className="bg-white/10 rounded-xl p-5 mb-6 border border-white/20"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white font-semibold">Sua Combinação</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`w-8 h-8 rounded-full ${isLiked() ? 'text-red-400' : 'text-white/60 hover:text-white'}`}
                    onClick={toggleLike}
                  >
                    <Heart className="h-5 w-5" fill={isLiked() ? "currentColor" : "none"} />
                  </Button>
                </div>
                
                <p className="text-white text-lg text-center py-3">
                  <span className="font-bold">{selectedAction.text}</span>
                  {" ▸ "}
                  <span className="text-rose-300">{selectedBodyPart.name}</span>
                </p>
                
                <div className="mt-4">
                  {timerActive ? (
                    <div className="flex flex-col items-center">
                      <div className="w-full bg-black/30 rounded-lg py-2 text-center mb-2">
                        <span className="text-2xl font-bold text-white">
                          {formatTime(timerValue)}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 w-full">
                        <Button
                          onClick={toggleTimer}
                          variant="outline"
                          className="border-white/30 text-white hover:bg-white/10"
                        >
                          Pausar
                        </Button>
                        
                        <Button
                          onClick={resetTimer}
                          variant="outline"
                          className="border-white/30 text-white hover:bg-white/10"
                        >
                          Reiniciar
                        </Button>
                        
                        <Button
                          onClick={handleNextCombination}
                          className="bg-white text-rose-600 hover:bg-white/90"
                        >
                          Próximo
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        onClick={() => {
                          setTimerValue(30);
                          setTimerActive(true);
                        }}
                        className="bg-white/20 hover:bg-white/30 text-white"
                      >
                        <Timer className="h-4 w-4 mr-2" />
                        Iniciar Timer
                      </Button>
                      
                      <Button
                        onClick={handleNextCombination}
                        className="bg-white text-rose-600 hover:bg-white/90"
                      >
                        Nova Combinação
                      </Button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
            
            {/* Botão de girar as roletas */}
            {!selectedAction || !selectedBodyPart ? (
              <Button
                onClick={spinWheels}
                disabled={spinning}
                className="w-full bg-white text-rose-600 hover:bg-white/90 py-6 text-lg font-bold"
              >
                {spinning ? (
                  <RefreshCcw className="h-5 w-5 mr-2 animate-spin" />
                ) : (
                  <Dices className="h-5 w-5 mr-2" />
                )}
                {spinning ? "Girando..." : "Girar Roletas"}
              </Button>
            ) : (
              <div className="text-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetWheels}
                  className="text-white/70 hover:text-white"
                >
                  <RotateCcw className="h-4 w-4 mr-1" />
                  Resetar
                </Button>
              </div>
            )}
          </div>
          
          {/* Área de estatísticas */}
          <div className="bg-black/20 rounded-xl p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-medium text-white/80">
                Estatísticas
              </h3>
              <span className="text-xs text-white/60">
                {liked.size} combinações favoritas
              </span>
            </div>
            
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-black/20 rounded-lg p-3">
                <div className="text-xl font-bold text-white">{combinationCount}</div>
                <div className="text-xs text-white/60">Combinações</div>
              </div>
              
              <div className="bg-black/20 rounded-lg p-3">
                <div className="text-xl font-bold text-white">{actions.length}</div>
                <div className="text-xs text-white/60">Ações</div>
              </div>
              
              <div className="bg-black/20 rounded-lg p-3">
                <div className="text-xl font-bold text-white">{bodyParts.length}</div>
                <div className="text-xs text-white/60">Partes</div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-white/70 text-xs">
              Nota: Use sua criatividade para interpretar cada combinação!
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}