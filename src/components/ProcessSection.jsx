import { useRef, useState } from 'react';
import { processSteps } from '../data/processSteps';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

import {
  MessageSquareMoreIcon,
  LayoutPanelTopIcon,
  TerminalIcon,
  RocketIcon,
} from './ProcessIcons';

const getStepIcon = (step) => {
  switch (step) {
    case '01':
      return <MessageSquareMoreIcon size={28} />;
    case '02':
      return <LayoutPanelTopIcon size={28} />;
    case '03':
      return <TerminalIcon size={28} />;
    case '04':
      return <RocketIcon size={28} />;
    default:
      return null;
  }
};

export default function ProcessSection() {
  const sectionRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  useGSAP(() => {
    const cards = gsap.utils.toArray('.process-card');
    
    // Entrance animation (fade & slide up on scroll focus)
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

    // Active step scroll highlighting logic
    const mm = gsap.matchMedia();

    // Desktop: Section scroll progress maps to active step 0 -> 1 -> 2 -> 3
    mm.add('(min-width: 1024px)', () => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 60%',
        end: 'bottom 40%',
        onUpdate: (self) => {
          const idx = Math.min(cards.length - 1, Math.floor(self.progress * cards.length));
          setActiveStep(idx);
        },
        onLeaveBack: () => setActiveStep(0),
      });
    });

    // Mobile / Tablet: Each card activates as it passes screen center
    mm.add('(max-width: 1023px)', () => {
      cards.forEach((card, index) => {
        ScrollTrigger.create({
          trigger: card,
          start: 'top 65%',
          end: 'bottom 35%',
          onToggle: (self) => {
            if (self.isActive) setActiveStep(index);
          },
        });
      });
    });
  }, { scope: sectionRef });

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="py-16 sm:py-20 lg:py-32 px-4 sm:px-6 lg:px-20 bg-canvas border-t border-canvas-border overflow-hidden"
    >
      <style>{`
        @media (hover: hover) {
          .process-card:hover .process-glow {
            animation-play-state: running !important;
          }
        }
        @keyframes processGlowRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes activeBorderPulse {
          0%, 100% {
            box-shadow: 0 0 16px rgba(0, 229, 255, 0.3), inset 0 0 10px rgba(0, 229, 255, 0.15);
          }
          50% {
            box-shadow: 0 0 32px rgba(0, 229, 255, 0.6), inset 0 0 18px rgba(0, 229, 255, 0.3);
          }
        }
        .process-card.is-active-card {
          animation: activeBorderPulse 2.5s ease-in-out infinite;
        }
        @keyframes dotPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.15; transform: scale(0.85); }
        }
        @keyframes terminalBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes rocketWobble {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(-1.5px, -2px) rotate(-3deg); }
          50% { transform: translate(1.5px, -1px) rotate(2deg); }
          75% { transform: translate(-1px, -2.5px) rotate(-2deg); }
        }
        @keyframes flameFlicker {
          0% { opacity: 1; transform: scale(1); }
          100% { opacity: 0.4; transform: scale(1.15) translate(-1px, 1px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .process-glow,
          .process-card.is-active-card {
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

          {processSteps.map((item, index) => {
            const isActive = activeStep === index;
            return (
              <div
                key={item.step}
                className={`process-card group relative rounded-2xl p-[1.5px] overflow-hidden transition-all duration-500 ${
                  isActive
                    ? 'is-active-card bg-gradient-to-br from-content-accent via-cyan-400 to-content-accent/50 scale-[1.02] z-10'
                    : 'bg-canvas-border opacity-95 lg:hover:opacity-100'
                }`}
              >
                {/* Rotating Cyan Gradient Glow Border (Masked to 1.5px border rim on hover) */}
                <div
                  className="process-glow absolute -inset-[150%] m-auto w-[300%] h-[300%] opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-full"
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
                      <span
                        className={`font-mono text-xs font-bold px-3 py-1 rounded-full transition-all duration-300 ${
                          isActive
                            ? 'text-canvas bg-content-accent shadow-[0_0_12px_rgba(0,229,255,0.5)] border border-content-accent'
                            : 'text-content-accent bg-content-accent/10 border border-content-accent/20'
                        }`}
                      >
                        STEP {item.step}
                      </span>
                      <div className={`transition-colors duration-300 ${isActive ? 'text-content-accent' : ''}`}>
                        {getStepIcon(item.step)}
                      </div>
                    </div>
                    <h3
                      className={`text-xl sm:text-2xl font-sans font-bold tracking-tight mb-3 transition-colors duration-300 ${
                        isActive ? 'text-content-accent' : 'text-content-primary lg:group-hover:text-content-accent'
                      }`}
                    >
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-content-secondary font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}



