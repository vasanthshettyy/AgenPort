import React, { useEffect, useRef, useState } from 'react';
import anime from 'animejs/lib/anime.es.js';
import Swal from 'sweetalert2';
import { projects } from '../data/projects';

export default function ProjectGrid() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          anime({
            targets: cardsRef.current,
            translateY: [50, 0],
            opacity: [0, 1],
            easing: 'easeOutExpo',
            duration: 1000,
            delay: anime.stagger(150),
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

  const setCardRef = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  const handleCardClick = (project) => {
    if (project.isSkeleton) {
      // Show skeleton state modal info or return
      Swal.fire({
        title: project.title,
        text: 'This case study is currently being compiled. Deep dive metrics will be available soon.',
        icon: 'info',
        background: '#0A0D14',
        color: '#fff',
        confirmButtonColor: '#00D4FF',
      });
      return;
    }

    const htmlContent = `
      <div class="text-left text-sm text-gray-300 space-y-4">
        <div>
          <h4 class="text-accent-primary font-semibold mb-1">The Problem</h4>
          <p>${project.problem_statement}</p>
        </div>
        <div>
          <h4 class="text-accent-primary font-semibold mb-1">Technical Architecture</h4>
          <ul class="list-disc pl-5">
            ${project.technical_approach.map(t => `<li>${t}</li>`).join('')}
          </ul>
        </div>
        <div>
          <h4 class="text-green-400 font-semibold mb-1">Business Outcome</h4>
          <div class="grid grid-cols-2 gap-2 mt-2">
            ${project.conversion_metrics.map(m => `
              <div class="bg-white/5 p-2 rounded">
                <div class="text-xs text-gray-500">${m.label}</div>
                <div class="text-lg font-bold text-white">${m.value}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    Swal.fire({
      title: `<h3 class="text-xl font-bold text-white">${project.title}</h3>`,
      html: htmlContent,
      background: '#080B10',
      color: '#fff',
      showCloseButton: true,
      confirmButtonText: project.live_url !== '#' ? 'View Live Project' : 'Close Case Study',
      confirmButtonColor: '#7C3AED',
      customClass: {
        popup: 'border border-white/10 rounded-2xl',
        confirmButton: 'rounded-xl w-full mt-4',
      }
    }).then((result) => {
      if (result.isConfirmed && project.live_url !== '#') {
        window.open(project.live_url, '_blank');
      }
    });
  };

  return (
    <section id="work" ref={sectionRef} className="py-24 bg-canvas relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-accent-primary to-accent-secondary inline-block pb-1">
            Enterprise-Grade Systems.
          </h2>
          <p className="text-gray-400 text-lg md:text-xl font-medium tracking-wide">
            Not websites. We build operational infrastructure.
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              ref={setCardRef}
              onClick={() => handleCardClick(project)}
              className="group cursor-pointer bg-canvas-light border border-white/5 hover:border-accent-primary/50 transition-colors duration-300 rounded-3xl p-6 opacity-0"
            >
              {project.isSkeleton ? (
                // SKELETON STATE
                <div className="animate-pulse flex flex-col h-full">
                  <div className="flex justify-between items-start mb-6">
                    <div className="h-4 bg-white/10 rounded w-1/4"></div>
                    <div className="h-6 bg-white/10 rounded-full w-24"></div>
                  </div>
                  
                  {/* Mock Screenshot Region */}
                  <div className="w-full aspect-video bg-white/5 rounded-xl mb-6 border border-white/5 flex flex-col overflow-hidden relative">
                    <div className="h-8 bg-white/10 border-b border-white/5 flex items-center px-3 gap-1.5 absolute top-0 w-full z-10">
                      <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
                    </div>
                    <div className="flex-1 mt-8 p-4 bg-gradient-to-br from-white/5 to-transparent shimmer relative"></div>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="h-6 bg-white/10 rounded w-3/4"></div>
                    <div className="h-4 bg-white/5 rounded w-full"></div>
                    <div className="h-4 bg-white/5 rounded w-5/6"></div>
                  </div>

                  <div className="mt-auto flex gap-2">
                    <div className="h-6 bg-white/10 rounded-full w-16"></div>
                    <div className="h-6 bg-white/10 rounded-full w-20"></div>
                    <div className="h-6 bg-white/10 rounded-full w-16"></div>
                  </div>
                </div>
              ) : (
                // LIVE DATA STATE
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-start mb-6">
                    <div className="text-xs font-mono text-accent-primary">{project.niche}</div>
                    <a href={project.live_url} onClick={(e) => e.stopPropagation()} className="px-3 py-1 bg-white/5 hover:bg-white/10 text-xs text-white rounded-full transition-colors border border-white/10">View Project ↗</a>
                  </div>

                  <div className="w-full aspect-video bg-canvas rounded-xl mb-6 border border-white/10 overflow-hidden relative group-hover:border-white/20 transition-colors">
                    {project.image_url ? (
                      <img src={project.image_url} alt={project.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    ) : (
                       <div className="w-full h-full flex items-center justify-center text-white/20 font-mono text-sm">No Preview Available</div>
                    )}
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-6 line-clamp-2">{project.problem_statement}</p>

                  <div className="mt-auto flex flex-wrap gap-2">
                    {project.tech_stack.map(tech => (
                      <span key={tech} className="px-2.5 py-1 text-xs font-medium bg-accent-secondary/10 text-accent-secondary rounded-md border border-accent-secondary/20">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .shimmer {
          background: linear-gradient(90deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.02) 100%);
          background-size: 200% 100%;
          animation: shimmer 2.5s infinite linear;
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </section>
  );
}
