import { useRef, useEffect, useState, useCallback } from 'react';

/**
 * 🔒 LOCKED TUNED HERO ALIGNMENT VALUES
 * DO NOT ALTER THESE NUMBERS UNLESS DIRECTLY REQUESTED BY USER.
 *
 * Fine-tuned parameters:
 * - REL_X: 0.162 (Horizontal alignment offset relative to base photo)
 * - REL_Y: -0.143 (Vertical alignment offset relative to base photo)
 * - REL_SCALE: 0.58 (Scale of illustrated image relative to base photo)
 * - SPOT_RADIUS: 38 (px — reveal circle radius)
 * - TRAIL_DURATION: 4900 (ms — 4.9s smooth decay trail)
 * - BLUR_PX: 13 (px — softness blur)
 */
const CONFIG = Object.freeze({
  SPOT_RADIUS: 38,       // px — radius of reveal spot
  TRAIL_DURATION: 4900,  // ms — smooth 4.9-second decay trail
  BLUR_PX: 13,           // px — Gaussian softness blur
  REL_SCALE: 0.58,       // Illustrated image scale relative to real photo scale
  REL_X: 0.162,          // Horizontal offset relative to real photo's rendered width
  REL_Y: -0.143,         // Vertical offset relative to real photo's rendered height
});

// Responsive relative alignment values (locked to real base photo geometry)
const REAL_W = 800;
const REAL_H = 532;

/**
 * HeroCursorReveal
 */
