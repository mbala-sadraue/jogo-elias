import { users, type User, type InsertUser, challenges, type Challenge, type InsertChallenge } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Challenge methods
  getChallenges(): Promise<Challenge[]>;
  getChallengesByIntensity(intensity: string): Promise<Challenge[]>;
  getChallengesByRelationship(relationshipType: string): Promise<Challenge[]>;
  createChallenge(challenge: InsertChallenge): Promise<Challenge>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private challenges: Map<number, Challenge>;
  userCurrentId: number;
  challengeCurrentId: number;

  constructor() {
    this.users = new Map();
    this.challenges = new Map();
    this.userCurrentId = 1;
    this.challengeCurrentId = 1;
    
    // Initialize with sample challenges
    this.initializeChallenges();
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  async getChallenges(): Promise<Challenge[]> {
    return Array.from(this.challenges.values());
  }
  
  async getChallengesByIntensity(intensity: string): Promise<Challenge[]> {
    return Array.from(this.challenges.values()).filter(
      (challenge) => challenge.intensity === intensity
    );
  }
  
  async getChallengesByRelationship(relationshipType: string): Promise<Challenge[]> {
    return Array.from(this.challenges.values()).filter(
      (challenge) => challenge.relationshipType === relationshipType || challenge.relationshipType === null
    );
  }
  
  async createChallenge(insertChallenge: InsertChallenge): Promise<Challenge> {
    const id = this.challengeCurrentId++;
    
    // Garantir que todos os campos opcionais tenham valores padrão
    const challenge: Challenge = { 
      ...insertChallenge, 
      id,
      type: insertChallenge.type || null,
      relationshipType: insertChallenge.relationshipType || null,
      requiresPair: insertChallenge.requiresPair || null,
      hasForbiddenVersion: insertChallenge.hasForbiddenVersion || null,
      forbiddenText: insertChallenge.forbiddenText || null,
      tags: insertChallenge.tags || null
    };
    
    this.challenges.set(id, challenge);
    return challenge;
  }
  
  private initializeChallenges() {
    // Suave challenges (suitable for all relationships)
    const suaveChallenges = [
      // Desafios Suaves
      { 
        text: "Faça uma massagem relaxante nas costas do seu parceiro(a) por 3 minutos.", 
        intensity: "suave", 
        relationshipType: null, 
        type: "desafio",
        tags: ["massagem", "relaxante"]
      },
      { 
        text: "Beije seu parceiro(a) no pescoço por 30 segundos.", 
        intensity: "suave", 
        relationshipType: null,
        type: "desafio",
        tags: ["beijo", "pescoço"]
      },
      { 
        text: "Fale no ouvido do seu parceiro(a) uma fantasia que você tem.", 
        intensity: "suave", 
        relationshipType: null,
        type: "desafio",
        hasForbiddenVersion: true,
        forbiddenText: "Fale no ouvido do seu parceiro(a) sua fantasia mais proibida, algo que nunca contou a ninguém.",
        tags: ["fantasia", "segredo"]
      },
      { 
        text: "Pegue na minha mão e descreva como se sente ao segurá-la.", 
        intensity: "suave", 
        relationshipType: null,
        type: "desafio",
        tags: ["toque", "emoções"]
      },
      { 
        text: "Me olhe nos olhos por 1 minuto sem piscar.", 
        intensity: "suave", 
        relationshipType: null,
        type: "desafio",
        tags: ["olhar", "conexão"]
      },
      { 
        text: "Escolha uma música e dance comigo.", 
        intensity: "suave", 
        relationshipType: null,
        type: "desafio",
        tags: ["música", "dança"]
      },
      { 
        text: "Me abrace por 30 segundos bem apertado(a).", 
        intensity: "suave", 
        relationshipType: null,
        type: "desafio",
        tags: ["abraço", "contato"]
      },
      { 
        text: "Dê um beijo suave no meu rosto.", 
        intensity: "suave", 
        relationshipType: null,
        type: "desafio",
        tags: ["beijo", "carinho"]
      },
      { 
        text: "Faça carinho no meu cabelo por 1 minuto.", 
        intensity: "suave", 
        relationshipType: null,
        type: "desafio",
        tags: ["carinho", "cabelo"]
      },
      { 
        text: "Desenhe algo na minha pele com o dedo.", 
        intensity: "suave", 
        relationshipType: null,
        type: "desafio",
        tags: ["desenho", "toque"]
      },
      { 
        text: "Diga três palavras que descrevam como sou na intimidade.", 
        intensity: "suave", 
        relationshipType: null,
        type: "desafio",
        tags: ["descrição", "intimidade"]
      },
      { 
        text: "De olhos fechados, toque meu rosto e descreva o que está sentindo.", 
        intensity: "suave", 
        relationshipType: null,
        type: "desafio",
        tags: ["toque", "sensações"]
      },
      { 
        text: "Vamos respirar juntos por 30 segundos, sentindo a respiração um do outro.", 
        intensity: "suave", 
        relationshipType: null,
        type: "desafio",
        tags: ["respiração", "sintonia"]
      },
      { 
        text: "Faça um elogio sincero sobre algo em mim que poucas pessoas notam.", 
        intensity: "suave", 
        relationshipType: null,
        type: "desafio",
        tags: ["elogio", "observação"]
      },
      { 
        text: "Crie um apelido carinhoso para mim baseado em algo que ama em mim.", 
        intensity: "suave", 
        relationshipType: null,
        type: "desafio",
        tags: ["apelido", "carinho"]
      },
      { 
        text: "Façamos uma promessa um para o outro que cumpriremos esta semana.", 
        intensity: "suave", 
        relationshipType: null,
        type: "desafio",
        tags: ["promessa", "compromisso"]
      },
      { 
        text: "Descreva uma viagem que gostaria de fazer comigo.", 
        intensity: "suave", 
        relationshipType: null,
        type: "desafio",
        tags: ["viagem", "sonhos"]
      },
      { 
        text: "Segure minha mão e sinta minha pulsação por 30 segundos.", 
        intensity: "suave", 
        relationshipType: null,
        type: "desafio",
        tags: ["pulsação", "conexão"]
      },
      { 
        text: "Sussurre no meu ouvido algo que quer fazer comigo mais tarde.", 
        intensity: "suave", 
        relationshipType: null,
        type: "desafio",
        hasForbiddenVersion: true,
        forbiddenText: "Sussurre no meu ouvido seu desejo sexual mais urgente para realizar hoje.",
        tags: ["sussurro", "desejo"]
      },
      { 
        text: "Escolha uma parte não óbvia do meu corpo e faça um elogio sincero.", 
        intensity: "suave", 
        relationshipType: null,
        type: "desafio",
        tags: ["elogio", "corpo"]
      },
      { 
        text: "Massageie minhas mãos por 1 minuto.", 
        intensity: "suave", 
        relationshipType: null,
        type: "desafio",
        tags: ["massagem", "mãos"]
      },
      { 
        text: "Cantarole uma música que te faz lembrar de mim.", 
        intensity: "suave", 
        relationshipType: null,
        type: "desafio",
        tags: ["música", "memória"]
      },
      { 
        text: "Diga-me uma coisa que admira na minha personalidade.", 
        intensity: "suave", 
        relationshipType: null,
        type: "desafio",
        tags: ["admiração", "personalidade"]
      },
      { 
        text: "Feche os olhos e deixe que eu toque seu rosto suavemente por 30 segundos.", 
        intensity: "suave", 
        relationshipType: null,
        type: "desafio",
        tags: ["toque", "rosto"]
      },
      { 
        text: "Conte-me um segredo que nunca contou a ninguém.", 
        intensity: "suave", 
        relationshipType: null,
        type: "desafio",
        hasForbiddenVersion: true,
        forbiddenText: "Conte um segredo íntimo sobre uma fantasia que tem comigo e nunca revelou.",
        tags: ["segredo", "revelação"]
      },
      { 
        text: "Escreva com o dedo nas minhas costas três palavras que descrevem o que sente por mim.", 
        intensity: "suave", 
        relationshipType: null,
        type: "desafio",
        tags: ["escrita", "sentimento"]
      },
      { 
        text: "Faça uma pose de ioga juntinho comigo por 30 segundos.", 
        intensity: "suave", 
        relationshipType: null,
        type: "desafio",
        tags: ["ioga", "sintonia"]
      },
      { 
        text: "Faça um brinde comigo, olhando nos meus olhos, e diga algo sincero.", 
        intensity: "suave", 
        relationshipType: null,
        type: "desafio",
        tags: ["brinde", "sinceridade"]
      },
      { 
        text: "Descreva como seria um dia perfeito conosco juntos.", 
        intensity: "suave", 
        relationshipType: null,
        type: "desafio",
        tags: ["dia perfeito", "imaginação"]
      },
      
      // Perguntas Suaves
      { 
        text: "Descreva três coisas que acha atraente em seu parceiro(a).", 
        intensity: "suave", 
        relationshipType: null,
        type: "pergunta",
        tags: ["elogio", "romance"]
      },
      { 
        text: "Qual foi seu primeiro pensamento ao me ver?", 
        intensity: "suave", 
        relationshipType: null,
        type: "pergunta",
        tags: ["primeira impressão", "memória"]
      },
      { 
        text: "O que mais te atrai em mim além da aparência?", 
        intensity: "suave", 
        relationshipType: null,
        type: "pergunta",
        tags: ["atração", "qualidades"]
      },
      { 
        text: "Como você descreveria nosso relacionamento em uma palavra?", 
        intensity: "suave", 
        relationshipType: null,
        type: "pergunta",
        tags: ["relacionamento", "descrição"]
      },
      { 
        text: "Qual é a sua lembrança mais feliz de nós dois juntos?", 
        intensity: "suave", 
        relationshipType: null,
        type: "pergunta",
        tags: ["memória", "felicidade"]
      },
      { 
        text: "Se tivéssemos que criar uma tradição só nossa, qual seria?", 
        intensity: "suave", 
        relationshipType: null,
        type: "pergunta",
        tags: ["tradição", "casal"]
      },
      { 
        text: "O que significa amor para você?", 
        intensity: "suave", 
        relationshipType: null,
        type: "pergunta",
        tags: ["amor", "significado"]
      },
      { 
        text: "O que mais te faz sentir amado(a)?", 
        intensity: "suave", 
        relationshipType: null,
        type: "pergunta",
        tags: ["amor", "sentimento"]
      },
      { 
        text: "Como seria um encontro dos sonhos para você?", 
        intensity: "suave", 
        relationshipType: null,
        type: "pergunta",
        tags: ["encontro", "sonho"]
      },
      { 
        text: "O que faz um beijo ser inesquecível?", 
        intensity: "suave", 
        relationshipType: null,
        type: "pergunta",
        tags: ["beijo", "inesquecível"]
      },
      { 
        text: "Qual gesto simples de carinho te emociona?", 
        intensity: "suave", 
        relationshipType: null,
        type: "pergunta",
        tags: ["carinho", "emoção"]
      },
      { 
        text: "O que você admira na minha personalidade?", 
        intensity: "suave", 
        relationshipType: null,
        type: "pergunta",
        tags: ["admiração", "personalidade"]
      },
      { 
        text: "Se pudesse me dar um presente agora, o que seria?", 
        intensity: "suave", 
        relationshipType: null,
        type: "pergunta",
        tags: ["presente", "desejo"]
      },
      { 
        text: "Qual música te lembra de mim?", 
        intensity: "suave", 
        relationshipType: null,
        type: "pergunta",
        tags: ["música", "lembrança"]
      },
      { 
        text: "Se tivéssemos um dia inteiro só para nós, o que faríamos?", 
        intensity: "suave", 
        relationshipType: null,
        type: "pergunta",
        tags: ["dia", "planejamento"]
      },
      { 
        text: "Qual foi o momento em que você percebeu que gostava de mim?", 
        intensity: "suave", 
        relationshipType: null,
        type: "pergunta",
        tags: ["momento", "percepção"]
      },
      { 
        text: "Qual característica minha você gostaria de ter?", 
        intensity: "suave", 
        relationshipType: null,
        type: "pergunta",
        tags: ["característica", "admiração"]
      },
      { 
        text: "Como você se sente quando estamos distantes?", 
        intensity: "suave", 
        relationshipType: null,
        type: "pergunta",
        tags: ["distância", "sentimento"]
      },
      { 
        text: "Que filme você gostaria de assistir comigo?", 
        intensity: "suave", 
        relationshipType: null,
        type: "pergunta",
        tags: ["filme", "lazer"]
      },
      { 
        text: "O que te deixa mais à vontade comigo?", 
        intensity: "suave", 
        relationshipType: null,
        type: "pergunta",
        tags: ["conforto", "relação"]
      },
      { 
        text: "Qual é o seu local preferido para estarmos juntos?", 
        intensity: "suave", 
        relationshipType: null,
        type: "pergunta",
        tags: ["local", "juntos"]
      },
      { 
        text: "O que mais valoriza em nosso relacionamento?", 
        intensity: "suave", 
        relationshipType: null,
        type: "pergunta",
        tags: ["valor", "relacionamento"]
      },
      { 
        text: "Como você imagina nossa vida daqui a cinco anos?", 
        intensity: "suave", 
        relationshipType: null,
        type: "pergunta",
        tags: ["futuro", "imaginação"]
      },
      { 
        text: "O que você acha que estamos construindo juntos?", 
        intensity: "suave", 
        relationshipType: null,
        type: "pergunta",
        tags: ["construção", "relacionamento"]
      },
      { 
        text: "Qual qualidade minha te faz querer ficar comigo?", 
        intensity: "suave", 
        relationshipType: null,
        type: "pergunta",
        tags: ["qualidade", "permanência"]
      },
      { 
        text: "O que você considera uma demonstração de amor?", 
        intensity: "suave", 
        relationshipType: null,
        type: "pergunta",
        tags: ["demonstração", "amor"]
      },
      { 
        text: "Que tipo de surpresa você gostaria de receber de mim?", 
        intensity: "suave", 
        relationshipType: null,
        type: "pergunta",
        tags: ["surpresa", "presente"]
      },
      { 
        text: "Como você se sente quando nos olhamos nos olhos?", 
        intensity: "suave", 
        relationshipType: null,
        type: "pergunta",
        tags: ["olhar", "sentimento"]
      },
      { 
        text: "O que te conquista todos os dias?", 
        intensity: "suave", 
        relationshipType: null,
        type: "pergunta",
        tags: ["conquista", "rotina"]
      }
    ];
    
    // Picante challenges
    const picanteChallenges = [
      // Desafios Picantes
      { 
        text: "Faça uma dança sensual para seu parceiro(a) por 1 minuto.", 
        intensity: "picante", 
        relationshipType: null,
        type: "desafio",
        tags: ["dança", "sensual"]
      },
      { 
        text: "Beije cada parte do corpo do seu parceiro(a) que ele(a) escolher.", 
        intensity: "picante", 
        relationshipType: null,
        type: "desafio",
        tags: ["beijo", "corpo"]
      },
      { 
        text: "Deixe seu parceiro(a) te dar um banho.", 
        intensity: "picante", 
        relationshipType: null,
        type: "desafio",
        tags: ["banho", "água"]
      },
      { 
        text: "Faça uma massagem com óleo no corpo do seu parceiro(a).", 
        intensity: "picante", 
        relationshipType: null,
        type: "desafio",
        tags: ["massagem", "óleo"]
      },
      { 
        text: "Explore o corpo do seu parceiro(a) com uma venda nos olhos por 2 minutos.", 
        intensity: "picante", 
        relationshipType: null,
        type: "desafio",
        tags: ["venda", "exploração"]
      },
      { 
        text: "Me beije onde quiser sem me avisar antes.", 
        intensity: "picante", 
        relationshipType: null,
        type: "desafio",
        tags: ["beijo", "surpresa"]
      },
      { 
        text: "Sussurre algo picante no meu ouvido.", 
        intensity: "picante", 
        relationshipType: null,
        type: "desafio",
        tags: ["sussurro", "provocação"]
      },
      { 
        text: "Passe gelo em um ponto do meu corpo.", 
        intensity: "picante", 
        relationshipType: null,
        type: "desafio",
        tags: ["gelo", "sensação"]
      },
      { 
        text: "Passe seus dedos levemente pelo meu pescoço por 1 minuto.", 
        intensity: "picante", 
        relationshipType: null,
        type: "desafio",
        tags: ["toque", "pescoço"]
      },
      { 
        text: "Me provoque sem me tocar por 30 segundos.", 
        intensity: "picante", 
        relationshipType: null,
        type: "desafio",
        tags: ["provocação", "distância"]
      },
      { 
        text: "Lamba a ponta do meu dedo indicador devagar.", 
        intensity: "picante", 
        relationshipType: null,
        type: "desafio",
        tags: ["lambida", "dedo"]
      },
      { 
        text: "Diga um segredo picante que nunca me contou.", 
        intensity: "picante", 
        relationshipType: null,
        type: "desafio",
        hasForbiddenVersion: true,
        forbiddenText: "Confesse uma fantasia sexual específica comigo que nunca revelou até hoje.",
        tags: ["segredo", "revelação"]
      },
      { 
        text: "Pegue gelo e passe em uma parte sensível do meu corpo.", 
        intensity: "picante", 
        relationshipType: null,
        type: "desafio",
        tags: ["gelo", "sensitivo"]
      },
      { 
        text: "Simule um gemido baixinho no meu ouvido.", 
        intensity: "picante", 
        relationshipType: null,
        type: "desafio",
        tags: ["gemido", "ouvido"]
      },
      { 
        text: "Me provoque com os dentes sem morder forte.", 
        intensity: "picante", 
        relationshipType: null,
        type: "desafio",
        tags: ["dentes", "mordida"]
      },
      { 
        text: "Sente no meu colo e me beije no pescoço por 30 segundos.", 
        intensity: "picante", 
        relationshipType: null,
        type: "desafio",
        tags: ["colo", "beijo"]
      },
      { 
        text: "Acaricie minhas costas por baixo da roupa.", 
        intensity: "picante", 
        relationshipType: null,
        type: "desafio",
        tags: ["carícia", "costas"]
      },
      { 
        text: "Sussurre no meu ouvido três coisas que gostaria de fazer comigo mais tarde.", 
        intensity: "picante", 
        relationshipType: null,
        type: "desafio",
        hasForbiddenVersion: true,
        forbiddenText: "Descreva três posições que quer experimentar comigo hoje à noite.",
        tags: ["sussurro", "planos"]
      },
      { 
        text: "Tire uma peça da minha roupa lentamente.",
        intensity: "picante", 
        relationshipType: null,
        type: "desafio",
        tags: ["roupa", "lento"]
      },
      { 
        text: "Aperte suavemente minha coxa enquanto me beija.", 
        intensity: "picante", 
        relationshipType: null,
        type: "desafio",
        tags: ["aperto", "coxa"]
      },
      { 
        text: "Coloque minha mão onde você mais gosta de ser tocado(a).", 
        intensity: "picante", 
        relationshipType: null,
        type: "desafio",
        tags: ["toque", "preferência"]
      },
      { 
        text: "Finja que estamos em um local público e me provoque discretamente.", 
        intensity: "picante", 
        relationshipType: null,
        type: "desafio",
        tags: ["público", "provocação"]
      },
      { 
        text: "Me dê um beijo de tirar o fôlego por 30 segundos.", 
        intensity: "picante", 
        relationshipType: null,
        type: "desafio",
        tags: ["beijo", "intenso"]
      },
      { 
        text: "Escolha um local na casa onde nunca nos beijamos e me beije ali agora.", 
        intensity: "picante", 
        relationshipType: null,
        type: "desafio",
        tags: ["local", "beijo"]
      },
      { 
        text: "Desabotoe lentamente minha roupa enquanto me olha nos olhos.", 
        intensity: "picante", 
        relationshipType: null,
        type: "desafio",
        tags: ["desabotoar", "olhar"]
      },
      { 
        text: "Me diga, olhando nos olhos, o que mais deseja fazer comigo.", 
        intensity: "picante", 
        relationshipType: null,
        type: "desafio",
        hasForbiddenVersion: true,
        forbiddenText: "Descreva, com detalhes, como você gostaria de me ver ter um orgasmo.",
        tags: ["desejo", "olhar"]
      },
      { 
        text: "Morda minha orelha suavemente e sussurre algo provocante.", 
        intensity: "picante", 
        relationshipType: null,
        type: "desafio",
        tags: ["mordida", "orelha"]
      },
      { 
        text: "Faça um strip-tease tirandou uma peça de roupa.", 
        intensity: "picante", 
        relationshipType: null,
        type: "desafio",
        tags: ["strip", "roupa"]
      },
      
      // Perguntas Picantes
      { 
        text: "Qual parte do meu corpo você mais gosta?", 
        intensity: "picante", 
        relationshipType: null,
        type: "pergunta",
        tags: ["corpo", "preferência"]
      },
      { 
        text: "Você prefere beijos suaves ou intensos?", 
        intensity: "picante", 
        relationshipType: null,
        type: "pergunta",
        tags: ["beijos", "preferência"]
      },
      { 
        text: "O que mais te excita em um toque?", 
        intensity: "picante", 
        relationshipType: null,
        type: "pergunta",
        hasForbiddenVersion: true,
        forbiddenText: "Qual parte do seu corpo, quando tocada, te faz perder o controle?",
        tags: ["toque", "excitação"]
      },
      { 
        text: "Você já sonhou comigo de forma picante?", 
        intensity: "picante", 
        relationshipType: null,
        type: "pergunta",
        hasForbiddenVersion: true,
        forbiddenText: "Descreva em detalhes o sonho erótico mais intenso que já teve comigo.",
        tags: ["sonho", "fantasia"]
      },
      { 
        text: "O que nunca fizemos, mas você adoraria experimentar?", 
        intensity: "picante", 
        relationshipType: null,
        type: "pergunta",
        hasForbiddenVersion: true,
        forbiddenText: "Qual posição sexual você sempre quis tentar comigo mas nunca pediu?",
        tags: ["experimentar", "desejos"]
      },
      { 
        text: "Como seria uma noite perfeita comigo?", 
        intensity: "picante", 
        relationshipType: null,
        type: "pergunta",
        hasForbiddenVersion: true,
        forbiddenText: "Descreva sua fantasia mais picante de como seria uma noite perfeita comigo.",
        tags: ["noite", "perfeição"]
      },
      { 
        text: "Você prefere dominar ou ser dominado(a)?", 
        intensity: "picante", 
        relationshipType: null,
        type: "pergunta",
        tags: ["dominação", "preferência"]
      },
      { 
        text: "Qual é a sua maior fantasia?", 
        intensity: "picante", 
        relationshipType: null,
        type: "pergunta",
        hasForbiddenVersion: true,
        forbiddenText: "Descreva em detalhes sua fantasia sexual mais intensa que gostaria de realizar comigo.",
        tags: ["fantasia", "desejo"]
      },
      { 
        text: "Qual foi o lugar mais inusitado onde já sentiu desejo por mim?", 
        intensity: "picante", 
        relationshipType: null,
        type: "pergunta",
        tags: ["lugar", "desejo"]
      },
      { 
        text: "O que mais te provoca: palavras, olhares ou toques?", 
        intensity: "picante", 
        relationshipType: null,
        type: "pergunta",
        tags: ["provocação", "preferência"]
      },
      { 
        text: "Como você gosta de ser tocado(a) durante o beijo?", 
        intensity: "picante", 
        relationshipType: null,
        type: "pergunta",
        tags: ["toque", "beijo"]
      },
      { 
        text: "Qual roupa íntima você acha mais sexy?", 
        intensity: "picante", 
        relationshipType: null,
        type: "pergunta",
        tags: ["roupa", "sensualidade"]
      },
      { 
        text: "Você já ficou excitado(a) em um lugar público pensando em mim?", 
        intensity: "picante", 
        relationshipType: null,
        type: "pergunta",
        hasForbiddenVersion: true,
        forbiddenText: "Você já se masturbou pensando em mim? Em qual situação?",
        tags: ["excitação", "público"]
      },
      { 
        text: "O que você gostaria que eu fizesse mais durante nossos momentos íntimos?", 
        intensity: "picante", 
        relationshipType: null,
        type: "pergunta",
        tags: ["intimidade", "desejo"]
      },
      { 
        text: "Qual parte do seu corpo você gosta que eu beije mais?", 
        intensity: "picante", 
        relationshipType: null,
        type: "pergunta",
        tags: ["beijo", "corpo"]
      },
      { 
        text: "Qual é sua memória mais excitante comigo?", 
        intensity: "picante", 
        relationshipType: null,
        type: "pergunta",
        hasForbiddenVersion: true,
        forbiddenText: "Qual foi a vez que tivemos o sexo mais quente na sua opinião e por quê?",
        tags: ["memória", "excitação"]
      },
      { 
        text: "O que te deixa instantaneamente excitado(a)?", 
        intensity: "picante", 
        relationshipType: null,
        type: "pergunta",
        tags: ["excitação", "gatilho"]
      },
      { 
        text: "Qual palavra sensual você gostaria de ouvir no ouvido?", 
        intensity: "picante", 
        relationshipType: null,
        type: "pergunta",
        tags: ["palavra", "ouvido"]
      },
      { 
        text: "Como você prefere que eu demonstre que estou no clima?", 
        intensity: "picante", 
        relationshipType: null,
        type: "pergunta",
        tags: ["clima", "demonstração"]
      },
      { 
        text: "O que você pensa quando me vê sair do banho?", 
        intensity: "picante", 
        relationshipType: null,
        type: "pergunta",
        hasForbiddenVersion: true,
        forbiddenText: "Que fantasias passam pela sua mente quando me vê de toalha depois do banho?",
        tags: ["banho", "pensamento"]
      },
      { 
        text: "Qual é sua posição favorita para beijar?", 
        intensity: "picante", 
        relationshipType: null,
        type: "pergunta",
        tags: ["posição", "beijo"]
      },
      { 
        text: "O que você acha mais sensual: lingerie ou nudez?", 
        intensity: "picante", 
        relationshipType: null,
        type: "pergunta",
        tags: ["sensualidade", "preferência"]
      },
      { 
        text: "Qual o melhor elogio sensual que já recebeu?", 
        intensity: "picante", 
        relationshipType: null,
        type: "pergunta",
        tags: ["elogio", "sensual"]
      },
      { 
        text: "Qual parte do corpo você acha mais sensual no sexo oposto?", 
        intensity: "picante", 
        relationshipType: null,
        type: "pergunta",
        tags: ["corpo", "sensualidade"]
      },
      { 
        text: "O que você gostaria de experimentar na próxima vez que estivermos sozinhos?", 
        intensity: "picante", 
        relationshipType: null,
        type: "pergunta",
        hasForbiddenVersion: true,
        forbiddenText: "Qual é a próxima posição ou prática sexual que você quer experimentar comigo?",
        tags: ["experimentar", "próxima vez"]
      }
    ];
    
    // Selvagem challenges
    const selvagemChallenges = [
      // Desafios Selvagens
      { 
        text: "Estimule oralmente seu parceiro(a) por 1 minuto.", 
        intensity: "selvagem", 
        relationshipType: null,
        type: "desafio",
        tags: ["oral", "estimulação"]
      },
      { 
        text: "Escolha uma posição para ter relações por 5 minutos.", 
        intensity: "selvagem", 
        relationshipType: null,
        type: "desafio",
        requiresPair: true,
        tags: ["sexo", "posição"]
      },
      { 
        text: "Façam amor em um cômodo diferente do habitual.", 
        intensity: "selvagem", 
        relationshipType: null,
        type: "desafio",
        requiresPair: true,
        tags: ["sexo", "local"]
      },
      { 
        text: "Use gelo para estimular as zonas erógenas do seu parceiro(a).", 
        intensity: "selvagem", 
        relationshipType: null,
        type: "desafio",
        tags: ["gelo", "sensação"]
      },
      { 
        text: "Amarre seu parceiro(a) na cama e explore seu corpo por 3 minutos.", 
        intensity: "selvagem", 
        relationshipType: null,
        type: "desafio",
        hasForbiddenVersion: true,
        forbiddenText: "Amarre seu parceiro(a) na cama, vende seus olhos e use um objeto da casa para estimulá-lo(a).",
        tags: ["amarrar", "dominação"]
      },
      { 
        text: "Me provoque até eu perder o controle.", 
        intensity: "selvagem", 
        relationshipType: null,
        type: "desafio",
        tags: ["provocação", "controle"]
      },
      { 
        text: "Dê um beijo intenso sem usar as mãos.", 
        intensity: "selvagem", 
        relationshipType: null,
        type: "desafio",
        tags: ["beijo", "desafio"]
      },
      { 
        text: "Escreva algo ousado no meu corpo com sua boca.", 
        intensity: "selvagem", 
        relationshipType: null,
        type: "desafio",
        tags: ["boca", "escrita"]
      },
      { 
        text: "Tire toda a sua roupa lentamente como um strip-tease.", 
        intensity: "selvagem", 
        relationshipType: null,
        type: "desafio",
        tags: ["strip", "nudez"]
      },
      { 
        text: "Deixe que eu te toque em qualquer lugar por 2 minutos.", 
        intensity: "selvagem", 
        relationshipType: null,
        type: "desafio",
        tags: ["toque", "controle"]
      },
      { 
        text: "Fique nu(a) e deixe que eu passe gelo pelo seu corpo.", 
        intensity: "selvagem", 
        relationshipType: null,
        type: "desafio",
        tags: ["nudez", "gelo"]
      },
      { 
        text: "Simule um orgasmo olhando nos meus olhos.", 
        intensity: "selvagem", 
        relationshipType: null,
        type: "desafio",
        tags: ["orgasmo", "simulação"]
      },
      { 
        text: "Mostre como você gosta de ser tocado(a) nas suas partes íntimas.", 
        intensity: "selvagem", 
        relationshipType: null,
        type: "desafio",
        tags: ["demonstração", "toque"]
      },
      { 
        text: "Estimule meu corpo com a boca por onde eu escolher.", 
        intensity: "selvagem", 
        relationshipType: null,
        type: "desafio",
        tags: ["estímulo", "boca"]
      },
      { 
        text: "Fique completamente submisso(a) aos meus comandos por 3 minutos.", 
        intensity: "selvagem", 
        relationshipType: null,
        type: "desafio",
        tags: ["submissão", "comandos"]
      },
      { 
        text: "Use apenas a boca para me deixar excitado(a).", 
        intensity: "selvagem", 
        relationshipType: null,
        type: "desafio",
        tags: ["boca", "excitação"]
      },
      { 
        text: "Vamos fazer um 69 por 2 minutos.", 
        intensity: "selvagem", 
        relationshipType: null,
        type: "desafio",
        requiresPair: true,
        tags: ["69", "oral"]
      },
      { 
        text: "Me domine completamente contra a parede.", 
        intensity: "selvagem", 
        relationshipType: null,
        type: "desafio",
        tags: ["dominação", "parede"]
      },
      { 
        text: "Vamos tomar banho juntos e nos ensaboarmos mutuamente.", 
        intensity: "selvagem", 
        relationshipType: null,
        type: "desafio",
        requiresPair: true,
        tags: ["banho", "sabão"]
      },
      { 
        text: "Me masturbe enquanto olho nos seus olhos.", 
        intensity: "selvagem", 
        relationshipType: null,
        type: "desafio",
        tags: ["masturbação", "olhar"]
      },
      { 
        text: "Me deixe te dar prazer até você implorar para parar.", 
        intensity: "selvagem", 
        relationshipType: null,
        type: "desafio",
        tags: ["prazer", "limite"]
      },
      { 
        text: "Vamos praticar sexo oral mútuamente por 3 minutos.", 
        intensity: "selvagem", 
        relationshipType: null,
        type: "desafio",
        requiresPair: true,
        tags: ["oral", "mútuo"]
      },
      { 
        text: "Me provoque até eu implorar por mais.", 
        intensity: "selvagem", 
        relationshipType: null,
        type: "desafio",
        tags: ["provocação", "implorar"]
      },
      { 
        text: "Me diga sua fantasia sexual enquanto toca meu corpo.", 
        intensity: "selvagem", 
        relationshipType: null,
        type: "desafio",
        tags: ["fantasia", "toque"]
      },
      { 
        text: "Vamos fazer sexo em uma posição que nunca tentamos antes.", 
        intensity: "selvagem", 
        relationshipType: null,
        type: "desafio",
        requiresPair: true,
        tags: ["sexo", "nova posição"]
      },
      { 
        text: "Grave um áudio de gemido para me enviar depois.", 
        intensity: "selvagem", 
        relationshipType: null,
        type: "desafio",
        tags: ["áudio", "gemido"]
      },
      
      // Perguntas Selvagens
      { 
        text: "Qual foi a coisa mais selvagem que já fizemos juntos?", 
        intensity: "selvagem", 
        relationshipType: null,
        type: "pergunta",
        hasForbiddenVersion: true,
        forbiddenText: "Qual ato sexual mais selvagem que fizemos que você gostaria de repetir agora mesmo?",
        tags: ["experiência", "selvagem"]
      },
      { 
        text: "Você já fez algo ousado em público?", 
        intensity: "selvagem", 
        relationshipType: null,
        type: "pergunta",
        tags: ["público", "ousadia"]
      },
      { 
        text: "Prefere arranhões ou mordidas?", 
        intensity: "selvagem", 
        relationshipType: null,
        type: "pergunta",
        tags: ["preferência", "contato físico"]
      },
      { 
        text: "O que te excita mais: dominação ou submissão?", 
        intensity: "selvagem", 
        relationshipType: null,
        type: "pergunta",
        tags: ["dominação", "submissão"]
      },
      { 
        text: "O que você gostaria que eu sussurrasse no seu ouvido durante o sexo?", 
        intensity: "selvagem", 
        relationshipType: null,
        type: "pergunta",
        tags: ["sussurro", "sexo"]
      },
      { 
        text: "Qual é a sua fantasia mais selvagem que nunca teve coragem de compartilhar?", 
        intensity: "selvagem", 
        relationshipType: null,
        type: "pergunta",
        hasForbiddenVersion: true,
        forbiddenText: "Qual fetiche ou prática sexual mais tabu você gostaria de experimentar comigo?",
        tags: ["fantasia", "segredo"]
      },
      { 
        text: "O que você mais gosta na hora do sexo oral?", 
        intensity: "selvagem", 
        relationshipType: null,
        type: "pergunta",
        tags: ["oral", "preferência"]
      },
      { 
        text: "Qual a sua posição sexual favorita e por quê?", 
        intensity: "selvagem", 
        relationshipType: null,
        type: "pergunta",
        tags: ["posição", "favorita"]
      },
      { 
        text: "Qual a sua zona erógena mais sensível?", 
        intensity: "selvagem", 
        relationshipType: null,
        type: "pergunta",
        tags: ["zona erógena", "sensibilidade"]
      },
      { 
        text: "O que você pensa sobre usar brinquedos sexuais?", 
        intensity: "selvagem", 
        relationshipType: null,
        type: "pergunta",
        tags: ["brinquedos", "opinião"]
      },
      { 
        text: "Qual é o local mais ousado onde você gostaria de fazer sexo?", 
        intensity: "selvagem", 
        relationshipType: null,
        type: "pergunta",
        tags: ["local", "ousadia"]
      },
      { 
        text: "O que você mais gosta que eu faça durante o sexo?", 
        intensity: "selvagem", 
        relationshipType: null,
        type: "pergunta",
        tags: ["sexo", "preferência"]
      },
      { 
        text: "Qual é a coisa mais quente que alguém já te disse durante o sexo?", 
        intensity: "selvagem", 
        relationshipType: null,
        type: "pergunta",
        tags: ["fala", "sexo"]
      },
      { 
        text: "Você já teve um sonho erótico comigo? Como foi?", 
        intensity: "selvagem", 
        relationshipType: null,
        type: "pergunta",
        hasForbiddenVersion: true,
        forbiddenText: "Descreva detalhadamente o sonho sexual mais explícito que teve comigo.",
        tags: ["sonho", "erótico"]
      },
      { 
        text: "Quanto tempo você aguenta sem gozar quando está muito excitado(a)?", 
        intensity: "selvagem", 
        relationshipType: null,
        type: "pergunta",
        tags: ["orgasmo", "controle"]
      },
      { 
        text: "Você prefere sexo rápido e intenso ou lento e prolongado?", 
        intensity: "selvagem", 
        relationshipType: null,
        type: "pergunta",
        tags: ["ritmo", "preferência"]
      },
      { 
        text: "O que você gostaria que eu fizesse para te surpreender na cama?", 
        intensity: "selvagem", 
        relationshipType: null,
        type: "pergunta",
        tags: ["surpresa", "cama"]
      },
      { 
        text: "Você gosta de dirty talk? Que tipo de coisas gosta de ouvir?", 
        intensity: "selvagem", 
        relationshipType: null,
        type: "pergunta",
        tags: ["dirty talk", "preferência"]
      },
      { 
        text: "Qual foi a experiência sexual mais intensa que você já teve?", 
        intensity: "selvagem", 
        relationshipType: null,
        type: "pergunta",
        hasForbiddenVersion: true,
        forbiddenText: "Qual foi a transa mais selvagem da sua vida e o que fez ela ser tão especial?",
        tags: ["experiência", "intensidade"]
      },
      { 
        text: "O que você faria se acordasse e eu estivesse te provocando sexualmente?", 
        intensity: "selvagem", 
        relationshipType: null,
        type: "pergunta",
        tags: ["provocação", "reação"]
      }
    ];
    
    // Extremo challenges
    const extremoChallenges = [
      // Desafios Extremos
      { 
        text: "Façam sexo na posição mais desafiadora que conseguirem pensar.", 
        intensity: "extremo", 
        relationshipType: null,
        type: "desafio",
        requiresPair: true,
        tags: ["posição", "desafio"]
      },
      { 
        text: "Interpretem um papel durante o sexo (professor/aluno, médico/paciente, etc).", 
        intensity: "extremo", 
        relationshipType: null,
        type: "desafio",
        requiresPair: true,
        tags: ["roleplay", "fantasia"]
      },
      { 
        text: "Tentem alcançar o orgasmo simultaneamente.", 
        intensity: "extremo", 
        relationshipType: null,
        type: "desafio",
        requiresPair: true,
        tags: ["orgasmo", "simultâneo"]
      },
      { 
        text: "Façam sexo selvagem sem limites por 10 minutos.", 
        intensity: "extremo", 
        relationshipType: null,
        type: "desafio",
        requiresPair: true,
        tags: ["selvagem", "sem limites"]
      },
      { 
        text: "Use um brinquedo sexual no seu parceiro(a) até que ele(a) atinja o orgasmo.", 
        intensity: "extremo", 
        relationshipType: null,
        type: "desafio",
        tags: ["brinquedo", "orgasmo"]
      },
      { 
        text: "Deixe-me vendar você por 2 minutos e faça o que eu quiser.", 
        intensity: "extremo", 
        relationshipType: null,
        type: "desafio",
        tags: ["venda", "controle"]
      },
      { 
        text: "Faça um strip-tease completo sem rir.", 
        intensity: "extremo", 
        relationshipType: null,
        type: "desafio",
        tags: ["strip", "nudez"]
      },
      { 
        text: "Lamba uma parte proibida do meu corpo.", 
        intensity: "extremo", 
        relationshipType: null,
        type: "desafio",
        tags: ["língua", "corpo"]
      },
      { 
        text: "Realize uma fantasia que eu sempre tive, sem questionar.", 
        intensity: "extremo", 
        relationshipType: null,
        type: "desafio",
        tags: ["fantasia", "submissão"]
      },
      { 
        text: "Pratique sexo oral em mim até eu atingir o clímax.", 
        intensity: "extremo", 
        relationshipType: null,
        type: "desafio",
        tags: ["oral", "clímax"]
      },
      { 
        text: "Permita que eu te penetre em uma posição que nunca experimentamos antes.", 
        intensity: "extremo", 
        relationshipType: null,
        type: "desafio",
        requiresPair: true,
        tags: ["penetração", "novidade"]
      },
      { 
        text: "Realize o papel de ser completamente dominado(a) por mim durante 5 minutos.", 
        intensity: "extremo", 
        relationshipType: null,
        type: "desafio",
        tags: ["dominação", "papel"]
      },
      { 
        text: "Fique de quatro e deixe que eu te estimule por trás.", 
        intensity: "extremo", 
        relationshipType: null,
        type: "desafio",
        tags: ["quatro", "por trás"]
      },
      { 
        text: "Deixe que eu te amarre e te provoque sem você poder se mover.", 
        intensity: "extremo", 
        relationshipType: null,
        type: "desafio",
        tags: ["amarrar", "provocação"]
      },
      { 
        text: "Façamos sexo na frente de um espelho.", 
        intensity: "extremo", 
        relationshipType: null,
        type: "desafio",
        requiresPair: true,
        tags: ["espelho", "visual"]
      },
      { 
        text: "Vamos gravar um vídeo íntimo (só para nós) por 1 minuto.", 
        intensity: "extremo", 
        relationshipType: null,
        type: "desafio",
        requiresPair: true,
        tags: ["vídeo", "íntimo"]
      },
      { 
        text: "Deixe que eu use gelo e calor alternadamente no seu corpo nu.", 
        intensity: "extremo", 
        relationshipType: null,
        type: "desafio",
        tags: ["gelo", "calor"]
      },
      { 
        text: "Pratique sexo anal comigo.", 
        intensity: "extremo", 
        relationshipType: null,
        type: "desafio",
        requiresPair: true,
        tags: ["anal", "penetração"]
      },
      { 
        text: "Masturbe-se completamente na minha frente enquanto eu assisto.", 
        intensity: "extremo", 
        relationshipType: null,
        type: "desafio",
        tags: ["masturbação", "exibição"]
      },
      { 
        text: "Usemos um objeto da casa como um brinquedo sexual improvisado.", 
        intensity: "extremo", 
        relationshipType: null,
        type: "desafio",
        tags: ["objeto", "improviso"]
      },
      { 
        text: "Vamos ter uma noite de sexo sem nenhuma limitação ou tabu.", 
        intensity: "extremo", 
        relationshipType: null,
        type: "desafio",
        requiresPair: true,
        tags: ["sem limites", "tabu"]
      },
      { 
        text: "Reencene comigo a cena mais erótica que já viu em um filme.", 
        intensity: "extremo", 
        relationshipType: null,
        type: "desafio",
        tags: ["filme", "cena"]
      },
      { 
        text: "Tente me dar múltiplos orgasmos, um atrás do outro.", 
        intensity: "extremo", 
        relationshipType: null,
        type: "desafio",
        tags: ["múltiplos", "orgasmos"]
      },
      { 
        text: "Vamos fazer sexo em uma posição que exige extrema flexibilidade.", 
        intensity: "extremo", 
        relationshipType: null,
        type: "desafio",
        requiresPair: true,
        tags: ["posição", "flexibilidade"]
      },
      { 
        text: "Deixe que eu use um vibrador em você enquanto fazemos sexo.", 
        intensity: "extremo", 
        relationshipType: null,
        type: "desafio",
        requiresPair: true,
        tags: ["vibrador", "combinação"]
      },
      
      // Perguntas Extremas
      { 
        text: "Qual foi o lugar mais proibido onde já fez algo?", 
        intensity: "extremo", 
        relationshipType: null,
        type: "pergunta",
        hasForbiddenVersion: true,
        forbiddenText: "Descreva em detalhes a experiência sexual mais arriscada que já teve em um lugar público.",
        tags: ["local", "risco"]
      },
      { 
        text: "Você toparia um desafio sem saber o que é antes?", 
        intensity: "extremo", 
        relationshipType: null,
        type: "pergunta",
        tags: ["desafio", "confiança"]
      },
      { 
        text: "Qual é a sua fantasia mais proibida?", 
        intensity: "extremo", 
        relationshipType: null,
        type: "pergunta",
        hasForbiddenVersion: true,
        forbiddenText: "Descreva em detalhes sua fantasia sexual mais proibida, sem omitir nenhum detalhe sórdido.",
        tags: ["fantasia", "proibido"]
      },
      { 
        text: "Você toparia ficar vendado(a) enquanto eu te surpreendo?", 
        intensity: "extremo", 
        relationshipType: null,
        type: "pergunta",
        tags: ["venda", "surpresa"]
      },
      { 
        text: "Quais são os seus limites sexuais absolutos?", 
        intensity: "extremo", 
        relationshipType: null,
        type: "pergunta",
        tags: ["limites", "absolutos"]
      },
      { 
        text: "O que você acha de sexo a três?", 
        intensity: "extremo", 
        relationshipType: null,
        type: "pergunta",
        tags: ["ménage", "opinião"]
      },
      { 
        text: "Você já praticou BDSM? O que achou?", 
        intensity: "extremo", 
        relationshipType: null,
        type: "pergunta",
        tags: ["BDSM", "experiência"]
      },
      { 
        text: "Como você se sentiria se eu te filmasse durante o sexo só para nós?", 
        intensity: "extremo", 
        relationshipType: null,
        type: "pergunta",
        tags: ["filmagem", "opinião"]
      },
      { 
        text: "Qual é seu maior fetiche sexual que nunca teve coragem de realizar?", 
        intensity: "extremo", 
        relationshipType: null,
        type: "pergunta",
        hasForbiddenVersion: true,
        forbiddenText: "Descreva em detalhes seu fetiche sexual mais extremo que nunca compartilhou com ninguém.",
        tags: ["fetiche", "secreto"]
      },
      { 
        text: "Você já teve fantasias com alguém que não deveria?", 
        intensity: "extremo", 
        relationshipType: null,
        type: "pergunta",
        hasForbiddenVersion: true,
        forbiddenText: "Conte sobre a pessoa proibida com quem você mais fantasiou sexualmente e o que imaginou fazer.",
        tags: ["proibido", "fantasia"]
      },
      { 
        text: "Qual é a coisa mais selvagem que você já fez sexualmente?", 
        intensity: "extremo", 
        relationshipType: null,
        type: "pergunta",
        hasForbiddenVersion: true,
        forbiddenText: "Descreva detalhadamente a experiência sexual mais selvagem, intensa e possivelmente tabu que já teve.",
        tags: ["selvagem", "experiência"]
      },
      { 
        text: "Você toparia passar um dia inteiro nu(a) em casa comigo?", 
        intensity: "extremo", 
        relationshipType: null,
        type: "pergunta",
        tags: ["nudez", "dia"]
      },
      { 
        text: "Qual tipo de pornografia você costuma assistir?", 
        intensity: "extremo", 
        relationshipType: null,
        type: "pergunta",
        hasForbiddenVersion: true,
        forbiddenText: "Qual categoria ou tema de pornografia mais te excita, mesmo que seja considerada tabu?",
        tags: ["pornografia", "preferência"]
      },
      { 
        text: "O que você acha de usar brinquedos sexuais mais intensos?", 
        intensity: "extremo", 
        relationshipType: null,
        type: "pergunta",
        tags: ["brinquedos", "intensos"]
      },
      { 
        text: "Você gostaria de experimentar sexo anal?", 
        intensity: "extremo", 
        relationshipType: null,
        type: "pergunta",
        tags: ["anal", "opinião"]
      },
      { 
        text: "Qual é a sua fantasia sexual que envolve um local público?", 
        intensity: "extremo", 
        relationshipType: null,
        type: "pergunta",
        hasForbiddenVersion: true,
        forbiddenText: "Descreva em detalhes como seria fazer sexo no local público mais arriscado que você já fantasiou.",
        tags: ["público", "fantasia"]
      },
      { 
        text: "Você já teve um orgasmo tão intenso que perdeu o controle?", 
        intensity: "extremo", 
        relationshipType: null,
        type: "pergunta",
        hasForbiddenVersion: true,
        forbiddenText: "Descreva o orgasmo mais intenso que já teve, incluindo o que estava acontecendo e como você reagiu.",
        tags: ["orgasmo", "intenso"]
      },
      { 
        text: "Qual é a maior quantidade de orgasmos que você já teve em um dia?", 
        intensity: "extremo", 
        relationshipType: null,
        type: "pergunta",
        tags: ["orgasmos", "quantidade"]
      },
      { 
        text: "O que você faria se tivéssemos apenas 24 horas juntos sem regras?", 
        intensity: "extremo", 
        relationshipType: null,
        type: "pergunta",
        hasForbiddenVersion: true,
        forbiddenText: "Se tivéssemos 24 horas sem limites, descreva todos os atos sexuais que você gostaria de realizar comigo.",
        tags: ["sem regras", "24 horas"]
      }
    ];
    
    // Perguntas e prêmios
    const perguntasEPremios = [
      // Perguntas para Roleta
      {
        text: "Qual é sua maior fantasia sexual que nunca realizou?",
        intensity: "picante",
        relationshipType: null,
        type: "pergunta",
        hasForbiddenVersion: true,
        forbiddenText: "Conte sua fantasia mais obscura, aquela que nunca teve coragem de compartilhar com ninguém.",
        tags: ["fantasia", "confissão"]
      },
      {
        text: "Se você pudesse me ver usando apenas uma peça de roupa, qual seria?",
        intensity: "picante",
        relationshipType: null,
        type: "pergunta",
        tags: ["roupa", "fantasia"]
      },
      {
        text: "O que mais te excita em mim?",
        intensity: "picante",
        relationshipType: null,
        type: "pergunta",
        tags: ["excitação", "atração"]
      },
      {
        text: "Você prefere me ver vestido(a) sensualmente ou completamente nu(a)?",
        intensity: "picante",
        relationshipType: null,
        type: "pergunta",
        tags: ["nudez", "preferência"]
      },
      {
        text: "Qual foi o momento mais excitante que já vivemos juntos?",
        intensity: "selvagem",
        relationshipType: null,
        type: "pergunta",
        hasForbiddenVersion: true,
        forbiddenText: "Descreva em detalhes nossa transa mais selvagem e o que a tornou inesquecível.",
        tags: ["memória", "excitação"]
      },
      
      // Prêmios para Roleta
      {
        text: "Seu parceiro deve lhe fazer uma massagem erótica por 5 minutos.",
        intensity: "picante",
        relationshipType: null,
        type: "premio",
        tags: ["massagem", "erótica"]
      },
      {
        text: "Escolha qualquer desafio para seu parceiro(a) fazer.",
        intensity: "picante",
        relationshipType: null,
        type: "premio",
        tags: ["escolha", "poder"]
      },
      {
        text: "Seu parceiro deve te dar 5 beijos onde você quiser.",
        intensity: "selvagem",
        relationshipType: null,
        type: "premio",
        tags: ["beijos", "escolha"]
      },
      {
        text: "Seu parceiro(a) deve fazer algo que você sempre quis experimentar.",
        intensity: "selvagem",
        relationshipType: null,
        type: "premio",
        tags: ["experimentar", "desejo"]
      },
      {
        text: "Seu parceiro(a) deve te servir como um escravo sensual por 5 minutos.",
        intensity: "extremo",
        relationshipType: null,
        type: "premio",
        tags: ["submissão", "servidão"]
      },
      {
        text: "Seu parceiro(a) deve usar a língua onde você quiser por 2 minutos.",
        intensity: "extremo",
        relationshipType: null,
        type: "premio",
        tags: ["língua", "prazer"]
      },
      {
        text: "Seu parceiro(a) deve fazer um strip completo para você.",
        intensity: "picante",
        relationshipType: null,
        type: "premio",
        tags: ["strip", "visual"]
      },
      {
        text: "Ganhe o direito de escolher a próxima posição sexual.",
        intensity: "selvagem",
        relationshipType: null,
        type: "premio",
        tags: ["posição", "escolha"]
      },
      
      // Penalidades para Roleta
      {
        text: "Tire duas peças de roupa.",
        intensity: "picante",
        relationshipType: null,
        type: "penalidade",
        tags: ["roupa", "desvestir"]
      },
      {
        text: "Permita que seu parceiro(a) faça uma marca de chupão onde quiser.",
        intensity: "selvagem",
        relationshipType: null,
        type: "penalidade",
        tags: ["marca", "escolha"]
      },
      {
        text: "Mostre para seu parceiro(a) a posição sexual que você mais gosta.",
        intensity: "selvagem",
        relationshipType: null,
        type: "penalidade",
        tags: ["posição", "demonstração"]
      },
      {
        text: "Fique completamente nu(a) pelo resto do jogo.",
        intensity: "extremo",
        relationshipType: null,
        type: "penalidade",
        tags: ["nudez", "exposição"]
      },
      {
        text: "Deixe seu parceiro(a) te dar um tapa onde ele(a) quiser.",
        intensity: "selvagem",
        relationshipType: null,
        type: "penalidade",
        tags: ["tapa", "domínio"]
      },
      {
        text: "Beba um shot de bebida alcoólica do corpo do seu parceiro(a).",
        intensity: "picante",
        relationshipType: null,
        type: "penalidade",
        tags: ["bebida", "corpo"]
      },
      {
        text: "Fique em uma posição erótica de escolha do seu parceiro(a) por 1 minuto.",
        intensity: "picante",
        relationshipType: null,
        type: "penalidade",
        tags: ["posição", "tempo"]
      },
      {
        text: "Seu parceiro(a) pode te provocar sem você poder tocá-lo(a) por 3 minutos.",
        intensity: "selvagem",
        relationshipType: null,
        type: "penalidade",
        tags: ["provocação", "controle"]
      },
      {
        text: "Deixe seu parceiro(a) te amarrar por 5 minutos.",
        intensity: "extremo",
        relationshipType: null,
        type: "penalidade",
        tags: ["amarrar", "submissão"]
      }
    ];
    
    // Hétero specific challenges
    const heteroChallenges = [
      // Desafios Hetero Suaves
      { 
        text: "Homem: beije o pescoço da sua parceira enquanto acaricia suas costas.", 
        intensity: "suave", 
        relationshipType: "hetero",
        type: "desafio",
        tags: ["beijo", "pescoço", "carícia"]
      },
      { 
        text: "Mulher: sente no colo do seu parceiro de frente para ele e acaricie seus cabelos.", 
        intensity: "suave", 
        relationshipType: "hetero",
        type: "desafio",
        tags: ["colo", "carícia", "contato"]
      },
      { 
        text: "Homem: desenhe corações com o dedo nas costas da sua parceira.", 
        intensity: "suave", 
        relationshipType: "hetero",
        type: "desafio",
        tags: ["desenho", "carinho", "costas"]
      },
      { 
        text: "Mulher: dê beijos leves pelo rosto do seu parceiro durante 30 segundos.", 
        intensity: "suave", 
        relationshipType: "hetero",
        type: "desafio",
        tags: ["beijos", "rosto", "suave"]
      },
      
      // Desafios Hetero Picantes
      { 
        text: "Homem: estimule o clitóris de sua parceira até que ela peça para parar.", 
        intensity: "picante", 
        relationshipType: "hetero",
        type: "desafio",
        tags: ["estimulação", "mulher"]
      },
      { 
        text: "Mulher: provoque seu parceiro com movimentos de quadril sem tocá-lo.", 
        intensity: "picante", 
        relationshipType: "hetero",
        type: "desafio",
        tags: ["provocação", "quadril"]
      },
      { 
        text: "Homem: tire a blusa da sua parceira usando apenas a boca.", 
        intensity: "picante", 
        relationshipType: "hetero",
        type: "desafio",
        tags: ["blusa", "boca", "desafio"]
      },
      { 
        text: "Mulher: coloque as mãos do seu parceiro onde você mais gosta de ser tocada.", 
        intensity: "picante", 
        relationshipType: "hetero",
        type: "desafio",
        tags: ["mãos", "toque", "preferência"]
      },
      { 
        text: "Homem: beije o corpo da sua parceira do pescoço até o umbigo.", 
        intensity: "picante", 
        relationshipType: "hetero",
        type: "desafio",
        tags: ["beijos", "corpo", "trajetória"]
      },
      
      // Desafios Hetero Selvagens
      { 
        text: "Mulher: faça sexo oral em seu parceiro por 2 minutos.", 
        intensity: "selvagem", 
        relationshipType: "hetero",
        type: "desafio",
        tags: ["oral", "homem"]
      },
      { 
        text: "Homem: use apenas sua língua para excitar sua parceira por 3 minutos.", 
        intensity: "selvagem", 
        relationshipType: "hetero",
        type: "desafio",
        tags: ["língua", "excitação"]
      },
      { 
        text: "Mulher: masturbe seu parceiro enquanto beija o pescoço dele.", 
        intensity: "selvagem", 
        relationshipType: "hetero",
        type: "desafio",
        tags: ["masturbação", "beijo", "pescoço"]
      },
      { 
        text: "Homem: coloque os seios da sua parceira na boca e use a língua para estimulá-los.", 
        intensity: "selvagem", 
        relationshipType: "hetero",
        type: "desafio",
        tags: ["seios", "língua", "estímulo"]
      },
      { 
        text: "Mulher: fique de quatro e deixe seu parceiro te tocar por trás.", 
        intensity: "selvagem", 
        relationshipType: "hetero",
        type: "desafio",
        tags: ["quatro", "toque", "posição"]
      },
      
      // Desafios Hetero Extremos
      { 
        text: "Façam sexo na posição favorita dela, depois na favorita dele.", 
        intensity: "extremo", 
        relationshipType: "hetero",
        type: "desafio",
        requiresPair: true,
        tags: ["sexo", "posições", "favoritas"]
      },
      { 
        text: "Mulher: sente sobre o seu parceiro e controle o ritmo até que ele quase atinja o orgasmo.", 
        intensity: "extremo", 
        relationshipType: "hetero",
        type: "desafio",
        tags: ["controle", "cavalgada", "edging"]
      },
      { 
        text: "Homem: estimule o ponto G da sua parceira até que ela tenha um orgasmo intenso.", 
        intensity: "extremo", 
        relationshipType: "hetero",
        type: "desafio",
        tags: ["ponto G", "orgasmo", "estímulo"]
      },
      { 
        text: "Tentem a posição 69 e vejam quem consegue fazer o outro gozar primeiro.", 
        intensity: "extremo", 
        relationshipType: "hetero",
        type: "desafio",
        requiresPair: true,
        tags: ["69", "competição", "orgasmo"]
      }
    ];
    
    // Gay specific challenges
    const gayChallenges = [
      // Desafios Gay Suaves
      { 
        text: "Acariciem o rosto um do outro enquanto se olham nos olhos por 1 minuto.", 
        intensity: "suave", 
        relationshipType: "gay",
        type: "desafio",
        requiresPair: true,
        tags: ["carinho", "olhar", "conexão"]
      },
      { 
        text: "Façam uma massagem nos ombros um do outro por 1 minuto cada.", 
        intensity: "suave", 
        relationshipType: "gay",
        type: "desafio",
        requiresPair: true,
        tags: ["massagem", "ombros", "relaxamento"]
      },
      { 
        text: "Acaricie o cabelo do seu parceiro enquanto ele descansa a cabeça no seu colo.", 
        intensity: "suave", 
        relationshipType: "gay",
        type: "desafio",
        tags: ["carinho", "cabelo", "colo"]
      },
      { 
        text: "Troquem beijos suaves pelo rosto um do outro.", 
        intensity: "suave", 
        relationshipType: "gay",
        type: "desafio",
        requiresPair: true,
        tags: ["beijos", "rosto", "carinho"]
      },
      
      // Desafios Gay Picantes
      { 
        text: "Descubram quem consegue fazer o outro gemer mais alto.", 
        intensity: "picante", 
        relationshipType: "gay",
        type: "desafio",
        requiresPair: true,
        tags: ["gemido", "competição"]
      },
      { 
        text: "Massageiem o corpo um do outro explorando os pontos mais sensíveis.", 
        intensity: "picante", 
        relationshipType: "gay",
        type: "desafio",
        requiresPair: true,
        tags: ["massagem", "sensibilidade"]
      },
      { 
        text: "Beijem-se intensamente enquanto tocam o corpo um do outro.", 
        intensity: "picante", 
        relationshipType: "gay",
        type: "desafio",
        requiresPair: true,
        tags: ["beijo", "toque", "corpo"]
      },
      { 
        text: "Tirem uma peça de roupa um do outro usando apenas a boca.", 
        intensity: "picante", 
        relationshipType: "gay",
        type: "desafio",
        requiresPair: true,
        tags: ["roupa", "boca", "desafio"]
      },
      { 
        text: "Façam uma dança sensual um para o outro.", 
        intensity: "picante", 
        relationshipType: "gay",
        type: "desafio",
        requiresPair: true,
        tags: ["dança", "sensual", "provocação"]
      },
      
      // Desafios Gay Selvagens
      { 
        text: "Decidam quem será o ativo e o passivo nesta rodada.", 
        intensity: "selvagem", 
        relationshipType: "gay",
        type: "desafio",
        requiresPair: true,
        tags: ["papéis", "posição"]
      },
      { 
        text: "Façam sexo oral um no outro simultaneamente.", 
        intensity: "selvagem", 
        relationshipType: "gay",
        type: "desafio",
        requiresPair: true,
        tags: ["oral", "simultâneo", "69"]
      },
      { 
        text: "Estimulem apenas o pênis um do outro por 3 minutos.", 
        intensity: "selvagem", 
        relationshipType: "gay",
        type: "desafio",
        requiresPair: true,
        tags: ["estimulação", "pênis", "prazer"]
      },
      { 
        text: "Um deve ficar de quatro enquanto o outro beija suas costas e nádegas.", 
        intensity: "selvagem", 
        relationshipType: "gay",
        type: "desafio",
        requiresPair: true,
        tags: ["quatro", "beijos", "nádegas"]
      },
      { 
        text: "Provoquem um ao outro até que os dois estejam completamente excitados.", 
        intensity: "selvagem", 
        relationshipType: "gay",
        type: "desafio",
        requiresPair: true,
        tags: ["provocação", "excitação", "mútuo"]
      },
      
      // Desafios Gay Extremos
      { 
        text: "Estimulem-se mutuamente até chegarem próximos ao orgasmo, mas sem atingi-lo.", 
        intensity: "extremo", 
        relationshipType: "gay",
        type: "desafio",
        requiresPair: true,
        tags: ["provocação", "controle"]
      },
      { 
        text: "Tentem alcançar o orgasmo simultaneamente.", 
        intensity: "extremo", 
        relationshipType: "gay",
        type: "desafio",
        requiresPair: true,
        tags: ["orgasmo", "simultâneo", "sincronia"]
      },
      { 
        text: "Um deve dominar completamente o outro durante 5 minutos.", 
        intensity: "extremo", 
        relationshipType: "gay",
        type: "desafio",
        requiresPair: true,
        tags: ["dominação", "submissão", "controle"]
      },
      { 
        text: "Usem um brinquedo sexual um no outro até o limite do prazer.", 
        intensity: "extremo", 
        relationshipType: "gay",
        type: "desafio",
        requiresPair: true,
        tags: ["brinquedo", "prazer", "limite"]
      }
    ];
    
    // Lésbico specific challenges
    const lesbicoChallenges = [
      // Desafios Lésbicos Suaves
      { 
        text: "Acariciem os cabelos uma da outra por 1 minuto.", 
        intensity: "suave", 
        relationshipType: "lesbico",
        type: "desafio",
        requiresPair: true,
        tags: ["carinho", "cabelo", "suave"]
      },
      { 
        text: "Massageiem os ombros uma da outra por 2 minutos.", 
        intensity: "suave", 
        relationshipType: "lesbico",
        type: "desafio",
        requiresPair: true,
        tags: ["massagem", "ombros", "relaxamento"]
      },
      { 
        text: "Olhem-se nos olhos e digam três qualidades que admiram uma na outra.", 
        intensity: "suave", 
        relationshipType: "lesbico",
        type: "desafio",
        requiresPair: true,
        tags: ["olhar", "admiração", "conexão"]
      },
      { 
        text: "Dançem abraçadas uma música lenta.", 
        intensity: "suave", 
        relationshipType: "lesbico",
        type: "desafio",
        requiresPair: true,
        tags: ["dança", "abraço", "música"]
      },
      
      // Desafios Lésbicos Picantes
      { 
        text: "Estimulem-se mutuamente com as mãos por 3 minutos.", 
        intensity: "picante", 
        relationshipType: "lesbico",
        type: "desafio",
        requiresPair: true,
        tags: ["estimulação", "mãos"]
      },
      { 
        text: "Cada uma deve tentar fazer a outra gemer apenas usando leves toques.", 
        intensity: "picante", 
        relationshipType: "lesbico",
        type: "desafio",
        requiresPair: true,
        tags: ["gemido", "toques"]
      },
      { 
        text: "Beijem os seios uma da outra por 1 minuto.", 
        intensity: "picante", 
        relationshipType: "lesbico",
        type: "desafio",
        requiresPair: true,
        tags: ["beijo", "seios", "prazer"]
      },
      { 
        text: "Uma deve sentar no colo da outra e se movimentar sensualmente.", 
        intensity: "picante", 
        relationshipType: "lesbico",
        type: "desafio",
        requiresPair: true,
        tags: ["colo", "movimento", "sensual"]
      },
      { 
        text: "Tirem uma peça de roupa uma da outra usando apenas a boca.", 
        intensity: "picante", 
        relationshipType: "lesbico",
        type: "desafio",
        requiresPair: true,
        tags: ["roupa", "boca", "desafio"]
      },
      
      // Desafios Lésbicos Selvagens
      { 
        text: "Use um vibrador na sua parceira até que ela alcance o orgasmo.", 
        intensity: "selvagem", 
        relationshipType: "lesbico",
        type: "desafio",
        tags: ["vibrador", "orgasmo"]
      },
      { 
        text: "Explore o corpo de sua parceira apenas com a língua por 2 minutos.", 
        intensity: "selvagem", 
        relationshipType: "lesbico",
        type: "desafio",
        tags: ["língua", "exploração"]
      },
      { 
        text: "Estimulem o clitóris uma da outra simultaneamente.", 
        intensity: "selvagem", 
        relationshipType: "lesbico",
        type: "desafio",
        requiresPair: true,
        tags: ["clitóris", "estimulação", "mútuo"]
      },
      { 
        text: "Façam sexo oral uma na outra na posição 69.", 
        intensity: "selvagem", 
        relationshipType: "lesbico",
        type: "desafio",
        requiresPair: true,
        tags: ["oral", "69", "mútuo"]
      },
      { 
        text: "Uma deve deitar e a outra deve beijar todo seu corpo, de cima a baixo.", 
        intensity: "selvagem", 
        relationshipType: "lesbico",
        type: "desafio",
        requiresPair: true,
        tags: ["beijos", "corpo", "exploração"]
      },
      
      // Desafios Lésbicos Extremos
      { 
        text: "Usem um brinquedo sexual uma na outra até o clímax.", 
        intensity: "extremo", 
        relationshipType: "lesbico",
        type: "desafio",
        requiresPair: true,
        tags: ["brinquedo", "clímax", "intenso"]
      },
      { 
        text: "Façam tribadismo (roçar os clitóris) até que uma de vocês atinja o orgasmo.", 
        intensity: "extremo", 
        relationshipType: "lesbico",
        type: "desafio",
        requiresPair: true,
        tags: ["tribadismo", "orgasmo", "contato"]
      },
      { 
        text: "Determinem quem será dominante e quem será submissa por 5 minutos.", 
        intensity: "extremo", 
        relationshipType: "lesbico",
        type: "desafio",
        requiresPair: true,
        tags: ["dominação", "submissão", "papéis"]
      },
      { 
        text: "Usem um consolo duplo juntas.", 
        intensity: "extremo", 
        relationshipType: "lesbico",
        type: "desafio",
        requiresPair: true,
        tags: ["consolo", "duplo", "penetração"]
      }
    ];
    
    // Add all challenges
    const allChallenges = [
      ...suaveChallenges, 
      ...picanteChallenges, 
      ...selvagemChallenges, 
      ...extremoChallenges,
      ...perguntasEPremios,
      ...heteroChallenges,
      ...gayChallenges,
      ...lesbicoChallenges
    ];
    
    allChallenges.forEach(challenge => {
      this.createChallenge(challenge);
    });
  }
}

export const storage = new MemStorage();
