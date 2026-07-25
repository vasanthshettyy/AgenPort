import { useState, useEffect, useRef } from 'react';
import { pricingPlans } from '../data/pricingData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Custom Interactive Add-ons for the Scope Estimator
const SCOPE_ADDONS = [
  { id: 'fast_track', label: '⚡ Expedited Delivery (2 Weeks)', time: '+1 Wk', desc: 'Priority sprint schedule' },
  { id: 'cms', label: '📰 CMS / Blog Engine', time: '+1 Wk', desc: 'Sanity / Strapi or custom markdown CMS' },
  { id: 'api_integrations', label: '🔌 Custom API & Webhooks', time: '+1.5 Wks', desc: 'CRM, payment, or automation pipelines' },
  { id: 'retainer_care', label: '🛡️ Ongoing Care Retainer', time: 'Monthly', desc: 'Priority updates & security monitoring' }
];

export default function PricingSection({ onSelectPlan }) {
  const [selectedAddons, setSelectedAddons] = useState(['fast_track']);
  const [activeTab, setActiveTab] = useState('plans'); // 'plans' | 'estimator'
  const [expandedPlanIndex, setExpandedPlanIndex] = useState(1);
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const estimatorRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current,
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.18,
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

  const toggleAddon = (id) => {
    setSelectedAddons(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleCtaClick = (plan) => {
    const addonLabels = SCOPE_ADDONS
      .filter(a => selectedAddons.includes(a.id))
      .map(a => a.label)
      .join(', ');

    const planData = {
      planName: plan.name,
      customAddons: addonLabels
    };

    if (onSelectPlan) {
      onSelectPlan(planData);
    }

    // Dispatch custom prefill event to ContactSection
    window.dispatchEvent(new CustomEvent('prefillContactQuoteNoPrice', { 
      detail: {
        ...planData,
        retainerSelected: selectedAddons.includes('retainer_care')
      } 
    }));

    // Smooth scroll to contact section
    const contactElem = document.querySelector('#contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="plans" ref={sectionRef} className="py-32 px-6 lg:px-20 bg-canvas border-t border-canvas-border overflow-hidden relative">
      {/* Background Ambient Glow Accents */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-content-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-10 w-96 h-96 bg-content-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1400px] w-full mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div>
            <span className="text-xs font-mono font-bold tracking-[0.25em] text-content-accent uppercase mb-4 block flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-content-accent animate-ping" />
              // Interactive Scope & Deliverables
            </span>
            <h2 className="text-4xl lg:text-6xl font-sans font-bold tracking-tighter text-content-primary uppercase">
              Service Plans.
            </h2>
            <p className="text-content-secondary mt-4 max-w-xl text-lg font-light leading-relaxed">
              Bespoke full-stack engineering tailored to your business. Hover cards to inspect technical specs or build a custom scope below.
            </p>
          </div>

          {/* Interactive Mode Tabs */}
          <div className="flex items-center gap-2 bg-canvas-card p-1.5 rounded-full border border-canvas-border shadow-md">
            <button
              onClick={() => setActiveTab('plans')}
              className={`px-6 py-2.5 rounded-full text-xs font-bold font-mono tracking-wider transition-all duration-300 ${
                activeTab === 'plans'
                  ? 'bg-content-accent text-canvas shadow-lg scale-105'
                  : 'text-content-secondary hover:text-content-primary hover:bg-canvas-hover'
              }`}
            >
              📦 Core Packages
            </button>
            <button
              onClick={() => setActiveTab('estimator')}
              className={`px-6 py-2.5 rounded-full text-xs font-bold font-mono tracking-wider transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'estimator'
                  ? 'bg-content-accent text-canvas shadow-lg scale-105'
                  : 'text-content-secondary hover:text-content-primary hover:bg-canvas-hover'
              }`}
            >
              <span>⚙️ Interactive Scope Builder</span>
              <span className="bg-canvas/20 px-2 py-0.5 rounded-full text-[10px] font-bold">New</span>
            </button>
          </div>
        </div>

        {/* Interactive Scope & Add-on Selector Grid */}
        <div className="mb-16 p-6 lg:p-8 bg-canvas-card/80 border border-canvas-border rounded-3xl backdrop-blur-xl shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
            <div>
              <h3 className="text-xl font-sans font-bold text-content-primary flex items-center gap-2">
                <span>🎛️ Customize Scope & Velocity</span>
              </h3>
              <p className="text-xs font-mono text-content-secondary mt-1">
                Select features to dynamically tailor your engineering timeline & deliverables:
              </p>
            </div>
            
            {/* Dynamic Estimated Timeline Badge */}
            <div className="flex items-center gap-3 px-5 py-2.5 bg-canvas/80 rounded-2xl border border-content-accent/30 shadow-inner">
              <span className="text-xs font-mono text-content-secondary uppercase">Est. Sprint Velocity:</span>
              <span className="text-sm font-mono font-bold text-content-accent animate-pulse">
                {selectedAddons.length === 0 ? '1–2 Weeks' : selectedAddons.length <= 2 ? '2–4 Weeks' : '4–6 Weeks'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SCOPE_ADDONS.map((addon) => {
              const isSelected = selectedAddons.includes(addon.id);
              return (
                <button
                  key={addon.id}
                  onClick={() => toggleAddon(addon.id)}
                  className={`p-4 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between group ${
                    isSelected
                      ? 'bg-content-accent/10 border-content-accent shadow-md shadow-content-accent/5 scale-102'
                      : 'bg-canvas border-canvas-border hover:border-content-border hover:bg-canvas-hover'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-xs font-mono font-bold ${isSelected ? 'text-content-accent' : 'text-content-primary'}`}>
                      {addon.label}
                    </span>
                    <span className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] ${
                      isSelected ? 'bg-content-accent border-content-accent text-canvas font-bold' : 'border-canvas-border'
                    }`}>
                      {isSelected ? '✓' : '+'}
                    </span>
                  </div>
                  <p className="text-[11px] text-content-secondary leading-snug mt-1">
                    {addon.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3-Card Responsive Grid */}
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {pricingPlans.map((plan, idx) => {
            const isExpanded = expandedPlanIndex === idx;

            return (
              <div
                key={plan.id}
                ref={(el) => (cardsRef.current[idx] = el)}
                className={`relative flex flex-col justify-between p-8 lg:p-10 rounded-3xl border transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group cursor-pointer ${
                  plan.popular
                    ? 'bg-gradient-to-b from-canvas-card via-canvas-card to-canvas-hover border-content-accent/50 shadow-content-accent/10 scale-102 z-10'
                    : 'bg-canvas-card border-canvas-border hover:border-content-accent/40'
                }`}
              >
                {/* Ambient Kinetic Border Glow */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-content-accent/0 via-content-accent/20 to-content-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none -z-10 blur-xl" />

                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-content-accent text-canvas text-[11px] font-mono font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-canvas animate-ping" />
                    ★ {plan.tag}
                  </div>
                )}

                <div>
                  {/* Card Title & Subtitle */}
                  <div className="mb-6">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-content-accent font-bold">
                      {plan.tag}
                    </span>
                    <h3 className="text-2xl font-sans font-bold text-content-primary tracking-tight mt-1 group-hover:text-content-accent transition-colors">
                      {plan.name}
                    </h3>
                    <p className="text-xs font-mono text-content-secondary mt-1">{plan.subtitle}</p>
                  </div>

                  <p className="text-sm text-content-secondary leading-relaxed mb-6">
                    {plan.description}
                  </p>

                  {/* Scope & Deliverables */}
                  <div className="space-y-3 mb-8">
                    <div className="flex justify-between items-center text-xs font-mono font-bold uppercase tracking-wider text-content-primary mb-2">
                      <span>Included Deliverables:</span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedPlanIndex(isExpanded ? null : idx);
                        }}
                        className="text-[10px] text-content-accent hover:underline lowercase font-mono"
                      >
                        {isExpanded ? '[ collapse specs ]' : '[ expand tech specs ]'}
                      </button>
                    </div>

                    {plan.deliverables.map((item, i) => (
                      <div key={i} className="flex items-start gap-3 text-xs text-content-secondary group-hover:text-content-primary transition-colors">
                        <span className="w-4 h-4 rounded-full bg-content-accent/10 border border-content-accent/40 flex items-center justify-center text-content-accent text-[10px] flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                          ✓
                        </span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Spec Badges (Expandable) */}
                  {isExpanded && (
                    <div className="p-4 bg-canvas/90 border border-content-accent/30 rounded-2xl mb-8 space-y-2 animate-fadeIn">
                      <div className="text-[10px] font-mono font-bold text-content-accent uppercase tracking-wider mb-2">
                        // Included Tech Architecture
                      </div>
                      <div className="flex flex-wrap gap-1.5 text-[10px] font-mono">
                        <span className="px-2 py-0.5 bg-canvas-hover rounded-md border border-canvas-border text-content-primary">React 19</span>
                        <span className="px-2 py-0.5 bg-canvas-hover rounded-md border border-canvas-border text-content-primary">Vite 8</span>
                        <span className="px-2 py-0.5 bg-canvas-hover rounded-md border border-canvas-border text-content-primary">TailwindCSS 3</span>
                        <span className="px-2 py-0.5 bg-canvas-hover rounded-md border border-canvas-border text-content-primary">GSAP 3</span>
                        <span className="px-2 py-0.5 bg-canvas-hover rounded-md border border-canvas-border text-content-primary">Vercel API</span>
                      </div>
                    </div>
                  )}

                  {/* Optional Maintenance & Retainer Details */}
                  <div className="p-4 bg-canvas-hover/60 border border-dashed border-canvas-border rounded-xl mb-8 group-hover:border-content-accent/30 transition-colors">
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
                  className={`w-full py-4 px-6 rounded-full font-sans font-bold text-sm uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 group/btn ${
                    plan.popular
                      ? 'bg-content-accent text-canvas hover:bg-content-accent/90 shadow-lg hover:shadow-content-accent/30 scale-102'
                      : 'bg-canvas-hover border border-content-border text-content-primary hover:border-content-accent hover:text-content-accent'
                  }`}
                >
                  <span>Request Custom Quote</span>
                  <span className="transform group-hover/btn:translate-x-1.5 transition-transform">→</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Footnote Notice */}
        <div className="mt-12 text-center text-xs font-mono text-content-secondary max-w-2xl mx-auto flex items-center justify-center gap-2">
          <span>💡</span>
          <span>Every project receives a dedicated scope assessment. We scope milestones, API requirements, and timelines to your exact specifications.</span>
        </div>
      </div>
    </section>
  );
}
