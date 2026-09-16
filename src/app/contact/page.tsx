/**
 * /contact — Contact page
 * ARCHITECTURE.md §1, CONTENT.md §11
 */

import type { Metadata } from 'next';
import { ContactSection } from '@/components/home/ContactSection';
import { Footer } from '@/components/layout/Footer';
import { breadcrumbSchema } from '@/lib/schema';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Contact & Specimen Enquiries',
  description: 'Get in touch for insect identification, taxonomic research, or biodiversity consulting.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-void text-bone pt-28 md:pt-36">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'Contact', path: '/contact' },
            ])
          ),
        }}
      />
      <div className="max-w-[1560px] mx-auto px-gutter pb-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber mb-4 font-semibold">
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

      {/* Standalone Contact Form block */}
      <ContactSection />

      <Footer />
    </main>
  );
}
