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
    <div className="flex flex-col items-center gap-2 flex-shrink-0" style={{ zIndex: 20 - Number(deck.id), position: 'relative' }}>
      <div className="relative group">
         {/* Deck Stack Visualization */}
         {deck.cards.length > 1 && (
           <div className="absolute top-1 left-1 w-[58px] h-[84px] bg-parlor-primary/10 rounded-lg -z-10 translate-y-1 translate-x-1"></div>
         )}
         {deck.cards.length > 2 && (
           <div className="absolute top-2 left-2 w-[58px] h-[84px] bg-parlor-primary/5 rounded-lg -z-20 translate-y-2 translate-x-2"></div>
         )}

         {topCard ? (
           <div 
             className={`w-[58px] h-[84px] bg-white rounded-lg flex flex-col items-center justify-center border border-parlor-on-surface-variant/20 relative shadow-sm transition-transform ${isClickable ? "hover:ring-4 ring-parlor-primary/20 cursor-pointer active:scale-95" : ""}`}
             onClick={isClickable ? onDraw : undefined}
           >
             {/* Red Dot Badge */}
             <div className="absolute -top-1.5 -right-1.5 z-10 bg-parlor-secondary text-white text-[9px] font-bold h-4.5 w-4.5 min-w-[18px] min-h-[18px] rounded-full flex items-center justify-center shadow-sm">
               {deck.cards.length}
             </div>
             
             {/* Centered Rank and Suit */}
             <span className={`text-xl font-black font-display leading-tight ${topCard.suit === 'Hearts' || topCard.suit === 'Diamonds' ? 'text-parlor-secondary' : 'text-parlor-primary'}`}>
               {topCard.rank}
             </span>
             <img 
               src={`/src/assets/suits/suits-${topCard.suit.toLowerCase()}.png`} 
               alt={topCard.suit} 
               className="w-4 h-4 object-contain mt-0.5 opacity-90"
             />
           </div>
         ) : (
           <div className="w-[58px] h-[84px] rounded-lg bg-parlor-surface-container-high/40 border border-parlor-on-surface-variant/30 flex items-center justify-center">
              <span className="text-xs font-mono opacity-30 text-parlor-primary">×</span>
           </div>
         )}
      </div>

       {/* Deck Label */}
       <span className="text-[9px] font-sans font-bold text-parlor-primary uppercase tracking-tight">
         DECK {deck.id}
       </span>
    </div>
  );
};

export default DeckSpot;
