import React, { useState, useEffect } from 'react';
import { useGameStore } from '../../core/state';
import ScoreBoard from './ScoreBoard';
import DeckSpot from './DeckSpot';
import HandArea from './HandArea';
import Die from './Die';
import { HapticController } from '../../core/sensory-feedback';
import gameConfig from '../../../game-config.json';

const GameBoard: React.FC = () => {
  const {
    decks,
    hand,
    totalScore,
    handsPlayed,
    rollsRemaining,
    gameStatus,
    rollDice,
    playHand,
    resetGame
  } = useGameStore();

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isRolling, setIsRolling] = useState(false);
  const [lastDieValue, setLastDieValue] = useState(1);

  // Initialize game on mount
  useEffect(() => {
    if (gameStatus === 'idle') {
      resetGame();
    }
  }, [gameStatus, resetGame]);

  const handleRoll = () => {
    if (rollsRemaining <= 0 || isRolling || hand.length >= gameConfig.handSize) return;
    
    setIsRolling(true);
    HapticController.trigger('light');
    
    // Simulate dice roll animation duration
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
    
    const cardsToPlay = hand.filter(c => selectedIds.includes(c.id));
    playHand(cardsToPlay);
    setSelectedIds([]);
    HapticController.trigger('success');
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header / Score */}
      <ScoreBoard 
        score={totalScore} 
        handsPlayed={handsPlayed} 
        totalHands={gameConfig.handLimit} 
      />

      {/* Decks Section */}
      <div className="grid grid-cols-6 gap-2 mb-10 mt-2">
         {decks.map(deck => (
            <DeckSpot 
              key={deck.id} 
              deck={deck} 
              isClickable={false} // Drawing is triggered by Die Roll
            />
         ))}
      </div>

      {/* Action Area: Die + Roll Button */}
      <div className="flex items-center justify-between mb-8 px-2">
         <Die value={lastDieValue} isRolling={isRolling} />
         
         <div className="flex flex-col items-end gap-2">
            <button
              onClick={handleRoll}
              disabled={rollsRemaining <= 0 || isRolling || hand.length >= gameConfig.handSize}
              className="px-10 py-3 bg-parlor-primary text-parlor-surface rounded-xl font-display font-bold uppercase tracking-widest active:scale-95 transition-all disabled:opacity-20 disabled:grayscale"
            >
              ROLL
            </button>
            <span className="text-[10px] font-mono font-bold text-parlor-on-surface-variant uppercase tracking-widest">
              {rollsRemaining} Rolls Left
            </span>
         </div>
      </div>

      {/* Player Hand Area */}
      <div className="flex-1 min-h-[300px]">
         <HandArea 
           hand={hand} 
           selectedIds={selectedIds} 
           onToggleSelection={handleToggleSelection} 
         />
      </div>

      {/* Global Play Button */}
      <div className="mt-auto px-4 py-6">
         <button
           onClick={handlePlayHand}
           disabled={selectedIds.length === 0}
           className="w-full py-5 bg-parlor-secondary text-white rounded-2xl font-display font-bold text-lg uppercase tracking-[0.2em] shadow-parlor active:scale-[0.98] transition-all disabled:opacity-10"
         >
           Play Selected Hand
         </button>
      </div>

      {/* End Game Overlay */}
      {gameStatus === 'ended' && (
        <div className="absolute inset-0 z-50 bg-parlor-primary/95 flex flex-col items-center justify-center p-8 text-center text-parlor-surface animate-in fade-in duration-700">
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
