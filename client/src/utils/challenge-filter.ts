import { CategoryType } from "@/components/category-card";
import { GameChallenge } from "@/data/challenges";
import { SexualOrientation } from "@/types/player";

interface SimplePlayer {
  id: string;
  name: string;
  orientation: SexualOrientation;
}

/**
 * Filtra e adapta desafios e perguntas com base na orientação sexual dos jogadores
 * @param challenges Lista original de desafios/perguntas
 * @param players Lista de jogadores no jogo
 * @param category Categoria de intensidade
 * @returns Lista filtrada e adaptada de desafios/perguntas
 */
export function filterChallengesByOrientation(
  challenges: GameChallenge[],
  players: SimplePlayer[],
  category: CategoryType
): GameChallenge[] {
  // Se há apenas jogadores heterossexuais, retorna os desafios originais
  if (players.every(p => p.orientation === "hetero")) {
    return challenges;
  }
  
  // Se há apenas jogadores homossexuais, adapta os textos
  if (players.every(p => p.orientation === "homo")) {
    return challenges.map(challenge => ({
      ...challenge,
      description: adaptTextForHomo(challenge.description, players)
    }));
  }
  
  // Para mix de orientações (bi ou outro), adapta para ser mais inclusivo
  return challenges.map(challenge => ({
    ...challenge,
    description: adaptTextForMixed(challenge.description)
  }));
}

/**
 * Adapta o texto para um contexto heterossexual (homem/mulher)
 */
function adaptTextForHetero(text: string): string {
  // Textos para contexto heterossexual geralmente já estão adaptados por padrão
  return text;
}

/**
 * Adapta o texto para um contexto homossexual
 */
function adaptTextForHomo(text: string, players: SimplePlayer[]): string {
  // Substitui referências a "pessoa do sexo oposto" ou similares
  let adaptedText = text
    .replace(/do sexo oposto/gi, "do mesmo sexo")
    .replace(/pessoa do outro sexo/gi, "pessoa do mesmo sexo")
    .replace(/parceiro\(a\)/gi, "parceiro")
    .replace(/parceira/gi, "parceiro")
    .replace(/pessoa que você escolher/gi, "pessoa que você escolher");
    
  return adaptedText;
}

/**
 * Adapta o texto para um contexto misto (bissexual ou outros)
 */
function adaptTextForMixed(text: string): string {
  // Torna o texto mais neutro em termos de gênero e orientação
  let adaptedText = text
    .replace(/do sexo oposto/gi, "de sua escolha")
    .replace(/pessoa do outro sexo/gi, "pessoa de sua escolha")
    .replace(/parceiro\(a\)/gi, "parceiro(a)")
    .replace(/pessoa que você escolher/gi, "pessoa que você escolher");
    
  return adaptedText;
}

/**
 * Seleciona jogadores para interagir com base nas orientações sexuais
 */
export function selectPlayersForInteraction(
  player: SimplePlayer,
  allPlayers: SimplePlayer[],
  count: number = 1
): SimplePlayer[] {
  let compatiblePlayers: SimplePlayer[] = [];
  
  // Lógica de compatibilidade baseada na orientação sexual
  switch (player.orientation) {
    case "hetero":
      // Seleciona jogadores com orientação compatível (hetero ou bi do sexo oposto)
      compatiblePlayers = allPlayers.filter(p => 
        p.id !== player.id && (p.orientation === "hetero" || p.orientation === "bi")
      );
      break;
      
    case "homo":
      // Seleciona jogadores com orientação compatível (homo ou bi do mesmo sexo)
      compatiblePlayers = allPlayers.filter(p => 
        p.id !== player.id && (p.orientation === "homo" || p.orientation === "bi")
      );
      break;
      
    case "bi":
      // Bisexual pode interagir com qualquer orientação que seja compatível
      compatiblePlayers = allPlayers.filter(p => 
        p.id !== player.id && (
          (p.orientation === "hetero") || 
          (p.orientation === "homo") || 
          (p.orientation === "bi")
        )
      );
      break;
      
    case "outro":
      // Para "outro", considere todos compatíveis
      compatiblePlayers = allPlayers.filter(p => p.id !== player.id);
      break;
  }
  
  // Se não houver jogadores compatíveis suficientes, retorna todos os jogadores exceto o próprio
  if (compatiblePlayers.length < count) {
    compatiblePlayers = allPlayers.filter(p => p.id !== player.id);
  }
  
  // Embaralha e retorna o número solicitado
  return shuffleArray(compatiblePlayers).slice(0, count);
}

// Função auxiliar para embaralhar array
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}