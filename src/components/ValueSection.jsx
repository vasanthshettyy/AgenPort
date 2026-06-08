import React, { useEffect, useRef, useState } from 'react';
import anime from 'animejs/lib/anime.es.js';
import { createPopper } from '@popperjs/core';
import { testimonials } from '../data/testimonials';

const TooltipSpan = ({ children, tooltipText }) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);
  const popperInstance = useRef(null);

  useEffect(() => {
    if (triggerRef.current && tooltipRef.current) {
      popperInstance.current = createPopper(triggerRef.current, tooltipRef.current, {
        placement: 'top',
        modifiers: [{ name: 'offset', options: { offset: [0, 8] } }],
      });
    }
  }, [isOpen]);

  return (
    <span 
      className="relative inline-block border-b border-dashed border-accent-primary text-accent-primary cursor-help"
      ref={triggerRef}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {children}
      {isOpen && (
        <div ref={tooltipRef} className="z-50 px-3 py-2 text-xs font-medium text-white bg-canvas border border-white/10 rounded shadow-lg max-w-xs">
          {tooltipText}
        </div>
      )}
    </span>
  );
};

export default function ValueSection() {
  const sectionRef = useRef(null);
  const bentoRefs = useRef([]);
  const countersRef = useRef([]);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          // Stagger bento boxes
          anime({
            targets: bentoRefs.current,
            translateY: [40, 0],
            opacity: [0, 1],
            easing: 'easeOutExpo',
            duration: 1000,
            delay: anime.stagger(150),
          });

          // Animate counters
          countersRef.current.forEach((counter) => {
            if (!counter) return;
            const targetValue = parseFloat(counter.getAttribute('data-value'));
            const isCurrency = counter.hasAttribute('data-currency');
            const suffix = counter.getAttribute('data-suffix') || '';
            const obj = { val: 0 };
            
            anime({
              targets: obj,
              val: targetValue,
              round: targetValue % 1 === 0 ? 1 : 10,
              duration: 2000,
              easing: 'easeOutExpo',
              update: function() {
                counter.innerHTML = `${isCurrency ? '$' : ''}${obj.val}${suffix}`;
              }
            });
          });
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, [hasAnimated]);

  const setBentoRef = (el) => {
    if (el && !bentoRefs.current.includes(el)) {
      bentoRefs.current.push(el);
    }
  };

  const setCounterRef = (el) => {
    if (el && !countersRef.current.includes(el)) {
      countersRef.current.push(el);
    }
  };

  return (
    <section id="process" ref={sectionRef} className="py-24 bg-canvas-light relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6">
            Infrastructure as a Competitive Advantage
          </h2>
          <p className="text-gray-400 text-lg">
            Template builders and bloated SaaS dependencies kill scale. We engineer custom architectures that give you full ownership, supreme speed, and zero monthly platform fees.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Card 1 */}
          <div ref={setBentoRef} className="col-span-1 md:col-span-2 bg-canvas border border-white/10 rounded-3xl p-8 opacity-0">
            <h3 className="text-xl font-bold text-white mb-4">Custom vs. Template Architecture</h3>
            <div className="grid grid-cols-2 gap-4 text-sm mt-6">
              <div className="p-4 bg-white/5 rounded-xl border border-red-500/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 text-xs font-mono text-red-400">Template/No-Code</div>
                <div className="mt-4 text-gray-400 space-y-2">
                  <p>Shared Databases</p>
                  <p>Monthly User Fees</p>
                  <p>High Load Latency</p>
                  <p>Locked-in Data</p>
                </div>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-green-500/30 relative overflow-hidden">
                <div className="absolute inset-0 bg-green-500/5 backdrop-blur-3xl"></div>
                <div className="absolute top-0 right-0 p-2 text-xs font-mono text-green-400">Custom Engineering</div>
                <div className="mt-4 text-white space-y-2 relative z-10">
                  <p><TooltipSpan tooltipText="Isolated, highly-optimized databases structured exactly for your data schema.">Custom DB Schema</TooltipSpan></p>
                  <p>Zero Platform Fees</p>
                  <p>Sub-Second Execution</p>
                  <p>100% IP Ownership</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 - Performance */}
          <div ref={setBentoRef} className="col-span-1 bg-canvas border border-white/10 rounded-3xl p-8 opacity-0 flex flex-col justify-center items-center text-center">
            <div className="text-5xl font-black text-accent-primary mb-2 flex items-baseline">
              <span ref={setCounterRef} data-value="3" data-suffix="x">0</span>
            </div>
            <p className="text-gray-300 font-medium">Faster Load Times</p>
            <p className="text-xs text-gray-500 mt-2">vs. standard CMS setups</p>
          </div>

          {/* Card 3 - Cost Savings */}
          <div ref={setBentoRef} className="col-span-1 bg-canvas border border-white/10 rounded-3xl p-8 opacity-0 flex flex-col justify-center items-center text-center relative overflow-hidden">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-accent-secondary/20 blur-3xl rounded-full"></div>
             <div className="text-5xl font-black text-white mb-2 relative z-10">
              <span ref={setCounterRef} data-value="0" data-currency="true">0</span>
            </div>
            <p className="text-gray-300 font-medium relative z-10">Monthly SaaS Tax</p>
            <p className="text-xs text-gray-500 mt-2 relative z-10">Own your infrastructure</p>
          </div>

          {/* Card 4 - Ownership */}
          <div ref={setBentoRef} className="col-span-1 md:col-span-2 bg-canvas border border-white/10 rounded-3xl p-8 opacity-0 flex flex-col justify-center">
            <div className="text-5xl font-black text-accent-secondary mb-2">
              <span ref={setCounterRef} data-value="100" data-suffix="%">0</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Data & IP Ownership</h3>
            <p className="text-gray-400 text-sm max-w-md">
              Your codebase, your database, your intellectual property. We build the engine and hand over the keys. 
              No proprietary <TooltipSpan tooltipText="Vendor lock-in refers to situations where customers are dependent on a single vendor for products and services.">vendor lock-in</TooltipSpan>.
            </p>
          </div>
        </div>
      </div>

      {/* Testimonial Marquee */}
      <div className="mt-12 border-y border-white/5 py-6 flex overflow-hidden group bg-canvas">
        <div className="flex animate-marquee group-hover:pause whitespace-nowrap">
          {[...testimonials, ...testimonials].map((t, i) => (
            <div key={i} className="mx-8 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white font-bold">
                {t.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm text-gray-300 font-medium">"{t.outcome}"</p>
                <p className="text-xs text-gray-500">{t.name}, {t.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .pause {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
