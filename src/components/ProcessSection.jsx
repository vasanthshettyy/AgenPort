import { useRef, useState, useEffect } from 'react';
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
  const [mobileActiveStep, setMobileActiveStep] = useState(null);
  const [hoverPos, setHoverPos] = useState({ x: -100, y: -100, activeIndex: null, rotateX: 0, rotateY: 0 });
  const mobileTimerRef = useRef(null);

  // Entrance animation (fade & slide up on scroll focus — UNTOUCHED)
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

  // 3D Parallax mouse tracking on desktop
  const handleMouseMove = (e, index) => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 5;
    const rotateX = -((y - centerY) / centerY) * 5;
    setHoverPos({ x, y, activeIndex: index, rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setHoverPos({ x: -100, y: -100, activeIndex: null, rotateX: 0, rotateY: 0 });
  };

  // Mobile/Tablet tap interaction handler (<1024px)
  const handleMobileTap = (index) => {
    if (typeof window !== 'undefined' && window.innerWidth >= 1024) return;

    if (mobileTimerRef.current) clearTimeout(mobileTimerRef.current);

    if (mobileActiveStep === index) {
      setMobileActiveStep(null);
    } else {
      setMobileActiveStep(index);
      mobileTimerRef.current = setTimeout(() => {
        setMobileActiveStep(null);
      }, 1800);
    }
  };

  useEffect(() => {
    return () => {
      if (mobileTimerRef.current) clearTimeout(mobileTimerRef.current);
    };
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="py-16 sm:py-20 lg:py-32 px-4 sm:px-6 lg:px-20 bg-canvas border-t border-canvas-border overflow-hidden"
    >
      <style>{`
        @keyframes shineSweep {
          0% { transform: translateX(-150%) skewX(-20deg); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateX(150%) skewX(-20deg); opacity: 0; }
        }
        .shine-sweep-desktop {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 20;
          transform: translateX(-150%) skewX(-20deg);
          background: linear-gradient(90deg, transparent 0%, rgba(0, 229, 255, 0.25) 50%, transparent 100%);
        }
        .process-card:hover .shine-sweep-desktop {
          animation: shineSweep 0.85s ease-out;
        }
        .shine-sweep-mobile {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 20;
          background: linear-gradient(90deg, transparent 0%, rgba(0, 229, 255, 0.25) 50%, transparent 100%);
          animation: shineSweep 0.85s ease-out forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .shine-sweep-desktop,
          .shine-sweep-mobile {
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
            const isMobileActive = mobileActiveStep === index;
            const isHovered = hoverPos.activeIndex === index;
            const isCardActive = isHovered || isMobileActive;

            return (
              <div
                key={item.step}
                onClick={() => handleMobileTap(index)}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={handleMouseLeave}
                className={`process-card group relative rounded-2xl border border-canvas-border bg-canvas-card overflow-hidden transition-all duration-300 ease-out select-none lg:cursor-pointer ${isCardActive
                    ? 'shadow-[0_12px_40px_-5px_rgba(0,229,255,0.28),0_0_25px_rgba(0,229,255,0.12)] border-content-accent/40'
                    : 'hover:border-content-accent/40 lg:hover:shadow-[0_12px_40px_-5px_rgba(0,229,255,0.28),0_0_25px_rgba(0,229,255,0.12)]'
                  }`}
                style={{
                  perspective: '1000px',
                  transform: isHovered
                    ? `perspective(1000px) rotateX(${hoverPos.rotateX.toFixed(2)}deg) rotateY(${hoverPos.rotateY.toFixed(2)}deg)`
                    : 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
                }}
              >
                {/* Light moving spotlight shade on desktop hover */}
                {isHovered && (
                  <div
                    className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(350px circle at ${hoverPos.x}px ${hoverPos.y}px, rgba(0, 229, 255, 0.12), transparent 80%)`,
                    }}
                  />
                )}

                {/* Glassy Shine Sweep Overlay */}
                <div className="hidden lg:block shine-sweep-desktop" />
                {isMobileActive && <div className="lg:hidden shine-sweep-mobile" />}

                {/* Card Content Container */}
                <div className="relative z-10 p-6 sm:p-8 h-full flex flex-col justify-between overflow-hidden">
                  {/* Ghost Numeral — Keeps fixed dark watermark color text-white/[0.07], only scales up slightly */}
                  <div
                    className={`absolute right-3 bottom-1 font-sans font-black text-[6.5rem] sm:text-[8.5rem] lg:text-[9rem] leading-none tracking-tighter text-white/[0.07] pointer-events-none select-none z-0 transition-transform duration-300 ease-out ${isCardActive ? 'scale-110' : 'lg:group-hover:scale-110'
                      }`}
                  >
                    {item.step}
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <span
                        className={`font-mono text-xs font-bold px-3 py-1 rounded-full transition-all duration-300 ease-out ${isCardActive
                            ? 'text-canvas bg-content-accent shadow-[0_0_12px_rgba(0,229,255,0.5)] border border-content-accent'
                            : 'text-content-accent bg-content-accent/10 border border-content-accent/20 lg:group-hover:bg-content-accent/20 lg:group-hover:border-content-accent/40'
                          }`}
                      >
                        STEP {item.step}
                      </span>
                      <div
                        className={`transition-all duration-300 ease-out ${isCardActive
                            ? 'text-content-accent scale-110'
                            : 'text-content-secondary lg:group-hover:text-content-accent lg:group-hover:scale-110'
                          }`}
                      >
                        {getStepIcon(item.step)}
                      </div>
                    </div>
                    <h3
                      className={`text-xl sm:text-2xl font-sans font-bold tracking-tight mb-3 transition-all duration-300 ease-out ${isCardActive
                          ? 'text-content-accent [text-shadow:0_0_16px_rgba(0,229,255,0.45)]'
                          : 'text-content-primary lg:group-hover:text-content-accent lg:group-hover:[text-shadow:0_0_16px_rgba(0,229,255,0.45)]'
                        }`}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={`text-sm sm:text-base font-light leading-relaxed transition-colors duration-300 ease-out ${isCardActive ? 'text-white' : 'text-content-secondary lg:group-hover:text-white'
                        }`}
                    >
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


