# JARVIS Orbital — Spatial AI Admin Dashboard

A spatial admin template for an AI agent that runs infrastructure. Nine rooms orbit one living 3D planet, every page is a set of glass windows in a twilight sky, and every jump between rooms is a camera flight.

## Features

- 11 pages: Overview, Tasks, Operations, Local chat, Fine-tuning, Scheduled work, Memory, Integrations, Audit trail, plus a UI kit and a hub page.
- Orbit navigation: a pill at the bottom unfolds into a dial of nine portals (key `G`). Hovering a portal turns the planet toward that room, and a click flies the camera there. Keys `1–9`, `[` `]` and ⌘K also work.
- Real-time three.js planet with traffic arcs, orbit rings and integration satellites. Each room gives it its own pose.
- Responsive from 1920 down to 390 px. The dial becomes a 3 × 3 bottom sheet on phones, and touch targets are 44 px under 1024 px.
- `prefers-reduced-motion` support (still frame, no flights or parallax) and a static CSS planet when WebGL is unavailable.
- Plain HTML, CSS and JS with no build step. three.js and the fonts are bundled, so it works offline from `file://`. All demo content lives in one `data.js`.

**Stack:** HTML5 · CSS · Vanilla JS · three.js (WebGL) · Sora, IBM Plex Mono

**Tags:** admin dashboard, AI agent, three.js, spatial UI, glassmorphism

## Author

Designed and built by [fls-dev](https://github.com/fls-dev) · https://github.com/fls-dev
