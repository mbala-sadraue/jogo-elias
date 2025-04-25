// Tipos definidos para os jogadores no jogo ELONDA

// Tipos de orientação sexual
export type SexualOrientation = "hetero" | "homo" | "bi" | "outro";

// Cores de avatar disponíveis
export type AvatarColor = "red" | "blue" | "green" | "purple" | "orange" | "pink" | "teal" | "amber";

// Interface para as preferências do jogador
export interface PlayerPreference {
  noAlcohol: boolean;
  noFood: boolean;
  noClothing: boolean;
  noOutdoor: boolean;
  customLimits: string;
}

// Interface para o jogador
export interface Player {
  id: number;
  name: string;
  avatar: AvatarColor;
  orientation?: SexualOrientation;
  preferences?: PlayerPreference;
}

// Interface simplificada do jogador para uso em APIs e gerenciamento de desafios
export interface SimplePlayer {
  id: string;
  name: string;
  orientation: SexualOrientation;
}