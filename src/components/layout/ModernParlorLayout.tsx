import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const ModernParlorLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full bg-parlor-surface text-parlor-primary selection:bg-parlor-secondary/20 flex flex-col items-center justify-center overflow-hidden font-sans">
      {/* Texture Overlay */}
      <div className="pointer-events-none fixed inset-0 z-[100] opacity-[0.03] mix-blend-multiply transition-opacity duration-700 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]"></div>

      {/* Main Container - Strict 9:16 Aspect Ratio */}
      <div className="relative mx-auto flex aspect-[9/16] h-full max-h-[100dvh] w-auto flex-col bg-parlor-surface shadow-2xl transition-all duration-500 ease-in-out md:max-h-[92vh] md:my-[4vh] md:rounded-[40px] md:border-8 md:border-parlor-primary/5 overflow-hidden">
        
        {/* Content Wrapper */}
        <div className="flex-1 overflow-hidden">
          {children}
        </div>

      </div>
    </div>
  );
};

export default ModernParlorLayout;
