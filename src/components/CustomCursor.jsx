import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    // Only disable if device strictly lacks hover (pure touch screen like phones/tablets)
    if (typeof window !== 'undefined' && window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
      return;
    }

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

    const onMouseUp = () => {
      gsap.to(follower, { scale: 1, duration: 0.2 });
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
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
        className="fixed top-0 left-0 w-2 h-2 bg-content-accent rounded-full pointer-events-none z-[9999] opacity-0 mix-blend-difference"
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-10 h-10 border-2 border-content-accent rounded-full pointer-events-none z-[9998] opacity-0 mix-blend-difference"
      />
    </>
  );
};

export default CustomCursor;
