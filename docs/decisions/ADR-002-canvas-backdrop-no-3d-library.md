# ADR-002: Hand-rolled canvas 3D backdrop instead of a 3D library

## Status
Accepted

## Date
2026-10-12

## Context
Owner asked for a "3D animated website" on the existing midnight-black + sky-blue palette, same routes and project flow. Effect must run behind all routes, stay at 60fps on modest hardware, respect `prefers-reduced-motion`, and not jeopardize the GitHub Pages static build.

## Decision
`src/components/Scene3D.tsx`: dependency-free canvas 2.5D — perspective starfield plus 6 rotating wireframe cubes, drawn in sky `rgb(116,199,236)` with depth-based alpha. Fixed `z-0` layer, `pointer-events: none`; content wraps in `relative z-10`.

## Alternatives Considered

### three.js + react-three-fiber (+ postprocessing)
- Pros: Real geometry, lighting, richer scenes; upgrade path if hero ever needs it
- Cons: ~500KB+ bundle for a backdrop, heavier GPU use, more failure modes on Pages
- Rejected: Overkill for ambient background; kept as documented upgrade path (`ponytail:` comment in file)

### CSS-only parallax / animated gradients
- Pros: Zero JS, compositor-cheap
- Cons: Can't do perspective depth drift + rotating wireframes convincingly
- Rejected: Doesn't deliver the "3D" ask

### Video / Lottie background
- Pros: Author any look once
- Cons: Large asset download, no mouse parallax, autoplay/motion-preference handling is clumsier
- Rejected: Heavier page, less interactive

## Consequences
- Zero new dependencies from the 3D work; bundle impact negligible.
- Perf guards are load-bearing, not optional: DPR cap 1.75, viewport-scaled star count, `dt` clamp 0.05, offscreen cull, transform/opacity-only card hover (`translateY(-4px)`, tilt explicitly removed per owner).
- Reduced-motion users get one static frame (JS) and hidden canvas (CSS).
- Ceiling is 2.5D projection — if hero ever needs real geometry/lighting, revisit three.js per the `ponytail:` note.
