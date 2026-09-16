/**
 * /outreach — Science Outreach page
 * ARCHITECTURE.md §1, CONTENT.md §9
 */

import type { Metadata } from 'next';
import { COPY } from '@/content/copy';
import { Button } from '@/components/ui/Button';
import { Footer } from '@/components/layout/Footer';
import { breadcrumbSchema } from '@/lib/schema';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Science Outreach & School Programmes',
  description: 'Free insect biodiversity programmes for government schools in rural Karnataka. Exhibitions, field visits, and citizen science.',
};

export default function OutreachPage() {
  return (
    <main className="min-h-screen bg-void text-bone pt-28 md:pt-36">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'Outreach', path: '/outreach' },
            ])
          ),
        }}
      />
      <div className="max-w-[1560px] mx-auto px-gutter pb-20">
        {/* Header */}
        <div className="mb-16 border-b border-rule pb-12 max-w-[840px]">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber mb-4 font-semibold">
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
          <p className="font-body text-bone-dim text-[16px] leading-relaxed max-w-[620px] mb-8">
            {COPY.outreach.body}
          </p>
          <Button variant="primary" href="/contact">
            {COPY.outreach.cta}
          </Button>
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
