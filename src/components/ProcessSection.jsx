import { useRef } from 'react';
import { processSteps } from '../data/processSteps';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const getStepIcon = (step) => {
  switch (step) {
    case '01':
      return (
        <svg className="w-6 h-6 text-content-accent group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <circle cx="8" cy="10" r="1" className="fill-current animate-pulse" />
          <circle cx="12" cy="10" r="1" className="fill-current animate-pulse delay-100" />
          <circle cx="16" cy="10" r="1" className="fill-current animate-pulse delay-200" />
        </svg>
      );
    case '02':
      return (
        <svg className="w-6 h-6 text-content-accent group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="9" y1="21" x2="9" y2="9" />
        </svg>
      );
    case '03':
      return (
        <svg className="w-6 h-6 text-content-accent group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
          <line x1="12" y1="19" x2="12" y2="5" />
        </svg>
      );
    case '04':
      return (
        <svg className="w-6 h-6 text-content-accent group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
          <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
          <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 3 0 3 0" />
          <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-3 0-3" />
        </svg>
      );
    default:
      return null;
  }
};

export default function ProcessSection() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray('.process-card');
    gsap.fromTo(
      cards,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="py-16 sm:py-20 lg:py-32 px-4 sm:px-6 lg:px-20 bg-canvas border-t border-canvas-border overflow-hidden"
    >
      <style>{`
        .process-card:hover .process-glow {
          animation-play-state: running !important;
        }
        @keyframes processGlowRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .process-glow {
            animation: none !important;
          }
        }
      `}</style>

      <div className="max-w-[1400px] w-full mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="mb-12 sm:mb-16 lg:mb-20 text-center max-w-3xl flex flex-col items-center">
          <span className="text-[10px] sm:text-xs font-mono font-semibold tracking-[0.25em] text-content-secondary uppercase mb-3 flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-content-accent animate-pulse inline-block" />
            HOW WORKING TOGETHER WORKS
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-sans font-bold tracking-tighter text-content-primary uppercase">
            Simple 4-Step Process.
          </h2>
          <p className="text-content-secondary mt-3 sm:mt-4 text-base sm:text-lg font-light leading-relaxed">
            From initial chat to post-launch support — clear, direct, and hassle-free.
          </p>
        </div>

        {/* 4 Steps Grid Sequence */}
        <div className="w-full relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Subtle horizontal connecting line on desktop */}
          <div className="hidden lg:block absolute top-[4.5rem] left-8 right-8 h-[2px] bg-gradient-to-r from-content-accent/20 via-content-accent/40 to-content-accent/20 z-0 pointer-events-none" />

          {processSteps.map((item) => (
            <div
              key={item.step}
              className="process-card group relative rounded-2xl p-[1.5px] overflow-hidden bg-canvas-border transition-all duration-300"
            >
              {/* Rotating Cyan Gradient Glow Border (Masked to 1.5px border rim) */}
              <div
                className="process-glow absolute -inset-[150%] m-auto w-[300%] h-[300%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-full"
                style={{
                  background: 'conic-gradient(from 0deg at 50% 50%, transparent 0deg, #00e5ff 60deg, #007799 150deg, transparent 240deg, #00e5ff 360deg)',
                  animation: 'processGlowRotate 4s linear infinite',
                  animationPlayState: 'paused',
                }}
              />

              {/* Card Content Container (Solid mask) */}
              <div className="relative z-10 rounded-[14.5px] bg-canvas-card p-6 sm:p-8 h-full flex flex-col justify-between transition-colors duration-300">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs font-bold text-content-accent bg-content-accent/10 border border-content-accent/20 px-3 py-1 rounded-full">
                      STEP {item.step}
                    </span>
                    {getStepIcon(item.step)}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-sans font-bold tracking-tight text-content-primary mb-3 group-hover:text-content-accent transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-content-secondary font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
