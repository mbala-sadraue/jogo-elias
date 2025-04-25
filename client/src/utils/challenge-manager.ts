import { SexualOrientation } from "@/types/player";
import { CategoryType } from "@/components/category-card";
import { GameChallenge } from "@/data/challenges";
import { 
  getRandomExpandedChallenge, 
  getExpandedChallenges,
  ALL_EXPANDED_CHALLENGES 
} from "@/data/expanded-challenges";
import { filterChallengesByOrientation } from "@/utils/challenge-filter";

interface SimplePlayer {
  id: string;
  name: string;
  orientation: SexualOrientation;
}

interface ChallengeOptions {
  category: CategoryType;
  type?: "pergunta" | "desafio" | "prêmio" | "penalidade";
  onlyNew?: boolean; // Apenas desafios que ainda não foram usados
  excludeIds?: string[]; // IDs de desafios a serem excluídos
}

/**
 * Gerenciador avançado de desafios que considera orientação sexual e preferências
 */
export class ChallengeManager {
  private players: SimplePlayer[];
  private usedChallengeIds: Set<string> = new Set();
  
  constructor(players: SimplePlayer[]) {
    this.players = players;
  }
  
  /**
   * Obtém um desafio aleatório que atende aos critérios especificados
   */
  public getChallenge(options: ChallengeOptions): GameChallenge | null {
    // Obtém todos os desafios da categoria e tipo especificados
    let challenges = getExpandedChallenges(options.category, options.type);
    
    // Filtra desafios com base na orientação sexual dos jogadores
    challenges = filterChallengesByOrientation(challenges, this.players, options.category);
    
    // Remove desafios que já foram usados, se necessário
    if (options.onlyNew) {
      challenges = challenges.filter(c => !this.usedChallengeIds.has(c.id));
    }
    
    // Remove desafios específicos, se solicitado
    if (options.excludeIds && options.excludeIds.length > 0) {
      challenges = challenges.filter(c => !options.excludeIds?.includes(c.id));
    }
    
    // Se não há desafios disponíveis, retorna null
    if (challenges.length === 0) {
      return null;
    }
    
    // Seleciona um desafio aleatório
    const randomIndex = Math.floor(Math.random() * challenges.length);
    const selectedChallenge = challenges[randomIndex];
    
    // Marca o desafio como usado
    this.usedChallengeIds.add(selectedChallenge.id);
    
    return selectedChallenge;
  }
  
  /**
   * Obtém múltiplos desafios aleatórios diferentes
   */
  public getChallenges(options: ChallengeOptions, count: number): GameChallenge[] {
    const result: GameChallenge[] = [];
    
    for (let i = 0; i < count; i++) {
      // Adiciona os IDs dos desafios já selecionados à lista de exclusão
      const excludeIds = [...(options.excludeIds || []), ...result.map(c => c.id)];
      
      const challenge = this.getChallenge({
        ...options,
        excludeIds
      });
      
      if (challenge) {
        result.push(challenge);
      } else {
        // Se não houver mais desafios disponíveis, para o loop
        break;
      }
    }
    
    return result;
  }
  
  /**
   * Obtém o total de desafios disponíveis para uma categoria e tipo
   */
  public getTotalChallenges(category: CategoryType, type?: "pergunta" | "desafio"): number {
    if (type) {
      return type === "pergunta" 
        ? ALL_EXPANDED_CHALLENGES[category].perguntas.length
        : ALL_EXPANDED_CHALLENGES[category].desafios.length;
    }
    
    return ALL_EXPANDED_CHALLENGES[category].perguntas.length + 
           ALL_EXPANDED_CHALLENGES[category].desafios.length;
  }
  
  /**
   * Marca um desafio como usado
   */
  public markAsUsed(challengeId: string): void {
    this.usedChallengeIds.add(challengeId);
  }
  
  /**
   * Reinicia o gerenciador, limpando o histórico de desafios usados
   */
  public reset(): void {
    this.usedChallengeIds.clear();
  }
  
  /**
   * Atualiza a lista de jogadores
   */
  public updatePlayers(players: SimplePlayer[]): void {
    this.players = players;
  }
  
  /**
   * Obtém a porcentagem de desafios já utilizados
   */
  public getUsagePercentage(category: CategoryType, type?: "pergunta" | "desafio"): number {
    const total = this.getTotalChallenges(category, type);
    
    if (total === 0) return 0;
    
    // Conta quantos desafios desta categoria e tipo foram usados
    let usedCount = 0;
    
    if (type) {
      const challenges = type === "pergunta" 
        ? ALL_EXPANDED_CHALLENGES[category].perguntas
        : ALL_EXPANDED_CHALLENGES[category].desafios;
        
      usedCount = challenges.filter(c => this.usedChallengeIds.has(c.id)).length;
    } else {
      const allChallenges = [
        ...ALL_EXPANDED_CHALLENGES[category].perguntas,
        ...ALL_EXPANDED_CHALLENGES[category].desafios
      ];
      
      usedCount = allChallenges.filter(c => this.usedChallengeIds.has(c.id)).length;
    }
    
    return (usedCount / total) * 100;
  }
}