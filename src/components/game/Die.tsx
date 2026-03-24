import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DieProps {
  value: number;
  isRolling?: boolean;
}

const Die: React.FC<DieProps> = ({ value, isRolling }) => {
  return (
    <div className="relative w-16 h-16 flex items-center justify-center bg-white rounded-xl shadow-parlor border-none">
      <AnimatePresence mode="wait">
        <motion.img
          key={isRolling ? 'rolling' : value}
          src={`/src/assets/dice/dice-six-faces-${['one', 'two', 'three', 'four', 'five', 'six'][value - 1]}.svg`}
          alt={`Dice ${value}`}
          className="w-10 h-10 object-contain text-parlor-primary"
          initial={{ scale: 0.8, rotate: -45, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          exit={{ scale: 1.2, rotate: 45, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        />
      </AnimatePresence>
      
      {isRolling && (
        <motion.div 
          className="absolute inset-0 bg-parlor-surface/40 backdrop-blur-[2px] rounded-xl"
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ repeat: Infinity, duration: 0.5 }}
        />
      )}
    </div>
  );
};

export default Die;
