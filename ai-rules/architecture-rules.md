# Dice Poker - Architecture Rules

This document defines the technical architecture for Dice Poker to ensure scalability, performance, and flexibility for future updates (skins, modifiers, etc.).

## 1. System Layers (Separation of Concerns)

To maintain a scalable codebase, the application should be structured into four distinct layers:

1.  **State (The Store)**: Centralized source of truth for game data (hand, decks, score, current skin). No logic allowed here.
2.  **Logic (The Engine)**: Pure functions that calculate scores, handle deck reshuffling, and manage game progression.
3.  **View (The UI Component)**: React/Vite (or similar) components that render based on the State. Components should be "dumb" and only emit events.
4.  **Assets (The Registry)**: A dynamic system to load/swap card skins, icons, and sounds.

## 2. Layered Card System

Cards must NOT be single static images. To support cosmetics and optimization, cards are rendered as a stack of layers:

| Layer | Content | Purpose |
| :--- | :--- | :--- |
| **0: Container** | Perspective & 3D context | Handles the flip animation container. |
| **1: Base** | Card background/material | Defines textures (Paper, Metal, Glass). |
| **2: Decoration** | Circuit-grid / Patterns | Aesthetic backgrounds (Skin-dependent). |
| **3: Content** | Rank, Suit, Illustrations | The core gameplay identity of the card. |
| **4: Overlays** | Selection glow, active state | Dynamic feedback (e.g., International Orange border). |

## 3. Animation Strategy

Animations must be fluid and performant, utilizing GPU acceleration where possible.

### The FLIP Technique
For "Physical" movement (shuffling, dealing):
- Calculate start and end positions.
- Use CSS `transform` and `transition`.
- **Flip**: Use 3D transforms (`rotateY`) with `backface-visibility: hidden` for smooth card reveals.

### Constraints
- **Duration**: Standard transitions should be `200ms` to `300ms`.
- **Easing**: Use `cubic-bezier(0.4, 0, 0.2, 1)` for a professional, weight-based feel.
- **Batching**: Group card movements to prevent layout thrashing.

## 4. Responsive Viewport Management

To support scaling from Itch.io (WebGL/Browser) to Mobile, the architecture must abandon fixed pixel layouts.

- **Unit System**: Use `vmin`, `vmax`, and `%` for all game board elements. Avoid `px` except for 1px decorative lines.
- **Aspect Ratio Locking**: The game should maintain a core playable area (e.g., 16:9 or 9:16) while extending backgrounds to fill the safe area.
- **Orientation Handling**: The UI MUST dynamically re-layout between **Landscape (Desktop/Tablet)** and **Portrait (Mobile Phone)** without a page reload.

## 5. Platform-Agnostic Input

Input handling must be unified to ensure parity between mouse and touch.

- **Input Layer**: Implement a "Cursor/Pointer" abstraction. All game logic should listen for `onPointerDown` or `onSelect` events rather than `onClick`.
- **Latency**: Ensure `touch-action: manipulation` is used to remove the 300ms delay on mobile browsers.

## 6. Build Targets & Environment Detection

The game should detect its environment to optimize performance and UI:

| Environment | UI Mode | Optimization |
| :--- | :--- | :--- |
| **Itch.io (Browser/WebGL)** | Landscape-First | High-res textures, advanced shaders. |
| **Mobile (WebView/Native)** | Portrait-First | Power-save mode, optimized draw calls. |
| **Antigravity (Dev Browser)** | Debug mode | Hot-reload enabled, console logging. |

## 7. Skinning & Cosmetics

Cosmetics should be implemented via a "Skin Registry":
- A JSON mapping that points `CardID` to specific asset paths for Base, Rank, and Suit layers.
- To unlock a skin, simply update the `currentSkin` key in the **State Layer**.
- All components must listen to this key and re-render their layers accordingly.

## 8. Data Contract (State Schema)

To ensure the **Logic** and **View** layers remain decoupled, the **Zustand** store MUST adhere to the following strict TypeScript interface:

```typescript
export interface Card {
  id: string; // Unique instance ID
  rank: '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A';
  suit: 'Hearts' | 'Diamonds' | 'Spades' | 'Clubs';
  isFaceUp: boolean;
}

export interface HandResult {
  pokerHand: string; // e.g., "Full House"
  points: number;
  multiplier: number;
  timestamp: number;
}

export interface GameState {
  // Game Board
  decks: Card[][]; // 6 decks, each an array of cards
  hand: Card[]; // Current cards held by player (max 7)
  discardPile: Card[];
  
  // Scoring & Progress
  totalScore: number;
  handsPlayed: number; // Max 15
  rollsRemaining: number; // 0 to 3
  
  // History
  matchHistory: HandResult[];
  
  // UI / Cosmetics
  currentSkin: string; // ID from Skin Registry
  isReshuffling: boolean;
  
  // Actions (Logic Layer triggers)
  rollDie: () => void;
  playHand: (selectedCards: Card[]) => void;
  selectCard: (cardId: string) => void;
  setSkin: (skinId: string) => void;
}
```

