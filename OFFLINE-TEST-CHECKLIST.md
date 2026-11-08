# Phylab offline test checklist (Android Chrome, HTTPS site)
Tester: ____  Phone: ____  Chrome version: ____

1. **First online visit** – open the site, wait about 10 s. Expect: app loads; the header shows "✓ Works offline" (DevTools: Application › Service Workers shows "activated", Cache Storage has one `phylab-…` cache).
2. **Install** – tap "⤓ Install app" (or Chrome menu › Install app). Expect: icon on home screen; opens full-screen without browser bars.
3. **Offline open** – turn on airplane mode, open the installed app. Expect: home screen and all 9 experiments open; trainer opens.
4. **Offline refresh** – pull to refresh / close and reopen. Expect: no dino page; same content. Open `…/experiments/simple-pendulum-g/` while offline: it loads.
5. **Save offline** – open Simple pendulum › Record, type readings, set Exp. No. and date. Expect: "Saved" status; close and reopen app offline: readings are still there. Print preview works.
6. **Reconnect** – turn airplane mode off. Expect: the "Offline" chip disappears, readings unchanged.
7. **Update** – deploy a new `index.html` (re-run `node tools/build-seo-pages.js` so the cache name changes). Open the app online, wait, then bring it to the foreground. Expect: toast "A new version is ready" › Reload. Expect: new version loads and every saved reading, Exp. No. and date are still present.
8. **Old caches** – DevTools › Cache Storage: only the newest `phylab-…` cache remains after the update.
9. **Storage clearing** – Chrome › Clear site data removes saved readings. This is expected; use a print/PDF copy as backup.
