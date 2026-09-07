import { useEffect, useRef } from 'react';

export default function ScrollProgress() {
  const progressBar = useRef(null);

  useEffect(() => {
    let rafId = null;

    const updateProgress = () => {
      if (!progressBar.current) return;
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight || 0;
      const clientHeight = window.innerHeight || document.documentElement.clientHeight || 0;
      const maxScroll = scrollHeight - clientHeight;

      const progress = maxScroll > 0 ? Math.min(1, Math.max(0, scrollY / maxScroll)) : 0;
      progressBar.current.style.transform = `scaleX(${progress})`;
    };

    const onScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          updateProgress();
          rafId = null;
        });
      }
    };

    // Initial update
    updateProgress();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });

    const resizeObserver = new ResizeObserver(() => {
      updateProgress();
    });
    resizeObserver.observe(document.documentElement);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateProgress);
      resizeObserver.disconnect();
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[2px] z-[9999] pointer-events-none">
      <div
        ref={progressBar}
        className="w-full h-full bg-content-accent origin-left scale-x-0 will-change-transform"
      />
    </div>
  );
}
