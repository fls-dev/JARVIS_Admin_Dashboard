# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2026-11-18

First public release.

### Added

- **JARVIS Aurora** template (`templates/aurora/`): hub, UI kit and 8 app screens
  (Overview, Tasks, Integrations, Fine-tuning with an empty state and a live run, Local chat,
  Memory, Scheduled work, Audit trail). Glass sphere on Canvas 2D, living node canvas,
  orbit-wheel menu, dock and radial menu on tablet and phone, slide-out inspector that becomes
  a bottom sheet, ⌘K palette, aurora and midnight themes.
- **JARVIS Orbital** template (`templates/orbital/`): hub, UI kit and 9 rooms (Overview, Tasks,
  Operations, Local chat, Fine-tuning, Scheduled work, Memory, Integrations, Audit trail) plus
  `_blank.html` starter. three.js planet with per-room poses and camera flights, orbit pill and
  dial of nine portals, ⌘K palette, drawer and toasts, static CSS planet when WebGL is off.
- Responsive layouts from 1920 down to 390 px and `prefers-reduced-motion` support in both templates.
- Landing page and GitHub Pages workflow for the live demo.
- Screenshots of every screen on desktop and mobile in `docs/screenshots/`.
- README (English and Russian), MIT license, contributing guide, code of conduct, security
  policy, issue forms and pull request template.

### Known limitations

- Aurora lists an **Operations** section in its navigation, but the page is a placeholder that
  shows a toast. Orbital includes a full Operations room.

[Unreleased]: https://github.com/fls-dev/JARVIS_Admin_Dashboard/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/fls-dev/JARVIS_Admin_Dashboard/releases/tag/v1.0.0
