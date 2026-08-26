import { useEffect, useRef } from 'react';
import { services } from '../data/services';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ServicesSection = () => {
  const sectionRef = useRef(null);
  const itemRefs = useRef([]);
  const fillRefs = useRef([]);
  const lineRefs = useRef([]);
  const titleRefs = useRef([]);
  const descRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ─── Scroll entrance animations ─────────────────────────────────
      itemRefs.current.forEach((item) => {
        if (!item) return;
        gsap.fromTo(
          item,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 88%',
            },
          }
        );
      });

      // ─── Hover / touch: left-to-right fill ──────────────────────────
      itemRefs.current.forEach((item, i) => {
        if (!item) return;

        const fill  = fillRefs.current[i];
        const line  = lineRefs.current[i];
        const title = titleRefs.current[i];
        const desc  = descRefs.current[i];

        // Start state — fill hidden at scaleX 0 from left
        gsap.set(fill, { scaleX: 0, transformOrigin: 'left center' });
        gsap.set(line, { scaleX: 0, transformOrigin: 'left center' });

        const enter = () => {
          gsap.to(fill, {
            scaleX: 1,
            duration: 0.6,
            ease: 'power2.out',
          });
          gsap.to(line, {
            scaleX: 1,
            duration: 0.5,
            ease: 'power2.out',
            delay: 0.05,
          });
          gsap.to(title, {
            color: 'var(--color-content-primary, #fff)',
            x: 8,
            duration: 0.5,
            ease: 'power2.out',
          });
          gsap.to(desc, {
            opacity: 1,
            x: 0,
            duration: 0.5,
            ease: 'power2.out',
          });
        };

        const leave = () => {
          gsap.to(fill, {
            scaleX: 0,
            duration: 0.5,
            ease: 'power2.inOut',
          });
          gsap.to(line, {
            scaleX: 0,
            duration: 0.4,
            ease: 'power2.inOut',
          });
          gsap.to(title, {
            color: 'var(--color-content-secondary, #888)',
            x: 0,
            duration: 0.5,
            ease: 'power2.inOut',
          });
          gsap.to(desc, {
            opacity: 0,
            x: -16,
            duration: 0.4,
            ease: 'power2.inOut',
          });
        };

        item.addEventListener('mouseenter', enter);
        item.addEventListener('mouseleave', leave);
        item.addEventListener('touchstart', enter, { passive: true });

        // Store cleanup refs
        item._gsapEnter = enter;
        item._gsapLeave = leave;
      });

      // ─── Mobile: scroll-based activation ────────────────────────────
      itemRefs.current.forEach((item, i) => {
        if (!item) return;
        ScrollTrigger.create({
          trigger: item,
          start: 'top 60%',
          end: 'bottom 40%',
          onEnter: () => {
            if (window.innerWidth < 1024) {
              gsap.to(fillRefs.current[i],  { scaleX: 1, duration: 0.6, ease: 'power2.out' });
              gsap.to(lineRefs.current[i],  { scaleX: 1, duration: 0.5, ease: 'power2.out', delay: 0.05 });
              gsap.to(titleRefs.current[i], { color: 'var(--color-content-primary, #fff)', x: 8, duration: 0.5, ease: 'power2.out' });
              gsap.to(descRefs.current[i],  { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' });
            }
          },
          onLeave: () => {
            if (window.innerWidth < 1024) {
              gsap.to(fillRefs.current[i],  { scaleX: 0, duration: 0.5, ease: 'power2.inOut' });
              gsap.to(lineRefs.current[i],  { scaleX: 0, duration: 0.4, ease: 'power2.inOut' });
              gsap.to(titleRefs.current[i], { color: 'var(--color-content-secondary, #888)', x: 0, duration: 0.5, ease: 'power2.inOut' });
              gsap.to(descRefs.current[i],  { opacity: 0, x: -16, duration: 0.4, ease: 'power2.inOut' });
            }
          },
          onEnterBack: () => {
            if (window.innerWidth < 1024) {
              gsap.to(fillRefs.current[i],  { scaleX: 1, duration: 0.6, ease: 'power2.out' });
              gsap.to(lineRefs.current[i],  { scaleX: 1, duration: 0.5, ease: 'power2.out', delay: 0.05 });
              gsap.to(titleRefs.current[i], { color: 'var(--color-content-primary, #fff)', x: 8, duration: 0.5, ease: 'power2.out' });
              gsap.to(descRefs.current[i],  { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' });
            }
          },
          onLeaveBack: () => {
            if (window.innerWidth < 1024) {
              gsap.to(fillRefs.current[i],  { scaleX: 0, duration: 0.5, ease: 'power2.inOut' });
              gsap.to(lineRefs.current[i],  { scaleX: 0, duration: 0.4, ease: 'power2.inOut' });
              gsap.to(titleRefs.current[i], { color: 'var(--color-content-secondary, #888)', x: 0, duration: 0.5, ease: 'power2.inOut' });
              gsap.to(descRefs.current[i],  { opacity: 0, x: -16, duration: 0.4, ease: 'power2.inOut' });
            }
          },
        });
      });
    }, sectionRef);

    return () => {
      // Remove event listeners
      itemRefs.current.forEach((item) => {
        if (!item) return;
        if (item._gsapEnter) item.removeEventListener('mouseenter', item._gsapEnter);
        if (item._gsapLeave) item.removeEventListener('mouseleave', item._gsapLeave);
        if (item._gsapEnter) item.removeEventListener('touchstart', item._gsapEnter);
      });
      ctx.revert();
    };
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-16 sm:py-20 lg:py-64 px-4 sm:px-6 lg:px-20 bg-canvas overflow-hidden">
      <div className="max-w-[1400px] w-full mx-auto">
        <h2 className="text-3xl sm:text-5xl lg:text-massive font-sans font-bold mb-8 sm:mb-12 lg:mb-32 tracking-tighter">
          SERVICES
        </h2>

        <div className="flex flex-col border-t border-canvas-border">
          {services.map((service, index) => (
            <div
              key={index}
              ref={(el) => (itemRefs.current[index] = el)}
              className="group relative py-6 sm:py-8 lg:py-20 border-b border-canvas-border cursor-pointer overflow-hidden"
            >
              {/* Left-to-right background fill — driven purely by GSAP */}
              <div
                ref={(el) => (fillRefs.current[index] = el)}
                className="absolute inset-0 bg-content-accent/10 will-change-transform"
                style={{ transform: 'scaleX(0)', transformOrigin: 'left center' }}
              />

              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-20">
                <div className="flex items-center gap-3 lg:gap-20">
                  <span className="text-lg lg:text-2xl font-sans font-bold text-content-secondary/30">
                    0{index + 1}
                  </span>
                  <h3
                    ref={(el) => (titleRefs.current[index] = el)}
                    className="text-xl sm:text-2xl lg:text-7xl font-sans font-bold will-change-transform"
                    style={{ color: 'var(--color-content-secondary, #888)' }}
                  >
                    {service.title}
                  </h3>
                </div>

                <div
                  ref={(el) => (descRefs.current[index] = el)}
                  className="max-w-md will-change-transform"
                  style={{ opacity: 0, transform: 'translateX(-16px)' }}
                >
                  <p className="text-sm sm:text-base lg:text-2xl text-content-secondary font-light leading-relaxed">
                    {service.desc || service.description}
                  </p>
                </div>
              </div>

              {/* Bottom accent line — also left-to-right via GSAP */}
              <div
                ref={(el) => (lineRefs.current[index] = el)}
                className="absolute bottom-0 left-0 h-[2px] w-full bg-content-accent will-change-transform"
                style={{ transform: 'scaleX(0)', transformOrigin: 'left center' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
