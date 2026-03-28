# Design System Document

## 1. Overview & Creative North Star
**Creative North Star: The Modern Parlor**

The goal of this design system is to reconcile the warmth of a classic, intellectual space with the precision of high-end modern digital craft. We are moving away from the "SaaS-standard" blue-and-white grid. Instead, we embrace an editorial layout that feels curated, tactile, and intentional.

This design system breaks the "template" look through:
* **Intentional Asymmetry:** Strategic use of whitespace and off-center alignments to create a rhythm that feels human, not robotic.
* **Tonal Depth:** Replacing harsh structural lines with soft shifts in background color.
* **High-Contrast Typography:** Interplay between heavy, grounding headlines and airy, functional body text.

The result is a "Digital Curator" experience—an interface that doesn't just display content but presents it with authority and warmth.

---

## 2. Colors

The palette is rooted in earth tones and cream foundations, designed to reduce eye strain while providing a sophisticated, "paper-like" tactile quality.

### Color Principles
* **The "No-Line" Rule:** 1px solid borders for sectioning are strictly prohibited. Boundaries must be defined solely through background color shifts. For example, a `surface-container-low` section sitting on a `surface` background creates a clear but soft distinction.
* **The "Glass & Gradient" Rule:** To provide visual "soul," use subtle gradients (Primary to Primary-Container) for hero backgrounds. For floating elements, use Glassmorphism (semi-transparent surface colors with a `backdrop-blur: 12px` effect).
* **Surface Hierarchy & Nesting:** Treat the UI as a series of physical layers. Use the `surface-container` tiers (Lowest to Highest) to define importance.

### Core Tokens (Light Mode)
* **Primary (`#3e4324`):** Deep Olive. Use for grounding elements and primary actions.
* **Secondary/Accent (`#ad3130`):** Terracotta. Reserved for CTAs, critical alerts, and high-energy highlights.
* **Background (`#f9fbee`):** Cream. The foundation of the "Modern Parlor."

### Neutral/Surface Tokens
* `surface`: #f9fbee
* `surface-container-low`: #f3f5e8
* `surface-container`: #edefe2
* `surface-container-highest`: #e1e4d7
* `on-surface-variant`: #47473e (Subtle text/icons)
* **Assets & Icons**: 
    - **Custom Game Assets**: Card suits use high-res PNGs (`src/assets/suits/`); dice faces use custom SVGs (`src/assets/dice/`).
    - **System UI Icons**: Powering the "Modern Parlor" interface is `Lucide-React`. Use consistent, thin-stroke (1.2 - 1.5) icons like `Dice5`, `RotateCcw`, and `BarChart2` for overall system cohesion.

---

## 3. Typography

The typography scale is designed to feel like a high-end journal. We pair the modern functionality of **Be Vietnam Pro** with the precision of **Public Sans**.

* **Display & Headlines (Be Vietnam Pro):** These are the "voice" of the brand. Use **ExtraBold** (800) or **Black** (900) with tight letter-spacing to create an authoritative editorial feel.
* **Body (Be Vietnam Pro):** Chosen for its exceptional legibility. Even at smaller sizes, it maintains the clean, inviting feel.
* **Data & Labels (Public Sans / Be Vietnam Pro Black):** Labels should be sharp and high-contrast. Use **Public Sans** for technical data or **Be Vietnam Pro Black** (all-caps with wide tracking) for high-end editorial labels.

### Key Scales
* **Display Hero:** 5rem - 8rem / Be Vietnam Pro / Black (For Game Over/Major States)
* **Display LG:** 3.5rem / Be Vietnam Pro / Bold
* **Headline MD:** 1.75rem / Be Vietnam Pro / Semibold
* **Body MD:** 0.875rem / Be Vietnam Pro / Regular
* **Label LG:** 15px / Be Vietnam Pro / Bold (For Rule Items/Settings)
* **Label MD:** 12px / Be Vietnam Pro / Black (For Section Headers, All Caps, 0.25em tracking)
* **Label SM:** 0.75rem / Public Sans / Medium (All Caps for categorical data/technical tags)

---

## 4. Elevation & Depth

We convey hierarchy through **Tonal Layering** rather than traditional structural lines.

* **The Layering Principle:** Depth is achieved by "stacking" container tiers. Place a `surface-container-lowest` (#ffffff) card on a `surface-container-low` (#f3f5e8) section to create a soft, natural lift.
* **Ambient Shadows:** When a floating effect is required (e.g., a modal or a primary button), shadows must be extra-diffused. Use a 20px–40px blur with an opacity of 4%–8%. The shadow color must be a tinted version of the theme's core depth color.
* **The "Ghost Border" Rule:** To maintain the "Modern Parlor" feel of paper-on-paper, use a very subtle `ring-1` at `3% - 5%` opacity for card differentiation. Never use 100% opaque, high-contrast borders for standard sectioning.
* **Tactile Radius:** Standard containers use **md (12px)** or **lg (16px)**. Hero elements (e.g., the Game Over score card) use **Hero (2.5rem / 40px)** for a modern, distinct silhouette.

---

## 5. Components

### Buttons
* **Primary:** Background: `secondary` (#ad3130); Text: `on-secondary` (#ffffff). Apply a subtle 2px inner-shadow (top-down) to create a "pressed" tactile feel.
* **Secondary:** Background: `primary-container` (#555a39); Text: `on-primary`.
* **Tertiary:** No background. Text: `primary`. Hover state: `surface-container-low`.

### Cards & Lists
* **The Divider Ban:** Strictly forbid 1px lines between list items. Use vertical white space (`spacing-4` or `1.4rem`) or alternating subtle background tints to separate content.
* **Card Styling:** Use `surface-container-lowest` for the card body. No border. Use an ambient shadow only on hover to indicate interactivity.

### Input Fields
* **Style:** Background: `surface-container`; Border: None; Radius: `md` (12px).
* **Active State:** Background stays the same, but the `outline` token appears at 40% opacity with a soft glow.
* **Typography:** Use `label-md` (Public Sans) for labels to give the form a professional, technical edge.

### Chips & Tags
* **Selection Chips:** Use `primary-fixed` (#e1e6bb) backgrounds with `on-primary-fixed` (#191e04) text. This provides a "highlighted paper" look.

---

## 6. Do’s and Don’ts

### Do
* **DO** use ample whitespace (1.4rem+) between sections to let the "Modern Parlor" breathe.
* **DO** use "The Modern Parlor" as a vibe check: Does this look like it belongs in a high-end architectural digest?
* **DO** align text-heavy sections with a 60-character line length for optimal readability.
* **DO** use the Accent color (`terracotta`) sparingly—like a single red chair in an olive-walled room.

### Don't
* **DON'T** use 1px solid black or grey borders to separate sections.
* **DON'T** use generic "drop shadows" (0, 4, 8, black). Use large, tinted ambient blurs.
* **DON'T** crowd the interface. If in doubt, add more whitespace from the `spacing-8` or `spacing-10` tokens.
* **DON'T** use "Pure Black" (#000000) for text. Use `on-surface` (#191d15) to maintain the organic, soft feel.
