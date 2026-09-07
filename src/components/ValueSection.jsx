import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    number: '01',
    title: 'CONVERSION',
    desc: 'Built to turn your website visitors into booked appointments and phone calls.',
    stat: 'Higher ROI',
  },
  {
    number: '02',
    title: 'MOBILE-FIRST',
    desc: 'The majority of your clients find you on their phones. I ensure a flawless mobile experience.',
    stat: 'Mobile Ready',
  },
  {
    number: '03',
    title: 'SEO FOCUSED',
    desc: 'Built with technical SEO best practices so you naturally rank higher on Google search results.',
    stat: 'Rank Higher',
  },
  {
    number: '04',
    title: 'RELIABILITY',
    desc: 'Your business runs around the clock, and your website should too. Lightning fast with zero downtime.',
    stat: '99.9% Uptime',
  },
  {
    number: '05',
    title: 'NO HIDDEN FEES',
    desc: 'You own your website completely. No hostage situations, no expensive monthly platform taxes.',
    stat: '100% Yours',
  },
];

const ValueSection = () => {
  const container = useRef();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Desktop pin/scale scroll triggers (UNTOUCHED)
  useGSAP(() => {
    if (isMobile) return;

    const sections = gsap.utils.toArray('.value-item');
    const lastIndex = sections.length - 1;

    sections.forEach((section, i) => {
      if (i < lastIndex) {
        ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          pin: true,
          pinSpacing: false,
          scrub: 1,
        });

        const inner = section.querySelector('.value-inner');
        if (inner) {
          gsap.to(inner, {
            opacity: 0,
            scale: 0.92,
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: 'bottom top',
              scrub: 1,
            },
          });
        }
      }
    });
  }, { scope: container, dependencies: [isMobile] });

  // Mobile-only touch reactive tilt interaction
  useEffect(() => {
    if (!isMobile) return;
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const cardNodes = container.current?.querySelectorAll('.value-item');
    if (!cardNodes) return;

    const cleanups = [];

    cardNodes.forEach((card) => {
      const numeral = card.querySelector('.mobile-numeral');
      const inner = card.querySelector('.value-inner');
      let rect = null;

      const updateTilt = (clientX, clientY) => {
        if (!rect) return;
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateY = ((x - centerX) / centerX) * 5;
        const rotateX = -((y - centerY) / centerY) * 5;

        if (inner) {
          inner.style.transform = `perspective(800px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
        }
        if (numeral) {
          const shiftX = ((x - centerX) / centerX) * 10;
          const shiftY = ((y - centerY) / centerY) * 10;
          numeral.style.transform = `translate3d(${shiftX.toFixed(1)}px, ${shiftY.toFixed(1)}px, 0)`;
          numeral.style.color = 'rgba(255, 255, 255, 0.16)';
        }
      };

      const handleTouchStart = (e) => {
        rect = card.getBoundingClientRect();
        card.classList.add('mobile-touched');
        if (e.touches && e.touches[0]) {
          updateTilt(e.touches[0].clientX, e.touches[0].clientY);
        }
      };

      const handleTouchMove = (e) => {
        if (e.touches && e.touches[0]) {
          updateTilt(e.touches[0].clientX, e.touches[0].clientY);
        }
      };

      const handleTouchEnd = () => {
        card.classList.remove('mobile-touched');
        if (inner) {
          inner.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
        }
        if (numeral) {
          numeral.style.transform = 'translate3d(0px, 0px, 0)';
          numeral.style.color = 'rgba(255, 255, 255, 0.07)';
        }
      };

      // Mouse fallback for desktop browser emulation / puppeteer testing
      const handleMouseDown = (e) => {
        rect = card.getBoundingClientRect();
        card.classList.add('mobile-touched');
        updateTilt(e.clientX, e.clientY);

        const onMouseMove = (moveEvt) => updateTilt(moveEvt.clientX, moveEvt.clientY);
        const onMouseUp = () => {
          handleTouchEnd();
          window.removeEventListener('mousemove', onMouseMove);
          window.removeEventListener('mouseup', onMouseUp);
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
      };

      card.addEventListener('touchstart', handleTouchStart, { passive: true });
      card.addEventListener('touchmove', handleTouchMove, { passive: true });
      card.addEventListener('touchend', handleTouchEnd, { passive: true });
      card.addEventListener('touchcancel', handleTouchEnd, { passive: true });
      card.addEventListener('mousedown', handleMouseDown);

      cleanups.push(() => {
        card.removeEventListener('touchstart', handleTouchStart);
        card.removeEventListener('touchmove', handleTouchMove);
        card.removeEventListener('touchend', handleTouchEnd);
        card.removeEventListener('touchcancel', handleTouchEnd);
        card.removeEventListener('mousedown', handleMouseDown);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, [isMobile]);

  return (
    <section id="process" ref={container} className="relative bg-canvas overflow-hidden">
      {values.map((v, i) => (
        <div
          key={i}
          className="value-item relative min-h-0 py-10 sm:py-16 lg:py-0 lg:min-h-[100dvh] lg:min-h-[500px] flex flex-col justify-center px-6 sm:px-12 lg:px-20 bg-canvas-surface border-b border-canvas-border transition-all duration-300 overflow-hidden select-none"
          style={{ zIndex: i + 1 }}
        >
          {/* Mobile-only Giant Background Watermark Numeral */}
          <div className="mobile-numeral lg:hidden absolute right-2 bottom-0 sm:right-6 font-sans font-black text-[9rem] sm:text-[13rem] leading-none tracking-tighter text-white/[0.07] pointer-events-none select-none transition-all duration-200 ease-out z-0">
            {v.number}
          </div>

          <div className="value-inner relative z-10 max-w-[1400px] w-full mx-auto grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-20 items-center lg:items-end transition-transform duration-200 ease-out">
            <div className="flex flex-col gap-3 sm:gap-4 lg:gap-8">
              <div className="flex items-center justify-between lg:justify-start gap-4">
                {/* Number shown on desktop only; hidden on mobile */}
                <span className="hidden lg:inline-block text-content-accent font-sans text-base sm:text-lg lg:text-2xl font-bold tracking-tighter">
                  {v.number} /
                </span>

                {/* Mobile-only accent pill badge for stat */}
                <span className="stat-badge lg:hidden inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-content-accent/10 border border-content-accent/20 text-content-accent font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-content-accent animate-pulse" />
                  {v.stat}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-giant font-sans font-bold leading-tight lg:leading-none tracking-tighter transition-colors duration-300">
                {v.title}
              </h2>
              <p className="text-sm sm:text-lg lg:text-4xl text-content-secondary font-light max-w-xl leading-relaxed sm:leading-snug">
                {v.desc}
              </p>
            </div>

            {/* Desktop-only giant watermark stat */}
            <div className="hidden lg:flex flex-col items-end mt-0">
              <span className="text-[14rem] font-sans font-bold leading-none tracking-tighter text-content-primary/5 select-none">
                {v.stat}
              </span>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ValueSection;

