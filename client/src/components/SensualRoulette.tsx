import { useState, useEffect, useRef } from 'react';
import { ContentType } from '../types';
import { useLanguage } from '../hooks/useLanguage';
import confetti from 'canvas-confetti';

interface SensualRouletteProps {
  onSelect: (contentType: ContentType) => void;
  isSpinning: boolean;
  onSpinComplete: () => void;
  players?: Player[];
  partyMode?: boolean;
  onPlayerSelect?: (playerId: number) => void;
}

export default function SensualRoulette({ onSelect, isSpinning, onSpinComplete, players, partyMode, onPlayerSelect }: SensualRouletteProps) {
  const { t } = useLanguage();
  const [rotation, setRotation] = useState(0);
  const [selectedType, setSelectedType] = useState<ContentType>('pergunta');
  const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(null);

  // Refs para os sons da roleta
  const spinningAudioRef = useRef<HTMLAudioElement | null>(null);
  const completeAudioRef = useRef<HTMLAudioElement | null>(null);

  // Inicializa os elementos de áudio
  useEffect(() => {
    // Cria os elementos de áudio
    spinningAudioRef.current = new Audio('/sounds/roulette-spinning.mp3');
    completeAudioRef.current = new Audio('/sounds/roulette-complete.mp3');

    // Define as propriedades
    if (spinningAudioRef.current) {
      spinningAudioRef.current.volume = 0.5;
      spinningAudioRef.current.loop = true;

      // Pré-carrega o áudio
      spinningAudioRef.current.load();
    }

    if (completeAudioRef.current) {
      completeAudioRef.current.volume = 0.5;

      // Pré-carrega o áudio
      completeAudioRef.current.load();
    }

    // Cleanup
    return () => {
      if (spinningAudioRef.current) {
        spinningAudioRef.current.pause();
      }
      if (completeAudioRef.current) {
        completeAudioRef.current.pause();
      }
    };
  }, []);

  // Função para retornar a cor correspondente ao tipo de conteúdo
  const getColorForType = (type: ContentType): string => {
    switch (type) {
      case 'pergunta':
        return 'text-blue-400';
      case 'desafio':
        return 'text-red-400';
      case 'premio':
        return 'text-green-400';
      case 'penalidade':
        return 'text-yellow-400';
      default:
        return 'text-white';
    }
  };

  const options: Array<{type: ContentType, label: string, translateKey: string, color: string, bgColor: string, icon: string}> = [
    { 
      type: 'pergunta', 
      label: 'Pergunta', 
      translateKey: 'content.question',
      color: 'text-blue-400',
      bgColor: 'bg-blue-600', 
      icon: 'question' 
    },
    { 
      type: 'desafio', 
      label: 'Desafio', 
      translateKey: 'content.challenge',
      color: 'text-red-400',
      bgColor: 'bg-red-600', 
      icon: 'fire' 
    },
    { 
      type: 'premio', 
      label: 'Prêmio', 
      translateKey: 'content.reward',
      color: 'text-green-400',
      bgColor: 'bg-green-600', 
      icon: 'gift' 
    },
    { 
      type: 'penalidade', 
      label: 'Penalidade', 
      translateKey: 'content.penalty',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-600', 
      icon: 'skull' 
    }
  ];

  // Efeito para controlar o som com base no status de giro
  useEffect(() => {
    const playSpinningSound = async () => {
      if (spinningAudioRef.current) {
        try {
          spinningAudioRef.current.currentTime = 0;
          await spinningAudioRef.current.play();
        } catch (err) {
          console.error('Erro ao reproduzir som da roleta:', err);
        }
      }
    };

    const stopSpinningSound = () => {
      if (spinningAudioRef.current) {
        spinningAudioRef.current.pause();
        spinningAudioRef.current.currentTime = 0;
      }
    };

    if (isSpinning) {
      playSpinningSound();
    } else {
      stopSpinningSound();
    }

    return () => {
      stopSpinningSound();
    };
  }, [isSpinning]);

  useEffect(() => {
    if (isSpinning) {
      // Configurações de animação
      const minSpins = 5; // Mínimo de voltas completas
      const maxSpins = 10; // Máximo de voltas completas
      const spinDuration = 4000; // Duração total da animação em ms
      const easeOutDuration = 2000; // Duração do efeito de desaceleração

      // Calcula rotação total aleatória
      const spins = minSpins + Math.random() * (maxSpins - minSpins);
      const extraAngle = Math.random() * 360;
      const totalRotation = (spins * 360) + extraAngle;

      let startTime: number | null = null;
      let animationFrame: number;

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const elapsedTime = currentTime - startTime;
        
        if (elapsedTime < spinDuration) {
          // Calcula progresso da animação
          const progress = elapsedTime / spinDuration;
          
          // Aplica efeito de ease-out quadrático nos últimos 2 segundos
          let currentRotation;
          if (elapsedTime > spinDuration - easeOutDuration) {
            const easeOutProgress = (elapsedTime - (spinDuration - easeOutDuration)) / easeOutDuration;
            const easeOut = 1 - Math.pow(1 - easeOutProgress, 3); // Cubic ease-out
            currentRotation = totalRotation * (1 - easeOut) + totalRotation * easeOut;
          } else {
            // Rotação linear inicial
            currentRotation = totalRotation * (progress * 1.5); // Multiplicador para início mais rápido
          }

          setRotation(currentRotation);
          animationFrame = requestAnimationFrame(animate);
        } else {
          // Finaliza animação
          setRotation(totalRotation);
          
          // Determina seção final
          const finalAngle = totalRotation % 360;
          const sectionSize = 360 / options.length;
          const sectionIndex = Math.floor(finalAngle / sectionSize);
          const selected = options[sectionIndex % options.length].type;

          // Toca som de conclusão
          if (completeAudioRef.current) {
            completeAudioRef.current.play().catch(console.error);
          }

          // Pequeno delay antes de completar
          setTimeout(() => {
            setSelectedType(selected);
            onSelect(selected);
            onSpinComplete();
          }, 500);
        }
      };

      // Inicia animação
      animationFrame = requestAnimationFrame(animate);

      // Cleanup
      return () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
        }
      };
    }
  }, [isSpinning]);

  const getRandomPlayer = () => {
    if (!players || players.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * players.length);
    return players[randomIndex];
  };

  useEffect(() => {
    if (!isSpinning || !partyMode || !players) return;
    
    const spinTimer = setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * players.length);
      const selectedPlayer = players[randomIndex];
      
      if (selectedPlayer) {
        setSelectedPlayerId(selectedPlayer.id);
        if (onPlayerSelect) {
          onPlayerSelect(selectedPlayer.id);
        }
      }
      
      // Toca o som de conclusão
      if (completeAudioRef.current) {
        completeAudioRef.current.play().catch(console.error);
      }
    }, 3000);

    return () => clearTimeout(spinTimer);
  }, [isSpinning, partyMode, players]);

  return (
    <div className="relative w-full max-w-[95vw] md:max-w-md mx-auto my-2 md:my-4 touch-manipulation">
      {!isSpinning && partyMode && players && players.length > 0 && (
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 text-center">
          <h3 className="text-xl font-bold text-white mb-2">Jogador da Vez</h3>
          <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            {isSpinning ? "Sorteando..." : players.find(p => p.id === selectedPlayerId)?.name || "Clique para sortear"}
          </div>
        </div>
      )}
      {/* Seção de créditos e frases estimulantes */}
      <div className="mb-8 text-center text-sm">
        <div className="mb-4 space-y-2">
          <p className="text-light-200/70 italic">"Deixe a paixão guiar seus momentos"</p>
          <p className="text-light-200/70 italic">"Cada giro é uma nova aventura"</p>
          <p className="text-light-200/70 italic">"Explore, descubra, sinta"</p>
        </div>
        
        <div className="mt-6 text-[10px] text-light-200/40">
          <p>Desenvolvido com ❤️ por</p>
          <p className="font-semibold">Elias Londa Francisco Salomão</p>
          <p className="mt-2 text-[9px]">Um jogo sensual para casais que desejam explorar novos níveis de intimidade e diversão juntos.</p>
        </div>
      </div>
      {/* Ponteiro da roleta com efeito de brilho avançado */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-6 h-12 flex flex-col items-center">
        <div className="w-full h-full bg-gradient-to-b from-pink-500 to-purple-600 shadow-md rounded-b-full relative overflow-hidden">
          <div className={`absolute inset-0 bg-white opacity-20 ${isSpinning ? 'animate-pulse' : ''}`}></div>
          {/* Efeito de brilho interno pulsante */}
          <div className={`absolute top-1/4 left-1/4 right-1/4 bottom-1/4 bg-white rounded-full blur-sm opacity-70 ${isSpinning ? 'animate-ping' : ''}`}></div>
        </div>
        {/* Sombra de brilho abaixo do ponteiro */}
        <div className={`w-4 h-4 -mt-1 rounded-full bg-pink-500 opacity-50 blur-sm ${isSpinning ? 'animate-pulse' : ''}`}></div>
        {/* Raios de luz animados quando girando */}
        {isSpinning && (
          <>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 animate-ping opacity-40">
              <div className="w-full h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur-md"></div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 animate-pulse opacity-20">
              <div className="w-full h-full bg-gradient-to-r from-pink-400 to-purple-400 rounded-full blur-lg"></div>
            </div>
          </>
        )}
      </div>

      {/* Círculos de brilho atrás da roleta */}
      {isSpinning && (
        <>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full animate-glow animate-rotate-slow opacity-30 pointer-events-none">
            <div className="w-full h-full rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 blur-md"></div>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] h-[95%] animate-pulse-light animate-rotate-slow opacity-30 pointer-events-none" style={{animationDuration: '7s', animationDirection: 'reverse'}}>
            <div className="w-full h-full rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 blur-md"></div>
          </div>
        </>
      )}

      <div 
        className={`w-full aspect-square rounded-full relative overflow-hidden border-4 border-pink-500 shadow-xl glass-card ${isSpinning ? 'animate-pulse-light animate-spin-fast' : ''}`}
        style={{ 
          transform: `rotate(${rotation}deg)`, 
          transition: isSpinning ? 'transform 0.016s linear' : 'transform 0.5s ease-out',
          boxShadow: isSpinning 
            ? '0 0 20px rgba(236, 72, 153, 0.7), 0 0 40px rgba(168, 85, 247, 0.5)' 
            : '0 0 15px rgba(236, 72, 153, 0.5), 0 0 30px rgba(168, 85, 247, 0.3)'
        }}
      >
        {options.map((option, index) => {
          const rotate = (index * 90);
          return (
            <div
              key={option.type}
              className={`absolute top-0 left-0 right-0 bottom-0 ${option.bgColor} transition-all duration-300 cursor-pointer hover:brightness-110`}
              style={{
                clipPath: `polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 50% 100%)`,
                transform: `rotate(${rotate}deg)`,
                filter: selectedType === option.type ? 'brightness(1.4) saturate(1.3)' : 'brightness(1)',
                boxShadow: selectedType === option.type ? 'inset 0 0 30px rgba(255,255,255,0.4), 0 0 20px rgba(255,255,255,0.2)' : 'none'
              }}
              onClick={() => {
                if (!isSpinning) {
                  setSelectedType(option.type);
                  // Adiciona efeito de confete ao selecionar
                  confetti({
                    particleCount: 50,
                    spread: 60,
                    origin: { y: 0.6 },
                    colors: [option.bgColor.replace('bg-', '#')],
                  });
                }
              }}
            >
              <div 
                className={`absolute top-1/4 left-3/4 -translate-x-1/2 -translate-y-1/2 text-white font-bold transform -rotate-45 flex flex-col items-center ${isSpinning ? 'opacity-0' : ''}`}
                style={{ transform: `rotate(${45 - rotate}deg)` }}
              >
                <div className={`relative mb-2 p-2 ${selectedType === option.type ? 'bg-white/30' : 'bg-black/20'} rounded-full flex items-center justify-center w-10 h-10 md:w-12 md:h-12 shadow-inner`}>
                  <i className={`fas fa-${option.icon} text-xl md:text-2xl ${selectedType === option.type ? 'text-white' : ''}`}></i>
                </div>
                {!isSpinning && <span className="text-sm md:text-base px-2 py-1 rounded-full bg-black/30">{t(option.translateKey)}</span>}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <p className="text-lg font-semibold mb-4 text-white">
          {isSpinning 
            ? t('game.spinning') 
            : <>
                <span>{t('game.selected')}: </span>
                <span className={`font-bold ${options.find(o => o.type === selectedType)?.color || 'text-white'}`}>
                  <i className={`fas fa-${options.find(o => o.type === selectedType)?.icon} mr-2`}></i>
                  {t(options.find(o => o.type === selectedType)?.translateKey || '')}
                </span>
              </>
          }
        </p>
        <button
          onClick={() => {
            // Dispara confetes ao confirmar a seleção
            const selectedOption = options.find(o => o.type === selectedType);
            if (selectedOption) {
              // Escolhe cores com base no tipo selecionado
              let colors: string[] = [];

              switch (selectedType) {
                case 'pergunta':
                  colors = ['#60a5fa', '#3b82f6', '#2563eb']; // Tons de azul
                  break;
                case 'desafio':
                  colors = ['#f87171', '#ef4444', '#dc2626']; // Tons de vermelho
                  break;
                case 'premio':
                  colors = ['#4ade80', '#22c55e', '#16a34a']; // Tons de verde
                  break;
                case 'penalidade':
                  colors = ['#facc15', '#eab308', '#ca8a04']; // Tons de amarelo
                  break;
                default:
                  colors = ['#ec4899', '#d946ef', '#a855f7']; // Cores padrão roxo/rosa
              }

              // Dispara o confete com as cores selecionadas
              confetti({
                particleCount: 200,
                spread: 70,
                origin: { y: 0.6 },
                colors: colors,
                zIndex: 2000,
                disableForReducedMotion: true,
              });
            }

            // Chama o callback de seleção
            onSelect(selectedType);
          }}
          className={`px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-purple-900/30 transform hover:scale-105 ${isSpinning ? '' : 'animate-pulse shiny-button'}`}
          disabled={isSpinning}
        >
          <span className="flex items-center justify-center">
            <i className={`fas fa-${isSpinning ? 'spinner fa-spin' : 'check'} mr-2`}></i>
            {t('buttons.confirm')}
          </span>
        </button>
      </div>
    </div>
  );
}