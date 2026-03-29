import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

interface ScoringAnimationProps {
  handName: string;
  points: number;
  startX: number;
  startY: number;
  onComplete: () => void;
}

const ScoringAnimation: React.FC<ScoringAnimationProps> = ({ 
  handName, 
  points, 
  startX, 
  startY, 
  onComplete 
}) => {
  const [phase, setPhase] = useState<'initial' | 'flying' | 'hidden'>('initial');
  const [targetPos, setTargetPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Phase 1: Show hand name and points at origin
    const timer1 = setTimeout(() => {
      // Find the score counter's position
      const counterEl = document.getElementById('score-counter');
      if (counterEl) {
        const rect = counterEl.getBoundingClientRect();
        setTargetPos({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
      }
      setPhase('flying');
    }, 600); // Wait 600ms for initial display

    // Phase 2: Complete after flight
    const timer2 = setTimeout(() => {
      onComplete();
      setPhase('hidden');
    }, 1200); // 600ms (display) + 600ms (flight)

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  if (phase === 'hidden') return null;

  return createPortal(
    <div className="fixed inset-0 pointer-events-none z-[100]">
      <AnimatePresence>
        {phase === 'initial' && (
          <motion.div
            initial={{ opacity: 0, y: startY, x: startX, scale: 0.5 }}
            animate={{ opacity: 1, y: startY - 60, scale: 1.2 }}
            exit={{ opacity: 0, scale: 1.5 }}
            className="absolute flex flex-col items-center justify-center -translate-x-1/2"
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <span className="text-parlor-secondary font-black font-display text-2xl tracking-tighter uppercase whitespace-nowrap drop-shadow-sm">
              {handName}
            </span>
            <span className="text-parlor-primary font-black font-display text-4xl tracking-tighter drop-shadow-md">
              +{points.toLocaleString()}
            </span>
          </motion.div>
        )}

        {phase === 'flying' && (
          <motion.div
            initial={{ opacity: 1, x: startX, y: startY - 60, scale: 1 }}
            animate={{ 
              opacity: [1, 1, 0],
              x: targetPos.x, 
              y: targetPos.y, 
              scale: 0.4 
            }}
            transition={{ 
              duration: 0.6, 
              ease: [0.16, 1, 0.3, 1],
              opacity: { times: [0, 0.8, 1], duration: 0.6 }
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
          >
            <span className="text-parlor-primary font-black font-display text-4xl tracking-tighter bg-white/80 backdrop-blur-sm px-4 py-1 rounded-full shadow-lg">
              +{points.toLocaleString()}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>,
    document.body
  );
};

export default ScoringAnimation;
