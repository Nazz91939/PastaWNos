# Repository Guidelines

## Project Structure & Module Organization
- `index.html`: Entry point. Links `styles.css`, `particles.js`, and `script.js`.
- `styles.css`: Global styles for layout, components, and responsive rules.
- `particles.js`: Canvas/visual effects used by the hero background.
- `script.js`: UI behavior (navigation, sliders, counters, category toggles).
- `Images/`: All images and logos (organize into subfolders when adding assets).
- No build system or package manager; plain HTML/CSS/JS served statically.

## Build, Test, and Development Commands
- Local preview (Python): `python -m http.server 8000` then open `http://localhost:8000`.
- VS Code: use the “Live Server” extension from the repo root.
- Optional formatting (Node installed):
  - Check: `npx prettier --check "**/*.{html,css,js}"`
  - Write: `npx prettier --write "**/*.{html,css,js}"`

## Coding Style & Naming Conventions
- Indentation: 2 spaces; UTF-8; LF/CRLF as per OS, but avoid mixed endings.
- Filenames: lowercase-kebab-case (e.g., `about-page.html`, `menu-card.js`). Keep assets under `Images/`.
- CSS: semantic class names; group related rules; avoid inline styles.
- JS: camelCase for variables/functions; avoid global leaks; prefer `const`/`let`; remove debug `console` calls before committing.

## Testing Guidelines
- Manual QA: verify nav anchors, category filters, sliders, counters, and form/links.
- Responsive checks: 320, 768, 1024, and wide desktop. No horizontal scrollbars.
- DevTools: Console free of errors/warnings; network requests load (fonts/CDNs).
- Accessibility: alt text present, visible focus states, sufficient color contrast.
- Performance: run Lighthouse (Chrome) and address major regressions.

## Commit & Pull Request Guidelines
- Commits: imperative, concise, one topic per commit (e.g., `Update menu pricing format`, `Optimize mobile layout`).
- PRs: include a clear description, before/after screenshots for UI changes, and steps to reproduce/test locally. Link related issues when applicable.
- Keep diffs minimal and scoped; update `index.html` links when adding or renaming assets.

## Performance & Asset Tips
- Optimize images before committing; prefer web-friendly sizes and formats. Use `Images/` subfolders (e.g., `Images/menu/`, `Images/icons/`).
- Defer heavy effects; keep third‑party CDN links current in `index.html`.
