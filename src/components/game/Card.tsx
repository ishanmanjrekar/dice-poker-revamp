import React from 'react';
import { motion } from 'framer-motion';
import { Card as CardType } from '../../types/game';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CardProps {
  card: CardType;
  isSelected?: boolean;
  onClick?: () => void;
  className?: string;
}

const Card: React.FC<CardProps> = ({ card, isSelected, onClick, className }) => {
  const isRed = card.suit === 'Hearts' || card.suit === 'Diamonds';
  
  return (
    <div 
      className={cn(
        "relative w-[70px] h-[100px] perspective-1000 cursor-pointer transition-transform duration-300",
        isSelected && "-translate-y-4",
        className
      )}
      onClick={onClick}
    >
      <motion.div
        className="w-full h-full relative transition-all duration-500 preserve-3d"
        animate={{ rotateY: card.isFaceUp ? 0 : 180 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        {/* FRONT: Card Content (L1-L4) */}
        <div className="absolute inset-0 backface-hidden rounded-lg bg-white shadow-parlor flex flex-col p-1.5 overflow-hidden">
          {/* L1: Base Material (handled by bg-white + shadow) */}
          
          {/* L2: Decoration (Future: Skin patterns) */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')]"></div>

          {/* L3: Content (Rank & Suit) */}
          <div className={cn(
            "flex flex-col items-start leading-none",
            isRed ? "text-parlor-secondary" : "text-parlor-primary"
          )}>
            <span className="text-lg font-bold font-display">{card.rank}</span>
            <img 
              src={`/src/assets/suits/suits-${card.suit.toLowerCase()}.png`} 
              alt={card.suit} 
              className="w-3 h-3 object-contain mt-0.5"
            />
          </div>

          {/* Center Suit */}
          <div className="flex-1 flex items-center justify-center">
             <img 
              src={`/src/assets/suits/suits-${card.suit.toLowerCase()}.png`} 
              alt={card.suit} 
              className="w-8 h-8 object-contain opacity-90"
            />
          </div>

          {/* Bottom Right Rank (Inverted) */}
          <div className={cn(
            "flex flex-col items-end leading-none rotate-180",
            isRed ? "text-parlor-secondary" : "text-parlor-primary"
          )}>
            <span className="text-lg font-bold font-display">{card.rank}</span>
            <img 
              src={`/src/assets/suits/suits-${card.suit.toLowerCase()}.png`} 
              alt={card.suit} 
              className="w-3 h-3 object-contain mt-0.5"
            />
          </div>

          {/* L4: Overlay (Selection Glimmer) */}
          {isSelected && (
            <div className="absolute inset-0 border-2 border-parlor-secondary rounded-lg animate-pulse ring-4 ring-parlor-secondary/20"></div>
          )}
        </div>

        {/* BACK: Card Back */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-lg bg-parlor-primary flex items-center justify-center pt-1.5">
           <div className="w-[85%] h-[85%] border border-parlor-surface-low/20 rounded-md flex items-center justify-center relative overflow-hidden">
              {/* Subtle Patterns for Card Back */}
              <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/shattered.png')]"></div>
              <span className="text-parlor-surface-low text-2xl font-bold opacity-30 select-none">DP</span>
           </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Card;
