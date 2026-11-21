// src/chatbot/ChatbotLauncher.jsx
// Floating launcher button for the portfolio chatbot with lazy-loaded panel & orbs

import { useState, Suspense, lazy, Component } from 'react';

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

// Lazy load ChatPanel so thinking-orbs and chat logic are completely excluded from initial page bundle
const LazyChatPanel = lazy(() => import('./ChatPanel.jsx'));

export default function ChatbotLauncher() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasLoadedPanel, setHasLoadedPanel] = useState(false);

  const handleToggle = () => {
    if (!hasLoadedPanel) {
      setHasLoadedPanel(true);
    }
    setIsOpen((prev) => !prev);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* ── Floating Launcher Button ── */}
      <button
        onClick={handleToggle}
        aria-label={isOpen ? 'Close chat assistant' : "Ask about Vasanth's services"}
        aria-expanded={isOpen}
        className="fixed bottom-16 right-4 sm:bottom-6 sm:right-6 z-50 group flex items-center gap-2.5 px-3.5 sm:px-4 py-2 sm:py-2.5 bg-canvas/90 backdrop-blur-md border border-content-accent/40 rounded-full shadow-[0_4px_25px_rgba(0,0,0,0.6),0_0_20px_rgba(0,229,255,0.22)] hover:border-content-accent hover:shadow-[0_4px_30px_rgba(0,229,255,0.35)] transition-all duration-300 min-h-[48px] min-w-[48px] cursor-pointer"
      >
        {/* Animated breathing orb indicator */}
        <div className="relative flex items-center justify-center w-6 h-6 rounded-full bg-canvas border border-content-accent/30 overflow-hidden shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-content-accent opacity-40" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-content-accent shadow-[0_0_8px_#00e5ff]" />
        </div>

        {/* Label */}
        <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-content-primary uppercase select-none group-hover:text-content-accent transition-colors">
          {isOpen ? 'Close Chat' : 'Ask Question'}
        </span>
      </button>

      {/* ── Lazy Loaded Chat Panel (Rendered only after first launcher click) ── */}
      {hasLoadedPanel && (
        <ChatErrorBoundary>
          <Suspense fallback={null}>
            <LazyChatPanel isOpen={isOpen} onClose={handleClose} />
          </Suspense>
        </ChatErrorBoundary>
      )}
    </>
  );
}
