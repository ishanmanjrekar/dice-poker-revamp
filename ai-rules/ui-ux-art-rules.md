# Dice Poker - UI/UX & Art Rules

This document synthesizes the visual and interaction standards for the "Modern Parlor" aesthetic. It serves as the definitive guide for all UI construction, animations, and asset handling.

## 1. Visual Standards (The "Modern Parlor" Token System)

### Foundation (The "No-Line" Rule)
*   **Separation:** Strictly avoid 1px solid borders for sectioning.
*   **Technique:** Use **Tonal Layering**. Boundaries are defined by shifting background colors:
    *   `surface` (#fcfef1) -> `surface-container-low` (#f3f5e8) -> `surface-container` (#edefe2).
*   **Aesthetic Accents**: 
    - **Ghost Borders**: Use at `3% - 5%` opacity for hero card differentiation.
    - **Placeholders**: Use `border-2` dashed outlines at `80%` opacity for empty card slots.
*   **Depth:** achieved through "Ghost Shadows" (20px-40px blur, 4-8% opacity, tinted with `on-surface`) and **Glassmorphism** (`backdrop-blur: 16px`).

### Color Tokens
*   **Primary/Accent:** Terracotta (#ad3130). Used for major CTAs, hand selection, and critical rank indicators.
*   **Neutral:** Deep Olive (#555a39). Used for text, grounding elements, and secondary interactions.
*   **Card Suits (Custom Assets):**
    - `Hearts`: `suits-hearts.png` (Terracotta #ad3130)
    - `Diamonds`: `suits-diamonds.png` (Terracotta #ad3130)
    - `Spades`: `suits-spades.png` (Deep Olive #555a39)
    - `Clubs`: `suits-clubs.png` (Deep Olive #555a39)
    - **Path:** `src/assets/suits/`
    - **Usage:** Use as high-res foreground assets for cards and UI indicators.

### Typography
*   **Headlines/Display:** **Be Vietnam Pro** (Bold/ExtraBold). Tight tracking, editorial feel.
*   **Technical/Labels:** **Public Sans** (Medium/Bold). Monospace-adjacent feel for numbers, scores, and labels.

---

## 2. The Layered Card System

All cards are composite objects rendered in 5 functional layers (L0-L4):

1.  **L0: Container:** A high-perspective 3D wrapper for the **FLIP** transition.
2.  **L1: Base:** The material background (Standard: Paper). No 100% white; use #ffffff with a subtle texture or gradient.
3.  **L2: Decoration:** Subtle patterns (Grid, Circuitry) that change with skins.
4.  **L3: Content:** The core identity (Rank + Suit). Use high-contrast Be Vietnam Pro for ranks.
5.  **L4: Overlay:** Dynamic state indicators (Selection glowing border in Terracotta, active highlights).

---

## 3. Interface Layout (iPhone 15 Optimized)

*   **Aspect Ratio:** 9:16 (Portrait).
*   **Section Headers**: Use Title Case, **Be Vietnam Pro Black** (12px), and extra top padding (`pt-6`) for clear section definitions.
*   **Decks**: 6 narrow piles arranged horizontally at the top.
    *   **Badges**: Use a Terracotta red dot notification badge on active decks to show the remaining card count. Hide on empty decks.
    *   **Labels**: Display "Decks" (Title Case) below the section header in uppercase Deep Olive.
*   **The Hand:**
    *   Max 7 cards.
    *   Arranged in a wrapping grid (2 rows: 4 top, 3 bottom) to maximize card size on small screens.
*   **Primary Action Area:**
    *   Large, full-width "PLAY SELECTED HAND" button (Terracotta).
    *   Clear state indicating "ROLLS REMAINING" with a tactile "ROLL" button.
*   **Match Log:** Contained in a `surface-container-high` card with rounded corners (24px).
*   **Game Over Overlay**: A full-screen `backdrop-blur-xl` modal with a massive Hero score card (`rounded-2.5rem`), **8xl** scoreboard typography, and prominent action buttons featuring system icons (`RotateCcw`, `BarChart2`).

---

## 4. Animation & Motion Principles

*   **Card Flip:** Must use 3D `rotateY(180deg)` with `backface-visibility: hidden`.
*   **Dealing/Drafting:** Use the **FLIP Technique** (First, Last, Invert, Play) to transition cards from deck piles to the player's hand seamlessly.
*   **Easing:** Standard `cubic-bezier(0.4, 0, 0.2, 1)`.
*   **Selection Feedback:** Cards should "lift" (subtle scale up + increased shadow) when selected.

---

## 5. Dice & Interaction Assets
*   **Dice (Custom)**: Use custom SVGs located at `src/assets/dice/` (`dice-six-faces-[one-six].svg`).
*   **System UI (Lucide)**: Use `Lucide-React` for all interactive system controls. Ensure thin strokes (1.2) for headers and heavier strokes (2.5) for primary action buttons.
*   **Animation:** Use high-contrast color fills (Terracotta or Deep Olive) for pips to ensure visibility.
*   **Haptics:** Trigger a "Tick" (10ms) on card selection and a "Success" vibration on hand play.
*   **Accessibility:** All buttons must have a minimum touch target of `48px x 48px`.
