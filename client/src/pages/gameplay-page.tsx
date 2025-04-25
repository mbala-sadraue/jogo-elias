import { useState, useEffect } from "react";
import { useLocation, useParams } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Users, Timer, Trophy } from "lucide-react";
import { fadeIn, slideFromRight } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import ChallengeCard from "@/components/challenge-card";
import { CategoryType } from "@/components/category-card";
import { useToast } from "@/hooks/use-toast";

// Desafios de exemplo por categoria
const MOCK_CHALLENGES = {
  suave: [
    {
      id: "s1",
      title: "Compartilhe uma memória",
      description: "Conte aos outros jogadores sobre uma memória feliz que você tenha. Pode ser algo da infância, uma viagem, ou qualquer momento especial.",
      type: "pergunta",
      duration: "2 min",
      index: 1,
      category: "suave" as CategoryType
    },
    {
      id: "s2",
      title: "Preferências",
      description: "Se você pudesse viajar para qualquer lugar do mundo agora, onde seria e por quê?",
      type: "pergunta",
      duration: "1 min",
      index: 2,
      category: "suave" as CategoryType
    },
    {
      id: "s3",
      title: "Confissão leve",
      description: "Confesse algo engraçado ou fofo que você nunca contou para os outros jogadores.",
      type: "desafio",
      duration: "2 min", 
      index: 3,
      category: "suave" as CategoryType
    },
  ],
  picante: [
    {
      id: "p1",
      title: "Verdade picante",
      description: "Qual foi a situação mais constrangedora que você já passou em um encontro romântico?",
      type: "pergunta",
      duration: "2 min",
      index: 1,
      category: "picante" as CategoryType
    },
    {
      id: "p2",
      title: "Desafio picante",
      description: "Faça uma imitação engraçada de outro jogador nesta sala.",
      type: "desafio",
      duration: "1 min",
      index: 2, 
      category: "picante" as CategoryType
    },
    {
      id: "p3",
      title: "Demonstre seus talentos",
      description: "Mostre para todos uma habilidade ou talento que poucos sabem que você tem.",
      type: "desafio",
      duration: "2 min",
      index: 3,
      category: "picante" as CategoryType
    }
  ],
  selvagem: [
    {
      id: "sv1",
      title: "Confissão selvagem",
      description: "Qual é a coisa mais louca que você já fez por impulso?",
      type: "pergunta",
      duration: "2 min",
      index: 1,
      category: "selvagem" as CategoryType
    },
    {
      id: "sv2",
      title: "Charadas rápidas",
      description: "Você tem 30 segundos para adivinhar pelo menos 2 charadas que os outros jogadores farão para você.",
      type: "desafio",
      duration: "30 seg",
      index: 2,
      category: "selvagem" as CategoryType
    },
    {
      id: "sv3",
      title: "Imitação famosa",
      description: "Imite um personagem famoso de filme ou série por 1 minuto enquanto os outros tentam adivinhar.",
      type: "prêmio",
      duration: "1 min",
      index: 3,
      category: "selvagem" as CategoryType
    }
  ],
  extremo: [
    {
      id: "e1",
      title: "Verdade extrema",
      description: "Qual foi a travessura mais radical que você já fez e nunca contou para ninguém?",
      type: "pergunta",
      duration: "2 min",
      index: 1,
      category: "extremo" as CategoryType
    },
    {
      id: "e2",
      title: "Dança maluca",
      description: "Dance por 1 minuto da forma mais louca que você conseguir, sem parar!",
      type: "desafio",
      duration: "1 min",
      index: 2,
      category: "extremo" as CategoryType
    },
    {
      id: "e3",
      title: "História maluca",
      description: "Invente uma história absurda incluindo todos os jogadores presentes. Seja criativo!",
      type: "penalidade", 
      duration: "2 min",
      index: 3,
      category: "extremo" as CategoryType
    }
  ]
};

