/**
 * /outreach — Science Outreach page
 * ARCHITECTURE.md §1, CONTENT.md §9
 */

import type { Metadata } from 'next';
import Image from 'next/image';
import { COPY } from '@/content/copy';
import { Button } from '@/components/ui/Button';
import { Footer } from '@/components/layout/Footer';
import { breadcrumbSchema } from '@/lib/schema';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Science Outreach & School Programmes',
  description: 'Insect biodiversity exhibitions, workshops, and school programmes. Live displays, 3D models, and field nature walks across Karnataka.',
};

const OUTREACH_GALLERY = [
  {
    src: '/media/web/outreach/exhibition-01-yesh7799.webp',
    title: 'Curated Specimen Trays & Public Curiosity',
    caption: 'School students exploring glass-topped entomological drawers of Scarabaeidae beetles and morphological diversity.',
    tag: 'EXHIBITION',
  },
  {
    src: '/media/web/outreach/exhibition-08-yesh8654.webp',
    title: 'Batesian Mimicry & Iridescent Lepidoptera',
    caption: 'Young visitor captivated by iridescent Morpho butterflies and protective mimicry displays.',
    tag: 'MIMICRY & EVOLUTION',
  },
  {
    src: '/media/web/outreach/exhibition-03-yesh7955.webp',
    title: 'Micro-Observation with Magnifiers',
    caption: 'Students using handheld magnifying lenses to inspect tiny tarsal and wing venation characters.',
    tag: 'HANDS-ON',
  },
  {
    src: '/media/web/outreach/exhibition-05-yesh8109.webp',
    title: 'Scientific Art & Anatomical Sketches',
    caption: 'Children proudly displaying their original insect drawings following a morphological art workshop.',
    tag: 'STUDENT ART',
  },
  {
    src: '/media/web/outreach/exhibition-02-yesh7918.webp',
    title: 'Aquatic & Terrestrial Habitat Displays',
    caption: 'Students studying mayfly and damselfly naiads and aquatic insect adaptations with bilingual scientific guides.',
    tag: 'AQUATIC BIOLOGY',
  },
  {
    src: '/media/web/outreach/exhibition-06-yesh8147.webp',
    title: 'Living Insect Encounters',
    caption: 'Direct gentle observation of living lepidopteran larvae demystifying insects for school children.',
    tag: 'LIVE SPECIMENS',
  },
  {
    src: '/media/web/outreach/exhibition-07-yesh8504.webp',
    title: 'Field Logging & Vivarium Observation',
    caption: 'Student recording behavioral observations in a field journal alongside a living specimen terrarium.',
    tag: 'FIELD JOURNAL',
  },
  {
    src: '/media/web/outreach/exhibition-09-yesh8722.webp',
    title: '3D Educational Dioramas & Models',
    caption: 'Creative 3D insect models and dioramas designed to spark playful curiosity and biological understanding.',
    tag: '3D MODELS',
  },
  {
    src: '/media/web/outreach/exhibition-04-yesh8054.webp',
    title: 'Interactive Entomology Inquiry Board',
    caption: 'Interactive riddle wall where students match ecological clues with actual pinned insect species.',
    tag: 'INQUIRY BOARD',
  },
  {
    src: '/media/web/outreach/exhibition-10-yesh9011.webp',
    title: 'Public Exhibition Hall Overview',
    caption: 'A bustling exhibition floor with families and students gathered around Orthoptera, Mantodea, and Neuroptera drawers.',
    tag: 'PUBLIC IMPACT',
  },
];

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <div className="border border-rule p-8 rounded-[2px] bg-carbon/40">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber block mb-2 font-semibold">01</span>
            <h3 className="font-display text-[1.8rem] text-bone mb-3">Insect Exhibitions</h3>
            <p className="font-body text-bone-dim text-[14px] leading-relaxed">
              Live and preserved specimen displays, scientific art, and 3D models designed to spark curiosity among students.
            </p>
          </div>

          <div className="border border-rule p-8 rounded-[2px] bg-carbon/40">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber block mb-2 font-semibold">02</span>
            <h3 className="font-display text-[1.8rem] text-bone mb-3">Teacher Training</h3>
            <p className="font-body text-bone-dim text-[14px] leading-relaxed">
              Educational resources and biological field training for science educators.
            </p>
          </div>

          <div className="border border-rule p-8 rounded-[2px] bg-carbon/40">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber block mb-2 font-semibold">03</span>
            <h3 className="font-display text-[1.8rem] text-bone mb-3">Field Visits &amp; Nature Walks</h3>
            <p className="font-body text-bone-dim text-[14px] leading-relaxed">
              Guided biodiversity walks and hands-on insect observation in agroecosystems and biodiverse and aquatic habitats.
            </p>
          </div>

          <div className="border border-rule p-8 rounded-[2px] bg-carbon/40">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber block mb-2 font-semibold">04</span>
            <h3 className="font-display text-[1.8rem] text-bone mb-3">Citizen Science</h3>
            <p className="font-body text-bone-dim text-[14px] leading-relaxed">
              Engaging students in real biodiversity mapping and species documentation to foster long-term conservation awareness.
            </p>
          </div>
        </div>

        {/* Authentic Exhibition & Field Photo Gallery */}
        <section className="border-t border-rule pt-20 mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber font-semibold mb-2">
                FIELD ARCHIVE &amp; WORKSHOPS
              </p>
              <h2 className="font-display text-bone text-[2.2rem] md:text-[3.2rem] leading-[1.0]">
                Exhibitions in Action
              </h2>
            </div>
            <p className="font-body text-bone-dim text-[14px] max-w-[460px]">
              Documenting school workshops, public biodiversity exhibitions, and hands-on taxonomy sessions conducted across Karnataka.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {OUTREACH_GALLERY.map((item, idx) => (
              <figure
                key={idx}
                className="group relative flex flex-col bg-carbon/60 border border-rule hover:border-amber/60 rounded-[2px] overflow-hidden transition-all duration-300 shadow-lg"
              >
                <div className="relative w-full aspect-[3/2] bg-void overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-void/80 backdrop-blur-sm border border-rule px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-amber font-semibold">
                    {item.tag}
                  </div>
                </div>
                <figcaption className="p-5 flex-1 flex flex-col justify-between border-t border-rule">
                  <div>
                    <h3 className="font-display text-[1.25rem] text-[#F7F5F0] mb-2 leading-snug">
                      {item.title}
                    </h3>
                    <p className="font-body text-bone-dim text-[13px] leading-relaxed">
                      {item.caption}
                    </p>
                  </div>
                  <span className="font-mono text-[10px] text-bone-faint uppercase tracking-[0.14em] mt-4 block">
                    ENTOBIO ARCHIVE ⌗ {String(idx + 1).padStart(2, '0')}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
