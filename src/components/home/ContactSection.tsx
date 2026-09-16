/**
 * src/components/home/ContactSection.tsx
 * ACT 8 / CLOSING — CONTACT — HOMEPAGE-BUILD-SPEC §9
 *
 * Contact block: display headline ("Have something you can't identify?"), specimen filtering body line,
 * three underline-only fields (Name, Email, Message) with mono labels, amber submit button.
 * Web3Forms client-side handling.
 */

'use client';

import { useState } from 'react';
import { COPY } from '@/content/copy';
import { Button } from '@/components/ui/Button';

export function ContactSection() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'submitted' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

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

    const formData = new FormData(e.currentTarget);
    formData.append('access_key', key);
    formData.append('subject', 'New Specimen Enquiry — EntoBio Consult');

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
    <section id="contact" className="w-full bg-void pt-[80px] pb-[120px] md:pb-[180px] border-t border-rule">
      <div className="max-w-[1560px] mx-auto px-gutter">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Headline & Specimen Notice */}
          <div className="lg:col-span-5 flex flex-col">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone-dim mb-4 font-semibold">
              08 — CONTACT
            </p>
            <h2
              className="font-display text-bone mb-6"
              style={{
                fontSize: 'var(--t-display)',
                lineHeight: 0.88,
                letterSpacing: '-0.03em',
              }}
            >
              {COPY.contact.headline}
            </h2>
            <p className="font-body text-bone-dim text-[15px] leading-relaxed max-w-[480px]">
              {COPY.contact.body}
            </p>
          </div>

          {/* Right Column: Three-Field Underline Form */}
          <div className="lg:col-span-7 lg:pl-12">
            {formState === 'submitted' ? (
              <div className="p-8 border border-amber/40 bg-amber/5 rounded-[2px]">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber mb-2">
                  ENQUIRY RECEIVED
                </p>
                <p className="font-body text-bone text-[16px]">
                  {COPY.contact.confirmation}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Name Field */}
                <div className="flex flex-col">
                  <label
                    htmlFor="name"
                    className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone-dim mb-2"
                  >
                    {COPY.contact.fields[0]}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Dr. Jane Doe"
                    className="w-full bg-transparent border-b border-rule py-3 text-bone font-body text-[16px] placeholder:text-bone-dim/40 focus:outline-none focus:border-amber transition-colors"
                  />
                </div>

                {/* Email Field */}
                <div className="flex flex-col">
                  <label
                    htmlFor="email"
                    className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone-dim mb-2"
                  >
                    {COPY.contact.fields[1]}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="jane.doe@institution.org"
                    className="w-full bg-transparent border-b border-rule py-3 text-bone font-body text-[16px] placeholder:text-bone-dim/40 focus:outline-none focus:border-amber transition-colors"
                  />
                </div>

                {/* Message Field */}
                <div className="flex flex-col">
                  <label
                    htmlFor="message"
                    className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone-dim mb-2"
                  >
                    {COPY.contact.fields[2]}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    placeholder="Describe the specimen, locality, or research requirement..."
                    className="w-full bg-transparent border-b border-rule py-3 text-bone font-body text-[16px] placeholder:text-bone-dim/40 focus:outline-none focus:border-amber transition-colors resize-none"
                  />
                </div>

                {formState === 'error' && (
                  <p className="font-mono text-[11px] uppercase text-amber">
                    {errorMessage}
                  </p>
                )}

                <div className="pt-4">
                  <Button variant="primary" type="submit" disabled={formState === 'submitting'}>
                    {formState === 'submitting' ? 'Sending...' : COPY.contact.cta}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
