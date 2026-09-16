/**
 * src/hooks/usePointerLens.ts
 * Owns the SINGLE consolidated animation loop for the hero lens.
 * Driven by the GSAP ticker, paused by IntersectionObserver when #hero leaves the viewport.
 * Directly updates CSS custom properties and LensStage SVG graticule elements in one unified frame.
 * — ARCHITECTURE.md §2.4, HOMEPAGE-BUILD-SPEC §3.2–3.4, REMEDIATION § 3e, 4b, 4d
 *
 * Writes: --lens-x, --lens-y, --lens-r, --lens-r-px, --drift-x, --drift-y
 * Desktop: lerped pointer follow, FOLLOW = 0.09
 * Touch / Mobile: autonomous Lissajous orbit constrained to lower viewing zone
 * Reduced motion: locks centre at 45% opacity, exits loop
 * Pauses ticker via IntersectionObserver when #hero leaves viewport
 */

'use client';

import { useEffect, useRef, useCallback } from 'react';
import { gsap, lerp, FOLLOW } from '@/lib/gsap';

/* ---- Radius in px (computed at init) ---- */

/** Compute a clamp value manually — viewport-based */
function computeClamp(min: number, vw: number, max: number): number {
  const vwPx = window.innerWidth * (vw / 100);
  return Math.min(Math.max(min, vwPx), max);
}

/** Default lens radius parameters: clamp(150px, 17vw, 260px) */
const R_DEFAULT = { min: 150, vw: 17, max: 260 };
/** Expanded on press: clamp(210px, 24vw, 360px) */
const R_PRESSED = { min: 210, vw: 24, max: 360 };
/** Mobile: clamp(120px, 34vw, 200px) */
const R_MOBILE = { min: 120, vw: 34, max: 200 };

/** Lissajous orbit parameters — HOMEPAGE-BUILD-SPEC §3.4 */
const LISSAJOUS_FREQ_X = 0.42;
const LISSAJOUS_FREQ_Y = 0.61;

/** Parallax drift multipliers — HOMEPAGE-BUILD-SPEC §3.2 */
const DRIFT_X_FACTOR = -18;
const DRIFT_Y_FACTOR = -12;

/** Ring crosshair geometry */
const TICK_LENGTH = 14;
const TICK_INSET = 8;

interface LensDomElements {
  ic: SVGCircleElement | null;
  og: SVGGElement | null;
  oc: SVGCircleElement | null;
  crosshairH: SVGLineElement | null;
  crosshairV: SVGLineElement | null;
  centerRing: SVGCircleElement | null;
  graticuleTicks: SVGGElement | null;
  tN: SVGLineElement | null;
  tS: SVGLineElement | null;
  tE: SVGLineElement | null;
  tW: SVGLineElement | null;
  rd: HTMLElement | null;
  cd: HTMLElement | null;
}

function getLensDomElements(): LensDomElements {
  return {
    ic: document.getElementById('lens-inner-circle') as SVGCircleElement | null,
    og: document.getElementById('lens-outer-g') as SVGGElement | null,
    oc: document.getElementById('lens-outer-circle') as SVGCircleElement | null,
    crosshairH: document.getElementById('lens-crosshair-h') as SVGLineElement | null,
    crosshairV: document.getElementById('lens-crosshair-v') as SVGLineElement | null,
    centerRing: document.getElementById('lens-center-ring') as SVGCircleElement | null,
    graticuleTicks: document.getElementById('lens-graticule-ticks') as SVGGElement | null,
    tN: document.getElementById('lens-tick-n') as SVGLineElement | null,
    tS: document.getElementById('lens-tick-s') as SVGLineElement | null,
    tE: document.getElementById('lens-tick-e') as SVGLineElement | null,
    tW: document.getElementById('lens-tick-w') as SVGLineElement | null,
    rd: document.getElementById('lens-readout'),
    cd: document.getElementById('lens-coords'),
  };
}

