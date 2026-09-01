import { useRef, useEffect, useCallback } from 'react';

const SPOT_RADIUS = 30;       // px — reveal circle radius
const TRAIL_DURATION = 2000;  // ms — how long a point lingers before fading
const BLUR_PX = 30;           // px — Gaussian softness on the mask canvas

/**
 * HeroCursorReveal
 *
 * Renders two stacked canvas layers over the hero photo:
 *   1. A hidden mask canvas (alpha channel only)
 *   2. A display canvas showing the illustrated image clipped to the fading mask
 *
 * LCP-safe: the illustrated image is only loaded after the real photo fires its
 * onLoad (via the `photoLoaded` boolean prop), so it never competes for bandwidth
 * during initial paint. requestIdleCallback (or setTimeout fallback) is used to
 * further defer the load to after the browser is idle post-paint.
 *
 * Desktop (pointer:fine) + no prefers-reduced-motion required — otherwise null.
 */
export default function HeroCursorReveal({ illustratedSrc, containerRef, photoLoaded }) {
  const maskCanvasRef = useRef(null);
  const displayCanvasRef = useRef(null);
  const illustratedImg = useRef(null);
  const trailPoints = useRef([]);       // [{ x, y, t }]
  const rafId = useRef(null);
  const isHovering = useRef(false);
  const lastPos = useRef(null);
  const imgLoaded = useRef(false);

  // ── Detect eligibility once (SSR-safe) ───────────────────────────────────
  const eligible = useRef(
    typeof window !== 'undefined' &&
    window.matchMedia('(pointer:fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  // ── Drawing loop ─────────────────────────────────────────────────────────
  const draw = useCallback(() => {
    const maskCanvas = maskCanvasRef.current;
    const displayCanvas = displayCanvasRef.current;
    if (!maskCanvas || !displayCanvas || !imgLoaded.current) return;

    const now = Date.now();
    const w = maskCanvas.width;
    const h = maskCanvas.height;

    const mCtx = maskCanvas.getContext('2d');
    const dCtx = displayCanvas.getContext('2d');

    // 1. Decay existing trail by clearing and redrawing all live points
    //    (exponential approach: multiply alpha by decay factor each frame vs.
    //    storing absolute timestamps and re-rendering — we store timestamps
    //    for accuracy across variable frame rates)
    mCtx.clearRect(0, 0, w, h);

    // Cull expired points
    trailPoints.current = trailPoints.current.filter(
      (p) => now - p.t < TRAIL_DURATION
    );

    // Draw each point as a soft radial gradient (creates the blurry edge)
    for (const p of trailPoints.current) {
      const age = now - p.t;
      const alpha = 1 - age / TRAIL_DURATION; // linear fade

      const grad = mCtx.createRadialGradient(p.x, p.y, 0, p.x, p.y, SPOT_RADIUS + BLUR_PX);
      grad.addColorStop(0, `rgba(255,255,255,${alpha})`);
      grad.addColorStop(SPOT_RADIUS / (SPOT_RADIUS + BLUR_PX), `rgba(255,255,255,${alpha * 0.6})`);
      grad.addColorStop(1, 'rgba(255,255,255,0)');

      mCtx.beginPath();
      mCtx.arc(p.x, p.y, SPOT_RADIUS + BLUR_PX, 0, Math.PI * 2);
      mCtx.fillStyle = grad;
      mCtx.fill();
    }

    // 2. Composite: draw illustrated image clipped to mask
    dCtx.clearRect(0, 0, w, h);

    if (trailPoints.current.length > 0) {
      // Draw mask onto display canvas
      dCtx.drawImage(maskCanvas, 0, 0);
      // Clip illustrated image to existing paint (destination-in)
      dCtx.globalCompositeOperation = 'source-in';
      dCtx.drawImage(illustratedImg.current, 0, 0, w, h);
      dCtx.globalCompositeOperation = 'source-over';
    }

    // 3. Continue loop while hovering or trail still visible
    if (isHovering.current || trailPoints.current.length > 0) {
      rafId.current = requestAnimationFrame(draw);
    } else {
      rafId.current = null;
    }
  }, []);

  // ── Inject trail points along the stroke from lastPos to currentPos ──────
  const injectStrokePoints = useCallback((x, y) => {
    const now = Date.now();
    if (lastPos.current) {
      const dx = x - lastPos.current.x;
      const dy = y - lastPos.current.y;
      const dist = Math.hypot(dx, dy);
      const steps = Math.max(1, Math.ceil(dist / (SPOT_RADIUS * 0.4)));
      for (let i = 1; i <= steps; i++) {
        trailPoints.current.push({
          x: lastPos.current.x + (dx * i) / steps,
          y: lastPos.current.y + (dy * i) / steps,
          t: now,
        });
      }
    } else {
      trailPoints.current.push({ x, y, t: now });
    }
    lastPos.current = { x, y };
  }, []);

  // ── Resize canvas to match container ─────────────────────────────────────
  const syncSize = useCallback(() => {
    const container = containerRef.current;
    const maskCanvas = maskCanvasRef.current;
    const displayCanvas = displayCanvasRef.current;
    if (!container || !maskCanvas || !displayCanvas) return;
    const { width, height } = container.getBoundingClientRect();
    maskCanvas.width = width;
    maskCanvas.height = height;
    displayCanvas.width = width;
    displayCanvas.height = height;
  }, [containerRef]);

  // ── Main setup effect ─────────────────────────────────────────────────────
  useEffect(() => {
    if (!eligible.current) return;

    const container = containerRef.current;
    if (!container) return;

    // ── LCP-safe deferred load ────────────────────────────────────────────
    // Only start loading the illustrated image after the real photo fires its
    // onLoad event (`photoLoaded` prop). We then further defer via
    // requestIdleCallback so the browser is fully done painting LCP before
    // any secondary network request begins. fetchpriority='low' as a backstop.
    if (photoLoaded && !illustratedImg.current) {
      const load = () => {
        const img = new Image();
        img.fetchpriority = 'low';
        img.src = illustratedSrc;
        img.onload = () => { imgLoaded.current = true; };
        illustratedImg.current = img;
      };
      if (typeof requestIdleCallback !== 'undefined') {
        requestIdleCallback(load, { timeout: 3000 });
      } else {
        setTimeout(load, 200);
      }
    }

    syncSize();

    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      injectStrokePoints(x, y);

      // Kick off RAF if not already running
      if (!rafId.current) {
        rafId.current = requestAnimationFrame(draw);
      }
    };

    const onMouseEnter = () => {
      isHovering.current = true;
      lastPos.current = null;
      if (!rafId.current) {
        rafId.current = requestAnimationFrame(draw);
      }
    };

    const onMouseLeave = () => {
      isHovering.current = false;
      lastPos.current = null;
      // RAF continues running to drain the trail fade — draw() self-stops
    };

    const onResize = () => {
      syncSize();
      trailPoints.current = [];
    };

    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseenter', onMouseEnter);
    container.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('resize', onResize);

    return () => {
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseenter', onMouseEnter);
      container.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('resize', onResize);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
    };
  }, [containerRef, illustratedSrc, photoLoaded, draw, injectStrokePoints, syncSize]);

  if (!eligible.current) return null;

  return (
    <>
      {/* Hidden mask canvas — not visible, used for alpha channel only */}
      <canvas
        ref={maskCanvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none opacity-0 z-0"
      />
      {/* Display canvas — illustrated image clipped to mask */}
      <canvas
        ref={displayCanvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none z-20"
      />
    </>
  );
}
