import { CategoryType } from "@/components/category-card";

// Tipos base
export type GameMode = 
  | "classic" 
  | "story" 
  | "roleplay" 
  | "roulette" 
  | "mood-gauge" 
  | "secret-vault" 
  | "sync-challenge";

// Interface base para todos os desafios
export interface BaseChallenge {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: CategoryType;
  index?: number;
}

// 1. Modo História Interativa
export interface StoryPoint {
  id: string;
  text: string;
  options: StoryOption[];
  background?: string;
  mood?: "romantic" | "mysterious" | "playful" | "intense";
}

export interface StoryOption {
  id: string;
  text: string;
  nextId: string;
  challengeId?: string; // ID opcional de desafio associado
  intensity?: CategoryType; // Intensidade do desafio se aplicável
}

export interface Story {
  id: string;
  title: string;
  description: string;
  startingPointId: string;
  storyPoints: StoryPoint[];
  category: CategoryType;
}

// 2. Cartas de Roleplay Aleatório
export interface RoleplayCard {
  id: string;
  role1: string;  // Papel para jogador 1
  role2: string;  // Papel para jogador 2
  scenario: string;
  intensity: CategoryType;
  duration: string;
}

// 3. Roleta Sensual
export interface RouletteAction {
  id: string;
  text: string;
  type: "action" | "command" | "question";
  intensity: CategoryType;
}

export interface RouletteBodyPart {
  id: string;
  name: string;
  sensitivity: number; // 1-10
}

// 4. Medidor de Clima (Mood Gauge)
export type MoodLevel = "suave" | "quente" | "selvagem";

export interface MoodGaugeSettings {
  currentLevel: MoodLevel;
  threshold: {
    suave: number;
    quente: number;
    selvagem: number;
  };
  history: { 
    level: MoodLevel; 
    timestamp: number; 
  }[];
}

// 5. Cofre Secreto (Secret Vault)
export interface SecretChallenge extends BaseChallenge {
  unlockCondition: {
    type: "completedChallenges" | "intensity" | "time" | "moodLevel";
    value: number | string;
  };
  isUnlocked: boolean;
}

// 6. Desafios em Dupla (Sync Challenges)
export interface SyncChallenge extends BaseChallenge {
  type: "synchronized" | "competitive" | "cooperative";
  playerInstructions: {
    player1: string;
    player2: string;
  };
  successCondition?: string;
  failureCondition?: string;
  timer: number; // em segundos
}

// Configurações gerais do jogo
export interface GameSettings {
  selectedMode: GameMode;
  ageVerified: boolean;
  darkMode: boolean;
  soundEffects: boolean;
  hapticFeedback: boolean;
  language: "pt" | "en" | "es";
  playerNames: string[];
  intensity: CategoryType;
  favorites: string[]; // IDs dos desafios favoritos
  completedChallenges: string[]; // IDs dos desafios completados
  unlockedSecrets: string[]; // IDs dos segredos desbloqueados
}