# JARVIS Orbital — Spatial AI Admin Dashboard

A spatial command deck for an AI agent that runs infrastructure. Nine rooms orbit one living
core (a three.js planet); every page is a set of visionOS-style glass windows floating in a
twilight sky, and every jump between rooms is a camera flight.

Open `index.html` straight from disk (file://). No build step, no server, no CDN: three.js and
the fonts are bundled.

## Concept

| Layer | What it is |
| --- | --- |
| Sky | Fixed twilight gradient: deep navy night, a dawn horizon (sun / coral) at the bottom. |
| Core | `assets/js/scene.js`: shader sphere with a fresnel rim and a dawn terminator, a dotted land shell (Fibonacci points masked by noise), live traffic arcs, an atmosphere, 3 orbit rings, 13 integration satellites, a starfield. |
| Windows | `.win`: glass panels with a bright rim, deep blur and cursor-depth parallax (`data-depth`). |
| Signal | Ice `#8BE9FF` for live and primary, sun `#FFB36B` for heavy or warm, status colours always with a label. |
| Type | Sora (thin 200–300 numerals and headlines) and IBM Plex Mono for data. |

Each room gives the core its own pose (position, scale, ring tilt), so the deck feels like one
space seen from different angles: Operations shows it as a rising horizon, Scheduled hangs it
overhead, Integrations labels its satellites with live provider names.

## Navigation

* **Orbit pill** (bottom centre): shows the current room. Click it or press `G` to unfold a dial
  of nine portals. Hovering a portal previews the next pose of the core; clicking flies there.
  Under 768 px the dial becomes a 3 × 3 bottom sheet with 52 px portals.
* **Top capsules**: brand (→ hub), room breadcrumb with previous / next, live status, ⌘K, alerts.
* **Keys**: `1–9` rooms · `[` `]` previous / next · `G` dial · arrows + Enter inside the dial ·
  `⌘K`, `Ctrl K` or `/` command palette · `Esc` closes overlays.
* **Flights**: internal links are intercepted (`JV.go(href)`): the page fades, the camera flies to
  the target pose, the next page continues the flight from `sessionStorage("jv-flight")`.

## Structure

```
index.html … audit.html     11 pages + _blank.html (copy it to start a new room)
assets/css/
  fonts.css                  @font-face, local woff2
  tokens.css                 colours, glass, type scale, spacing, motion, z-index
  base.css                   reset, sky, scene layer, CSS fallback planet, typography, 12-col grid
  components.css             top capsules, orbit nav, windows, HUD tags, buttons, chips, status,
                             fields, switch, tabs, KPIs, money, meters, ledger, steps, feed,
                             tables, cards, empty/skeleton, charts, drawer, ⌘K, toasts
  pages.css                  one block per room
assets/js/
  vendor/three.min.js        three r149 UMD (the last UMD build; works on file://)
  data.js                    ALL content (demo). Replace with your API.
  core.js                    JV namespace, helpers, icons, event bus, boot queue, JV.go
  motion.js                  reduced motion (OS setting + in-app toggle, html.rm)
  scene.js                   the core: poses, flights, states, satellites, fallback, pause
  nav.js                     top capsules, orbit pill + dial, hotkeys, flight transitions
  render.js                  shared renderers (status, steps bar, ledger row, mark)
  charts.js                  SVG bars / line / spark
  drawer.js toast.js cmdk.js tabs.js live.js parallax.js
  pages/<room>.js            page logic
assets/img/thumbs/           hub thumbnails
```

All scripts are plain IIFEs that add to `window.JV` (ES modules are blocked on file://).
Modules register init functions with `JV.use(fn)`; they run in order after `DOMContentLoaded`.

## Core API

```js
JV.scene.state('idle' | 'think' | 'speak')  // think: faster spin, brighter dots, more arcs; speak: pulsing atmosphere
JV.scene.flyTo('tasks.html')                // returns a Promise, resolves when it is safe to navigate
JV.scene.preview('memory')                  // lean the core toward another room's pose (null = back)
JV.scene.onFrame(t => …)                    // per-frame hook
JV.scene.satScreen(i)                       // {x, y, front} screen position of integration satellite i
JV.go(href)                                 // navigate with a flight
JV.orbit.open() / close()
JV.drawer.open({ kicker, title, sub, body, foot, onOpen })
JV.toast(title, sub, 'ok' | 'warn' | 'err')    // or <button data-toast="Title|Sub|warn">
JV.cmdk.open(query)                          // or any [data-cmdk="query"]
```

Room poses live at the top of `scene.js` (`POSES`, laptop overrides `LAPTOP`, `MOBILE_FX`).
`fx` / `fy` are fractions of the half viewport, `s` is scale, `tx` the ring tilt.

## Adding a room

1. Copy `_blank.html` to `my-room.html`, set `data-page="my-room"` on `<html>`.
2. Add `{ id:'my-room', href:'my-room.html', label:'My room', short:'Mine', count:'…', desc:'…' }`
   to `JV.data.nav` (position = hotkey and place on the dial) and an icon to `JV.icons`.
3. Add a pose to `POSES` in `scene.js`.
4. Put page logic in `assets/js/pages/my-room.js` and include it after the shared scripts.

Layout: `.grid` + `.c-1…12`, breakpoint variants `xl-` (≤1439), `l-` (≤1279), `m-` (≤1023);
everything stacks under 768. Windows: `<section class="win">` with `.win-h` header;
`.win--hi` (ice rim), `.win--sun`, `.win--thin`, `.win--flush`.

## Connecting data

`data.js` is the only content source. All values are demo data; shapes are documented inline. Typical wiring:

* `JV.data.today` + `live.js` → replace `tick()` with your WebSocket / SSE handler; elements with
  `data-live="spend|ops|running|completed|failed|queued|tokens|budget|spendPlain"` repaint.
* `tasks[].steps` = `[name, cost, attempts, state, seconds]`; the steps bar width is cost.
* Integrations (`connections`, `processors`, `catalog`, `catalogTabs`) are plain arrays of demo
  entries: swap them for your provider list.

## Accessibility and resilience

* Reduced motion (OS or ⌘K → "Toggle reduced motion"): the core renders one still frame, no
  flights, no parallax, no satellite labels; all CSS animation is cut.
* No WebGL (or `?nogl`): `html.no-gl`, a CSS planet with rings replaces the canvas.
* The render loop stops when the tab is hidden; the scene dims when you scroll into data.
* 44 px touch targets under 1024 px, focus rings everywhere, focus trap in drawer and ⌘K,
  `aria-current` on the active portal, live regions for toasts and the chat.
* Tested at 1920 / 1440 / 1280 / 1024 / 768 / 390 with no horizontal scroll.

## Author

Designed and built by [fls-dev](https://github.com/fls-dev) · https://github.com/fls-dev. Third-party components and their licenses are listed in `CREDITS.md`.

## License

[MIT](../../LICENSE) © 2026 fls-dev (Pavel Misko).
