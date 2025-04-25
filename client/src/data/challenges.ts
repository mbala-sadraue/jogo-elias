import { CategoryType } from "@/components/category-card";

// Tipos de desafio
export type ChallengeType = "pergunta" | "desafio" | "prêmio" | "penalidade";

// Interface para desafios
export interface GameChallenge {
  id: string;
  title: string;
  description: string;
  type: ChallengeType;
  duration: string;
  index?: number;
  category: CategoryType;
  forbiddenText?: string; // Versão proibida/alternativa do texto
  isReward?: boolean; // Indica se é um prêmio especial
  requiresPair?: boolean; // Indica se requer um par de jogadores
  hasForbiddenVersion?: boolean; // Indica se tem versão proibida
}

// ----- DESAFIOS SUAVES -----
export const suaveChallenges: GameChallenge[] = [
  // Perguntas suaves - Conhecimento
  {
    id: "s1",
    title: "Memórias Compartilhadas",
    description: "Qual é a sua primeira memória juntos que te faz sorrir?",
    type: "pergunta",
    duration: "2 min",
    category: "suave"
  },
  {
    id: "s2",
    title: "Sonhos Futuros",
    description: "Se pudesse realizar um sonho nos próximos 5 anos, qual seria?",
    type: "pergunta",
    duration: "2 min",
    category: "suave"
  },
  {
    id: "s3",
    title: "Inspirações",
    description: "Quem é a pessoa que mais te inspira e por quê?",
    type: "pergunta",
    duration: "2 min",
    category: "suave"
  },
  {
    id: "s4",
    title: "Lugar Dos Sonhos",
    description: "Se pudesse viajar para qualquer lugar do mundo agora, onde seria e por quê?",
    type: "pergunta",
    duration: "2 min",
    category: "suave"
  },
  {
    id: "s5",
    title: "Descobertas",
    description: "O que você gostaria de aprender juntos nos próximos anos?",
    type: "pergunta",
    duration: "2 min",
    category: "suave"
  },
  {
    id: "s6",
    title: "Preferências Culinárias",
    description: "Qual é seu prato favorito e qual memória está associada a ele?",
    type: "pergunta",
    duration: "1 min",
    category: "suave"
  },
  {
    id: "s7",
    title: "Passatempos",
    description: "Qual hobby você gostaria de praticar mais frequentemente?",
    type: "pergunta",
    duration: "1 min",
    category: "suave"
  },
  {
    id: "s8",
    title: "Talentos Ocultos",
    description: "Você tem algum talento que poucos conhecem? Conte aos outros jogadores.",
    type: "pergunta",
    duration: "2 min",
    category: "suave"
  },
  {
    id: "s9",
    title: "Filmes Favoritos",
    description: "Qual filme você poderia assistir infinitas vezes e nunca se cansar?",
    type: "pergunta",
    duration: "1 min",
    category: "suave"
  },
  {
    id: "s10",
    title: "Músicas Especiais",
    description: "Qual música traz lembranças especiais para você?",
    type: "pergunta",
    duration: "1 min",
    category: "suave"
  },
  {
    id: "s11",
    title: "Momentos de Infância",
    description: "Qual é a lembrança mais feliz da sua infância?",
    type: "pergunta", 
    duration: "2 min",
    category: "suave"
  },
  {
    id: "s12",
    title: "Qualidades",
    description: "Quais são as três qualidades que você mais aprecia no(s) outro(s) jogador(es)?",
    type: "pergunta",
    duration: "2 min",
    category: "suave"
  },
  {
    id: "s13",
    title: "Livro da Vida",
    description: "Se sua vida fosse um livro, qual seria o título e por quê?",
    type: "pergunta",
    duration: "2 min",
    category: "suave"
  },
  {
    id: "s14",
    title: "Heróis Pessoais",
    description: "Quem foi seu herói na infância e quem é seu herói hoje?",
    type: "pergunta",
    duration: "2 min",
    category: "suave"
  },
  {
    id: "s15",
    title: "Aprendizados",
    description: "Qual foi a lição mais importante que você aprendeu até hoje?",
    type: "pergunta",
    duration: "2 min",
    category: "suave"
  },
  
  // Desafios suaves - Interação
  {
    id: "s16",
    title: "Elogio Sincero",
    description: "Faça um elogio sincero para cada pessoa presente no jogo.",
    type: "desafio",
    duration: "3 min",
    category: "suave"
  },
  {
    id: "s17",
    title: "Desenho Divertido",
    description: "Desenhe um retrato de um dos jogadores sem olhar para o papel.",
    type: "desafio",
    duration: "2 min",
    category: "suave"
  },
  {
    id: "s18",
    title: "Canção da Vida",
    description: "Cante um trecho de uma música que represente um momento importante da sua vida.",
    type: "desafio",
    duration: "1 min",
    category: "suave"
  },
  {
    id: "s19",
    title: "Mímica de Filme",
    description: "Faça uma mímica de uma cena de um filme para os outros adivinharem.",
    type: "desafio",
    duration: "2 min",
    category: "suave"
  },
  {
    id: "s20",
    title: "Contador de Histórias",
    description: "Conte uma história engraçada ou emocionante que aconteceu com você.",
    type: "desafio",
    duration: "3 min",
    category: "suave"
  },
  {
    id: "s21",
    title: "Dança Improvisada",
    description: "Dance por 30 segundos conforme a música escolhida por outro jogador.",
    type: "desafio",
    duration: "1 min",
    category: "suave"
  },
  {
    id: "s22",
    title: "Abraço Genuíno",
    description: "Dê um abraço genuíno em um dos jogadores e diga o que admira nele(a).",
    type: "desafio",
    duration: "1 min",
    category: "suave"
  },
  {
    id: "s23",
    title: "Impressão de Celebridade",
    description: "Faça a impressão de uma celebridade ou personagem famoso.",
    type: "desafio",
    duration: "1 min",
    category: "suave"
  },
  {
    id: "s24",
    title: "Poema Relâmpago",
    description: "Crie um poema curto com estas palavras: sonho, estrela, caminho e coração.",
    type: "desafio",
    duration: "2 min",
    category: "suave"
  },
  {
    id: "s25",
    title: "Massagem Relaxante",
    description: "Faça uma massagem leve nos ombros de outro jogador por 1 minuto.",
    type: "desafio",
    duration: "1 min",
    category: "suave"
  },
  
  // Mais 30 perguntas suaves (continua de 26 a 55)
  {
    id: "s26",
    title: "Superpoderes",
    description: "Se pudesse ter um superpoder, qual seria e como o usaria?",
    type: "pergunta",
    duration: "2 min",
    category: "suave"
  },
  {
    id: "s27",
    title: "Conquistas Pessoais",
    description: "Qual conquista pessoal te deixa mais orgulhoso(a)?",
    type: "pergunta",
    duration: "2 min",
    category: "suave"
  },
  {
    id: "s28",
    title: "Momentos de Risos",
    description: "Qual foi a última vez que você riu tanto que chegou a chorar?",
    type: "pergunta",
    duration: "2 min",
    category: "suave"
  },
  {
    id: "s29",
    title: "Tradições Favoritas",
    description: "Qual é a sua tradição familiar favorita?",
    type: "pergunta",
    duration: "2 min",
    category: "suave"
  },
  {
    id: "s30",
    title: "Mudanças de Vida",
    description: "Se pudesse mudar uma coisa na sua vida agora, o que seria?",
    type: "pergunta",
    duration: "2 min",
    category: "suave"
  },
  
  // Mais 20 desafios suaves (continua de 31 a 50)
  {
    id: "s31",
    title: "Gratidão",
    description: "Mencione três coisas pelas quais você é grato(a) hoje.",
    type: "desafio",
    duration: "2 min",
    category: "suave"
  },
  {
    id: "s32",
    title: "Mímica de Animal",
    description: "Faça a mímica de um animal para os outros adivinharem.",
    type: "desafio", 
    duration: "1 min",
    category: "suave"
  },
  {
    id: "s33",
    title: "Foto Criativa",
    description: "Tire uma selfie criativa com os outros jogadores.",
    type: "desafio",
    duration: "2 min",
    category: "suave"
  },
  {
    id: "s34",
    title: "Contato Visual",
    description: "Mantenha contato visual com outro jogador por 30 segundos sem rir.",
    type: "desafio",
    duration: "1 min",
    category: "suave"
  },
  {
    id: "s35",
    title: "Carta do Futuro",
    description: "Escreva uma breve mensagem para seu eu do futuro daqui a 5 anos.",
    type: "desafio",
    duration: "3 min",
    category: "suave"
  },
  
  // Adicionando mais 15 perguntas suaves
  {
    id: "s36",
    title: "Sonho de Viagem",
    description: "Qual é o lugar que você sonha em visitar e por quê?",
    type: "pergunta",
    duration: "2 min",
    category: "suave"
  },
  {
    id: "s37",
    title: "Dia Perfeito",
    description: "Descreva como seria um dia perfeito para você, do início ao fim.",
    type: "pergunta",
    duration: "2 min",
    category: "suave"
  },
  {
    id: "s38",
    title: "Livro Favorito",
    description: "Qual é seu livro favorito e por que ele tocou você?",
    type: "pergunta",
    duration: "2 min",
    category: "suave"
  },
  {
    id: "s39",
    title: "Temporada Preferida",
    description: "Qual sua estação do ano favorita e que memórias você associa a ela?",
    type: "pergunta",
    duration: "2 min",
    category: "suave"
  },
  {
    id: "s40",
    title: "Se Fosse Animal",
    description: "Se você fosse um animal, qual seria e por quê?",
    type: "pergunta",
    duration: "1 min",
    category: "suave"
  },
  {
    id: "s41",
    title: "Talentos Desejados",
    description: "Qual habilidade ou talento você gostaria de ter?",
    type: "pergunta",
    duration: "1 min",
    category: "suave"
  },
  {
    id: "s42",
    title: "Personagem Fictício",
    description: "Com qual personagem de filme ou livro você mais se identifica?",
    type: "pergunta",
    duration: "2 min",
    category: "suave"
  },
  {
    id: "s43",
    title: "Refeição Perfeita",
    description: "Qual seria sua refeição perfeita do início ao fim?",
    type: "pergunta",
    duration: "2 min",
    category: "suave"
  },
  {
    id: "s44",
    title: "Conselho para Jovens",
    description: "Que conselho você daria para alguém 10 anos mais jovem que você?",
    type: "pergunta",
    duration: "2 min",
    category: "suave"
  },
  {
    id: "s45",
    title: "Para o Futuro",
    description: "Que mensagem você deixaria para seus futuros filhos ou netos?",
    type: "pergunta",
    duration: "2 min",
    category: "suave"
  },
  {
    id: "s46",
    title: "Presente Ideal",
    description: "Qual seria o presente ideal para você receber?",
    type: "pergunta",
    duration: "1 min",
    category: "suave"
  },
  {
    id: "s47",
    title: "Cidade dos Sonhos",
    description: "Em qual cidade do mundo você gostaria de morar?",
    type: "pergunta",
    duration: "1 min",
    category: "suave"
  },
  {
    id: "s48",
    title: "Metas de Vida",
    description: "Quais são suas três principais metas de vida?",
    type: "pergunta",
    duration: "2 min", 
    category: "suave"
  },
  {
    id: "s49",
    title: "Momento Especial",
    description: "Qual foi o momento mais especial da sua vida até agora?",
    type: "pergunta",
    duration: "2 min",
    category: "suave"
  },
  {
    id: "s50",
    title: "Melhor Conselho",
    description: "Qual é o melhor conselho que você já recebeu?",
    type: "pergunta",
    duration: "2 min",
    category: "suave"
  },
  
  // Adicionando mais 15 desafios suaves
  {
    id: "s51",
    title: "Dança Engraçada",
    description: "Invente uma dança engraçada e ensine para os outros jogadores.",
    type: "desafio",
    duration: "2 min",
    category: "suave"
  },
  {
    id: "s52",
    title: "Declaração Criativa",
    description: "Faça uma declaração criativa para outro jogador sem usar as palavras 'eu', 'você' e 'amor'.",
    type: "desafio",
    duration: "2 min",
    category: "suave"
  },
  {
    id: "s53",
    title: "Imitação de Voz",
    description: "Tente imitar a voz de um personagem de desenho animado.",
    type: "desafio",
    duration: "1 min",
    category: "suave"
  },
  {
    id: "s54",
    title: "Adivinhação",
    description: "Descreva um objeto sem dizer o nome dele e deixe os outros adivinharem.",
    type: "desafio",
    duration: "2 min",
    category: "suave"
  },
  {
    id: "s55",
    title: "Gargalhada Contagiante",
    description: "Tente fazer outro jogador rir sem tocar nele(a).",
    type: "desafio",
    duration: "1 min",
    category: "suave"
  },
  {
    id: "s56",
    title: "História Colaborativa",
    description: "Comece uma história com uma frase, e cada jogador adiciona uma frase.",
    type: "desafio",
    duration: "3 min",
    category: "suave"
  },
  {
    id: "s57",
    title: "Música com Gestos",
    description: "Cante uma música infantil fazendo gestos engraçados.",
    type: "desafio",
    duration: "1 min",
    category: "suave"
  },
  {
    id: "s58",
    title: "Feijoada de Gestos",
    description: "Todos devem fazer um gesto, e você tem que imitar todos em sequência.",
    type: "desafio",
    duration: "2 min",
    category: "suave"
  },
  {
    id: "s59",
    title: "Telefone sem Fio",
    description: "Inicie um telefone sem fio com uma frase complexa.",
    type: "desafio",
    duration: "2 min",
    category: "suave"
  },
  {
    id: "s60",
    title: "Melodia do Riso",
    description: "Cante uma música conhecida usando apenas 'la la la'.",
    type: "desafio",
    duration: "1 min",
    category: "suave"
  },
  {
    id: "s61",
    title: "Poesia Instantânea",
    description: "Crie um verso poético sobre cada pessoa presente no jogo.",
    type: "desafio",
    duration: "3 min",
    category: "suave"
  },
  {
    id: "s62",
    title: "Massagem em Círculo",
    description: "Faça uma breve massagem nos ombros da pessoa à sua direita.",
    type: "desafio",
    duration: "1 min",
    category: "suave"
  },
  {
    id: "s63",
    title: "Talento Inesperado",
    description: "Demonstre um talento inesperado que você tenha.",
    type: "desafio",
    duration: "2 min",
    category: "suave"
  },
  {
    id: "s64",
    title: "Andar Diferente",
    description: "Imite três formas diferentes de andar (como modelo, idoso, cowboy).",
    type: "desafio",
    duration: "1 min",
    category: "suave"
  },
  {
    id: "s65",
    title: "Cosquinha Mútua",
    description: "Faça cosquinha em outro jogador por 15 segundos.",
    type: "desafio",
    duration: "30 seg",
    category: "suave"
  },
];

