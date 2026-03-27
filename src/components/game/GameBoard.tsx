import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../core/state';
// Removed ScoreBoard import
import DeckSpot from './DeckSpot';
import HandArea from './HandArea';
import Die from './Die';
import MatchLog from './MatchLog';
import { HapticController } from '../../core/sensory-feedback';
import { evaluateHand } from '../../core/poker-engine';
import gameConfig from '../../../game-config.json';
import { Dices } from 'lucide-react';

const GAME_OVER_QUOTES = [
  "The house always wins, but you did well.",
  "Not bad for someone who trusts small plastic cubes with their fate.",
  "Fortune favors the bold, but mathematics favors the house.",
  "A valiant effort against the unbreakable laws of probability.",
  "The dice giveth, and the dice taketh away.",
  "Your strategy was flawless. The dice simply disagreed.",
  "Statistically speaking, that could have been much worse.",
  "Don't blame the dealer — you were the one rolling the dice.",
  "You know what they say: lucky at cards, terrible at rolling dice.",
  "You almost had it. Almost.",
];

const GameBoard: React.FC = () => {
  const {
    decks,
    hand,
    totalScore,
    handsPlayed,
    rollsRemaining,
    gameStatus,
    history,
    reshufflingDecks,
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

  // Random quote picked once per game-over transition
  const gameOverQuote = useMemo(
    () => GAME_OVER_QUOTES[Math.floor(Math.random() * GAME_OVER_QUOTES.length)],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [gameStatus]
  );

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
    setSelectedIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(i => i !== id);
      } else {
        if (prev.length >= 5) return prev;
        return [...prev, id];
      }
    });
  };

  const handlePlayHand = () => {
    if (selectedIds.length === 0) return;
    playHand(selectedCards);
    setSelectedIds([]);
    HapticController.trigger('success');
  };

  return (
    <div className="flex flex-col flex-1 bg-parlor-surface overflow-hidden pt-2">
      {/* Main Scrollable Content */}
      <main className="flex-1 px-4 max-w-lg mx-auto w-full space-y-3 pb-24 overflow-y-auto scrollbar-hide">
        
        {/* 2. Decks Section */}
        <section className="space-y-2">
          <h2 className="text-[10px] font-bold font-sans text-parlor-on-surface-variant tracking-[0.2em] px-1 uppercase opacity-60">
            DECKS
          </h2>
          <div className="flex justify-between gap-1 px-1 flex-nowrap">
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
        <div className="absolute inset-0 z-[60] bg-parlor-surface/95 backdrop-blur-md flex flex-col items-center justify-center px-6 animate-in fade-in duration-700">
          <div className="w-full max-w-sm flex flex-col items-center text-center">
            
            <div className="mb-6 bg-parlor-surface-highest p-6 rounded-full inline-flex items-center justify-center">
              <Dices className="text-parlor-primary w-12 h-12" strokeWidth={1.5} />
            </div>
            
            <h2 className="font-display font-extrabold text-5xl text-parlor-primary tracking-tighter mb-2">
              Game Over
            </h2>
            <p className="font-mono text-parlor-on-surface-variant uppercase tracking-[0.2em] text-xs mb-8">
              {gameOverQuote}
            </p>
            
            <div className="bg-white w-full p-8 rounded-xl shadow-parlor mb-10 relative overflow-hidden">
              <div className="flex flex-col items-center relative z-10">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-mono text-parlor-on-surface-variant text-[11px] font-medium uppercase tracking-widest">
                    Total Score
                  </span>
                </div>
                <div className="font-display font-extrabold text-7xl text-parlor-primary tracking-tighter">
                  {totalScore.toLocaleString()}
                </div>
              </div>
              <div className="absolute -bottom-8 -right-8 opacity-5 rotate-12 z-0">
                <Dices className="w-48 h-48" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4 w-full">
              <button 
                onClick={() => resetGame()} 
                className="bg-parlor-secondary text-white font-display font-semibold py-4 rounded-xl shadow-[inset_0_2px_0_rgba(255,255,255,0.2)] hover:opacity-90 transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-sm"
              >
                New Game
              </button>
              
              <button 
                className="bg-parlor-surface-highest text-parlor-primary font-display font-semibold py-4 rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-sm"
              >
                High Scores
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Reshuffling Overlay */}
      <AnimatePresence>
        {gameStatus === 'reshuffling' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1, y: -40 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute inset-0 z-[70] flex flex-col items-center justify-center pointer-events-none"
          >
            <div className="bg-parlor-surface/95 px-8 py-4 rounded-xl shadow-2xl border border-parlor-primary/10 backdrop-blur-sm text-center">
              <span className="text-2xl sm:text-3xl font-display font-black tracking-[0.2em] text-parlor-primary uppercase">
                Reshuffling Deck {reshufflingDecks.join(' & ')}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GameBoard;
