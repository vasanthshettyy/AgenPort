import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    // Only enable if desktop width (>= 1024px) AND device supports fine hover pointer
    if (typeof window === 'undefined') return;
    if (window.innerWidth < 1024) return;
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    gsap.set([cursor, follower], { xPercent: -50, yPercent: -50 });

    const showCursor = () => {
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        gsap.to([cursor, follower], { opacity: 1, duration: 0.15 });
      }
    };

    const hideCursor = () => {
      isVisibleRef.current = false;
      gsap.to([cursor, follower], { opacity: 0, duration: 0.15 });
    };

    const onMouseMove = (e) => {
      // Hide custom cursor inside chat panel so native text/pointer cursors work and text isn't obscured
      const isOverChat = e.target && e.target.closest && e.target.closest('#chatbot-panel, [role="dialog"]');
      if (isOverChat) {
        hideCursor();
        return;
      }

      const { clientX, clientY } = e;

      // Ensure cursor is visible on mouse movement (e.g. immediately after load/refresh)
      showCursor();

      gsap.to(cursor, {
        x: clientX,
        y: clientY,
        duration: 0.08,
      });

      gsap.to(follower, {
        x: clientX,
        y: clientY,
        duration: 0.25,
      });
    };

    const onMouseEnter = () => {
      showCursor();
    };

    const onMouseLeave = () => {
      hideCursor();
    };

    const onMouseDown = () => {
      gsap.to(follower, { scale: 0.5, duration: 0.2 });
    };

    const resetScale = () => {
      gsap.to(follower, { scale: 1, duration: 0.2 });
    };

    const onTouchStart = () => {
      hideCursor();
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', resetScale);
    window.addEventListener('pointerup', resetScale);
    window.addEventListener('pointercancel', resetScale);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('blur', hideCursor);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', resetScale);
      window.removeEventListener('pointerup', resetScale);
      window.removeEventListener('pointercancel', resetScale);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('blur', hideCursor);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="hidden lg:block fixed top-0 left-0 w-2 h-2 bg-content-accent rounded-full pointer-events-none z-[9999] opacity-0 mix-blend-difference"
      />
      <div
        ref={followerRef}
        className="hidden lg:block fixed top-0 left-0 w-10 h-10 border-2 border-content-accent rounded-full pointer-events-none z-[9998] opacity-0 mix-blend-difference"
      />
    </>
  );
};

export default CustomCursor;
