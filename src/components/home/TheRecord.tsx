/**
 * src/components/home/TheRecord.tsx
 * ACT 7 — THE RECORD — HOMEPAGE-BUILD-SPEC §9
 *
 * Three typographic columns (Research Focus & Taxa, Scientific Journals, Consulting Capabilities). Type only, no logos.
 * Strict heading hierarchy: h2 for section context, h3 for columns.
 */

import { JOURNALS } from '@/content/credentials';

export function TheRecord() {
  return (
    <section id="record" className="w-full bg-void py-[120px] md:py-[160px]">
      <div className="max-w-[1560px] mx-auto px-gutter">
        {/* Eyebrow & Accessible Heading */}
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone-dim mb-[40px] font-semibold">
          07 — THE RECORD
        </p>
        <h2 className="sr-only">
          The Record — Research Focus, Scientific Journals, and Consulting Capabilities
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {/* Column 1: Research Focus & Taxa */}
          <div className="flex flex-col">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber pb-4 border-b border-rule mb-6 font-semibold">
              RESEARCH FOCUS &amp; TAXA
            </h3>
            <ul className="space-y-3 font-body text-[15px] text-[#E0DBD0]">
              <li className="leading-snug"><strong className="text-white font-medium">Miridae</strong> (Plant Bugs of South Asia)</li>
              <li className="leading-snug"><strong className="text-white font-medium">Cicadellidae</strong> (Leafhoppers &amp; Treehoppers)</li>
              <li className="leading-snug">Hemiptera of the Western Ghats &amp; Islands</li>
              <li className="leading-snug">Agricultural Biodiversity &amp; Beneficials</li>
              <li className="leading-snug">High-Resolution Scientific Stacking</li>
            </ul>
          </div>

          {/* Column 2: Journals */}
          <div className="flex flex-col md:border-l md:border-rule md:pl-10">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber pb-4 border-b border-rule mb-6 font-semibold">
              SCIENTIFIC JOURNALS
            </h3>
            <ul className="space-y-3 font-body text-[15px] text-[#E0DBD0]">
              {JOURNALS.map((journal) => (
                <li key={journal} className="leading-snug italic font-display text-[17px] text-[#F7F5F0]">
                  {journal}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Consultancy & Practice */}
          <div className="flex flex-col md:border-l md:border-rule md:pl-10">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber pb-4 border-b border-rule mb-6 font-semibold">
              CONSULTING CAPABILITIES
            </h3>
            <ul className="space-y-3 font-body text-[15px] text-[#E0DBD0]">
              <li className="leading-snug">Taxonomic Identification &amp; Description</li>
              <li className="leading-snug">Publication-Grade Specimen Focus Stacking</li>
              <li className="leading-snug">Institutional Collection Digitisation</li>
              <li className="leading-snug">Biodiversity &amp; Pollinator Field Surveys</li>
              <li className="leading-snug">Educational Outreach &amp; Science Workshops</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