// ----- DESAFIOS PICANTES -----
export const picanteChallenges: GameChallenge[] = [
  // Perguntas picantes
  {
    id: "p1",
    title: "Confissão Picante",
    description: "Qual foi a situação mais constrangedora que você já passou em um encontro romântico?",
    type: "pergunta",
    duration: "2 min",
    category: "picante"
  },
  {
    id: "p2",
    title: "Crushes Famosos",
    description: "Quais são seus 3 crushes famosos e o que te atrai neles?",
    type: "pergunta",
    duration: "2 min",
    category: "picante"
  },
  {
    id: "p3",
    title: "Atração Inesperada",
    description: "Já sentiu atração por alguém que seria considerado 'proibido' ou inesperado?",
    type: "pergunta",
    duration: "2 min",
    category: "picante"
  },
  {
    id: "p4",
    title: "Primeiro Beijo",
    description: "Como foi seu primeiro beijo? Conte todos os detalhes!",
    type: "pergunta",
    duration: "2 min",
    category: "picante"
  },
  {
    id: "p5",
    title: "Qualidades Atraentes",
    description: "Quais qualidades físicas te atraem mais em alguém?",
    type: "pergunta",
    duration: "1 min",
    category: "picante"
  },
  {
    id: "p6",
    title: "Fantasia de Encontro",
    description: "Descreva seu encontro ideal, sem se preocupar com custos ou logística.",
    type: "pergunta",
    duration: "2 min",
    category: "picante"
  },
  {
    id: "p7",
    title: "Cantadas",
    description: "Qual foi a melhor ou pior cantada que você já recebeu?",
    type: "pergunta",
    duration: "1 min",
    category: "picante"
  },
  {
    id: "p8",
    title: "Rejeição Memorável",
    description: "Já levou um fora marcante? Como aconteceu?",
    type: "pergunta",
    duration: "2 min",
    category: "picante"
  },
  {
    id: "p9",
    title: "Ciúmes",
    description: "O que te deixa com ciúmes em um relacionamento?",
    type: "pergunta",
    duration: "2 min",
    category: "picante"
  },
  {
    id: "p10",
    title: "Linguagem do Amor",
    description: "Qual é sua principal linguagem do amor: palavras de afirmação, tempo de qualidade, presentes, atos de serviço ou toque físico?",
    type: "pergunta",
    duration: "2 min",
    category: "picante"
  },
  
  // Desafios picantes
  {
    id: "p11",
    title: "Dança Sensual",
    description: "Faça uma dança sensual por 30 segundos para os outros jogadores.",
    type: "desafio",
    duration: "1 min",
    category: "picante"
  },
  {
    id: "p12",
    title: "Sussurro ao Pé do Ouvido",
    description: "Sussurre algo no ouvido de outro jogador que o faça sorrir ou corar.",
    type: "desafio",
    duration: "1 min",
    category: "picante"
  },
  {
    id: "p13",
    title: "Massagem Romântica",
    description: "Faça uma massagem nas mãos de outro jogador por 1 minuto enquanto olha nos olhos dele(a).",
    type: "desafio",
    duration: "1 min",
    category: "picante"
  },
  {
    id: "p14",
    title: "Mordida Leve",
    description: "Dê uma mordida leve no lóbulo da orelha de outro jogador.",
    type: "desafio",
    duration: "30 seg",
    category: "picante"
  },
  {
    id: "p15",
    title: "Imitação Sensual",
    description: "Imite a cena mais sensual de um filme que você conheça.",
    type: "desafio",
    duration: "1 min",
    category: "picante"
  },
  {
    id: "p16",
    title: "Beijo no Pescoço",
    description: "Dê um beijo suave no pescoço de outro jogador.",
    type: "desafio",
    duration: "30 seg",
    category: "picante"
  },
  {
    id: "p17",
    title: "Elogio Íntimo",
    description: "Faça um elogio sobre uma parte do corpo de outro jogador que você acha atraente.",
    type: "desafio",
    duration: "1 min",
    category: "picante"
  },
  {
    id: "p18",
    title: "Contato Visual Intenso",
    description: "Mantenha contato visual intenso com outro jogador por 1 minuto sem desviar o olhar nem falar.",
    type: "desafio",
    duration: "1 min",
    category: "picante"
  },
  {
    id: "p19", 
    title: "Sedução com Fruta",
    description: "Coma uma fruta da maneira mais sensual que conseguir.",
    type: "desafio",
    duration: "1 min",
    category: "picante"
  },
  {
    id: "p20",
    title: "Massagem nos Pés",
    description: "Faça uma massagem sensual nos pés de outro jogador por 1 minuto.",
    type: "desafio",
    duration: "1 min",
    category: "picante"
  },
  
  // Mais 15 perguntas picantes (continua de 21 a 35)
  {
    id: "p21",
    title: "Lugar Inusitado",
    description: "Qual é o lugar mais inusitado onde você já pensou em beijar alguém?",
    type: "pergunta",
    duration: "1 min",
    category: "picante"
  },
  {
    id: "p22",
    title: "Segredo Romântico",
    description: "Qual é um segredo romântico que você nunca contou a ninguém?",
    type: "pergunta",
    duration: "2 min",
    category: "picante"
  },
  {
    id: "p23",
    title: "Maior Mentira",
    description: "Qual foi a maior mentira que você já contou para impressionar alguém?",
    type: "pergunta",
    duration: "2 min",
    category: "picante"
  },
  {
    id: "p24",
    title: "Amor à Primeira Vista",
    description: "Você acredita em amor à primeira vista? Já aconteceu com você?",
    type: "pergunta",
    duration: "2 min",
    category: "picante"
  },
  {
    id: "p25",
    title: "Traição",
    description: "O que você considera traição em um relacionamento?",
    type: "pergunta",
    duration: "2 min",
    category: "picante"
  },
  
  // Mais 15 desafios picantes (continua de 26 a 40)
  {
    id: "p26",
    title: "Posição de Yoga",
    description: "Demonstre a posição de yoga mais sensual que você conhece.",
    type: "desafio",
    duration: "1 min",
    category: "picante"
  },
  {
    id: "p27",
    title: "Strip Parcial",
    description: "Remova uma peça de roupa (que não seja essencial) de forma sensual.",
    type: "desafio",
    duration: "1 min",
    category: "picante"
  },
  {
    id: "p28",
    title: "Lap Dance",
    description: "Faça um lap dance de 30 segundos em outro jogador.",
    type: "desafio",
    duration: "1 min",
    category: "picante"
  },
  {
    id: "p29",
    title: "Beijo com Gelo",
    description: "Coloque um cubo de gelo na boca e beije outro jogador até o gelo derreter.",
    type: "desafio",
    duration: "1 min",
    category: "picante"
  },
  {
    id: "p30",
    title: "Beijo no Corpo",
    description: "Dê três beijos em diferentes partes do corpo de outro jogador (respeitando limites).",
    type: "desafio",
    duration: "1 min",
    category: "picante"
  },
];

