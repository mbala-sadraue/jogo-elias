import { CategoryType } from "@/components/category-card";
import { ChallengeType, GameChallenge } from "@/data/challenges";

// Perguntas e desafios adaptados do arquivo de referência

// Nível Suave
export const suavePerguntas: GameChallenge[] = [
  {
    id: "sp1",
    title: "Pergunta",
    description: "Qual é o seu toque favorito?",
    type: "pergunta",
    duration: "30s",
    category: "suave"
  },
  // Add more questions here until you reach 200
  {
    id: "sp199",
    title: "Pergunta 199",
    description: "...",
    type: "pergunta",
    duration: "30s",
    category: "suave"
  },
  {
    id: "sp200",
    title: "Pergunta 200",
    description: "...",
    type: "pergunta",
    duration: "30s",
    category: "suave"
  },
];

export const suaveDesafios: GameChallenge[] = [
  {
    id: "sd1",
    title: "Desafio",
    description: "Dê um beijo suave no pescoço de quem está ao seu lado.",
    type: "desafio",
    duration: "10s",
    category: "suave"
  },
    // Add more challenges here until you reach 200
  {
    id: "sd199",
    title: "Desafio 199",
    description: "...",
    type: "desafio",
    duration: "10s",
    category: "suave"
  },
  {
    id: "sd200",
    title: "Desafio 200",
    description: "...",
    type: "desafio",
    duration: "10s",
    category: "suave"
  },
];

export const suavePremios: GameChallenge[] = [
  {
    id: "sp1",
    title: "Prêmio Suave",
    description: "Você ganhou o direito de pedir um abraço de qualquer pessoa na sala.",
    type: "prêmio",
    duration: "30s",
    category: "suave",
    isReward: true
  },
  // Add more rewards here until you reach 200
  {
    id: "sp199",
    title: "Prêmio Suave 199",
    description: "...",
    type: "prêmio",
    duration: "30s",
    category: "suave",
    isReward: true
  },
  {
    id: "sp200",
    title: "Prêmio Suave 200",
    description: "...",
    type: "prêmio",
    duration: "30s",
    category: "suave",
    isReward: true
  },
];

// Nível Picante
export const picantePerguntas: GameChallenge[] = [
  {
    id: "pp1",
    title: "Pergunta",
    description: "Qual a parte do corpo que você mais gosta de beijar?",
    type: "pergunta",
    duration: "30s",
    category: "picante"
  },
  // Add more questions here until you reach 200
  {
    id: "pp199",
    title: "Pergunta 199",
    description: "...",
    type: "pergunta",
    duration: "30s",
    category: "picante"
  },
  {
    id: "pp200",
    title: "Pergunta 200",
    description: "...",
    type: "pergunta",
    duration: "30s",
    category: "picante"
  },
];

export const picanteDesafios: GameChallenge[] = [
  {
    id: "pd1",
    title: "Desafio",
    description: "Diga para a pessoa ao seu lado qual a parte do corpo que mais te excita.",
    type: "desafio",
    duration: "30s",
    category: "picante"
  },
  // Add more challenges here until you reach 200
  {
    id: "pd199",
    title: "Desafio 199",
    description: "...",
    type: "desafio",
    duration: "30s",
    category: "picante"
  },
  {
    id: "pd200",
    title: "Desafio 200",
    description: "...",
    type: "desafio",
    duration: "30s",
    category: "picante"
  },
];

// Prêmios Picantes
export const picantePremios: GameChallenge[] = [
  {
    id: "pp1",
    title: "Prêmio Picante",
    description: "Você pode escolher alguém para te dar um beijo onde você quiser (dentro dos limites do jogo).",
    type: "prêmio",
    duration: "30s",
    category: "picante",
    isReward: true,
    requiresPair: true
  },
  // Add more rewards here until you reach 200
  {
    id: "pp199",
    title: "Prêmio Picante 199",
    description: "...",
    type: "prêmio",
    duration: "30s",
    category: "picante",
    isReward: true
  },
  {
    id: "pp200",
    title: "Prêmio Picante 200",
    description: "...",
    type: "prêmio",
    duration: "30s",
    category: "picante",
    isReward: true
  },
];

