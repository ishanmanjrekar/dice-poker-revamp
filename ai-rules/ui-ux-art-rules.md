# Dice Poker - UI/UX & Art Rules

This document synthesizes the visual and interaction standards for the "Modern Parlor" aesthetic. It serves as the definitive guide for all UI construction, animations, and asset handling.

## 1. Visual Standards (The "Modern Parlor" Token System)

### Foundation (The "No-Line" Rule)
*   **Separation:** Strictly avoid 1px solid borders for sectioning.
*   **Technique:** Use **Tonal Layering**. Boundaries are defined by shifting background colors:
    *   `surface` (#fcfef1) -> `surface-container-low` (#f3f5e8) -> `surface-container` (#edefe2).
*   **Depth:** achieved through "Ghost Shadows" (20px-40px blur, 4-6% opacity, tinted with `on-surface`) and **Glassmorphism** (`backdrop-blur: 12px`).

### Color Tokens
*   **Primary/Accent:** Terracotta (#ad3130). Used for major CTAs, hand selection, and critical rank indicators.
*   **Neutral:** Deep Olive (#555a39). Used for text, grounding elements, and secondary interactions.
*   **Card Suits:**
    *   `Hearts`/`Diamonds`: Terracotta (#ad3130).
    *   `Spades`/`Clubs`: Deep Olive (#555a39).

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
*   **Header:** Balanced Score on left, Hands count on right. Vertical stacking of labels.
*   **Decks:** 6 narrow piles arranged horizontally at the top.
*   **The Hand:**
    *   Max 7 cards.
    *   Arranged in a wrapping grid (2 rows: 4 top, 3 bottom) to maximize card size on small screens.
*   **Primary Action Area:**
    *   Large, full-width "PLAY SELECTED HAND" button (Terracotta).
    *   Clear state indicating "ROLLS REMAINING" with a tactile "ROLL" button.
*   **Match Log:** Contained in a `surface-container-high` card with rounded corners (24px) and subtle dividers (10% opacity).

---

## 4. Animation & Motion Principles

*   **Card Flip:** Must use 3D `rotateY(180deg)` with `backface-visibility: hidden`.
*   **Dealing/Drafting:** Use the **FLIP Technique** (First, Last, Invert, Play) to transition cards from deck piles to the player's hand seamlessly.
*   **Easing:** Standard `cubic-bezier(0.4, 0, 0.2, 1)`.
*   **Selection Feedback:** Cards should "lift" (subtle scale up + increased shadow) when selected.

---

## 5. Interaction Ethics

*   **Non-Blocking Logic:** UI must never wait for an animation to finish before updating internal game state (unless it’s a critical transition like "Reshuffling").
*   **Haptics:** Trigger a "Tick" (10ms) on card selection and a "Success" vibration on hand play.
*   **Accessibility:** All buttons must have a minimum touch target of `48px x 48px`, regardless of visual size.
