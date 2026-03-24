import React, { useEffect } from 'react';
import './App.css';
import ModernParlorLayout from './components/layout/ModernParlorLayout';
import GameBoard from './components/game/GameBoard';
import SettingsScreen from './components/screens/SettingsScreen';
import HighScoreScreen from './components/screens/HighScoreScreen';
import BottomNav from './components/layout/BottomNav';
import { useGameStore } from './core/state';

const App: React.FC = () => {
  const { currentScreen, gameStatus, resetGame } = useGameStore();

  useEffect(() => {
    if (gameStatus === 'idle') {
      resetGame();
    }
  }, [gameStatus, resetGame]);

  return (
    <ModernParlorLayout>
      {currentScreen === 'game' && <GameBoard />}
      {currentScreen === 'settings' && <SettingsScreen />}
      {currentScreen === 'highscore' && <HighScoreScreen />}
      <BottomNav />
    </ModernParlorLayout>
  );
};

export default App;
