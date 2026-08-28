import { useRef, useEffect, useState } from 'react';
import { projects } from '../data/projects';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

function ProjectPreview({ project }) {
  const primaryMetric = project.conversion_metrics?.[0];

  return (
    <div className="project-img absolute inset-0 w-full h-[120%] -top-[10%]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(0,229,255,0.18),_transparent_45%),linear-gradient(160deg,_rgba(18,18,18,0.98),_rgba(10,10,10,0.92))]" />
      <div className="relative flex h-full flex-col justify-between p-3 sm:p-5 lg:p-8">
        <div className="flex items-center justify-between rounded-full border border-white/10 bg-white/5 px-3 sm:px-4 py-2 sm:py-3 backdrop-blur-sm">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="h-2 w-2 rounded-full bg-red-400" />
            <span className="h-2 w-2 rounded-full bg-yellow-400" />
            <span className="h-2 w-2 rounded-full bg-green-400" />
          </div>
          <span className="text-[8px] sm:text-[10px] font-mono uppercase tracking-[0.25em] text-content-secondary">
            Live Project Snapshot
          </span>
        </div>

        <div className="max-w-xl rounded-[1.5rem] sm:rounded-[2rem] border border-white/10 bg-canvas/70 p-4 sm:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-sm">
          <div className="mb-3 sm:mb-4 flex items-center justify-between gap-3 sm:gap-4">
            <div>
              <p className="text-[9px] sm:text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-content-accent">
                {project.niche}
              </p>
              <h3 className="mt-1.5 sm:mt-2 text-xl sm:text-2xl lg:text-4xl font-bold tracking-tight text-content-primary">
                {project.title}
              </h3>
            </div>
            <span className="rounded-full border border-content-accent/30 bg-content-accent/10 px-2 sm:px-3 py-1 text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.25em] text-content-accent">
              External Launch
            </span>
          </div>

          <p className="text-xs sm:text-sm leading-relaxed text-content-secondary lg:text-base">
            {project.problem_statement}
          </p>

          <div className="mt-4 sm:mt-6 grid gap-3 sm:gap-4 sm:grid-cols-2">
            <div className="rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 p-3 sm:p-4">
              <p className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.25em] text-content-secondary">
                Outcome
              </p>
              <p className="mt-2 sm:mt-3 text-base sm:text-lg font-semibold text-content-primary">
                {primaryMetric ? primaryMetric.value : 'Custom Build'}
              </p>
              <p className="mt-1 text-xs sm:text-sm text-content-secondary">
                {primaryMetric ? primaryMetric.label : 'Built to support the business goal.'}
              </p>
            </div>
            <div className="rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 p-3 sm:p-4">
              <p className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.25em] text-content-secondary">
                Delivery Focus
              </p>
              <ul className="mt-2 sm:mt-3 space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-content-secondary">
                {project.technical_approach.slice(0, 3).map((item) => (
                  <li key={item} className="flex items-start gap-1.5 sm:gap-2">
                    <span className="mt-1 h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-content-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-3 sm:mt-4">
          {project.tech_stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/10 bg-white/5 px-2 sm:px-3 py-1.5 sm:py-2 text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] text-content-secondary backdrop-blur-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

const ProjectGrid = () => {
  const container = useRef();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Desktop-only: parallax + text slide-in
  useGSAP(() => {
    if (isMobile) return;

    const items = gsap.utils.toArray('.project-item');

    items.forEach((item, i) => {
      const img = item.querySelector('.project-img');
      const text = item.querySelector('.project-text');

      gsap.to(img, {
        y: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: item,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        }
      });

      gsap.from(text, {
        x: i % 2 === 0 ? 100 : -100,
        opacity: 0,
        duration: 1.5,
        scrollTrigger: {
          trigger: item,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      });
    });
  }, { scope: container, dependencies: [isMobile] });

  // Mobile-only: scroll entrance fade+slide-up per card
  useGSAP(() => {
    if (!isMobile) return;

    const items = gsap.utils.toArray('.project-item');
    items.forEach((item) => {
      gsap.fromTo(
        item,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
  }, { scope: container, dependencies: [isMobile] });

  return (
    <section id="work" ref={container} className="py-12 sm:py-16 lg:py-64 bg-canvas px-4 sm:px-6 lg:px-20 overflow-hidden">
      <div className="max-w-[1400px] w-full mx-auto">
        <h2 className="text-3xl sm:text-5xl lg:text-massive font-sans font-bold mb-8 sm:mb-12 lg:mb-64 tracking-tighter">
          PROJECTS
        </h2>

        <div className="flex flex-col gap-12 sm:gap-16 lg:gap-64">
          {projects.map((project, index) => (
            <a
              key={project.id}
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`project-item block flex flex-col ${isMobile ? 'items-center' : 'lg:flex-row'} ${!isMobile && index % 2 === 1 ? 'lg:flex-row-reverse' : ''} items-center gap-6 sm:gap-8 lg:gap-24 group/card no-underline`}
            >
              <div className="relative w-full lg:w-2/3 aspect-[16/10] overflow-hidden rounded-md border border-canvas-border bg-canvas-surface group">
                <ProjectPreview project={project} />
                <div className="absolute inset-0 bg-canvas/60 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 flex items-center justify-center z-10">
                  <div className="group/btn relative overflow-hidden px-6 sm:px-8 lg:px-12 py-3 sm:py-4 lg:py-6 border border-content-secondary/30 rounded-full transition-all hover:border-content-accent">
                    <span className="relative z-10 text-base sm:text-lg lg:text-2xl font-bold tracking-widest text-content-primary group-hover/btn:text-canvas transition-colors [transition-duration:100ms] group-hover/btn:[transition-duration:300ms]">
                      VIEW PROJECT
                    </span>
                    <div className="absolute inset-0 bg-content-accent translate-y-full group-hover/btn:translate-y-0 transition-transform [transition-duration:100ms] [transition-timing-function:ease-out] group-hover/btn:[transition-duration:300ms] group-hover/btn:[transition-timing-function:cubic-bezier(0.4,0,1,1)]" />
                  </div>
                </div>
              </div>

              <div className="project-text w-full lg:w-1/3 flex flex-col gap-3 sm:gap-4 lg:gap-8 z-10">
                <span className="text-content-accent font-sans text-lg lg:text-xl font-bold">
                  0{index + 1}
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-5xl xl:text-8xl font-sans font-bold leading-none tracking-tighter flex flex-wrap items-baseline gap-2 lg:gap-4 group-hover/card:text-content-accent transition-colors duration-300">
                  <span>{project.title}</span>
                  <span className="text-xs sm:text-sm lg:text-sm font-mono font-bold tracking-widest uppercase text-content-accent opacity-100 lg:opacity-0 group-hover/card:opacity-100 transition-all duration-300 transform translate-x-0 lg:translate-x-2 group-hover/card:translate-x-0">
                    Visit Site -&gt;
                  </span>
                </h3>
                <p className="text-base sm:text-lg lg:text-2xl text-content-secondary font-light leading-snug">
                  {project.problem_statement}
                </p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2 lg:gap-4 mt-1 lg:mt-4">
                  {project.tech_stack.map((tech, i) => (
                    <span key={i} className="px-2 sm:px-3 py-1 lg:px-4 lg:py-2 border border-canvas-border rounded-full text-[9px] sm:text-xs lg:text-xs font-medium text-content-secondary uppercase tracking-widest">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectGrid;