// Nível Selvagem
export const selvagemPerguntas: GameChallenge[] = [
  {
    id: "svp1",
    title: "Pergunta",
    description: "Qual foi a situação mais ousada que você já viveu?",
    type: "pergunta",
    duration: "30s",
    category: "selvagem"
  },
  // Add more questions here until you reach 200
  {
    id: "svp199",
    title: "Pergunta 199",
    description: "...",
    type: "pergunta",
    duration: "30s",
    category: "selvagem"
  },
  {
    id: "svp200",
    title: "Pergunta 200",
    description: "...",
    type: "pergunta",
    duration: "30s",
    category: "selvagem"
  },
];

export const selvagemDesafios: GameChallenge[] = [
  {
    id: "svd1",
    title: "Desafio",
    description: "Diga algo que você faria para agradar a pessoa à sua frente sem hesitar.",
    type: "desafio",
    duration: "30s",
    category: "selvagem"
  },
  // Add more challenges here until you reach 200
  {
    id: "svd199",
    title: "Desafio 199",
    description: "...",
    type: "desafio",
    duration: "30s",
    category: "selvagem"
  },
  {
    id: "svd200",
    title: "Desafio 200",
    description: "...",
    type: "desafio",
    duration: "30s",
    category: "selvagem"
  },
];

// Prêmios Selvagens
export const selvagemPremios: GameChallenge[] = [
  {
    id: "svp1",
    title: "Prêmio Selvagem",
    description: "Você controla: escolha qualquer desafio para ser feito por outra pessoa do jogo.",
    type: "prêmio",
    duration: "1min",
    category: "selvagem",
    isReward: true
  },
  // Add more rewards here until you reach 200
  {
    id: "svp199",
    title: "Prêmio Selvagem 199",
    description: "...",
    type: "prêmio",
    duration: "1min",
    category: "selvagem",
    isReward: true
  },
  {
    id: "svp200",
    title: "Prêmio Selvagem 200",
    description: "...",
    type: "prêmio",
    duration: "1min",
    category: "selvagem",
    isReward: true
  },
];

// Nível Extremo
export const extremoPerguntas: GameChallenge[] = [
  {
    id: "ep1",
    title: "Pergunta",
    description: "Qual foi o maior risco que você já correu no sexo?",
    type: "pergunta",
    duration: "30s",
    category: "extremo",
    hasForbiddenVersion: true,
    forbiddenText: "Descreva em detalhes o maior risco sexual que você já correu, sem omitir nenhum detalhe."
  },
  // Add more questions here until you reach 200
  {
    id: "ep199",
    title: "Pergunta 199",
    description: "...",
    type: "pergunta",
    duration: "30s",
    category: "extremo"
  },
  {
    id: "ep200",
    title: "Pergunta 200",
    description: "...",
    type: "pergunta",
    duration: "30s",
    category: "extremo"
  },
];

export const extremoDesafios: GameChallenge[] = [
  {
    id: "ed1",
    title: "Desafio",
    description: "Diga o que faria se estivesse sozinho(a) com a pessoa à sua frente por uma noite inteira.",
    type: "desafio",
    duration: "30s",
    category: "extremo"
  },
  // Add more challenges here until you reach 200
  {
    id: "ed199",
    title: "Desafio 199",
    description: "...",
    type: "desafio",
    duration: "30s",
    category: "extremo"
  },
  {
    id: "ed200",
    title: "Desafio 200",
    description: "...",
    type: "desafio",
    duration: "30s",
    category: "extremo"
  },
];

// Prêmios Extremos
export const extremoPremios: GameChallenge[] = [
  {
    id: "exp1", 
    title: "Prêmio Extremo",
    description: "Poder supremo: escolha dois participantes para realizarem um desafio juntos que você escolher.",
    type: "prêmio",
    duration: "2min",
    category: "extremo", 
    isReward: true
  },
  // Add more rewards here until you reach 200
  {
    id: "exp199",
    title: "Prêmio Extremo 199",
    description: "...",
    type: "prêmio",
    duration: "2min",
    category: "extremo", 
    isReward: true
  },
  {
    id: "exp200",
    title: "Prêmio Extremo 200",
    description: "...",
    type: "prêmio",
    duration: "2min",
    category: "extremo", 
    isReward: true
  },
];

