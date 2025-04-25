export type SexualOrientation = 'hetero' | 'homo' | 'bi' | 'outro';

export interface Player {
  id: string;
  name: string;
  orientation: SexualOrientation;
}

export interface GameSetupOptions {
  players: Player[];
  intensity?: string;
  mode?: string;
  acceptedTerms: boolean;
}