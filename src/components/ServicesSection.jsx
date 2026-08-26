import { useState, useEffect, useRef } from 'react';
import { services } from '../data/services';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ServicesSection = () => {
  const [active, setActive] = useState(0);
  const sectionRef = useRef(null);
  const serviceItemsRef = useRef([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) return;

    const ctx = gsap.context(() => {
      serviceItemsRef.current.forEach((item, index) => {
        if (!item) return;

        ScrollTrigger.create({
          trigger: item,
          start: 'top 60%',
          end: 'bottom 40%',
          onEnter: () => setActive(index),
          onEnterBack: () => setActive(index),
        });

        gsap.fromTo(
          item,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  const onMouseEnter = (index) => {
    if (window.innerWidth >= 1024) {
      setActive(index);
    }
  };

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
              ref={(el) => (serviceItemsRef.current[index] = el)}
              onClick={() => setActive(index)}
              onTouchStart={() => setActive(index)}
              onMouseEnter={() => onMouseEnter(index)}
              className={`group relative py-6 sm:py-8 lg:py-20 border-b border-canvas-border transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer overflow-hidden active:bg-content-accent/10 ${
                isMobile ? 'min-h-[120px]' : ''
              }`}
            >
              <div className={`absolute inset-0 bg-content-accent/10 origin-left transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${active === index ? 'scale-x-100' : 'scale-x-0'}`} />

              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-20">
                <div className="flex items-center gap-3 lg:gap-20">
                  <span className="text-lg lg:text-2xl font-sans font-bold text-content-secondary/30 transition-colors duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]">
                    0{index + 1}
                  </span>
                  <h3 className={`text-xl sm:text-2xl lg:text-7xl font-sans font-bold transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${active === index ? 'text-content-primary translate-x-2' : 'text-content-secondary translate-x-0'}`}>
                    {service.title}
                  </h3>
                </div>

                <div className={`max-w-md transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${active === index ? 'opacity-100 translate-x-0' : 'opacity-80 lg:opacity-0 -translate-x-4 lg:-translate-x-10'}`}>
                  <p className="text-sm sm:text-base lg:text-2xl text-content-secondary font-light leading-relaxed">
                    {service.desc || service.description}
                  </p>
                </div>
              </div>

              <div className={`absolute bottom-0 left-0 h-1 bg-content-accent transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${active === index ? 'w-full' : 'w-0'}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
