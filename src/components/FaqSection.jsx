import { useState, useRef, useEffect } from 'react';
import { faqData } from '../data/faqData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FaqSection() {
  const [openId, setOpenId] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef(null);
  const extraItemRefs = useRef([]);

  const activeFaqs = faqData.filter((item) => !item.isEmpty);
  const visibleFaqs = showAll ? activeFaqs : activeFaqs.slice(0, 5);

  const toggleFaq = (id) => setOpenId(openId === id ? null : id);

  useEffect(() => {
    if (showAll) {
      const prefersReducedMotion =
        typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!prefersReducedMotion) {
        const elements = extraItemRefs.current.filter(Boolean);
        if (elements.length > 0) {
          gsap.fromTo(
            elements,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.07,
              ease: 'power2.out',
              clearProps: 'opacity,transform',
            }
          );
        }
      }
    } else {
      extraItemRefs.current = [];
    }
  }, [showAll]);

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="py-16 sm:py-20 lg:py-32 px-4 sm:px-6 lg:px-20 bg-canvas border-t border-canvas-border overflow-hidden"
    >
      <div className="max-w-[1400px] w-full mx-auto flex flex-col items-center">

        {/* Centered Header */}
        <div className="mb-10 sm:mb-14 lg:mb-20 text-center max-w-3xl flex flex-col items-center">
          <span className="text-[10px] sm:text-xs font-mono font-semibold tracking-[0.25em] text-content-secondary uppercase mb-3 flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-content-accent animate-pulse inline-block" />
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-sans font-bold tracking-tighter text-content-primary uppercase">
            Clear Answers.
          </h2>
          <p className="text-content-secondary mt-3 sm:mt-4 text-base sm:text-lg font-light leading-relaxed">
            Everything you need to know about pricing, timelines, ownership, and working together.
          </p>
        </div>

        {/* Centered Accordion List */}
        <div className="space-y-4 max-w-4xl w-full">
          {visibleFaqs.map((item, idx) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                ref={idx >= 5 ? (el) => (extraItemRefs.current[idx - 5] = el) : null}
                className={`faq-item rounded-2xl border transition-all duration-500 ease-out ${
                  isOpen
                    ? 'bg-canvas-card border-content-accent/60 shadow-[0_0_30px_rgba(0,229,255,0.08)]'
                    : 'bg-canvas-card/40 border-canvas-border lg:hover:border-content-accent/35 lg:hover:bg-canvas-card/60'
                }`}
              >
                {/* Question row */}
                <button
                  onClick={() => toggleFaq(item.id)}
                  aria-expanded={isOpen}
                  className="group w-full min-h-[60px] text-left px-5 sm:px-8 py-5 sm:py-6 flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                >
                  <div className="flex items-center gap-4 sm:gap-6 flex-1 min-w-0">
                    <span className={`font-mono text-xs font-semibold tracking-widest flex-shrink-0 transition-colors duration-300 ${isOpen ? 'text-content-accent' : 'text-content-secondary/40 group-hover:text-content-secondary'}`}>
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <h3 className={`text-base sm:text-xl font-sans font-semibold tracking-tight transition-colors duration-300 ${isOpen ? 'text-content-accent' : 'text-content-primary group-hover:text-content-accent'}`}>
                      {item.question}
                    </h3>
                  </div>

                  {/* Smooth Animated Toggle Icon (+ / -) */}
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border flex-shrink-0 flex items-center justify-center transition-all duration-500 ease-out ${
                    isOpen
                      ? 'border-content-accent bg-content-accent/10 text-content-accent shadow-[0_0_15px_rgba(0,229,255,0.25)] scale-105'
                      : 'border-canvas-border text-content-secondary group-hover:border-content-accent/60 group-hover:text-content-accent'
                  }`}>
                    <svg
                      className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-500 ease-out ${isOpen ? 'rotate-180 text-content-accent' : 'rotate-0'}`}
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    >
                      <line x1="2" y1="8" x2="14" y2="8" />
                      <line
                        x1="8"
                        y1="2"
                        x2="8"
                        y2="14"
                        className={`transition-all duration-500 origin-center ${isOpen ? 'opacity-0 scale-0 rotate-90' : 'opacity-100 scale-100 rotate-0'}`}
                      />
                    </svg>
                  </div>
                </button>

                {/* Answer — CSS grid + translate-y slide down animation */}
                <div className={`faq-grid-accordion ${isOpen ? 'is-open' : ''}`}>
                  <div className="overflow-hidden min-h-0">
                    <div className={`px-5 sm:px-8 pb-6 border-t border-canvas-border/40 transition-transform duration-500 ease-out ${isOpen ? 'translate-y-0' : '-translate-y-2'}`}>
                      <div className="pt-4 pl-10 sm:pl-14">
                        {item.isEmpty ? (
                          <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-content-accent/5 border border-content-accent/20 text-content-accent font-mono text-[10px] sm:text-xs font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-content-accent animate-ping inline-block" />
                            COMING SOON — CONTRACT TERMS FINALIZED PER PROJECT SCOPE.
                          </span>
                        ) : (
                          <p className="text-sm sm:text-base text-content-secondary font-light leading-relaxed">
                            {item.answer}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Centered See All / Show Less CTA */}
        <div className="mt-10 sm:mt-14 text-center">
          <button
            onClick={() => {
              setShowAll(!showAll);
              if (showAll) setOpenId(null);
            }}
            className="group relative inline-flex items-center justify-center px-8 py-4 rounded-full border border-canvas-border font-sans font-bold text-xs uppercase tracking-widest overflow-hidden min-h-[48px]"
          >
            <span className="btn-fill-text lg:group-hover:text-canvas flex items-center gap-2">
              {showAll ? 'Show Less' : `See All ${activeFaqs.length} Questions`}
              <svg
                className={`w-4 h-4 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
            <div className="btn-fill-layer bg-content-accent" />
          </button>
        </div>

      </div>
    </section>
  );
}