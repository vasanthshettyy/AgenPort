import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    number: '01',
    title: 'PERFORMANCE',
    desc: 'We build systems that load in under 500ms, globally.',
    stat: '3x Faster',
  },
  {
    number: '02',
    title: 'OWNERSHIP',
    desc: 'Zero SaaS tax. You own the code, the data, and the future.',
    stat: '100% IP',
  },
  {
    number: '03',
    title: 'SCALE',
    desc: 'Infrastructures designed for millions of requests, not thousands.',
    stat: 'Infinite',
  },
];

const ValueSection = () => {
  const container = useRef();

  useGSAP(() => {
    const sections = gsap.utils.toArray('.value-item');
    
    sections.forEach((section, i) => {
      if (i === sections.length - 1) return; // Last section doesn't need to be pinned

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
          className="value-item h-screen flex flex-col justify-center px-6 lg:px-20 bg-canvas-surface border-b border-canvas-border"
        >
          <div className="value-inner max-w-[1400px] w-full mx-auto grid lg:grid-cols-2 gap-20 items-end">
            <div className="flex flex-col gap-8">
              <span className="text-content-accent font-sans text-2xl font-bold tracking-tighter">
                {v.number} /
              </span>
              <h2 className="text-giant font-sans font-bold leading-none tracking-tighter">
                {v.title}
              </h2>
              <p className="text-3xl lg:text-4xl text-content-secondary font-light max-w-xl leading-snug">
                {v.desc}
              </p>
            </div>
            
            <div className="flex flex-col items-end">
              <span className="text-[8rem] lg:text-[14rem] font-sans font-bold leading-none tracking-tighter text-content-primary/5 select-none">
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
