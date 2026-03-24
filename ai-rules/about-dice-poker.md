# Dice Poker - AI Rules & Context

This file serves as the source of truth for the game's mechanics and rules for any AI working on this project.

## Game Overview
Dice Poker is a solo roguelike-inspired card game that combines poker hand scoring with dice-based card drafting.

## Core Mechanics

### Setup
- **Decks**: 6 decks arranged in a row.
- **Card Distribution**: Each deck contains 7 face-down cards and 1 face-up card on top (total 8 cards per deck, 48 cards total).
- **Starting Hand**: 4 cards dealt from the remaining 4 cards in the standard 52-card deck.
- **Die**: A standard 6-sided die.

### Gameplay Loop
1. **Roll Phase**:
    - Roll the die (up to 5 times per round).
    - Draw the top card from the deck corresponding to the die roll (1-6).
    - Reveal the next card in that deck if available.
    - Hand limit: **7 cards**. Cannot roll if hand is full.
2. **Play Phase**:
    - You can play a hand at any time (even with 0 rolls).
    - Select up to 5 cards from your hand. (minimum is 1)
    - Score is calculated based on Poker ranks (see Scoring).
    - **Discarding**: All selected cards are discarded, even if they don't contribute to the score.
    - **Reset**: A new round starts immediately after playing a hand, resetting the roll count to 0.
3. **Deck Exhaustion**:
    - If all 6 decks are empty, they are refilled using the discard pile and reshuffled. This state should be visually indicated as "Reshuffling".

### Scoring
- **Card Values**:
    - Numbers (2-9): Face value.
    - 10, J, Q, K: 10 points.
    - Ace: 11 points.
- **Hand Score Calculation**:
    - `Base Score = sum of values of cards forming the actual poker hand`.
    - `Final Score = Base Score * Hand Multiplier`.
- **Multipliers**:
    - Royal Flush: 16x
    - Straight Flush: 14x
    - Four of a Kind: 12x
    - Full House: 10x
    - Flush: 8x
    - Straight: 6x
    - Three of a Kind: 4x
    - Two Pair: 3x
    - One Pair: 2x
    - High Card: 1x
- **Game End**: Play exactly **15 hands**. Total score is the sum of all 15 hand scores.

## Technical Requirements
- **Platform Support**: The game is intended to be played on web as well as mobile. It will be hosted on itch.io, and a personal free page on netlify The main aspect ratio is that of a mobile. Use a default iPhone 15 size to build it. More details should be updated here when the architecture file is updated.
- **Scalability**: Architecture should allow for easy addition of new cards, deck types, or modifiers.
- **Configuration**: Game parameters (multipliers, hand count, card values) should be editable easily through a game-config.json file
- **UI/UX**: Update with the relevant md file links once they are created