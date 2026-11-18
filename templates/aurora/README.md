# JARVIS Aurora — AI Agent Admin Dashboard

A dark, responsive admin template for an AI agent. A living canvas of nodes with flowing edges, an orbit-wheel menu and a slide-out inspector sit on an aurora atmosphere, with a glass sphere as the orchestrator core.

- **Canvas:** nodes with flowing edges, the orbit-wheel navigation and a slide-out inspector.
- **Glass:** the aurora atmosphere, a living glass sphere as the orchestrator core, liquid-glass navigation and panels, a ⌘K palette and the big prompt.

It is plain HTML, CSS and JS: no build step and no dependencies. Fonts load from Google Fonts. Open `index.html` directly from disk or serve the folder.

## Structure

```
template/
├── index.html            hub with thumbnails of every screen
├── ui-kit.html           design system: every component and state
├── overview.html         sphere + prompt, live task canvas, KPI
├── tasks.html            task analytics: revisions, plan/steps (cost, attempts), result JSON, files
├── integrations.html     orchestrator sphere wired to channels/tools/models, catalog “sky”
├── fine-tuning.html      pipeline data→training→adapter→local model, training set, runs (#runs), run config
├── local-chat.html       on-device chat; the sphere reacts to voice and generation
├── memory.html           constellation of facts with provenance
├── scheduled.html        the day as a 24h orbit of routines
├── audit.html            signed audit timeline with payload diff
├── assets/
│   ├── css/
│   │   ├── tokens.css        design tokens (colour, glass, type, radii, motion, layout) + themes + breakpoints
│   │   ├── base.css          reset, atmosphere, glass materials, shell (top bar, wheel, dock, radial, stage), helpers
│   │   ├── components.css    buttons, inputs, toggles, badges, chips, scene/node/edge/vflow, orb, panels,
│   │   │                     inspector + bottom sheet, toast, ⌘K palette, loading/empty/error
│   │   └── pages/<page>.css  page layout only
│   ├── js/
│   │   ├── core.js        $, $$, ico(), pad(), J namespace, J.bp(), J.onResize()
│   │   ├── data.js        DATA: real + demo content, routes (DATA.pages), dock items
│   │   ├── theme.js       J.theme (aurora | midnight), J.motion (reduced-motion: OS + override)
│   │   ├── orb.js         J.Orb(canvas,{energy,size,rings}): the glass sphere
│   │   ├── canvas.js      J.Scene (fit + pan/zoom), P(), bez2(), edge()
│   │   ├── nav.js         J.nav: wheel (desktop) · dock + radial menu (tablet/mobile)
│   │   ├── palette.js     J.palette: ⌘K
│   │   ├── inspector.js   J.inspector: right panel → bottom sheet
│   │   ├── shell.js       J.shell(title): builds the chrome; J.ready(); toast()
│   │   └── pages/<page>.js  page content and behaviour
│   └── img/thumbs/       hub thumbnails used by index.html
```

The wheel also lists an **Operations** section. It is a placeholder route (`ops:null` in `DATA.pages`): clicking it shows a toast until you add a page. See “How to add a page”.

Scripts are classic (non-module), so the pages also work from `file://`. Load them in this order:
`core → data → theme → orb → canvas → nav → palette → inspector → shell → pages/<page>.js`.

## Design tokens

- **Colour:** `--bg #08070D`; ink `--ink`, `--ink-2…4`.
  - Aurora: `--au-violet #6D4AFF`, `--au-pink #FF4F93`, `--au-amber #FF9B45`, `--au-mint #22D3B0`.
  - Gradients: `--grad-aurora`, `--grad-core`.
  - Semantic: `--ok`, `--run`, `--bad`, `--ai`, `--tool`, `--file`, `--idle`.
- **Glass:** three materials. Following Apple’s guidance, glass is used only on navigation and controls, and content stays on standard surfaces.

  | Class | Strength | Blur | Used for |
  |---|---|---|---|
  | `.g1` | thin | 14px | nodes, chips |
  | `.g2` | regular | 28px | panels |
  | `.g3` | thick | 44px | top bar, dock, ⌘K, inspector |

- **Type:**
  - Inter Tight for UI (the template copy is English only).
  - Instrument Serif italic for accents in headings.
  - Geist Mono for data.
