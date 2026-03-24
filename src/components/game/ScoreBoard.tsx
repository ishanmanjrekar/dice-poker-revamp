import React from 'react';
import { Dices } from 'lucide-react';

interface ScoreBoardProps {
  score: number;
  handsPlayed: number;
  totalHands: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, handsPlayed, totalHands }) => {
  return (
    <header className="flex justify-between items-start w-full mb-8">
      {/* Brand Header */}
      <div className="flex items-center gap-2">
        <Dices className="text-parlor-primary w-8 h-8" strokeWidth={1.5} />
        <h1 className="text-2xl font-bold text-parlor-primary font-display tracking-tight leading-none">
          Dice Poker
        </h1>
      </div>

      {/* Stats Area */}
      <div className="text-right flex flex-col items-end">
        <div className="text-[11px] font-bold font-display text-parlor-on-surface-variant uppercase tracking-wider">
          SCORE: {score.toLocaleString()}
        </div>
        <div className="text-[11px] font-bold font-display text-parlor-secondary uppercase tracking-wider mt-1">
          HANDS: {handsPlayed.toString().padStart(2, '0')}/{totalHands}
        </div>
      </div>
    </header>
  );
};

export default ScoreBoard;
