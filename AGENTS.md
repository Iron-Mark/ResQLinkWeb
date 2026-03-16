# Repository Guidelines

## Project Structure & Module Organization
This repo is a Vite + React + TypeScript frontend. Main app files are `src/main.tsx` and `src/App.tsx`. UI code is organized under `src/components/`, `src/pages/`, `src/styles/`, and `src/utils/`; images/assets are in `src/assets/` and static public files in `public/`. Build output goes to `build/`.

## Build, Test, and Development Commands
- `npm install`: install project dependencies.
- `npm run dev`: start the Vite development server.
- `npm run build`: create a production build.

## Coding Style & Naming Conventions
Use 2-space indentation and TypeScript/TSX modules. React components use `PascalCase`; route/page files may use `kebab-case.tsx` (for example `terms-and-conditions.tsx`). Keep reusable UI in `src/components/` and route-specific composition in `src/pages/`.

## Testing Guidelines
No automated test script is currently configured. If adding tests, add an `npm test` script and note the chosen framework (for example Vitest/RTL) in the PR. For UI changes, include manual verification notes for desktop and mobile layouts.

## Commit & Pull Request Guidelines
History is mostly imperative (`Fix ...`, `Refactor ...`, `Enhance ...`). Keep subject lines concise and scoped to one change. PRs should include screenshots for visual changes, affected pages/components, and any SEO/static asset updates (`public/`, metadata, sitemap/robots).

