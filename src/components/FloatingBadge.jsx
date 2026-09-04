import React from 'react';

export default function FloatingBadge() {
  const handleClick = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 sm:left-auto sm:transform-none sm:bottom-6 sm:right-6 z-40 flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-canvas/90 backdrop-blur-md border border-white/15 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.5)] cursor-pointer floating-badge-interactive group w-max max-w-[90vw]"
      aria-label="Now accepting founding clients - Limited availability. Click to contact."
    >
      <span className="relative flex h-2 w-2 flex-shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
      </span>
      <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.15em] sm:tracking-[0.2em] text-content-primary uppercase select-none group-hover:text-content-accent transition-colors duration-300">
        <span className="hidden sm:inline">NOW ACCEPTING FOUNDING CLIENTS • LIMITED AVAILABILITY</span>
        <span className="sm:hidden">FOUNDING CLIENTS • LIMITED</span>
      </span>
    </div>
  );
}



