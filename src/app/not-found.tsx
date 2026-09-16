/**
 * src/app/not-found.tsx
 * 404 Page — Understated academic typographic treatment.
 */

import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Specimen Not Found (404) · EntoBio Consult',
};

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-gutter text-center bg-void text-bone py-24">
      <div className="max-w-[540px] flex flex-col items-center border border-rule p-12 md:p-16 rounded-[2px] bg-carbon/30">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-amber mb-4 font-semibold">
          ACCESSION RECORD NOT FOUND · 404
        </p>

        <h1
          className="font-display text-bone mb-6"
          style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            lineHeight: 0.95,
            letterSpacing: '-0.03em',
          }}
        >
          Specimen unrecorded.
        </h1>

        <p className="font-body text-bone-dim text-[15px] leading-relaxed mb-10 max-w-[420px]">
          The requested accession, publication record, or page does not exist in our institutional database.
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center border border-rule text-bone rounded-[2px] px-[28px] py-[13px] font-mono text-[11px] uppercase tracking-[0.18em] hover:bg-amber hover:text-void hover:border-amber transition-all duration-200"
        >
          Return to Collection
        </Link>
      </div>
    </main>
  );
}