// ----- DESAFIOS SELVAGENS -----
export const selvagemChallenges: GameChallenge[] = [
  // Perguntas selvagens
  {
    id: "sv1",
    title: "Experiência Intensa",
    description: "Qual foi a experiência mais intensa que você já teve?",
    type: "pergunta",
    duration: "2 min",
    category: "selvagem"
  },
  {
    id: "sv2",
    title: "Fantasia Confessada",
    description: "Conte uma fantasia que você tem e nunca realizou.",
    type: "pergunta",
    duration: "2 min",
    category: "selvagem"
  },
  {
    id: "sv3",
    title: "Atitude Ousada",
    description: "Qual foi a atitude mais ousada que você já tomou para conquistar alguém?",
    type: "pergunta",
    duration: "2 min",
    category: "selvagem"
  },
  {
    id: "sv4",
    title: "Experiência Marcante",
    description: "Qual foi a experiência mais selvagem que você já teve em um relacionamento?",
    type: "pergunta",
    duration: "2 min",
    category: "selvagem"
  },
  {
    id: "sv5",
    title: "Fetiche Revelado",
    description: "Você tem algum fetiche que considera incomum? Qual?",
    type: "pergunta",
    duration: "2 min",
    category: "selvagem"
  },
  
  // Desafios selvagens
  {
    id: "sv6",
    title: "Striptease Parcial",
    description: "Faça um striptease sensual, removendo apenas uma peça de roupa (mantendo as roupas essenciais).",
    type: "desafio",
    duration: "2 min",
    category: "selvagem"
  },
  {
    id: "sv7",
    title: "Vendado e Confiante",
    description: "Permita que outro jogador, com seus olhos vendados, toque seu rosto por 30 segundos.",
    type: "desafio",
    duration: "1 min",
    category: "selvagem"
  },
  {
    id: "sv8",
    title: "Dança Sensual",
    description: "Dance sensualmente para outro jogador por 1 minuto.",
    type: "desafio",
    duration: "1 min",
    category: "selvagem"
  },
  {
    id: "sv9",
    title: "Massage Íntima",
    description: "Faça uma massagem nas costas de outro jogador, por baixo da camiseta, por 1 minuto.",
    type: "desafio",
    duration: "1 min",
    category: "selvagem"
  },
  {
    id: "sv10",
    title: "Beijo Quente",
    description: "Dê um beijo quente no pescoço de outro jogador por 15 segundos.",
    type: "desafio",
    duration: "30 seg",
    category: "selvagem"
  },
  
  // Mais perguntas e desafios selvagens...
  {
    id: "sv11",
    title: "Desejo Confesso",
    description: "Confesse um desejo que você tem por outro jogador, algo que nunca disse antes.",
    type: "pergunta",
    duration: "2 min",
    category: "selvagem"
  },
  {
    id: "sv12",
    title: "Limite Testado",
    description: "Qual situação fez você testar seus próprios limites em um relacionamento?",
    type: "pergunta",
    duration: "2 min",
    category: "selvagem"
  },
  {
    id: "sv13",
    title: "Provocação Sensual",
    description: "Faça uma provocação sensual em outro jogador sem tocar nele(a).",
    type: "desafio",
    duration: "1 min",
    category: "selvagem"
  },
  {
    id: "sv14",
    title: "Morango Sensual",
    description: "Alimente outro jogador com um morango ou fruta da forma mais sensual possível.",
    type: "desafio",
    duration: "1 min",
    category: "selvagem"
  },
  {
    id: "sv15",
    title: "Contato Físico",
    description: "Faça contato físico com outro jogador em três lugares diferentes por 10 segundos cada.",
    type: "desafio",
    duration: "1 min",
    category: "selvagem"
  },
];

