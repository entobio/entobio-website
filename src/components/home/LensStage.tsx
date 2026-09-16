/**
 * src/components/home/LensStage.tsx
 * The core lens interaction — HOMEPAGE-BUILD-SPEC §3.2–3.3, REMEDIATION § 4d, 4e
 *
 * Two <img> of the SAME source, stacked.
 * Base: dark/soft grade. Reveal: bright/sharp, clip-pathed by lens.
 * SVG graticule inside lens + rotating dashed amber arc on rim + precision readout.
 * LQIP placeholder + AVIF responsive sizes for fast mobile LCP.
 *
 * 'use client' — reads CSS custom properties from usePointerLens
 */

'use client';

import { getSlot } from '@/lib/media';

/**
 * Hero image — resolved from the HERO-01 slot in src/content/media.ts.
 * No path lives here.
 *
 * ARCHITECTURE.md §4 / CLAUDE.md §8: "One file, two <img> tags." Both layers
 * declare the identical <source> set, so the browser negotiates one
 * format once and serves the second layer from cache — one network request,
 * two elements, different CSS filters. Never export two files.
 */
const HERO = getSlot('HERO-01');
const HERO_IMAGE = HERO?.src ?? null;
const HERO_SOURCES = HERO?.sources ?? [];

export function LensStage() {
  return (
    <div className="lens-stage absolute inset-0 z-0">
      {/* ---- LQIP placeholder — immediate 0ms blur paint for LCP ---- */}
      {HERO?.lqip && (
        <div
          aria-hidden="true"
          className="absolute inset-0 w-full h-full bg-cover bg-center pointer-events-none filter blur-2xl scale-105"
          style={{
            backgroundImage: `url("${HERO.lqip}")`,
            opacity: 0.6,
          }}
        />
      )}

      {/* ---- Base layer: dark, soft, atmospheric ---- */}
      {/* ---- Reveal layer: bright, sharp, clip-pathed ---- */}
      {/* Both read the SAME source: one network request, two <img>. */}
      {HERO_IMAGE && (
        <>
          <picture>
            {HERO_SOURCES.map((s) => (
              <source
                key={s.type}
                srcSet={s.srcSet || s.src}
                sizes={s.sizes || '100vw'}
                type={s.type}
              />
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
              <source
                key={s.type}
                srcSet={s.srcSet || s.src}
                sizes={s.sizes || '100vw'}
                type={s.type}
              />
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

      {/* ---- SVG Optical Graticule & Lens Ring (mutated directly by usePointerLens ticker) ---- */}
      <svg
        id="lens-ring"
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
        {/* Inner ring — bone, precision hairline */}
        <circle
          id="lens-inner-circle"
          cx={0}
          cy={0}
          r={200}
          fill="none"
          stroke="rgba(242,237,227,0.34)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />

        {/* Outer dashed amber arc — rotating 20s linear infinite */}
        <g id="lens-outer-g" className="lens-ring-orbit">
          <circle
            id="lens-outer-circle"
            cx={0}
            cy={0}
            r={212}
            fill="none"
            stroke="#D89A3E"
            strokeWidth="1"
            strokeDasharray="2 10"
            vectorEffect="non-scaling-stroke"
          />
        </g>

        {/* Calibrated Graticule: Fine horizontal and vertical crosshairs */}
        <line
          id="lens-crosshair-h"
          stroke="rgba(242,237,227,0.22)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
        <line
          id="lens-crosshair-v"
          stroke="rgba(242,237,227,0.22)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />

        {/* Central open target reticle ring */}
        <circle
          id="lens-center-ring"
          cx={0}
          cy={0}
          r={5}
          fill="none"
          stroke="rgba(242,237,227,0.4)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />

        {/* Calibrated axis ticks (translated to lens center by ticker) */}
        <g
          id="lens-graticule-ticks"
          stroke="rgba(242,237,227,0.28)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        >
          {/* Horizontal axis ticks */}
          <line x1="-80" y1="-4" x2="-80" y2="4" />
          <line x1="-60" y1="-2" x2="-60" y2="2" />
          <line x1="-40" y1="-4" x2="-40" y2="4" />
          <line x1="-20" y1="-2" x2="-2" y2="2" />
          <line x1="20" y1="-2" x2="20" y2="2" />
          <line x1="40" y1="-4" x2="40" y2="4" />
          <line x1="60" y1="-2" x2="60" y2="2" />
          <line x1="80" y1="-4" x2="80" y2="4" />

          {/* Vertical axis ticks */}
          <line x1="-4" y1="-80" x2="4" y2="-80" />
          <line x1="-2" y1="-60" x2="2" y2="-60" />
          <line x1="-4" y1="-40" x2="4" y2="-40" />
          <line x1="-2" y1="-20" x2="2" y2="-20" />
          <line x1="-2" y1="20" x2="2" y2="20" />
          <line x1="-4" y1="40" x2="4" y2="40" />
          <line x1="-2" y1="60" x2="2" y2="60" />
          <line x1="-4" y1="80" x2="4" y2="80" />
        </g>

        {/* Outer boundary crosshair ticks — N/E/S/W */}
        <line id="lens-tick-n" stroke="rgba(242,237,227,0.34)" strokeWidth="1" />
        <line id="lens-tick-s" stroke="rgba(242,237,227,0.34)" strokeWidth="1" />
        <line id="lens-tick-e" stroke="rgba(242,237,227,0.34)" strokeWidth="1" />
        <line id="lens-tick-w" stroke="rgba(242,237,227,0.34)" strokeWidth="1" />
      </svg>

      {/* ---- Mono readout — positioned clear of hero headline/subline ---- */}
      <div
        id="lens-readout"
        className="lens-readout"
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 6,
        }}
      >
        <div
          className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone-dim leading-relaxed whitespace-nowrap drop-shadow-[0_2px_8px_rgba(8,9,10,0.9)]"
        >
          <span>×400</span>
          <span className="mx-2 opacity-40">·</span>
          <span>OBJ 40/0.65</span>
        </div>
        <div
          id="lens-coords"
          className="font-mono text-[10px] uppercase tracking-[0.14em] text-bone-faint whitespace-nowrap mt-0.5 drop-shadow-[0_2px_8px_rgba(8,9,10,0.9)]"
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
