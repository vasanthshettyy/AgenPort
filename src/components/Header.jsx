import { useState, useEffect, useRef } from 'react';

import { navigation } from '../data/navigation';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const container = useRef();

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  useGSAP(() => {
    gsap.from(container.current, {
      y: -100,
      opacity: 0,
      duration: 1.2,
      ease: 'power4.out',
    });
  }, { scope: container });

  const handleNavClick = (href) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header
        ref={container}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4 sm:px-6 lg:px-10 py-3 sm:py-4 lg:py-6 bg-canvas/85 backdrop-blur-md border-b border-canvas-border"
      >
        <div className="max-w-[1400px] w-full mx-auto flex items-center justify-between">
          {/* Logo */}
          <div
            onClick={() => handleNavClick('#hero')}
            className="text-sm sm:text-lg lg:text-2xl font-bold tracking-tighter text-content-primary cursor-pointer flex items-center gap-2 sm:gap-3"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-content-accent/30 p-0.5">
              <img src="/vasanth-avatar.webp" alt="Vasanth Shetty" width="64" height="64" className="w-full h-full object-cover rounded-full" fetchPriority="low" loading="lazy" />
            </div>
            <span className="uppercase tracking-[0.2em] text-xs sm:text-sm lg:text-base">VASANTH SHETTY</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="text-xs font-bold uppercase tracking-widest text-content-secondary hover:text-content-accent transition-colors duration-300"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Desktop CTA & Mobile Toggle */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden sm:block group relative">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('#contact');
                }}
                className="inline-block text-xs font-bold uppercase tracking-widest px-5 sm:px-6 lg:px-8 py-2.5 sm:py-3 border border-content-border rounded-full hover:border-content-accent transition-all duration-500 overflow-hidden relative"
              >
                <span className="relative z-10 group-hover:text-canvas transition-colors [transition-duration:100ms] group-hover:[transition-duration:300ms]">CONTACT</span>
                <div className="absolute inset-0 bg-content-accent translate-y-full group-hover:translate-y-0 transition-transform [transition-duration:100ms] [transition-timing-function:ease-out] group-hover:[transition-duration:300ms] group-hover:[transition-timing-function:cubic-bezier(0.4,0,1,1)]" />
              </a>
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
              aria-expanded={mobileMenuOpen}
              className="md:hidden p-2 text-content-primary hover:text-content-accent focus:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <div className="w-5 h-4 sm:w-6 sm:h-5 flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-current transition-transform duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`w-full h-0.5 bg-current transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`w-full h-0.5 bg-current transition-transform duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-canvas/95 backdrop-blur-xl md:hidden flex flex-col justify-center px-6"
          style={{ animation: 'mobileMenuIn 0.35s cubic-bezier(0.4,0,0.2,1) both' }}
        >
          <style>{`
            @keyframes mobileMenuIn {
              from { opacity: 0; transform: translateY(-16px); }
              to   { opacity: 1; transform: translateY(0); }
            }
          `}</style>
          <nav className="flex flex-col gap-6 sm:gap-8 text-center">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="text-xl sm:text-2xl font-bold uppercase tracking-widest text-content-primary hover:text-content-accent transition-colors min-h-[44px] flex items-center justify-center"
              >
                {item.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#contact');
              }}
              className="group relative mt-4 sm:mt-6 inline-flex items-center justify-center py-3.5 sm:py-4 px-6 sm:px-8 border border-content-accent bg-content-accent text-canvas font-bold uppercase tracking-widest rounded-full text-center min-h-[44px] overflow-hidden"
            >
              <span className="relative z-10 group-hover:text-content-accent transition-colors [transition-duration:100ms] group-hover:[transition-duration:300ms]">Get in Touch</span>
              <div className="absolute inset-0 bg-canvas translate-y-full group-hover:translate-y-0 transition-transform [transition-duration:100ms] [transition-timing-function:ease-out] group-hover:[transition-duration:300ms] group-hover:[transition-timing-function:cubic-bezier(0.4,0,1,1)]" />
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
