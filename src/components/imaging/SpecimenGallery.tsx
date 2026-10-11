/**
 * src/components/imaging/SpecimenGallery.tsx
 * PUBLICATION SPECIMEN PLATES GALLERY
 * Showcases authentic focus-stacked plates and microscopic anatomy from Dr. Yeshwanth.
 */

'use client';

import { useState } from 'react';
import Image from 'next/image';

type SpecimenPlate = {
  src: string;
  title: string;
  taxon: string;
  category: string;
  description: string;
  scale: string;
};

const SPECIMEN_PLATES: SpecimenPlate[] = [
  {
    src: '/media/web/specimens/plate-iso-head.webp',
    title: 'Cephalic & Ommatidial Morphology',
    taxon: 'Heteroptera / Cicadellidae',
    category: 'FOCUS STACK',
    description: 'Multi-angle cephalic stack capturing compound eye ommatidia, antennal scape, and cranial micro-sculpture.',
    scale: '50 µm / 200 µm calibrated',
  },
  {
    src: '/media/web/specimens/plate-figure-1-types.webp',
    title: 'Holotype Genital Suite & Habitus',
    taxon: 'Miridae: Cylapinae',
    category: 'TYPE SPECIMEN',
    description: 'Publication holotype figure showing male pygophore, parameres, aedeagus, and whole habitus.',
    scale: '1.0 mm / 200 µm calibrated',
  },
  {
    src: '/media/web/specimens/plate-thaipunctulus-bidentatus.webp',
    title: 'Thaipunctulus bidentatus Diagnostic Suite',
    taxon: 'Cicadellidae: Deltocephalinae',
    category: 'DESCRIPTIVE TAXONOMY',
    description: 'Comprehensive species plate showing dorsal and lateral habitus, pygofer processes, and genital style anatomy.',
    scale: 'Micron scale calibrated',
  },
  {
    src: '/media/web/specimens/plate-morphology-series.webp',
    title: 'Miridae Comparative Series & Endosoma',
    taxon: 'Miridae: Mirinae',
    category: 'REVISIONAL MORPHOLOGY',
    description: 'Comparative adult habitus series paired with dissected endosomal sclerites and paired parameres.',
    scale: '200 µm scale bars',
  },
  {
    src: '/media/web/specimens/plate-diagnostic-structures.webp',
    title: 'Micro-Stacked Ovipositor Valvulae',
    taxon: 'Hemiptera',
    category: 'INTERNAL ANATOMY',
    description: 'High-magnification focus stacking of first and second valvulae illustrating diagnostic serrate teeth.',
    scale: 'High magnification micro-stack',
  },
  {
    src: '/media/web/specimens/plate-holotype-suite.webp',
    title: 'Cephalic Capsule Comparative Suite',
    taxon: 'Auchenorrhyncha',
    category: 'TAXONOMIC COMPARISON',
    description: 'Multi-specimen cephalic comparison (A–L) demonstrating head angle, facial carinae, and eye margins.',
    scale: '0.2 mm & 0.5 mm calibrated',
  },
  {
    src: '/media/web/field/img_6704.webp',
    title: 'Live Miridae in Field Microhabitat',
    taxon: 'Miridae (live specimen)',
    category: 'FIELD MACRO',
    description: 'Living plant bug observed on dew-covered foliage in field habitat showing natural coloration and stance.',
    scale: 'Extreme field macro',
  },
  {
    src: '/media/web/field/_mg_4130.webp',
    title: 'Predatory Bug Ecology in Agroecosystems',
    taxon: 'Anthocoridae / Tingidae',
    category: 'BIOLOGICAL CONTROL',
    description: 'Live field interaction capturing active predation on a lace bug nymph on host plant foliage.',
    scale: 'Behavioral ecology macro',
  },
];

