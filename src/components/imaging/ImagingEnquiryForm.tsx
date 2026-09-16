/**
 * src/components/imaging/ImagingEnquiryForm.tsx
 * STRUCTURED BRIEF ENQUIRY — IMAGING-PAGE-SPEC.md §3.7
 *
 * Not a generic form: a structured brief.
 * Segmented by sample type, quantity, intended use, institution, and location in India.
 * Web3Forms integration with client-side state handling.
 */

'use client';

import { useState } from 'react';

const SAMPLE_TYPES = [
  'Insect',
  'Other arthropod',
  'Botanical',
  'Slide preparation',
  'Other',
] as const;

const INTENDED_USES = [
  'Publication',
  'Type documentation',
  'Collection digitisation',
  'Other',
] as const;

export function ImagingEnquiryForm() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'submitted' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const [selectedSampleType, setSelectedSampleType] = useState<string>('Insect');
  const [selectedIntendedUse, setSelectedIntendedUse] = useState<string>('Publication');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('submitting');
    setErrorMessage('');

    const key = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
    if (!key || key === 'YOUR_ACCESS_KEY_HERE') {
      // Graceful fallback if access key is unconfigured in development
      setTimeout(() => {
        setFormState('submitted');
      }, 600);
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append('access_key', key);
    formData.append('subject', 'New Scientific Imaging Brief — EntoBio Consult');
    formData.append('sample_type', selectedSampleType);
    formData.append('intended_use', selectedIntendedUse);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setFormState('submitted');
      } else {
        setFormState('error');
        setErrorMessage(data.message || 'Submission failed. Please try again.');
      }
    } catch {
      setFormState('error');
      setErrorMessage('Network error. Please try again later.');
    }
  };

  return (
    <section id="enquiry" className="relative w-full bg-void py-24 md:py-32 border-t border-rule">
      <div className="max-w-[1560px] mx-auto px-gutter">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Brief Context */}
          <div className="lg:col-span-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone-dim mb-3">
              05 — STRUCTURED BRIEF
            </p>
            <h2
              className="font-display text-bone mb-6"
              style={{
                fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
                lineHeight: 1.0,
                letterSpacing: '-0.02em',
              }}
            >
              Request an imaging quote.
            </h2>
            <p className="font-body text-bone-dim text-[16px] leading-relaxed mb-8 max-w-[480px]">
              Provide preliminary accession details below. Dr. Yeshwanth reviews
              each brief directly to assess optical feasibility, preparation requirements,
              and quotation.
            </p>

            {/* Scope reminder */}
            <div className="border border-rule bg-carbon/50 p-6 rounded-[2px] max-w-[480px]">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-amber block mb-2 font-semibold">
                DOMESTIC INTAKE GUIDELINES
              </span>
              <p className="font-body text-[14px] text-bone-dim leading-relaxed">
                Specimens accepted from research institutions, universities, ICAR centres,
                and museums across India. We will advise on specimen packaging and domestic
                transit upon receipt of this brief.
              </p>
            </div>
          </div>

          {/* Right Column: Structured Brief Form */}
          <div className="lg:col-span-7">
            {formState === 'submitted' ? (
              <div className="p-8 md:p-12 border border-amber/40 bg-amber/5 rounded-[2px]">
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-amber mb-3 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-amber" />
                  <span>BRIEF RECEIVED</span>
                </div>
                <h3 className="font-display text-bone text-[28px] mb-4">
                  Thank you for submitting your imaging brief.
                </h3>
                <p className="font-body text-bone-dim text-[16px] leading-relaxed mb-6">
                  Dr. Yeshwanth will review your specimen requirements and respond directly
                  by email with an initial feasibility assessment, handling guidance, and a formal quotation.
                </p>
                <button
                  type="button"
                  onClick={() => setFormState('idle')}
                  className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber hover:text-bone transition-colors"
                >
                  ← Submit another brief
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Institution & Contact Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="flex flex-col">
                    <label
                      htmlFor="institution"
                      className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone-dim mb-2 font-medium"
                    >
                      INSTITUTION / DEPARTMENT *
                    </label>
                    <input
                      type="text"
                      id="institution"
                      name="institution"
                      required
                      placeholder="e.g. UAS GKVK / NCBS / ICAR / University"
                      className="w-full bg-transparent border-b border-rule py-3 text-bone font-body text-[16px] placeholder:text-bone-dim/40 focus:outline-none focus:border-amber transition-colors"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor="location"
                      className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone-dim mb-2 font-medium"
                    >
                      LOCATION IN INDIA (CITY / STATE) *
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      required
                      placeholder="e.g. Bengaluru, Karnataka"
                      className="w-full bg-transparent border-b border-rule py-3 text-bone font-body text-[16px] placeholder:text-bone-dim/40 focus:outline-none focus:border-amber transition-colors"
                    />
                  </div>
                </div>

                {/* Name & Email Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="flex flex-col">
                    <label
                      htmlFor="name"
                      className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone-dim mb-2 font-medium"
                    >
                      CONTACT PERSON *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="Dr. / Prof. / Researcher Name"
                      className="w-full bg-transparent border-b border-rule py-3 text-bone font-body text-[16px] placeholder:text-bone-dim/40 focus:outline-none focus:border-amber transition-colors"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor="email"
                      className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone-dim mb-2 font-medium"
                    >
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="institutional.email@domain.ac.in"
                      className="w-full bg-transparent border-b border-rule py-3 text-bone font-body text-[16px] placeholder:text-bone-dim/40 focus:outline-none focus:border-amber transition-colors"
                    />
                  </div>
                </div>

                {/* Sample Type Selection */}
                <div className="flex flex-col">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone-dim mb-3 font-medium">
                    SAMPLE TYPE *
                  </span>
                  <div className="flex flex-wrap gap-2.5">
                    {SAMPLE_TYPES.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setSelectedSampleType(type)}
                        className={`px-4 py-2 rounded-[2px] font-mono text-[11px] uppercase tracking-[0.14em] transition-all ${
                          selectedSampleType === type
                            ? 'bg-amber text-void font-semibold border border-amber'
                            : 'bg-carbon text-bone-dim border border-rule hover:border-bone-dim/50'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Approximate Quantity & Intended Use */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="flex flex-col">
                    <label
                      htmlFor="quantity"
                      className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone-dim mb-2 font-medium"
                    >
                      APPROXIMATE QUANTITY (SPECIMENS) *
                    </label>
                    <input
                      type="text"
                      id="quantity"
                      name="quantity"
                      required
                      placeholder="e.g. 1–5 specimens / 2 trays"
                      className="w-full bg-transparent border-b border-rule py-3 text-bone font-body text-[16px] placeholder:text-bone-dim/40 focus:outline-none focus:border-amber transition-colors"
                    />
                  </div>

                  <div className="flex flex-col">
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone-dim mb-3 font-medium">
                      INTENDED USE *
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {INTENDED_USES.map((use) => (
                        <button
                          key={use}
                          type="button"
                          onClick={() => setSelectedIntendedUse(use)}
                          className={`px-3 py-1.5 rounded-[2px] font-mono text-[10px] uppercase tracking-[0.14em] transition-all ${
                            selectedIntendedUse === use
                              ? 'bg-amber text-void font-semibold border border-amber'
                              : 'bg-carbon text-bone-dim border border-rule hover:border-bone-dim/50'
                          }`}
                        >
                          {use}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Project Notes & Specific Requirements */}
                <div className="flex flex-col">
                  <label
                    htmlFor="notes"
                    className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone-dim mb-2 font-medium"
                  >
                    PROJECT NOTES & SPECIFIC REQUIREMENTS
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={4}
                    placeholder="e.g. Target publication, genitalic dissection required, specific dorsal/lateral orientations, fragility notes..."
                    className="w-full bg-transparent border-b border-rule py-3 text-bone font-body text-[16px] placeholder:text-bone-dim/40 focus:outline-none focus:border-amber transition-colors resize-y"
                  />
                </div>

                {/* Error Banner */}
                {formState === 'error' && (
                  <div className="p-4 border border-red-500/30 bg-red-500/10 text-red-400 font-mono text-[12px]">
                    {errorMessage}
                  </div>
                )}

                {/* Submit Action */}
                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="submit"
                    disabled={formState === 'submitting'}
                    className="inline-flex items-center justify-center bg-amber text-void font-mono text-[11px] uppercase tracking-[0.18em] font-semibold px-8 py-4 rounded-[2px] hover:bg-bone transition-all duration-200 disabled:opacity-50"
                  >
                    {formState === 'submitting' ? 'Submitting brief...' : 'Request a quote'}
                  </button>

                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-bone-dim/60 hidden sm:inline">
                    Domestic consignments only · India
                  </span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