- **Themes:** `html[data-theme="aurora" | "midnight"]`. Switch from ⌘K → Preferences.
- **Motion:** honours `prefers-reduced-motion`, and the user can force it from ⌘K, which adds `html.rm`. The orb then renders one still frame, and live tickers and streams stop.

## Responsive behaviour

| Breakpoint | Width | Navigation | Canvas | Inspector |
|---|---|---|---|---|
| XL | ≥ 1600 | orbit wheel (290px) | scenes at 1:1 | right panel 420px |
| L | 1101–1599 | compact wheel (228px) | scenes fit their column; pan/zoom | right panel 360px |
| M (tablet) | 641–1100 | bottom glass dock + **More** → radial menu | scenes fit the width; pinch / ⌘-wheel zoom, drag pan, double-tap reset | **bottom sheet** (peek, then swipe or tap to open) |
| S (mobile) | ≤ 640 | dock + radial menu | **vertical flow** (`.vflow`) for task, step and pipeline canvases; pinch-zoom scenes plus lists for constellation, dial and integrations | bottom sheet |

Visibility helpers: `.d-only` (>1100), `.m-only` (≤1100), `.s-only` (≤640), `.no-s` (hidden ≤640).

## Components (see `ui-kit.html`)

- **Buttons:** `.btn` with `-pri`, `-glass`, `-ghost`, `-danger`, `-sm`, `-lg`; states `.loading` and `[disabled]`.
- **Inputs and small controls:**
  - `.icon-btn`
  - `.field` (`.focus`, `.error`, `.field-msg`)
  - `.ask` (big prompt)
  - `.toggle.on`
  - `.seg`
- **Status:**
  - `.badge` (`.b-ok`, `-run`, `-bad`, `-ai`, `-tool`, `-idle`)
  - `.chip`
  - `.attempt`
- **Canvas:**
  - `.scene > .world`: fixed-size world scaled by `J.Scene`.
  - `.node` (`.ok`, `.run`, `.bad`, `.queued`, `.file`, `.sel`), plus `.group`.
  - `svg.edges` with `edge()`; `.flow` animates the dashes.
  - `.vflow`: vertical flow for narrow screens.
- **Orb:** `.orb > canvas` with `J.Orb()`. Set `orb.energy` (≈ 0.8 idle → 2.6 speaking or typing).
- **Panels:** `.panel`, `.kv`, `.rows/.row`, `.sec-t`.
- **Inspector:** `.inspector` (`.ins-h`, `.ins-act`). Add `data-peek="off"` to hide the sheet peek; the page then opens it with `J.inspector.open(true)`.
- **Overlays:** `toast()`, the ⌘K palette (`J.palette.open()`), the wheel, the dock and the radial menu.
- **States:** `.skeleton`, `.empty` (`.ring`, `h4`), `.err`.

## How to add a page

1. **Add a route.** In `assets/js/data.js`, add the section to `DATA.nav` if it should appear in navigation, and map it in `DATA.pages`. The wheel, dock, radial menu and ⌘K pick it up automatically.
2. **Copy the head and scripts.** Duplicate any page’s `<head>` and the script tail, and point them at `assets/css/pages/<name>.css` and `assets/js/pages/<name>.js`.
3. **Write the body:**
   ```html
   <body data-page="<nav key>">
   <main class="stage">
     <header class="page-h"><h1>Title <em>accent</em></h1><p>meta line</p></header>
     <!-- layout: CSS grid in pages/<name>.css; collapse it at 1599 / 1100 / 640 -->
     <div class="scene" id="scene"><div class="world" id="cv"><svg class="edges" id="ed"></svg></div></div>
     <div class="vflow s-only" id="vf"></div>
   </main>
   <aside class="inspector g3" id="ins"></aside>   <!-- optional -->
   ```
4. **Write the script.** In `pages/<name>.js`, call `J.shell('Title <span>/</span> <em>Sub</em>')` first. Place nodes in world pixels, call `J.Scene($('#scene'),{w,h})`, and draw edges inside `J.ready(()=>edge(...))`.
## Data

All content is demo data, kept in `assets/js/data.js` and the page scripts: tasks, costs, timings, hosts, memory facts, schedules, audit events, training runs and the chat. Names, hosts and IDs are fictional. Replace them with your API responses.

## Author

Designed and built by [fls-dev](https://github.com/fls-dev) · https://github.com/fls-dev. Third-party components and their licenses are listed in `CREDITS.md`.

## License

[MIT](../../LICENSE) © 2026 fls-dev (Pavel Misko).
