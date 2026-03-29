# Itch.io + Vite/React Deployment Rules

This guide serves as strict instructions for any AI agent or architecture pipeline building and deploying Vite React applications to **itch.io**. Read and implement every rule before deploying to prevent silent failures, CORS errors, layout shifts, or asset 404s.

## 1. Vite Base Path
Itch.io hosts exported web games on a specialized delivery network (`hwcdn.net`) and serves them from deeply nested sub-directories.
- **Rule:** You MUST configure Vite to use relative paths.
- **Implementation:** In `vite.config.ts`, set `base: './'` or `base: ''`. Omitting this will result in all assets (JS, CSS, images) throwing 404 Not Found errors.

## 2. Cross-Origin Module Execution (The "Gray Screen" Bug)
By default, modern Vite injects `<script type="module" crossorigin>` into the `index.html`. Because itch.io's CDN does not predictably serve the necessary `Access-Control-Allow-Origin: *` headers for direct static uploads, the browser's aggressive security sandbox will silently block the JavaScript payload, resulting in a blank screen.
- **Rule:** You MUST strip the `crossorigin` attribute from the production `index.html`.
- **Implementation:** Add a custom inline plugin inside `vite.config.ts`:
  ```typescript
  import { defineConfig } from 'vite';

  export default defineConfig({
    plugins: [
      {
        name: 'remove-crossorigin',
        transformIndexHtml(html) {
          return html.replace(/\scrossorigin(="")?/g, '');
        },
      }
    ],
    base: './'
  });
  ```

## 3. Zip Creation & Pathing (The "Windows Backslash" Bug)
Itch.io server environments are heavily Linux-based. If a user is on Windows, building a zip file using the native PowerShell `Compress-Archive` cmdlet will construct internal ZIP paths using backslashes (e.g., `assets\index.js`), which breaks directory extraction on itch.io. The CDN will extract it as a single flat file named `"assets\index.js"`, causing catastrophic 404 pathing errors in the browser.
- **Rule:** NEVER use Windows-native `Compress-Archive` to package the build directory.
- **Implementation:** Always use a Node.js-based zipping utility like `bestzip` to guarantee POSIX-compliant forward-slash pathways (`/`).
  - Example workflow: `npm i -D bestzip && cd dist && npx bestzip ../game-build.zip *`

## 4. UI Scaling & Centering inside Strict Iframes
Itch.io embeds games inside rigid iframes. When applying dynamic `transform: scale()` to shrink or grow a fixed layout (like a 9:16 mobile canvas) to perfectly fit the iframe viewport, Flexbox can push the layout mathematically off-screen if the original (unscaled) dimensions overflow the iframe container.
- **Rule:** Do NOT use `transform: translate(-50%, -50%) scale(...)` absolute-origin centering blindly for outer wrappers. Use a mathematical Bounding Box pattern.
- **Implementation:**
  Wrap the dynamically scaled game view inside a strictly measured invisible wrapper container.
  ```tsx
  {/* Bounding Box Wrapper */}
  <div className="relative overflow-hidden shrink-0" style={{ width: GAME_WIDTH * scale, height: GAME_HEIGHT * scale }}>
      {/* Scaled Component */}
      <div 
        className="absolute top-0 left-0"
        style={{ width: GAME_WIDTH, height: GAME_HEIGHT, transform: `scale(${scale})`, transformOrigin: 'top left' }}
      >
        {children}
      </div>
  </div>
  ```

## 5. Physical Scrollbar Offset (Windows Safari/Chrome)
Unlike macOS, Windows browsers inject thick physical OS-level scrollbar tracks (~17px) onto containers utilizing `overflow-y: auto`. Within the tight pixel constraints of an embedded game container, this track forcefully cannibalizes width, causing Flexbox to squeeze content uncomfortably off-center, leading to an optical illusion that the game shifted entirely to the left.
- **Rule:** You MUST neutralize physical scrollbar width footprints to preserve absolute flex symmetry within scaling logic.
- **Implementation:** Apply a global hide-scrollbar class to the `index.css`:
  ```css
  /* Enforce zero-width on scrollbars */
  .scrollbar-hide::-webkit-scrollbar {
    display: none !important;
    width: 0 !important;
  }
  .scrollbar-hide {
    -ms-overflow-style: none !important;
    scrollbar-width: none !important;
  }
  ```

## 6. CSS Root Framing
To let generic layout wrappers perfectly hug the dimensions of the itch.io iframe, enforce 100% viewport filling natively and justify your layout components.
- **Implementation:**
  ```css
  #root {
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  ```
