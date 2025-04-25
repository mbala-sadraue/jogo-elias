import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Story, StoryPoint, StoryOption } from "@/types/game-modes";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpenText, Milestone } from "lucide-react";
import { fadeIn, slideFromRight, slideUp } from "@/lib/animations";
import { stories } from "@/data/stories";
import ChallengeCard from "@/components/challenge-card";
import { ALL_CHALLENGES } from "@/data/challenges";

interface StoryModeProps {
  storyId?: string;
  playerNames: string[];
  onComplete: () => void;
  onBack: () => void;
}

export default function StoryMode({
  storyId = "story1",
  playerNames,
  onComplete,
  onBack
}: StoryModeProps) {
  const [currentStory, setCurrentStory] = useState<Story | null>(null);
  const [currentPointId, setCurrentPointId] = useState<string>("");
  const [currentPoint, setCurrentPoint] = useState<StoryPoint | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [showChallenge, setShowChallenge] = useState(false);
  const [challengeId, setChallengeId] = useState<string | null>(null);
  const [challengeData, setChallengeData] = useState<any | null>(null);
  const [storyProgress, setStoryProgress] = useState(0);
  const [fadeEffect, setFadeEffect] = useState(false);
  const [visitedPoints, setVisitedPoints] = useState<Set<string>>(new Set());

  // Carregar a história
  useEffect(() => {
    const story = stories.find(s => s.id === storyId);
    if (story) {
      setCurrentStory(story);
      setCurrentPointId(story.startingPointId);
      setHistory([story.startingPointId]);
      setVisitedPoints(new Set([story.startingPointId]));
    }
  }, [storyId]);

  // Atualizar o ponto atual da história quando o ID muda
  useEffect(() => {
    if (currentStory && currentPointId) {
      const point = currentStory.storyPoints.find(p => p.id === currentPointId);
      if (point) {
        setFadeEffect(true);
        setTimeout(() => {
          setCurrentPoint(point);
          setFadeEffect(false);
        }, 300);
      }

      // Calcular progresso
      if (currentStory.storyPoints.length > 0) {
        const visitedCount = visitedPoints.size;
        const totalPoints = currentStory.storyPoints.length;
        setStoryProgress(Math.round((visitedCount / totalPoints) * 100));
      }
    }
  }, [currentPointId, currentStory, visitedPoints]);

  const handleOptionSelect = (option: StoryOption) => {
    if (option.challengeId) {
      const intensity = option.intensity || currentStory?.category || "suave";
      const challenges = ALL_CHALLENGES[intensity];
      const challenge = challenges.find(c => c.id === option.challengeId);
      
      if (challenge) {
        setChallengeId(option.challengeId);
        setChallengeData(challenge);
        setShowChallenge(true);
      } else {
        // Se não encontrar o desafio, continue a história
        navigateToPoint(option.nextId);
      }
    } else {
      navigateToPoint(option.nextId);
    }
  };

  const navigateToPoint = (pointId: string) => {
    if (pointId === "menu") {
      onComplete();
      return;
    }

    setCurrentPointId(pointId);
    setHistory(prev => [...prev, pointId]);
    setVisitedPoints(prev => new Set(prev).add(pointId));
  };

  const handleChallengeComplete = () => {
    setShowChallenge(false);
    
    // Encontra a opção que levou ao desafio para continuar a história
    if (currentPoint) {
      const selectedOption = currentPoint.options.find(o => o.challengeId === challengeId);
      if (selectedOption) {
        navigateToPoint(selectedOption.nextId);
      }
    }

    setChallengeId(null);
    setChallengeData(null);
  };

  const handleChallengeSkip = () => {
    setShowChallenge(false);
    
    // Se pular, ainda continua a história
    if (currentPoint) {
      const selectedOption = currentPoint.options.find(o => o.challengeId === challengeId);
      if (selectedOption) {
        navigateToPoint(selectedOption.nextId);
      }
    }

    setChallengeId(null);
    setChallengeData(null);
  };

  const getMoodBackground = (mood?: string) => {
    switch (mood) {
      case "romantic":
        return "from-rose-600 to-rose-900";
      case "mysterious":
        return "from-indigo-600 to-indigo-900";
      case "playful":
        return "from-cyan-600 to-cyan-900";
      case "intense":
        return "from-purple-600 to-purple-900";
      default:
        return "from-primary to-primary-dark";
    }
  };

  // Renderização quando não há história carregada
  if (!currentStory || !currentPoint) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
        <div className="text-center p-8">
          <BookOpenText className="h-16 w-16 text-white mb-4 mx-auto animate-pulse" />
          <h2 className="text-2xl font-bold text-white mb-2">Carregando história...</h2>
          <p className="text-white/70">Preparando uma experiência inesquecível para vocês</p>
        </div>
      </div>
    );
  }

  // Renderização do desafio quando selecionado
  if (showChallenge && challengeData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary to-primary-dark">
        <div className="container px-4 py-8">
          <h2 className="text-xl text-white text-center mb-6">
            Desafio Especial
          </h2>
          
          <ChallengeCard
            challenge={challengeData}
            onComplete={handleChallengeComplete}
            onSkip={handleChallengeSkip}
            playerNames={playerNames}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getMoodBackground(currentPoint.mood)}`}>
      <div className="container p-4 mx-auto">
        <div className="flex items-center justify-between mb-4">
          <Button 
            variant="ghost" 
            className="text-white/80 hover:text-white"
            onClick={onBack}
          >
            Voltar
          </Button>
          
          <div className="text-white text-sm">
            Progresso: {storyProgress}%
          </div>
        </div>
        
        <div className="relative h-1 bg-white/20 rounded-full w-full mb-6">
          <div 
            className="absolute h-1 bg-white/60 rounded-full transition-all duration-500"
            style={{ width: `${storyProgress}%` }}
          ></div>
        </div>
        
        <motion.div
          className={`bg-black/30 backdrop-blur-sm rounded-2xl p-6 mb-6 ${fadeEffect ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          <p className="text-white text-lg leading-relaxed mb-6">
            {currentPoint.text}
          </p>
          
          <div className="space-y-3">
            {currentPoint.options.map((option, index) => (
              <motion.div 
                key={option.id}
                variants={slideUp}
                custom={index * 0.1}
                initial="hidden"
                animate="visible"
              >
                <Button
                  onClick={() => handleOptionSelect(option)}
                  className="w-full justify-between bg-white/10 hover:bg-white/20 text-white border border-white/30"
                >
                  <span>{option.text}</span>
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {history.length > 1 && (
          <div className="mt-8">
            <h3 className="text-sm text-white/70 mb-2 flex items-center">
              <Milestone className="h-4 w-4 mr-1" />
              Sua jornada até agora:
            </h3>
            <div className="bg-black/20 rounded-xl p-4 max-h-40 overflow-y-auto no-scrollbar">
              <ul className="space-y-2">
                {history.slice(0, -1).map((pointId, index) => {
                  const point = currentStory.storyPoints.find(p => p.id === pointId);
                  if (!point) return null;
                  
                  const nextPoint = currentStory.storyPoints.find(p => p.id === history[index + 1]);
                  const optionTaken = point.options.find(o => o.nextId === nextPoint?.id);
                  
                  return (
                    <li key={index} className="text-sm text-white/60">
                      {optionTaken ? `${index + 1}. ${optionTaken.text}` : `${index + 1}. Seguindo a história...`}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}