// src/chatbot/Orb.jsx
// Engine-based canvas orb — single 140px canvas, imperative setState/setSpeed API
// Built on thinking-orbs/engine; NO <ThinkingOrb>, NO hard cuts, full particle morph.

import { useRef, useEffect, useImperativeHandle, forwardRef, memo } from 'react';
import {
  MODE_FRAMES,
  resolvePreset,
  paintFrame,
  finalizeFrame,
} from 'thinking-orbs/engine';

// scaleCounts is not exported by thinking-orbs/engine — implement manually
// opts contains numeric count-like fields; we scale them up for the larger 140px canvas
function scaleCounts(opts, factor) {
  if (!opts) return opts;
  const out = { ...opts };
  // Known count fields used by the engine presets
  const countFields = ['count', 'dotCount', 'lineCount', 'ringCount', 'segmentCount', 'points', 'arms'];
  for (const f of countFields) {
    if (typeof out[f] === 'number') out[f] = Math.round(out[f] * factor);
  }
  return out;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const S = 140; // CSS px; never reassigned
const TINT = { r: 0, g: 229, b: 255 };
const N_MAX = 520;
const COUNT_SCALE = 1.45; // tune: 1.3–1.6
const SPEED_TARGETS = {
  breathing: 0.7,
  listening: 1.0,
  solving: 1.6,
  composing: 1.2,
  working: 1.0,
  searching: 1.4,
  connecting: 1.0,
  weaving: 1.0,
  shaping: 1.0,
};
const VALID_STATES = new Set(Object.keys(SPEED_TARGETS));

function clampState(s) {
  return VALID_STATES.has(s) ? s : 'breathing';
}

// ─── easing ───────────────────────────────────────────────────────────────────
function easeInOutCubic(p) {
  return p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
}

// ─── Scatter seeds (pre-computed, golden-angle, never random per frame) ───────
const SCATTER_VECS = new Float32Array(N_MAX * 2);
for (let i = 0; i < N_MAX; i++) {
  const a = (i * 2.399963) % (Math.PI * 2);
  SCATTER_VECS[i * 2] = Math.cos(a);
  SCATTER_VECS[i * 2 + 1] = Math.sin(a);
}

// ─── Pre-allocated particle pool ─────────────────────────────────────────────
function makePool(n) {
  return Array.from({ length: n }, () => ({ x: 0, y: 0, z: 0, r: 0, white: 0, a: 0 }));
}
const DOTS_BLEND = makePool(N_MAX);

// ─── Preset cache ─────────────────────────────────────────────────────────────
const presetCache = {};
function getPreset(state) {
  if (!presetCache[state]) {
    const { mode, opts } = resolvePreset(state, 64);
    presetCache[state] = { mode, opts: scaleCounts(opts, COUNT_SCALE) };
  }
  return presetCache[state];
}

// ─── Sort dots by polar angle for morph matching ─────────────────────────────
function sortByPolar(dots, n) {
  const cx = S / 2, cy = S / 2;
  const withAngle = dots.slice(0, n).map((d, i) => ({
    i,
    angle: Math.atan2(d.y - cy, d.x - cx),
    r2: (d.x - cx) ** 2 + (d.y - cy) ** 2,
  }));
  withAngle.sort((a, b) => a.angle - b.angle || a.r2 - b.r2);
  return withAngle.map((w) => w.i);
}

// ─── Main Component ───────────────────────────────────────────────────────────
const Orb = memo(
  forwardRef(function Orb({ initialState = 'breathing' }, ref) {
    const canvasRef = useRef(null);
    // All mutable state lives in this ref — zero React state in the rAF loop
    const st = useRef(null);

    // Expose imperative API
    useImperativeHandle(
      ref,
      () => ({
        setState(name) {
          const s = st.current;
          if (!s) return;
          const next = clampState(name);
          if (s.reduced) {
            // Reduced motion: 200ms opacity crossfade + static frame
            s.state = next;
            s.canvas.style.transition = 'opacity 200ms ease';
            s.canvas.style.opacity = '0';
            setTimeout(() => {
              if (!st.current) return;
              s.state = next;
              s.canvas.style.opacity = '1';
            }, 100);
            return;
          }
          // Determine from-dots: either current blended (mid-morph) or last steady frame
          let fromDots, fromCount;
          if (s.morph) {
            // snapshot current blended
            fromCount = s.morph.blendCount;
            fromDots = s.morph.blendSnap || makePool(N_MAX);
            for (let i = 0; i < fromCount; i++) {
              const b = DOTS_BLEND[i];
              fromDots[i] = { x: b.x, y: b.y, z: b.z, r: b.r, white: b.white, a: b.a };
            }
          } else {
            fromCount = s.steadyCount;
            fromDots = makePool(N_MAX);
            for (let i = 0; i < fromCount; i++) {
              const d = s.steadyDots[i];
              fromDots[i] = { x: d.x, y: d.y, z: d.z, r: d.r, white: d.white, a: d.a };
            }
          }
          const prevState = s.state;
          s.state = next;
          const isSolving = next === 'solving';
          const isRelease = prevState === 'solving' && next === 'composing';
          const duration = isSolving ? 450 : isRelease ? 900 : 800;
          const scatter = isSolving ? 0.04 : isRelease ? 0.14 : 0.10;
          s.morph = {
            fromDots,
            fromCount,
            fromState: prevState,
            toState: next,
            progress: 0,
            duration,
            scatter,
            blendSnap: null,
            blendCount: 0,
          };
        },
        setSpeed(x) {
          if (st.current) st.current.speedTarget = x;
        },
      }),
      []
    );

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const reduced =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // ── Canvas setup (once) ──────────────────────────────────────────────
      const dpr = Math.min(2, (typeof devicePixelRatio !== 'undefined' ? devicePixelRatio : 1) || 1);
      canvas.width = Math.round(S * dpr);
      canvas.height = Math.round(S * dpr);
      canvas.style.width = S + 'px';
      canvas.style.height = S + 'px';
      const ctx = canvas.getContext('2d');
      ctx.scale(dpr, dpr);

      // ── Shared mutable state ─────────────────────────────────────────────
      const s = {
        canvas,
        ctx,
        reduced,
        state: clampState(initialState),
        phases: {}, // per-state phase clocks
        speedNow: SPEED_TARGETS[clampState(initialState)] || 1.0,
        speedTarget: null,
        morph: null,
        steadyDots: makePool(N_MAX),
        steadyCount: 0,
        paused: false,
        rafId: null,
        lastTime: null,
        // Dev perf
        frameTimes: import.meta.env.DEV ? [] : null,
        perfLogged: false,
      };
      st.current = s;

      let paused = false;

      // ── Pause on visibility / intersection ───────────────────────────────
      const observer = new IntersectionObserver((entries) => {
        paused = !entries[0].isIntersecting;
        s.paused = paused;
      });
      observer.observe(canvas);
      const onVisChange = () => { paused = document.hidden; s.paused = paused; };
      document.addEventListener('visibilitychange', onVisChange);

      // ── rAF loop ──────────────────────────────────────────────────────────
      let rafId;
      function tick(now) {
        rafId = requestAnimationFrame(tick);
        s.rafId = rafId;
        if (paused) return;

        const dt = s.lastTime == null ? 0 : Math.min((now - s.lastTime) / 1000, 0.1);
        s.lastTime = now;

        const t0 = import.meta.env.DEV ? performance.now() : 0;

        // ── Speed easing (damped ~500ms) ───────────────────────────────────
        const target = s.speedTarget != null
          ? s.speedTarget
          : SPEED_TARGETS[s.state] || 1.0;
        if (dt > 0) {
          s.speedNow += (target - s.speedNow) * (1 - Math.exp(-dt / 0.5));
        }

        // ── Advance all state phase clocks ────────────────────────────────
        for (const st2 of VALID_STATES) {
          if (s.phases[st2] == null) s.phases[st2] = 0;
          // Use a fixed base speed per state; multiply by speedNow only for active state
          const isActive = st2 === s.state || (s.morph && (st2 === s.morph.fromState || st2 === s.morph.toState));
          if (isActive) {
            s.phases[st2] += dt * (SPEED_TARGETS[st2] || 1.0) * (st2 === s.state ? s.speedNow / (SPEED_TARGETS[s.state] || 1) : 1.0);
          }
        }

        ctx.clearRect(0, 0, S, S);

        if (reduced) {
          // Static frame
          const { mode, opts } = getPreset(s.state);
          const frame = MODE_FRAMES[mode](S, 0.6, opts);
          finalizeFrame(frame);
          paintFrame(ctx, frame, true, TINT);
        } else if (s.morph) {
          // ── MORPH FRAME ─────────────────────────────────────────────────
          const m = s.morph;
          if (dt > 0) m.progress = Math.min(1, m.progress + dt / (m.duration / 1000));
          const p = easeInOutCubic(m.progress);

          const { mode: modeA, opts: optsA } = getPreset(m.fromState);
          const { mode: modeB, opts: optsB } = getPreset(m.toState);
          const rawA = MODE_FRAMES[modeA](S, s.phases[m.fromState] || 0, optsA);
          const rawB = MODE_FRAMES[modeB](S, s.phases[m.toState] || 0, optsB);

          const dotsA = rawA.dots;
          const dotsB = rawB.dots;
          const cntA = dotsA.length;
          const cntB = dotsB.length;
          const N = Math.min(Math.max(cntA, cntB), N_MAX);

          // Sort by polar angle for neighbour mapping
          const orderA = sortByPolar(m.fromDots.length >= cntA ? m.fromDots : dotsA, Math.min(m.fromCount, N_MAX));
          const orderB = sortByPolar(dotsB, cntB);

          for (let i = 0; i < N; i++) {
            const ai = orderA[Math.floor((i * orderA.length) / N)];
            const bi = orderB[Math.floor((i * orderB.length) / N)];
            const dA = m.fromDots[ai] || dotsA[ai % dotsA.length] || dotsA[0];
            const dB = dotsB[bi] || dotsB[0];

            const sx = SCATTER_VECS[i * 2] * m.scatter * S * Math.sin(Math.PI * p);
            const sy = SCATTER_VECS[i * 2 + 1] * m.scatter * S * Math.sin(Math.PI * p);

            // particles with no partner fade in/out
            const aA = i < m.fromCount ? dA.a : dA.a * (1 - p);
            const aB = i < cntB ? dB.a : dB.a * p;

            const bd = DOTS_BLEND[i];
            bd.x = dA.x * (1 - p) + dB.x * p + sx;
            bd.y = dA.y * (1 - p) + dB.y * p + sy;
            bd.z = dA.z * (1 - p) + dB.z * p;
            bd.r = dA.r * (1 - p) + dB.r * p;
            bd.white = dA.white * (1 - p) + dB.white * p;
            bd.a = aA * (1 - p) + aB * p;
          }

          m.blendCount = N;
          // Store snapshot ref (share DOTS_BLEND array — will be copied on interrupt)
          m.blendSnap = DOTS_BLEND;

          // Lines: only for 'connecting'/'web'; fade first 30%, enter last 30%
          let blendedLines = [];
          if (modeA === 'web' || modeB === 'web') {
            if (modeA === 'web' && p < 0.3) {
              blendedLines = rawA.lines.map((l) => ({ ...l, a: l.a * (1 - p / 0.3) }));
            } else if (modeB === 'web' && p > 0.7) {
              blendedLines = rawB.lines.map((l) => ({ ...l, a: l.a * ((p - 0.7) / 0.3) }));
            }
          }

          const blendFrame = { dots: DOTS_BLEND.slice(0, N), lines: blendedLines };
          finalizeFrame(blendFrame);
          paintFrame(ctx, blendFrame, true, TINT);

          if (m.progress >= 1) {
            // Snapshot steady state
            const steady = MODE_FRAMES[modeB](S, s.phases[m.toState] || 0, optsB);
            const cnt = Math.min(steady.dots.length, N_MAX);
            for (let i = 0; i < cnt; i++) {
              const d = steady.dots[i];
              s.steadyDots[i] = { x: d.x, y: d.y, z: d.z, r: d.r, white: d.white, a: d.a };
            }
            s.steadyCount = cnt;
            s.morph = null;
          }
        } else {
          // ── STEADY FRAME ─────────────────────────────────────────────────
          const { mode, opts } = getPreset(s.state);
          const frame = MODE_FRAMES[mode](S, s.phases[s.state] || 0, opts);
          // Snapshot for interrupt
          const cnt = Math.min(frame.dots.length, N_MAX);
          for (let i = 0; i < cnt; i++) {
            const d = frame.dots[i];
            s.steadyDots[i] = { x: d.x, y: d.y, z: d.z, r: d.r, white: d.white, a: d.a };
          }
          s.steadyCount = cnt;
          finalizeFrame(frame);
          paintFrame(ctx, frame, true, TINT);
        }

        // ── Dev perf logging ──────────────────────────────────────────────
        if (import.meta.env.DEV && s.frameTimes && !s.perfLogged) {
          s.frameTimes.push(performance.now() - t0);
          if (s.frameTimes.length >= 300) { // ~5s at 60fps
            const sorted = [...s.frameTimes].sort((a, b) => a - b);
            const p95 = sorted[Math.floor(sorted.length * 0.95)];
            console.log(`[Orb] p95 frame cost: ${p95.toFixed(2)}ms (${s.frameTimes.length} frames)`);
            s.perfLogged = true;
          }
        }
      }

      rafId = requestAnimationFrame(tick);
      s.rafId = rafId;

      return () => {
        cancelAnimationFrame(rafId);
        observer.disconnect();
        document.removeEventListener('visibilitychange', onVisChange);
        st.current = null;
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <canvas
        ref={canvasRef}
        aria-label="Assistant orb"
        style={{ display: 'block', background: 'transparent' }}
      />
    );
  })
);

export default Orb;
