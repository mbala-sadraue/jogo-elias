import { SecretChallenge } from "@/types/game-modes";

// Desafios secretos - só são desbloqueados em condições específicas
export const secretChallenges: SecretChallenge[] = [
  // SUAVE (desbloqueados após completar certo número de desafios suaves)
  {
    id: "sec-s1",
    title: "Mensagem Codificada",
    description: "Escreva uma mensagem romântica no corpo do outro jogador usando apenas a ponta dos dedos. O jogador deve adivinhar o que foi escrito.",
    duration: "3 min",
    category: "suave",
    unlockCondition: {
      type: "completedChallenges",
      value: 5
    },
    isUnlocked: false
  },
  {
    id: "sec-s2",
    title: "Revelação por Toque",
    description: "Com os olhos vendados, tente identificar diferentes partes do corpo do outro jogador apenas pelo toque, sem usar as mãos.",
    duration: "5 min",
    category: "suave",
    unlockCondition: {
      type: "completedChallenges",
      value: 8
    },
    isUnlocked: false
  },
  {
    id: "sec-s3",
    title: "Conexão Silenciosa",
    description: "Por 3 minutos, comunique-se apenas com olhares e toques leves, sem palavras. Depois, cada um compartilha o que sentiu.",
    duration: "4 min",
    category: "suave",
    unlockCondition: {
      type: "completedChallenges",
      value: 10
    },
    isUnlocked: false
  },
  
  // PICANTE (desbloqueados após atingir certo nível de intensidade)
  {
    id: "sec-p1",
    title: "Banho Compartilhado",
    description: "Tomem banho juntos, mas com uma regra: só podem se tocar usando espuma ou sabonete, nunca diretamente com as mãos.",
    duration: "15 min",
    category: "picante",
    unlockCondition: {
      type: "intensity",
      value: "picante"
    },
    isUnlocked: false
  },
  {
    id: "sec-p2",
    title: "Cinema Particular",
    description: "Assistam a uma cena romântica/sensual de um filme e recriem-na exatamente como aconteceu, com os mesmos diálogos.",
    duration: "10 min",
    category: "picante",
    unlockCondition: {
      type: "moodLevel",
      value: "quente"
    },
    isUnlocked: false
  },
  {
    id: "sec-p3",
    title: "Zona Proibida",
    description: "Um jogador define uma parte do corpo como 'zona proibida'. O outro deve estimular esta pessoa sem tocar nesta área, mas chegando o mais perto possível.",
    duration: "7 min",
    category: "picante",
    unlockCondition: {
      type: "completedChallenges",
      value: 15
    },
    isUnlocked: false
  },
  
  // SELVAGEM (desbloqueados após jogar por certo tempo)
  {
    id: "sec-sv1",
    title: "Controle Remoto",
    description: "Por 5 minutos, um jogador deve seguir exatamente as instruções verbais do outro, sem questionar ou hesitar.",
    duration: "5 min",
    category: "selvagem",
    unlockCondition: {
      type: "time",
      value: 30 // minutos jogados
    },
    isUnlocked: false
  },
  {
    id: "sec-sv2",
    title: "Mapa do Prazer",
    description: "Desenhe um 'mapa do tesouro' no corpo do outro jogador, indicando onde estão seus pontos mais sensíveis. O outro deve seguir o mapa até o 'X'.",
    duration: "10 min",
    category: "selvagem",
    unlockCondition: {
      type: "moodLevel",
      value: "selvagem"
    },
    isUnlocked: false
  },
  {
    id: "sec-sv3",
    title: "Posições Desafiadoras",
    description: "Realizem 3 posições de yoga em dupla que exijam contato físico intenso. Mantenham cada posição por pelo menos 60 segundos.",
    duration: "8 min",
    category: "selvagem",
    unlockCondition: {
      type: "intensity",
      value: "selvagem"
    },
    isUnlocked: false
  },
  
  // EXTREMO (desbloqueados em condições raras e especiais)
  {
    id: "sec-e1",
    title: "Jogo de Poder Total",
    description: "Um jogador assume controle completo do outro por 10 minutos, determinando cada movimento e ação, dentro dos limites previamente acordados.",
    duration: "10 min",
    category: "extremo",
    unlockCondition: {
      type: "completedChallenges",
      value: 25
    },
    isUnlocked: false
  },
  {
    id: "sec-e2",
    title: "Alternância Sensorial",
    description: "Explorem os 5 sentidos sequencialmente: um minuto focando apenas no tato, depois apenas na audição, depois visão, olfato e paladar.",
    duration: "15 min",
    category: "extremo",
    unlockCondition: {
      type: "time",
      value: 60 // minutos jogados
    },
    isUnlocked: false
  },
  {
    id: "sec-e3",
    title: "Fogo e Gelo",
    description: "Usando alternadamente gelo e algo quente (como uma bebida morna), estimulem diferentes partes do corpo um do outro, observando as reações.",
    duration: "12 min",
    category: "extremo",
    unlockCondition: {
      type: "moodLevel",
      value: "selvagem"
    },
    isUnlocked: false
  }
];