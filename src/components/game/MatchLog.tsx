import React from 'react';
import { ScoreResult } from '../../core/poker-engine';

interface LogEntry extends ScoreResult {
  timestamp: number;
}

interface MatchLogProps {
  history: LogEntry[];
}

const MatchLog: React.FC<MatchLogProps> = ({ history }) => {
  return (
    <section className="space-y-4 w-full">
      <div className="bg-parlor-surface-container/30 rounded-3xl overflow-hidden p-2">
        <div className="px-6 py-4">
          <h2 className="text-[10px] font-bold font-sans text-parlor-on-surface-variant tracking-[0.2em] uppercase opacity-60">
            MATCH LOG
          </h2>
        </div>
        
        <div className="divide-y divide-parlor-primary/5 px-4 pb-4 overflow-y-auto max-h-48 scrollbar-hide">
          {history.length === 0 ? (
            <div className="py-4 text-center">
               <span className="text-[11px] font-sans font-medium text-parlor-on-surface-variant opacity-40 italic">
                 Game Started
               </span>
            </div>
          ) : (
            history.slice().reverse().map((entry, idx) => (
              <div key={entry.timestamp + idx} className="py-4 flex justify-between items-center px-2 animate-in slide-in-from-bottom-2 duration-300">
                <div className="flex flex-col">
                  <span className="text-sm font-sans font-medium text-parlor-primary">
                    Played {entry.handName}
                  </span>
                  <span className="text-[10px] font-mono text-parlor-on-surface-variant opacity-50 mt-0.5">
                    {new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <span className="text-sm font-display font-bold text-parlor-secondary">
                  +{entry.finalScore}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default MatchLog;
