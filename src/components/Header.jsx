import React, { useState, useEffect, useRef } from 'react';
import { createPopper } from '@popperjs/core';
import anime from 'animejs';
import { navigation, servicesDropdown } from '../data/navigation';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const btnRef = useRef(null);
  const popperRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (btnRef.current && dropdownRef.current) {
      popperRef.current = createPopper(btnRef.current, dropdownRef.current, {
        placement: 'bottom-start',
        modifiers: [
          {
            name: 'offset',
            options: { offset: [0, 8] },
          },
        ],
      });
    }
  }, []);

  const handleMouseEnter = () => {
    setDropdownOpen(true);
    popperRef.current?.update();
  };

  const handleMouseLeave = () => {
    setDropdownOpen(false);
  };

  const ctaRef = useRef(null);
  useEffect(() => {
    // Glowing border animation loop
    anime({
      targets: ctaRef.current,
      boxShadow: [
        '0 0 0px 0px rgba(0, 212, 255, 0)',
        '0 0 15px 2px rgba(0, 212, 255, 0.4)',
        '0 0 0px 0px rgba(0, 212, 255, 0)'
      ],
      duration: 3000,
      easing: 'easeInOutSine',
      loop: true,
    });
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-canvas-light/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold tracking-tight text-white flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 rounded-md bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center">
            <span className="text-canvas-light font-black text-sm">AG</span>
          </div>
          <span>Agency</span>
        </div>

        {/* Navigation Anchors */}
        <nav className="hidden md:flex items-center gap-8">
          {navigation.map((item) => (
            <div key={item.name} className="relative group"
                 onMouseEnter={item.hasDropdown ? handleMouseEnter : undefined}
                 onMouseLeave={item.hasDropdown ? handleMouseLeave : undefined}>
              
              <a href={item.href} 
                 className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
                 ref={item.hasDropdown ? btnRef : null}>
                {item.name}
              </a>

              {/* Dropdown via Popper.js */}
              {item.hasDropdown && (
                <div 
                  ref={dropdownRef}
                  className={`absolute left-0 z-50 w-72 bg-canvas-light border border-white/10 rounded-xl p-2 shadow-2xl transition-opacity duration-200 ${dropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                >
                  {servicesDropdown.map(service => (
                    <div key={service.name} className="block px-4 py-3 hover:bg-white/5 rounded-lg cursor-pointer transition-colors">
                      <div className="text-sm font-semibold text-white">{service.name}</div>
                      <div className="text-xs text-gray-400 mt-1 leading-relaxed">{service.description}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* CTA Button */}
        <button 
          ref={ctaRef}
          className="relative px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-canvas"
        >
          Book a Call
        </button>
      </div>
    </header>
  );
}