export default function GameplayPage() {
  const { toast } = useToast();
  const { categoryId } = useParams();
  const [_, navigate] = useLocation();
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [timer, setTimer] = useState<number | null>(null);
  const [players, setPlayers] = useState<string[]>([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [completedChallenges, setCompletedChallenges] = useState(0);
  const [gameOptions, setGameOptions] = useState({ intensity: "suave" });
  const [timerActive, setTimerActive] = useState(false);
  
  useEffect(() => {
    // Carregar jogadores da sessionStorage
    const storedPlayers = sessionStorage.getItem("players");
    const storedOptions = sessionStorage.getItem("gameOptions");
    
    if (storedPlayers) {
      setPlayers(JSON.parse(storedPlayers));
    } else {
      navigate("/");
      return;
    }
    
    if (storedOptions) {
      setGameOptions(JSON.parse(storedOptions));
    }
  }, [navigate]);
  
  // Função para formatar o tempo do timer
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  // Iniciar ou parar o timer
  const toggleTimer = (durationString?: string) => {
    if (timerActive) {
      setTimerActive(false);
      setTimer(null);
      return;
    }
    
    if (!durationString) return;
    
    // Extrai o tempo da string de duração (formato: "X min" ou "Y seg")
    let seconds = 0;
    if (durationString.includes("min")) {
      const mins = parseInt(durationString.split(" ")[0]);
      seconds = mins * 60;
    } else if (durationString.includes("seg")) {
      seconds = parseInt(durationString.split(" ")[0]);
    }
    
    if (seconds > 0) {
      setTimer(seconds);
      setTimerActive(true);
    }
  };
  
  // Efeito para contar o timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (timerActive && timer !== null && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => {
          if (prev !== null && prev > 0) {
            return prev - 1;
          } else {
            setTimerActive(false);
            toast({
              title: "Tempo esgotado!",
              description: "O tempo para este desafio acabou.",
            });
            return null;
          }
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [timerActive, timer, toast]);
  
  const handleCompleteChallenge = () => {
    // Parar o timer se estiver ativo
    if (timerActive) {
      setTimerActive(false);
      setTimer(null);
    }
    
    // Incrementar o contador de desafios completados
    setCompletedChallenges(prev => prev + 1);
    
    // Avançar para o próximo desafio ou finalizar o jogo
    if (challenges && currentChallengeIndex < challenges.length - 1) {
      setCurrentChallengeIndex(prev => prev + 1);
      
      // Avançar para o próximo jogador
      setCurrentPlayerIndex(prev => (prev + 1) % players.length);
      
      toast({
        title: "Desafio concluído!",
        description: "Agora é a vez de " + players[(currentPlayerIndex + 1) % players.length]
      });
    } else {
      // Jogo completado
      toast({
        title: "Jogo finalizado!",
        description: "Todos os desafios foram completados com sucesso.",
      });
      
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  };
  
  const handleSkipChallenge = () => {
    // Parar o timer se estiver ativo
    if (timerActive) {
      setTimerActive(false);
      setTimer(null);
    }
    
    // Avançar para o próximo desafio ou finalizar o jogo
    if (challenges && currentChallengeIndex < challenges.length - 1) {
      setCurrentChallengeIndex(prev => prev + 1);
      
      // Avançar para o próximo jogador
      setCurrentPlayerIndex(prev => (prev + 1) % players.length);
      
      toast({
        title: "Desafio pulado",
        description: "Agora é a vez de " + players[(currentPlayerIndex + 1) % players.length]
      });
    } else {
      // Jogo completado
      toast({
        title: "Jogo finalizado!",
        description: "Todos os desafios foram completados.",
      });
      
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  };
  
  const handleBackClick = () => {
    navigate('/home');
  };
  
  // Usar os desafios da categoria correspondente
  const category = categoryId as CategoryType || "suave";
  const challenges = MOCK_CHALLENGES[category];
  
  if (!challenges || challenges.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary to-primary-dark flex items-center justify-center">
        <div className="text-center text-white p-6">
          <h2 className="text-2xl font-bold mb-4">Categoria não encontrada</h2>
          <p className="mb-6">Não conseguimos encontrar desafios para esta categoria.</p>
          <Button 
            onClick={() => navigate('/home')}
            className="bg-white text-primary hover:bg-white/90"
          >
            Voltar para o início
          </Button>
        </div>
      </div>
    );
  }
  
  const currentChallenge = challenges[currentChallengeIndex];
  const currentPlayer = players[currentPlayerIndex];
  const totalChallenges = challenges.length;
  const progress = Math.round((completedChallenges / totalChallenges) * 100);
  
  return (
    <motion.div
      className={`min-h-screen bg-gradient-to-b from-${category} to-${category}-dark`}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={fadeIn}
    >
      {/* Game Header */}
      <div className="relative">
        <motion.div 
          className="p-4 rounded-b-3xl"
          variants={slideFromRight}
        >
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="icon" 
              className="p-2 rounded-full bg-white/20 text-white"
              onClick={handleBackClick}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center space-x-2">
              {timerActive && timer !== null ? (
                <div className="px-3 py-1 bg-white/20 rounded-full text-white flex items-center">
                  <Timer className="h-4 w-4 mr-1" />
                  <span>{formatTime(timer)}</span>
                </div>
              ) : (
                <div className="px-3 py-1 bg-white/20 rounded-full text-white flex items-center">
                  <Trophy className="h-4 w-4 mr-1" />
                  <span>{completedChallenges} pts</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Jogador atual */}
          <div className="mt-4 flex items-center justify-center">
            <div className="flex flex-col items-center mb-2">
              <Avatar className="w-16 h-16 border-2 border-white">
                <AvatarFallback className="bg-primary-light text-white font-bold text-xl">
                  {currentPlayer?.charAt(0).toUpperCase() || "?"}
                </AvatarFallback>
              </Avatar>
              <h2 className="font-bold text-white text-lg mt-2">
                {currentPlayer || "Jogador"}
              </h2>
              <div className="flex items-center mt-1">
                <span className="text-xs px-2 py-0.5 bg-white/20 text-white rounded-full">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </span>
              </div>
            </div>
          </div>
          
          {/* Players */}
          <div className="mt-3 flex justify-center -space-x-2 overflow-hidden">
            {players.map((player, index) => (
              <Avatar 
                key={index} 
                className={`inline-block w-8 h-8 border-2 ${currentPlayerIndex === index ? 'border-yellow-300 scale-110 z-10' : 'border-white opacity-70'} transition-all`}
              >
                <AvatarFallback 
                  className={`${currentPlayerIndex === index ? 'bg-secondary' : 'bg-primary-light'} text-white font-semibold`}
                >
                  {player.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
          
          {/* Progress bar */}
          <div className="mt-4 relative px-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-white/80">Progresso</span>
              <span className="text-xs text-white">
                {completedChallenges}/{totalChallenges}
              </span>
            </div>
            <Progress 
              value={progress} 
              className="h-2 bg-white/20"
              indicatorClassName="bg-white/50"
            />
          </div>
        </motion.div>
      </div>
      
      {/* Current Card/Challenge */}
      <div className="px-4 pt-4 pb-20">
        <motion.div 
          className="py-4"
          variants={slideFromRight}
          key={currentChallenge.id}
        >
          <ChallengeCard
            challenge={currentChallenge}
            onComplete={handleCompleteChallenge}
            onSkip={handleSkipChallenge}
            playerNames={[currentPlayer, players[(currentPlayerIndex + 1) % players.length]]}
          />
          
          {!timerActive && currentChallenge.duration && (
            <div className="flex justify-center mt-4">
              <Button
                variant="outline" 
                onClick={() => toggleTimer(currentChallenge.duration)}
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                <Timer className="h-4 w-4 mr-2" />
                Iniciar timer ({currentChallenge.duration})
              </Button>
            </div>
          )}
          
          {timerActive && (
            <div className="flex justify-center mt-4">
              <Button
                variant="outline" 
                onClick={() => toggleTimer()}
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                <Timer className="h-4 w-4 mr-2" />
                Parar timer
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
