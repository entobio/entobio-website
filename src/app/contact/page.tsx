/**
 * /contact — Contact page
 * ARCHITECTURE.md §1, CONTENT.md §11
 */

import type { Metadata } from 'next';
import { RecordContact } from '@/components/home/RecordContact';
import { Footer } from '@/components/layout/Footer';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Contact & Specimen Enquiries',
  description: 'Get in touch for insect identification, taxonomic research, or biodiversity consulting.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-void text-bone pt-28 md:pt-36">
      <div className="max-w-[1560px] mx-auto px-gutter pb-12">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber mb-4">
          INSECT IDENTIFICATION & RESEARCH ENQUIRIES
        </p>
        <h1
          className="font-display text-bone mb-4"
          style={{
            fontSize: 'var(--t-display)',
            lineHeight: 0.88,
            letterSpacing: '-0.03em',
          }}
        >
          Contact
        </h1>
      </div>

      {/* Reuse RecordContact component's Contact Form block */}
      <RecordContact />

      <Footer />
    </main>
  );
}
