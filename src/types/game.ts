export interface Card {
  id: string;
  rank: string;
  suit: 'Hearts' | 'Diamonds' | 'Spades' | 'Clubs';
  isFaceUp: boolean;
}

export interface Deck {
  id: number;
  cards: Card[];
}

export interface GameState {
  decks: Deck[];
  hand: Card[];
  rollsRemaining: number;
  handsPlayed: number;
  totalScore: number;
  history: any[];
  currentSkin: string;
  gameStatus: 'idle' | 'playing' | 'reshuffling' | 'ended';
}

export interface GameConfig {
  multipliers: Record<string, number>;
  handLimit: number;
  maxRolls: number;
  handSize: number;
}
