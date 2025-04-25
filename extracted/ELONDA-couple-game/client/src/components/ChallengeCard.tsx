import { useState, useEffect } from "react";
import { Challenge, IntensityLevel, ContentType } from "../types";
import { useLanguage } from "../hooks/useLanguage";

interface ChallengeCardProps {
  challenge: Challenge;
  onSkip: () => void;
  onComplete: (points: number) => void;
  intensity: IntensityLevel;
  forbiddenEnabled?: boolean;
  pairMode?: boolean;
  playerNames?: string[];
  showReward?: boolean;
  competitiveMode?: boolean;
}

// Cores e ícones para cada tipo de conteúdo
const contentTypeConfig: Record<ContentType, { icon: string, bgColor: string, textColor: string, labelKey: string }> = {
  pergunta: { 
    icon: "question", 
    bgColor: "bg-blue-600/20", 
    textColor: "text-blue-400", 
    labelKey: "content.question" 
  },
  desafio: { 
    icon: "fire", 
    bgColor: "bg-red-600/20", 
    textColor: "text-red-400", 
    labelKey: "content.challenge" 
  },
  premio: { 
    icon: "gift", 
    bgColor: "bg-green-600/20", 
    textColor: "text-green-400", 
    labelKey: "content.reward" 
  },
  penalidade: { 
    icon: "skull", 
    bgColor: "bg-yellow-600/20", 
    textColor: "text-yellow-400", 
    labelKey: "content.penalty" 
  }
};

