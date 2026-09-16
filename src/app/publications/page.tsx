/**
 * /publications — Publication list page
 * ARCHITECTURE.md §1, CONTENT.md §10
 * Server component with dedicated page metadata.
 */

import type { Metadata } from 'next';
import { PublicationsList } from '@/components/publications/PublicationsList';
import { Footer } from '@/components/layout/Footer';
import { breadcrumbSchema } from '@/lib/schema';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Publications · Dr. H. M. Yeshwanth',
  description:
    'Thirty-two peer-reviewed taxonomic papers, revisional monographs, and books on Indian Hemiptera and insect biodiversity.',
};

export default function PublicationsPage() {
  return (
    <main className="min-h-screen bg-void text-bone pt-28 md:pt-36">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'Publications', path: '/publications' },
            ])
          ),
        }}
      />
      <div className="max-w-[1560px] mx-auto px-gutter pb-20">
        {/* Header */}
        <div className="mb-12 border-b border-rule pb-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone-dim mb-4 font-semibold">
            TAXONOMIC PAPERS & REVISIONAL MONOGRAPHS
          </p>
          <h1
            className="font-display text-bone mb-4"
            style={{
              fontSize: 'var(--t-display)',
              lineHeight: 0.88,
              letterSpacing: '-0.03em',
            }}
          >
            Publications
          </h1>
          <p className="font-body text-bone-dim text-[15px] max-w-[540px]">
            Peer-reviewed papers published in Zootaxa, ZooKeys, European Journal of Taxonomy, and other international entomological journals.
          </p>
        </div>

        {/* Client-side filtered list */}
        <PublicationsList />
      </div>

      <Footer />
    </main>
  );
}
