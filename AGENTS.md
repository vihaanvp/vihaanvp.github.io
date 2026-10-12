# AGENTS.md — vihaanvp.me portfolio

Vite 5 + React 18 + TS + Tailwind 3.4 + shadcn/Radix + react-router-dom 6.
SPA hosted on GitHub Pages (user site). Live: https://vihaanvp.me/

## Commands

| Command           | Purpose                              |
|-------------------|--------------------------------------|
| `npm run dev`     | Dev server on port 8080              |
| `npm run build`   | Production build to `dist/` (no tsc) |
| `npm run preview` | Serve `dist/` locally                |
| `npm run lint`    | ESLint                               |

Build with `BASE_PATH=/` for Pages (deploy.yml already does this).
`@` aliases `./src`.

## Structure

- `src/App.tsx` — routes only: `/` Home, `/projects`, `/papermc-plugins`, `/papermc-plugins/:slug`, `*` → Home. `ScrollToTop` on route change.
- `src/pages/` — one file per route (Home, Projects, PaperMcPlugins, PaperMcPluginDetail).
- `src/components/` — Navigation, Footer, SectionTitle, SocialLinks, Scene3D, `ui/` (47 shadcn files — don't hand-edit, regenerate via shadcn instead).
- `src/data/papermcPlugins.ts` — all plugin content. Single source of truth for list + detail pages.
- `src/index.css` — design tokens + keyframes + `.scene3d` layer. All colors HSL.
- `public/404.html` — SPA redirect shim (rafgraph pattern). Must stay ≥512 bytes. `main.tsx` restores `?/path` before render.

## Conventions

- **Palette locked:** midnight black bg (`--background: 0 0% 6%`), sky primary `#74c7ec` (`199 89% 69%`), Poppins. New colors need owner approval.
- **Cards lift, never tilt.** Hover = `translateY(-4px)` only (`index.css`). Tilt was tried and explicitly removed.
- **Zero new runtime deps for visuals.** Backdrop is hand-rolled canvas (see below). Prefer CSS/native over packages.
- **transform/opacity only** for animation. No backdrop-blur on scroll paths.
- `ponytail:` comment marks deliberate simplifications with ceiling + upgrade path — respect it, don't "fix" it unprompted.
- Path alias `@/...` for all src imports.

## Scene3D (canvas backdrop)

`src/components/Scene3D.tsx` — dependency-free 2.5D: perspective starfield + 6 wireframe cubes in sky `rgb(116,199,236)`.

- Fixed `z-0`, `pointer-events: none`; page content wraps in `relative z-10` (App.tsx).
- Perf guards: DPR cap 1.75, star count scales with viewport, `dt` clamp 0.05, offscreen cull.
- `prefers-reduced-motion` renders one static frame (JS) and hides canvas (CSS).
- Mouse parallax lerps (`dt * 3`), never snaps.

## Adding a PaperMC plugin

Edit `src/data/papermcPlugins.ts` only — pages render from it. New entry needs:
`slug, name, tagline, logo (/logos/<slug>.png in public/), mcVersions, license, githubUrl, highlights[], sections[]`.
Optional: `downloads, status ("active" | "discontinued"), wikiUrl, modrinthUrl`.
Section kinds: `text | list | table | images | note`. Detail route picks it up automatically via `:slug`.

## GitHub Pages gotchas

- `BrowserRouter basename={import.meta.env.BASE_URL}` + `vite.config.ts base = BASE_PATH || "/"` — keep both, deploy sets `BASE_PATH=/`.
- Deep links / refreshes on subroutes only work via `404.html` → `?/` → `main.tsx` restore chain. Touch all three together or not at all.
- Deploy: push to `main` triggers `.github/workflows/deploy.yml` (Node 20, `npm ci`, upload `dist`, deploy-pages). No gh-pages branch, no manual dist commits.

## Don't

- Add dependencies for what a few lines of CSS/canvas can do.
- Change routes, basename, base path, or 404 shim without verifying a production build + deep-link refresh.
- Restyle shadcn `ui/` files by hand.
- Commit `dist/` or `node_modules`.
