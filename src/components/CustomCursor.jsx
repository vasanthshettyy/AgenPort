import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    gsap.set([cursor, follower], { xPercent: -50, yPercent: -50 });

    const onMouseMove = (e) => {
      const { clientX, clientY } = e;
      
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
