import { Card, Deck } from '../types/game';

const SUITS: Card['suit'][] = ['Hearts', 'Diamonds', 'Spades', 'Clubs'];
const RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

export function generateFullDeck(): Card[] {
  const deck: Card[] = [];
  for (const suit of SUITS) {
    for (const rank of RANKS) {
      deck.push({
        id: `${rank}-${suit}`,
        rank,
        suit,
        isFaceUp: false,
      });
    }
  }
  return deck;
}

export function shuffle<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export function initializeBoard(): { decks: Deck[]; startingHand: Card[] } {
  const fullDeck = shuffle(generateFullDeck());
  
  // Rules: 4 cards for starting hand
  const startingHand = fullDeck.slice(0, 4).map(card => ({ ...card, isFaceUp: true }));
  const remainingCards = fullDeck.slice(4);
  
  // Rules: 6 decks of 8 cards each
  const decks: Deck[] = [];
  for (let i = 0; i < 6; i++) {
    const deckCards = remainingCards.slice(i * 8, (i + 1) * 8);
    // Rules: Top card of each deck is face-up
    if (deckCards.length > 0) {
      deckCards[deckCards.length - 1].isFaceUp = true;
    }
    decks.push({
      id: i + 1,
      cards: deckCards,
    });
  }
  
  return { decks, startingHand };
}

export function refillEmptyDecks(decks: Deck[], discardPile: Card[]): { newDecks: Deck[]; remainingDiscards: Card[]; emptiedDeckIds: number[] } {
  const newDecks = [...decks];
  const remainingCards = [...discardPile];
  const emptiedDeckIds: number[] = [];

  for (let i = 0; i < newDecks.length; i++) {
    if (newDecks[i].cards.length === 0) {
      emptiedDeckIds.push(newDecks[i].id);
      // Give up to 8 cards to the exhausted deck
      const refillAmount = Math.min(8, remainingCards.length);
      const deckCards = remainingCards.splice(0, refillAmount);

      // Format cards: only the top card is face up
      const formattedCards = deckCards.map((c, index) => ({
        ...c,
        isFaceUp: index === deckCards.length - 1
      }));
      newDecks[i] = { ...newDecks[i], cards: formattedCards };
    }
  }

  return { newDecks, remainingDiscards: remainingCards, emptiedDeckIds };
}
