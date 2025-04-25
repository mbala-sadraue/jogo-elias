export type IntensityLevel = "suave" | "picante" | "selvagem" | "extremo" | null;

export type RelationshipType = "hetero" | "lesbico" | "gay" | "outro" | null;

export type ContentType = "pergunta" | "desafio" | "premio" | "penalidade";

export interface PlayerPreference {
  noFood: boolean;
  noAlcohol: boolean;
  noOutdoor: boolean;
  noClothing: boolean;
  customLimits: string;
}

export interface Player {
  id: number;
  name: string;
  avatar: string;
  preferences?: PlayerPreference;
  mood?: 'happy' | 'romantic' | 'excited' | 'relaxed' | 'passionate';
  favoriteCategories?: string[];
  connectionScore?: number; // 1-100, calculado pelo teste de conexão
}

export interface GameOptions {
  darkMode: boolean;
  competitiveMode: boolean;
  timer: boolean;
  dynamicIntensity: boolean;
  challengeInPairs: boolean;
  forbiddenQuestion: boolean;
  musicEnabled: boolean;
  allowChooseType: boolean;
  
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  isUnlocked: boolean;
  unlockedAt?: Date;
  requiredPoints: number;
}

export interface PlayerStats {
  points: number;
  challengesCompleted: number;
  questionsAnswered: number;
  achievements: Achievement[];
  connectionLevel?: number; // 1-10 nivel de conexão emocional
}

export interface Memory {
  id: string;
  date: Date;
  title: string;
  description: string;
  imageUrl?: string;
  relatedChallenge?: Challenge;
  playerIds: number[];
  mood: 'romantic' | 'funny' | 'exciting' | 'emotional';
}

export interface GameState {
  intensity: IntensityLevel;
  relationshipType: RelationshipType;
  playerCount: number;
  players: Player[];
  options: GameOptions;
  isReadyToStart: boolean;
  currentRound: number;
  currentPlayerIndex: number;
  gameStarted: boolean;
  questionMode: boolean; // true for question, false for challenge
  rouletteMode: boolean;
  selectedPairIds: number[] | null;
  volumeLevel: number;
  // Novos campos
  playerStats: Record<number, PlayerStats>;
  memories: Memory[];
  isConnectionTestCompleted: boolean;
  unlockedCategories: string[];
  totalPoints: number;
}

export interface Challenge {
  id: number;
  text: string;
  text_en?: string;
  text_es?: string;
  text_ru?: string;
  text_fr?: string;
  intensity: IntensityLevel;
  relationshipType: RelationshipType;
  type?: ContentType;
  requiresPair?: boolean;
  hasForbiddenVersion?: boolean;
  forbiddenText?: string;
  forbiddenText_en?: string;
  forbiddenText_es?: string;
  forbiddenText_ru?: string;
  forbiddenText_fr?: string;
  tags?: string[];
  isReward?: boolean;
}
