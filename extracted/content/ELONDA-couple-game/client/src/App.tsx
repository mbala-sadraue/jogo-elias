import { useState, useEffect } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import GameSetup from "@/pages/GameSetup";
import GameScreen from "@/pages/GameScreen";
import NotFound from "@/pages/not-found";
import AgeVerification from "@/components/AgeVerification";
import LanguageSelector from "@/components/LanguageSelector";
import { LanguageProvider, useLanguage } from "@/hooks/useLanguage";
import { GameState, Achievement } from "./types";

function Router() {
  const { t } = useLanguage();
  // Conquistas disponíveis no jogo
  const defaultAchievements: Achievement[] = [
    {
      id: 'first_challenge',
      title: 'Primeiro Desafio',
      description: 'Complete seu primeiro desafio',
      icon: 'trophy',
      isUnlocked: false,
      requiredPoints: 0
    },
    {
      id: 'level_up',
      title: 'Subindo de Nível',
      description: 'Acumule 50 pontos',
      icon: 'arrow-up',
      isUnlocked: false,
      requiredPoints: 50
    },
    {
      id: 'explorer',
      title: 'Explorador',
      description: 'Experimente todos os tipos de conteúdo',
      icon: 'compass',
      isUnlocked: false,
      requiredPoints: 100
    },
    {
      id: 'passionate',
      title: 'Apaixonado',
      description: 'Complete 10 desafios românticos',
      icon: 'heart',
      isUnlocked: false,
      requiredPoints: 150
    },
    {
      id: 'memory_master',
      title: 'Mestre das Memórias',
      description: 'Crie 5 memórias no álbum',
      icon: 'images',
      isUnlocked: false,
      requiredPoints: 200
    }
  ];
  
  // Categorias que podem ser desbloqueadas
  const defaultCategories = ['básico'];

  const [gameState, setGameState] = useState<GameState>({
    intensity: null,
    relationshipType: null,
    playerCount: 2,
    players: [
      { id: 1, name: "Jogador 1", avatar: "", connectionScore: 50 },
      { id: 2, name: "Jogador 2", avatar: "", connectionScore: 50 }
    ],
    options: {
      darkMode: false,
      competitiveMode: false,
      timer: false,
      dynamicIntensity: false,
      challengeInPairs: false,
      forbiddenQuestion: false,
      musicEnabled: false,
      allowChooseType: true
    },
    isReadyToStart: false,
    currentRound: 1,
    currentPlayerIndex: 0,
    gameStarted: false,
    questionMode: true,
    rouletteMode: false,
    selectedPairIds: null,
    volumeLevel: 50,
    // Novos campos
    playerStats: {
      1: {
        points: 0,
        challengesCompleted: 0,
        questionsAnswered: 0,
        achievements: [...defaultAchievements],
        connectionLevel: 5
      },
      2: {
        points: 0,
        challengesCompleted: 0,
        questionsAnswered: 0,
        achievements: [...defaultAchievements],
        connectionLevel: 5
      }
    },
    memories: [],
    isConnectionTestCompleted: false,
    unlockedCategories: [...defaultCategories],
    totalPoints: 0
  });
  
  const [isVerified, setIsVerified] = useState(() => {
    return localStorage.getItem('age-verified') === 'true';
  });

  useEffect(() => {
    if (isVerified) {
      localStorage.setItem('age-verified', 'true');
    }
  }, [isVerified]);

  return (
    <>
      <LanguageSelector />
      {!isVerified && <AgeVerification onAccept={() => setIsVerified(true)} />}
      
      <div className={!isVerified ? "blur-sm pointer-events-none" : ""}>
        <Switch>
          <Route path="/">
            {gameState.gameStarted ? 
              <GameScreen gameState={gameState} setGameState={setGameState} /> : 
              <GameSetup gameState={gameState} setGameState={setGameState} />
            }
          </Route>
          <Route component={NotFound} />
        </Switch>
      </div>
    </>
  );
}

function AppWithLanguage() {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-dark-900">
      <header className="fixed top-0 left-0 right-0 z-50 py-2 sm:py-3 px-3 sm:px-4 bg-gradient-to-r from-purple-900 to-pink-900 shadow-lg">
        <h1 className="text-xl sm:text-2xl font-bold text-center text-white">
          <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
            {t('game.title')}
          </span>
          <span className="text-xs sm:text-sm ml-2 opacity-75 hidden sm:inline">
            {t('setup.welcome')}
          </span>
        </h1>
      </header>
      <div className="pt-16">
        <Router />
      </div>
      <Toaster />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <AppWithLanguage />
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
