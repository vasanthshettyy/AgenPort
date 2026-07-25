import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    number: '01',
    title: 'CONVERSION',
    desc: 'Sites meticulously designed to turn your passive traffic into booked appointments and active calls.',
    stat: 'Higher ROI',
  },
  {
    number: '02',
    title: 'MOBILE-FIRST',
    desc: 'The majority of your clients find you on their phones. We ensure a flawless mobile experience.',
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

  useGSAP(() => {
    const isMobile = window.innerWidth < 1024;
    const sections = gsap.utils.toArray('.value-item');

    if (isMobile) {
      // Mobile-only kinetic entrance & scroll-reactive glow animations
      sections.forEach((section) => {
        const title = section.querySelector('.value-title');
        const desc = section.querySelector('.value-desc');
        const stat = section.querySelector('.value-stat');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 30%',
            toggleActions: 'play none none reverse',
          }
        });

        tl.fromTo(title, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' })
          .fromTo(desc, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.4')
          .fromTo(stat, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 0.25, duration: 0.8, ease: 'back.out(1.5)' }, '-=0.5');
      });
      return;
    }

    // Desktop: Full-screen pin & stacking animation
    sections.forEach((section, i) => {
      if (i === sections.length - 1) return;

      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        pin: true,
        pinSpacing: false,
        scrub: 1.5,
      });

      const inner = section.querySelector('.value-inner');
      if (inner) {
        gsap.to(inner, {
          opacity: 0.5,
          scale: 0.9,
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          }
        });
      }
    });
  }, { scope: container });

  return (
    <section id="process" ref={container} className="bg-canvas">
      {values.map((v, i) => (
        <div 
          key={i} 
          className="value-item min-h-screen lg:h-screen flex flex-col justify-center px-6 lg:px-20 py-20 lg:py-0 bg-canvas-surface border-b border-canvas-border overflow-hidden"
        >
          <div className="value-inner max-w-[1400px] w-full mx-auto grid lg:grid-cols-2 gap-10 lg:gap-20 items-center lg:items-end">
            <div className="flex flex-col gap-6 lg:gap-8">
              <span className="text-content-accent font-sans text-xl lg:text-2xl font-bold tracking-tighter">
                {v.number} /
              </span>
              <h2 className="value-title text-4xl sm:text-6xl lg:text-giant font-sans font-bold leading-none tracking-tighter">
                {v.title}
              </h2>
              <p className="value-desc text-xl sm:text-2xl lg:text-4xl text-content-secondary font-light max-w-xl leading-snug">
                {v.desc}
              </p>
            </div>
            
            <div className="flex flex-col items-start lg:items-end">
              <span className="value-stat text-5xl sm:text-7xl lg:text-[14rem] font-sans font-bold leading-none tracking-tighter text-content-accent/20 lg:text-content-primary/5 select-none">
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
