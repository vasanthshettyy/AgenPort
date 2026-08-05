import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import me from '../assets/vasanth-hero.png';

const Hero = () => {
  const container = useRef();
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'expo.out', duration: isMobile ? 1 : 2 } });

    tl.from('.reveal-line', {
      y: isMobile ? '50%' : '150%',
      skewY: isMobile ? 0 : 10,
      stagger: isMobile ? 0.08 : 0.15,
      opacity: 0,
    })
    .from('.reveal-sub', {
      opacity: 0,
      y: isMobile ? 10 : 20,
      duration: isMobile ? 1 : 1.5,
    }, '-=1')
    .from('.reveal-badge', {
      scale: 0,
      opacity: 0,
      duration: isMobile ? 0.6 : 1,
      ease: 'back.out(1.7)',
    }, '-=0.8')
    .from('.hero-image-wrap', {
      opacity: 0,
      x: isMobile ? 0 : 50,
      duration: isMobile ? 1 : 2,
    }, '-=1.2');

    if (!isMobile) {
      const onMouseMove = (e) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 40;
        const yPos = (clientY / window.innerHeight - 0.5) * 40;

        gsap.to('.hero-bloom', {
          x: xPos,
          y: yPos,
          duration: 2,
          ease: 'power2.out',
        });

        gsap.to('.hero-image', {
          x: xPos / 2,
          y: yPos / 2,
          duration: 2,
          ease: 'power2.out',
        });
      };

      window.addEventListener('mousemove', onMouseMove);
      return () => window.removeEventListener('mousemove', onMouseMove);
    }
  }, { scope: container });

  useEffect(() => {
    const handleResize = () => {
      const nowMobile = window.innerWidth < 768;
      if (isMobile !== nowMobile) {
        window.location.reload();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

  return (
    <section
      id="hero"
      ref={container}
      className="relative min-h-[100dvh] flex flex-col justify-center px-4 sm:px-6 lg:px-10 py-20 sm:py-28 lg:py-48 overflow-hidden bg-canvas"
    >
      {/* Right Side: Light Bloom + Image */}
      <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full z-0 flex items-center justify-center pointer-events-none">
        {!isMobile && (
          <div className="hero-bloom absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] lg:w-[600px] lg:h-[600px] bg-content-neon/10 rounded-full blur-[80px] sm:blur-[100px] lg:blur-[120px]" />
        )}

        <div className={`hero-image-wrap relative ${isMobile ? 'w-full max-w-xs aspect-[3/4]' : 'w-[80%] aspect-[3/4] max-h-[70vh]'} overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 ease-expo group pointer-events-auto`}>
          <img
            src={me}
            alt="Vasanth Shetty"
            className="hero-image w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000 ease-expo"
            loading="eager"
            sizes="(max-width: 768px) 280px, (max-width: 1200px) 400px, 500px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/20 to-transparent opacity-90 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-canvas via-canvas/20 to-transparent opacity-90 pointer-events-none" />
        </div>
      </div>

      {/* Blue Tint Overlay */}
      <div className="absolute inset-0 bg-content-accent/5 mix-blend-screen pointer-events-none z-[1]" />

      <div className="w-full flex flex-col justify-center relative z-10 h-full">
        <div className="flex flex-col items-start min-w-0 w-full">
          {/* Animated Badge */}
          <div className="reveal-badge flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/5 border border-white/20 rounded-full mb-6 sm:mb-8 sm:mb-12">
            <div className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-green-500"></span>
            </div>
            <span className="text-[8px] sm:text-[10px] font-bold tracking-[0.2em] text-content-primary uppercase">
              Accepting limited project bookings
            </span>
          </div>

          <h1 className="text-[clamp(1.75rem,5vw,4rem)] sm:text-[clamp(2rem,5.2vw,5rem)] leading-[0.95] sm:leading-[0.9] tracking-[-0.04em] font-display font-extrabold flex flex-col w-full">
            <div className="overflow-y-hidden">
              <span className="reveal-line block whitespace-nowrap">PREMIUM WEB</span>
            </div>
            <div className="overflow-y-hidden">
              <span className="reveal-line block italic text-content-secondary whitespace-nowrap">DEVELOPMENT FOR</span>
            </div>
            <div className="overflow-y-hidden">
              <span className="reveal-line block whitespace-nowrap">SERVICE BUSINESSES.</span>
            </div>
          </h1>

          <div className="reveal-sub mt-6 sm:mt-8 lg:mt-16 max-w-xl">
            <p className="text-base sm:text-lg lg:text-2xl text-content-secondary font-sans font-light leading-snug lg:leading-tight">
              I build fast, custom-coded websites that elevate your digital presence and turn visitors into clients. No templates. No platform limitations.
            </p>

            <div className="mt-4 sm:mt-6 lg:mt-12 flex flex-col sm:flex-row gap-4 sm:gap-6 items-stretch sm:items-center w-full">
              <button
                onClick={() => {
                  const target = document.querySelector('#contact');
                  if (target) target.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-content-primary text-canvas font-bold tracking-wider uppercase rounded-full hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] text-center min-h-[44px] flex items-center justify-center"
              >
                Start a Project
              </button>

              <div className="flex gap-6 sm:gap-8">
                <button
                  onClick={() => {
                    const target = document.querySelector('#work');
                    if (target) target.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-sm font-bold tracking-widest uppercase border-b-2 border-content-primary pb-2 hover:text-content-neon hover:border-content-neon transition-all duration-500"
                >
                  MY WORK
                </button>
                <button
                  onClick={() => {
                    const target = document.querySelector('#process');
                    if (target) target.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-sm font-bold tracking-widest uppercase text-content-secondary hover:text-content-primary transition-all duration-500"
                >
                  WHY ME
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
