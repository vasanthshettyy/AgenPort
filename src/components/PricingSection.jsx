import { useEffect, useRef, useState } from 'react';
import { pricingPlans } from '../data/pricingData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function PricingSection({ onSelectPlan }) {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || isMobile) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  const handleCtaClick = (plan) => {
    const planData = {
      planName: plan.name,
      retainerSelected: false
    };

    if (onSelectPlan) {
      onSelectPlan(planData);
    }

    window.dispatchEvent(new CustomEvent('prefillContactQuoteNoPrice', { detail: planData }));

    const contactElem = document.querySelector('#contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="plans" ref={sectionRef} className="py-16 sm:py-20 lg:py-32 px-4 sm:px-6 lg:px-20 bg-canvas border-t border-canvas-border overflow-hidden">
      <div className="max-w-[1400px] w-full mx-auto">
        {/* Section Header */}
        <div className="mb-8 sm:mb-12 lg:mb-16">
          <span className="text-[10px] sm:text-xs font-mono font-semibold tracking-[0.25em] text-content-secondary uppercase mb-3 block">
            SERVICE PLANS & SCOPES
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-sans font-bold tracking-tighter text-content-primary uppercase">
            Service Plans.
          </h2>
          <p className="text-content-secondary mt-3 sm:mt-4 max-w-xl text-base sm:text-lg font-light leading-relaxed">
            Three plans covering most small business needs - pick one, or tell me what you're after and I'll scope it.
          </p>
        </div>

        {/* 3-Card Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-stretch">
          {pricingPlans.map((plan, idx) => (
            <div
              key={plan.id}
              ref={(el) => (cardsRef.current[idx] = el)}
              className={`relative flex flex-col justify-between p-4 sm:p-6 lg:p-8 lg:p-10 rounded-2xl sm:rounded-3xl border transition-all duration-300 hover:-translate-y-1 active:scale-[0.98] ${
                plan.popular
                  ? 'bg-canvas-card border-content-accent/50 shadow-lg shadow-content-accent/5 scale-102 z-10'
                  : 'bg-canvas-card border-canvas-border hover:border-content-secondary/40 active:border-content-accent'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3.5 left-4 sm:left-8 bg-content-accent text-canvas text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider px-3 sm:px-3.5 py-1 rounded-full shadow-md">
                  Recommended
                </div>
              )}

              <div>
                {/* Tier Label, Title & Subtitle */}
                <div className="mb-4 sm:mb-6">
                  <span className="text-[9px] sm:text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-content-secondary font-medium">
                    {plan.tag}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-sans font-bold text-content-primary tracking-tight mt-1">
                    {plan.name}
                  </h3>
                  <p className="text-[10px] sm:text-xs font-mono text-content-secondary mt-1">{plan.subtitle}</p>
                </div>

                <p className="text-xs sm:text-sm text-content-secondary leading-relaxed mb-4 sm:mb-6">
                  {plan.description}
                </p>

                {/* Scope & Deliverables */}
                <div className="space-y-2.5 mb-4 sm:mb-8">
                  <div className="text-[10px] sm:text-xs font-mono font-medium uppercase tracking-wider text-content-secondary mb-3">
                    Included Deliverables
                  </div>
                  {plan.deliverables.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 text-xs text-content-secondary">
                      <span className="text-content-secondary/60 text-[10px] font-mono mt-0.5">-</span>
                      <span className="leading-snug">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Optional Maintenance & Retainer Note */}
                <div className="p-3 sm:p-4 bg-canvas-hover/50 border border-canvas-border rounded-xl sm:rounded-2xl mb-4 sm:mb-8">
                  <div className="flex justify-between items-center text-xs font-medium text-content-primary mb-1">
                    <span className="font-mono text-[10px] text-content-primary">
                      {plan.retainer.name}
                    </span>
                    <span className="font-mono text-[9px] sm:text-[10px] text-content-secondary uppercase">
                      Optional Retainer
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-xs text-content-secondary leading-snug">
                    {plan.retainer.description}
                  </p>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={() => handleCtaClick(plan)}
                className={`w-full py-3 sm:py-4 px-4 sm:px-6 rounded-full font-sans font-medium text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 group ${
                  plan.popular
                    ? 'bg-content-accent text-canvas hover:bg-content-accent/90 shadow-md font-bold'
                    : 'bg-transparent border border-canvas-border text-content-primary hover:border-content-primary hover:bg-canvas-hover'
                }`}
              >
                <span>Request Custom Quote</span>
                <span className="transform group-hover:translate-x-1 transition-transform">-&gt;</span>
              </button>
            </div>
          ))}
        </div>

        {/* Footnote Notice */}
        <div className="mt-8 sm:mt-12 text-center text-[10px] sm:text-xs font-mono text-content-secondary max-w-2xl mx-auto">
          Every project receives a custom scope assessment to fit your exact business goals and timeline.
        </div>
      </div>
    </section>
  );
}
