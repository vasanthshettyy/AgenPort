import { useState, useEffect, useRef } from 'react';
import { pricingPlans } from '../data/pricingData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function PricingSection({ onSelectPlan }) {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCtaClick = (plan) => {
    const planData = {
      planName: plan.name
    };

    if (onSelectPlan) {
      onSelectPlan(planData);
    }

    // Dispatch custom prefill event to ContactSection
    window.dispatchEvent(new CustomEvent('prefillContactQuoteNoPrice', { detail: planData }));

    // Smooth scroll to contact form
    const contactElem = document.querySelector('#contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="pricing" ref={sectionRef} className="py-32 px-6 lg:px-20 bg-canvas border-t border-canvas-border overflow-hidden">
      <div className="max-w-[1400px] w-full mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-xs font-mono font-bold tracking-[0.25em] text-content-accent uppercase mb-4 block">
            // Tailored Solutions & Scopes
          </span>
          <h2 className="text-4xl lg:text-6xl font-sans font-bold tracking-tighter text-content-primary uppercase">
            Service Packages.
          </h2>
          <p className="text-content-secondary mt-4 max-w-xl text-lg font-light">
            Bespoke full-stack engineering tailored to your business. Scoped custom with transparent milestones — no SaaS lock-in.
          </p>
        </div>

        {/* 3-Card Responsive Grid */}
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {pricingPlans.map((plan, idx) => (
            <div
              key={plan.id}
              ref={(el) => (cardsRef.current[idx] = el)}
              className={`relative flex flex-col justify-between p-8 lg:p-10 rounded-3xl border transition-all duration-500 hover:shadow-2xl ${
                plan.popular
                  ? 'bg-gradient-to-b from-canvas-card via-canvas-card to-canvas-hover border-content-accent/50 shadow-content-accent/5 scale-102 z-10'
                  : 'bg-canvas-card border-canvas-border hover:border-content-border'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-content-accent text-canvas text-[11px] font-mono font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                  ★ {plan.tag}
                </div>
              )}

              <div>
                {/* Card Title & Subtitle */}
                <div className="mb-6">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-content-accent font-bold">
                    {plan.tag}
                  </span>
                  <h3 className="text-2xl font-sans font-bold text-content-primary tracking-tight mt-1">
                    {plan.name}
                  </h3>
                  <p className="text-xs font-mono text-content-secondary mt-1">{plan.subtitle}</p>
                </div>

                <p className="text-sm text-content-secondary leading-relaxed mb-6">
                  {plan.description}
                </p>

                {/* Scope & Deliverables */}
                <div className="space-y-3 mb-8">
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-content-primary mb-2">
                    Included Deliverables:
                  </div>
                  {plan.deliverables.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 text-xs text-content-secondary">
                      <span className="w-4 h-4 rounded-full bg-content-accent/10 border border-content-accent/40 flex items-center justify-center text-content-accent text-[10px] flex-shrink-0 mt-0.5">
                        ✓
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Optional Maintenance & Retainer Details */}
                <div className="p-4 bg-canvas-hover/60 border border-dashed border-canvas-border rounded-xl mb-8">
                  <div className="flex justify-between items-center text-xs font-bold text-content-primary mb-1">
                    <span className="flex items-center gap-1.5 text-content-accent font-mono text-[11px]">
                      🛡️ {plan.retainer.name}
                    </span>
                    <span className="font-mono text-[10px] text-content-secondary uppercase">
                      Optional Care Add-On
                    </span>
                  </div>
                  <p className="text-[11px] text-content-secondary leading-snug">
                    {plan.retainer.description}
                  </p>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={() => handleCtaClick(plan)}
                className={`w-full py-4 px-6 rounded-full font-sans font-bold text-sm uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 group ${
                  plan.popular
                    ? 'bg-content-accent text-canvas hover:bg-content-accent/90 shadow-lg hover:shadow-content-accent/25'
                    : 'bg-canvas-hover border border-content-border text-content-primary hover:border-content-accent hover:text-content-accent'
                }`}
              >
                <span>Request Custom Quote</span>
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          ))}
        </div>

        {/* Footnote Notice */}
        <div className="mt-12 text-center text-xs font-mono text-content-secondary max-w-2xl mx-auto">
          💡 Every project receives a dedicated scope assessment. We scope milestones, API requirements, and timelines to your exact specifications.
        </div>
      </div>
    </section>
  );
}
