# PWA Package — Steelwool Africa LTD

This package contains a PWA wrapper that embeds your Google Apps Script WebApp via an **iframe**.

## Files included
- `index.html` — PWA shell (iframe-enabled) — embeds your Apps Script WebApp:  
  https://script.google.com/macros/s/AKfycbwwSgCJ7blGTgvDDpIt8opvFuVQV7i9ooEf097gnq9TYs3GJKVIdcBx7eynsnYcbPZI5Q/exec
- `manifest.json` — Web App Manifest
- `service-worker.js` — Basic service worker for offline shell
- `offline.html` — Fallback offline page
- `icons/icon-192.png`, `icons/icon-512.png`
- `README.md` — this file

## How to host on GitHub Pages
1. Create a new GitHub repository (or use an existing one).
2. Commit the files from this package to the repository root.
3. In the repo settings -> Pages, set the source to the `main` (or `gh-pages`) branch root.
4. Visit the GitHub Pages URL (https://<username>.github.io/<repo>/).
5. Open the site in Chrome on Android, open the menu and choose _Add to Home screen_ to install.

## Notes
- The iframe embeds your Apps Script URL. Ensure the Apps Script deployment allows embedding in iframes (HtmlService.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)).
- Because the Apps Script content is cross-origin, the service worker will not intercept / cache the iframe content. The service worker caches the PWA shell only.
- If the Apps Script origin disallows embedding, iframe may be blocked; verify `setXFrameOptionsMode(ALLOWALL)` in your Apps Script server code.

