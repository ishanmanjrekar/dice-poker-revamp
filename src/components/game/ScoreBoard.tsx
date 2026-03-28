import React from 'react';
import { Dices, Coffee } from 'lucide-react';
import { useGameStore } from '../../core/state';
import gameConfig from '../../../game-config.json';

const ScoreBoard: React.FC = () => {
  const { currentScreen, totalScore, handsPlayed } = useGameStore();

  return (
    <header className="flex justify-between items-start w-full shrink-0 px-6 pt-4 pb-2 z-50">
      {/* Brand Header */}
      <div className="flex items-center gap-2">
        <Dices className="text-parlor-primary w-8 h-8" strokeWidth={1.5} />
        <h1 className="text-2xl font-bold text-parlor-primary font-display tracking-tight leading-none">
          Dice Poker
        </h1>
      </div>

      {/* Right Side */}
      {currentScreen === 'game' ? (
        <div className="text-right flex flex-col items-end">
          <div className="text-[11px] font-bold font-display text-parlor-on-surface-variant uppercase tracking-wider">
            SCORE: {totalScore.toLocaleString()}
          </div>
          <div className="text-[11px] font-bold font-display text-parlor-secondary uppercase tracking-wider mt-1">
            HANDS: {handsPlayed.toString().padStart(2, '0')}/{gameConfig.handLimit}
          </div>
        </div>
      ) : (
        <a 
          href="https://ko-fi.com/ishanmanjrekar/tip" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-parlor-secondary text-white px-4 py-2 rounded-full font-display font-bold text-[11px] tracking-wider shadow-lg shadow-parlor-secondary/20 hover:scale-105 active:scale-95 transition-all"
        >
          <Coffee className="w-3.5 h-3.5" />
          <span>BUY ME A COFFEE</span>
        </a>
      )}
    </header>
  );
};

export default ScoreBoard;
