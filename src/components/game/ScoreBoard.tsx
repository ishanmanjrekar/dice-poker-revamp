import React from 'react';

interface ScoreBoardProps {
  score: number;
  handsPlayed: number;
  totalHands: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, handsPlayed, totalHands }) => {
  return (
    <header className="w-full flex justify-between items-start mb-8 border-b border-parlor-primary/5 pb-4">
       {/* Current Score */}
       <div className="flex flex-col">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-parlor-on-surface-variant">
            Total Score
          </span>
          <span className="text-4xl font-display font-bold text-parlor-primary tracking-tighter">
            {score.toLocaleString()}
          </span>
       </div>

       {/* Hand Count Progress */}
       <div className="flex flex-col items-end">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-parlor-on-surface-variant">
            Hands
          </span>
          <div className="flex items-baseline gap-1">
             <span className="text-4xl font-display font-bold text-parlor-primary tracking-tighter">
               {handsPlayed}
             </span>
             <span className="text-xl font-display font-bold text-parlor-primary/20">
               / {totalHands}
             </span>
          </div>
       </div>
    </header>
  );
};

export default ScoreBoard;
