import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { rotateIn } from "@/lib/animations";
import { Timer, Sparkles, Heart, Thermometer, Flame, HelpCircle, Gift, AlertTriangle, RotateCcw } from "lucide-react";
import { CategoryType } from "./category-card";

interface ChallengeCardProps {
  challenge: {
    id: string;
    title: string;
    description: string;
    type: string;
    duration: string;
    index: number;
    category: CategoryType;
  };
  onComplete: () => void;
  onSkip: () => void;
  playerNames?: string[];
}

// Configuração para tipos de desafio
const typeConfig = {
  "pergunta": { 
    icon: HelpCircle, 
    bgClass: "from-blue-400 to-blue-500",
    badgeClass: "bg-blue-400/20 text-blue-400",
    buttonClass: "bg-blue-500 hover:bg-blue-600",
    label: "Pergunta",
  },
  "desafio": { 
    icon: Flame, 
    bgClass: "from-orange-400 to-orange-500",
    badgeClass: "bg-orange-400/20 text-orange-400",
    buttonClass: "bg-orange-500 hover:bg-orange-600",
    label: "Desafio",
  },
  "prêmio": { 
    icon: Gift, 
    bgClass: "from-green-400 to-green-500",
    badgeClass: "bg-green-400/20 text-green-400",
    buttonClass: "bg-green-500 hover:bg-green-600",
    label: "Prêmio", 
  },
  "penalidade": { 
    icon: AlertTriangle, 
    bgClass: "from-yellow-400 to-yellow-500",
    badgeClass: "bg-yellow-400/20 text-yellow-400",
    buttonClass: "bg-yellow-500 hover:bg-yellow-600",
    label: "Penalidade",
  }
};

const categoryConfig = {
  "suave": {
    icon: Heart,
    bgClass: "from-blue-400 to-blue-500",
    buttonClass: "bg-blue-500 hover:bg-blue-600"
  },
  "picante": {
    icon: Thermometer,
    bgClass: "from-orange-400 to-orange-500",
    buttonClass: "bg-orange-500 hover:bg-orange-600"
  },
  "selvagem": {
    icon: Flame,
    bgClass: "from-red-400 to-red-500",
    buttonClass: "bg-red-500 hover:bg-red-600"
  },
  "extremo": {
    icon: Sparkles,
    bgClass: "from-purple-400 to-purple-500",
    buttonClass: "bg-purple-500 hover:bg-purple-600"
  }
};

export default function ChallengeCard({ 
  challenge, 
  onComplete, 
  onSkip,
  playerNames = []
}: ChallengeCardProps) {
  const [flipped, setFlipped] = useState(false);
  const [completed, setCompleted] = useState(false);
  
  const typeInfo = typeConfig[challenge.type as keyof typeof typeConfig] || typeConfig.desafio;
  const categoryInfo = categoryConfig[challenge.category];
  
  const Icon = typeInfo.icon;
  const CategoryIcon = categoryInfo.icon;

  // Substitui placeholders para nomes de jogadores
  const processText = (text: string): string => {
    if (playerNames.length >= 2) {
      let processed = text;
      processed = processed.replace(/\[jogador1\]/g, playerNames[0] || "Jogador 1");
      processed = processed.replace(/\[jogador2\]/g, playerNames[1] || "Jogador 2");
      return processed;
    }
    return text;
  };

  const handleComplete = () => {
    setCompleted(true);
    setTimeout(() => {
      onComplete();
    }, 500);
  };

  return (
    <motion.div 
      className="max-w-md mx-auto h-[500px]"
      variants={rotateIn}
      initial="hidden"
      animate="visible"
    >
      <div 
        className={`bg-gradient-to-br ${categoryInfo.bgClass} rounded-2xl overflow-hidden shadow-xl relative h-full w-full ${completed ? 'opacity-0 scale-90' : 'opacity-100 scale-100'} transition-all duration-500`}
        style={{ transform: flipped ? 'rotateY(180deg)' : 'rotateY(0)', transformStyle: 'preserve-3d', transition: 'transform 0.6s' }}
      >
        {/* Frente do cartão */}
        <div 
          className={`absolute inset-0 p-6 ${!flipped ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="flex justify-between items-start">
            <span className="px-3 py-1 bg-white/20 rounded-full text-sm text-white font-medium flex items-center">
              <CategoryIcon className="h-4 w-4 mr-1" />
              {challenge.category.charAt(0).toUpperCase() + challenge.category.slice(1)}
            </span>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-white/80">#{challenge.index}</span>
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
            <span className="px-3 py-1 bg-white/20 rounded-full text-sm text-white font-medium flex items-center">
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
                {processText(challenge.description)}
              </p>
            </div>
            
            <div className="flex justify-between mt-6 pt-4 border-t border-white/10">
              <Button 
                variant="ghost" 
                onClick={onSkip}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white transition-colors"
              >
                Pular
              </Button>
              
              <Button 
                onClick={handleComplete}
                className={`px-4 py-2 bg-white text-primary-dark font-medium hover:bg-white/90 transition-colors`}
              >
                Concluir
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
