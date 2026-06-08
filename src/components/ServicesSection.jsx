import React, { useRef, useEffect, useState } from 'react';
import anime from 'animejs';
import { createPopper } from '@popperjs/core';
import { services } from '../data/services';
import { techStack } from '../data/techStack';
import { processSteps } from '../data/processSteps';

const TechChip = ({ tech }) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);
  const popperInstance = useRef(null);

  useEffect(() => {
    if (triggerRef.current && tooltipRef.current) {
      popperInstance.current = createPopper(triggerRef.current, tooltipRef.current, {
        placement: 'top',
        modifiers: [
          { name: 'offset', options: { offset: [0, 8] } },
          { name: 'preventOverflow', options: { padding: 8 } }
        ],
      });
    }
  }, [isOpen]);

  const handleMouseEnter = () => {
    setIsOpen(true);
    popperInstance.current?.update();
  };

  return (
    <div 
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div 
        ref={triggerRef}
        className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-accent-primary/50 transition-colors cursor-default text-sm font-medium text-gray-300"
      >
        {tech.name}
      </div>
      
      {isOpen && (
        <div 
          ref={tooltipRef} 
          className="z-50 px-4 py-3 bg-canvas-light border border-white/10 rounded-xl shadow-2xl max-w-[200px]"
        >
          <div className="text-xs font-semibold text-accent-primary mb-1 uppercase tracking-wider">{tech.category}</div>
          <div className="text-xs text-gray-300 leading-relaxed">{tech.description}</div>
        </div>
      )}
    </div>
  );
};

export default function ServicesSection() {
  const sectionRef = useRef(null);
  const serviceCardsRef = useRef([]);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          anime({
            targets: serviceCardsRef.current,
            translateY: [40, 0],
            opacity: [0, 1],
            easing: 'easeOutExpo',
            duration: 800,
            delay: anime.stagger(100)
          });
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, [hasAnimated]);

  const handleCardHoverEnter = (el) => {
    anime({
      targets: el,
      scale: 1.02,
      boxShadow: '0 10px 30px -10px rgba(0, 212, 255, 0.1)',
      borderColor: 'rgba(0, 212, 255, 0.4)',
      duration: 300,
      easing: 'easeOutQuad'
    });
  };

  const handleCardHoverLeave = (el) => {
    anime({
      targets: el,
      scale: 1,
      boxShadow: '0 0px 0px 0px rgba(0,0,0,0)',
      borderColor: 'rgba(255, 255, 255, 0.05)',
      duration: 300,
      easing: 'easeOutQuad'
    });
  };

  const setServiceCardRef = (el) => {
    if (el && !serviceCardsRef.current.includes(el)) {
      serviceCardsRef.current.push(el);
    }
  };

  return (
    <section id="services" ref={sectionRef} className="py-24 bg-canvas-light relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header & Availability Badge */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Engineered Solutions.</h2>
            <p className="text-gray-400 text-lg">
              We specialize in complex data relationships, high-performance user interfaces, and secure backend systems for enterprise operations.
            </p>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </div>
            <span className="text-sm font-medium text-white">Currently Accepting New Clients</span>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {services.map((service, idx) => (
            <div 
              key={idx}
              ref={setServiceCardRef}
              onMouseEnter={(e) => handleCardHoverEnter(e.currentTarget)}
              onMouseLeave={(e) => handleCardHoverLeave(e.currentTarget)}
              className="bg-canvas border border-white/5 p-8 rounded-3xl opacity-0 transform-gpu"
            >
              <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
              <p className="text-gray-400 text-sm mb-8">{service.description}</p>
              <ul className="space-y-3">
                {service.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3 text-sm text-gray-300">
                    <span className="text-accent-primary mt-0.5">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Tech Stack Strip */}
        <div className="mb-20">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-6">Core Technology Stack</h3>
          <div className="flex flex-wrap gap-3">
            {techStack.map((tech, idx) => (
              <TechChip key={idx} tech={tech} />
            ))}
          </div>
        </div>

        {/* Process Flow */}
        <div className="bg-canvas border border-white/5 rounded-3xl p-8 md:p-12">
          <h3 className="text-2xl font-bold text-white mb-10">Our Engagement Model</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative">
            <div className="hidden md:block absolute top-6 left-0 right-0 h-px bg-gradient-to-r from-accent-primary/50 to-transparent z-0"></div>
            {processSteps.map((step, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-start">
                <div className="w-12 h-12 rounded-full bg-canvas-light border-2 border-accent-primary flex items-center justify-center text-sm font-bold text-accent-primary mb-6 shadow-[0_0_15px_rgba(0,212,255,0.2)]">
                  {step.step}
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{step.title}</h4>
                <p className="text-sm text-gray-400 pr-4">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
