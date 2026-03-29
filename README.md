# Dice Poker

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

**Dice Poker** is a high-stakes, solo roguelike-inspired card game that blends the tactical drafting of a dice game with the classic scoring of Poker. Built with a premium aesthetic, it offers a fast-paced, addictive solitaire experience optimized for both web and mobile.

## 🃏 The Concept

In Dice Poker, you don't just get dealt a hand—you *craft* it. Roll the dice to draft cards from six unique decks, managing your rolls and hand space to build the ultimate poker ranking. 

## ✨ Key Features

- **Dice-Based Drafting**: Use a standard d6 to draw cards from one of six corresponding decks.
- **Strategic Hand Building**: Manage a hand of up to 7 cards, selecting the best combinations to score big.
- **Premium Aesthetic**: A curated design system featuring glassmorphism, smooth animations, and a sophisticated color palette.
- **High Score System**: Compete against your own best runs with a local Hall of Fame.
- **Fully Configurable**: All game mechanics, including multipliers and card values, are easily adjustable via `game-config.json`.
- **Responsive Design**: Tailored for mobile-first play with a strict 9:16 aspect ratio (optimized for iPhone 15 portrait).

## 🎲 How to Play

1. **Roll Phase**: Roll the die (up to 3 times per round) to draw a card from the matching deck.
2. **Drafting**: Each deck has its own pool of cards. Use your rolls wisely to hunt for the cards you need.
3. **Play Phase**: Select up to 5 cards from your hand to form a poker hand.
4. **Scoring**: Your score is calculated as `Base Score (card values) * Hand Multiplier`.
5. **The Goal**: Play exactly **15 hands** and aim for the highest total score possible.

## 🛠️ Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **State Management**: Zustand (with Persistence)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Feedback**: Custom Haptic Feedback system

## 🚀 Development Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ishanmanjrekar/dice-poker-revamp.git
   cd dice-poker-revamp
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## 🎮 Deployment (Itch.io)

This project includes specialized build rules for **itch.io** deployment to ensure zero-friction playback in embedded iframes.

To create a deployment-ready zip:
```bash
npm run build
# Create a POSIX-compliant zip using bestzip
npx bestzip dice-poker-itch.zip dist/*
```

## 📜 License

[MIT](LICENSE) - See the LICENSE file for details.

---

*Crafted with Google Stitch, Google Antigravity, and ♥️ by Ishan Manjrekar.*