export function SpecimenGallery() {
  const [activePlate, setActivePlate] = useState<SpecimenPlate | null>(null);

  return (
    <section className="relative w-full bg-void py-24 border-t border-rule">
      <div className="max-w-[1560px] mx-auto px-gutter">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber font-semibold mb-3">
              ARCHIVAL SPECIMEN PLATES
            </p>
            <h2
              className="font-display text-bone"
              style={{
                fontSize: 'clamp(2rem, 4.5vw, 3.6rem)',
                lineHeight: 1.0,
                letterSpacing: '-0.02em',
              }}
            >
              Publication-Grade Imagery
            </h2>
          </div>
          <p className="font-body text-bone-dim text-[15px] max-w-[500px] leading-relaxed">
            All plates are authentic scientific figures produced for taxonomic monographs and peer-reviewed journals. Click any plate to inspect full magnification.
          </p>
        </div>

        {/* Plates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SPECIMEN_PLATES.map((plate, index) => (
            <article
              key={index}
              onClick={() => setActivePlate(plate)}
              className="group cursor-pointer flex flex-col bg-carbon/80 border border-rule hover:border-amber/80 rounded-[2px] overflow-hidden transition-all duration-300 hover:bg-carbon-lift shadow-xl"
            >
              {/* Image Frame with dark border and graticule touch */}
              <div className="relative w-full aspect-[3/4] bg-void overflow-hidden flex items-center justify-center p-2">
                <Image
                  src={plate.src}
                  alt={plate.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-void/85 border border-rule px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.16em] text-amber font-semibold">
                  {plate.category}
                </div>
                <div className="absolute bottom-3 right-3 bg-void/85 border border-rule px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-bone-dim opacity-0 group-hover:opacity-100 transition-opacity">
                  CLICK TO INSPECT
                </div>
              </div>

              {/* Plate Metadata */}
              <div className="p-5 flex-1 flex flex-col justify-between border-t border-rule">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-bone-faint block mb-1">
                    {plate.taxon}
                  </span>
                  <h3 className="font-display text-[1.25rem] text-[#F7F5F0] leading-snug mb-2 group-hover:text-amber transition-colors">
                    {plate.title}
                  </h3>
                  <p className="font-body text-bone-dim text-[12.5px] leading-relaxed line-clamp-2">
                    {plate.description}
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-rule/50 flex items-center justify-between font-mono text-[9.5px] uppercase tracking-[0.14em] text-bone-dim">
                  <span>{plate.scale}</span>
                  <span className="text-amber">FIG ⌗0{index + 1}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Full-Screen Inspector Modal */}
      {activePlate && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-void/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
          onClick={() => setActivePlate(null)}
        >
          <div
            className="relative max-w-[1200px] w-full max-h-[92vh] bg-carbon border border-amber/60 rounded-[2px] p-6 md:p-8 flex flex-col md:flex-row gap-8 shadow-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActivePlate(null)}
              className="absolute top-4 right-4 text-bone-dim hover:text-amber font-mono text-sm px-3 py-1 border border-rule hover:border-amber transition-colors rounded-[2px]"
            >
              CLOSE [ESC]
            </button>

            {/* Large Plate Image */}
            <div className="relative flex-1 min-h-[380px] md:min-h-[560px] bg-void border border-rule rounded-[2px] flex items-center justify-center p-4">
              <Image
                src={activePlate.src}
                alt={activePlate.title}
                fill
                sizes="(max-width: 1200px) 100vw, 800px"
                className="object-contain p-4"
              />
            </div>

            {/* Specimen Inspection Details */}
            <div className="w-full md:w-[360px] flex flex-col justify-between pt-2">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber font-semibold block mb-2">
                  {activePlate.category} — {activePlate.scale}
                </span>
                <h3 className="font-display text-[2rem] text-bone leading-[1.05] mb-2">
                  {activePlate.title}
                </h3>
                <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-amber/90 mb-4">
                  {activePlate.taxon}
                </p>
                <div className="border-t border-rule pt-4 space-y-3">
                  <p className="font-body text-bone-dim text-[14px] leading-relaxed">
                    {activePlate.description}
                  </p>
                  <p className="font-body text-bone-dim text-[13px] leading-relaxed">
                    Prepared with focus-stacking hardware and multi-frame synthesis. Calibrated micrometer scales allow precision morphological measurement for peer review.
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-rule mt-6">
                <a
                  href="/contact"
                  className="w-full inline-flex items-center justify-center bg-amber hover:bg-amber-deep text-void font-mono text-[11px] uppercase tracking-[0.2em] font-semibold py-3 px-6 rounded-[2px] transition-colors"
                >
                  Commission Specimen Imaging
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