// ----- DESAFIOS EXTREMOS -----
export const extremoChallenges: GameChallenge[] = [
  // Perguntas extremas
  {
    id: "e1",
    title: "Confissão Extrema",
    description: "Qual é a fantasia mais extrema que você já teve?",
    type: "pergunta",
    duration: "2 min",
    category: "extremo"
  },
  {
    id: "e2",
    title: "Desejo Proibido",
    description: "Qual é um desejo 'proibido' que você tem, mas nunca compartilhou?",
    type: "pergunta",
    duration: "2 min",
    category: "extremo"
  },
  {
    id: "e3",
    title: "Experiência Extrema",
    description: "Qual foi a experiência mais intensa e inesquecível da sua vida?",
    type: "pergunta",
    duration: "2 min",
    category: "extremo"
  },
  {
    id: "e4",
    title: "Limite Pessoal",
    description: "Qual é um limite seu que você jamais ultrapassaria, mesmo a pedido de alguém especial?",
    type: "pergunta",
    duration: "2 min",
    category: "extremo"
  },
  {
    id: "e5",
    title: "Segredo Profundo",
    description: "Qual é um segredo que você nunca contou a ninguém, mas sente que poderia compartilhar agora?",
    type: "pergunta",
    duration: "2 min",
    category: "extremo"
  },
  
  // Desafios extremos
  {
    id: "e6",
    title: "Beijo Extremo",
    description: "Dê um beijo intenso em outro jogador por 30 segundos.",
    type: "desafio",
    duration: "1 min",
    category: "extremo"
  },
  {
    id: "e7",
    title: "Cena Quente",
    description: "Simule uma cena quente de filme com outro jogador por 30 segundos.",
    type: "desafio",
    duration: "1 min",
    category: "extremo"
  },
  {
    id: "e8",
    title: "Mordidas Sensuais",
    description: "Dê mordidas leves pelo corpo de outro jogador, respeitando limites.",
    type: "desafio",
    duration: "1 min",
    category: "extremo"
  },
  {
    id: "e9",
    title: "Striptease Ousado",
    description: "Faça um striptease ousado, mas mantendo roupas íntimas.",
    type: "desafio",
    duration: "2 min",
    category: "extremo"
  },
  {
    id: "e10",
    title: "Banho Compartilhado",
    description: "Imagine que você está tomando banho com outro jogador e descreva detalhadamente o que faria.",
    type: "desafio",
    duration: "2 min",
    category: "extremo"
  },
  
  // Mais perguntas e desafios extremos...
  {
    id: "e11",
    title: "Arrependimento Íntimo",
    description: "Você já se arrependeu de alguma experiência íntima? Por quê?",
    type: "pergunta",
    duration: "2 min",
    category: "extremo"
  },
  {
    id: "e12",
    title: "Desejo Realizado",
    description: "Qual desejo você já realizou que nunca imaginou que faria?",
    type: "pergunta",
    duration: "2 min",
    category: "extremo"
  },
  {
    id: "e13",
    title: "Massagem Completa",
    description: "Faça uma massagem sensual nas costas de outro jogador por 2 minutos.",
    type: "desafio",
    duration: "2 min",
    category: "extremo"
  },
  {
    id: "e14",
    title: "Sussurros Proibidos",
    description: "Sussurre no ouvido de outro jogador os desejos mais intensos que você tem por ele(a).",
    type: "desafio",
    duration: "1 min",
    category: "extremo"
  },
  {
    id: "e15",
    title: "Posição Preferida",
    description: "Demonstre qual seria sua posição preferida com outro jogador (sem contato físico real).",
    type: "desafio",
    duration: "1 min",
    category: "extremo"
  },
];

// Combinando todos os desafios em um objeto para fácil acesso
export const ALL_CHALLENGES = {
  suave: suaveChallenges,
  picante: picanteChallenges,
  selvagem: selvagemChallenges,
  extremo: extremoChallenges
};

// Função para obter desafios por categoria
export const getChallengesByCategory = (category: CategoryType): GameChallenge[] => {
  return ALL_CHALLENGES[category].map((challenge, index) => ({
    ...challenge,
    index: index + 1
  }));
};

// Função para obter um desafio aleatório
export const getRandomChallenge = (category: CategoryType): GameChallenge => {
  const challenges = ALL_CHALLENGES[category];
  const randomIndex = Math.floor(Math.random() * challenges.length);
  return {
    ...challenges[randomIndex],
    index: randomIndex + 1
  };
};