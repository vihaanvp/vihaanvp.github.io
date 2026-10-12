# ADR-001: Host SPA on GitHub Pages with 404 redirect shim

## Status
Accepted

## Date
2026-10-12

## Context
Portfolio needs free, zero-ops hosting on a custom domain (vihaanvp.me). Owner already uses GitHub. Site is a client-rendered React SPA with subroutes (`/projects`, `/papermc-plugins/:slug`) that must survive refreshes and deep links.

## Decision
Host on GitHub Pages (user site) via Actions (`deploy.yml`: Node 20, `npm ci`, `BASE_PATH=/ npm run build`, upload `dist`, deploy-pages). Keep `BrowserRouter` with `basename={import.meta.env.BASE_URL}`, and preserve deep links with the rafgraph `404.html` → `?/path` → `history.replaceState` restore chain in `main.tsx`.

## Alternatives Considered

### HashRouter
- Pros: Works on any static host with no shim
- Cons: `#/` URLs look unprofessional on a portfolio meant to impress
- Rejected: Ugly URLs outweigh zero-config benefit

### Vercel / Netlify
- Pros: Native SPA fallback, previews per PR
- Cons: Another account/service to manage; no need for server features
- Rejected: Pages already covers a static SPA; owner authenticated with `gh`

### Static export / one HTML file per route
- Pros: No routing shim at all
- Cons: Loses SPA transitions, duplicates shell markup per page
- Rejected: Current React SPA already built; rewrite cost for no user gain

## Consequences
- Push to `main` deploys; no manual steps, no dist commits.
- `404.html`, `main.tsx` restore block, router basename, and vite `base` must change together or not at all — deep links break silently otherwise.
- Must stay a pure static build: no server code, no runtime secrets.
