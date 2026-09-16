/**
 * src/components/home/TheRecord.tsx
 * ACT 7 — THE RECORD — HOMEPAGE-BUILD-SPEC §9
 *
 * Back to --void. Quiet, factual, fast.
 * Three typographic columns from CONTENT.md §10 (INSTITUTIONS, JOURNALS, HONOURS). Type only, no logos.
 * Strict heading hierarchy: h2 for section context, h3 for columns.
 */

import { INSTITUTIONS, JOURNALS, HONOURS } from '@/content/credentials';

export function TheRecord() {
  return (
    <section id="record" className="w-full bg-void py-[120px] md:py-[160px]">
      <div className="max-w-[1560px] mx-auto px-gutter">
        {/* Eyebrow & Accessible Heading */}
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone-dim mb-[40px] font-semibold">
          07 — THE RECORD
        </p>
        <h2 className="sr-only">
          The Record — Institutional Affiliations, Scientific Journals, and Honours
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {/* Column 1: Institutions */}
          <div className="flex flex-col">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone-dim pb-4 border-b border-rule mb-6">
              INSTITUTIONS
            </h3>
            <ul className="space-y-3 font-body text-[15px] text-bone/90">
              {INSTITUTIONS.map((inst) => (
                <li key={inst} className="leading-snug">
                  {inst}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Journals */}
          <div className="flex flex-col md:border-l md:border-rule md:pl-10">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone-dim pb-4 border-b border-rule mb-6">
              JOURNALS
            </h3>
            <ul className="space-y-3 font-body text-[15px] text-bone/90">
              {JOURNALS.map((journal) => (
                <li key={journal} className="leading-snug italic font-display text-[17px]">
                  {journal}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Honours */}
          <div className="flex flex-col md:border-l md:border-rule md:pl-10">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone-dim pb-4 border-b border-rule mb-6">
              HONOURS
            </h3>
            <ul className="space-y-3 font-body text-[15px] text-bone/90">
              {HONOURS.map((honour) => (
                <li key={honour} className="leading-snug">
                  {honour}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
