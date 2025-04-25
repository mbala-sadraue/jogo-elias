import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { rotateIn } from "@/lib/animations";
import { Timer, Sparkles, Heart, Thermometer, Flame, HelpCircle, Gift, AlertTriangle, RotateCcw, Check, X } from "lucide-react";
import { CategoryType } from "./category-card";
import { GameChallenge, ChallengeType } from "@/data/challenges";

interface ChallengeCardProps {
  challenge: GameChallenge;
  onComplete: () => void;
  onSkip: () => void;
  playerNames?: string[];
  forbiddenEnabled?: boolean;
  pairMode?: boolean;
  showReward?: boolean;
  competitiveMode?: boolean;
}

// Configuração para tipos de desafio
const typeConfig = {
  "pergunta": { 
    icon: HelpCircle, 
    bgClass: "bg-blue-600/20",
    textColor: "text-blue-400",
    bgGradient: "from-blue-400 to-blue-500",
    badgeClass: "bg-blue-400/20 text-blue-400",
    buttonClass: "bg-blue-500 hover:bg-blue-600",
    label: "Pergunta",
  },
  "desafio": { 
    icon: Flame, 
    bgClass: "bg-red-600/20",
    textColor: "text-red-400",
    bgGradient: "from-orange-400 to-orange-500",
    badgeClass: "bg-orange-400/20 text-orange-400",
    buttonClass: "bg-orange-500 hover:bg-orange-600",
    label: "Desafio",
  },
  "prêmio": { 
    icon: Gift, 
    bgClass: "bg-green-600/20",
    textColor: "text-green-400",
    bgGradient: "from-green-400 to-green-500",
    badgeClass: "bg-green-400/20 text-green-400",
    buttonClass: "bg-green-500 hover:bg-green-600",
    label: "Prêmio", 
  },
  "penalidade": { 
    icon: AlertTriangle, 
    bgClass: "bg-yellow-600/20", 
    textColor: "text-yellow-400",
    bgGradient: "from-yellow-400 to-yellow-500",
    badgeClass: "bg-yellow-400/20 text-yellow-400",
    buttonClass: "bg-yellow-500 hover:bg-yellow-600",
    label: "Penalidade",
  }
};

const categoryConfig = {
  "suave": {
    icon: Heart,
    bgClass: "bg-gradient-suave",
    buttonClass: "bg-blue-500 hover:bg-blue-600",
    intensityClass: "text-intensity-suave bg-intensity-suave/20"
  },
  "picante": {
    icon: Thermometer,
    bgClass: "bg-gradient-picante",
    buttonClass: "bg-orange-500 hover:bg-orange-600",
    intensityClass: "text-intensity-picante bg-intensity-picante/20"
  },
  "selvagem": {
    icon: Flame,
    bgClass: "bg-gradient-selvagem",
    buttonClass: "bg-red-500 hover:bg-red-600",
    intensityClass: "text-intensity-selvagem bg-intensity-selvagem/20"
  },
  "extremo": {
    icon: Sparkles,
    bgClass: "bg-gradient-extremo",
    buttonClass: "bg-purple-500 hover:bg-purple-600",
    intensityClass: "text-intensity-extremo bg-intensity-extremo/20"
  }
};