export default function HeroCursorReveal({ illustratedSrc, containerRef, onInteraction }) {
  const [isEligible, setIsEligible] = useState(() => {
    if (typeof window === 'undefined') return false;
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  const [demoPointerPos, setDemoPointerPos] = useState(null);

  const displayCanvasRef = useRef(null);
  const maskCanvas = useRef(null);
  const maskCtx = useRef(null);
  const revealSourceCanvas = useRef(null);
  const revealSourceCtx = useRef(null);

  const illustratedImg = useRef(null);
  const imgLoaded = useRef(false);
  const loadingStarted = useRef(false);

  const rafId = useRef(null);
  const isHovering = useRef(false);
  const isDemoPlaying = useRef(false);
  const hasRealInteracted = useRef(false);
  const lastPathIdxRef = useRef(-1);
  const demoTimeoutRef = useRef(null);
  const demoRafRef = useRef(null);

  const currentPoint = useRef(null);
  const lastPoint = useRef(null);
  const lastFrameTime = useRef(0);
  const lastActiveTime = useRef(0);
  const dims = useRef({ width: 0, height: 0 });

  // ── Eligibility Check (Supported unless prefers-reduced-motion: reduce) ────
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const checkEligibility = () => {
      setIsEligible(!mq.matches);
    };

    checkEligibility();
    if (mq.addEventListener) mq.addEventListener('change', checkEligibility);
    return () => mq.removeEventListener?.('change', checkEligibility);
  }, []);

  // ── Fit canvas with DPR scaling ───────────────────────────────────────────
  const fitCanvas = useCallback((canvas, ctx, width, height, dpr) => {
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }, []);

  // ── Draw image with responsive alignment locked to real photo geometry ───
  const renderRevealSource = useCallback(() => {
    if (!revealSourceCtx.current || !illustratedImg.current || !imgLoaded.current) return;
    const { width: cw, height: ch } = dims.current;
    if (cw === 0 || ch === 0) return;

    const img = illustratedImg.current;
    const imgW = img.naturalWidth || img.width;
    const imgH = img.naturalHeight || img.height;
    if (!imgW || !imgH) return;

    // 1. Calculate real photo rendered bounds (matching CSS object-cover object-top)
    const scaleReal = Math.max(cw / REAL_W, ch / REAL_H);
    const dwReal = REAL_W * scaleReal;
    const dhReal = REAL_H * scaleReal;
    const xReal = (cw - dwReal) / 2;
    const yReal = 0; // object-top

    // 2. Calculate illustrated photo position/scale relative to real photo bounds
    const { REL_SCALE, REL_X, REL_Y } = CONFIG;
    const scaleIll = scaleReal * REL_SCALE;
    const dw = imgW * scaleIll;
    const dh = imgH * scaleIll;
    const dx = xReal + dwReal * REL_X;
    const dy = yReal + dhReal * REL_Y;

    const ctx = revealSourceCtx.current;
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, dw, dh);
  }, []);

  // ── Resize all offscreen and display canvases ──────────────────────────────
  const resizeAll = useCallback(() => {
    const container = containerRef.current;
    const displayCanvas = displayCanvasRef.current;
    if (!container || !displayCanvas) return;

    const rect = container.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const dpr = Math.max(1, window.devicePixelRatio || 1);
    dims.current = { width: rect.width, height: rect.height };

    const displayCtx = displayCanvas.getContext('2d');
    fitCanvas(displayCanvas, displayCtx, rect.width, rect.height, dpr);
    displayCtx.clearRect(0, 0, rect.width, rect.height);

    if (!maskCanvas.current) {
      maskCanvas.current = document.createElement('canvas');
      maskCtx.current = maskCanvas.current.getContext('2d');
    }
    fitCanvas(maskCanvas.current, maskCtx.current, rect.width, rect.height, dpr);
    maskCtx.current.clearRect(0, 0, rect.width, rect.height);

    if (!revealSourceCanvas.current) {
      revealSourceCanvas.current = document.createElement('canvas');
      revealSourceCtx.current = revealSourceCanvas.current.getContext('2d');
    }
    fitCanvas(revealSourceCanvas.current, revealSourceCtx.current, rect.width, rect.height, dpr);

    renderRevealSource();
  }, [containerRef, fitCanvas, renderRevealSource]);

  // ── Image Loader (robust load with cached handling) ────────────────────────
  const startLoadingImage = useCallback(() => {
    if (imgLoaded.current) return;
    if (illustratedImg.current) {
      if (illustratedImg.current.complete && illustratedImg.current.naturalWidth > 0) {
        imgLoaded.current = true;
        renderRevealSource();
      }
      return;
    }
    loadingStarted.current = true;

    const img = new Image();
    img.onload = () => {
      imgLoaded.current = true;
      illustratedImg.current = img;
      renderRevealSource();
    };
    img.onerror = (err) => {
      console.error('Failed to load reveal image:', illustratedSrc, err);
    };
    img.src = illustratedSrc;
    illustratedImg.current = img;

    if (img.complete && img.naturalWidth > 0) {
      imgLoaded.current = true;
      renderRevealSource();
    }
  }, [illustratedSrc, renderRevealSource]);

  // Load image immediately on mount
  useEffect(() => {
    startLoadingImage();
  }, [startLoadingImage]);

  // ── Animation Loop ────────────────────────────────────────────────────────
  const loop = useCallback((now) => {
    const displayCanvas = displayCanvasRef.current;
    if (!displayCanvas || !maskCtx.current) {
      rafId.current = null;
      return;
    }

    const { width: w, height: h } = dims.current;
    if (w === 0 || h === 0) {
      rafId.current = requestAnimationFrame(loop);
      return;
    }

    const dt = Math.min(64, now - lastFrameTime.current || 16);
    lastFrameTime.current = now;

    const mCtx = maskCtx.current;
    const { TRAIL_DURATION, BLUR_PX, SPOT_RADIUS } = CONFIG;

    // Exponential decay pass (destination-out) over TRAIL_DURATION
    const k = 3.912 / TRAIL_DURATION; // ln(1/0.02) / ms
    const fadeAlpha = 1 - Math.exp(-k * dt);
    mCtx.save();
    mCtx.globalCompositeOperation = 'destination-out';
    mCtx.fillStyle = `rgba(0,0,0,${fadeAlpha})`;
    mCtx.fillRect(0, 0, w, h);
    mCtx.restore();

    // Paint continuous stroke to mask canvas on hover
    if (isHovering.current && currentPoint.current) {
      lastActiveTime.current = now;
      mCtx.save();
      if (BLUR_PX > 0) {
        mCtx.filter = `blur(${BLUR_PX}px)`;
      } else {
        mCtx.filter = 'none';
      }
      mCtx.lineCap = 'round';
      mCtx.lineJoin = 'round';
      mCtx.strokeStyle = 'rgba(255,255,255,1)';
      mCtx.fillStyle = 'rgba(255,255,255,1)';
      mCtx.lineWidth = SPOT_RADIUS * 2;

      const from = lastPoint.current || currentPoint.current;
      mCtx.beginPath();
      mCtx.moveTo(from.x, from.y);
      mCtx.lineTo(currentPoint.current.x, currentPoint.current.y);
      mCtx.stroke();

      mCtx.beginPath();
      mCtx.arc(currentPoint.current.x, currentPoint.current.y, SPOT_RADIUS, 0, Math.PI * 2);
      mCtx.fill();
      mCtx.restore();

      lastPoint.current = currentPoint.current;
    }

    // Compose to display canvas: draw pre-rendered illustrated source, clip to mask
    const dCtx = displayCanvas.getContext('2d');
    dCtx.clearRect(0, 0, w, h);

    if (imgLoaded.current && revealSourceCanvas.current) {
      dCtx.save();
      dCtx.globalAlpha = 1;
      dCtx.drawImage(revealSourceCanvas.current, 0, 0, w, h);
      dCtx.globalCompositeOperation = 'destination-in';
      dCtx.globalAlpha = 1;
      dCtx.drawImage(maskCanvas.current, 0, 0, w, h);
      dCtx.restore();
    }

    // Continue RAF while hovering or while trail fade is draining
    if (isHovering.current || now - lastActiveTime.current < TRAIL_DURATION * 1.1) {
      rafId.current = requestAnimationFrame(loop);
    } else {
      rafId.current = null;
      lastPoint.current = null;
      if (maskCtx.current) {
        maskCtx.current.clearRect(0, 0, w, h);
      }
      dCtx.clearRect(0, 0, w, h);
    }
  }, []);

  // ── Setup listeners & continuous looping auto-demo ────────────────────────
  useEffect(() => {
    if (!isEligible) return;

    const container = containerRef.current;
    if (!container) return;

    startLoadingImage();
    resizeAll();

    const updatePos = (clientX, clientY) => {
      const rect = container.getBoundingClientRect();
      currentPoint.current = {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
    };

    const startLoop = () => {
      if (dims.current.width === 0 || dims.current.height === 0) {
        resizeAll();
      }
      if (rafId.current === null) {
        lastFrameTime.current = performance.now();
        rafId.current = requestAnimationFrame(loop);
      }
    };

    const stopDemoAnimationOnly = () => {
      if (demoRafRef.current) {
        cancelAnimationFrame(demoRafRef.current);
        demoRafRef.current = null;
      }
      if (isDemoPlaying.current) {
        isDemoPlaying.current = false;
      }
      setDemoPointerPos(null);
    };

    const cancelDemoAndLoop = () => {
      hasRealInteracted.current = true;
      if (demoTimeoutRef.current) {
        clearTimeout(demoTimeoutRef.current);
        demoTimeoutRef.current = null;
      }
      stopDemoAnimationOnly();
      if (onInteraction) onInteraction();
    };

    const DEMO_PATHS = [
      // Path 0: Diagonal top-left -> bottom-right curve
      [{ x: 0.28, y: 0.32 }, { x: 0.65, y: 0.38 }, { x: 0.58, y: 0.68 }],
      // Path 1: Curved arc bottom-left -> top-right
      [{ x: 0.32, y: 0.68 }, { x: 0.38, y: 0.30 }, { x: 0.70, y: 0.42 }],
      // Path 2: Reverse diagonal top-right -> left-center
      [{ x: 0.68, y: 0.32 }, { x: 0.32, y: 0.45 }, { x: 0.42, y: 0.65 }],
    ];

    const runAutoDemo = () => {
      if (hasRealInteracted.current || isHovering.current) return;
      isDemoPlaying.current = true;
      lastPoint.current = null;

      // Pick a random path index (preferably different from last)
      let pathIdx = Math.floor(Math.random() * DEMO_PATHS.length);
      if (pathIdx === lastPathIdxRef.current) {
        pathIdx = (pathIdx + 1) % DEMO_PATHS.length;
      }
      lastPathIdxRef.current = pathIdx;
      const [p0, p1, p2] = DEMO_PATHS[pathIdx];

      let startTime = null;
      const duration = 1350; // Slow, deliberate 1.35s scripted sweep for clear perception

      const stepDemo = (now) => {
        if (!isDemoPlaying.current || hasRealInteracted.current) {
          setDemoPointerPos(null);
          return;
        }
        if (!startTime) startTime = now;
        const elapsed = now - startTime;
        const t = Math.min(1, elapsed / duration);

        const relX = (1 - t) * (1 - t) * p0.x + 2 * (1 - t) * t * p1.x + t * t * p2.x;
        const relY = (1 - t) * (1 - t) * p0.y + 2 * (1 - t) * t * p1.y + t * t * p2.y;

        setDemoPointerPos({ x: relX, y: relY });

        const { width: w, height: h } = dims.current;
        if (w > 0 && h > 0) {
          currentPoint.current = { x: relX * w, y: relY * h };
          isHovering.current = true;
          startLoop();
        }

        if (t < 1) {
          demoRafRef.current = requestAnimationFrame(stepDemo);
        } else {
          isHovering.current = false;
          isDemoPlaying.current = false;
          lastPoint.current = null;
          demoRafRef.current = null;
          setDemoPointerPos(null);
          startLoop(); // Continue decay pass

          // Schedule next loop iteration in 5000ms if user hasn't interacted
          if (!hasRealInteracted.current) {
            demoTimeoutRef.current = setTimeout(() => {
              if (!hasRealInteracted.current && !isHovering.current) {
                runAutoDemo();
              }
            }, 5000);
          }
        }
      };

      demoRafRef.current = requestAnimationFrame(stepDemo);
    };

    // Schedule initial auto-demo playback after 1.2s delay
    if (!hasRealInteracted.current) {
      demoTimeoutRef.current = setTimeout(() => {
        runAutoDemo();
      }, 1200);
    }

    const onMouseEnter = (e) => {
      cancelDemoAndLoop();
      startLoadingImage();
      isHovering.current = true;
      lastPoint.current = null;
      updatePos(e.clientX, e.clientY);
      startLoop();
    };

    const onMouseMove = (e) => {
      if (!hasRealInteracted.current || isDemoPlaying.current) {
        cancelDemoAndLoop();
      }
      startLoadingImage();
      isHovering.current = true;
      updatePos(e.clientX, e.clientY);
      startLoop();
    };

    const onMouseLeave = () => {
      if (isDemoPlaying.current) {
        cancelDemoAndLoop();
      }
      isHovering.current = false;
      lastPoint.current = null;
      startLoop(); // Ensure decay animation loop continues running after mouse leave
    };

    // Touch event handlers for mobile devices (Intent Detection)
    let touchStartPos = null;
    let gestureMode = 'UNDECIDED'; // 'UNDECIDED' | 'REVEAL' | 'SCROLL'

    const onTouchStart = (e) => {
      if (!e.touches || !e.touches[0]) return;
      touchStartPos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      gestureMode = 'UNDECIDED';
      startLoadingImage();
    };

    const onTouchMove = (e) => {
      if (!e.touches || !e.touches[0] || !touchStartPos) return;

      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;

      if (gestureMode === 'UNDECIDED') {
        const deltaX = Math.abs(currentX - touchStartPos.x);
        const deltaY = Math.abs(currentY - touchStartPos.y);
        const dist = Math.hypot(deltaX, deltaY);

        if (dist >= 6) {
          if (deltaX >= deltaY * 0.8) {
            gestureMode = 'REVEAL';
            cancelDemoAndLoop();
            isHovering.current = true;
            lastPoint.current = null;
            updatePos(currentX, currentY);
            startLoop();
          } else {
            gestureMode = 'SCROLL';
            isHovering.current = false;
          }
        }
      }

      if (gestureMode === 'REVEAL') {
        if (e.cancelable) e.preventDefault();
        isHovering.current = true;
        updatePos(currentX, currentY);
        startLoop();
      }
    };

    const onTouchEnd = () => {
      touchStartPos = null;
      gestureMode = 'UNDECIDED';
      isHovering.current = false;
      lastPoint.current = null;
      startLoop();
    };

    const resizeObserver = new ResizeObserver(() => {
      resizeAll();
    });
    resizeObserver.observe(container);

    container.addEventListener('mouseenter', onMouseEnter);
    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', onMouseLeave);

    container.addEventListener('touchstart', onTouchStart, { passive: true });
    container.addEventListener('touchmove', onTouchMove, { passive: false });
    container.addEventListener('touchend', onTouchEnd, { passive: true });
    container.addEventListener('touchcancel', onTouchEnd, { passive: true });

    return () => {
      if (demoTimeoutRef.current) {
        clearTimeout(demoTimeoutRef.current);
        demoTimeoutRef.current = null;
      }
      stopDemoAnimationOnly();
      resizeObserver.disconnect();
      container.removeEventListener('mouseenter', onMouseEnter);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseleave', onMouseLeave);

      container.removeEventListener('touchstart', onTouchStart);
      container.removeEventListener('touchmove', onTouchMove);
      container.removeEventListener('touchend', onTouchEnd);
      container.removeEventListener('touchcancel', onTouchEnd);

      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
    };
  }, [isEligible, containerRef, startLoadingImage, resizeAll, loop, onInteraction]);

  if (!isEligible) return null;

  return (
    <>
      <canvas
        ref={displayCanvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none z-20"
      />
      {demoPointerPos && (
        <div
          aria-hidden="true"
          className="absolute pointer-events-none z-30 -translate-x-[42%] -translate-y-[8%] transition-opacity duration-300"
          style={{
            left: `${demoPointerPos.x * 100}%`,
            top: `${demoPointerPos.y * 100}%`,
          }}
        >
          <div className="relative flex items-center justify-center filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.7)]">
            {/* Ambient soft glow ring */}
            <div className="absolute inset-0 rounded-full bg-white/20 blur-md scale-125 pointer-events-none" />

            {/* Clean classic pointer hand SVG: solid white stroke, translucent white fill */}
            <svg
              className="relative w-12 h-12 sm:w-14 sm:h-14"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 2a1 1 0 0 0-1 1v8.59l-1.3-1.3a1.5 1.5 0 0 0-2.12 0 1.5 1.5 0 0 0 0 2.12l4.8 4.8A4.5 4.5 0 0 0 13.56 19h3.44a4.5 4.5 0 0 0 4.5-4.5V10a1.5 1.5 0 0 0-3 0v.5a1.5 1.5 0 0 0-2.5-1.12V8.5a1.5 1.5 0 0 0-3 0V7a1.5 1.5 0 0 0-3 0V3a1 1 0 0 0-1-1z"
                fill="rgba(255, 255, 255, 0.3)"
                stroke="#FFFFFF"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      )}
    </>
  );
}
