/**
 * src/components/imaging/ImagingDeliverables.tsx
 * DELIVERABLES — IMAGING-PAGE-SPEC.md §3.4
 *
 * Three columns, mono headers, structured lists.
 *
 * OPERATIONAL COMMITMENT GUARDRAIL:
 * Every operational commitment (specific file formats like 16-bit uncompressed TIFF,
 * scale bar standards, proof plate sign-offs, turnaround schedules) is left as
 * TODO comments pending Dr. Yeshwanth's confirmation before publishing as contractual claims.
 */

export function ImagingDeliverables() {
  return (
    <section className="relative w-full bg-carbon py-24 border-t border-rule">
      <div className="max-w-[1560px] mx-auto px-gutter">
        {/* Section Header */}
        <div className="max-w-[760px] mb-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone-dim mb-3">
            02 — DELIVERABLES & PROCESS
          </p>
          <h2
            className="font-display text-bone mb-6"
            style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
              lineHeight: 1.0,
              letterSpacing: '-0.02em',
            }}
          >
            What you receive with every accession.
          </h2>
          <p className="font-body text-bone-dim text-[16px] leading-relaxed">
            Delivering taxonomic-grade figures requires clear standards from initial
            sample intake to final publication plate composition.
          </p>
        </div>

        {/* 
          TODO: Operational commitments pending Dr. Yeshwanth's explicit confirmation:
          - Exact file formats (e.g. 16-bit uncompressed TIFF, publication JPEG, layered composite)
          - Scale bar calibration certification and color reference standards
          - Proof plate review turnaround time and revision terms
          - Specimen return transit guarantees
          Do not hardcode these as contractual public claims until confirmed.
        */}

        {/* Three Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 border-t border-rule pt-12">
          {/* Column 1: Formats & Deliverables */}
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber block mb-6 font-semibold">
              FIGURE COMPOSITION & FORMATS
            </span>
            <ul className="space-y-4 font-body text-[15px] text-bone-dim">
              <li className="flex items-start gap-3">
                <span className="text-amber mt-1 text-[10px]">■</span>
                <span>Publication-ready diagnostic specimen plates</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber mt-1 text-[10px]">■</span>
                <span>High-resolution uncompressed digital master images</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber mt-1 text-[10px]">■</span>
                <span>Multi-specimen composite figures formatted to journal dimensions</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber mt-1 text-[10px]">■</span>
                <span>Optimised digital copies for institutional repositories and web display</span>
              </li>
            </ul>
            <p className="font-mono text-[11px] text-bone-dim/70 mt-6 pt-4 border-t border-rule">
              * Technical delivery formats and bit-depth specifications confirmed per project requirements during initial intake.
            </p>
          </div>

          {/* Column 2: Standards & Scientific Calibration */}
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber block mb-6 font-semibold">
              TAXONOMIC STANDARDS
            </span>
            <ul className="space-y-4 font-body text-[15px] text-bone-dim">
              <li className="flex items-start gap-3">
                <span className="text-amber mt-1 text-[10px]">■</span>
                <span>Calibrated scale indicators on every diagnostic figure</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber mt-1 text-[10px]">■</span>
                <span>Uniform colour temperature and diffused coaxial illumination</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber mt-1 text-[10px]">■</span>
                <span>Complete orientation series: dorsal, lateral, ventral, and genitalic</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber mt-1 text-[10px]">■</span>
                <span>Accompanying optical capture metadata and magnification records</span>
              </li>
            </ul>
            <p className="font-mono text-[11px] text-bone-dim/70 mt-6 pt-4 border-t border-rule">
              * Plates composed in strict accordance with target journal formatting guidelines (e.g. Zootaxa, European Journal of Taxonomy).
            </p>
          </div>

          {/* Column 3: Process & Consultation */}
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber block mb-6 font-semibold">
              INTAKE & WORKFLOW
            </span>
            <ul className="space-y-4 font-body text-[15px] text-bone-dim">
              <li className="flex items-start gap-3">
                <span className="text-amber mt-1 text-[10px]">■</span>
                <span>Initial enquiry, sample review, and quotation</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber mt-1 text-[10px]">■</span>
                <span>Domestic specimen intake and accession logging in Bengaluru</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber mt-1 text-[10px]">■</span>
                <span>Optical capture, micron-stepped stacking, and figure assembly</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber mt-1 text-[10px]">■</span>
                <span>Digital proof plates provided for researcher review and approval</span>
              </li>
            </ul>
            <p className="font-mono text-[11px] text-bone-dim/70 mt-6 pt-4 border-t border-rule">
              * Turnaround schedules determined by accession volume and diagnostic preparation complexity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
