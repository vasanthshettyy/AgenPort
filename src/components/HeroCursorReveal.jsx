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

  // ── Setup listeners ───────────────────────────────────────────────────────
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

    const onMouseEnter = (e) => {
      startLoadingImage();
      isHovering.current = true;
      lastPoint.current = null;
      updatePos(e.clientX, e.clientY);
      startLoop();
      if (onInteraction) onInteraction();
    };

    const onMouseMove = (e) => {
      startLoadingImage();
      isHovering.current = true;
      updatePos(e.clientX, e.clientY);
      startLoop();
    };

    const onMouseLeave = () => {
      isHovering.current = false;
      lastPoint.current = null;
      startLoop(); // Ensure decay animation loop continues running after mouse leave
    };

    // Touch event handlers for mobile devices
    const onTouchStart = (e) => {
      if (!e.touches || !e.touches[0]) return;
      startLoadingImage();
      isHovering.current = true;
      lastPoint.current = null;
      updatePos(e.touches[0].clientX, e.touches[0].clientY);
      startLoop();
      if (onInteraction) onInteraction();
    };

    const onTouchMove = (e) => {
      if (!e.touches || !e.touches[0]) return;
      startLoadingImage();
      isHovering.current = true;
      updatePos(e.touches[0].clientX, e.touches[0].clientY);
      startLoop();
    };

    const onTouchEnd = () => {
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
    container.addEventListener('touchmove', onTouchMove, { passive: true });
    container.addEventListener('touchend', onTouchEnd, { passive: true });
    container.addEventListener('touchcancel', onTouchEnd, { passive: true });

    return () => {
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
    <canvas
      ref={displayCanvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none z-20"
    />
  );
}
