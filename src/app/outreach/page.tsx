/**
 * /outreach — Science Outreach page
 * ARCHITECTURE.md §1, CONTENT.md §9
 */

import type { Metadata } from 'next';
import { COPY } from '@/content/copy';
import { Button } from '@/components/ui/Button';
import { Footer } from '@/components/layout/Footer';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Science Outreach & School Programmes',
  description: 'Free insect biodiversity programmes for government schools in rural Karnataka. Exhibitions, field visits, and citizen science.',
};

/** Leafhopper Monograph Vector Illustration */
function LeafhopperIllustration() {
  return (
    <svg
      viewBox="0 0 320 320"
      className="w-[260px] h-[260px] md:w-[360px] md:h-[360px] text-bone overflow-visible"
      aria-hidden="true"
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 145 60 C 130 30, 110 20, 90 15" strokeDasharray="3 3" />
        <path d="M 175 60 C 190 30, 210 20, 230 15" strokeDasharray="3 3" />
        <path d="M 130 75 C 130 55, 190 55, 190 75 L 205 105 L 115 105 Z" fill="rgba(216, 154, 62, 0.08)" />
        <circle cx="125" cy="70" r="10" fill="currentColor" />
        <circle cx="195" cy="70" r="10" fill="currentColor" />
        <polygon points="160,105 130,140 190,140" fill="rgba(216, 154, 62, 0.18)" />
        <path d="M 130 140 L 95 240 C 90 270, 150 290, 160 295 C 170 290, 230 270, 225 240 L 190 140 Z" fill="rgba(242, 237, 227, 0.05)" />
        <path d="M 160 140 L 160 295" strokeWidth="1" strokeDasharray="4 4" />
        <path d="M 145 180 C 120 200, 110 230, 120 265" strokeWidth="1" />
        <path d="M 175 180 C 200 200, 210 230, 200 265" strokeWidth="1" />
        <path d="M 120 110 L 80 130 L 65 170" strokeWidth="1.75" />
        <path d="M 200 110 L 240 130 L 255 170" strokeWidth="1.75" />
        <path d="M 140 150 L 85 200 L 70 270" strokeWidth="2" />
        <path d="M 180 150 L 235 200 L 250 270" strokeWidth="2" />
      </g>
    </svg>
  );
}

export default function OutreachPage() {
  return (
    <main className="min-h-screen bg-void text-bone pt-28 md:pt-36">
      <div className="max-w-[1560px] mx-auto px-gutter pb-20">
        {/* Header */}
        <div className="mb-16 border-b border-rule pb-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber mb-4">
              COMMUNITY & SCHOOL PROGRAMMES
            </p>
            <h1
              className="font-display text-bone mb-6"
              style={{
                fontSize: 'var(--t-display)',
                lineHeight: 0.88,
                letterSpacing: '-0.03em',
              }}
            >
              {COPY.outreach.headline}
            </h1>
            <p className="font-body text-bone-dim text-[16px] leading-relaxed max-w-[540px] mb-8">
              {COPY.outreach.body}
            </p>
            <Button variant="primary" href="/contact">
              {COPY.outreach.cta}
            </Button>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <LeafhopperIllustration />
          </div>
        </div>

        {/* Four Programme Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="border border-rule p-8 rounded-[2px] bg-carbon/40">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber block mb-2">01</span>
            <h3 className="font-display text-[1.8rem] text-bone mb-3">Insect Exhibitions</h3>
            <p className="font-body text-bone-dim text-[14px] leading-relaxed">
              Live and preserved specimen displays, scientific art, and entomophilately exhibits designed to spark curiosity among rural students.
            </p>
          </div>

          <div className="border border-rule p-8 rounded-[2px] bg-carbon/40">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber block mb-2">02</span>
            <h3 className="font-display text-[1.8rem] text-bone mb-3">Teacher Training</h3>
            <p className="font-body text-bone-dim text-[14px] leading-relaxed">
              Educational resources and biological field training for science educators in rural government schools across Karnataka.
            </p>
          </div>

          <div className="border border-rule p-8 rounded-[2px] bg-carbon/40">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber block mb-2">03</span>
            <h3 className="font-display text-[1.8rem] text-bone mb-3">Field Visits & Nature Walks</h3>
            <p className="font-body text-bone-dim text-[14px] leading-relaxed">
              Guided biodiversity walks and hands-on insect observation in local agricultural and forest ecosystems.
            </p>
          </div>

          <div className="border border-rule p-8 rounded-[2px] bg-carbon/40">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber block mb-2">04</span>
            <h3 className="font-display text-[1.8rem] text-bone mb-3">Citizen Science</h3>
            <p className="font-body text-bone-dim text-[14px] leading-relaxed">
              Engaging students in real biodiversity mapping and species documentation to foster long-term conservation awareness.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
