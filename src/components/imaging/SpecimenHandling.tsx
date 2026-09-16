/**
 * src/components/imaging/SpecimenHandling.tsx
 * SPECIMEN HANDLING & DOMESTIC INTAKE — IMAGING-PAGE-SPEC.md §3.6 & FACTS.md §7
 *
 * Scope: Indian institutions only (universities, museums, ICAR institutes, research labs).
 * Removed any language implying international specimen intake.
 *
 * OPERATIONAL COMMITMENTS GUARDRAIL:
 * Exact specimen return logistics, formal condition reports, courier requirements,
 * and insurance commitments are left as TODO comments pending Dr. Yeshwanth's confirmation.
 */

export function SpecimenHandling() {
  return (
    <section className="relative w-full bg-carbon py-24 border-t border-rule">
      <div className="max-w-[1560px] mx-auto px-gutter">
        <div className="max-w-[880px]">
          {/* Question-shaped H2 for AEO & SEO */}
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone-dim mb-3">
            04 — ACCESSION PROTOCOL
          </p>
          <h2
            className="font-display text-bone mb-6"
            style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
              lineHeight: 1.0,
              letterSpacing: '-0.02em',
            }}
          >
            How are specimens handled and preserved during imaging?
          </h2>

          <div className="space-y-6 font-body text-[16px] text-bone-dim leading-relaxed mb-10">
            <p className="text-bone font-medium text-[18px]">
              Specimens are handled with museum-grade care and returned in the condition they arrived.
            </p>
            <p>
              Material is logged upon receipt at our Bengaluru laboratory, inspected
              under stereomicroscopy for structural fragility, imaged with non-destructive
              optical staging, and repacked securely into its original container housing.
            </p>
            <p>
              Dry-mounted (pinned) specimens, permanent and temporary slide preparations,
              and alcohol-preserved material are all accepted from research institutions,
              universities, natural history collections, and ICAR institutes across India.
            </p>
          </div>

          {/* 
            TODO: Operational commitments pending Dr. Yeshwanth's confirmation:
            - Supply of formal condition reports on receipt and return
            - Authorized courier partners, transit insurance, and tracking protocols
            - Formal liability and return transit arrangements
            Do not publish contractual claims on return logistics until verified with him.
          */}

          {/* Scope notice box */}
          <div className="border border-amber/40 bg-void/60 p-6 rounded-[2px]">
            <div className="flex items-center gap-2 mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-amber font-semibold">
              <span className="w-2 h-2 rounded-full bg-amber" />
              <span>DOMESTIC INTAKE ONLY (INDIA)</span>
            </div>
            <p className="font-body text-[14px] text-bone-dim leading-relaxed">
              Dr. Yeshwanth has confirmed that physical specimen shipping is strictly
              restricted to institutions within India. Due to statutory biological transfer
              permits and wildlife regulatory complexities, international specimen intake
              is not available. Taxonomic consultation and digital plate figure review remain
              open internationally.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
