import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import me from '../assets/vasanth-hero.png';

const Hero = () => {
  const container = useRef();
  
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'expo.out', duration: 2 } });

    // Skew-up kinetic reveal
    tl.from('.reveal-line', {
      y: '150%',
      skewY: 10,
      stagger: 0.15,
      opacity: 0,
    })
    .from('.reveal-sub', {
      opacity: 0,
      y: 20,
      duration: 1.5,
    }, '-=1.5')
    .from('.reveal-badge', {
      scale: 0,
      opacity: 0,
      duration: 1,
      ease: 'back.out(1.7)',
    }, '-=1')
    .from('.hero-image-wrap', {
      opacity: 0,
      x: 50,
      duration: 2,
    }, '-=1.8');

    // Light bloom mouse parallax
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
  }, { scope: container });

  return (
    <section 
      ref={container} 
      className="relative min-h-screen flex flex-col justify-center px-4 lg:px-10 py-32 lg:py-48 overflow-hidden bg-canvas"
    >
      {/* Right Side: Light Bloom + Image */}
      <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full z-0 flex items-center justify-center pointer-events-none">
        <div className="hero-bloom absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-content-neon/10 rounded-full blur-[120px]" />

        <div className="hero-image-wrap relative w-[80%] aspect-[3/4] max-h-[70vh] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 ease-expo group border border-white/5 pointer-events-auto">
          <img 
            src={me} 
            alt="Vasanth Shetty" 
            className="hero-image w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000 ease-expo"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-canvas via-transparent to-transparent opacity-60" />
        </div>
      </div>

      <div className="w-full flex flex-col justify-center relative z-10 h-full">
        <div className="flex flex-col items-start min-w-0 w-full">
          {/* Animated Badge */}
          <div className="reveal-badge flex items-center gap-3 px-4 py-2 bg-content-neon/5 border border-content-neon/20 rounded-full mb-12">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-content-neon opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-content-neon"></span>
            </div>
            <span className="text-[10px] font-bold tracking-[0.2em] text-content-neon uppercase">
              Available for International Projects
            </span>
          </div>

          <h1 className="text-[clamp(2.5rem,5.2vw,6rem)] leading-[0.9] tracking-[-0.04em] font-display font-extrabold flex flex-col w-full">
            <div className="overflow-y-hidden">
              <span className="reveal-line block whitespace-nowrap">I BUILD</span>
            </div>
            <div className="overflow-y-hidden">
              <span className="reveal-line block italic text-content-secondary whitespace-nowrap">WEBSITES THAT GET YOU</span>
            </div>
            <div className="overflow-y-hidden">
              <span className="reveal-line block whitespace-nowrap">MORE CLIENTS.</span>
            </div>
          </h1>

          <div className="reveal-sub mt-16 max-w-xl">
            <p className="text-2xl lg:text-3xl text-content-secondary font-sans font-light leading-tight">
              Stop losing customers to an outdated website. I build premium, fast-loading sites for service-based businesses that turn visitors into paying clients.
            </p>
            
            <div className="mt-12 flex gap-8">
              <button className="text-sm font-bold tracking-widest uppercase border-b-2 border-content-primary pb-2 hover:text-content-neon hover:border-content-neon transition-all duration-500">
                MY WORK
              </button>
              <button className="text-sm font-bold tracking-widest uppercase text-content-secondary hover:text-content-primary transition-all duration-500">
                WHY ME
              </button>
            </div>
          </div>
        </div>

        {/* Asymmetrical status info - Grid Aligned */}
        <div className="absolute bottom-0 right-0 flex flex-col items-end gap-1 text-[10px] font-bold tracking-[0.3em] text-content-secondary/40 uppercase">
          <span>LONDON / SYDNEY / SINGAPORE</span>
          <span>CORE ENGINE V1.0</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
