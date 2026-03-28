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
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={`slot-1-${i}`} id={`hand-slot-${i}`} className="relative">
              {hand[i] ? (
                <Card
                  card={hand[i]}
                  isSelected={selectedIds.includes(hand[i].id)}
                  onClick={() => onToggleSelection(hand[i].id)}
                />
              ) : (
                <div className="w-[70px] h-[100px] border-2 border-dashed border-parlor-primary/80 rounded-xl" />
              )}
            </div>
          ))}
        </div>

        {/* Row 2 (Max 3 cards) */}
        <div className="flex gap-4 justify-center min-h-[90px]">
          {Array.from({ length: 3 }).map((_, i) => {
            const index = i + 4;
            return (
              <div key={`slot-2-${i}`} id={`hand-slot-${index}`} className="relative">
                {hand[index] ? (
                  <Card
                    card={hand[index]}
                    isSelected={selectedIds.includes(hand[index].id)}
                    onClick={() => onToggleSelection(hand[index].id)}
                  />
                ) : (
                  <div className="w-[70px] h-[100px] border-2 border-dashed border-parlor-primary/50 rounded-xl" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HandArea;
