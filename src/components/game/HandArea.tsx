import React from 'react';
import Card from './Card';
import { Card as CardType } from '../../types/game';

interface HandAreaProps {
  hand: CardType[];
  selectedIds: string[];
  onToggleSelection: (id: string) => void;
}

const HandArea: React.FC<HandAreaProps> = ({ hand, selectedIds, onToggleSelection }) => {
  return (
    <div className="w-full flex-1 flex flex-col gap-6 py-4 px-2 select-none overflow-y-auto scrollbar-hide">
       {/* Instruction Label */}
       <div className="text-center">
         <span className="text-[10px] font-mono uppercase tracking-widest text-parlor-on-surface-variant font-bold">
           Your Hand ({hand.length} / 7)
         </span>
       </div>

       {/* 2-Row Layout: 4 top, 3 bottom */}
       <div className="flex flex-col gap-4 items-center">
          {/* Row 1 (Max 4 cards) */}
          <div className="flex gap-4 justify-center min-h-[90px]">
             {hand.slice(0, 4).map(card => (
               <Card 
                 key={card.id} 
                 card={card} 
                 isSelected={selectedIds.includes(card.id)}
                 onClick={() => onToggleSelection(card.id)}
               />
             ))}
             {/* Empty Placeholder slots to maintain layout */}
             {hand.length < 4 && Array.from({ length: 4 - hand.length }).map((_, i) => (
                <div key={`p1-${i}`} className="w-[70px] h-[100px] border border-dashed border-parlor-primary/10 rounded-lg" />
             ))}
          </div>

          {/* Row 2 (Max 3 cards) */}
          <div className="flex gap-4 justify-center min-h-[90px]">
             {hand.slice(4, 7).map(card => (
               <Card 
                 key={card.id} 
                 card={card} 
                 isSelected={selectedIds.includes(card.id)}
                 onClick={() => onToggleSelection(card.id)}
               />
             ))}
             {Array.from({ length: Math.max(0, 3 - Math.max(0, hand.length - 4)) }).map((_, i) => (
                <div key={`p2-${i}`} className="w-[70px] h-[100px] border border-dashed border-parlor-primary/10 rounded-lg" />
             ))}
          </div>
       </div>
    </div>
  );
};

export default HandArea;
