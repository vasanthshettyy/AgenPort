// src/chatbot/SmoothOrb.jsx
// Smooth ThinkingOrb wrapper with crossfading state transitions and pointer parallax

import { useState, useEffect, useRef, memo, Component } from 'react';
import { ThinkingOrb } from 'thinking-orbs';

const VALID_STATES = new Set([
  'working',
  'searching',
  'solving',
  'listening',
  'connecting',
  'weaving',
  'composing',
  'breathing',
  'shaping',
]);

const SPEED_MAP = {
  breathing: 0.7,
  listening: 1.0,
  solving: 1.6,
  composing: 1.2,
  working: 1.0,
  searching: 1.4,
};

class SafeOrbBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(err) {
    console.error('SafeOrb caught rendering error:', err);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-16 h-16 rounded-full bg-content-accent/10 border border-content-accent/30 animate-pulse flex items-center justify-center">
          <div className="w-6 h-6 rounded-full bg-content-accent shadow-[0_0_12px_#00e5ff]" />
        </div>
      );
    }
    return this.props.children;
  }
}

// Stable memoized base orb
const MemoizedOrb = memo(function MemoizedOrb({ state, speed, paused }) {
  const safeState = VALID_STATES.has(state) ? state : 'breathing';
  return (
    <SafeOrbBoundary>
      <ThinkingOrb
        state={safeState}
        size={64}
        theme="dark"
        speed={speed}
        paused={paused}
        aria-label={`Assistant state: ${safeState}`}
      />
    </SafeOrbBoundary>
  );
});

export default function SmoothOrb({
  state = 'breathing',
  scale = 1,
  className = '',
  enableParallax = true,
}) {
  const [currentOrb, setCurrentOrb] = useState({ state, id: 0 });
  const [prevOrb, setPrevOrb] = useState(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Storing information from previous state transition during render (React recommended pattern)
  if (state !== currentOrb.state) {
    setPrevOrb(prefersReducedMotion ? null : currentOrb);
    setCurrentOrb({ state, id: currentOrb.id + 1 });
  }

  // Clear previous orb after crossfade completion (400ms)
  useEffect(() => {
    if (!prevOrb) return;
    const timer = setTimeout(() => {
      setPrevOrb(null);
    }, 400);
    return () => clearTimeout(timer);
  }, [prevOrb]);

  // Pointer parallax (+/-4px desktop only)
  useEffect(() => {
    if (!enableParallax || prefersReducedMotion) return;
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 640;
    if (!isDesktop) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId = null;

    const onMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const nx = (e.clientX / innerWidth) * 2 - 1;
      const ny = (e.clientY / innerHeight) * 2 - 1;
      targetX = nx * 4;
      targetY = ny * 4;
    };

    const loop = () => {
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;
      setParallax({ x: currentX, y: currentY });
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [enableParallax, prefersReducedMotion]);

  const targetSpeed = SPEED_MAP[state] || 1.0;

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center shrink-0 pointer-events-none select-none ${className}`}
      style={{
        transform: `translate3d(${parallax.x.toFixed(2)}px, ${parallax.y.toFixed(2)}px, 0)`,
        transition: prefersReducedMotion ? 'none' : 'transform 100ms ease-out',
      }}
    >
      {/* Scaled Orb Container */}
      <div
        className="relative w-16 h-16 flex items-center justify-center"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          transition: prefersReducedMotion ? 'none' : 'transform 450ms cubic-bezier(0.32, 0.72, 0, 1)',
        }}
      >
        {/* Previous Orb (crossfading out) */}
        {prevOrb && (
          <div
            key={prevOrb.id}
            className="absolute inset-0 flex items-center justify-center"
            style={{
              animation: 'orbFadeOut 400ms cubic-bezier(0.32, 0.72, 0, 1) forwards',
            }}
          >
            <MemoizedOrb
              state={prevOrb.state}
              speed={SPEED_MAP[prevOrb.state] || 1.0}
              paused={prefersReducedMotion}
            />
          </div>
        )}

        {/* Current Active Orb (crossfading in) */}
        <div
          key={currentOrb.id}
          className="absolute inset-0 flex items-center justify-center"
          style={{
            animation: prevOrb
              ? 'orbFadeIn 400ms cubic-bezier(0.32, 0.72, 0, 1) forwards'
              : 'none',
          }}
        >
          <MemoizedOrb
            state={currentOrb.state}
            speed={targetSpeed}
            paused={prefersReducedMotion}
          />
        </div>
      </div>

      <style>{`
        @keyframes orbFadeIn {
          from { opacity: 0; transform: scale(0.97); filter: blur(4px); }
          to   { opacity: 1; transform: scale(1); filter: blur(0px); }
        }
        @keyframes orbFadeOut {
          from { opacity: 1; transform: scale(1); filter: blur(0px); }
          to   { opacity: 0; transform: scale(0.97); filter: blur(4px); }
        }
      `}</style>
    </div>
  );
}
