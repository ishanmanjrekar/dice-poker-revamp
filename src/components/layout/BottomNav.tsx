import React from 'react';
import { Settings, BarChart, Dices } from 'lucide-react';
import { useGameStore } from '../../core/state';

const BottomNav: React.FC = () => {
  const { currentScreen, setScreen } = useGameStore();

  return (
    <nav className="absolute bottom-0 left-0 w-full z-50 flex justify-around items-center px-6 pb-8 pt-4 bg-parlor-surface/95 backdrop-blur-md border-t border-parlor-primary/5">
      <button 
        onClick={() => setScreen('settings')}
        className={`flex flex-col items-center justify-center group gap-1 transition-opacity ${currentScreen === 'settings' ? 'text-parlor-secondary opacity-100' : 'text-parlor-primary opacity-60 hover:opacity-100'}`}
      >
        <Settings className="w-6 h-6 group-hover:rotate-45 transition-transform" strokeWidth={1.5} />
        <span className="text-[10px] font-bold font-sans uppercase tracking-widest">SETTINGS</span>
      </button>
      
      <button 
        onClick={() => setScreen('game')}
        className={`w-16 h-14 rounded-2xl flex items-center justify-center shadow-xl active:scale-90 transition-all -translate-y-2 ${currentScreen === 'game' ? 'bg-parlor-secondary text-white shadow-parlor-secondary/40' : 'bg-parlor-surface-container text-parlor-primary border border-parlor-primary/10 hover:bg-parlor-primary/5'}`}
      >
        <Dices className="w-8 h-8" strokeWidth={1.5} />
      </button>
      
      <button 
        onClick={() => setScreen('highscore')}
        className={`flex flex-col items-center justify-center group gap-1 transition-opacity ${currentScreen === 'highscore' ? 'text-parlor-secondary opacity-100' : 'text-parlor-primary opacity-60 hover:opacity-100'}`}
      >
        <BarChart className="w-6 h-6 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
        <span className="text-[10px] font-bold font-sans uppercase tracking-widest whitespace-nowrap">HIGH SCORE</span>
      </button>
    </nav>
  );
};

export default BottomNav;
