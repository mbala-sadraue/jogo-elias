import { Dispatch, SetStateAction, useState } from "react";
import { GameState, PlayerPreference, Player } from "../types";
import IntensityLevelSelector from "../components/IntensityLevelSelector";
import RelationshipTypeSelector from "../components/RelationshipTypeSelector";
import PlayerManagement from "../components/PlayerManagement";
import GameOptions from "../components/GameOptions";
import StartGameButton from "../components/StartGameButton";
import ConnectionTest from "../components/ConnectionTest";
import { useLanguage } from "../hooks/useLanguage";
import { useToast } from "../hooks/use-toast";

interface GameSetupProps {
  gameState: GameState;
  setGameState: Dispatch<SetStateAction<GameState>>;
}

export default function GameSetup({ gameState, setGameState }: GameSetupProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [showConnectionTest, setShowConnectionTest] = useState(false);
  
  const updateGameState = (partialState: Partial<GameState>) => {
    setGameState(prevState => ({ ...prevState, ...partialState }));
  };

  const checkIfGameCanStart = () => {
    const isReady = gameState.intensity !== null && 
                    gameState.relationshipType !== null && 
                    gameState.playerCount >= 2;
    
    updateGameState({ isReadyToStart: isReady });
  };

  const handleSelectIntensity = (intensity: GameState["intensity"]) => {
    updateGameState({ intensity });
    checkIfGameCanStart();
  };

  const handleSelectRelationship = (relationshipType: GameState["relationshipType"]) => {
    updateGameState({ relationshipType });
    checkIfGameCanStart();
  };

  const handleAddPlayer = () => {
    if (gameState.playerCount < 10) {
      const newPlayerCount = gameState.playerCount + 1;
      const playerId = gameState.players.length + 1;
      const updatedPlayers = [
        ...gameState.players,
        { id: playerId, name: `${t('player.default')} ${playerId}`, avatar: "" }
      ];
      
      updateGameState({ 
        playerCount: newPlayerCount,
        players: updatedPlayers
      });
      checkIfGameCanStart();
    }
  };

  const handleRemovePlayer = () => {
    if (gameState.playerCount > 2) {
      const newPlayerCount = gameState.playerCount - 1;
      const updatedPlayers = [...gameState.players];
      updatedPlayers.pop();
      
      updateGameState({ 
        playerCount: newPlayerCount,
        players: updatedPlayers
      });
      checkIfGameCanStart();
    }
  };

  const handleUpdatePlayer = (playerId: number, name: string) => {
    const updatedPlayers = gameState.players.map(player => {
      if (player.id === playerId) {
        return { ...player, name };
      }
      return player;
    });
    
    updateGameState({ players: updatedPlayers });
  };

  const handleUpdatePlayerPreferences = (playerId: number, preferences: PlayerPreference) => {
    const updatedPlayers = gameState.players.map(player => {
      if (player.id === playerId) {
        return { ...player, preferences };
      }
      return player;
    });
    
    updateGameState({ players: updatedPlayers });
  };
  
  const handleUpdatePlayerAvatar = (playerId: number, avatar: string) => {
    const updatedPlayers = gameState.players.map(player => {
      if (player.id === playerId) {
        return { ...player, avatar };
      }
      return player;
    });
    
    updateGameState({ players: updatedPlayers });
  };

  const handleToggleOption = (option: keyof GameState["options"], value: boolean) => {
    updateGameState({
      options: {
        ...gameState.options,
        [option]: value
      }
    });
  };

  const handleConnectionTestComplete = (connectionScore: number) => {
    // Atualiza as estatísticas de conexão dos jogadores
    const updatedPlayers = gameState.players.map(player => ({
      ...player,
      connectionScore
    }));
    
    // Calcular o nível de conexão (1-10) baseado no score (0-100)
    const connectionLevel = Math.max(1, Math.min(10, Math.ceil(connectionScore / 10)));
    
    // Atualizar estatísticas dos jogadores
    const updatedPlayerStats = { ...gameState.playerStats };
    gameState.players.forEach(player => {
      if (updatedPlayerStats[player.id]) {
        updatedPlayerStats[player.id].connectionLevel = connectionLevel;
      } else {
        updatedPlayerStats[player.id] = {
          points: 0,
          challengesCompleted: 0,
          questionsAnswered: 0,
          achievements: [],
          connectionLevel
        };
      }
    });
    
    updateGameState({
      players: updatedPlayers,
      isConnectionTestCompleted: true,
      playerStats: updatedPlayerStats,
    });
    
    setShowConnectionTest(false);
    
    toast({
      title: "✅ Teste de Conexão Concluído",
      description: `Nível de conexão: ${connectionLevel}/10. Quanto maior a conexão, mais pontos vocês ganharão juntos!`,
      variant: "default"
    });
  };
  
  const handleStartGame = () => {
    if (gameState.isReadyToStart) {
      // Se for modo competitivo e o teste de conexão não foi realizado
      if (gameState.options.competitiveMode && !gameState.isConnectionTestCompleted) {
        setShowConnectionTest(true);
        return;
      }
      
      updateGameState({ 
        gameStarted: true,
        currentRound: 1,
        currentPlayerIndex: 0
      });
    }
  };

  return (
    <>
      <main className="container mx-auto mobile-padding py-6 md:py-8 max-w-4xl">
        <header className="text-center mb-6 md:mb-8">
          <div className="inline-block mb-2 md:mb-3">
            <span className="mobile-title font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 neon-text">
              {t('game.title')}
            </span>
          </div>
          <h1 className="mobile-heading font-bold text-white mb-2 md:mb-3">
            {t('game.subtitle')}
          </h1>
          <div className="flex justify-center mb-3 md:mb-4">
            <div className="h-0.5 w-28 md:w-36 bg-gradient-to-r from-purple-500 to-pink-500"></div>
          </div>
          <p className="mobile-text text-light-200 max-w-lg mx-auto italic">
            {t('game.description')}
          </p>
        </header>
  
        <div className="glass-card rounded-xl mobile-card mb-6 md:mb-8">
          <IntensityLevelSelector 
            selectedIntensity={gameState.intensity} 
            onSelect={handleSelectIntensity} 
          />
          
          <RelationshipTypeSelector 
            selectedRelationship={gameState.relationshipType} 
            onSelect={handleSelectRelationship} 
          />
          
          <PlayerManagement 
            players={gameState.players}
            playerCount={gameState.playerCount}
            onAddPlayer={handleAddPlayer}
            onRemovePlayer={handleRemovePlayer}
            onUpdatePlayer={handleUpdatePlayer}
            onUpdatePlayerPreferences={handleUpdatePlayerPreferences}
            onUpdatePlayerAvatar={handleUpdatePlayerAvatar}
          />
          
          <GameOptions 
            options={gameState.options}
            onToggleOption={handleToggleOption}
          />
          
          <StartGameButton 
            isReadyToStart={gameState.isReadyToStart}
            onStartGame={handleStartGame}
            intensity={gameState.intensity}
            relationshipType={gameState.relationshipType}
          />
        </div>
      </main>
      
      {/* Renderizar o modal de conexão usando o componente separado */}
      <ConnectionModal
        show={showConnectionTest}
        players={gameState.players}
        onComplete={handleConnectionTestComplete}
        onSkip={() => {
          setShowConnectionTest(false);
          updateGameState({ 
            gameStarted: true,
            currentRound: 1,
            currentPlayerIndex: 0
          });
        }}
      />
    </>
  );
}

// Modal de teste de conexão emocional como um componente separado para evitar problemas de sintaxe
function ConnectionModal({ 
  show, 
  players, 
  onComplete, 
  onSkip
}: { 
  show: boolean; 
  players: Player[]; 
  onComplete: (score: number) => void;
  onSkip: () => void;
}) {
  if (!show) return null;
  
  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="glass-card rounded-2xl p-6 max-w-xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-6">
          Teste de Conexão Emocional
        </h2>
        
        <ConnectionTest 
          players={players} 
          onComplete={onComplete} 
        />
        
        <div className="flex justify-center mt-4">
          <button
            onClick={onSkip}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg text-sm"
          >
            Pular Teste
          </button>
        </div>
      </div>
    </div>
  );
}
