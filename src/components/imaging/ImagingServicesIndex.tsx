/**
 * src/components/imaging/ImagingServicesIndex.tsx
 * SERVICES INDEX — IMAGING-PAGE-SPEC.md §3.3
 *
 * Six rows, hairline-separated, mono index + display serif name + description.
 * Same visual language as homepage Capabilities section.
 * Row hover: background lift, name shifts +14px, description reveals.
 */

export type ImagingService = {
  n: string;
  name: string;
  description: string;
  sampleTypes: string;
};

export const IMAGING_SERVICES: readonly ImagingService[] = [
  {
    n: '01',
    name: 'Single Specimen Imaging',
    description:
      'Focus-stacked macro and micro plates of individual specimens: insects, arthropods, small invertebrates, botanical material. Publication-ready, figure-composed, at agreed magnification.',
    sampleTypes: 'Insects · Small Arthropods · Botanical',
  },
  {
    n: '02',
    name: 'Type Specimen Documentation',
    description:
      'Diagnostic imaging of holotypes, paratypes and voucher material, including dorsal, lateral and genitalic preparations, to the standard required for taxonomic publication.',
    sampleTypes: 'Primary Types · Vouchers · Genitalia',
  },
  {
    n: '03',
    name: 'Collection Digitisation',
    description:
      'Batch imaging of museum drawers, unit trays, teaching sets and reference collections, with consistent lighting, scale and metadata across the series.',
    sampleTypes: 'Museum Trays · Series · Vouchers',
  },
  {
    n: '04',
    name: 'Slide & Microscope Preparation Imaging',
    description:
      'Transmitted light, brightfield and phase imaging of permanent and temporary slide preparations.',
    sampleTypes: 'Slide Mounts · Dissections · Thin Sections',
  },
  {
    n: '05',
    name: 'Comparative Plates',
    description:
      'Multi-specimen figures composed for publication: aligned, scaled, labelled and laid out to journal specification.',
    sampleTypes: 'Multi-Taxa Figures · Morphometric Series',
  },
  {
    n: '06',
    name: 'Custom Documentation',
    description:
      'Non-standard samples, unusual magnifications, or imaging workflows developed for a specific research question.',
    sampleTypes: 'Specialised Preparations · Non-standard',
  },
] as const;

export function ImagingServicesIndex() {
  return (
    <section
      id="services-index"
      className="relative w-full bg-void py-24 md:py-32 border-t border-rule"
    >
      <div className="max-w-[1560px] mx-auto px-gutter">
        {/* Section Header */}
        <div className="max-w-[760px] mb-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone-dim mb-3">
            01 — SERVICES INDEX
          </p>
          <h2
            className="font-display text-bone mb-6"
            style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
              lineHeight: 1.0,
              letterSpacing: '-0.02em',
            }}
          >
            Structured by sample type and diagnostic outcome.
          </h2>
          <p className="font-body text-bone-dim text-[16px] leading-relaxed">
            Every specimen requires an individual optical strategy. Six specialised
            imaging modalities tailored to taxonomic publication, reference collections,
            and institutional digitisation.
          </p>
        </div>

        {/* Six Hairline-Separated Service Rows */}
        <div className="border-t border-rule w-full">
          {IMAGING_SERVICES.map((service) => (
            <div
              key={service.n}
              id={`service-${service.n}`}
              className="group relative border-b border-rule py-8 md:py-10 px-4 md:px-6 transition-colors duration-300 hover:bg-carbon/60"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start md:items-center">
                {/* Index (01–06) */}
                <div className="md:col-span-1">
                  <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-amber font-medium">
                    {service.n}
                  </span>
                </div>

                {/* Service Name (Shifts +14px on desktop hover) */}
                <div className="md:col-span-5">
                  <h3
                    className="font-display text-bone transition-transform duration-300 ease-out group-hover:translate-x-[14px]"
                    style={{
                      fontSize: 'clamp(1.6rem, 2.5vw, 2.4rem)',
                      lineHeight: 1.05,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {service.name}
                  </h3>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-bone-dim/70 mt-2">
                    {service.sampleTypes}
                  </p>
                </div>

                {/* Description */}
                <div className="md:col-span-4">
                  <p className="font-body text-bone-dim text-[14px] md:text-[15px] leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Action CTA */}
                <div className="md:col-span-2 text-left md:text-right">
                  <a
                    href={`#enquiry?service=${service.n}`}
                    className="inline-flex items-center gap-1.5 border border-rule group-hover:border-amber group-hover:text-amber text-bone-dim font-mono text-[10px] uppercase tracking-[0.16em] px-4 py-2 rounded-[2px] transition-colors duration-200"
                  >
                    <span>Enquire</span>
                    <span>→</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