// Penalidades
export const penalidades: GameChallenge[] = [
  {
    id: "pen1",
    title: "Penalidade Suave",
    description: "Você deve ficar uma rodada sem falar, apenas usando gestos para se comunicar.",
    type: "penalidade",
    duration: "1min",
    category: "suave"
  },
  {
    id: "pen2",
    title: "Penalidade Picante",
    description: "Você deve fazer um elogio para cada pessoa na sala, mas não pode repetir nenhum elogio.",
    type: "penalidade",
    duration: "1min",
    category: "picante"
  },
  {
    id: "pen3",
    title: "Penalidade Selvagem",
    description: "Você deve beijar a mão de todos os outros jogadores e dizer algo que admira em cada um.",
    type: "penalidade", 
    duration: "2min",
    category: "selvagem"
  },
  {
    id: "pen4",
    title: "Penalidade Extrema",
    description: "Você deve fazer uma dança sensual para todos enquanto todos contam regressivamente de 30 até 0.",
    type: "penalidade",
    duration: "30s",
    category: "extremo"
  }
];

export function getExpandedChallenges(category: CategoryType, type?: ChallengeType): GameChallenge[] {
  let challenges: GameChallenge[] = [];

  if (category === "suave") {
    if (type === "pergunta") {
      challenges = suavePerguntas;
    } else if (type === "desafio") {
      challenges = suaveDesafios;
    } else if (type === "prêmio") {
      challenges = suavePremios;
    } else if (type === "penalidade") {
      challenges = penalidades.filter(c => c.category === "suave");
    } else {
      challenges = [...suavePerguntas, ...suaveDesafios, ...suavePremios];
    }
  } else if (category === "picante") {
    if (type === "pergunta") {
      challenges = picantePerguntas;
    } else if (type === "desafio") {
      challenges = picanteDesafios;
    } else if (type === "prêmio") {
      challenges = picantePremios;
    } else if (type === "penalidade") {
      challenges = penalidades.filter(c => c.category === "picante");
    } else {
      challenges = [...picantePerguntas, ...picanteDesafios, ...picantePremios];
    }
  } else if (category === "selvagem") {
    if (type === "pergunta") {
      challenges = selvagemPerguntas;
    } else if (type === "desafio") {
      challenges = selvagemDesafios;
    } else if (type === "prêmio") {
      challenges = selvagemPremios;
    } else if (type === "penalidade") {
      challenges = penalidades.filter(c => c.category === "selvagem");
    } else {
      challenges = [...selvagemPerguntas, ...selvagemDesafios, ...selvagemPremios];
    }
  } else if (category === "extremo") {
    if (type === "pergunta") {
      challenges = extremoPerguntas;
    } else if (type === "desafio") {
      challenges = extremoDesafios;
    } else if (type === "prêmio") {
      challenges = extremoPremios;
    } else if (type === "penalidade") {
      challenges = penalidades.filter(c => c.category === "extremo");
    } else {
      challenges = [...extremoPerguntas, ...extremoDesafios, ...extremoPremios];
    }
  }

  return challenges;
}

export function getRandomExpandedChallenge(category: CategoryType, type?: ChallengeType): GameChallenge {
  const challenges = getExpandedChallenges(category, type);

  if (challenges.length === 0) {
    // Fallback se não houver desafios para a categoria selecionada
    return {
      id: "default",
      title: "Pergunta Padrão",
      description: "Não foram encontrados desafios para esta categoria. Conte algo interessante sobre você.",
      type: "pergunta",
      duration: "30s",
      category: "suave"
    };
  }

  const randomIndex = Math.floor(Math.random() * challenges.length);
  const challenge = challenges[randomIndex];

  // Adicionar índice para referência
  return {
    ...challenge,
    index: randomIndex + 1
  };
}

export const ALL_EXPANDED_CHALLENGES = {
  suave: {
    perguntas: suavePerguntas,
    desafios: suaveDesafios,
    premios: suavePremios,
    penalidades: penalidades.filter(c => c.category === "suave")
  },
  picante: {
    perguntas: picantePerguntas,
    desafios: picanteDesafios,
    premios: picantePremios,
    penalidades: penalidades.filter(c => c.category === "picante")
  },
  selvagem: {
    perguntas: selvagemPerguntas,
    desafios: selvagemDesafios,
    premios: selvagemPremios,
    penalidades: penalidades.filter(c => c.category === "selvagem")
  },
  extremo: {
    perguntas: extremoPerguntas,
    desafios: extremoDesafios,
    premios: extremoPremios,
    penalidades: penalidades.filter(c => c.category === "extremo")
  }
};