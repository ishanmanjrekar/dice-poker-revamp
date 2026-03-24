import React from 'react';
import { useGameStore } from '../../core/state';

const HighScoreScreen: React.FC = () => {
  const { history } = useGameStore();

  // Sort history by score, descending
  const sortedScores = [...history].sort((a, b) => b.finalScore - a.finalScore).slice(0, 10);

  // Mock data if no history exists yet
  const displayScores = sortedScores.length > 0 ? sortedScores : [
    { finalScore: 14850, timestamp: Date.now() - 86400000 * 2 },
    { finalScore: 12400, timestamp: Date.now() - 86400000 * 4 },
    { finalScore: 11920, timestamp: Date.now() - 86400000 * 5 },
  ];

  const formatDate = (ts: number) => {
    return new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="flex-1 px-6 max-w-md mx-auto w-full space-y-6 pb-32 overflow-y-auto scrollbar-hide pt-safe mt-6">
      <section className="mb-8 text-center">
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-parlor-primary mb-2 uppercase">High Scores</h1>
        <p className="font-sans text-xs uppercase tracking-[0.2em] text-parlor-on-surface-variant">The Modern Parlor Elite</p>
      </section>

      <div className="space-y-2">
        {displayScores.map((score, index) => {
          if (index === 0) {
            // Rank 1
            return (
              <div key={index} className="bg-parlor-surface-container-lowest rounded-lg p-3 flex items-center justify-between shadow-sm ring-1 ring-parlor-primary/10">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-parlor-secondary flex items-center justify-center font-sans text-white font-bold text-sm">1</div>
                  <p className="font-sans text-[10px] uppercase text-parlor-on-surface-variant tracking-wider font-semibold">{formatDate(score.timestamp)}</p>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold text-lg text-parlor-primary leading-none">{score.finalScore.toLocaleString()}</div>
                  <div className="font-sans text-[8px] text-parlor-secondary font-bold tracking-tighter mt-1">ALL-TIME HIGH</div>
                </div>
              </div>
            );
          }
          if (index < 3) {
            // Rank 2 & 3
            return (
              <div key={index} className="bg-parlor-surface-container-low rounded-lg p-3 flex items-center justify-between ring-1 ring-parlor-primary/5">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-parlor-primary-container flex items-center justify-center font-sans text-white font-bold text-sm">{index + 1}</div>
                  <p className="font-sans text-[10px] uppercase text-parlor-on-surface-variant tracking-wider">{formatDate(score.timestamp)}</p>
                </div>
                <div className="font-mono font-bold text-lg text-parlor-primary">{score.finalScore.toLocaleString()}</div>
              </div>
            );
          }

          // Rank 4+
          return (
            <div key={index} className="bg-parlor-surface-container/30 py-2.5 px-4 rounded-md flex items-center justify-between mt-4">
              <div className="flex items-center gap-4">
                <span className="w-8 text-center font-sans font-medium text-parlor-on-surface-variant text-sm">{index + 1}</span>
                <p className="font-sans text-[10px] uppercase tracking-tighter text-parlor-on-surface-variant">{formatDate(score.timestamp)}</p>
              </div>
              <span className="font-mono font-semibold text-parlor-on-surface">{score.finalScore.toLocaleString()}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HighScoreScreen;
