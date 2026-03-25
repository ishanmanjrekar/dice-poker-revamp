import React, { useEffect, useState } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const ModernParlorLayout: React.FC<LayoutProps> = ({ children }) => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      // Define the fixed "logical" resolution of our game
      const GAME_WIDTH = 540;
      const GAME_HEIGHT = 960; // Exact 9:16 portrait aspect ratio (fits 900-1000px height constraint)
      
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      // Calculate scale required to fit within the viewport (with a tiny 2% padding)
      const widthScale = (windowWidth * 0.98) / GAME_WIDTH;
      const heightScale = (windowHeight * 0.98) / GAME_HEIGHT;
      
      // Pick the smaller scale so it entirely fits the screen. Cap at 1.1 max scale.
      const newScale = Math.min(widthScale, heightScale, 1.1);
      
      setScale(newScale);
    };

    handleResize(); // Initial calculation
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative min-h-[100dvh] w-full bg-parlor-surface/90 text-parlor-primary selection:bg-parlor-secondary/20 flex flex-col items-center justify-center overflow-hidden font-sans">
      
      {/* Scaled Game Container */}
      <div 
        className="relative bg-parlor-surface shadow-2xl rounded-[40px] border-8 border-parlor-primary/5 flex flex-col overflow-hidden transition-transform duration-100 ease-linear"
        style={{ 
          width: '540px',
          height: '960px',
          transform: `scale(${scale})`,
          transformOrigin: 'center center'
        }}
      >
        {/* Internal Texture Overlay (Stays proportional to game size) */}
        <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.03] mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]"></div>

        {/* Content Wrapper */}
        <div className="relative z-10 w-full h-full flex flex-col overflow-hidden">
          {children}
        </div>
      </div>
      
    </div>
  );
};

export default ModernParlorLayout;
