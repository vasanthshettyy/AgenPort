import { useState, useEffect, useRef } from 'react';
import me from '../assets/vasanth.png';
import { navigation } from '../data/navigation';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const container = useRef();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useGSAP(() => {
    gsap.from(container.current, {
      y: -100,
      opacity: 0,
      duration: 1.2,
      ease: 'power4.out',
    });
  }, { scope: container });

  return (
    <header 
      ref={container}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 lg:px-20 ${
        isScrolled ? 'py-6 bg-canvas/80 backdrop-blur-md border-b border-canvas-border' : 'py-12 bg-transparent'
      }`}
    >
      <div className="max-w-[1400px] w-full mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold tracking-tighter text-content-primary cursor-pointer flex items-center gap-3">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-content-accent/30 p-0.5">
            <img src={me} alt="Vasanth Shetty" className="w-full h-full object-cover rounded-full" />
          </div>
          <span className="uppercase tracking-[0.2em]">VASANTH SHETTY</span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-12">
          {navigation.map((item) => (
            <a 
              key={item.name} 
              href={item.href} 
              onClick={(e) => {
                e.preventDefault();
                const target = document.querySelector(item.href);
                if (target) target.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-xs font-bold uppercase tracking-widest text-content-secondary hover:text-content-accent transition-colors duration-300"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="group relative">
          <a 
            href="#contact" 
            onClick={(e) => {
              e.preventDefault();
              const target = document.querySelector('#contact');
              if (target) target.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-block text-xs font-bold uppercase tracking-widest px-8 py-3 border border-content-border rounded-full hover:border-content-accent transition-all duration-500 overflow-hidden relative"
          >
            <span className="relative z-10 group-hover:text-canvas transition-colors duration-500">CONTACT</span>
            <div className="absolute inset-0 bg-content-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </a>
        </div>
      </div>
    </header>
  );
}
