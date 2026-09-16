/**
 * src/components/imaging/ImagingEquipment.tsx
 * EQUIPMENT & OPTICAL FACILITY — IMAGING-PAGE-SPEC.md §3.5
 *
 * Short, factual, mono-set. Typographic-only until Dr. Yeshwanth's lab photos arrive.
 * Never generate synthetic photographs of equipment.
 */

export function ImagingEquipment() {
  return (
    <section className="relative w-full bg-void py-24 border-t border-rule">
      <div className="max-w-[1560px] mx-auto px-gutter">
        {/* Section Header */}
        <div className="max-w-[760px] mb-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone-dim mb-3">
            03 — OPTICAL FACILITY
          </p>
          <h2
            className="font-display text-bone mb-4"
            style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
              lineHeight: 1.0,
              letterSpacing: '-0.02em',
            }}
          >
            Engineered for micron-level depth capture.
          </h2>
          <p className="font-body text-bone-dim text-[16px] leading-relaxed">
            Macro and micro optical rigs calibrated specifically for chitinous,
            iridescent, and micro-arthropod diagnostic morphology.
          </p>
        </div>

        {/* Typographic Technical Facility Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 border-t border-rule pt-10">
          <div className="border border-rule bg-carbon/50 p-6 rounded-[2px]">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-amber block mb-2 font-medium">
              MECHANICAL STAGE
            </span>
            <h3 className="font-mono text-[13px] text-bone mb-3 font-semibold">
              Motorised Linear Stepper
            </h3>
            <p className="font-body text-[14px] text-bone-dim leading-relaxed">
              Automated high-precision focus rail stepping forward by micron increments,
              eliminating mechanical vibration across long frame sequences.
            </p>
          </div>

          <div className="border border-rule bg-carbon/50 p-6 rounded-[2px]">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-amber block mb-2 font-medium">
              OPTICAL COLUMNS
            </span>
            <h3 className="font-mono text-[13px] text-bone mb-3 font-semibold">
              Macro & Micro Optics
            </h3>
            <p className="font-body text-[14px] text-bone-dim leading-relaxed">
              Specialised manual macro objectives and microscope optical stages configured
              for wide field-of-view insect habitus down to micro-dissections.
            </p>
          </div>

          <div className="border border-rule bg-carbon/50 p-6 rounded-[2px]">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-amber block mb-2 font-medium">
              ILLUMINATION
            </span>
            <h3 className="font-mono text-[13px] text-bone mb-3 font-semibold">
              Diffused Coaxial Lighting
            </h3>
            <p className="font-body text-[14px] text-bone-dim leading-relaxed">
              Continuous high-CRI LED illumination paired with custom cylindrical diffusion
              chambers to eliminate glare and specular highlights on insect cuticle.
            </p>
          </div>

          <div className="border border-rule bg-carbon/50 p-6 rounded-[2px]">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-amber block mb-2 font-medium">
              COMPUTATION
            </span>
            <h3 className="font-mono text-[13px] text-bone mb-3 font-semibold">
              Dedicated Stacking Core
            </h3>
            <p className="font-body text-[14px] text-bone-dim leading-relaxed">
              Specialised computational workstation executing sub-pixel alignment,
              pyramidal depth synthesis, and precise manual retouching of stacking artefacts.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-rule/60 flex flex-wrap items-center justify-between text-bone-dim/70 font-mono text-[11px]">
          <span>LOCATION: BENGALURU, KARNATAKA, INDIA</span>
          <span>CALIBRATION: 1:1 TO 20:1 OPTICAL MAGNIFICATION</span>
        </div>
      </div>
    </section>
  );
}
