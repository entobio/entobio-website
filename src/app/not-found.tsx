/**
 * src/app/not-found.tsx
 * 404 Page — ARCHITECTURE.md §1
 * Uses the confused mascot pose in monograph line art style.
 */

import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page not found',
};

/** Confused Leafhopper Mascot Vector Illustration */
function ConfusedMascot() {
  return (
    <svg
      viewBox="0 0 320 320"
      className="w-[220px] h-[220px] md:w-[280px] md:h-[280px] text-bone overflow-visible"
      aria-hidden="true"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ transformOrigin: '160px 160px', transform: 'rotate(-12deg)' }}
      >
        {/* Tilted Antennae */}
        <path d="M 145 60 C 120 20, 90 20, 70 30" strokeDasharray="3 3" />
        <path d="M 175 60 C 205 40, 230 40, 250 50" strokeDasharray="3 3" />

        {/* Head & Pronotum tilted */}
        <path d="M 130 75 C 130 55, 190 55, 190 75 L 205 105 L 115 105 Z" fill="rgba(216, 154, 62, 0.12)" />

        {/* Confused Eyes (One wide, one narrow) */}
        <circle cx="125" cy="70" r="12" fill="currentColor" />
        <circle cx="195" cy="70" r="7" fill="currentColor" />

        {/* Scutellum */}
        <polygon points="160,105 130,140 190,140" fill="rgba(216, 154, 62, 0.2)" />

        {/* Wings */}
        <path d="M 130 140 L 95 240 C 90 270, 150 290, 160 295 C 170 290, 230 270, 225 240 L 190 140 Z" fill="rgba(242, 237, 227, 0.05)" />
        <path d="M 160 140 L 160 295" strokeWidth="1" strokeDasharray="4 4" />

        {/* Legs scratching head gesture */}
        <path d="M 120 110 L 85 90 L 105 65" strokeWidth="1.75" />
        <path d="M 200 110 L 240 130 L 255 170" strokeWidth="1.75" />
        <path d="M 140 150 L 85 200 L 70 270" strokeWidth="2" />
        <path d="M 180 150 L 235 200 L 250 270" strokeWidth="2" />
      </g>

      {/* Floating Question Mark */}
      <text
        x="240"
        y="80"
        fill="#D89A3E"
        fontSize="54"
        fontFamily="Instrument Serif, serif"
        fontStyle="italic"
      >
        ?
      </text>
    </svg>
  );
}

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-gutter text-center bg-void text-bone py-24">
      {/* Confused Mascot Illustration */}
      <div className="mb-6">
        <ConfusedMascot />
      </div>

      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber mb-3 font-semibold">
        ERROR 404
      </p>

      <h1
        className="font-display text-bone mb-6"
        style={{
          fontSize: 'var(--t-display)',
          lineHeight: 0.88,
          letterSpacing: '-0.03em',
        }}
      >
        Specimen not found.
      </h1>

      <p className="font-body text-bone-dim text-[15px] max-w-[420px] mb-8 leading-relaxed">
        The page or taxon entry you are looking for does not exist in our collection records.
      </p>

      <Link
        href="/"
        className="inline-flex items-center justify-center border border-rule text-bone rounded-[2px] px-[24px] py-[12px] font-mono text-[11px] uppercase tracking-[0.18em] hover:bg-amber hover:text-void hover:border-amber transition-all duration-200"
      >
        Return to Collection
      </Link>
    </main>
  );
}
