import { useState } from "react";
import { motion } from "framer-motion";
import { GameMode } from "@/types/game-modes";
import { Button } from "@/components/ui/button";
import { BookOpenText, Sparkles, Dices, BarChart3, Lock, Users } from "lucide-react";
import { slideFromRight, fadeIn } from "@/lib/animations";

interface GameModeSelectorProps {
  onSelectMode: (mode: GameMode) => void;
  defaultMode?: GameMode;
}

interface ModeOption {
  id: GameMode;
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  new?: boolean;
  locked?: boolean;
}

export default function GameModeSelector({ onSelectMode, defaultMode = "classic" }: GameModeSelectorProps) {
  const [selectedMode, setSelectedMode] = useState<GameMode>(defaultMode);

  const modeOptions: ModeOption[] = [
    {
      id: "classic",
      title: "Modo Clássico",
      description: "O jogo tradicional com categorias de intensidade e desafios variados.",
      icon: <Dices className="h-8 w-8" />,
      gradient: "from-primary to-primary-dark"
    },
    {
      id: "story",
      title: "História Interativa",
      description: "Uma narrativa sensual onde suas escolhas determinam o rumo da história.",
      icon: <BookOpenText className="h-8 w-8" />,
      gradient: "from-indigo-600 to-indigo-900",
      new: true
    },
    {
      id: "roleplay",
      title: "Roleplay",
      description: "Assumam papéis diferentes e explorem fantasias em cenários imersivos.",
      icon: <Sparkles className="h-8 w-8" />,
      gradient: "from-fuchsia-600 to-fuchsia-900",
      new: true
    },
    {
      id: "roulette",
      title: "Roleta Sensual",
      description: "Sorteie ações e partes do corpo para criar combinações únicas e surpreendentes.",
      icon: <Dices className="h-8 w-8" />,
      gradient: "from-rose-600 to-rose-900",
      new: true
    },
    {
      id: "mood-gauge",
      title: "Medidor de Clima",
      description: "O jogo se adapta dinamicamente ao clima e intensidade entre vocês.",
      icon: <BarChart3 className="h-8 w-8" />,
      gradient: "from-cyan-600 to-cyan-900",
      new: true
    },
    {
      id: "secret-vault",
      title: "Cofre Secreto",
      description: "Desbloqueie novos desafios ao completar certos objetivos ou atingir níveis de intensidade.",
      icon: <Lock className="h-8 w-8" />,
      gradient: "from-sky-600 to-sky-900",
      new: true
    },
    {
      id: "sync-challenge",
      title: "Desafios em Dupla",
      description: "Desafios sincronizados onde ambos precisam coordenar ações para completar.",
      icon: <Users className="h-8 w-8" />,
      gradient: "from-amber-600 to-amber-900",
      new: true,
      locked: true
    }
  ];

  const handleSelect = (mode: GameMode) => {
    setSelectedMode(mode);
    onSelectMode(mode);
  };

  const selectedModeData = modeOptions.find(mode => mode.id === selectedMode);

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <motion.h2 
        className="text-2xl md:text-3xl font-bold text-white mb-6 text-center"
        variants={fadeIn}
      >
        Selecione o Modo de Jogo
      </motion.h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {modeOptions.map((mode, index) => (
          <motion.div
            key={mode.id}
            variants={slideFromRight}
            custom={index * 0.1}
            initial="hidden"
            animate="visible"
            className={`relative rounded-xl overflow-hidden cursor-pointer border-2 transition-all duration-300 ${
              selectedMode === mode.id 
                ? 'border-white scale-105 shadow-glow' 
                : 'border-white/20 hover:border-white/60'
            } ${mode.locked ? 'opacity-70 cursor-not-allowed' : ''}`}
            onClick={() => !mode.locked && handleSelect(mode.id)}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${mode.gradient} opacity-80`}></div>
            
            {mode.new && (
              <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                NOVO
              </div>
            )}
            
            {mode.locked && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                <Lock className="w-10 h-10 text-white/80" />
                <p className="absolute bottom-4 text-center text-white/80 w-full text-sm">Em breve</p>
              </div>
            )}
            
            <div className="relative z-0 p-6">
              <div className="flex items-center mb-3">
                <div className="bg-white/10 p-2 rounded-lg mr-3">
                  {mode.icon}
                </div>
                <h3 className="text-xl font-bold text-white">{mode.title}</h3>
              </div>
              
              <p className="text-white/80 text-sm">
                {mode.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      
      {selectedModeData && (
        <motion.div 
          className="mt-6 bg-white/10 rounded-xl p-6 backdrop-blur-sm"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          <div className="flex items-center mb-4">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${selectedModeData.gradient} flex items-center justify-center mr-4`}>
              {selectedModeData.icon}
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">
                {selectedModeData.title}
              </h3>
              <p className="text-white/70 text-sm">
                {selectedModeData.description}
              </p>
            </div>
          </div>
          
          <div className="flex justify-end mt-4">
            <Button 
              onClick={() => onSelectMode(selectedMode)}
              className="bg-white text-primary-dark hover:bg-white/90"
            >
              Iniciar Modo {selectedModeData.title.split(' ')[0]}
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}