export default function ChallengeCard({
  challenge,
  onSkip,
  onComplete,
  intensity,
  forbiddenEnabled = false,
  pairMode = false,
  playerNames = [],
  showReward = false,
  competitiveMode = false
}: ChallengeCardProps) {
  const { t, currentLanguage } = useLanguage();
  const [showForbidden, setShowForbidden] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const contentType = challenge.isReward ? "premio" : (challenge.type as ContentType || "desafio");
  const config = contentTypeConfig[contentType as ContentType];

  // Determinar qual texto usar baseado no idioma atual
  const getTranslatedText = () => {
    // Lógica para escolher o texto baseado no idioma
    if (showForbidden && challenge.hasForbiddenVersion) {
      if (currentLanguage === 'en' && challenge.forbiddenText_en) return challenge.forbiddenText_en;
      if (currentLanguage === 'es' && challenge.forbiddenText_es) return challenge.forbiddenText_es;
      if (currentLanguage === 'ru' && challenge.forbiddenText_ru) return challenge.forbiddenText_ru;
      if (currentLanguage === 'fr' && challenge.forbiddenText_fr) return challenge.forbiddenText_fr;
      return challenge.forbiddenText || "";
    } else {
      if (currentLanguage === 'en' && challenge.text_en) return challenge.text_en;
      if (currentLanguage === 'es' && challenge.text_es) return challenge.text_es;
      if (currentLanguage === 'ru' && challenge.text_ru) return challenge.text_ru;
      if (currentLanguage === 'fr' && challenge.text_fr) return challenge.text_fr;
      return challenge.text;
    }
  };

  // Substituir placeholders de nomes de jogadores se estiver no modo de pares
  let finalText = getTranslatedText();
  if (pairMode && playerNames.length >= 2 && challenge.requiresPair) {
    // Adaptado para diferentes idiomas
    if (currentLanguage === 'en') {
      finalText = finalText.replace(/partner/g, playerNames[1]);
    } else if (currentLanguage === 'es') {
      finalText = finalText.replace(/pareja/g, playerNames[1]);
    } else if (currentLanguage === 'ru') {
      finalText = finalText.replace(/партнер/g, playerNames[1]);
    } else if (currentLanguage === 'fr') {
      finalText = finalText.replace(/partenaire/g, playerNames[1]);
    } else {
      finalText = finalText.replace(/parceiro\(a\)/g, playerNames[1]);
    }
  }

  // Calcula pontos com base no tipo de conteúdo e intensidade
  const calculatePoints = (): number => {
    const intensityMultiplier = {
      suave: 5,
      picante: 10,
      selvagem: 15,
      extremo: 25
    };
    
    const typeMultiplier = {
      pergunta: 1,
      desafio: 1.5,
      premio: 2,
      penalidade: 1
    };
    
    // Se não estiver em modo competitivo, retorna 0 pontos
    if (!competitiveMode) return 0;
    
    const basePoints = intensityMultiplier[intensity || 'suave'];
    const multiplier = typeMultiplier[contentType as ContentType];
    
    // Bônus para perguntas proibidas
    const forbiddenBonus = (showForbidden && challenge.hasForbiddenVersion) ? 1.5 : 1;
    
    // Bônus para desafios em pares
    const pairBonus = (pairMode && challenge.requiresPair) ? 1.25 : 1;
    
    return Math.round(basePoints * multiplier * forbiddenBonus * pairBonus);
  };

  // Handler para quando o usuário completa um desafio
  const handleComplete = () => {
    const points = calculatePoints();
    onComplete(points);
  };

  // Efeito para mostrar confetti quando for um prêmio
  useEffect(() => {
    if (contentType === 'premio' || showReward) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [contentType, showReward]);

  return (
    <div 
      className={`bg-dark-100 rounded-xl p-4 md:p-6 shadow-lg w-full max-w-lg mx-auto
                 ${contentType === 'premio' ? 'border-2 border-green-600/50' : ''}
                 ${contentType === 'penalidade' ? 'border-2 border-yellow-600/50' : ''}`}
    >
      <div className="flex justify-between mb-3 md:mb-4">
        <span className={`inline-block px-2 py-1 md:px-3 md:py-1 rounded-full bg-intensity-${intensity}/20 text-intensity-${intensity} text-xs font-bold uppercase`}>
          {intensity}
        </span>
        
        <span className={`inline-block px-2 py-1 md:px-3 md:py-1 rounded-full ${config.bgColor} ${config.textColor} text-xs font-bold uppercase flex items-center`}>
          <i className={`fas fa-${config.icon} mr-1`}></i>
          {t(config.labelKey)}
        </span>
      </div>
      
      {/* Conteúdo principal */}
      <div className="my-4 md:my-6">
        <h3 className="text-base md:text-xl font-bold text-center">
          {finalText}
        </h3>
        
        {/* Exibição de pontos no modo competitivo */}
        {competitiveMode && (
          <div className="mt-3 text-center">
            <span className="inline-block px-3 py-1 rounded-full bg-yellow-600/20 text-yellow-400 text-xs font-bold">
              <i className="fas fa-star mr-1"></i>
              {calculatePoints()} {t('player.points')}
            </span>
          </div>
        )}
      </div>
      
      {/* Efeito Confetti para prêmios */}
      {showConfetti && (
        <div className="confetti-container">
          {/* Aqui adicionamos diferentes pedaços de confetti usando CSS */}
          {Array.from({ length: 50 }).map((_, i) => (
            <div 
              key={i} 
              className="confetti" 
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`
              }}
            />
          ))}
        </div>
      )}

      {/* Botão de pergunta proibida */}
      {forbiddenEnabled && challenge.hasForbiddenVersion && contentType === 'pergunta' && (
        <div className="my-3 md:my-4 text-center">
          <button
            onClick={() => setShowForbidden(!showForbidden)}
            className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm ${
              showForbidden 
                ? 'bg-purple-600 text-white' 
                : 'bg-purple-600/20 text-purple-400 hover:bg-purple-600/40'
            }`}
          >
            <i className="fas fa-key mr-1 md:mr-2"></i>
            {showForbidden 
              ? t('game.back_to_normal_question') 
              : t('game.reveal_forbidden_version')
            }
          </button>
        </div>
      )}

      {/* Modo Desafio em Pares */}
      {pairMode && challenge.requiresPair && (
        <div className="my-3 md:my-4 p-2 md:p-3 bg-dark-900 rounded-lg">
          <p className="text-xs md:text-sm text-gray-300 text-center">
            <i className="fas fa-users mr-1 md:mr-2"></i>
            {t('game.challenge_in_pairs')}
          </p>
        </div>
      )}
      
      {/* Botões de ação */}
      <div className="flex justify-between mt-6 md:mt-8">
        <button 
          onClick={onSkip}
          className="px-3 py-1.5 md:px-5 md:py-2 bg-red-600/20 hover:bg-red-600/40 text-red-400 rounded-lg flex items-center text-xs md:text-sm"
        >
          <i className="fas fa-times mr-1 md:mr-2"></i>
          {t('buttons.skip')}
        </button>
        
        <button 
          onClick={handleComplete}
          className={`px-3 py-1.5 md:px-5 md:py-2 ${
            contentType === 'premio' || showReward
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-green-600/20 hover:bg-green-600/40 text-green-400'
          } rounded-lg flex items-center text-xs md:text-sm`}
        >
          {t('buttons.completed')}
          <i className="fas fa-check ml-1 md:ml-2"></i>
        </button>
      </div>
    </div>
  );
}
