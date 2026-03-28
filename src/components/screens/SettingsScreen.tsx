import React, { useState, useEffect } from 'react';
import { useGameStore } from '../../core/state';
import { 
  BookOpen, Layers, Hand, Dice5, RotateCcw, 
  Hand as HandIcon, MousePointer2, Medal, Star, 
  TrendingUp, Minus, Plus, Sparkles, RotateCcw as ResetIcon
} from 'lucide-react';
import gameConfig from '../../../game-config.json';

const HAND_ORDER = [
  'High Card',
  'One Pair',
  'Two Pair',
  'Three of a Kind',
  'Straight',
  'Flush',
  'Full House',
  'Four of a Kind',
  'Straight Flush',
  'Royal Flush'
];

const HandExample: React.FC<{ hand: string }> = ({ hand }) => {
  const cardBase = "w-5 h-7 bg-white border border-parlor-primary/20 rounded-[2px] flex items-center justify-center text-[10px] font-bold text-parlor-primary shadow-sm";
  const smallCard = "w-4 h-6 bg-white border border-parlor-primary/20 rounded-[1px] flex items-center justify-center text-[8px] font-bold text-parlor-primary shadow-sm";

  switch (hand) {
    case 'High Card':
      return (
        <div className="flex -space-x-1">
          <div className={cardBase}>A</div>
        </div>
      );
    case 'One Pair':
      return (
        <div className="flex -space-x-1">
          <div className={cardBase}>K</div>
          <div className={cardBase}>K</div>
        </div>
      );
    case 'Two Pair':
      return (
        <div className="flex -space-x-1">
          <div className={cardBase}>Q</div>
          <div className={cardBase}>Q</div>
          <div className={cardBase}>J</div>
          <div className={cardBase}>J</div>
        </div>
      );
    case 'Three of a Kind':
      return (
        <div className="flex -space-x-1">
          <div className={cardBase}>9</div>
          <div className={cardBase}>9</div>
          <div className={cardBase}>9</div>
        </div>
      );
    case 'Straight':
      return (
        <div className="flex -space-x-1">
          <div className={smallCard}>2</div>
          <div className={smallCard}>3</div>
          <div className={smallCard}>4</div>
          <div className={smallCard}>5</div>
          <div className={smallCard}>6</div>
        </div>
      );
    case 'Flush':
      return (
        <div className="flex -space-x-1">
          <div className={`${smallCard} text-parlor-secondary`}>♥</div>
          <div className={`${smallCard} text-parlor-secondary`}>♥</div>
          <div className={`${smallCard} text-parlor-secondary`}>♥</div>
          <div className={`${smallCard} text-parlor-secondary`}>♥</div>
        </div>
      );
    case 'Full House':
      return (
        <div className="flex -space-x-1">
          <div className={smallCard}>A</div>
          <div className={smallCard}>A</div>
          <div className={smallCard}>A</div>
          <div className={smallCard}>8</div>
          <div className={smallCard}>8</div>
        </div>
      );
    case 'Four of a Kind':
      return (
        <div className="flex -space-x-1">
          <div className={smallCard}>Q</div>
          <div className={smallCard}>Q</div>
          <div className={smallCard}>Q</div>
          <div className={smallCard}>Q</div>
        </div>
      );
    case 'Straight Flush':
      return (
        <div className="flex -space-x-1">
          <div className={smallCard}>9</div>
          <div className={smallCard}>10</div>
          <div className={smallCard}>J</div>
          <div className={smallCard}>Q</div>
          <div className={smallCard}>K</div>
        </div>
      );
    case 'Royal Flush':
      return (
        <div className="flex -space-x-1">
          <div className={smallCard}>10</div>
          <div className={smallCard}>J</div>
          <div className={smallCard}>Q</div>
          <div className={smallCard}>K</div>
          <div className={smallCard}>A</div>
        </div>
      );
    default:
      return null;
  }
};

