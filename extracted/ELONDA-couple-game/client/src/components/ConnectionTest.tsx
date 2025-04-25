import { useState } from "react";
import { Player } from "../types";
import { useLanguage } from "../hooks/useLanguage";

interface ConnectionTestProps {
  players: Player[];
  onComplete: (connectionScore: number) => void;
}

export default function ConnectionTest({ players, onComplete }: ConnectionTestProps) {
  const { t } = useLanguage();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [connectionScore, setConnectionScore] = useState(0);
  
  // Perguntas para avaliar o nível de conexão
  const questions = [
    "Quanto tempo vocês se conhecem?",
    "Qual o nível de comunicação entre vocês?",
    "Vocês conhecem as preferências e gostos um do outro?",
    "Vocês conseguem reconhecer o estado emocional um do outro facilmente?",
    "Vocês compartilham sonhos e metas para o futuro?"
  ];
  
  // Opções para cada pergunta
  const options = [
    [
      { value: 1, label: "Menos de 3 meses" },
      { value: 2, label: "Entre 3 meses e 1 ano" },
      { value: 3, label: "Entre 1 e 3 anos" },
      { value: 4, label: "Entre 3 e 5 anos" },
      { value: 5, label: "Mais de 5 anos" }
    ],
    [
      { value: 1, label: "Quase não nos comunicamos" },
      { value: 2, label: "Comunicação básica apenas" },
      { value: 3, label: "Conversamos regularmente" },
      { value: 4, label: "Comunicação frequente e aberta" },
      { value: 5, label: "Comunicação profunda e constante" }
    ],
    [
      { value: 1, label: "Quase nada sabemos" },
      { value: 2, label: "Conhecemos o básico" },
      { value: 3, label: "Sabemos bastante um do outro" },
      { value: 4, label: "Conhecemos bem as preferências" },
      { value: 5, label: "Conhecemos profundamente um ao outro" }
    ],
    [
      { value: 1, label: "Raramente percebemos" },
      { value: 2, label: "Às vezes notamos" },
      { value: 3, label: "Frequentemente percebemos" },
      { value: 4, label: "Quase sempre identificamos" },
      { value: 5, label: "Sempre sabemos como o outro está" }
    ],
    [
      { value: 1, label: "Nunca falamos sobre isso" },
      { value: 2, label: "Raramente compartilhamos" },
      { value: 3, label: "Às vezes conversamos sobre o futuro" },
      { value: 4, label: "Frequentemente discutimos planos juntos" },
      { value: 5, label: "Construímos nossos sonhos juntos" }
    ]
  ];
  
  const handleAnswer = (value: number) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);
    
    if (newAnswers.length < questions.length) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Cálculo da pontuação
      const totalScore = newAnswers.reduce((sum, value) => sum + value, 0);
      // Pontuação de 0-100
      const normalizedScore = Math.round((totalScore / (questions.length * 5)) * 100);
      setConnectionScore(normalizedScore);
      setShowResult(true);
    }
  };
  
  const handleComplete = () => {
    onComplete(connectionScore);
  };
  
  if (showResult) {
    // Determinando a mensagem e estilo com base na pontuação
    let connectionMessage = "";
    let gradientClass = "";
    let emoji = "";
    
    if (connectionScore < 30) {
      connectionMessage = "Vocês ainda estão começando a se conhecer. Este jogo vai ajudar a fortalecer sua conexão!";
      gradientClass = "from-blue-400 via-indigo-500 to-blue-600";
      emoji = "🌱";
    } else if (connectionScore >= 30 && connectionScore < 60) {
      connectionMessage = "Vocês já têm uma boa base de conexão. Continuem explorando e se conhecendo!";
      gradientClass = "from-indigo-400 via-purple-500 to-indigo-600";
      emoji = "🌿";
    } else if (connectionScore >= 60 && connectionScore < 90) {
      connectionMessage = "Vocês têm uma conexão forte! Este jogo vai trazer ainda mais proximidade.";
      gradientClass = "from-purple-400 via-pink-500 to-purple-600";
      emoji = "💫";
    } else {
      connectionMessage = "Uau! Vocês têm uma conexão incrível! Estão prontos para uma experiência ainda mais intensa.";
      gradientClass = "from-pink-400 via-red-500 to-pink-600";
      emoji = "✨";
    }
    
    return (
      <div className="text-center">
        <div className="mb-8">
          <div className="flex justify-center mb-4">
            <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${gradientClass} flex items-center justify-center text-3xl shadow-lg shadow-purple-500/30`}>
              {emoji}
            </div>
          </div>
          
          <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-3">
            Resultado do Teste
          </h3>
          
          <div className="relative w-full bg-gray-800 rounded-full h-8 mb-5 overflow-hidden">
            <div 
              className={`h-8 rounded-full bg-gradient-to-r ${gradientClass} relative overflow-hidden transition-all duration-1000 ease-out`} 
              style={{ width: `${connectionScore}%` }}
            >
              {/* Efeito de brilho animado */}
              <div className="absolute inset-0 sheen-effect"></div>
            </div>
            
            <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm">
              {connectionScore}%
            </span>
          </div>
          
          <p className="text-white text-lg font-bold mb-2">
            Nível de Conexão: {Math.ceil(connectionScore/10)}/10
          </p>
        </div>
        
        <div className="glass-card rounded-xl p-4 mb-6 border border-purple-500/20">
          <p className="text-gray-300 italic">
            "{connectionMessage}"
          </p>
        </div>
        
        <button
          onClick={handleComplete}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold transform hover:scale-105 transition-all shadow-md shadow-purple-700/30 relative overflow-hidden group"
        >
          <span className="relative z-10">Começar o Jogo</span>
          <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-white transition-opacity"></div>
        </button>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="text-sm text-gray-400 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
          Pergunta {currentQuestionIndex + 1} de {questions.length}
        </div>
        <div className="flex space-x-1">
          {questions.map((_, idx) => (
            <div 
              key={idx} 
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                idx < currentQuestionIndex 
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-500 scale-90 opacity-80' 
                  : idx === currentQuestionIndex 
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 scale-100 animate-pulse-light' 
                    : 'bg-gray-700 scale-75 opacity-50'
              }`}
            ></div>
          ))}
        </div>
      </div>
      
      <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-6">
        {questions[currentQuestionIndex]}
      </h3>
      
      <div className="space-y-3">
        {options[currentQuestionIndex].map((option) => (
          <button
            key={option.value}
            onClick={() => handleAnswer(option.value)}
            className="w-full text-left p-4 rounded-lg glass-card hover:bg-white/5 transition-all transform hover:translate-x-1 hover:shadow-md hover:shadow-purple-500/20 border border-transparent hover:border-purple-500/20 flex items-center"
          >
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mr-3 text-xs text-white font-bold">
              {option.value}
            </div>
            <span className="text-white">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}