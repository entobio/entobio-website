/**
 * /about — Founder page
 * Revised per client review: distinctions and honours removed.
 */

import type { Metadata } from 'next';
import Image from 'next/image';
import { SITE } from '@/lib/site';
import { COPY } from '@/content/copy';
import { Footer } from '@/components/layout/Footer';
import { breadcrumbSchema } from '@/lib/schema';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'About Founder · EntoBio Consult',
  description: `${SITE.founder} — Founder and Principal Consultant, ${SITE.name}. Entomologist, independent researcher, taxonomy, biodiversity and scientific imaging.`,
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-void text-bone pt-28 md:pt-36">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'About', path: '/about' },
            ])
          ),
        }}
      />
      <div className="max-w-[1560px] mx-auto px-gutter pb-20">
        {/* Header */}
        <div className="mb-16 border-b border-rule pb-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber mb-4 font-semibold">
            BIOGRAPHY &amp; EXPERTISE
          </p>
          <h1
            className="font-display text-bone mb-4"
            style={{
              fontSize: 'var(--t-display)',
              lineHeight: 0.88,
              letterSpacing: '-0.03em',
            }}
          >
            {COPY.founder.name}
          </h1>
          <p className="font-mono text-[13px] uppercase tracking-[0.14em] text-bone-dim">
            {COPY.founder.title} — {COPY.founder.role}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Bio Column — verbatim 3 paragraphs from Dr. Yeshwanth */}
          <div className="lg:col-span-7 space-y-7 font-body text-[17px] text-[#E0DBD0] leading-[1.75]">
            {COPY.founder.bio.map((paragraph, index) => (
              <p key={index} className="border-l-2 border-amber/30 pl-5 lg:pl-6 py-0.5">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Field Research Imagery & Consultancy Column */}
          <div className="lg:col-span-5 space-y-6">
            {/* Field Observation Frame */}
            <div className="border border-rule bg-carbon/60 p-5 rounded-[2px] shadow-xl">
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] bg-void overflow-hidden rounded-[2px] border border-rule/60">
                <Image
                  src="/media/web/field/img_6704.webp"
                  alt="Live Miridae true bug perched on dew-covered foliage photographed in field by Dr. H. M. Yeshwanth"
                  fill
                  sizes="(max-width: 1024px) 100vw, 480px"
                  className="object-cover object-center"
                />
                <div className="absolute top-3 left-3 bg-void/85 border border-rule px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-amber font-semibold">
                  FIELD RESEARCH ARCHIVE
                </div>
              </div>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-bone-dim mt-3">
                Live Miridae microhabitat observation · High-resolution field photography by Dr. Yeshwanth
              </p>
            </div>

            {/* Founder Consultancy Notice */}
            <div className="border border-rule/80 bg-carbon/60 p-6 md:p-8 rounded-[2px] shadow-xl">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber font-semibold block mb-2">
                FOUNDER CONSULTANCY
              </span>
              <p className="font-body text-[13.5px] text-[#D5D0C6] leading-relaxed">
                Independent entomological consulting, taxonomy, and scientific imaging based in Bengaluru, India.
              </p>
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
