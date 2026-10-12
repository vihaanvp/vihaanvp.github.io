# VihaanVP's Hideout

Personal portfolio of Vihaan Parlikar — gamer, coder, robotics enthusiast. Showcases coding projects, robotics builds, and PaperMC plugins, with contact and donation links.

Live: **https://vihaanvp.me/** (GitHub Pages, deploys from `main`)

## Quick Start

1. Clone the repo
2. Install dependencies: `npm install`
3. Run the dev server: `npm run dev` (port 8080)

## Commands

| Command           | Description                        |
|-------------------|------------------------------------|
| `npm run dev`     | Start development server (port 8080) |
| `npm run build`   | Production build to `dist/`        |
| `npm run preview` | Serve `dist/` locally              |
| `npm run lint`    | Run ESLint                         |

Production builds for Pages need `BASE_PATH=/` (handled by CI).

## Architecture

Vite 5 + React 18 + TypeScript + Tailwind 3.4 + shadcn/Radix + react-router-dom 6. SPA with four routes (`/`, `/projects`, `/papermc-plugins`, `/papermc-plugins/:slug`).

- `src/pages/` — one file per route
- `src/components/` — shared UI plus `Scene3D`, the dependency-free canvas backdrop (perspective starfield + wireframe cubes)
- `src/data/papermcPlugins.ts` — all plugin content; list and detail pages render from it
- `public/404.html` + redirect-restore in `src/main.tsx` — SPA routing shim for GitHub Pages
- `.github/workflows/deploy.yml` — build and deploy on push to `main`

Design: midnight black + sky blue (`#74c7ec`), Poppins. See [AGENTS.md](AGENTS.md) for agent conventions and [docs/decisions/](docs/decisions/) for architecture rationale.

## Credits

- [xz/fonts](https://fonts.xz.style/)
- [newcss](https://newcss.net/usage/)
- [spa-github-pages](https://github.com/rafgraph/spa-github-pages) redirect pattern

> ⚠️ **AI disclosure:** significant portions of this website — including code, copy, and design — were generated with AI assistance (Claude Code) and reviewed by the site owner.