export default function ChallengeCard({ 
  challenge, 
  onComplete, 
  onSkip,
  playerNames = [],
  forbiddenEnabled = false,
  pairMode = false,
  showReward = false,
  competitiveMode = false
}: ChallengeCardProps) {
  const [flipped, setFlipped] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [showForbidden, setShowForbidden] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  
  const contentType = challenge.type as ChallengeType || "desafio";
  const typeInfo = typeConfig[contentType as keyof typeof typeConfig] || typeConfig.desafio;
  const categoryInfo = categoryConfig[challenge.category];
  
  const Icon = typeInfo.icon;
  const CategoryIcon = categoryInfo.icon;

  // Substitui placeholders para nomes de jogadores
  const processText = (text: string): string => {
    if (playerNames.length >= 2) {
      let processed = text;
      processed = processed.replace(/\[jogador1\]/g, playerNames[0] || "Jogador 1");
      processed = processed.replace(/\[jogador2\]/g, playerNames[1] || "Jogador 2");
      processed = processed.replace(/parceiro\(a\)/g, playerNames[1] || "Parceiro(a)");
      return processed;
    }
    return text;
  };

  // Calcula pontos com base no tipo de conteúdo e intensidade
  const calculatePoints = (): number => {
    const intensityMultiplier: Record<CategoryType, number> = {
      suave: 5,
      picante: 10,
      selvagem: 15,
      extremo: 25
    };
    
    const typeMultiplier: Record<ChallengeType, number> = {
      pergunta: 1,
      desafio: 1.5,
      "prêmio": 2,
      penalidade: 1
    };
    
    // Se não estiver em modo competitivo, retorna 0 pontos
    if (!competitiveMode) return 0;
    
    const basePoints = intensityMultiplier[challenge.category || 'suave'];
    const multiplier = typeMultiplier[contentType as ChallengeType];
    
    // Bônus para perguntas proibidas
    const forbiddenBonus = (showForbidden && forbiddenEnabled) ? 1.5 : 1;
    
    // Bônus para desafios em pares
    const pairBonus = (pairMode) ? 1.25 : 1;
    
    return Math.round(basePoints * multiplier * forbiddenBonus * pairBonus);
  };

  const handleComplete = () => {
    setCompleted(true);
    setTimeout(() => {
      onComplete();
    }, 500);
  };
  
  // Efeito para mostrar confetti quando for um prêmio
  useEffect(() => {
    if (contentType === 'prêmio' || showReward) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [contentType, showReward]);

  return (
    <motion.div 
      className="max-w-md mx-auto h-[500px]"
      variants={rotateIn}
      initial="hidden"
      animate="visible"
    >
      <div 
        className={`bg-gradient-to-br ${categoryInfo.bgClass} rounded-2xl overflow-hidden shadow-xl relative h-full w-full
                   ${contentType === 'prêmio' ? 'border-2 border-green-600/50' : ''}
                   ${contentType === 'penalidade' ? 'border-2 border-yellow-600/50' : ''}
                   ${completed ? 'opacity-0 scale-90' : 'opacity-100 scale-100'} transition-all duration-500`}
        style={{ transform: flipped ? 'rotateY(180deg)' : 'rotateY(0)', transformStyle: 'preserve-3d', transition: 'transform 0.6s' }}
      >
        {/* Frente do cartão */}
        <div 
          className={`absolute inset-0 p-6 ${!flipped ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="flex justify-between items-start">
            <span className={`inline-block px-2 py-1 rounded-full text-xs font-bold uppercase ${categoryInfo.intensityClass}`}>
              {challenge.category.charAt(0).toUpperCase() + challenge.category.slice(1)}
            </span>
            
            <div className="flex items-center space-x-2">
              {challenge.index && <span className="text-sm text-white/80">#{challenge.index}</span>}
              <button 
                onClick={() => setFlipped(true)}
                className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <div className="flex flex-col justify-center items-center mt-12 text-center h-[320px]">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-6">
              <Icon className="h-10 w-10 text-white" />
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-2">
              {typeInfo.label}
            </h2>
            
            <p className="text-white/70 text-sm mb-8">
              Toque para revelar o {typeInfo.label.toLowerCase()}
            </p>
            
            <button 
              onClick={() => setFlipped(true)}
              className="px-6 py-3 bg-white/20 hover:bg-white/30 rounded-full text-white font-medium transition-colors"
            >
              Revelar
            </button>
          </div>
        </div>
        
        {/* Verso do cartão */}
        <div 
          className={`absolute inset-0 p-6 ${flipped ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="flex justify-between items-start">
            <span className={`inline-block px-2 py-1 rounded-full ${typeInfo.bgClass} ${typeInfo.textColor} text-xs font-bold uppercase flex items-center`}>
              <Icon className="h-4 w-4 mr-1" />
              {typeInfo.label}
            </span>
            
            <div className="flex items-center space-x-2">
              {challenge.duration && (
                <span className="text-xs px-2 py-1 bg-white/20 rounded-full text-white flex items-center">
                  <Timer className="h-3 w-3 mr-1" />
                  {challenge.duration}
                </span>
              )}
              <button 
                onClick={() => setFlipped(false)}
                className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <div className="mt-6 flex flex-col h-[350px]">
            <div className="flex-1 overflow-y-auto">
              <h3 className="text-xl text-white font-bold mb-3">
                {challenge.title}
              </h3>
              <p className="text-white leading-relaxed">
                {processText(showForbidden && forbiddenEnabled ? challenge.forbiddenText || challenge.description : challenge.description)}
              </p>
              
              {/* Exibição de pontos no modo competitivo */}
              {competitiveMode && (
                <div className="mt-3 text-center">
                  <span className="inline-block px-3 py-1 rounded-full bg-yellow-600/20 text-yellow-400 text-xs font-bold">
                    <Sparkles className="h-3 w-3 inline mr-1"/>
                    {calculatePoints()} pontos
                  </span>
                </div>
              )}
            </div>
            
            {/* Botão de pergunta proibida */}
            {forbiddenEnabled && challenge.forbiddenText && contentType === 'pergunta' && (
              <div className="my-3 text-center">
                <button
                  onClick={() => setShowForbidden(!showForbidden)}
                  className={`px-3 py-1.5 rounded-lg text-xs ${
                    showForbidden 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-purple-600/20 text-purple-400 hover:bg-purple-600/40'
                  }`}
                >
                  {showForbidden 
                    ? 'Voltar à pergunta normal' 
                    : 'Revelar versão proibida'
                  }
                </button>
              </div>
            )}
            
            {/* Modo Desafio em Pares */}
            {pairMode && (
              <div className="my-3 p-2 bg-dark-900 rounded-lg">
                <p className="text-xs text-gray-300 text-center">
                  Desafio em pares: {playerNames.join(' e ')}
                </p>
              </div>
            )}
            
            {/* Confetti para prêmios */}
            {showConfetti && (
              <div className="confetti-container absolute inset-0 overflow-hidden pointer-events-none">
                {Array.from({ length: 50 }).map((_, i) => (
                  <div 
                    key={i} 
                    className="confetti absolute w-2 h-2 rounded-full animate-confetti" 
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: '-10px',
                      animationDelay: `${Math.random() * 5}s`,
                      backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`
                    }}
                  />
                ))}
              </div>
            )}
            
            <div className="flex justify-between mt-6 pt-4 border-t border-white/10">
              <Button 
                variant="ghost" 
                onClick={onSkip}
                className="px-4 py-2 bg-red-600/20 hover:bg-red-600/40 text-red-400 rounded-lg flex items-center text-xs"
              >
                <X className="h-4 w-4 mr-1" />
                Pular
              </Button>
              
              <Button 
                onClick={handleComplete}
                className={`px-4 py-2 ${
                  contentType === 'prêmio' || showReward
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-green-600/20 hover:bg-green-600/40 text-green-400'
                } rounded-lg flex items-center text-xs`}
              >
                Concluído
                <Check className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
