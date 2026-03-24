import React from 'react';
import Card from './Card';
import { Deck } from '../../types/game';

interface DeckSpotProps {
  deck: Deck;
  onDraw?: () => void;
  isClickable?: boolean;
}

const DeckSpot: React.FC<DeckSpotProps> = ({ deck, onDraw, isClickable }) => {
  const topCard = deck.cards.length > 0 ? deck.cards[deck.cards.length - 1] : null;

  return (
    <div className="relative group">
       {/* Deck Stack Visualization */}
       {deck.cards.length > 1 && (
         <div className="absolute top-1 left-1 w-[70px] h-[100px] bg-parlor-primary/10 rounded-lg -z-10 translate-y-1 translate-x-1"></div>
       )}
       {deck.cards.length > 2 && (
         <div className="absolute top-2 left-2 w-[70px] h-[100px] bg-parlor-primary/5 rounded-lg -z-20 translate-y-2 translate-x-2"></div>
       )}

       {topCard ? (
         <Card 
           card={topCard} 
           onClick={isClickable ? onDraw : undefined}
           className={isClickable ? "hover:ring-4 ring-parlor-primary/20" : ""}
         />
       ) : (
         <div className="w-[70px] h-[100px] rounded-lg border-2 border-dashed border-parlor-primary/10 flex items-center justify-center">
            <span className="text-[10px] font-mono opacity-20 uppercase">Empty</span>
         </div>
       )}

       {/* Deck ID / Die Mirror */}
       <div className="mt-2 text-center">
         <span className="inline-block px-2 py-0.5 bg-parlor-primary/5 rounded-full text-[10px] font-mono font-bold text-parlor-primary/40">
           {deck.id}
         </span>
       </div>
    </div>
  );
};

export default DeckSpot;
