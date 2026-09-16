/**
 * src/hooks/usePointerLens.ts
 * Owns the SINGLE rAF loop for the hero lens.
 * Writes CSS custom properties directly on document.documentElement.
 * — ARCHITECTURE.md §2.4, HOMEPAGE-BUILD-SPEC §3.2–3.4
 *
 * Writes: --lens-x, --lens-y, --lens-r, --lens-r-px, --drift-x, --drift-y
 * Desktop: lerped pointer follow, FOLLOW = 0.09
 * Touch: autonomous Lissajous orbit, 14s period
 * Reduced motion: locks centre at 45% opacity, exits loop
 * Pauses loop via IntersectionObserver when #hero leaves viewport
 */

'use client';

import { useEffect, useRef, useCallback } from 'react';
import { lerp, FOLLOW } from '@/lib/gsap';

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
const LISSAJOUS_AMP_X = 0.30;
const LISSAJOUS_AMP_Y = 0.22;

/** Parallax drift multipliers — HOMEPAGE-BUILD-SPEC §3.2 */
const DRIFT_X_FACTOR = -18;
const DRIFT_Y_FACTOR = -12;

function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(pointer: coarse)').matches;
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

  // rAF handle
  const rafId = useRef<number>(0);

  // Visibility flag — pause when hero leaves viewport
  const isVisible = useRef(true);

  // Touch detection
  const isTouch = useRef(false);

  // Lissajous time accumulator
  const lissajousT = useRef(0);
  const lastFrameTime = useRef(0);

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

    // Initial centre
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;

    lensX.current = cx;
    lensY.current = cy;
    targetX.current = cx;
    targetY.current = cy;

    // Compute initial radius in px
    const rParams = isTouch.current ? R_MOBILE : R_DEFAULT;
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

    /* ---- Reduced motion: lock centre, exit ---- */
    if (reduced) {
      return; // No loop — CSS handles the static state
    }

    /* ---- Pointer handlers (desktop) ---- */
    const handlePointerMove = (e: PointerEvent) => {
      if (isTouch.current) return;
      targetX.current = e.clientX;
      targetY.current = e.clientY;
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

    /* ---- IntersectionObserver — pause when hero leaves viewport ---- */
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible.current = entry.isIntersecting;
        if (entry.isIntersecting && !rafId.current) {
          lastFrameTime.current = performance.now();
          rafId.current = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(hero);

    /* ---- The rAF loop ---- */
    lastFrameTime.current = performance.now();

    // Radius lerp factor — slower than position for smooth feel
    const RADIUS_LERP = 0.06;

    function tick(now: number) {
      if (!isVisible.current) {
        rafId.current = 0;
        return;
      }

      const dt = (now - lastFrameTime.current) / 1000;
      lastFrameTime.current = now;

      if (isTouch.current) {
        // Autonomous Lissajous orbit — HOMEPAGE-BUILD-SPEC §3.4
        lissajousT.current += dt;
        const t = lissajousT.current;
        const w = window.innerWidth;
        const h = window.innerHeight;

        targetX.current = w / 2 + Math.sin(t * LISSAJOUS_FREQ_X) * w * LISSAJOUS_AMP_X;
        targetY.current = h / 2 + Math.sin(t * LISSAJOUS_FREQ_Y) * h * LISSAJOUS_AMP_Y;
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

      rafId.current = requestAnimationFrame(tick);
    }

    rafId.current = requestAnimationFrame(tick);

    /* ---- Cleanup ---- */
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      hero.removeEventListener('pointermove', handlePointerMove);
      hero.removeEventListener('pointerdown', handlePointerDown);
      hero.removeEventListener('pointerup', handlePointerUp);
      hero.removeEventListener('pointerleave', handlePointerUp);
      observer.disconnect();

      root.style.removeProperty('--lens-x');
      root.style.removeProperty('--lens-y');
      root.style.removeProperty('--lens-r');
      root.style.removeProperty('--lens-r-px');
      root.style.removeProperty('--drift-x');
      root.style.removeProperty('--drift-y');
    };
  }, [heroRef, root, setVar]);
}
