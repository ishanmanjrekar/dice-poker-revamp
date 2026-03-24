import React from 'react';
import { useGameStore } from '../../core/state';
import { BookOpen, Layers, Hand, Dices, RefreshCw, Hand as HandIcon, Pointer, Medal, Star } from 'lucide-react';
import gameConfig from '../../../game-config.json';

const SettingsScreen: React.FC = () => {
  return (
    <div className="flex-1 px-4 max-w-lg mx-auto w-full space-y-6 pb-32 overflow-y-auto scrollbar-hide pt-safe mt-6">
      
      {/* Page Title */}
      <div className="px-2">
        <h2 className="text-3xl font-display font-bold text-parlor-primary tracking-tight">Settings</h2>
        <p className="text-parlor-on-surface-variant font-sans mt-1 text-sm">Customize multipliers and review the parlor rules.</p>
      </div>

      {/* Section: RULES */}
      <section className="space-y-4">
        <div className="flex items-center gap-3 px-2">
          <BookOpen className="text-parlor-secondary w-5 h-5" />
          <h3 className="text-sm font-display font-semibold text-parlor-primary uppercase tracking-wider">The Rules</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <RuleItem icon={<Layers />} text="6 piles: 7 down + 1 up each." />
          <RuleItem icon={<Hand />} text={`Start with ${gameConfig.handSize} cards in hand.`} />
          <RuleItem icon={<Dices />} text="Roll dice to take matching pile card." />
          <RuleItem icon={<RefreshCw />} text={`Max ${gameConfig.maxRolls} rolls per round.`} />
          <RuleItem icon={<HandIcon />} text={`Hand limit: ${gameConfig.handSize} cards.`} />
          <RuleItem icon={<Pointer />} text="Select up to 5 cards & play." />
          <RuleItem icon={<Medal />} text="Score using Poker ranks." />
          <RuleItem icon={<Star />} text={`Play ${gameConfig.handLimit} hands total.`} />
        </div>
      </section>

      {/* Section: HandMultiplier (Read-Only for now) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <Medal className="text-parlor-secondary w-5 h-5" />
            <h3 className="text-xl font-display font-semibold text-parlor-primary">Hand Multipliers</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2">
          {Object.entries(gameConfig.multipliers).map(([handName, multiplier]) => (
            <div key={handName} className="bg-parlor-surface-container-lowest p-3 rounded-xl flex items-center justify-between shadow-sm border border-parlor-surface-container">
              <span className="font-sans font-medium text-parlor-on-surface-variant uppercase tracking-wider text-[10px]">
                {handName}
              </span>
              <div className="flex items-center bg-parlor-surface-container rounded-lg px-3 py-1">
                <span className="font-mono font-bold text-parlor-primary text-sm">x{multiplier}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

const RuleItem: React.FC<{ icon: React.ReactNode, text: string }> = ({ icon, text }) => (
  <div className="flex items-center gap-4 p-4 bg-parlor-surface-container-low rounded-xl border border-parlor-surface-container shadow-sm">
    <div className="w-10 h-10 flex items-center justify-center bg-parlor-surface-container-lowest rounded-full text-parlor-primary shrink-0 child-svg-24">
      {icon}
    </div>
    <p className="text-parlor-on-surface text-sm font-medium">{text}</p>
  </div>
);

export default SettingsScreen;
