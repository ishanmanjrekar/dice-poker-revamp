import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const ModernParlorLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full bg-parlor-surface text-parlor-primary selection:bg-parlor-secondary/20 overflow-hidden font-sans">
      {/* Texture Overlay (Simulated Paper) */}
      <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.03] mix-blend-multiply transition-opacity duration-700 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]"></div>

      {/* Main Container - Optimized for 9:16 Portrait */}
      <div className="mx-auto flex h-full min-h-screen w-full max-w-[430px] flex-col bg-parlor-surface-low shadow-2xl transition-all duration-500 ease-in-out md:my-4 md:min-h-[92vh] md:rounded-[40px] md:border-8 md:border-parlor-primary/5">
        
        {/* Editorial Content Wrapper */}
        <div className="flex flex-1 flex-col p-6 pb-safe pt-safe">
          {children}
        </div>

        {/* Tactile Navigation or Footer Area */}
        <footer className="w-full px-6 py-4 flex items-center justify-between border-t border-parlor-primary/5">
           <span className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-40">
             Dice Poker / Modern Parlor
           </span>
           <div className="flex gap-4">
             {/* Future: Settings / Info icons */}
           </div>
        </footer>
      </div>
    </div>
  );
};

export default ModernParlorLayout;
