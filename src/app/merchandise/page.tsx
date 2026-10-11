/**
 * /merchandise — Entomological Merchandise, Field Tools & Educational Materials
 * Requested in client review (PDF Page 1)
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Footer } from '@/components/layout/Footer';
import { breadcrumbSchema } from '@/lib/schema';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Merchandise & Educational Tools · EntoBio Consult',
  description:
    'High-precision 3D insect models, taxonomic field keys, diagnostic prints, and specimen curation supplies by EntoBio Consult.',
};

const MERCHANDISE_ITEMS = [
  {
    id: 'MERCH-01',
    category: 'EDUCATIONAL 3D MODELS',
    title: 'Precision Anatomical Insect 3D Models',
    image: '/media/web/outreach/exhibition-09-yesh8722.webp',
    imageAlt: 'Tactile 3D insect models and diorama displays',
    description:
      'High-detail tactile 3D printed morphology models designed for university labs, classrooms, and exhibitions. Accurately scaled diagnostic features including mouthparts, wing venation, and genitalia.',
    specs: 'Scale: 15:1 to 50:1 · Eco-friendly photopolymer resin · Scientific calibration guide included',
    status: 'Available on Order',
  },
  {
    id: 'MERCH-02',
    category: 'TAXONOMIC PUBLICATIONS',
    title: 'Indian Insects: Diversity and Science',
    image: null,
    imageAlt: '',
    description:
      'Co-edited authoritative volume covering the vast entomological diversity of India, classification keys, biogeography, and ecological roles. 450+ pages published with CRC Press.',
    specs: 'Hardcover & Institutional eBook · ISBN 9780367184131 · Academic reference',
    status: 'In Print',
  },
  {
    id: 'MERCH-03',
    category: 'SCIENTIFIC PRINTS',
    title: 'Focus-Stacked Diagnostic Macro Plates',
    image: '/media/web/specimens/plate-iso-head.webp',
    imageAlt: 'Archival focus-stacked cephalic morphology print',
    description:
      'Archival gallery prints of landmark holotypes and remarkable insect morphology. Imaged with extreme macro focus-stacking at up to 400× magnification on fine-art archival paper.',
    specs: 'Sizes: A3, A2 & Bespoke · 310 gsm cotton rag · Signed & annotated with specimen accession',
    status: 'Limited Editions',
  },
  {
    id: 'MERCH-04',
    category: 'FIELD & CURATION TOOLS',
    title: 'Entomological Field & Microscopy Kit',
    image: null,
    imageAlt: '',
    description:
      'Curated field tools for taxonomic field surveys and specimen preservation: high-precision stainless steel entomological forceps, specimen unit trays, calibrated aspirators, and field storage vials.',
    specs: 'Standard museum curation grade · Suitable for researchers, survey teams, and students',
    status: 'Institutional Supply',
  },
  {
    id: 'MERCH-05',
    category: 'EDUCATIONAL AIDS',
    title: 'Biodiversity Identification Pocket Guides',
    image: '/media/web/field/img_6704.webp',
    imageAlt: 'Microhabitat field photograph of living Miridae',
    description:
      'Laminated field-identification charts and visual dichotomous keys for common pollinators, agricultural pests, and predatory bugs of the Indian subcontinent.',
    specs: 'Weatherproof UV-coated sheets · Illustrated with diagnostic field photography',
    status: 'School & Workshop Bundles',
  },
  {
    id: 'MERCH-06',
    category: 'COLLECTION CARE',
    title: 'Museum Preservation & Curation Supplies',
    image: '/media/web/outreach/exhibition-01-yesh7799.webp',
    imageAlt: 'Museum insect drawers with pinned specimens',
    description:
      'Archival-grade insect pins (sizes 000 through 5), museum storage boxes with polyethylene foam bottoms, and micro-vial genitalia storage kits.',
    specs: 'Acid-free, rust-resistant materials complying with international museum standards',
    status: 'Bulk & Institutional Order',
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
            SCIENTIFIC REQUISITES &amp; EDUCATIONAL MATERIALS
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
            Curated 3D anatomical models, authoritative reference texts, fine-art macro prints,
            and museum-grade entomological field equipment designed for researchers, academic institutions,
            and nature educators.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {MERCHANDISE_ITEMS.map((item) => (
            <div
              key={item.id}
              className="border border-rule bg-carbon/60 rounded-[2px] flex flex-col justify-between hover:border-amber/60 hover:bg-carbon transition-all duration-300 group shadow-lg overflow-hidden"
            >
              {item.image && (
                <div className="relative w-full h-[180px] bg-void overflow-hidden border-b border-rule">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-carbon via-transparent to-transparent pointer-events-none" />
                </div>
              )}

              <div className="p-8 flex-1 flex flex-col justify-between">
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
            </div>
          ))}
        </div>

        {/* Custom Orders / Institutional Request Block */}
        <div className="border border-amber/40 bg-carbon/50 p-8 md:p-12 rounded-[2px] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-2xl">
          <div className="lg:col-span-8">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber font-semibold block mb-2">
              INSTITUTIONAL &amp; WORKSHOP ORDERS
            </span>
            <h2 className="font-display text-[2rem] md:text-[2.6rem] text-bone mb-3 leading-tight">
              Looking for tailored educational models or bulk specimens?
            </h2>
            <p className="font-body text-[#D5D0C6] text-[15px] max-w-[650px] leading-relaxed">
              We fabricate bespoke 3D biological models for museums, university faculties, and exhibitions.
              Contact us to discuss custom magnifications, curriculum integration, or institutional supply.
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
