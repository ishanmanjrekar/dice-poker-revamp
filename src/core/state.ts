import { create } from 'zustand';
import { GameState, Card, Deck, ScreenType } from '../types/game';
import { initializeBoard, shuffle, refillEmptyDecks } from './deck';
import { evaluateHand } from './poker-engine';
import gameConfig from '../../game-config.json';

interface GameActions {
  rollDice: (dieValue: number) => void;
  playHand: (selectedCards: Card[]) => void;
  resetGame: () => void;
  toggleCardSelection: (cardId: string) => void;
  setScreen: (screen: ScreenType) => void;
}

const initialState: GameState = {
  currentScreen: 'game',
  decks: [],
  hand: [],
  discardPile: [],
  rollsRemaining: gameConfig.maxRolls,
  handsPlayed: 0,
  totalScore: 0,
  history: [],
  currentSkin: 'standard',
  gameStatus: 'idle',
  reshufflingDecks: [],
};

export const useGameStore = create<GameState & GameActions>((set, get) => ({
  ...initialState,

  resetGame: () => {
    const { decks, startingHand } = initializeBoard();
    set({
      ...initialState,
      decks,
      hand: startingHand,
      gameStatus: 'playing',
    });
  },

  rollDice: (dieValue: number) => {
    const { decks, hand, rollsRemaining, gameStatus } = get();
    if (gameStatus !== 'playing' || rollsRemaining <= 0 || hand.length >= gameConfig.handSize) return;

    const deckIndex = dieValue - 1;
    const targetDeck = decks[deckIndex];

    if (!targetDeck) return;

    let newDecks = [...decks];

    if (targetDeck.cards.length === 0) {
      newDecks[deckIndex] = { ...targetDeck, lastEmptyHitAt: Date.now() };
      set({
        decks: newDecks,
        rollsRemaining: rollsRemaining - 1,
      });
    } else {
      const newDeckCards = [...targetDeck.cards];
      const drawnCard = newDeckCards.pop()!;
      
      // Reveal new top card
      if (newDeckCards.length > 0) {
        newDeckCards[newDeckCards.length - 1] = { 
          ...newDeckCards[newDeckCards.length - 1], 
          isFaceUp: true 
        };
      }

      newDecks[deckIndex] = { ...targetDeck, cards: newDeckCards };

      set({
        decks: newDecks,
        hand: [...hand, { ...drawnCard, isFaceUp: true }],
        rollsRemaining: rollsRemaining - 1,
      });
    }
  },

  playHand: (selectedCards: Card[]) => {
    const { hand, discardPile, totalScore, handsPlayed, history } = get();
    if (selectedCards.length === 0) return;

    const result = evaluateHand(selectedCards);
    const newTotalScore = totalScore + result.finalScore;
    const newHandsPlayed = handsPlayed + 1;

    // Discard selected cards
    const newHand = hand.filter(c => !selectedCards.find(sc => sc.id === c.id));
    const newDiscardPile = [...discardPile, ...selectedCards];

    const { decks: currentDecks } = get();
    const emptyDecksExists = currentDecks.some(d => d.cards.length === 0);

    if (emptyDecksExists && newHandsPlayed < gameConfig.handLimit) {
      const shuffledDiscards = shuffle(newDiscardPile);
      const { newDecks, remainingDiscards, emptiedDeckIds } = refillEmptyDecks(currentDecks, shuffledDiscards);
      
      set({
        hand: newHand,
        discardPile: newDiscardPile,
        totalScore: newTotalScore,
        handsPlayed: newHandsPlayed,
        rollsRemaining: gameConfig.maxRolls,
        history: [...history, { ...result, timestamp: Date.now() }],
        gameStatus: 'reshuffling',
        reshufflingDecks: emptiedDeckIds
      });

      setTimeout(() => {
         set({
           decks: newDecks,
           discardPile: remainingDiscards,
           gameStatus: 'playing',
           reshufflingDecks: []
         });
      }, 2000);
    } else {
      set({
        hand: newHand,
        discardPile: newDiscardPile,
        totalScore: newTotalScore,
        handsPlayed: newHandsPlayed,
        rollsRemaining: gameConfig.maxRolls, // Reset rolls for next round
        history: [...history, { ...result, timestamp: Date.now() }],
        gameStatus: newHandsPlayed >= gameConfig.handLimit ? 'ended' : 'playing',
      });
    }
  },

  toggleCardSelection: (cardId: string) => {
    // Selection state is usually handled in the View layer (local state) 
    // or as a derived state, but we could add an 'isSelected' flag to Card if needed.
  },

  setScreen: (screen: ScreenType) => {
    set({ currentScreen: screen });
  }
}));
