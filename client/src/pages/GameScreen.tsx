import { Dispatch, SetStateAction, useEffect, useState, useCallback } from 'react';
import { GameState, Challenge, ContentType, PlayerPreference, Memory } from '../types';
import ChallengeCard from '../components/ChallengeCard';
import SensualRoulette from '../components/SensualRoulette';
import MusicPlayer from '../components/MusicPlayer';
import PlayerScoreCard from '../components/PlayerScoreCard';
import MemoryAlbum from '../components/MemoryAlbum';
import ConnectionTest from '../components/ConnectionTest';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';

interface GameScreenProps {
  gameState: GameState;
  setGameState: Dispatch<SetStateAction<GameState>>;
}

export default function GameScreen({ gameState, setGameState }: GameScreenProps) {
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedContentType, setSelectedContentType] = useState<ContentType>('desafio');
  const [pairPlayerIndices, setPairPlayerIndices] = useState<number[]>([]);

  const { data: challenges, isLoading } = useQuery<Challenge[]>({
    queryKey: ['/api/challenges', gameState.intensity, gameState.relationshipType],
  });

  // Calcular a intensidade dinâmica com base na rodada
  const getCurrentIntensity = useCallback(() => {
    if (!gameState.options.dynamicIntensity) return gameState.intensity;

    // A intensidade aumenta a cada 3 rodadas
    const intensityLevels = ['suave', 'picante', 'selvagem', 'extremo'];
    const currentIntensityIndex = intensityLevels.indexOf(gameState.intensity as string);
    const roundFactor = Math.floor((gameState.currentRound - 1) / 3);
    const newIntensityIndex = Math.min(currentIntensityIndex + roundFactor, intensityLevels.length - 1);

    return intensityLevels[newIntensityIndex] as any;
  }, [gameState.intensity, gameState.currentRound, gameState.options.dynamicIntensity]);

  // Selecionar aleatoriamente um parceiro para desafios em pares
  const selectRandomPair = useCallback(() => {
    const currentPlayerIndex = gameState.currentPlayerIndex;
    let otherPlayerIndices = Array.from({length: gameState.playerCount}, (_, i) => i).filter(i => i !== currentPlayerIndex);

    // Embaralhar para escolher aleatoriamente
    otherPlayerIndices.sort(() => Math.random() - 0.5);

    // Selecionar o primeiro jogador diferente
    setPairPlayerIndices([currentPlayerIndex, otherPlayerIndices[0]]);

    setGameState(prev => ({
      ...prev,
      selectedPairIds: [gameState.players[currentPlayerIndex].id, gameState.players[otherPlayerIndices[0]].id]
    }));
  }, [gameState.players, gameState.currentPlayerIndex, gameState.playerCount]);

  // Seleção e preparação do desafio
  const prepareNewChallenge = useCallback(() => {
    if (!challenges || challenges.length === 0) return;

    const currentIntensity = getCurrentIntensity();

    // Filtrar por tipo de conteúdo, intensidade e tipo de relacionamento
    const filteredChallenges = challenges.filter(c => {
      // Verificar tipo de conteúdo
      const matchesType = c.type === selectedContentType || (c.type === null && selectedContentType === 'desafio');
      
      // Verificar intensidade
      const matchesIntensity = c.intensity === currentIntensity;
      
      // Verificar tipo de relacionamento
      const matchesRelationship = c.relationshipType === gameState.relationshipType || c.relationshipType === null;
      
      // Verificar requisitos de pares para modo festa
      const matchesPairRequirement = gameState.options.partyMode ? 
        (gameState.options.partyModeOptions?.groupChallenges ? true : !c.requiresPair) : 
        (gameState.options.challengeInPairs ? true : !c.requiresPair);
      
      return matchesType && matchesIntensity && matchesRelationship && matchesPairRequirement;
    }
    );

    // Verificar se o desafio é em pares e filtrar se necessário
    const validChallenges = gameState.options.challengeInPairs
      ? filteredChallenges
      : filteredChallenges.filter(c => !c.requiresPair);

    if (validChallenges.length > 0) {
      const randomIndex = Math.floor(Math.random() * validChallenges.length);
      const newChallenge = validChallenges[randomIndex];

      // Selecionar um par aleatório se o desafio requer um par
      if (newChallenge.requiresPair && gameState.options.challengeInPairs) {
        selectRandomPair();
      }

      setChallenge(newChallenge);

      // Iniciar temporizador se a opção estiver ativada
      if (gameState.options.timer) {
        setTimeLeft(30); // 30 segundos para completar o desafio
      }
    } else {
      // Fallback se não houver desafios que correspondam aos critérios
      setChallenge({
        id: 0,
        text: "Nenhum desafio encontrado para essa combinação. Tente outro tipo!",
        intensity: currentIntensity,
        relationshipType: gameState.relationshipType,
        type: selectedContentType
      });
    }

    // Resetar roulette state
    setIsSpinning(false);
  }, [challenges, gameState.options.challengeInPairs, gameState.relationshipType, getCurrentIntensity, selectedContentType, selectRandomPair, gameState.options.timer]);

  // Temporizador para desafios
  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => (prev !== null ? prev - 1 : null));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Reiniciar desafio quando o jogador ou a rodada mudar
  useEffect(() => {
    if (gameState.rouletteMode) {
      setChallenge(null);
    } else {
      prepareNewChallenge();
    }
  }, [gameState.currentRound, gameState.currentPlayerIndex, gameState.rouletteMode, prepareNewChallenge]);

  const currentPlayer = gameState.players[gameState.currentPlayerIndex];
  const currentPlayerPrefs = currentPlayer.preferences || {} as PlayerPreference;

  // Obter nomes de jogadores para desafio em pares
  const getPairPlayerNames = (): string[] => {
    if (pairPlayerIndices.length !== 2) return [];
    return pairPlayerIndices.map(index => gameState.players[index].name);
  };

  const handleSkipChallenge = () => {
    if (gameState.options.competitiveMode) {
      // Em modo competitivo, aplicar uma penalidade por pular
      setSelectedContentType('penalidade');
      prepareNewChallenge();
    } else {
      nextTurn();
    }
  };

  const { toast } = useToast();

  // Verifica conquistas e as desbloqueia se necessário
  const checkAndUnlockAchievements = (playerId: number) => {
    if (!gameState.options.competitiveMode) return;

    const playerStats = gameState.playerStats[playerId];
    if (!playerStats) return;

    // Verifica cada conquista que ainda não está desbloqueada
    playerStats.achievements.forEach((achievement, index) => {
      if (!achievement.isUnlocked && playerStats.points >= achievement.requiredPoints) {
        // Desbloquear a conquista
        setGameState(prev => {
          const newStats = { ...prev.playerStats };
          newStats[playerId].achievements[index].isUnlocked = true;
          newStats[playerId].achievements[index].unlockedAt = new Date();

          return {
            ...prev,
            playerStats: newStats
          };
        });

        // Mostrar notificação
        toast({
          title: `🏆 ${achievement.title}`,
          description: achievement.description,
          variant: "default"
        });
      }
    });
  };

  // Quando um desafio é completado
  const handleCompleteChallenge = (points: number) => {
    if (!gameState.options.competitiveMode) {
      // Modo normal sem pontuação
      if (selectedContentType === 'premio') {
        // Se completou um prêmio, dar outro turno ao mesmo jogador
        prepareNewChallenge();
      } else {
        nextTurn();
      }
      return;
    }

    // Adicionar pontos ao jogador atual
    const currentPlayerId = gameState.players[gameState.currentPlayerIndex].id;

    setGameState(prev => {
      // Copiar estatísticas atuais
      const newStats = { ...prev.playerStats };

      // Criar estatísticas do jogador se não existirem
      if (!newStats[currentPlayerId]) {
        newStats[currentPlayerId] = {
          points: 0,
          challengesCompleted: 0,
          questionsAnswered: 0,
          achievements: [],
          connectionLevel: 5
        };
      }

      // Atualizar estatísticas específicas
      if (selectedContentType === 'pergunta' || challenge?.type === 'pergunta') {
        newStats[currentPlayerId].questionsAnswered += 1;
      } else {
        newStats[currentPlayerId].challengesCompleted += 1;
      }

      // Adicionar pontos
      newStats[currentPlayerId].points += points;

      // Calcular pontuação total
      const totalPoints = Object.values(newStats).reduce(
        (sum, playerStat) => sum + playerStat.points, 0
      );

      return {
        ...prev,
        playerStats: newStats,
        totalPoints
      };
    });

    // Verificar conquistas desbloqueadas
    checkAndUnlockAchievements(currentPlayerId);

    // Verificar se deve criar uma memória baseada neste desafio
    if (challenge && ((selectedContentType === 'desafio' && Math.random() < 0.2) || selectedContentType === 'premio')) {
      // Sugerir criar uma memória (20% de chance para desafios, 100% para prêmios)
      toast({
        title: "💖 Momento Especial!",
        description: "Quer salvar este momento no álbum de memórias?",
        action: (
          <button 
            onClick={() => {
              if (challenge) {
                const currentPlayer = gameState.players[gameState.currentPlayerIndex];

                // Determinar os jogadores envolvidos
                let playerIds = [currentPlayer.id];
                if (gameState.selectedPairIds) {
                  playerIds = [...gameState.selectedPairIds];
                }

                // Determinar o clima baseado no tipo de conteúdo
                let mood: 'romantic' | 'funny' | 'exciting' | 'emotional' = 'exciting';
                if (selectedContentType === 'pergunta') mood = 'emotional';
                if (selectedContentType === 'premio') mood = 'romantic';
                if (selectedContentType === 'penalidade') mood = 'funny';

                // Criar nova memória
                const newMemory: Memory = {
                  id: Date.now().toString(),
                  date: new Date(),
                  title: `${currentPlayer.name} - ${challenge.text.slice(0, 30)}...`,
                  description: challenge.text,
                  playerIds,
                  mood,
                  relatedChallenge: challenge
                };

                // Adicionar a memória ao estado do jogo
                setGameState(prev => ({
                  ...prev,
                  memories: [...prev.memories, newMemory]
                }));

                // Notificar o usuário
                toast({
                  title: "✅ Memória Salva",
                  description: "Este momento especial foi adicionado ao álbum de memórias.",
                  variant: "default"
                });
              }
            }} 
            className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded text-xs"
          >
            Salvar Memória
          </button>
        ),
        variant: "default"
      });
    }

    if (selectedContentType === 'premio') {
      // Se completou um prêmio, dar outro turno ao mesmo jogador
      prepareNewChallenge();
    } else {
      nextTurn();
    }
  };

  const handleRouletteSelect = (contentType: ContentType) => {
    setSelectedContentType(contentType);
    
    // Se estiver no modo festa, manter a roleta ativa
    if (!gameState.options.partyMode) {
      setGameState(prev => ({
        ...prev,
        rouletteMode: false,
        questionMode: contentType === 'pergunta'
      }));
    } else {
      // No modo festa, preparar novo desafio mantendo a roleta
      prepareNewChallenge();
    }
  };

  const handleSpinRoulette = () => {
    setIsSpinning(true);
  };

  const nextTurn = () => {
    setTimeLeft(null);

    const nextPlayerIndex = (gameState.currentPlayerIndex + 1) % gameState.playerCount;
    let turnsPerRound = 2; // Número de turnos por rodada

    // Se completamos dois turnos (uma pergunta/desafio por jogador), aumentar a rodada
    const totalTurns = gameState.currentRound * gameState.playerCount;
    const newRound = Math.floor((totalTurns + 1) / turnsPerRound) + 1;

    setGameState(prev => ({
      ...prev,
      currentPlayerIndex: nextPlayerIndex,
      currentRound: newRound,
      // Se a roleta estiver ativada, mostrar no próximo turno
      rouletteMode: prev.options.competitiveMode || gameState.rouletteMode,
      selectedPairIds: null
    }));
  };

  const handleBackToSettings = () => {
    setGameState(prev => ({
      ...prev,
      gameStarted: false
    }));
  };

  const handleVolumeChange = (volume: number) => {
    setGameState(prev => ({
      ...prev,
      volumeLevel: volume
    }));
  };

  // Função para adicionar uma memória ao álbum
  const handleCreateMemory = () => {
    if (!challenge) return;

    const currentPlayer = gameState.players[gameState.currentPlayerIndex];

    // Determinar os jogadores envolvidos
    let playerIds = [currentPlayer.id];
    if (gameState.selectedPairIds) {
      playerIds = [...gameState.selectedPairIds];
    }

    // Determinar o clima baseado no tipo de conteúdo
    let mood: 'romantic' | 'funny' | 'exciting' | 'emotional' = 'exciting';
    if (selectedContentType === 'pergunta') mood = 'emotional';
    if (selectedContentType === 'premio') mood = 'romantic';
    if (selectedContentType === 'penalidade') mood = 'funny';

    // Criar nova memória
    const newMemory: Memory = {
      id: Date.now().toString(),
      date: new Date(),
      title: `${currentPlayer.name} - ${challenge.text.slice(0, 30)}...`,
      description: challenge.text,
      playerIds,
      mood,
      relatedChallenge: challenge
    };

    // Adicionar a memória ao estado do jogo
    setGameState(prev => ({
      ...prev,
      memories: [...prev.memories, newMemory]
    }));

    // Notificar o usuário
    toast({
      title: "✅ Memória Salva",
      description: "Este momento especial foi adicionado ao álbum de memórias.",
      variant: "default"
    });

    // Verificar conquista específica de memórias
    if (gameState.options.competitiveMode) {
      const playerStats = gameState.playerStats[currentPlayer.id];
      if (playerStats) {
        const memoryAchievement = playerStats.achievements.find(a => a.id === 'memory_master');
        if (memoryAchievement && !memoryAchievement.isUnlocked) {
          const playerMemoriesCount = gameState.memories.filter(m => 
            m.playerIds.includes(currentPlayer.id)
          ).length + 1; // +1 para incluir esta nova memória

          if (playerMemoriesCount >= 5) {
            checkAndUnlockAchievements(currentPlayer.id);
          }
        }
      }
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-dark-900 z-50 flex items-center justify-center">
        <div className="text-white text-xl">Carregando desafios...</div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-dark-900 z-50 overflow-y-auto">
      <div className="container mx-auto px-3 md:px-4 py-4 md:py-8 h-full flex flex-col">
        {/* Game Header */}
        <header className="text-center mb-4 md:mb-8">
          <div className="glass-card rounded-xl md:rounded-2xl p-2 md:p-4 inline-block mb-2">
            <h1 className="mobile-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 neon-text">
              Rodada {gameState.currentRound}
            </h1>
          </div>

          <p className="text-white text-base md:text-lg font-semibold mb-2 md:mb-3">
            Vez de <span className="text-primary neon-text">{currentPlayer.name}</span>
          </p>

          <div className="flex items-center justify-center gap-2 md:gap-3">
            {/* Indicador de Intensidade Dinâmica */}
            {gameState.options.dynamicIntensity && (
              <div className="px-3 py-1.5 md:px-4 md:py-2 glass-card rounded-full text-xs md:text-sm text-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4 mr-1 inline" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                </svg>
                <span className="font-bold">{getCurrentIntensity().charAt(0).toUpperCase() + getCurrentIntensity().slice(1)}</span>
              </div>
            )}

            {/* Temporizador */}
            {timeLeft !== null && (
              <div className={`px-3 py-1.5 md:px-4 md:py-2 glass-card rounded-full text-xs md:text-sm font-medium ${timeLeft <= 10 ? 'text-red-400' : 'text-gray-200'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4 mr-1 inline" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                {timeLeft}s
              </div>
            )}
          </div>
        </header>

        {/* Área de Conteúdo */}
        <div className="flex-1 flex items-center justify-center">
          {gameState.rouletteMode ? (
            <div className="text-center w-full max-w-sm md:max-w-lg mx-auto">
              <h2 className="text-xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 neon-text mb-3 md:mb-6">Roleta Sensual</h2>
              <div className="glass-card p-3 md:p-6 rounded-xl md:rounded-2xl mb-4 md:mb-6">
                <SensualRoulette 
                  onSelect={handleRouletteSelect} 
                  isSpinning={isSpinning}
                  onSpinComplete={() => {}}
                  players={gameState.players}
                  partyMode={gameState.options.partyMode}
                  onPlayerSelect={(playerId) => {
                    setGameState(prev => ({
                      ...prev,
                      currentPlayerIndex: prev.players.findIndex(p => p.id === playerId)
                    }));
                  }}
                />
              </div>
              {!isSpinning && (
                <button 
                  onClick={handleSpinRoulette}
                  className="px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white rounded-lg md:rounded-xl text-sm md:text-base font-semibold mt-3 md:mt-4 shadow-lg shadow-purple-900/30 shiny-button transform hover:scale-105 transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 mr-1 md:mr-2 inline" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                  </svg>
                  Girar Roleta
                </button>
              )}
            </div>
          ) : challenge ? (
            <ChallengeCard
              challenge={challenge}
              onSkip={handleSkipChallenge}
              onComplete={handleCompleteChallenge}
              intensity={getCurrentIntensity()}
              forbiddenEnabled={gameState.options.forbiddenQuestion}
              pairMode={gameState.options.challengeInPairs && challenge.requiresPair}
              playerNames={getPairPlayerNames()}
              showReward={selectedContentType === 'premio' || challenge.isReward}
              competitiveMode={gameState.options.competitiveMode}
            />
          ) : (
            <div className="text-center text-white">
              <p>Carregando o próximo desafio...</p>
            </div>
          )}
        </div>

        {/* Game Controls */}
        <footer className="mt-6 text-center">
          {/* Opções de tipo de conteúdo */}
          {!gameState.rouletteMode && gameState.options.allowChooseType && (
            <div className="mb-4 md:mb-6">
              <div className="text-white text-xs md:text-sm mb-2 md:mb-3 font-medium">Escolha o tipo:</div>
              <div className="flex flex-wrap justify-center gap-2 md:gap-4">
                <button
                  onClick={() => {
                    setSelectedContentType('pergunta');
                    setGameState(prev => ({ ...prev, questionMode: true }));
                    prepareNewChallenge();
                  }}
                  className={`px-3 py-2 md:px-6 md:py-3 rounded-lg md:rounded-xl text-xs md:text-sm font-semibold transition-all transform hover:scale-105 ${
                    selectedContentType === 'pergunta' 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-900/30 shiny-button' 
                    : 'glass-card text-gray-200 hover:text-white'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 mr-1 md:mr-2 inline" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                  Pergunta
                </button>

                <button
                  onClick={() => {
                    // Escolhe aleatoriamente entre pergunta ou desafio
                    const randomType = Math.random() > 0.5 ? 'pergunta' : 'desafio';
                    setSelectedContentType(randomType);
                    setGameState(prev => ({ ...prev, questionMode: randomType === 'pergunta' }));
                    prepareNewChallenge();
                  }}
                  className="px-3 py-2 md:px-6 md:py-3 rounded-lg md:rounded-xl text-xs md:text-sm font-semibold transition-all transform hover:scale-105 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white shadow-lg shadow-indigo-900/30 shiny-button"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 mr-1 md:mr-2 inline" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                  Ou Desafio
                </button>

                <button
                  onClick={() => {
                    setSelectedContentType('desafio');
                    setGameState(prev => ({ ...prev, questionMode: false }));
                    prepareNewChallenge();
                  }}
                  className={`px-3 py-2 md:px-6 md:py-3 rounded-lg md:rounded-xl text-xs md:text-sm font-semibold transition-all transform hover:scale-105 ${
                    selectedContentType === 'desafio' 
                    ? 'bg-gradient-to-r from-pink-600 to-red-600 text-white shadow-lg shadow-red-900/30 shiny-button' 
                    : 'glass-card text-gray-200 hover:text-white'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 mr-1 md:mr-2 inline" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                  </svg>
                  Desafio
                </button>
              </div>
            </div>
          )}

          <div className="flex justify-center space-x-2 md:space-x-4">
            <button 
              onClick={handleBackToSettings}
              className="px-3 py-2 md:px-5 md:py-3 glass-card hover:text-white text-gray-300 rounded-lg md:rounded-xl text-xs md:text-sm font-medium transition-all transform hover:scale-105"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 mr-1 md:mr-2 inline" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c.379 1.561 1.561 2.6 0 2.978a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 012.287.947c.379 1.561 1.561 2.6 0 2.978a1.533 1.533 0 012.287-.947c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287c1.372.836 2.942-.734 2.106-2.106a1.532 1.532 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
              Configurações
            </button>

            {!gameState.rouletteMode && (
              <button
                onClick={() => setGameState(prev => ({ ...prev, rouletteMode: true }))}
                className="px-3 py-2 md:px-5 md:py-3 glass-card hover:text-white text-gray-300 rounded-lg md:rounded-xl text-xs md:text-sm font-medium transition-all transform hover:scale-105"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 mr-1 md:mr-2 inline" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
                </svg>
                Roleta
              </button>
            )}
          </div>
        </footer>
      </div>

      {/* Interface para estatísticas e memórias */}
      {gameState.options.competitiveMode && (
        <div className="fixed right-3 bottom-16 md:right-5 md:bottom-20">
          <div className="dropdown dropdown-end">
            <button 
              className="p-2 md:p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-lg text-white flex items-center justify-center hover:scale-110 transition-transform"
              onClick={() => {
                toast({
                  title: "Estatísticas do Jogo",
                  description: (
                    <div className="mt-2 space-y-2">
                      <div className="glass-card p-2 rounded-lg mb-2 bg-opacity-60">
                        <p className="text-sm font-medium text-center text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                          Pontuação Total: {gameState.totalPoints} pontos
                        </p>
                      </div>
                      <div className="max-h-72 overflow-y-auto">
                        {gameState.players.map(player => {
                          const stats = gameState.playerStats[player.id];
                          if (!stats) return null;
                          return (
                            <PlayerScoreCard 
                              key={player.id} 
                              player={player} 
                              stats={stats} 
                              totalPoints={gameState.totalPoints}
                              showDetails={false}
                            />
                          );
                        })}
                      </div>
                    </div>
                  ),
                  variant: "default"
                });
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {challenge && (
        <div className="fixed left-3 bottom-16 md:left-5 md:bottom-20">
          <div className="dropdown dropdown-end">
            <button 
              onClick={() => {
                toast({
                  title: "Nova Memória",
                  description: (
                    <div className="mt-2">
                      <MemoryAlbum 
                        memories={gameState.memories} 
                        players={gameState.players}
                        onAddMemory={(memoryData) => {
                          const newMemory: Memory = {
                            ...memoryData,
                            id: Date.now().toString(),
                            date: new Date()
                          };

                          setGameState(prev => ({
                            ...prev,
                            memories: [...prev.memories, newMemory]
                          }));
                        }}
                      />
                    </div>
                  ),
                  variant: "default"
                });
              }}
              className="p-2 md:p-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full shadow-lg text-white flex items-center justify-center hover:scale-110 transition-transform animate-pulse-light"
              title="Salvar momento atual como memória"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {gameState.memories.length > 0 && (
        <div className="fixed left-3 bottom-28 md:left-5 md:bottom-36">
          <div className="dropdown dropdown-end">
            <button 
              className="p-2 md:p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-lg text-white flex items-center justify-center hover:scale-110 transition-transform"
              onClick={() => {
                toast({
                  title: "Álbum de Memórias",
                  description: (
                    <div className="mt-2">
                      <MemoryAlbum 
                        memories={gameState.memories} 
                        players={gameState.players}
                        onAddMemory={(memoryData) => {
                          const newMemory: Memory = {
                            ...memoryData,
                            id: Date.now().toString(),
                            date: new Date()
                          };

                          setGameState(prev => ({
                            ...prev,
                            memories: [...prev.memories, newMemory]
                          }));
                        }}
                      />
                    </div>
                  ),
                  variant: "default"
                });
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Music Player */}
      {gameState.options.musicEnabled && (
        <MusicPlayer 
          isEnabled={gameState.options.musicEnabled} 
          volumeLevel={gameState.volumeLevel}
          onVolumeChange={handleVolumeChange}
        />
      )}
    </div>
  );
}