function updateLensDom(dom: LensDomElements, x: number, y: number, r: number) {
  if (dom.ic) {
    dom.ic.setAttribute('cx', String(x));
    dom.ic.setAttribute('cy', String(y));
    dom.ic.setAttribute('r', String(r));
  }

  if (dom.og) {
    dom.og.style.transformOrigin = `${x}px ${y}px`;
  }

  if (dom.oc) {
    dom.oc.setAttribute('cx', String(x));
    dom.oc.setAttribute('cy', String(y));
    dom.oc.setAttribute('r', String(r + 12));
  }

  // Calibrated graticule full crosshairs
  if (dom.crosshairH) {
    dom.crosshairH.setAttribute('x1', String(x - r));
    dom.crosshairH.setAttribute('y1', String(y));
    dom.crosshairH.setAttribute('x2', String(x + r));
    dom.crosshairH.setAttribute('y2', String(y));
  }

  if (dom.crosshairV) {
    dom.crosshairV.setAttribute('x1', String(x));
    dom.crosshairV.setAttribute('y1', String(y - r));
    dom.crosshairV.setAttribute('x2', String(x));
    dom.crosshairV.setAttribute('y2', String(y + r));
  }

  // Center target reticle
  if (dom.centerRing) {
    dom.centerRing.setAttribute('cx', String(x));
    dom.centerRing.setAttribute('cy', String(y));
  }

  // Precision axis ticks
  if (dom.graticuleTicks) {
    dom.graticuleTicks.setAttribute('transform', `translate(${x}, ${y})`);
  }

  // Outer boundary ticks
  if (dom.tN) {
    dom.tN.setAttribute('x1', String(x));
    dom.tN.setAttribute('y1', String(y - r + TICK_INSET));
    dom.tN.setAttribute('x2', String(x));
    dom.tN.setAttribute('y2', String(y - r + TICK_INSET + TICK_LENGTH));
  }

  if (dom.tS) {
    dom.tS.setAttribute('x1', String(x));
    dom.tS.setAttribute('y1', String(y + r - TICK_INSET - TICK_LENGTH));
    dom.tS.setAttribute('x2', String(x));
    dom.tS.setAttribute('y2', String(y + r - TICK_INSET));
  }

  if (dom.tE) {
    dom.tE.setAttribute('x1', String(x + r - TICK_INSET - TICK_LENGTH));
    dom.tE.setAttribute('y1', String(y));
    dom.tE.setAttribute('x2', String(x + r - TICK_INSET));
    dom.tE.setAttribute('y2', String(y));
  }

  if (dom.tW) {
    dom.tW.setAttribute('x1', String(x - r + TICK_INSET));
    dom.tW.setAttribute('y1', String(y));
    dom.tW.setAttribute('x2', String(x - r + TICK_INSET + TICK_LENGTH));
    dom.tW.setAttribute('y2', String(y));
  }

  // Coordinate readout — positioned clear of hero type per spec 4b & 4d
  if (dom.rd) {
    if (window.innerWidth < 1024) {
      // Mobile: position directly above the lens top rim, centered with lens and clamped in viewport
      const rx = Math.max(16, Math.min(x - 65, window.innerWidth - 150));
      const ry = y - r - 26;
      dom.rd.style.transform = `translate(${rx}px, ${ry}px)`;
    } else {
      // Desktop: positioned bottom-right of the ring, shifted clear of the central headline type
      const rx = Math.min(x + r * 0.707 + 34, window.innerWidth - 160);
      const ry = Math.min(y + r * 0.707 + 16, window.innerHeight - 80);
      dom.rd.style.transform = `translate(${rx}px, ${ry}px)`;
    }
  }

  if (dom.cd) {
    dom.cd.textContent = `X ${x.toFixed(1)}   Y ${y.toFixed(1)}`;
  }
}

