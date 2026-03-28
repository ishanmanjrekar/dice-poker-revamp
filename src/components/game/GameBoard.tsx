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
import { Dice5, RotateCcw, BarChart2, Dices } from 'lucide-react';

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
    resetGame,
    setScreen,
    highScores
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
          <h2 className="text-[12px] font-sans font-black text-parlor-on-surface-variant tracking-[0.25em] px-1 uppercase opacity-50">
            Decks
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
        <section className="space-y-2 pt-6">
          <h2 className="text-[12px] font-sans font-black text-parlor-on-surface-variant tracking-[0.25em] px-1 uppercase opacity-50">
            Cards in Your Hand
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
        <div className="absolute inset-0 z-[60] bg-parlor-surface/98 backdrop-blur-xl flex flex-col items-center justify-center px-6 animate-in fade-in zoom-in-95 duration-700">
          <div className="w-full max-w-sm flex flex-col items-center text-center">
            
            {/* Top Icon */}
            <div className="mb-8 bg-parlor-surface-highest/50 p-6 rounded-full inline-flex items-center justify-center ring-1 ring-parlor-primary/5">
              <Dice5 className="text-parlor-primary w-12 h-12" strokeWidth={1.2} />
            </div>
            
            {/* Title & Subtitle */}
            <h2 className="font-display font-black text-6xl text-parlor-primary tracking-tight mb-3">
              Game Over
            </h2>
            <p className="font-sans text-parlor-on-surface-variant uppercase tracking-[0.3em] text-[10px] font-bold opacity-70 mb-10 max-w-[280px] leading-relaxed">
              {gameOverQuote}
            </p>
            
            {/* Score Card */}
            <div className="bg-white w-full p-10 rounded-[2.5rem] shadow-parlor mb-12 relative overflow-hidden ring-1 ring-parlor-primary/[0.03]">
              <div className="flex flex-col items-center relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-sans text-parlor-on-surface-variant text-[10px] font-black uppercase tracking-[0.2em] opacity-50">
                    Total Score
                  </span>
                  {highScores.length > 0 && totalScore >= Math.max(...highScores.map(h => h.score)) && (
                    <span className="bg-parlor-secondary text-white text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-parlor-secondary/20">
                      New Highscore
                    </span>
                  )}
                </div>
                <div className="font-display font-black text-8xl text-parlor-primary tracking-tighter">
                  {totalScore.toLocaleString()}
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="grid grid-cols-1 gap-4 w-full">
              <button 
                onClick={() => resetGame()} 
                className="bg-parlor-secondary text-white font-display font-extrabold py-5 rounded-2xl shadow-xl shadow-parlor-secondary/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 uppercase tracking-[0.15em] text-sm"
              >
                <RotateCcw className="w-5 h-5" strokeWidth={2.5} />
                New Game
              </button>
              
              <button 
                onClick={() => setScreen('highscore')}
                className="bg-parlor-primary text-white font-display font-extrabold py-5 rounded-2xl shadow-xl shadow-parlor-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 uppercase tracking-[0.15em] text-sm"
              >
                <BarChart2 className="w-5 h-5" strokeWidth={2.5} />
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
