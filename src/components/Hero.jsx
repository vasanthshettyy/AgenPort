import { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import HeroCursorReveal from './HeroCursorReveal';

// Stable public path — compressed WebP (24KB vs 2MB original PNG)
const me = '/vasanth-hero.webp';

const ROTATING_WORDS = [
  "LANDING PAGES.",
  "LEAD GEN SITES.",
  "ONLINE STORES.",
  "CUSTOM WEBSITES."
];

const HeroHeadlineCycler = () => {
  const [index, setIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [prefersReducedMotion]);

  return (
    <span className="hero-line block text-content-accent relative h-[1.15em] overflow-hidden align-bottom [mask-image:linear-gradient(to_bottom,transparent_0%,black_15%,black_85%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_15%,black_85%,transparent_100%)]">
      <span
        key={prefersReducedMotion ? 'static' : index}
        className={`block text-content-accent font-extrabold whitespace-nowrap ${prefersReducedMotion ? '' : 'animate-hero-word-slide'
          }`}
      >
        {ROTATING_WORDS[index]}
      </span>
    </span>
  );
};

const Hero = () => {
  const container = useRef();
  const imageWrapRef = useRef(null);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleInteraction = useCallback(() => {
    setHasInteracted(true);
  }, []);

  // GSAP entrance — no overflow-hidden clip needed, animate opacity+y directly
  useGSAP(() => {
    // Set initial state via GSAP (not hardcoded in JSX) so elements paint visible for LCP,
    // then GSAP immediately hides them synchronously before the first frame, then animates in.
    gsap.set(['.hero-line', '.hero-sub', '.hero-cta', '.hero-image-wrap'], { opacity: 0 });
    gsap.set('.hero-line', { y: 40 });
    gsap.set(['.hero-sub', '.hero-cta'], { y: 20 });
    gsap.set('.hero-image-wrap', { x: 60 });

    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

    tl.to('.hero-line', { opacity: 1, y: 0, stagger: 0.12, duration: 1.2 })
      .to('.hero-sub', { opacity: 1, y: 0, duration: 1 }, '-=0.8')
      .to('.hero-cta', { opacity: 1, y: 0, duration: 0.8 }, '-=0.6')
      .to('.hero-image-wrap', { opacity: 1, x: 0, duration: 1.5 }, '-=1.4');
  }, { scope: container, dependencies: [isMobile] });


  return (
    <section
      id="hero"
      ref={container}
      className="relative min-h-[100dvh] flex items-center overflow-hidden bg-canvas pt-16 sm:pt-20 lg:pt-24"
    >
      {/* ── Desktop: Two-column split layout ── */}
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-10 flex flex-col lg:flex-row items-center lg:items-center gap-12 lg:gap-0 py-28 lg:py-0">

        {/* LEFT — Text */}
        <div className="flex-1 flex flex-col items-start gap-6 lg:gap-8 z-10">

          {/* Main Headline */}
          <h1 className="flex flex-col gap-1 text-[clamp(2rem,4.5vw,4.5rem)] leading-[0.94] tracking-[-0.04em] font-extrabold">
            <span className="hero-line block">FREELANCE WEB</span>
            <span className="hero-line block italic text-content-secondary">DEVELOPER FOR GROWING BRANDS: </span>
            <HeroHeadlineCycler />
          </h1>

          {/* Subtext */}
          <p className="hero-sub max-w-md text-base sm:text-lg lg:text-xl text-content-secondary font-light leading-relaxed">
            I build fast, custom-coded websites that turn visitors into clients. No templates. No platform limitations.
          </p>

          {/* CTAs */}
          <div className="hero-cta flex flex-col sm:flex-row gap-6 items-start">
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative px-8 py-4 bg-content-primary text-canvas font-bold tracking-wider uppercase rounded-full overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.12)] min-h-[48px]"
            >
              <span className="btn-fill-text group-hover:text-canvas">
                Start a Project
              </span>
              <div className="btn-fill-layer bg-content-accent" />
            </button>
          </div>
        </div>

        {/* RIGHT — Image */}
        <div className="relative w-full max-w-[320px] sm:max-w-[400px] lg:max-w-none lg:w-[480px] xl:w-[520px] flex-shrink-0 flex items-center justify-center">
          {/* Glow bloom */}
          <div className="hero-bloom absolute inset-0 w-full h-full bg-content-neon/10 rounded-full blur-[100px] pointer-events-none" />

          {/* Image wrapper */}
          <div ref={imageWrapRef} className="hero-image-wrap relative w-full aspect-[3/4] max-h-[75vh] overflow-hidden">
            {/* Subtle ambient border glow — visible only before first interaction/demo */}
            {!hasInteracted && (
              <div className="absolute inset-0 rounded-md border border-content-accent/30 shadow-[0_0_20px_rgba(0,229,255,0.2)] pointer-events-none z-25 transition-opacity duration-1000 animate-pulse" />
            )}
            {/* Base layer — real photo, always visible */}
            <img
              src={me}
              alt="Vasanth Shetty — Web Developer"
              className="hero-image absolute inset-0 w-full h-full object-cover object-top z-10"
              loading="eager"
              fetchPriority="high"
              width="520"
              height="693"
            />
            {/* Cursor/Touch-reveal layer — illustrated version */}
            <HeroCursorReveal
              illustratedSrc="/vasanth-hero-illustrated.webp"
              containerRef={imageWrapRef}
              onInteraction={handleInteraction}
            />
            {/* Subtle edge fade */}
            <div className="absolute inset-0 bg-gradient-to-t from-canvas/80 via-transparent to-transparent pointer-events-none z-30" />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-canvas/60 pointer-events-none z-30" />
          </div>
        </div>
      </div>

      {/* Page accent tint */}
      <div className="absolute inset-0 bg-content-accent/3 mix-blend-screen pointer-events-none z-[1]" />
    </section>
  );
};

export default Hero;
