import { useGameStore } from '../../core/state';
import { Trophy, History } from 'lucide-react';

const HighScoreScreen: React.FC = () => {
  const { highScores } = useGameStore();

  // Sort highScores by score, descending (already sorted in state but ensuring here)
  const sortedScores = [...highScores].sort((a, b) => b.score - a.score).slice(0, 10);

  const formatDate = (ts: number) => {
    return new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  if (sortedScores.length === 0) {
    return (
      <div className="flex-1 px-6 max-w-md mx-auto w-full flex flex-col items-center justify-center pb-32">
        <div className="mb-10 bg-parlor-surface-highest/30 p-8 rounded-full inline-flex items-center justify-center ring-1 ring-parlor-primary/5 opacity-40">
          <History className="text-parlor-primary w-14 h-14" strokeWidth={1} />
        </div>
        
        <h1 className="font-display text-3xl font-black tracking-tight text-parlor-primary uppercase mb-3 text-center">
          The Hall is Silent
        </h1>
        
        <p className="font-sans text-parlor-on-surface-variant uppercase tracking-[0.3em] text-[10px] font-bold opacity-70 mb-12 max-w-[260px] leading-relaxed text-center">
          No legends have been written in the stars yet. Record your first destiny to grace these standings.
        </p>

        <button 
          onClick={() => useGameStore.getState().setScreen('game')}
          className="bg-parlor-secondary text-white font-display font-black px-10 py-5 rounded-2xl shadow-xl shadow-parlor-secondary/20 uppercase tracking-[0.2em] text-xs active:scale-95 transition-all"
        >
          Begin Your Tale
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 px-6 max-w-md mx-auto w-full pb-32 overflow-y-auto scrollbar-hide pt-8">
      <section className="mb-8 text-center mt-2">
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-parlor-primary uppercase">
          High Scores
        </h1>
      </section>

      <div className="space-y-2">
        {sortedScores.map((score, index) => {
          if (index === 0) {
            // Rank 1
            return (
              <div 
                key={index} 
                className="bg-parlor-surface-lowest rounded-lg p-3 flex items-center justify-between shadow-sm ring-1 ring-parlor-primary/10"
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-parlor-secondary flex items-center justify-center font-sans text-white font-bold text-sm">
                    1
                  </div>
                  <p className="font-mono text-[10px] uppercase text-parlor-on-surface-variant tracking-wider font-semibold">
                    {formatDate(score.timestamp)}
                  </p>
                </div>
                <div className="text-right">
                  <div className="font-display font-bold text-lg text-parlor-primary leading-none">
                    {score.score.toLocaleString()}
                  </div>
                  <div className="font-sans text-[8px] text-parlor-secondary font-bold tracking-tighter mt-1">
                    ALL-TIME HIGH
                  </div>
                </div>
              </div>
            );
          }
          if (index < 3) {
            // Rank 2 & 3
            return (
              <div 
                key={index} 
                className="bg-parlor-surface-low rounded-lg p-3 flex items-center justify-between ring-1 ring-parlor-primary/5"
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-parlor-primary flex items-center justify-center font-sans text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <p className="font-mono text-[10px] uppercase text-parlor-on-surface-variant tracking-wider">
                    {formatDate(score.timestamp)}
                  </p>
                </div>
                <div className="font-display font-bold text-lg text-parlor-primary">
                  {score.score.toLocaleString()}
                </div>
              </div>
            );
          }

          // Rank 4-10
          return (
            <div 
              key={index} 
              className="bg-parlor-surface-container/30 py-2.5 px-4 rounded-md flex items-center justify-between mt-1"
            >
              <div className="flex items-center gap-4">
                <span className="w-8 text-center font-sans font-medium text-parlor-on-surface-variant text-sm">
                  {index + 1}
                </span>
                <p className="font-mono text-[10px] uppercase tracking-tighter text-parlor-on-surface-variant">
                  {formatDate(score.timestamp)}
                </p>
              </div>
              <span className="font-display font-semibold text-parlor-primary">
                {score.score.toLocaleString()}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HighScoreScreen;
