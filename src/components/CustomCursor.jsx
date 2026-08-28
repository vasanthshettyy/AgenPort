import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const [isInverted, setIsInverted] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    gsap.set([cursor, follower], { xPercent: -50, yPercent: -50 });

    const checkIsInverted = (target) => {
      if (!target || !(target instanceof HTMLElement)) return false;

      // 1. Explicit data attribute or class check
      if (target.closest('[data-cursor-invert="true"], .data-cursor-invert, .cursor-invert')) {
        return true;
      }

      // 2. Direct static cyan background check
      if (target.closest('.bg-content-accent, .bg-accent-primary')) {
        return true;
      }

      // 3. Hovered button check: if button has a cyan fill layer
      const buttonEl = target.closest('button, a, .group, .group\\/btn');
      if (buttonEl) {
        const cyanFill = buttonEl.querySelector('.bg-content-accent, .bg-accent-primary, .btn-fill-layer:not(.bg-canvas), .btn-fill-layer-btn:not(.bg-canvas)');
        if (cyanFill) return true;
      }

      // 4. Computed style fallback check for cyan rgb(0, 229, 255)
      let curr = target;
      let depth = 0;
      while (curr && depth < 4) {
        if (curr.nodeType === 1) {
          const bg = window.getComputedStyle(curr).backgroundColor;
          if (bg && (bg.includes('0, 229, 255') || bg.includes('0,229,255') || bg.includes('rgb(0, 229, 255)'))) {
            return true;
          }
        }
        curr = curr.parentElement;
        depth++;
      }

      return false;
    };

    const onMouseMove = (e) => {
      const { clientX, clientY, target } = e;
      
      gsap.to(cursor, {
        x: clientX,
        y: clientY,
        duration: 0.1,
      });

      gsap.to(follower, {
        x: clientX,
        y: clientY,
        duration: 0.3,
      });

      setIsInverted(checkIsInverted(target));
    };

    const onMouseEnter = () => {
      gsap.to([cursor, follower], { opacity: 1 });
    };

    const onMouseLeave = () => {
      gsap.to([cursor, follower], { opacity: 0 });
    };

    const onMouseDown = () => {
      gsap.to(follower, { scale: 0.5, duration: 0.2 });
    };

    const onMouseUp = () => {
      gsap.to(follower, { scale: 1, duration: 0.2 });
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className={`hidden lg:block fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] opacity-0 transition-colors duration-200 ${
          isInverted ? 'bg-canvas' : 'bg-content-accent'
        }`}
      />
      <div
        ref={followerRef}
        className={`hidden lg:block fixed top-0 left-0 w-10 h-10 border rounded-full pointer-events-none z-[9998] opacity-0 transition-colors duration-200 ${
          isInverted ? 'border-canvas' : 'border-content-accent'
        }`}
      />
    </>
  );
};

export default CustomCursor;
