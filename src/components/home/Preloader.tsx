/**
 * src/components/home/Preloader.tsx
 * "RACKING FOCUS" — HOMEPAGE-BUILD-SPEC §2
 *
 * Full-viewport --void, z-index: 100. Duration 2.2s, then out.
 * Runs once per session (sessionStorage), fails silently.
 * Skips entirely under prefers-reduced-motion.
 *
 * Timeline:
 * 0.0 – 0.3s   graticule fades in, scales 1.06 → 1
 * 0.3 – 1.7s   counter 000 → 150 (GSAP snap:1, ease 'power2.out')
 *              SIMULTANEOUS: blur 48 → 0, brightness 0.3 → 1,
 *              saturate 0.4 → 1, scale 1.14 → 1.04 (ease: EASE.rack)
 * 1.7 – 1.9s   counter holds; label swaps to species name, italic serif
 * 1.9 – 2.2s   graticule + counter fade out, scale 1 → 1.4
 *              hero type stagger-enters from y:40, opacity:0
 */

'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { gsap, EASE } from '@/lib/gsap';
import { Binomial } from '@/components/ui/Binomial';

const SESSION_STORAGE_KEY = 'entobio_preloader_seen';

/** Helper to check if sessionStorage is available */
function isSessionStorageAvailable(): boolean {
  try {
    if (typeof window === 'undefined') return false;
    const testKey = '__test_storage__';
    window.sessionStorage.setItem(testKey, '1');
    window.sessionStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

/** Check reduced motion preference */
function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

const emptySubscribe = () => () => {};

function getPreloaderSnapshot(): boolean {
  if (prefersReducedMotion()) return true;
  if (!isSessionStorageAvailable()) return false;
  try {
    return window.sessionStorage.getItem(SESSION_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

function getPreloaderServerSnapshot(): boolean {
  return false;
}

export function Preloader() {
  const isSeenInStorage = useSyncExternalStore(
    emptySubscribe,
    getPreloaderSnapshot,
    getPreloaderServerSnapshot
  );
  const [isAnimationDone, setIsAnimationDone] = useState(false);
  const isDone = isSeenInStorage || isAnimationDone;
  const shouldRender = !isDone;

  const containerRef = useRef<HTMLDivElement>(null);
  const graticuleRef = useRef<SVGSVGElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const defaultLabelRef = useRef<HTMLSpanElement>(null);
  const speciesLabelRef = useRef<HTMLSpanElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!shouldRender || isDone || !containerRef.current) return;

    const sharedParent = containerRef.current.closest('main') ?? document.body;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (isSessionStorageAvailable()) {
            try {
              window.sessionStorage.setItem(SESSION_STORAGE_KEY, 'true');
            } catch {
              // Fail silently
            }
          }
          setIsAnimationDone(true);
        },
      });

      // 0.0 – 0.3s: graticule fades in, scales 1.06 → 1
      tl.fromTo(
        graticuleRef.current,
        { opacity: 0, scale: 1.06 },
        { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' },
        0
      );

      // Counter object for ticking 000 → 150
      const countObj = { val: 0 };
      if (counterRef.current) {
        tl.to(
          countObj,
          {
            val: 150,
            duration: 1.4,
            ease: 'power2.out',
            snap: { val: 1 },
            onUpdate: () => {
              if (counterRef.current) {
                counterRef.current.textContent = String(
                  Math.round(countObj.val)
                ).padStart(3, '0');
              }
            },
          },
          0.3
        );
      }

      // SIMULTANEOUS (0.3 – 1.7s): Rack focus hero background image
      // Target .layer-base and .layer-reveal mounted in LensStage
      tl.fromTo(
        '.layer-base',
        { filter: 'blur(48px) brightness(0.3) saturate(0.4)', scale: 1.14 },
        {
          filter: 'brightness(0.34) saturate(0.35) contrast(1.05) blur(3px)',
          scale: 1.04,
          duration: 1.4,
          ease: EASE.rack,
        },
        0.3
      );

      tl.fromTo(
        '.layer-reveal',
        { filter: 'blur(48px) brightness(0.3) saturate(0.4)', scale: 1.14 },
        {
          filter: 'brightness(1.06) saturate(1.12) contrast(1.08)',
          scale: 1.04,
          duration: 1.4,
          ease: EASE.rack,
        },
        0.3
      );

      // 1.7 – 1.9s: counter holds; label swaps to species name, italic serif via Binomial
      tl.to(
        defaultLabelRef.current,
        {
          opacity: 0,
          y: -4,
          duration: 0.1,
        },
        1.7
      );

      tl.fromTo(
        speciesLabelRef.current,
        { opacity: 0, y: 4 },
        { opacity: 1, y: 0, duration: 0.1 },
        1.8
      );

      // 1.9 – 2.2s: graticule + counter fade out, scale 1 → 1.4
      tl.to(
        [graticuleRef.current, contentRef.current],
        { opacity: 0, scale: 1.4, duration: 0.3, ease: 'power2.in' },
        1.9
      );

      tl.to(
        containerRef.current,
        { opacity: 0, duration: 0.3, ease: 'power2.in' },
        1.9
      );

      // Hero type stagger-enters from y:40, opacity:0
      tl.fromTo(
        '.hero-type > *',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: EASE.out },
        1.9
      );
    }, sharedParent);

    return () => ctx.revert();
  }, [shouldRender, isDone]);

  if (!shouldRender || isDone) {
    return null;
  }

  // Generate 40 ticks around the r=140 circumference
  const tickCount = 40;
  const radius = 140;
  const ticks = Array.from({ length: tickCount }).map((_, i) => {
    const angle = (i * 360) / tickCount;
    const rad = (angle * Math.PI) / 180;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    const x1 = Math.round((200 + cos * radius) * 100) / 100;
    const y1 = Math.round((200 + sin * radius) * 100) / 100;
    const x2 = Math.round((200 + cos * (radius + 8)) * 100) / 100;
    const y2 = Math.round((200 + sin * (radius + 8)) * 100) / 100;
    return { x1, y1, x2, y2, key: i };
  });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-void pointer-events-none overflow-hidden"
    >
      {/* Centered SVG graticule — microscope reticle */}
      <svg
        ref={graticuleRef}
        viewBox="0 0 400 400"
        className="absolute w-[360px] h-[360px] md:w-[480px] md:h-[480px] pointer-events-none"
        aria-hidden="true"
      >
        {/* Full-bleed crosshair lines */}
        <line
          x1="0"
          y1="200"
          x2="400"
          y2="200"
          stroke="rgba(242, 237, 227, 0.18)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
        <line
          x1="200"
          y1="0"
          x2="200"
          y2="400"
          stroke="rgba(242, 237, 227, 0.18)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />

        {/* Reticle circle r=140 */}
        <circle
          cx="200"
          cy="200"
          r={radius}
          fill="none"
          stroke="rgba(242, 237, 227, 0.30)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />

        {/* 40 tick marks around circumference */}
        {ticks.map((t) => (
          <line
            key={t.key}
            x1={t.x1}
            y1={t.y1}
            x2={t.x2}
            y2={t.y2}
            stroke="rgba(242, 237, 227, 0.30)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>

      {/* Center content: counter & label */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center justify-center text-center"
      >
        {/* Counter ticking 000 → 150 */}
        <div className="font-mono text-[13px] tracking-[0.3em] text-bone font-semibold">
          <span ref={counterRef}>000</span>
        </div>

        {/* Subline / Species label */}
        <div
          ref={labelRef}
          className="mt-3 font-mono text-[11px] tracking-[0.18em] text-bone-faint h-6 flex items-center justify-center relative"
        >
          <span ref={defaultLabelRef} className="uppercase">
            RESOLVING SPECIMEN
          </span>
          <span
            ref={speciesLabelRef}
            className="absolute inset-0 flex items-center justify-center opacity-0 pointer-events-none"
          >
            <Binomial
              genus="Hypseloecus"
              species="sandalum"
              className="text-[15px] text-bone font-normal"
            />
          </span>
        </div>
      </div>
    </div>
  );
}
