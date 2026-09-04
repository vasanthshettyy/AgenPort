import { useRef, useEffect, useState, useCallback } from 'react';

// Hardcoded final tuned values
const SPOT_RADIUS = 30;       // px — radius of reveal spot
const TRAIL_DURATION = 3000;  // ms — smooth 3.0-second decay trail
const BLUR_PX = 29;           // px — Gaussian softness for mask stroke
const ALIGN_SCALE = 1.17;     // zoom level to match real photo framing
const ALIGN_Y     = -0.148;   // vertical alignment offset
const ALIGN_X     = 0.048;    // horizontal alignment offset

/**
 * HeroCursorReveal
 *
 * Renders an offscreen mask & canvas trail reveal effect over the hero photo.
 * On desktop (pointer: fine, min-width 768px, no reduced motion):
 *   - Hovering over the photo container reveals the illustrated WebP image
 *     underneath through a soft circular trail that follows the cursor
 *     and fades out over 3.0 seconds.
 *   - Continuous stroke drawing prevents discrete dot gaps.
 *   - Single-pass destination-out exponential decay ensures 60fps performance.
 *   - LCP safe: Illustrated image load is deferred via requestIdleCallback/hover.
 *   - Mobile & reduced-motion safe: Returns null on touch/small screens or reduced motion.
 */
export default function HeroCursorReveal({ illustratedSrc, containerRef }) {
  const [isEligible, setIsEligible] = useState(false);

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

  // ── Eligibility Check ─────────────────────────────────────────────────────
  useEffect(() => {
    const checkEligibility = () => {
      const finePointer = window.matchMedia('(pointer: fine)').matches;
      const desktopWidth = window.innerWidth >= 768;
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setIsEligible(finePointer && desktopWidth && !reducedMotion);
    };

    checkEligibility();
    window.addEventListener('resize', checkEligibility);
    return () => window.removeEventListener('resize', checkEligibility);
  }, []);

  // ── Fit canvas with DPR scaling ───────────────────────────────────────────
  const fitCanvas = useCallback((canvas, ctx, width, height, dpr) => {
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }, []);

  // ── Draw image with tuned alignment ──────────────────────────────────────
  const renderRevealSource = useCallback(() => {
    if (!revealSourceCtx.current || !illustratedImg.current || !imgLoaded.current) return;
    const { width: cw, height: ch } = dims.current;
    if (cw === 0 || ch === 0) return;

    const img = illustratedImg.current;
    const imgW = img.naturalWidth || img.width;
    const imgH = img.naturalHeight || img.height;
    if (!imgW || !imgH) return;

    // Base object-cover scale (same as CSS object-cover object-top)
    const baseScale = Math.max(cw / imgW, ch / imgH);
    // Apply alignment correction: scale + position shift
    const finalScale = baseScale * ALIGN_SCALE;
    const dw = imgW * finalScale;
    const dh = imgH * finalScale;

    const dx = (cw - dw) / 2 + cw * ALIGN_X;
    const dy = ch * ALIGN_Y;

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

  // ── Image Loader (deferred, low-priority) ──────────────────────────────────
  const startLoadingImage = useCallback(() => {
    if (loadingStarted.current || illustratedImg.current) return;
    loadingStarted.current = true;

    const img = new Image();
    img.src = illustratedSrc;
    img.onload = () => {
      imgLoaded.current = true;
      illustratedImg.current = img;
      renderRevealSource();
    };
    illustratedImg.current = img;
  }, [illustratedSrc, renderRevealSource]);

  // ── Animation Loop ────────────────────────────────────────────────────────
  const loop = useCallback((now) => {
    const displayCanvas = displayCanvasRef.current;
    if (!displayCanvas || !maskCtx.current) {
      rafId.current = null;
      return;
    }

    const dt = Math.min(64, now - lastFrameTime.current || 16);
    lastFrameTime.current = now;

    const { width: w, height: h } = dims.current;
    const mCtx = maskCtx.current;

    // 1. Exponential decay pass (destination-out) over TRAIL_DURATION
    const k = 3.912 / TRAIL_DURATION; // ln(1/0.02) / ms
    const fadeAlpha = 1 - Math.exp(-k * dt);
    mCtx.save();
    mCtx.globalCompositeOperation = 'destination-out';
    mCtx.fillStyle = `rgba(0,0,0,${fadeAlpha})`;
    mCtx.fillRect(0, 0, w, h);
    mCtx.restore();

    // 2. Paint continuous stroke to mask canvas on hover
    if (isHovering.current && currentPoint.current) {
      lastActiveTime.current = now;
      mCtx.save();
      if (BLUR_PX > 0) {
        mCtx.filter = `blur(${BLUR_PX}px)`;
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

    // 3. Compose to display canvas: draw pre-rendered illustrated source, clip to mask
    const dCtx = displayCanvas.getContext('2d');
    dCtx.clearRect(0, 0, w, h);

    if (imgLoaded.current && revealSourceCanvas.current) {
      dCtx.drawImage(revealSourceCanvas.current, 0, 0, w, h);
      dCtx.globalCompositeOperation = 'destination-in';
      dCtx.drawImage(maskCanvas.current, 0, 0, w, h);
      dCtx.globalCompositeOperation = 'source-over';
    }

    // 4. Continue RAF while hovering or while trail fade is draining
    if (isHovering.current || now - lastActiveTime.current < TRAIL_DURATION * 1.2) {
      rafId.current = requestAnimationFrame(loop);
    } else {
      rafId.current = null;
      lastPoint.current = null;
      dCtx.clearRect(0, 0, w, h);
    }
  }, []);

  // ── Setup listeners and deferred image load ──────────────────────────────
  useEffect(() => {
    if (!isEligible) return;

    const container = containerRef.current;
    if (!container) return;

    let idleId;
    let timerId;
    if (typeof requestIdleCallback !== 'undefined') {
      idleId = requestIdleCallback(() => startLoadingImage(), { timeout: 2000 });
    } else {
      timerId = setTimeout(() => startLoadingImage(), 200);
    }

    resizeAll();

    const updatePos = (clientX, clientY) => {
      const rect = container.getBoundingClientRect();
      currentPoint.current = {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
    };

    const startLoop = () => {
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
    };

    const onResize = () => {
      resizeAll();
    };

    container.addEventListener('mouseenter', onMouseEnter);
    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('resize', onResize);

    return () => {
      if (idleId && typeof cancelIdleCallback !== 'undefined') cancelIdleCallback(idleId);
      if (timerId) clearTimeout(timerId);

      container.removeEventListener('mouseenter', onMouseEnter);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('resize', onResize);

      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
    };
  }, [isEligible, containerRef, startLoadingImage, resizeAll, loop]);

  if (!isEligible) return null;

  return (
    <canvas
      ref={displayCanvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none z-20"
    />
  );
}
