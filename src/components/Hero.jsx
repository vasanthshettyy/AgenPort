import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

export default function Hero() {
  const headlineRef = useRef(null);
  const primaryCtaRef = useRef(null);
  const terminalRef = useRef(null);
  
  useEffect(() => {
    // Word reveal animation for headline
    const words = headlineRef.current.querySelectorAll('.word');
    anime({
      targets: words,
      translateY: [20, 0],
      opacity: [0, 1],
      easing: 'easeOutExpo',
      duration: 1000,
      delay: anime.stagger(100, { start: 300 }),
    });

    // Ambient floating terminal animation
    anime({
      targets: terminalRef.current,
      translateY: [-10, 10],
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutSine',
      duration: 4000,
    });

    // Primary CTA Glow
    anime({
      targets: primaryCtaRef.current,
      boxShadow: [
        '0 0 0px 0px rgba(0, 212, 255, 0)',
        '0 0 20px 4px rgba(0, 212, 255, 0.4)',
        '0 0 0px 0px rgba(0, 212, 255, 0)'
      ],
      duration: 3000,
      easing: 'easeInOutSine',
      loop: true,
    });
  }, []);

  const headlineText = "We Build the Systems That Scale Your Business — Without the SaaS Tax.";
  
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden bg-canvas">
      {/* Background SVG Grid & Gradients */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiIGZpbGw9Im5vbmUiLz4KPHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz4KPC9zdmc+')] opacity-30"></div>
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent-primary/20 rounded-full blur-[120px] mix-blend-screen"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-accent-secondary/15 rounded-full blur-[150px] mix-blend-screen"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Column: Copy & CTAs */}
        <div className="flex flex-col items-start text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            <span className="text-xs font-semibold text-gray-300 uppercase tracking-wider">Premium B2B Engineering</span>
          </div>

          <h1 ref={headlineRef} className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-6">
            {headlineText.split(' ').map((word, i) => (
              <span key={i} className="word inline-block opacity-0 translate-y-4 mr-[0.3em]">
                {word}
              </span>
            ))}
          </h1>

          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-xl leading-relaxed">
            We partner with high-ticket international B2B teams to architect, build, and deploy custom full-stack solutions that drive measurable ROI.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
            <a 
              href="#contact"
              ref={primaryCtaRef}
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-canvas font-bold bg-accent-primary hover:bg-white transition-colors text-center"
            >
              Book a Discovery Call
            </a>
            <a 
              href="#work"
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-white font-semibold bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-center group"
            >
              <span className="group-hover:border-b-2 border-accent-secondary pb-0.5 transition-all">View Our Work</span>
            </a>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-white/10">
            <div className="flex -space-x-2">
              {['🇺🇸', '🇬🇧', '🇦🇺', '🇪🇺', '🇸🇬'].map((flag, i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-canvas-light border border-white/10 flex items-center justify-center text-sm shadow-xl z-[5-i]">
                  {flag}
                </div>
              ))}
            </div>
            <div className="flex flex-col">
              <div className="flex text-accent-primary text-sm">
                ★★★★★
              </div>
              <span className="text-xs font-medium text-gray-400 mt-1 uppercase tracking-wider">
                Trusted by Founders & CTOs
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Floating Terminal Visual */}
        <div className="hidden lg:flex justify-end perspective-1000">
          <div 
            ref={terminalRef}
            className="w-full max-w-lg bg-canvas-light/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden transform rotate-y-[-5deg] rotate-x-[5deg]"
          >
            {/* Terminal Header */}
            <div className="flex items-center px-4 py-3 bg-white/5 border-b border-white/5">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="mx-auto text-xs font-mono text-gray-500">system-deploy.js</div>
            </div>
            
            {/* Terminal Body Skeletons */}
            <div className="p-6 space-y-4 font-mono text-sm">
              <div className="flex gap-3 text-gray-400">
                <span className="text-accent-primary">❯</span>
                <span className="text-gray-300">Initializing enterprise architecture...</span>
              </div>
              
              <div className="space-y-3 pl-5">
                <div className="h-2 bg-white/10 rounded w-3/4 shimmer"></div>
                <div className="h-2 bg-white/10 rounded w-1/2 shimmer"></div>
                <div className="h-2 bg-white/10 rounded w-5/6 shimmer"></div>
              </div>

              <div className="flex gap-3 text-gray-400 pt-4">
                <span className="text-accent-primary">❯</span>
                <span className="text-green-400">All systems optimal. Scale ready.</span>
              </div>

              {/* Data Blocks */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-xs text-gray-500 mb-2">Performance Delta</div>
                  <div className="text-xl font-bold text-white">+340%</div>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-xs text-gray-500 mb-2">SaaS Costs</div>
                  <div className="text-xl font-bold text-accent-primary">$0.00</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .shimmer {
          background: linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 100%);
          background-size: 200% 100%;
          animation: shimmer 2s infinite linear;
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .perspective-1000 { perspective: 1000px; }
        .rotate-y-\\[-5deg\\] { transform: rotateY(-5deg); }
        .rotate-x-\\[5deg\\] { transform: rotateX(5deg); }
      `}</style>
    </section>
  );
}
