// src/chatbot/ChatbotLauncher.jsx
// Floating launcher button for the portfolio chatbot with lazy-loaded panel & orbs

import { useState, useEffect, useRef, Component } from 'react';

// Error boundary to prevent any chat panel error from affecting the main portfolio
class ChatErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(err) {
    console.error('ChatPanel ErrorBoundary caught error:', err);
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

// ─── Module-level Single Load Promise ─────────────────────────────────────────
let panelPromise = null;
let isPanelLoaded = false;
let CachedChatPanel = null;

function loadPanel() {
  if (panelPromise) return panelPromise;
  panelPromise = import('./ChatPanel.jsx')
    .then((mod) => {
      isPanelLoaded = true;
      CachedChatPanel = mod.default;
      return mod.default;
    })
    .catch((err) => {
      // Clear cached promise on rejection so next click retries
      panelPromise = null;
      isPanelLoaded = false;
      CachedChatPanel = null;
      throw err;
    });
  return panelPromise;
}

export default function ChatbotLauncher() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showRing, setShowRing] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [LoadedPanel, setLoadedPanel] = useState(() => CachedChatPanel);

  const ringTimerRef = useRef(null);
  const ringShownTimeRef = useRef(0);
  const errorTimerRef = useRef(null);

  // ─── Idle Prefetch (Skip if saveData is true) ──────────────────────────────
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (navigator.connection && navigator.connection.saveData) return;

    const prefetch = () => {
      loadPanel().catch(() => {});
    };

    if ('requestIdleCallback' in window) {
      const idleId = window.requestIdleCallback(prefetch);
      return () => {
        if ('cancelIdleCallback' in window) window.cancelIdleCallback(idleId);
      };
    } else {
      const timer = setTimeout(prefetch, 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (ringTimerRef.current) clearTimeout(ringTimerRef.current);
      if (errorTimerRef.current) clearTimeout(errorTimerRef.current);
    };
  }, []);

  // ─── User Interaction Prefetch ─────────────────────────────────────────────
  const handlePrefetch = () => {
    if (!isPanelLoaded) {
      loadPanel().catch(() => {});
    }
  };

  // ─── Click / Enter Handler ──────────────────────────────────────────────────
  const handleClick = () => {
    // Ignore clicks while loading (never toggle, never queue a close)
    if (loading) return;

    if (isOpen) {
      setIsOpen(false);
      return;
    }

    // Instant open if chunk is already loaded
    if (isPanelLoaded && CachedChatPanel) {
      setLoadedPanel(() => CachedChatPanel);
      setIsOpen(true);
      return;
    }

    // Begin loading flow
    setLoading(true);
    setHasError(false);

    // Loading ring appears only if loading lasts longer than 150ms (no flicker)
    if (ringTimerRef.current) clearTimeout(ringTimerRef.current);
    ringTimerRef.current = setTimeout(() => {
      setShowRing(true);
      ringShownTimeRef.current = Date.now();
    }, 150);

    loadPanel()
      .then((Comp) => {
        setLoadedPanel(() => Comp);

        // Ring once shown stays at least 400ms (no flash)
        const shownAt = ringShownTimeRef.current;
        const elapsed = shownAt ? Date.now() - shownAt : 0;
        const minHold = shownAt && elapsed < 400 ? 400 - elapsed : 0;

        setTimeout(() => {
          if (ringTimerRef.current) clearTimeout(ringTimerRef.current);
          setShowRing(false);
          setLoading(false);
          ringShownTimeRef.current = 0;
          setIsOpen(true);
        }, minHold);
      })
      .catch(() => {
        if (ringTimerRef.current) clearTimeout(ringTimerRef.current);
        setShowRing(false);
        setLoading(false);
        ringShownTimeRef.current = 0;
        setHasError(true);

        // Red-tinted error state for 1.5s
        if (errorTimerRef.current) clearTimeout(errorTimerRef.current);
        errorTimerRef.current = setTimeout(() => {
          setHasError(false);
        }, 1500);
      });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      if (loading) {
        e.preventDefault();
        return; // Ignore Enter/Space while loading
      }
      e.preventDefault();
      handleClick();
    }
  };

  // ─── Button Label ───────────────────────────────────────────────────────────
  let buttonLabel = 'Ask Question';
  if (hasError) {
    buttonLabel = "Couldn't load. Tap to retry";
  } else if (loading) {
    buttonLabel = 'Loading...';
  } else if (isOpen) {
    buttonLabel = 'Close Chat';
  }

  return (
    <>
      {/* ── A11Y Screen Reader Announcement ── */}
      <div className="sr-only" aria-live="polite">
        {loading ? 'Loading chat' : ''}
      </div>

      {/* ── Floating Launcher Button ── */}
      <button
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onPointerDown={() => setIsPressed(true)}
        onPointerUp={() => setIsPressed(false)}
        onPointerLeave={() => setIsPressed(false)}
        onPointerCancel={() => setIsPressed(false)}
        onPointerEnter={handlePrefetch}
        onFocus={handlePrefetch}
        onTouchStart={handlePrefetch}
        aria-label={isOpen ? 'Close chat assistant' : "Ask about Vasanth's services"}
        aria-expanded={isOpen}
        aria-busy={loading ? 'true' : 'false'}
        className={`fixed bottom-16 right-4 sm:bottom-6 sm:right-6 z-50 group flex items-center gap-2.5 px-3.5 sm:px-4 py-2 sm:py-2.5 bg-canvas/90 backdrop-blur-md rounded-full shadow-[0_4px_25px_rgba(0,0,0,0.6),0_0_20px_rgba(0,229,255,0.22)] transition-all min-h-[48px] min-w-[48px] cursor-pointer select-none ${
          hasError
            ? 'border border-[#ff3366] text-[#ff3366] shadow-[0_4px_25px_rgba(255,51,102,0.4)]'
            : 'border border-content-accent/40 hover:border-content-accent hover:shadow-[0_4px_30px_rgba(0,229,255,0.35)]'
        }`}
        style={{
          transform: isPressed ? 'scale(0.94)' : 'scale(1)',
          transition: 'transform 120ms ease-out, border-color 200ms ease, box-shadow 200ms ease',
        }}
      >
        {/* Animated breathing orb indicator container with pure CSS loading ring */}
        <div className="relative flex items-center justify-center w-6 h-6 rounded-full bg-canvas border border-content-accent/30 shrink-0">
          {/* Pure CSS Loading Ring (appears > 150ms, fades in/out over 150ms) */}
          <div
            className={`absolute -inset-[3.5px] rounded-full pointer-events-none ${
              hasError
                ? 'launcher-ring-error'
                : showRing
                ? 'launcher-ring-spin'
                : 'opacity-0'
            }`}
            style={{
              transition: 'opacity 150ms ease',
              opacity: hasError || showRing ? 1 : 0,
            }}
          />

          {/* Orb core */}
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-content-accent opacity-40" />
          <span
            className={`relative inline-flex rounded-full h-2.5 w-2.5 transition-colors duration-200 ${
              hasError
                ? 'bg-[#ff3366] shadow-[0_0_8px_#ff3366]'
                : 'bg-content-accent shadow-[0_0_8px_#00e5ff]'
            }`}
          />
        </div>

        {/* Label */}
        <span
          className={`text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase select-none transition-colors ${
            hasError
              ? 'text-[#ff3366]'
              : 'text-content-primary group-hover:text-content-accent'
          }`}
        >
          {buttonLabel}
        </span>
      </button>

      {/* ── Lazy Loaded Chat Panel (Rendered when chunk is available) ── */}
      {LoadedPanel && (
        <ChatErrorBoundary>
          <LoadedPanel isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </ChatErrorBoundary>
      )}

      {/* ── Pure CSS Loading Ring Styles ── */}
      <style>{`
        @keyframes launcherRingSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes launcherRingPulse {
          0%, 100% {
            opacity: 0.25;
          }
          50% {
            opacity: 1;
          }
        }
        .launcher-ring-spin {
          padding: 1.5px;
          background: conic-gradient(from 0deg, #00e5ff 0deg, rgba(0, 229, 255, 0.7) 90deg, transparent 180deg, transparent 360deg);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          filter: drop-shadow(0 0 6px rgba(0, 229, 255, 0.35));
          animation: launcherRingSpin 0.9s linear infinite;
        }
        .launcher-ring-error {
          padding: 1.5px;
          background: #ff3366;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          filter: drop-shadow(0 0 6px rgba(255, 51, 102, 0.6));
          animation: none;
        }
        @media (prefers-reduced-motion: reduce) {
          .launcher-ring-spin {
            animation: launcherRingPulse 1.6s ease-in-out infinite;
          }
        }
      `}</style>
    </>
  );
}
