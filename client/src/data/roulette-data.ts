import { RouletteAction, RouletteBodyPart } from "@/types/game-modes";

// Ações para a roleta
export const rouletteActions: RouletteAction[] = [
  // Suave
  {
    id: "ra1",
    text: "Acariciar",
    type: "action",
    intensity: "suave"
  },
  {
    id: "ra2",
    text: "Beijar suavemente",
    type: "action",
    intensity: "suave"
  },
  {
    id: "ra3",
    text: "Soprar delicadamente",
    type: "action",
    intensity: "suave"
  },
  {
    id: "ra4",
    text: "Massagear",
    type: "action",
    intensity: "suave"
  },
  {
    id: "ra5",
    text: "Fazer círculos com o dedo",
    type: "action",
    intensity: "suave"
  },
  {
    id: "ra6",
    text: "Sussurrar algo carinhoso",
    type: "action",
    intensity: "suave"
  },
  {
    id: "ra7",
    text: "Descrever o que mais gosta",
    type: "command",
    intensity: "suave"
  },
  {
    id: "ra8",
    text: "Olhar nos olhos enquanto toca",
    type: "command",
    intensity: "suave"
  },
  {
    id: "ra9",
    text: "Fazer um carinho com a ponta dos dedos",
    type: "action",
    intensity: "suave"
  },
  {
    id: "ra10",
    text: "O que te faz se sentir relaxado(a)?",
    type: "question",
    intensity: "suave"
  },
  
  // Picante
  {
    id: "ra11",
    text: "Mordiscar levemente",
    type: "action",
    intensity: "picante"
  },
  {
    id: "ra12",
    text: "Beijar intensamente",
    type: "action",
    intensity: "picante"
  },
  {
    id: "ra13",
    text: "Lamber devagar",
    type: "action",
    intensity: "picante"
  },
  {
    id: "ra14",
    text: "Massagear com pressão",
    type: "action",
    intensity: "picante"
  },
  {
    id: "ra15",
    text: "Sussurrar uma fantasia",
    type: "command",
    intensity: "picante"
  },
  {
    id: "ra16",
    text: "Fazer um elogio sensual",
    type: "command",
    intensity: "picante"
  },
  {
    id: "ra17",
    text: "Descrever como gostaria de ser tocado(a)",
    type: "command",
    intensity: "picante"
  },
  {
    id: "ra18",
    text: "Qual parte do meu corpo mais te atrai?",
    type: "question",
    intensity: "picante"
  },
  {
    id: "ra19",
    text: "O que te excita mais: palavras ou toques?",
    type: "question",
    intensity: "picante"
  },
  {
    id: "ra20",
    text: "Dar um beijo molhado",
    type: "action",
    intensity: "picante"
  },
  
  // Selvagem
  {
    id: "ra21",
    text: "Morder (com pressão moderada)",
    type: "action",
    intensity: "selvagem"
  },
  {
    id: "ra22",
    text: "Chupar intensamente",
    type: "action",
    intensity: "selvagem"
  },
  {
    id: "ra23",
    text: "Arranhar suavemente",
    type: "action",
    intensity: "selvagem"
  },
  {
    id: "ra24",
    text: "Puxar com firmeza",
    type: "action",
    intensity: "selvagem"
  },
  {
    id: "ra25",
    text: "Sussurrar o que quer fazer depois",
    type: "command",
    intensity: "selvagem"
  },
  {
    id: "ra26",
    text: "Dizer uma ordem sensual",
    type: "command",
    intensity: "selvagem"
  },
  {
    id: "ra27",
    text: "Descrever uma fantasia selvagem",
    type: "command",
    intensity: "selvagem"
  },
  {
    id: "ra28",
    text: "Qual é sua fantasia mais ousada?",
    type: "question",
    intensity: "selvagem"
  },
  {
    id: "ra29",
    text: "O que você adoraria que eu fizesse agora?",
    type: "question",
    intensity: "selvagem"
  },
  {
    id: "ra30",
    text: "Pressionar com força",
    type: "action",
    intensity: "selvagem"
  },
  
  // Extremo
  {
    id: "ra31",
    text: "Morder fortemente",
    type: "action",
    intensity: "extremo"
  },
  {
    id: "ra32",
    text: "Dar um tapa (controlado)",
    type: "action",
    intensity: "extremo"
  },
  {
    id: "ra33",
    text: "Prender/imobilizar",
    type: "action",
    intensity: "extremo"
  },
  {
    id: "ra34",
    text: "Dominar completamente",
    type: "action",
    intensity: "extremo"
  },
  {
    id: "ra35",
    text: "Dizer algo extremamente provocante",
    type: "command",
    intensity: "extremo"
  },
  {
    id: "ra36",
    text: "Revelar sua fantasia mais secreta",
    type: "command",
    intensity: "extremo"
  },
  {
    id: "ra37",
    text: "Ordenar o que deseja receber",
    type: "command",
    intensity: "extremo"
  },
  {
    id: "ra38",
    text: "O que te faz perder completamente o controle?",
    type: "question",
    intensity: "extremo"
  },
  {
    id: "ra39",
    text: "Qual é seu limite absoluto?",
    type: "question",
    intensity: "extremo"
  },
  {
    id: "ra40",
    text: "Provocar até o limite",
    type: "action",
    intensity: "extremo"
  }
];

// Partes do corpo para a roleta
export const rouletteBodyParts: RouletteBodyPart[] = [
  {
    id: "bp1",
    name: "Lábios",
    sensitivity: 8
  },
  {
    id: "bp2",
    name: "Pescoço",
    sensitivity: 9
  },
  {
    id: "bp3",
    name: "Orelhas",
    sensitivity: 7
  },
  {
    id: "bp4",
    name: "Nuca",
    sensitivity: 8
  },
  {
    id: "bp5",
    name: "Ombros",
    sensitivity: 5
  },
  {
    id: "bp6",
    name: "Costas",
    sensitivity: 6
  },
  {
    id: "bp7",
    name: "Braços",
    sensitivity: 4
  },
  {
    id: "bp8",
    name: "Mãos",
    sensitivity: 6
  },
  {
    id: "bp9",
    name: "Dedos",
    sensitivity: 5
  },
  {
    id: "bp10",
    name: "Peito",
    sensitivity: 8
  },
  {
    id: "bp11",
    name: "Abdômen",
    sensitivity: 7
  },
  {
    id: "bp12",
    name: "Cintura",
    sensitivity: 6
  },
  {
    id: "bp13",
    name: "Quadril",
    sensitivity: 7
  },
  {
    id: "bp14",
    name: "Coxas",
    sensitivity: 8
  },
  {
    id: "bp15",
    name: "Joelhos",
    sensitivity: 4
  },
  {
    id: "bp16",
    name: "Panturrilhas",
    sensitivity: 5
  },
  {
    id: "bp17",
    name: "Pés",
    sensitivity: 7
  },
  {
    id: "bp18",
    name: "Parte interna das coxas",
    sensitivity: 9
  },
  {
    id: "bp19",
    name: "Virilha",
    sensitivity: 10
  },
  {
    id: "bp20",
    name: "Bumbum",
    sensitivity: 9
  }
];