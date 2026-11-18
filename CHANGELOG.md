# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.1] - 2026-11-18

### Added

- **Aurora Operations page** (`templates/aurora/operations.html`): queue, throughput chart,
  workers and error list, with the selected step in the inspector. The navigation entry that
  used to show a toast now opens it, and the hub lists it.

### Fixed

- **Aurora:** navigation wheel icons sat off-centre in their circles, the active orb included.
- **Aurora:** wheel items at the ends of the arc were cut off at the screen edge.
- **Aurora:** hub README button opened the raw Markdown file; it now opens the README on GitHub.
- **Aurora:** inspector content spilled out of the panel on short screens; the panel now scrolls.
- **Aurora:** Local chat column, composer and heading were squeezed between 1100 and 1599 px.
- **Aurora:** Audit trail event cards and Integrations model list no longer clip or wrap text in
  narrow columns; the Integrations sky no longer cuts off the last node label.
- **Aurora:** Fine-tuning runs overflowed the viewport horizontally on phones.
- **Aurora:** Overview orchestrator label overlapped the task canvas heading on wide screens, and
  the Memory zoom controls covered the touch hint.
- **Orbital:** Overview live ledger and telemetry feed truncated task titles and step labels on
  tablets and phones; layouts now react to the width of the panel.
- **Orbital:** Tasks tab strip was squashed in the list column, and the cost and duration figures
  collided in the detail panel on tablets.
- **Orbital:** Local chat preset chips overlapped and the composer placeholder was clipped on phones.
- **Orbital:** hub title touched its eyebrow label, portals showed a rectangular focus outline,
  and the Scheduled timeline clipped its time axis by a few pixels.

### Changed

- Regenerated screenshots, thumbnails, covers, banner and social preview. Added Aurora
  Operations screenshots.

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

[Unreleased]: https://github.com/fls-dev/JARVIS_Admin_Dashboard/compare/v1.0.1...HEAD
[1.0.1]: https://github.com/fls-dev/JARVIS_Admin_Dashboard/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/fls-dev/JARVIS_Admin_Dashboard/releases/tag/v1.0.0
