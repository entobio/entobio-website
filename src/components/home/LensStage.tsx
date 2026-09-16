/**
 * src/components/home/LensStage.tsx
 * The core lens interaction — HOMEPAGE-BUILD-SPEC §3.2–3.3
 *
 * Two <img> of the SAME source, stacked.
 * Base: dark/soft grade. Reveal: bright/sharp, clip-pathed by lens.
 * SVG ring tracks the lerped point with crosshairs and readout.
 *
 * 'use client' — reads CSS custom properties from usePointerLens
 */

'use client';

import { useEffect, useRef } from 'react';
import { getSlot } from '@/lib/media';

/**
 * Hero image — resolved from the HERO-01 slot in src/content/media.ts.
 * No path lives here.
 *
 * ARCHITECTURE.md §4 / CLAUDE.md §8: "One file, two <img> tags." Both layers
 * below declare the identical <source> set, so the browser negotiates one
 * format once and serves the second layer from cache — one network request,
 * two elements, different CSS filters. Never export two files.
 */
const HERO = getSlot('HERO-01');
const HERO_IMAGE = HERO?.src ?? null;
const HERO_SOURCES = HERO?.sources ?? [];

/** Ring geometry */
const TICK_LENGTH = 14;
const TICK_INSET = 8;

export function LensStage() {
  const ringRef = useRef<SVGSVGElement>(null);
  const readoutRef = useRef<HTMLDivElement>(null);

  // SVG element refs for direct mutation (no React state = no re-renders)
  const innerCircleRef = useRef<SVGCircleElement>(null);
  const outerGRef = useRef<SVGGElement>(null);
  const outerCircleRef = useRef<SVGCircleElement>(null);
  const tickNRef = useRef<SVGLineElement>(null);
  const tickSRef = useRef<SVGLineElement>(null);
  const tickERef = useRef<SVGLineElement>(null);
  const tickWRef = useRef<SVGLineElement>(null);
  const coordsRef = useRef<HTMLDivElement>(null);
  const opticsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf: number;
    const root = document.documentElement;

    function update() {
      // Read raw values set by usePointerLens
      const xStr = root.style.getPropertyValue('--lens-x');
      const yStr = root.style.getPropertyValue('--lens-y');
      const rStr = root.style.getPropertyValue('--lens-r-px');

      const x = parseFloat(xStr) || 0;
      const y = parseFloat(yStr) || 0;
      const r = parseFloat(rStr) || 200;

      // --- Update SVG ring via direct DOM mutation (no setState) ---
      const ic = innerCircleRef.current;
      if (ic) {
        ic.setAttribute('cx', String(x));
        ic.setAttribute('cy', String(y));
        ic.setAttribute('r', String(r));
      }

      const og = outerGRef.current;
      if (og) {
        og.style.transformOrigin = `${x}px ${y}px`;
      }

      const oc = outerCircleRef.current;
      if (oc) {
        oc.setAttribute('cx', String(x));
        oc.setAttribute('cy', String(y));
        oc.setAttribute('r', String(r + 12));
      }

      // Crosshair ticks
      const tN = tickNRef.current;
      if (tN) {
        tN.setAttribute('x1', String(x));
        tN.setAttribute('y1', String(y - r + TICK_INSET));
        tN.setAttribute('x2', String(x));
        tN.setAttribute('y2', String(y - r + TICK_INSET + TICK_LENGTH));
      }
      const tS = tickSRef.current;
      if (tS) {
        tS.setAttribute('x1', String(x));
        tS.setAttribute('y1', String(y + r - TICK_INSET - TICK_LENGTH));
        tS.setAttribute('x2', String(x));
        tS.setAttribute('y2', String(y + r - TICK_INSET));
      }
      const tE = tickERef.current;
      if (tE) {
        tE.setAttribute('x1', String(x + r - TICK_INSET - TICK_LENGTH));
        tE.setAttribute('y1', String(y));
        tE.setAttribute('x2', String(x + r - TICK_INSET));
        tE.setAttribute('y2', String(y));
      }
      const tW = tickWRef.current;
      if (tW) {
        tW.setAttribute('x1', String(x - r + TICK_INSET));
        tW.setAttribute('y1', String(y));
        tW.setAttribute('x2', String(x - r + TICK_INSET + TICK_LENGTH));
        tW.setAttribute('y2', String(y));
      }

      // Readout position — offset to bottom-right of ring
      const rd = readoutRef.current;
      if (rd) {
        rd.style.transform = `translate(${x + r * 0.7 + 14}px, ${y + r * 0.7}px)`;
      }

      // Coordinate text
      const cd = coordsRef.current;
      if (cd) {
        cd.textContent = `X ${x.toFixed(1)}   Y ${y.toFixed(1)}`;
      }

      raf = requestAnimationFrame(update);
    }

    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="lens-stage absolute inset-0 z-0">
      {/* ---- Base layer: dark, soft, atmospheric ---- */}
      {/* ---- Reveal layer: bright, sharp, clip-pathed ---- */}
      {/* Both read the SAME source: one network request, two <img>. */}
      {HERO_IMAGE && (
        <>
          <picture>
            {HERO_SOURCES.map((s) => (
              <source key={s.type} srcSet={s.src} type={s.type} />
            ))}
            <img
              src={HERO_IMAGE}
              alt=""
              aria-hidden="true"
              fetchPriority="high"
              decoding="async"
              className="layer-base"
            />
          </picture>

          <picture>
            {HERO_SOURCES.map((s) => (
              <source key={s.type} srcSet={s.src} type={s.type} />
            ))}
            <img
              src={HERO_IMAGE}
              alt=""
              aria-hidden="true"
              decoding="async"
              className="layer-reveal"
            />
          </picture>
        </>
      )}

      {/* ---- SVG Lens Ring ---- */}
      <svg
        ref={ringRef}
        className="lens-ring"
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 5,
          overflow: 'visible',
        }}
      >
        {/* Inner ring — bone, subtle */}
        <circle
          ref={innerCircleRef}
          cx={0} cy={0} r={200}
          fill="none"
          stroke="rgba(242,237,227,0.34)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />

        {/* Outer dashed amber arc — rotating 20s linear infinite */}
        <g ref={outerGRef} className="lens-ring-orbit">
          <circle
            ref={outerCircleRef}
            cx={0} cy={0} r={212}
            fill="none"
            stroke="#D89A3E"
            strokeWidth="1"
            strokeDasharray="2 10"
            vectorEffect="non-scaling-stroke"
          />
        </g>

        {/* Crosshair ticks — N/E/S/W */}
        <line ref={tickNRef} stroke="rgba(242,237,227,0.34)" strokeWidth="1" />
        <line ref={tickSRef} stroke="rgba(242,237,227,0.34)" strokeWidth="1" />
        <line ref={tickERef} stroke="rgba(242,237,227,0.34)" strokeWidth="1" />
        <line ref={tickWRef} stroke="rgba(242,237,227,0.34)" strokeWidth="1" />
      </svg>

      {/* ---- Mono readout — pinned bottom-right of ring ---- */}
      <div
        ref={readoutRef}
        className="lens-readout"
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 6,
          willChange: 'transform',
        }}
      >
        <div
          ref={opticsRef}
          className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone-dim leading-relaxed whitespace-nowrap"
        >
          <span>×40</span>
          <span className="mx-2 opacity-40">·</span>
          <span>OBJ 4/0.10</span>
        </div>
        <div
          ref={coordsRef}
          className="font-mono text-[10px] uppercase tracking-[0.14em] text-bone-faint whitespace-nowrap mt-0.5"
        >
          X 0.0&nbsp;&nbsp;&nbsp;Y 0.0
        </div>
      </div>

      {/* ---- Vignette overlay ---- */}
      <div
        className="vignette"
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, rgba(8,9,10,0.6) 100%)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />
    </div>
  );
}
