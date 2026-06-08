import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Hero = () => {
  const container = useRef();
  const titleRef = useRef();
  const subRef = useRef();
  const ctaRef = useRef();

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    // Split text effect could be done here, but for simplicity we'll animate lines
    tl.from('.hero-title-line', {
      y: 100,
      opacity: 0,
      duration: 1.5,
      stagger: 0.2,
    })
    .from(subRef.current, {
      x: -50,
      opacity: 0,
      duration: 1,
    }, '-=1')
    .from(ctaRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
    }, '-=0.8');

    // Subtle parallax on mouse move for the container
    const onMouseMove = (e) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 20;
      const yPos = (clientY / window.innerHeight - 0.5) * 20;
      
      gsap.to('.hero-parallax', {
        x: xPos,
        y: yPos,
        duration: 1,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, { scope: container });

  return (
    <section 
      ref={container} 
      className="relative min-h-screen flex flex-col justify-center px-6 lg:px-20 pt-32 pb-40 overflow-hidden"
    >
      {/* Background Decorative Element */}
      <div className="absolute top-1/4 right-0 w-128 h-128 bg-content-accent/5 rounded-full blur-3xl -z-10 hero-parallax" />

      <div className="max-w-[1400px] w-full mx-auto">
        <h1 
          ref={titleRef}
          className="text-massive font-sans font-bold flex flex-col"
        >
          <div className="overflow-hidden">
            <span className="hero-title-line block">WE BUILD THE</span>
          </div>
          <div className="overflow-hidden">
            <span className="hero-title-line block italic text-content-accent">SYSTEMS</span>
          </div>
          <div className="overflow-hidden">
            <span className="hero-title-line block">THAT SCALE.</span>
          </div>
        </h1>

        <div className="mt-12 lg:mt-24 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-12">
          <p 
            ref={subRef}
            className="text-giant max-w-2xl text-content-secondary font-sans font-light leading-tight"
          >
            Award-winning infrastructure for high-ticket B2B enterprise.
          </p>

          <div ref={ctaRef} className="relative group">
            <button className="text-2xl lg:text-3xl font-sans font-medium px-12 py-6 border border-content-border rounded-full hover:bg-content-primary hover:text-canvas transition-colors duration-500 overflow-hidden relative">
              <span className="relative z-10">WORK WITH US</span>
              <div className="absolute inset-0 bg-content-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
            </button>
          </div>
        </div>
      </div>

      {/* Asymmetrical footer-like element within hero */}
      <div className="absolute bottom-20 left-6 lg:left-20 flex gap-8 text-content-secondary opacity-50 font-sans tracking-widest text-xs uppercase">
        <span>STRATEGY</span>
        <span>/</span>
        <span>DESIGN</span>
        <span>/</span>
        <span>ENGINEERING</span>
      </div>
    </section>
  );
};

export default Hero;
