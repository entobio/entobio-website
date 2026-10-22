/**
 * /merchandise — Entomological Merchandise, Field Tools & Educational Materials
 * Revised per client review: strictly photographs, lapel pins, and posters. No insects sold.
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Footer } from '@/components/layout/Footer';
import { breadcrumbSchema } from '@/lib/schema';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Photographs, Lapel Pins & Posters · EntoBio Consult',
  description:
    'Archival focus-stacked specimen photographs, fine-art macro prints, collectible entomological lapel pins, and educational biodiversity wall posters by EntoBio Consult.',
};

const MERCHANDISE_ITEMS = [
  {
    id: 'MERCH-01',
    category: 'SCIENTIFIC PHOTOGRAPHS',
    title: 'Focus-Stacked Diagnostic Specimen Prints',
    description:
      'Archival gallery prints of landmark type specimens and intricate insect morphology. Captured using extreme macro focus-stacking at up to 400× magnification on fine-art archival paper.',
    specs: 'Sizes: A3, A2 & Custom · 310 gsm 100% cotton rag · Annotated with specimen accession data',
    status: 'Archival Editions',
  },
  {
    id: 'MERCH-02',
    category: 'FIELD MACRO PHOTOGRAPHY',
    title: 'Living Insect Field Habitat Prints',
    description:
      'Fine-art exhibition prints of living Miridae, native pollinators, and cryptic canopy species in their natural microhabitats across the Western Ghats and Andaman Archipelago.',
    specs: 'Giclée pigment prints · Acid-free archival mounting · Custom gallery framing options',
    status: 'Limited Prints',
  },
  {
    id: 'MERCH-03',
    category: 'ENTOMOLOGICAL LAPEL PINS',
    title: 'Native Pollinators Enamel Lapel Pin Set',
    description:
      'Artistic collectible hard-enamel lapel pins celebrating Indian wild bees, predatory bugs, and beneficial pollinators. Features anatomically accurate silhouettes and rich jewel-toned enamels.',
    specs: 'Hard enamel with gold plating · Double rubber clutch backing · Illustrated backing card',
    status: 'Available on Order',
  },
  {
    id: 'MERCH-04',
    category: 'ENTOMOLOGICAL LAPEL PINS',
    title: 'Iconic Beetles & True Bugs Lapel Pins',
    description:
      'Precision-crafted metal lapel pins showcasing iridescent jewel beetles and distinctive shield bugs. Perfect for scientific conferences, field bags, and nature enthusiasts.',
    specs: 'Die-struck brass alloy · Polished nickel & copper finishes · Collector edition presentation',
    status: 'In Stock / Bundles',
  },
  {
    id: 'MERCH-05',
    category: 'EDUCATIONAL POSTERS',
    title: 'Indian Insect Biodiversity Wall Chart',
    description:
      'Comprehensive educational wall poster illustrating major insect orders, morphological adaptations, and ecological roles across Indian biogeographic zones.',
    specs: '24" × 36" (60 × 90 cm) · 250 gsm satin art card · Matte laminated for durability',
    status: 'School & University Supply',
  },
  {
    id: 'MERCH-06',
    category: 'EDUCATIONAL POSTERS',
    title: 'Taxonomic Anatomy & Focus-Stacking Infographic',
    description:
      'High-detail laboratory reference poster detailing insect mouthparts, wing venation, and the optical principles of microscopic focus-stacking.',
    specs: '18" × 24" (45 × 60 cm) · UV-coated weatherproof stock · Classroom & laboratory reference',
    status: 'Workshop & Lab Supply',
  },
];

export default function MerchandisePage() {
  return (
    <main className="min-h-screen bg-void text-bone pt-28 md:pt-36">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'Merchandise', path: '/merchandise' },
            ])
          ),
        }}
      />

      <div className="max-w-[1560px] mx-auto px-gutter pb-20">
        {/* Page Header */}
        <div className="mb-16 border-b border-rule pb-12 max-w-[880px]">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber mb-4 font-semibold">
            PHOTOGRAPHS, LAPEL PINS &amp; EDUCATIONAL POSTERS
          </p>
          <h1
            className="font-display text-[#F7F5F0] mb-6"
            style={{
              fontSize: 'var(--t-display)',
              lineHeight: 0.88,
              letterSpacing: '-0.03em',
            }}
          >
            Merchandise &amp; Gear
          </h1>
          <p className="font-body text-[#D5D0C6] text-[17px] leading-relaxed">
            Archival focus-stacked specimen photographs, fine-art macro prints, collectible entomological
            lapel pins, and educational biodiversity wall posters. Designed for researchers, universities,
            nature educators, and biodiversity enthusiasts.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {MERCHANDISE_ITEMS.map((item) => (
            <div
              key={item.id}
              className="border border-rule bg-carbon/60 rounded-[2px] p-8 flex flex-col justify-between hover:border-amber/60 hover:bg-carbon transition-all duration-300 group shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-rule mb-5">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber font-semibold">
                    {item.category}
                  </span>
                  <span className="font-mono text-[11px] tracking-[0.16em] text-bone-faint">
                    {item.id}
                  </span>
                </div>

                <h3 className="font-display text-[1.65rem] text-[#F7F5F0] leading-snug group-hover:text-amber transition-colors mb-3">
                  {item.title}
                </h3>

                <p className="font-body text-bone-dim text-[14px] leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-rule space-y-4">
                <p className="font-mono text-[11px] text-bone-faint leading-tight">
                  {item.specs}
                </p>

                <div className="flex items-center justify-between pt-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-amber/90 font-medium">
                    {item.status}
                  </span>
                  <Link
                    href={`/contact?subject=${encodeURIComponent(`Inquiry: ${item.title}`)}`}
                    className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[#F7F5F0] hover:text-amber transition-colors"
                  >
                    <span>Request Details</span>
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Orders / Institutional Request Block */}
        <div className="border border-amber/40 bg-carbon/50 p-8 md:p-12 rounded-[2px] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-2xl">
          <div className="lg:col-span-8">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber font-semibold block mb-2">
              CUSTOM PRINTS, POSTERS &amp; LAPEL PINS
            </span>
            <h2 className="font-display text-[2rem] md:text-[2.6rem] text-bone mb-3 leading-tight">
              Looking for bespoke prints, educational posters, or pin batches?
            </h2>
            <p className="font-body text-[#D5D0C6] text-[15px] max-w-[650px] leading-relaxed">
              We provide custom-framed fine-art macro photographs, tailored classroom posters, and
              institutional enamel pin batches for academic departments, conservation societies, and nature festivals.
              All merchandise is strictly educational and non-specimen.
            </p>
          </div>
          <div className="lg:col-span-4 flex lg:justify-end">
            <Button variant="primary" href="/contact?subject=Custom%20Merchandise%20Order">
              Place Custom Enquiry &rarr;
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
