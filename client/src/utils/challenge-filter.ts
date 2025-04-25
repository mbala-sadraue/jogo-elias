import { SexualOrientation } from "@/types/player";
import { CategoryType } from "@/components/category-card";
import { GameChallenge } from "@/data/challenges";

// Interface para jogador simplificada
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
  // Se não tiver jogadores com orientação definida, retorna os desafios originais
  if (!players || players.length === 0) {
    return challenges;
  }

  const orientations = players.map(p => p.orientation);
  
  // Se todos os jogadores são heterossexuais
  const allHetero = orientations.every(o => o === 'hetero');
  
  // Se todos os jogadores são homossexuais
  const allHomo = orientations.every(o => o === 'homo');
  
  // Se existe pelo menos um bissexual ou outro
  const hasBiOrOther = orientations.some(o => o === 'bi' || o === 'outro');

  return challenges.map(challenge => {
    // Cria uma cópia do desafio que pode ser modificada
    let adaptedChallenge = { ...challenge };
    
    // Adaptação do texto baseado nas orientações sexuais
    if (allHetero) {
      // Mantém o desafio original, pois provavelmente já é voltado para heterossexuais
      adaptedChallenge.description = adaptTextForHetero(challenge.description);
    } else if (allHomo) {
      // Adapta para contexto homossexual
      adaptedChallenge.description = adaptTextForHomo(challenge.description, players);
    } else if (hasBiOrOther) {
      // Adapta para contexto misto
      adaptedChallenge.description = adaptTextForMixed(challenge.description);
    }
    
    return adaptedChallenge;
  });
}

/**
 * Adapta o texto para um contexto heterossexual (homem/mulher)
 */
function adaptTextForHetero(text: string): string {
  // Para contexto heterossexual, o texto original geralmente já é adequado
  // mas podemos fazer ajustes se necessário
  return text
    .replace(/parceiro\\(a\\)/g, "parceiro(a)")
    .replace(/seu parceiro/g, "seu parceiro(a)")
    .replace(/sua parceira/g, "seu parceiro(a)");
}

/**
 * Adapta o texto para um contexto homossexual
 */
function adaptTextForHomo(text: string, players: SimplePlayer[]): string {
  // Verifica se são homens ou mulheres (simplificado - para uma implementação real 
  // precisaríamos de um campo de gênero nos jogadores)
  const hasMoreMales = false; // Placeholder, em um app real teríamos que determinar isso
  
  if (hasMoreMales) {
    return text
      .replace(/parceiro\\(a\\)/g, "parceiro")
      .replace(/seu parceiro\\(a\\)/g, "seu parceiro")
      .replace(/pessoa do sexo oposto/g, "outro jogador")
      .replace(/sua parceira/g, "seu parceiro");
  } else {
    return text
      .replace(/parceiro\\(a\\)/g, "parceira")
      .replace(/seu parceiro\\(a\\)/g, "sua parceira")
      .replace(/pessoa do sexo oposto/g, "outra jogadora")
      .replace(/seu parceiro/g, "sua parceira");
  }
}

/**
 * Adapta o texto para um contexto misto (bissexual ou outros)
 */
function adaptTextForMixed(text: string): string {
  return text
    .replace(/pessoa do sexo oposto/g, "pessoa de sua preferência")
    .replace(/parceiro\\(a\\)/g, "parceiro(a) de sua preferência")
    .replace(/seu parceiro/g, "seu parceiro(a) de sua preferência");
}

/**
 * Seleciona jogadores para interagir com base nas orientações sexuais
 */
export function selectPlayersForInteraction(
  players: SimplePlayer[],
  currentPlayerIndex: number
): SimplePlayer[] {
  if (players.length <= 1) return [];
  
  const currentPlayer = players[currentPlayerIndex];
  
  if (!currentPlayer) return [];
  
  switch (currentPlayer.orientation) {
    case 'hetero':
      // Para heterossexuais, sugere interação com jogadores de orientação diferente
      // Aqui precisaríamos do gênero, em uma implementação real
      return players.filter((_, index) => index !== currentPlayerIndex);
      
    case 'homo':
      // Para homossexuais, sugere interação com jogadores de mesma orientação
      // Novamente, precisaríamos do gênero real
      return players.filter(p => 
        p.orientation === 'homo' && 
        players.indexOf(p) !== currentPlayerIndex
      );
      
    case 'bi':
    case 'outro':
      // Para bissexuais e outros, qualquer jogador é válido
      return players.filter((_, index) => index !== currentPlayerIndex);
      
    default:
      return players.filter((_, index) => index !== currentPlayerIndex);
  }
}