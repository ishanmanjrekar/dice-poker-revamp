import React, { useState, useEffect, useMemo } from 'react';
import { useGameStore } from '../../core/state';
import ScoreBoard from './ScoreBoard';
import DeckSpot from './DeckSpot';
import HandArea from './HandArea';
import Die from './Die';
import MatchLog from './MatchLog';
import { HapticController } from '../../core/sensory-feedback';
import { evaluateHand } from '../../core/poker-engine';
import gameConfig from '../../../game-config.json';
import { Dices } from 'lucide-react';

const GameBoard: React.FC = () => {
  const {
    decks,
    hand,
    totalScore,
    handsPlayed,
    rollsRemaining,
    gameStatus,
    history,
    rollDice,
    playHand,
    resetGame
  } = useGameStore();

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isRolling, setIsRolling] = useState(false);
  const [lastDieValue, setLastDieValue] = useState(1);

  // Derived: Current Hand Ranking
  const selectedCards = useMemo(() => 
    hand.filter(c => selectedIds.includes(c.id)), 
  [hand, selectedIds]);

  const handRank = useMemo(() => 
    evaluateHand(selectedCards).handName, 
  [selectedCards]);

  useEffect(() => {
    if (gameStatus === 'idle') {
      resetGame();
    }
  }, [gameStatus, resetGame]);

  const handleRoll = () => {
    if (rollsRemaining <= 0 || isRolling || hand.length >= gameConfig.handSize) return;
    
    setIsRolling(true);
    HapticController.trigger('light');
    
    setTimeout(() => {
      const newValue = Math.floor(Math.random() * 6) + 1;
      setLastDieValue(newValue);
      rollDice(newValue);
      setIsRolling(false);
      HapticController.trigger('medium');
    }, 600);
  };

  const handleToggleSelection = (id: string) => {
    HapticController.trigger('light');
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handlePlayHand = () => {
    if (selectedIds.length === 0) return;
    playHand(selectedCards);
    setSelectedIds([]);
    HapticController.trigger('success');
  };

  return (
    <div className="flex flex-col h-full bg-parlor-surface">
      {/* 1. Brand Header */}
      <div className="px-6 pt-4 pb-2 shrink-0">
        <ScoreBoard 
          score={totalScore} 
          handsPlayed={handsPlayed} 
          totalHands={gameConfig.handLimit} 
        />
      </div>

      {/* Main Scrollable Content */}
      <main className="flex-1 px-4 max-w-lg mx-auto w-full space-y-3 pb-24 overflow-y-auto scrollbar-hide">
        
        {/* 2. Decks Section */}
        <section className="space-y-2">
          <h2 className="text-[10px] font-bold font-sans text-parlor-on-surface-variant tracking-[0.2em] px-1 uppercase opacity-60">
            DECKS
          </h2>
          <div className="flex justify-between gap-1 px-1 flex-nowrap overflow-x-hidden">
             {decks.map(deck => (
                <DeckSpot 
                  key={deck.id} 
                  deck={deck} 
                  isClickable={false}
                />
             ))}
          </div>
        </section>

        {/* 3. Hand Section */}
        <section className="space-y-2 pt-0">
          <h2 className="text-[10px] font-bold font-sans text-parlor-on-surface-variant tracking-[0.2em] px-1 uppercase opacity-60">
            CARDS IN YOUR HAND
          </h2>
          <HandArea 
            hand={hand} 
            selectedIds={selectedIds} 
            onToggleSelection={handleToggleSelection} 
          />
        </section>

        {/* 4. Actions: Rank Indicator + Play Button */}
        <section className="space-y-4 flex flex-col items-center pt-2">
          <div className="bg-parlor-surface-container/50 rounded-full px-10 py-1.5 inline-flex items-center gap-1.5 border border-parlor-primary/5">
            <span className="text-[10px] font-bold font-sans text-parlor-on-surface-variant uppercase tracking-widest opacity-80">
              SELECTED HAND RANK:
            </span>
            <span className="text-[10px] font-bold font-sans text-parlor-secondary uppercase tracking-widest">
              {selectedIds.length > 0 ? handRank : 'NONE'}
            </span>
          </div>
          
          <button
            onClick={handlePlayHand}
            disabled={selectedIds.length === 0}
            className="w-full py-4 bg-parlor-secondary text-white rounded-2xl font-display font-extrabold text-base tracking-[0.1em] uppercase shadow-xl shadow-parlor-secondary/25 active:scale-[0.98] transition-all disabled:opacity-20 disabled:grayscale"
          >
            PLAY SELECTED HAND
          </button>
        </section>

        {/* 5. Roll Controls */}
        <section className="bg-parlor-surface-container/40 rounded-3xl p-4 flex items-center justify-between shadow-sm border border-parlor-primary/5">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold font-sans text-parlor-on-surface-variant uppercase tracking-[0.15em] opacity-60">
              ROLLS REMAINING
            </span>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-4xl font-display font-bold text-parlor-primary leading-none">
                {rollsRemaining.toString().padStart(2, '0')}
              </span>
              <span className="text-sm font-display font-medium text-parlor-primary/30">
                / {gameConfig.maxRolls.toString().padStart(2, '0')}
              </span>
            </div>
          </div>
          
          <div className="flex gap-4 items-center">
            <Die value={lastDieValue} isRolling={isRolling} />
            <button
              onClick={handleRoll}
              disabled={rollsRemaining <= 0 || isRolling || hand.length >= gameConfig.handSize}
              className="bg-parlor-secondary text-white px-7 py-3 rounded-2xl flex flex-col items-center justify-center shadow-xl shadow-parlor-secondary/30 active:scale-95 transition-all disabled:opacity-20"
            >
              <Dices className="w-6 h-6 mb-0.5" strokeWidth={2} />
              <span className="text-[10px] font-black font-display tracking-[0.2em] uppercase leading-none">
                ROLL
              </span>
            </button>
          </div>
        </section>

        {/* 6. Match Log */}
        <MatchLog history={history} />

      </main>

      {/* End Game Overlay */}
      {gameStatus === 'ended' && (
        <div className="absolute inset-0 z-[60] bg-parlor-primary/95 flex flex-col items-center justify-center p-8 text-center text-parlor-surface animate-in fade-in duration-700">
           <h2 className="text-6xl font-display font-bold mb-4">FIN</h2>
           <p className="text-parlor-surface/60 font-mono uppercase tracking-widest mb-12">Total Score</p>
           <div className="text-7xl font-display font-bold mb-16">{totalScore.toLocaleString()}</div>
           <button 
             onClick={() => resetGame()}
             className="px-12 py-4 border-2 border-parlor-surface rounded-xl font-display font-bold uppercase tracking-widest hover:bg-parlor-surface hover:text-parlor-primary transition-all"
           >
             New Game
           </button>
        </div>
      )}
    </div>
  );
};

export default GameBoard;
