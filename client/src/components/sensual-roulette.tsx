import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CategoryType } from './category-card';
import { ChallengeType } from '@/data/challenges';
import { Button } from './ui/button';
import { Check, Dices, Flame, Gift, HelpCircle, AlertTriangle } from 'lucide-react';

interface SensualRouletteProps {
  intensity: CategoryType;
  onTypeSelected: (type: ChallengeType) => void;
  onSpin?: () => void;
  isSpinning?: boolean;
  defaultType?: ChallengeType;
}

const typeOptions: ChallengeType[] = ["pergunta", "desafio", "prêmio", "penalidade"];
const typeIcons = {
  "pergunta": <HelpCircle className="h-6 w-6" />,
  "desafio": <Flame className="h-6 w-6" />,
  "prêmio": <Gift className="h-6 w-6" />,
  "penalidade": <AlertTriangle className="h-6 w-6" />
};

const typeLabels = {
  "pergunta": "Pergunta",
  "desafio": "Desafio",
  "prêmio": "Prêmio",
  "penalidade": "Penalidade"
};

const typeColors = {
  "pergunta": "bg-blue-600",
  "desafio": "bg-red-600",
  "prêmio": "bg-green-600",
  "penalidade": "bg-yellow-600"
};

const typeColorsLight = {
  "pergunta": "bg-blue-600/20 text-blue-400",
  "desafio": "bg-red-600/20 text-red-400",
  "prêmio": "bg-green-600/20 text-green-400",
  "penalidade": "bg-yellow-600/20 text-yellow-400"
};

export default function SensualRoulette({ 
  intensity, 
  onTypeSelected, 
  onSpin,
  isSpinning = false,
  defaultType = "desafio"
}: SensualRouletteProps) {
  const [selectedType, setSelectedType] = useState<ChallengeType>(defaultType);
  const [spinning, setSpinning] = useState(false);
  const [spinResults, setSpinResults] = useState<ChallengeType[]>([]);
  const spinResultsRef = useRef<ChallengeType[]>([]);
  const animationTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Atualiza o estado local quando isSpinning é mudado externamente
  useEffect(() => {
    if (isSpinning !== spinning) {
      setSpinning(isSpinning);
    }
  }, [isSpinning]);

  useEffect(() => {
    if (spinning) {
      // Simula a roleta girando rapidamente
      const interval = setInterval(() => {
        const randomType = typeOptions[Math.floor(Math.random() * typeOptions.length)];
        spinResultsRef.current = [randomType, ...spinResultsRef.current].slice(0, 10);
        setSpinResults([...spinResultsRef.current]);
      }, 100);

      // Para a animação após 2 segundos
      animationTimerRef.current = setTimeout(() => {
        clearInterval(interval);
        
        // Determina o resultado final, com probabilidades diferenciadas
        let result: ChallengeType;
        const rand = Math.random();
        
        // Tendências diferentes para cada intensidade
        if (intensity === "suave") {
          if (rand < 0.5) result = "pergunta";       // 50% pergunta
          else if (rand < 0.85) result = "desafio";  // 35% desafio
          else if (rand < 0.95) result = "prêmio";   // 10% prêmio 
          else result = "penalidade";                 // 5% penalidade
        } 
        else if (intensity === "picante") {
          if (rand < 0.4) result = "pergunta";       // 40% pergunta
          else if (rand < 0.8) result = "desafio";   // 40% desafio
          else if (rand < 0.9) result = "prêmio";    // 10% prêmio
          else result = "penalidade";                 // 10% penalidade
        }
        else if (intensity === "selvagem") {
          if (rand < 0.3) result = "pergunta";       // 30% pergunta
          else if (rand < 0.8) result = "desafio";   // 50% desafio
          else if (rand < 0.9) result = "prêmio";    // 10% prêmio
          else result = "penalidade";                 // 10% penalidade
        }
        else { // extremo
          if (rand < 0.2) result = "pergunta";       // 20% pergunta
          else if (rand < 0.7) result = "desafio";   // 50% desafio
          else if (rand < 0.85) result = "prêmio";   // 15% prêmio
          else result = "penalidade";                 // 15% penalidade
        }
        
        setSelectedType(result);
        onTypeSelected(result);
        setSpinning(false);
        
        // Adiciona o resultado final à lista com destaque
        spinResultsRef.current = [result, ...spinResultsRef.current].slice(0, 10);
        setSpinResults([...spinResultsRef.current]);
      }, 2000);

      return () => {
        if (animationTimerRef.current) {
          clearTimeout(animationTimerRef.current);
        }
      };
    }
  }, [spinning, intensity, onTypeSelected]);

  const handleSpin = () => {
    if (!spinning) {
      setSpinning(true);
      if (onSpin) onSpin();
    }
  };

  const renderSpinResults = () => {
    return (
      <div className="flex flex-wrap gap-2 mt-4 justify-center">
        {spinResults.map((type, index) => (
          <span 
            key={index} 
            className={`px-2.5 py-1 rounded-full text-xs ${index === 0 ? typeColors[type] : typeColorsLight[type]} 
                      ${index === 0 ? "text-white animate-pulse" : ""}`}
          >
            {typeLabels[type]}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full max-w-md mx-auto py-6 px-4">
      <div className="text-center">
        <h3 className="text-xl font-bold mb-4 text-white">Roleta Sensual</h3>
        
        {/* Exibição da opção atual */}
        <div className="relative h-32 mb-8 rounded-xl overflow-hidden flex items-center justify-center">
          <div className={`absolute inset-0 ${typeColors[selectedType]} opacity-20 blur-sm`}></div>
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedType}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <div className="flex items-center justify-center mb-3">
                <span className={`inline-flex items-center justify-center h-14 w-14 rounded-full ${typeColors[selectedType]}`}>
                  {typeIcons[selectedType]}
                </span>
              </div>
              <h4 className="text-lg font-bold text-white">{typeLabels[selectedType]}</h4>
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Botão de rodar a roleta */}
        <Button
          onClick={handleSpin}
          disabled={spinning}
          className={`relative overflow-hidden font-bold rounded-full px-6 py-3 transition-all 
                    ${spinning ? 'bg-gray-600' : 'bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90'}`}
        >
          {spinning ? (
            <>
              <span className="animate-spin inline-block mr-2">
                <Dices className="h-5 w-5" />
              </span>
              Girando...
            </>
          ) : (
            <>
              <Dices className="h-5 w-5 mr-2" />
              Girar Roleta
            </>
          )}
        </Button>
        
        {/* Histórico de resultados */}
        {spinResults.length > 0 && renderSpinResults()}
      </div>
    </div>
  );
}