const SettingsScreen: React.FC = () => {
  const { multipliers, updateMultipliers, handsPlayed } = useGameStore();
  const [pendingMultipliers, setPendingMultipliers] = useState<Record<string, number>>(multipliers);
  const [isDirty, setIsDirty] = useState(false);
  const [isModifiedFromDefault, setIsModifiedFromDefault] = useState(false);

  useEffect(() => {
    setIsDirty(JSON.stringify(multipliers) !== JSON.stringify(pendingMultipliers));
  }, [multipliers, pendingMultipliers]);

  useEffect(() => {
    const defaultMultipliers = gameConfig.multipliers;
    setIsModifiedFromDefault(JSON.stringify(multipliers) !== JSON.stringify(defaultMultipliers));
  }, [multipliers]);

  const handleUpdate = (hand: string, delta: number) => {
    setPendingMultipliers(prev => ({
      ...prev,
      [hand]: Math.max(1, (prev[hand] || 1) + delta)
    }));
  };

  const handleSave = () => {
    updateMultipliers(pendingMultipliers);
    setIsDirty(false);
  };

  const handleReset = () => {
    updateMultipliers(gameConfig.multipliers);
    setPendingMultipliers(gameConfig.multipliers);
    setIsDirty(false);
  };

  return (
    <div className="flex-1 px-4 max-w-lg mx-auto w-full space-y-8 pb-32 overflow-y-auto scrollbar-hide pt-safe mt-6">
      
      {/* Page Title */}
      <div className="px-2">
        <h2 className="text-3xl font-display font-bold text-parlor-primary tracking-tight">Settings</h2>
      </div>

      {/* Section: RULES */}
      <section className="space-y-4">
        <div className="flex items-center gap-3 px-2">
          <BookOpen className="text-parlor-secondary w-5 h-5 opacity-80" strokeWidth={2.5} />
          <h3 className="text-[11px] font-sans font-black text-parlor-on-surface-variant uppercase tracking-[0.25em]">The Rules</h3>
        </div>

        <div className="flex flex-col gap-2">
          <RuleItem icon={<Layers />} text="6 piles: 7 down + 1 up each." />
          <RuleItem icon={<Hand />} text="Start with 4 cards in hand." />
          <RuleItem icon={<Dice5 />} text="Roll dice to take matching pile card." />
          <RuleItem icon={<RotateCcw />} text="Max 3 rolls per round." />
          <RuleItem icon={<HandIcon />} text="Hand limit: 7 cards." />
          <RuleItem icon={<MousePointer2 />} text="Select up to 5 cards & play." />
          <RuleItem icon={<Medal />} text="Score using Poker ranks." />
          <RuleItem icon={<Star />} text="Play 15 hands total." />
        </div>
      </section>

      {/* Section: Hand Multipliers */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <TrendingUp className="text-parlor-secondary w-5 h-5" />
            <h3 className="text-xl font-display font-bold text-parlor-primary">Hand Multipliers</h3>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={handleReset}
              disabled={!isModifiedFromDefault}
              title="Reset to Defaults"
              className={`p-2 rounded-full transition-all ${
                isModifiedFromDefault 
                  ? 'text-parlor-secondary hover:bg-parlor-secondary/10 active:scale-90' 
                  : 'text-parlor-primary/10 cursor-not-allowed'
              }`}
            >
              <ResetIcon className="w-5 h-5" />
            </button>
            <button 
              onClick={handleSave}
              disabled={!isDirty}
              className={`px-5 py-2 rounded-full font-display font-bold text-[10px] tracking-widest transition-all shadow-sm ${
                isDirty 
                  ? 'bg-parlor-secondary text-white hover:shadow-md active:scale-95' 
                  : 'bg-parlor-surface-highest text-parlor-primary/30 cursor-not-allowed'
              }`}
            >
              SAVE
            </button>
          </div>
        </div>

        <div className="space-y-2">
          {HAND_ORDER.map((hand) => (
            <div key={hand} className="bg-parlor-surface-lowest p-3 rounded-xl flex items-center justify-between shadow-sm ring-1 ring-parlor-primary/5">
              <div className="flex items-center gap-4">
                <div className="w-16 flex justify-start">
                  <HandExample hand={hand} />
                </div>
                <div className="flex flex-col">
                  <span className="font-display font-bold text-parlor-primary text-xs uppercase tracking-wider">
                    {hand === 'Royal Flush' ? 'Royal Flush Jackpot' : hand}
                  </span>
                  {hand === 'Royal Flush' && (
                    <div className="flex items-center gap-1 mt-0.5">
                      <Sparkles className="w-3 h-3 text-parlor-secondary" fill="currentColor" />
                      <span className="text-[10px] font-bold text-parlor-secondary uppercase tracking-tighter">Jackpot Hand</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center bg-parlor-surface-container rounded-lg p-1">
                <button 
                  onClick={() => handleUpdate(hand, -1)}
                  className="w-10 h-10 flex items-center justify-center text-parlor-primary hover:bg-parlor-surface-highest rounded-md transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <div className="w-10 text-center font-display font-bold text-parlor-primary text-lg">
                  {pendingMultipliers[hand] || multipliers[hand] || 1}
                </div>
                <button 
                  onClick={() => handleUpdate(hand, 1)}
                  className="w-10 h-10 flex items-center justify-center text-parlor-primary hover:bg-parlor-surface-highest rounded-md transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

const RuleItem: React.FC<{ icon: React.ReactNode, text: string }> = ({ icon, text }) => (
  <div className="flex items-center gap-4 py-3 px-3.5 bg-parlor-surface-low rounded-2xl ring-1 ring-parlor-primary/5 shadow-sm">
    <div className="w-10 h-10 flex items-center justify-center bg-white rounded-full text-parlor-primary shrink-0 shadow-sm">
      {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement, { size: 18, strokeWidth: 2.5 }) : icon}
    </div>
    <p className="text-parlor-on-surface-variant text-[15px] font-bold font-sans tracking-tight leading-snug">{text}</p>
  </div>
);

export default SettingsScreen;
