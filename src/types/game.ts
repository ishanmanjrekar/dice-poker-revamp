export interface Card {
  id: string;
  rank: string;
  suit: 'Hearts' | 'Diamonds' | 'Spades' | 'Clubs';
  isFaceUp: boolean;
}

export interface Deck {
  id: number;
  cards: Card[];
  lastEmptyHitAt?: number;
}

export type ScreenType = 'game' | 'settings' | 'highscore';

export interface GameState {
  currentScreen: ScreenType;
  decks: Deck[];
  hand: Card[];
  discardPile: Card[];
  rollsRemaining: number;
  handsPlayed: number;
  totalScore: number;
  history: any[];
  currentSkin: string;
  gameStatus: 'idle' | 'playing' | 'reshuffling' | 'ended';
  reshufflingDecks: number[];
}

export interface GameConfig {
  multipliers: Record<string, number>;
  handLimit: number;
  maxRolls: number;
  handSize: number;
}
