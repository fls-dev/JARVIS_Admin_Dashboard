# Contributing

Thanks for your interest in JARVIS Admin Dashboard! Feedback, bug reports and pull requests are all welcome.

## Ways to help

- **Design feedback** — open a [design feedback issue](https://github.com/fls-dev/JARVIS_Admin_Dashboard/issues/new?template=design_feedback.yml). Honest opinions are the main reason this repo is public.
- **Bug reports** — use the [bug report form](https://github.com/fls-dev/JARVIS_Admin_Dashboard/issues/new?template=bug_report.yml) with the page, browser and screen width.
- **Ideas and questions** — start a thread in [Discussions](https://github.com/fls-dev/JARVIS_Admin_Dashboard/discussions).
- **Code** — fixes, new pages and components via pull requests.

## Local setup

There is nothing to install. The templates are plain HTML, CSS and JavaScript.

```bash
git clone https://github.com/fls-dev/JARVIS_Admin_Dashboard.git
cd JARVIS_Admin_Dashboard
python3 -m http.server 8080      # or: npx serve .
# open http://localhost:8080/
```

You can also open `templates/aurora/index.html` or `templates/orbital/index.html` straight from disk.

## Guidelines

- **Keep it dependency-free.** No build step, no frameworks, no CDN scripts. Scripts are classic (non-module) so pages keep working from `file://`. three.js is vendored in Orbital.
- **Relative paths only.** The live demo is served from a sub-path (`/JARVIS_Admin_Dashboard/`), so never start a link with `/`.
- **Content lives in `assets/js/data.js`.** Use fictional names, hosts and IDs only (`example.com`, documentation IP ranges).
- **Use the design tokens** in `assets/css/tokens.css` instead of hard-coded colours, radii and timings.
- **Respect reduced motion.** New animations must stop under `prefers-reduced-motion` and the in-app toggle (`html.rm`).
- **Accessibility.** Visible focus states, 44 px touch targets on touch layouts, labels for icon-only buttons, and status colours always paired with text.
- **Check the breakpoints.** 1920, 1440, 1280, 1024, 768 and 390 px with no horizontal scroll and a clean console.
- Follow `.editorconfig`: UTF-8, LF, 2-space indent.

## Commits and pull requests

- Branch from `main`, keep PRs focused on one change.
- Use [Conventional Commits](https://www.conventionalcommits.org/): `feat(orbital): add billing room`, `fix(aurora): inspector overflow at 768px`, `docs: …`, `chore: …`.
- Add before/after screenshots (desktop and 390 px) for visual changes.
- Add a line under **Unreleased** in [`CHANGELOG.md`](CHANGELOG.md) for user-facing changes.

By contributing, you agree that your contributions are licensed under the [MIT License](LICENSE) and that you follow the [Code of Conduct](CODE_OF_CONDUCT.md).
