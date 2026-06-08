import { useRef } from 'react';
import { projects } from '../data/projects';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const ProjectGrid = () => {
  const container = useRef();

  useGSAP(() => {
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
          scrub: true,
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
  }, { scope: container });

  return (
    <section ref={container} className="py-64 bg-canvas px-6 lg:px-20 overflow-hidden">
      <div className="max-w-[1400px] w-full mx-auto">
        <h2 className="text-massive font-sans font-bold mb-64 tracking-tighter">
          PROJECTS
        </h2>

        <div className="flex flex-col gap-64">
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className={`project-item flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-24`}
            >
              {/* Image Container */}
              <div className="relative w-full lg:w-2/3 aspect-[16/10] overflow-hidden rounded-sm bg-canvas-surface group">
                <div className="project-img absolute inset-0 w-full h-[120%] -top-[10%] bg-gradient-to-br from-content-accent/20 to-canvas-surface flex items-center justify-center">
                  <span className="text-giant font-bold opacity-10 select-none">
                    {project.niche || 'CASE STUDY'}
                  </span>
                </div>
                {/* Overlay for interaction */}
                <div className="absolute inset-0 bg-canvas/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center">
                  <button className="text-xl font-bold tracking-widest px-8 py-4 border border-content-primary rounded-full hover:bg-content-primary hover:text-canvas transition-all">
                    VIEW PROJECT
                  </button>
                </div>
              </div>

              {/* Text Container */}
              <div className="project-text w-full lg:w-1/3 flex flex-col gap-8 z-10">
                <span className="text-content-accent font-sans text-xl font-bold">
                  0{index + 1}
                </span>
                <h3 className="text-6xl lg:text-8xl font-sans font-bold leading-none tracking-tighter">
                  {project.title}
                </h3>
                <p className="text-2xl text-content-secondary font-light">
                  {project.problem_statement}
                </p>
                <div className="flex flex-wrap gap-4 mt-4">
                  {project.tech_stack.map((tech, i) => (
                    <span key={i} className="px-4 py-2 border border-canvas-border rounded-full text-xs font-medium text-content-secondary uppercase tracking-widest">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectGrid;
