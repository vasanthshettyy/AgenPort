// src/chatbot/ChatPanel.jsx
// Stage-first iOS-style Chat Interface for Vasanth's Services

import { useState, useEffect, useRef, useCallback, memo, useMemo } from 'react';
import { EMAIL, kb } from './kb.js';
import { search, getEntryById } from './search.js';
import SmoothOrb from './SmoothOrb.jsx';

// 4 Preset Stage Suggestions
const STAGE_SUGGESTIONS = [
  { label: 'What do you build?', id: 'what-he-does' },
  { label: 'How much does it cost?', id: 'pricing' },
  { label: 'How long does it take?', id: 'timeline' },
  { label: 'Do I own the code?', id: 'ownership' },
];

const MS_PER_WORD = 110; // ~1 second per line (approx 9 words/line)

const ArrowIcon = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

// Search-engine-style highlighted match component
const HighlightedText = memo(function HighlightedText({ text, query }) {
  const q = query ? query.trim() : '';
  if (!q) return <span>{text}</span>;
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx === -1) return <span>{text}</span>;

  return (
    <span>
      {text.slice(0, idx)}
      <span className="text-content-accent font-semibold">{text.slice(idx, idx + q.length)}</span>
      {text.slice(idx + q.length)}
    </span>
  );
});

// GPU-accelerated CSS word-reveal streaming component (zero setState per word)
const StreamingText = memo(function StreamingText({ text, isStreaming, prefersReducedMotion }) {
  if (prefersReducedMotion || !isStreaming) {
    return <span className="whitespace-pre-wrap">{text}</span>;
  }

  const words = text.split(' ');

  return (
    <span className="whitespace-pre-wrap">
      {words.map((word, i) => {
        const delayMs = i * MS_PER_WORD;
        return (
          <span
            key={i}
            className="inline-block"
            style={{
              animation: 'wordReveal 240ms cubic-bezier(0.32, 0.72, 0, 1) forwards',
              animationDelay: `${delayMs}ms`,
              opacity: 0,
              transform: 'translateY(4px)',
              filter: 'blur(3px)',
            }}
          >
            {word}&nbsp;
          </span>
        );
      })}
    </span>
  );
});

