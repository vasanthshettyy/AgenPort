import { useState } from 'react';
import { services } from '../data/services';

const ServicesSection = () => {
  const [active, setActive] = useState(0);

  const onMouseEnter = (index) => {
    setActive(index);
  };

  return (
    <section id="services" className="py-20 lg:py-64 px-6 lg:px-20 bg-canvas overflow-hidden">
      <div className="max-w-[1400px] w-full mx-auto">
        <h2 className="text-4xl sm:text-6xl lg:text-massive font-sans font-bold mb-12 lg:mb-32 tracking-tighter">
          SERVICES
        </h2>

        <div className="flex flex-col border-t border-canvas-border">
          {services.map((service, index) => (
            <div
              key={index}
              onClick={() => setActive(index)}
              onMouseEnter={() => onMouseEnter(index)}
              className="group relative py-8 lg:py-20 border-b border-canvas-border transition-all duration-700 cursor-pointer overflow-hidden"
            >
              {/* Background fill animation */}
              <div className={`absolute inset-0 bg-content-accent/5 origin-bottom transition-transform duration-700 ease-out ${active === index ? 'scale-y-100' : 'scale-y-0'}`} />

              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-20">
                <div className="flex items-center gap-4 lg:gap-20">
                  <span className="text-xl lg:text-2xl font-sans font-bold text-content-secondary/30">
                    0{index + 1}
                  </span>
                  <h3 className={`text-2xl sm:text-4xl lg:text-7xl font-sans font-bold transition-all duration-500 ${active === index ? 'text-content-primary' : 'text-content-secondary'}`}>
                    {service.title}
                  </h3>
                </div>

                <div className={`max-w-md transition-all duration-700 ${active === index ? 'opacity-100 translate-x-0' : 'opacity-80 lg:opacity-0 -translate-x-4 lg:-translate-x-10'}`}>
                  <p className="text-base lg:text-2xl text-content-secondary font-light leading-relaxed">
                    {service.desc || service.description}
                  </p>
                </div>
              </div>

              {/* Hover line animation */}
              <div className={`absolute bottom-0 left-0 h-1 bg-content-accent transition-all duration-700 ${active === index ? 'w-full' : 'w-0'}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
