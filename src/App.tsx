import { useState } from 'react'
import './App.css'

import ModernParlorLayout from './components/layout/ModernParlorLayout'
import GameBoard from './components/game/GameBoard'

function App() {
  return (
    <ModernParlorLayout>
      <GameBoard />
    </ModernParlorLayout>
  )
}

export default App