function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 1024;
}

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function usePointerLens(heroRef: React.RefObject<HTMLElement | null>) {
  // Current smoothed position
  const lensX = useRef(0);
  const lensY = useRef(0);

  // Target position (set by pointermove or Lissajous)
  const targetX = useRef(0);
  const targetY = useRef(0);

  // Current and target radius (in px) — lerped for smooth press/release
  const radiusCurrent = useRef(200);
  const radiusTarget = useRef(200);

  // Ticker active state
  const isTickerActive = useRef(false);

  // Touch detection
  const isTouch = useRef(false);

  // Lissajous time accumulator
  const lissajousT = useRef(0);

  // DOM elements cache for direct mutation
  const domRefs = useRef<LensDomElements>({
    ic: null,
    og: null,
    oc: null,
    crosshairH: null,
    crosshairV: null,
    centerRing: null,
    graticuleTicks: null,
    tN: null,
    tS: null,
    tE: null,
    tW: null,
    rd: null,
    cd: null,
  });

  const root = typeof document !== 'undefined' ? document.documentElement : null;

  /* ---- Set a CSS variable on :root ---- */
  const setVar = useCallback(
    (name: string, value: string) => {
      root?.style.setProperty(name, value);
    },
    [root]
  );

  useEffect(() => {
    if (!root || !heroRef.current) return;

    const hero = heroRef.current;
    isTouch.current = isTouchDevice();
    const reduced = prefersReducedMotion();

    const isMobileView = window.innerWidth < 1024;
    // Initial centre — on mobile, place in lower viewing window to avoid headline collision
    const cx = window.innerWidth / 2;
    const cy = isMobileView ? window.innerHeight * 0.68 : window.innerHeight / 2;

    lensX.current = cx;
    lensY.current = cy;
    targetX.current = cx;
    targetY.current = cy;

    // Compute initial radius in px
    const rParams = isTouch.current || isMobileView ? R_MOBILE : R_DEFAULT;
    const initialR = computeClamp(rParams.min, rParams.vw, rParams.max);
    radiusCurrent.current = initialR;
    radiusTarget.current = initialR;

    // Set initial values
    setVar('--lens-x', `${cx}px`);
    setVar('--lens-y', `${cy}px`);
    setVar('--lens-r', `${initialR}px`);
    setVar('--lens-r-px', `${initialR}`);
    setVar('--drift-x', '0px');
    setVar('--drift-y', '0px');

    domRefs.current = getLensDomElements();
    updateLensDom(domRefs.current, cx, cy, initialR);

    /* ---- Reduced motion: lock centre, exit ---- */
    if (reduced) {
      return; // No loop — CSS handles the static state
    }

    const handleResize = () => {
      isTouch.current = isTouchDevice();
      const w = window.innerWidth;
      const h = window.innerHeight;
      const mobile = w < 1024 || isTouch.current;
      const rp = mobile ? R_MOBILE : R_DEFAULT;
      const rPx = computeClamp(rp.min, rp.vw, rp.max);
      radiusTarget.current = rPx;
      if (mobile) {
        targetX.current = w / 2;
        targetY.current = h * 0.68;
      }
    };
    window.addEventListener('resize', handleResize);

    /* ---- Pointer handlers (desktop) ---- */
    const handlePointerMove = (e: PointerEvent) => {
      if (isTouch.current) return;
      targetX.current = e.clientX;

      if (window.innerWidth < 1024) {
        // Constrain lens travel below 1024px so it never collides with upper-anchored headline
        const minY = window.innerHeight * 0.52;
        const maxY = window.innerHeight * 0.80;
        targetY.current = Math.min(Math.max(e.clientY, minY), maxY);
      } else {
        targetY.current = e.clientY;
      }
    };

    const handlePointerDown = () => {
      if (isTouch.current) return;
      const pressed = computeClamp(R_PRESSED.min, R_PRESSED.vw, R_PRESSED.max);
      radiusTarget.current = pressed;
    };

    const handlePointerUp = () => {
      if (isTouch.current) return;
      const def = computeClamp(R_DEFAULT.min, R_DEFAULT.vw, R_DEFAULT.max);
      radiusTarget.current = def;
    };

    // Attach to hero
    hero.addEventListener('pointermove', handlePointerMove, { passive: true });
    hero.addEventListener('pointerdown', handlePointerDown);
    hero.addEventListener('pointerup', handlePointerUp);
    hero.addEventListener('pointerleave', handlePointerUp);

    // Radius lerp factor — slower than position for smooth feel
    const RADIUS_LERP = 0.06;

    /* ---- The unified GSAP ticker loop ---- */
    function tick(_time: number, deltaTime: number) {
      const dt = (deltaTime || 16.66) / 1000;
      const w = window.innerWidth;
      const h = window.innerHeight;
      const isMobileScreen = w < 1024;

      if (isTouch.current || isMobileScreen) {
        // Autonomous Lissajous orbit — HOMEPAGE-BUILD-SPEC §3.4
        lissajousT.current += dt;
        const t = lissajousT.current;

        const orbitCx = w / 2;
        const orbitCy = h * 0.68;
        const ampX = 0.22;
        const ampY = 0.05;

        targetX.current = orbitCx + Math.sin(t * LISSAJOUS_FREQ_X) * w * ampX;
        targetY.current = orbitCy + Math.sin(t * LISSAJOUS_FREQ_Y) * h * ampY;
      }

      // Lerp position toward target
      lensX.current = lerp(lensX.current, targetX.current, FOLLOW);
      lensY.current = lerp(lensY.current, targetY.current, FOLLOW);

      // Lerp radius toward target (smooth press/release)
      radiusCurrent.current = lerp(radiusCurrent.current, radiusTarget.current, RADIUS_LERP);

      // Write all CSS vars
      const lx = lensX.current;
      const ly = lensY.current;
      const lr = radiusCurrent.current;

      setVar('--lens-x', `${lx.toFixed(1)}px`);
      setVar('--lens-y', `${ly.toFixed(1)}px`);
      setVar('--lens-r', `${lr.toFixed(1)}px`);
      setVar('--lens-r-px', `${lr.toFixed(1)}`);

      // Ambient parallax — HOMEPAGE-BUILD-SPEC §3.2
      const dx = (lx / window.innerWidth - 0.5);
      const dy = (ly / window.innerHeight - 0.5);
      setVar('--drift-x', `${(dx * DRIFT_X_FACTOR).toFixed(1)}px`);
      setVar('--drift-y', `${(dy * DRIFT_Y_FACTOR).toFixed(1)}px`);

      // Update LensStage SVG graticule elements and readout in the exact same frame
      if (!domRefs.current.ic || !domRefs.current.crosshairH) {
        domRefs.current = getLensDomElements();
      }
      updateLensDom(domRefs.current, lx, ly, lr);
    }

    /* ---- IntersectionObserver — pause GSAP ticker when hero leaves viewport ---- */
    const observer = new IntersectionObserver(
      ([entry]) => {
        const intersecting = entry.isIntersecting;
        if (intersecting && !isTickerActive.current) {
          gsap.ticker.add(tick);
          isTickerActive.current = true;
        } else if (!intersecting && isTickerActive.current) {
          gsap.ticker.remove(tick);
          isTickerActive.current = false;
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(hero);

    /* ---- Cleanup ---- */
    return () => {
      if (isTickerActive.current) {
        gsap.ticker.remove(tick);
        isTickerActive.current = false;
      }
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      hero.removeEventListener('pointermove', handlePointerMove);
      hero.removeEventListener('pointerdown', handlePointerDown);
      hero.removeEventListener('pointerup', handlePointerUp);
      hero.removeEventListener('pointerleave', handlePointerUp);

      root.style.removeProperty('--lens-x');
      root.style.removeProperty('--lens-y');
      root.style.removeProperty('--lens-r');
      root.style.removeProperty('--lens-r-px');
      root.style.removeProperty('--drift-x');
      root.style.removeProperty('--drift-y');
    };
  }, [heroRef, root, setVar]);
}