## 9. Persistence Strategy

The game must persist high scores and unlocked skins across sessions and platforms.

### Storage Abstraction
Implement a `StorageProvider` interface to handle platform-specific I/O:

```typescript
interface StorageProvider {
  save: (key: string, value: any) => Promise<void>;
  load: <T>(key: string) => Promise<T | null>;
}
```

### Platform Implementations:
1.  **Web / Itch.io**: Implement using `window.localStorage`. Note: Check for `quotaExceeded` errors.
2.  **Mobile / Native**: Implement using `AsyncStorage` (React Native) or a native SQLite wrapper.
3.  **Cross-Platform Sync**: High scores should be stored with a `deviceId` and a `timestamp` to resolve conflicts if the user plays on multiple platforms.

## 11. Sensory Feedback Systems (Non-Blocking)

To ensure smooth performance, sensory feedback MUST be decoupled from the main React render cycle and Game Logic.

### AudioManager (Web Audio API - Singleton Pattern)
The `AudioManager` acts as an event-driven service that handles audio buffer management and playback.

```typescript
class AudioManager {
  private static instance: AudioManager;
  private audioContext: AudioContext;
  private buffers: Map<string, AudioBuffer> = new Map();

  private constructor() {
    this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }

  public static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  public async preload(effects: Record<string, string>) {
    // Decode and cache buffers...
  }

  public play(effectId: string, volume: number = 1.0) {
    if (this.audioContext.state === 'suspended') this.audioContext.resume();
    const buffer = this.buffers.get(effectId);
    if (!buffer) return;

    const source = this.audioContext.createBufferSource();
    source.buffer = buffer;
    const gainNode = this.audioContext.createGain();
    gainNode.gain.value = volume;
    source.connect(gainNode).connect(this.audioContext.destination);
    source.start(0);
  }
}
```

### HapticController (Static Utility)
The `HapticController` provides physical feedback on supported devices (Mobile).

```typescript
export const HapticController = {
  vibrate: (pattern: number | number[]) => {
    if ('vibrate' in navigator) {
      // Use requestAnimationFrame to ensure we don't block the main thread
      requestAnimationFrame(() => navigator.vibrate(pattern));
    }
  }
};
```

### The `useFeedback` Hook (React Integration)
To prevent blocking the React render cycle, components interact with feedback via a specialized hook.

```typescript
export const useFeedback = () => {
  const am = AudioManager.getInstance();
  
  return {
    triggerSelection: () => {
      am.play('tick', 0.5);
      HapticController.vibrate(10);
    },
    triggerDeal: () => am.play('deal', 0.8),
    triggerSuccess: () => {
      am.play('success', 1.0);
      HapticController.vibrate([40, 20, 40]);
    }
  };
};
```

### Performance & Blocking Prevention
1. **Asynchronous Preloading**: Load all assets in a separate async initialization phase (Reshuffling state).
2. **GPU-Accelerated Feedback**: Ensure haptics and sounds are triggered via `requestAnimationFrame` or within an event-listener callback to avoid polluting the Logic execution loop.
3. **Audio Swapping**: Use `AudioBufferSourceNode` (one-shot) for effects to avoid the overhead of `HTMLAudioElement` DOM instances.

### Implementation Logic
Sensory systems should subscribe to **State Changes** or an **Event Bus**:
1. **Logic Layer** emits an event (e.g., `CARDS_DEALT`).
2. **AudioManager** receives the event and triggers `deal.wav`.
3. **HapticController** receives the event and triggers a subtle pulse.
*This ensures zero overhead in the `playHand` or `rollDie` logic functions.*

---

## 12. Interlinking
- **Visual Standards**: [art-rules.md](file:///c:/Users/ishan/Documents/GitHub/dice-poker-ag/.gemini/rules/art-rules.md)
- **User Experience**: [ui-ux-rules.md](file:///c:/Users/ishan/Documents/GitHub/dice-poker-ag/.gemini/rules/ui-ux-rules.md)
- **Implementation Guide**: [builder-rules.md](file:///c:/Users/ishan/Documents/GitHub/dice-poker-ag/.gemini/rules/builder-rules.md)
