import { useEffect, useRef } from "react";

// Lightweight canvas 3D: perspective starfield + rotating wireframe cubes.
// Same palette only: sky #74c7ec on midnight black. No dependencies.
// ponytail: 2.5D projection ceiling; upgrade path: three.js + postprocessing when hero needs real geometry/lighting.
const SKY = "116,199,236";

const NEAR = 1.2;
const FAR = 9;

interface Star {
  x: number;
  y: number;
  d: number;
  s: number;
  v: number;
  a: number;
  white: boolean;
}

interface Cube {
  x: number;
  y: number;
  d: number;
  s: number;
  rx: number;
  ry: number;
  vx: number;
  vy: number;
  ph: number;
}

const EDGES: ReadonlyArray<readonly [number, number]> = [
  [0, 1], [1, 3], [3, 2], [2, 0],
  [4, 5], [5, 7], [7, 6], [6, 4],
  [0, 4], [1, 5], [2, 6], [3, 7],
];

const VERTS: ReadonlyArray<readonly [number, number, number]> = [
  [-1, -1, -1], [1, -1, -1], [-1, 1, -1], [1, 1, -1],
  [-1, -1, 1], [1, -1, 1], [-1, 1, 1], [1, 1, 1],
];

const rnd = (a: number, b: number) => a + Math.random() * (b - a);

export default function Scene3D() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    let mx = 0;
    let my = 0;
    let tx = 0;
    let ty = 0;

    const count = Math.min(240, Math.max(90, Math.floor((window.innerWidth * window.innerHeight) / 9000)));
    const stars: Star[] = Array.from({ length: count }, () => ({
      x: rnd(-2.4, 2.4),
      y: rnd(-1.6, 1.6),
      d: rnd(NEAR, FAR),
      s: rnd(0.5, 1.6),
      v: rnd(0.25, 0.8),
      a: rnd(0.3, 0.9),
      white: Math.random() < 0.3,
    }));
    const cubes: Cube[] = Array.from({ length: 6 }, (_, i) => ({
      x: rnd(-2.6, 2.6),
      y: rnd(-1.4, 1.4),
      d: rnd(3.5, 8),
      s: rnd(0.3, 0.65),
      rx: rnd(0, Math.PI),
      ry: rnd(0, Math.PI),
      vx: rnd(0.1, 0.4) * (i % 2 === 0 ? 1 : -1),
      vy: rnd(0.15, 0.5),
      ph: rnd(0, Math.PI * 2),
    }));

    const resize = () => {
      const dpr = Math.min(1.75, window.devicePixelRatio || 1);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMouse = (e: MouseEvent) => {
      tx = (e.clientX / w - 0.5) * 2;
      ty = (e.clientY / h - 0.5) * 2;
    };

    const depthMix = (d: number) => 1 - (d - NEAR) / (FAR - NEAR);

    const frame = (t: number, dt: number) => {
      mx += (tx - mx) * Math.min(1, dt * 3);
      my += (ty - my) * Math.min(1, dt * 3);
      const f = Math.min(w, h) * 0.85;
      ctx.clearRect(0, 0, w, h);

      for (const s of stars) {
        s.d -= dt * s.v;
        if (s.d < NEAR) {
          s.d = FAR;
          s.x = rnd(-2.4, 2.4);
          s.y = rnd(-1.6, 1.6);
        }
        const p = f / s.d;
        const mix = depthMix(s.d);
        const x = w / 2 + s.x * p + mx * 50 * mix;
        const y = h / 2 + s.y * p + my * 38 * mix;
        if (x < -8 || x > w + 8 || y < -8 || y > h + 8) continue;
        const r = s.s * p * 0.012 + 0.3;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = s.white
          ? `rgba(240,240,235,${(s.a * (0.35 + 0.65 * mix)).toFixed(3)})`
          : `rgba(${SKY},${(s.a * (0.3 + 0.7 * mix)).toFixed(3)})`;
        ctx.fill();
      }

      ctx.lineWidth = 1;
      for (const c of cubes) {
        c.rx += c.vx * dt;
        c.ry += c.vy * dt;
        const bob = Math.sin(t * 0.6 + c.ph) * 0.12;
        const cx = Math.cos(c.rx);
        const sx = Math.sin(c.rx);
        const cy = Math.cos(c.ry);
        const sy = Math.sin(c.ry);
        const pts: Array<[number, number, number]> = VERTS.map(([x, y, z]) => {
          const y1 = y * cx - z * sx;
          const z1 = y * sx + z * cx;
          const x2 = x * cy + z1 * sy;
          const z2 = -x * sy + z1 * cy;
          const dd = c.d + z2 * c.s;
          const p = f / dd;
          const mix = depthMix(Math.min(FAR, Math.max(NEAR, dd)));
          return [
            w / 2 + (c.x + x2 * c.s) * p + mx * 42 * mix,
            h / 2 + (c.y + bob + y1 * c.s) * p + my * 32 * mix,
            mix,
          ];
        });
        const alpha = (0.05 + 0.17 * depthMix(c.d)).toFixed(3);
        ctx.strokeStyle = `rgba(${SKY},${alpha})`;
        ctx.beginPath();
        for (const [a, b] of EDGES) {
          ctx.moveTo(pts[a][0], pts[a][1]);
          ctx.lineTo(pts[b][0], pts[b][1]);
        }
        ctx.stroke();
      }
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      resize();
      frame(0, 0);
    } else {
      resize();
      let last = performance.now();
      let t = 0;
      const loop = (now: number) => {
        const dt = Math.min(0.05, (now - last) / 1000);
        last = now;
        t += dt;
        frame(t, dt);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouse);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="scene3d" />;
}
