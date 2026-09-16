/**
 * /about — Founder page
 * ARCHITECTURE.md §1, CONTENT.md §12–13
 */

import type { Metadata } from 'next';
import { SITE } from '@/lib/site';
import { COPY } from '@/content/copy';
import { INSTITUTIONS, HONOURS } from '@/content/credentials';
import { Footer } from '@/components/layout/Footer';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: `About ${SITE.founder}`,
  description: `${SITE.founder} — Founder and Principal Consultant, ${SITE.name}. Fellow of the Royal Entomological Society, London.`,
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-void text-bone pt-28 md:pt-36">
      <div className="max-w-[1560px] mx-auto px-gutter pb-20">
        {/* Header */}
        <div className="mb-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone-dim mb-4">
            FOUNDER & PRINCIPAL CONSULTANT
          </p>
          <h1
            className="font-display text-bone"
            style={{
              fontSize: 'var(--t-display)',
              lineHeight: 0.88,
              letterSpacing: '-0.03em',
            }}
          >
            {COPY.founder.name}
          </h1>
          <p className="font-mono text-[13px] text-amber uppercase tracking-[0.18em] mt-3">
            {COPY.founder.title} — {COPY.founder.role}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Bio Column */}
          <div className="lg:col-span-7 space-y-6 font-body text-[16px] text-bone-dim leading-relaxed">
            {COPY.founder.bio.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Key Facts / Monograph Accent Card */}
          <div className="lg:col-span-5 border border-rule bg-carbon/60 p-8 rounded-[2px] space-y-8">
            <div>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone-faint mb-4">
                AFFILIATIONS & PAST ROLES
              </h3>
              <ul className="space-y-2 font-mono text-[12px] text-bone">
                {INSTITUTIONS.map((inst) => (
                  <li key={inst}>• {inst}</li>
                ))}
              </ul>
            </div>

            <div className="border-t border-rule pt-6">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone-faint mb-4">
                DISTINCTIONS
              </h3>
              <ul className="space-y-2 font-mono text-[12px] text-bone">
                {HONOURS.map((honour) => (
                  <li key={honour}>• {honour}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Vision Quote Block */}
        <div className="border-t border-b border-rule py-16 mb-20">
          <blockquote className="font-display text-bone text-center max-w-[900px] mx-auto text-[2.2rem] md:text-[3.2rem] leading-[1.05] tracking-[-0.02em]">
            &ldquo;{COPY.quote.text}&rdquo;
          </blockquote>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber text-center mt-6">
            — {COPY.quote.attribution}
          </p>
        </div>
      </div>

      <Footer />
    </main>
  );
}
