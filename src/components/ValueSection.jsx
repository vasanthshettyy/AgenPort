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
    const sections = gsap.utils.toArray('.value-item');
    
    sections.forEach((section, i) => {
      if (i === sections.length - 1) return; // Last section doesn't need to be pinned

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
          opacity: 0.3,
          scale: 0.92,
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
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
          className="value-item h-[100dvh] min-h-[500px] flex flex-col justify-center px-6 lg:px-20 bg-canvas-surface border-b border-canvas-border overflow-hidden"
        >
          <div className="value-inner max-w-[1400px] w-full mx-auto grid lg:grid-cols-2 gap-6 lg:gap-20 items-center lg:items-end">
            <div className="flex flex-col gap-4 lg:gap-8">
              <span className="text-content-accent font-sans text-lg lg:text-2xl font-bold tracking-tighter">
                {v.number} /
              </span>
              <h2 className="text-3xl sm:text-6xl lg:text-giant font-sans font-bold leading-none tracking-tighter">
                {v.title}
              </h2>
              <p className="text-lg sm:text-2xl lg:text-4xl text-content-secondary font-light max-w-xl leading-snug">
                {v.desc}
              </p>
            </div>
            
            <div className="flex flex-col items-start lg:items-end">
              <span className="text-5xl sm:text-7xl lg:text-[14rem] font-sans font-bold leading-none tracking-tighter text-content-accent/15 lg:text-content-primary/5 select-none">
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
