/**
 * src/components/home/Hero.tsx
 * ACT 1 — THE LENS — HOMEPAGE-BUILD-SPEC §3
 *
 * "This is the section that wins the award."
 *
 * Composes LensStage + hero type + StatRail.
 * usePointerLens owns the single rAF loop.
 *
 * 'use client' — needs usePointerLens hook
 */

'use client';

import { useRef } from 'react';
import { usePointerLens } from '@/hooks/usePointerLens';
import { LensStage } from './LensStage';
import { StatRail } from './StatRail';
import { COPY } from '@/content/copy';

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  // Single rAF loop — drives --lens-x, --lens-y, --lens-r, --drift-x, --drift-y
  usePointerLens(heroRef);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative overflow-hidden"
      style={{
        height: '100svh',
        background: 'var(--void)',
      }}
    >
      {/* ---- Lens stage (z-0) ---- */}
      <LensStage />

      {/* ---- Hero type (z-10, centred on desktop, upper-anchored on mobile, pointer-events: none) ---- */}
      <div
        className="hero-type absolute inset-0 z-10 flex flex-col items-center justify-start pt-20 sm:pt-24 md:pt-28 lg:justify-center lg:pt-0 pointer-events-none px-6"
        style={{
          textShadow: '0 2px 30px rgba(8,9,10,0.92), 0 1px 4px rgba(8,9,10,0.85)',
        }}
      >
        {/* Eyebrow — mono, --bone-dim */}
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone-dim mb-5 md:mb-7">
          {COPY.hero.eyebrow}
        </p>

        {/* Headline — Instrument Serif, massive, solid --bone */}
        <h1
          className="font-display text-center text-bone"
          style={{
            fontSize: 'var(--t-hero)',
            lineHeight: 0.84,
            letterSpacing: '-0.035em',
          }}
        >
          {COPY.hero.headline.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h1>

        {/* Subline — Inter Tight, --bone-dim */}
        <p
          className="font-body text-bone-dim text-center mt-6 md:mt-8"
          style={{
            fontSize: '15px',
            lineHeight: 1.5,
            maxWidth: '440px',
          }}
        >
          {COPY.hero.subline}
        </p>
      </div>

      {/* ---- Stat rail (z-10, bottom) ---- */}
      <StatRail />
    </section>
  );
}