export default function ChatPanel({ isOpen, onClose }) {
  const [messages, setMessages] = useState([]);
  const [inputVal, setInputVal] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orbState, setOrbState] = useState('breathing');
  const [isMobile, setIsMobile] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const panelRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const inputRef = useRef(null);
  const inputContainerRef = useRef(null);
  const suggestionsMenuRef = useRef(null);
  const toggleButtonRef = useRef(null);
  const typingTimerRef = useRef(null);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Search-engine predictive matching across kb questions
  const predictions = useMemo(() => {
    const q = inputVal.trim().toLowerCase();
    if (!q) return [];

    const results = [];
    for (const entry of kb) {
      if (entry.id === 'greeting' || entry.id === 'thanks-bye' || entry.id === 'help') continue;
      let bestScore = 0;
      let bestVariant = '';

      for (const v of entry.q) {
        if (v.length < 2) continue;
        const lower = v.toLowerCase();
        if (lower.startsWith(q)) {
          const score = 100 - (lower.length - q.length);
          if (score > bestScore) {
            bestScore = score;
            bestVariant = v;
          }
        } else if (lower.includes(' ' + q)) {
          const score = 70 - (lower.length - q.length);
          if (score > bestScore) {
            bestScore = score;
            bestVariant = v;
          }
        } else if (lower.includes(q)) {
          const score = 40 - (lower.length - q.length);
          if (score > bestScore) {
            bestScore = score;
            bestVariant = v;
          }
        }
      }

      if (bestScore > 0) {
        results.push({
          id: entry.id,
          entry,
          text: bestVariant.charAt(0).toUpperCase() + bestVariant.slice(1),
          score: bestScore,
        });
      }
    }

    results.sort((a, b) => b.score - a.score);
    return results.slice(0, 4);
  }, [inputVal]);

  const hasQuery = inputVal.trim().length > 0;
  const isDropdownOpen =
    !isProcessing && !isDismissed && (showSuggestions || (hasQuery && predictions.length > 0));
  const displayItems = hasQuery ? predictions : STAGE_SUGGESTIONS;
  const dropdownTitle = hasQuery ? 'Search Predictions' : 'Suggested Questions';

  // Responsive check
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close suggestions on click outside
  useEffect(() => {
    if (!isDropdownOpen) return;

    const handleOutsideClick = (e) => {
      if (
        suggestionsMenuRef.current &&
        !suggestionsMenuRef.current.contains(e.target) &&
        inputContainerRef.current &&
        !inputContainerRef.current.contains(e.target) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(e.target)
      ) {
        setShowSuggestions(false);
        setIsDismissed(true);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isDropdownOpen]);

  // Determine stage vs conversation mode
  const isConversationMode = messages.length > 0;

  // Target orb scale: 136px desktop / 112px mobile in stage, 72px in conversation
  const targetScale = isConversationMode
    ? 72 / 64
    : isMobile
    ? 112 / 64
    : 136 / 64;

  const currentOrbPx = isConversationMode ? 72 : isMobile ? 112 : 136;
  const glowSize = Math.round(currentOrbPx * 3.2);
  const glowCenterY = isConversationMode ? 46 : isMobile ? 80 : 100;
  const glowOpacity = isProcessing ? 1 : 0.7;

  // Auto-scroll on new messages & continuous scroll tracking during streaming
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    }
  }, [messages, isProcessing, prefersReducedMotion]);

  useEffect(() => {
    if (!isProcessing || prefersReducedMotion) return;
    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
      }
    }, 120);
    return () => clearInterval(interval);
  }, [isProcessing, prefersReducedMotion]);

  // Focus trap & Escape key
  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 200);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab' && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const navigateTo = (url) => {
    window.location.assign(url);
  };

  const handleCta = (ctaType) => {
    if (ctaType === 'quote') {
      const planData = { planName: 'Custom Project', retainerSelected: false };
      window.dispatchEvent(new CustomEvent('prefillContactQuoteNoPrice', { detail: planData }));
      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
      onClose();
    } else if (ctaType === 'contact') {
      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
      onClose();
    } else if (ctaType === 'email') {
      navigateTo(`mailto:${EMAIL}`);
    }
  };

  const handleLinkClick = (href) => {
    if (href.startsWith('#')) {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      onClose();
    } else if (href.startsWith('http')) {
      window.open(href, '_blank', 'noopener,noreferrer');
    } else {
      navigateTo(href);
      onClose();
    }
  };

  // Deliver answer
  const deliverAnswer = useCallback(
    (entry) => {
      const fullText = entry.a;
      const links = entry.links || [];
      const cta = entry.cta || null;

      const msgId = `bot-${Date.now()}`;

      setMessages((prev) => [
        ...prev,
        {
          id: msgId,
          sender: 'bot',
          text: fullText,
          links,
          cta,
          isStreaming: !prefersReducedMotion,
        },
      ]);

      if (prefersReducedMotion) {
        setOrbState('breathing');
        setIsProcessing(false);
        return;
      }

      setOrbState('composing');

      // 1 sec per line word reveal: transition orb back to breathing when streaming completes
      const wordsCount = fullText.split(' ').length;
      const revealDuration = wordsCount * MS_PER_WORD + 300;
      setTimeout(() => {
        setOrbState('breathing');
        setIsProcessing(false);
        setMessages((prev) =>
          prev.map((m) => (m.id === msgId ? { ...m, isStreaming: false } : m))
        );
      }, revealDuration);
    },
    [prefersReducedMotion]
  );

  // Trigger search and question answering
  const triggerQuery = useCallback(
    (queryText, entryOverride = null) => {
      const clean = queryText.trim();
      if (!clean && !entryOverride) return;

      setShowSuggestions(false);
      setIsDismissed(true);
      setMessages((prev) => [
        ...prev,
        {
          id: `user-${Date.now()}`,
          sender: 'user',
          text: clean,
        },
      ]);
      setInputVal('');
      setIsProcessing(true);
      setOrbState('solving');

      const delay = prefersReducedMotion ? 0 : 2000; // 2 seconds thinking duration
      setTimeout(() => {
        const result = entryOverride || search(clean);
        deliverAnswer(result);
      }, delay);
    },
    [deliverAnswer, prefersReducedMotion]
  );

  const handleInputChange = (e) => {
    const val = e.target.value;
    setInputVal(val);
    setSelectedIndex(-1);
    setIsDismissed(false);

    if (!isProcessing) {
      if (val.trim().length > 0) {
        if (orbState !== 'listening') {
          setOrbState('listening');
        }
        if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
        typingTimerRef.current = setTimeout(() => {
          setOrbState('breathing');
        }, 800);
      } else {
        setOrbState('breathing');
      }
    }
  };

  const handleInputKeyDown = (e) => {
    if (!isDropdownOpen || displayItems.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % displayItems.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev <= 0 ? displayItems.length - 1 : prev - 1));
    } else if (e.key === 'Enter' && selectedIndex >= 0 && selectedIndex < displayItems.length) {
      e.preventDefault();
      const item = displayItems[selectedIndex];
      setShowSuggestions(false);
      setIsDismissed(true);
      const entry = item.entry || getEntryById(item.id);
      triggerQuery(item.text || item.label, entry);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setIsDismissed(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputVal.trim() || isProcessing) return;
    triggerQuery(inputVal);
  };

  // Cleanup
  useEffect(() => {
    return () => {
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Ask about Vasanth's services"
      className="fixed inset-x-0 bottom-0 sm:inset-auto sm:bottom-20 sm:right-6 z-50 w-full sm:w-[392px] h-[92dvh] sm:h-[600px] sm:max-h-[min(640px,calc(100dvh-48px))] flex flex-col bg-[#0d0d0d] border-t sm:border border-[#1f1f1f] rounded-t-[28px] sm:rounded-[28px] shadow-[0_20px_60px_rgba(0,0,0,0.85)] overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
      style={{
        boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 20px 60px rgba(0, 0, 0, 0.85)',
      }}
    >
      {/* ── Mobile Grab Handle ── */}
      <div className="sm:hidden flex items-center justify-center pt-3 pb-1 shrink-0">
        <div className="w-10 h-1 bg-white/20 rounded-full" />
      </div>

      {/* ── Header ── */}
      <div className="flex items-center justify-between px-6 py-3.5 border-b border-[#1f1f1f] shrink-0 z-30">
        <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#a1a1a6]">
          VASANTH'S ASSISTANT
        </span>
        <button
          onClick={onClose}
          aria-label="Close chat"
          className="w-8 h-8 rounded-full border border-[#1f1f1f] bg-[#121212] text-[#a1a1a6] hover:text-[#f5f5f7] hover:border-content-accent/50 flex items-center justify-center transition-colors min-h-[44px] min-w-[44px] cursor-pointer"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M1 1L11 11M1 11L11 1"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* ── Main Panel Content Area (Glow z-0 -> Messages z-10 -> Orb z-20) ── */}
      <div className="relative flex-1 min-h-0 flex flex-col">
        {/* Layer 0: Glow (separate element, centered on the orb, 3.2x orb size, z-0) */}
        <div
          className="absolute pointer-events-none z-0 rounded-full"
          style={{
            width: `${glowSize}px`,
            height: `${glowSize}px`,
            left: '50%',
            top: `${glowCenterY}px`,
            transform: 'translate(-50%, -50%)',
            background:
              'radial-gradient(circle, rgba(0,229,255,0.16) 0%, rgba(0,229,255,0.06) 35%, transparent 70%)',
            opacity: glowOpacity,
            transition: prefersReducedMotion
              ? 'none'
              : 'opacity 600ms ease-out, top 450ms cubic-bezier(0.32, 0.72, 0, 1), width 450ms cubic-bezier(0.32, 0.72, 0, 1), height 450ms cubic-bezier(0.32, 0.72, 0, 1)',
          }}
        />

        {/* Layer 1: Scrollable Body (Messages in front of glow, beneath orb) */}
        <div
          ref={scrollContainerRef}
          data-lenis-prevent
          tabIndex={0}
          aria-live="polite"
          className="flex-1 overflow-y-auto px-6 focus:outline-none scroll-smooth relative z-10"
          style={{
            paddingTop: isConversationMode ? '92px' : '0px',
            maskImage: isConversationMode
              ? 'linear-gradient(to bottom, transparent 0, #000 40px)'
              : 'none',
            WebkitMaskImage: isConversationMode
              ? 'linear-gradient(to bottom, transparent 0, #000 40px)'
              : 'none',
          }}
        >
          {!isConversationMode ? (
            /* ── STAGE (EMPTY STATE) ── */
            <div className="flex flex-col items-center justify-center text-center space-y-2 pt-[148px] sm:pt-[172px] pb-6">
              <h2 className="text-[22px] font-sans font-light tracking-tight text-[#f5f5f7] leading-snug">
                What would you like to know?
              </h2>
              <p className="text-sm font-sans text-[#a1a1a6] font-light leading-normal max-w-[280px]">
                Answers come from this site's content.
              </p>
            </div>
          ) : (
          /* ── CONVERSATION MODE ── */
          <div className="space-y-6 pb-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                } space-y-2`}
              >
                {/* Message Surface */}
                {msg.sender === 'user' ? (
                  <div className="max-w-[85%] px-4 py-2.5 rounded-full bg-[#1f1f1f] border border-[#2a2a2a] text-sm text-[#f5f5f7] font-light">
                    {msg.text}
                  </div>
                ) : (
                  <div className="w-full text-left space-y-3">
                    <p className="text-[16px] sm:text-[17px] font-sans text-[#f5f5f7] leading-[1.55] font-light">
                      <StreamingText
                        text={msg.text}
                        isStreaming={msg.isStreaming}
                        prefersReducedMotion={prefersReducedMotion}
                      />
                    </p>

                    {/* CTAs and Links */}
                    {(!msg.isStreaming || prefersReducedMotion) && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {msg.cta && (
                          <button
                            onClick={() => handleCta(msg.cta)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase bg-content-accent text-canvas border border-content-accent hover:brightness-110 shadow-[0_0_10px_rgba(0,229,255,0.2)] transition-all cursor-pointer min-h-[30px]"
                          >
                            {msg.cta === 'quote' && 'Request a Custom Quote ->'}
                            {msg.cta === 'contact' && 'Send a Message ->'}
                            {msg.cta === 'email' && 'Email Vasanth ->'}
                          </button>
                        )}

                        {msg.links &&
                          msg.links.map((link, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleLinkClick(link.href)}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[11px] font-mono font-medium tracking-wider uppercase bg-[#121212] border border-[#1f1f1f] text-[#f5f5f7] hover:border-content-accent hover:text-content-accent transition-colors cursor-pointer min-h-[30px]"
                            >
                              <span>{link.label}</span>
                              <span className="text-content-accent">-&gt;</span>
                            </button>
                          ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            {/* Processing / Solving indicator */}
            {isProcessing && (
              <div className="flex items-center gap-2 pt-2">
                <span className="w-1.5 h-1.5 rounded-full bg-content-accent animate-ping" />
                <span className="font-mono text-xs uppercase tracking-widest text-[#a1a1a6]">
                  Consulting site knowledge...
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Layer 2: Orb (z-20, no background, pointer-events-none) */}
      <div
        className={`absolute top-0 inset-x-0 flex items-center justify-center pointer-events-none z-20 ${
          isConversationMode ? 'h-[92px]' : 'pt-6 sm:pt-8'
        }`}
      >
        <SmoothOrb
          state={orbState}
          scale={targetScale}
          enableParallax={!isConversationMode}
        />
      </div>
    </div>

      {/* ── Input Bar & Suggestions Dropdown ── */}
      <form
        onSubmit={handleSubmit}
        className="relative p-4 bg-[#0d0d0d] border-t border-[#1f1f1f] flex flex-col gap-2 shrink-0 z-30"
      >
        {/* ── Suggestions / Predictive Dropdown (floating directly above the input box) ── */}
        {isDropdownOpen && (
          <div
            ref={suggestionsMenuRef}
            className="absolute bottom-[calc(100%+8px)] inset-x-4 bg-[#121212] border border-[#242424] rounded-2xl shadow-[0_-12px_36px_rgba(0,0,0,0.85)] p-2 z-40 flex flex-col gap-1 backdrop-blur-md"
          >
            <div className="flex items-center justify-between px-3 py-1.5 border-b border-[#1f1f1f] mb-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#a1a1a6]">
                {dropdownTitle}
              </span>
              <button
                type="button"
                onClick={() => {
                  setShowSuggestions(false);
                  setIsDismissed(true);
                }}
                className="text-[#a1a1a6] hover:text-[#f5f5f7] text-xs p-1 cursor-pointer"
                aria-label="Close suggestions"
              >
                ✕
              </button>
            </div>
            {displayItems.map((item, idx) => {
              const isSelected = selectedIndex === idx;
              const label = item.text || item.label;
              return (
                <button
                  key={item.id + (item.text || '')}
                  type="button"
                  onMouseEnter={() => setSelectedIndex(idx)}
                  onClick={() => {
                    setShowSuggestions(false);
      setIsDismissed(true);
                    const entry = item.entry || getEntryById(item.id);
                    triggerQuery(label, entry);
                  }}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-sm flex items-center justify-between transition-colors cursor-pointer group ${
                    isSelected
                      ? 'bg-[#1a1a1a] text-content-accent'
                      : 'text-[#f5f5f7] hover:bg-[#1a1a1a] hover:text-content-accent'
                  }`}
                >
                  <span className="font-sans font-medium text-xs sm:text-sm">
                    <HighlightedText text={label} query={inputVal} />
                  </span>
                  <ArrowIcon className="w-3.5 h-3.5 text-[#555] group-hover:text-content-accent group-hover:translate-x-0.5 transition-all" />
                </button>
              );
            })}
          </div>
        )}

        <div ref={inputContainerRef} className="relative w-full h-[52px] flex items-center">
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            disabled={isProcessing}
            placeholder="Ask about plans, timelines, payment..."
            aria-label="Ask a question about Vasanth's services"
            className="w-full h-full bg-[#121212] border border-[#1f1f1f] rounded-full pl-5 pr-14 text-sm text-[#f5f5f7] placeholder:text-[#a1a1a6] focus:outline-none focus:border-content-accent transition-colors"
          />

          {/* Inline Circular Send Button */}
          <button
            type="submit"
            disabled={!inputVal.trim() || isProcessing}
            aria-label="Send question"
            className={`absolute right-2 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer min-h-[36px] min-w-[36px] ${
              inputVal.trim() && !isProcessing
                ? 'bg-content-accent text-canvas shadow-[0_0_12px_rgba(0,229,255,0.4)]'
                : 'bg-[#1f1f1f] text-[#555] cursor-not-allowed'
            }`}
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="19" x2="12" y2="5" />
              <polyline points="5 12 12 5 19 12" />
            </svg>
          </button>
        </div>

        {/* ── Sub-bar trigger below the chat box ── */}
        <div className="flex items-center justify-between px-2 pt-0.5">
          <button
            ref={toggleButtonRef}
            type="button"
            onClick={() => {
              setIsDismissed(false);
              setShowSuggestions((prev) => !prev);
            }}
            className="text-[11px] font-mono tracking-wider text-[#a1a1a6] hover:text-content-accent flex items-center gap-1.5 transition-colors cursor-pointer select-none"
          >
            <span>{showSuggestions ? 'Hide suggested questions' : 'Suggested questions'}</span>
            <svg
              className={`w-3 h-3 transition-transform duration-200 ${showSuggestions ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <span className="text-[10px] font-mono text-[#555] uppercase tracking-wider">
            Vasanth's Assistant
          </span>
        </div>
      </form>

      <style>{`
        @keyframes wordReveal {
          from {
            opacity: 0;
            transform: translateY(4px);
            filter: blur(3px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0px);
          }
        }
      `}</style>
    </div>
  );
}
