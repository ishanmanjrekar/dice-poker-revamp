import { Card } from '../types/game';
import gameConfig from '../../game-config.json';

const RANK_VALUES: Record<string, number> = {
  '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10,
  'J': 10, 'Q': 10, 'K': 10, 'A': 11
};

export interface ScoreResult {
  handName: string;
  baseScore: number;
  multiplier: number;
  finalScore: number;
}

export function evaluateHand(cards: Card[], multipliers?: Record<string, number>): ScoreResult {
  if (cards.length === 0) return { handName: 'High Card', baseScore: 0, multiplier: 1, finalScore: 0 };

  const sortedCards = [...cards].sort((a, b) => {
    const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    return ranks.indexOf(a.rank) - ranks.indexOf(b.rank);
  });

  const isFlush = cards.every(c => c.suit === cards[0].suit);
  const isStraight = sortedCards.every((c, i) => {
    if (i === 0) return true;
    const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    return ranks.indexOf(c.rank) === ranks.indexOf(sortedCards[i - 1].rank) + 1;
  });

  const rankCounts: Record<string, number> = {};
  cards.forEach(c => rankCounts[c.rank] = (rankCounts[c.rank] || 0) + 1);
  const counts = Object.values(rankCounts).sort((a, b) => b - a);

  let handName = 'High Card';
  const hasFiveCards = cards.length === 5;

  if (hasFiveCards && isStraight && isFlush && sortedCards[sortedCards.length - 1].rank === 'A') handName = 'Royal Flush';
  else if (hasFiveCards && isStraight && isFlush) handName = 'Straight Flush';
  else if (counts[0] === 4) handName = 'Four of a Kind';
  else if (hasFiveCards && counts[0] === 3 && counts[1] === 2) handName = 'Full House';
  else if (hasFiveCards && isFlush) handName = 'Flush';
  else if (hasFiveCards && isStraight) handName = 'Straight';
  else if (counts[0] === 3) handName = 'Three of a Kind';
  else if (counts[0] === 2 && counts[1] === 2) handName = 'Two Pair';
  else if (counts[0] === 2) handName = 'One Pair';

  const multiplierMap = multipliers || gameConfig.multipliers;
  const multiplier = multiplierMap[handName as keyof typeof multiplierMap] || 1;
  const baseScore = cards.reduce((sum, c) => sum + RANK_VALUES[c.rank], 0);

  return {
    handName,
    baseScore,
    multiplier,
    finalScore: baseScore * multiplier
  };
}
