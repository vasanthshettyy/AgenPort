import { useRef, useEffect, useState } from 'react';
import { projects } from '../data/projects';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

function ProjectPreview({ project }) {
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isVisible || reduceMotion || !project.images || project.images.length < 2) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % project.images.length);
    }, 2800);
    return () => clearInterval(id);
  }, [isVisible, project.images]);

  const hostname = project.liveUrl
    ? project.liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')
    : 'live-preview';

  return (
    <div ref={ref} className="project-img absolute inset-0 w-full h-[120%] -top-[10%] bg-canvas-surface overflow-hidden flex flex-col">
      {/* Browser Header Bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/10 bg-black/50 px-3 sm:px-4 py-2 backdrop-blur-md shrink-0">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="h-2 sm:h-2.5 w-2 sm:w-2.5 rounded-full bg-red-500/80" />
          <span className="h-2 sm:h-2.5 w-2 sm:w-2.5 rounded-full bg-yellow-500/80" />
          <span className="h-2 sm:h-2.5 w-2 sm:w-2.5 rounded-full bg-green-500/80" />
        </div>
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2.5 sm:px-3 py-0.5 text-[9px] sm:text-[10px] font-mono tracking-wider text-content-secondary">
          <span className="h-1.5 w-1.5 rounded-full bg-content-accent animate-pulse" />
          <span>{hostname}</span>
        </div>
        <div className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-content-secondary hidden sm:block">
          {index + 1} / {project.images?.length || 1}
        </div>
      </div>

      {/* Screenshot Slideshow Container */}
      <div className="relative flex-1 w-full h-full overflow-hidden bg-black/80">
        {project.images && project.images.length > 0 ? (
          project.images.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={`${project.title} screenshot ${i + 1}`}
              className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500 ${
                i === index ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-content-secondary text-xs sm:text-sm font-mono">
            Preview Snapshot
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />
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
                <div className="absolute inset-0 bg-canvas/60 opacity-100 lg:opacity-0 lg:group-hover/card:opacity-100 transition-opacity duration-500 flex items-center justify-center z-10">
                  <div className="group/btn relative overflow-hidden px-6 sm:px-8 lg:px-12 py-3 sm:py-4 lg:py-6 border border-content-secondary/30 rounded-full transition-all lg:hover:border-content-accent">
                    <span className="btn-fill-text-btn text-base sm:text-lg lg:text-2xl font-bold tracking-widest text-content-primary lg:group-hover/btn:text-canvas">
                      VIEW PROJECT
                    </span>
                    <div className="btn-fill-layer-btn bg-content-accent" />
                  </div>
                </div>
              </div>

              <div className="project-text w-full lg:w-1/3 flex flex-col gap-3 sm:gap-4 lg:gap-8 z-10">
                <span className="text-content-accent font-sans text-lg lg:text-xl font-bold">
                  0{index + 1}
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-5xl xl:text-8xl font-sans font-bold leading-none tracking-tighter flex flex-wrap items-baseline gap-2 lg:gap-4 lg:group-hover/card:text-content-accent transition-colors duration-300">
                  <span>{project.title}</span>
                  <span className="text-xs sm:text-sm lg:text-sm font-mono font-bold tracking-widest uppercase text-content-accent opacity-100 lg:opacity-0 lg:group-hover/card:opacity-100 transition-all duration-300 transform translate-x-0 lg:translate-x-2 lg:group-hover/card:translate-x-0">
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
