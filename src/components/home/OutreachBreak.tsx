/**
 * src/components/home/OutreachBreak.tsx
 * ACT 6 — OUTREACH · THE LIGHT BREAK — HOMEPAGE-BUILD-SPEC §8
 *
 * The ONLY light section on the page.
 * Background: --bone (#F2EDE3), full-bleed, with soft --moss → --forest radial in lower right at 22%.
 * Text inverts to --void on bone.
 * Initial state is explicitly --bone so text is 17.5:1 contrast from frame one.
 * Smooth background-color transition back out to --void on exit scrub.
 */

'use client';

import { useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { useGsapContext } from '@/hooks/useScrollTrigger';
import { COPY } from '@/content/copy';
import { Button } from '@/components/ui/Button';

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function OutreachBreak() {
  const sectionRef = useRef<HTMLElement>(null);

  useGsapContext(() => {
    if (!sectionRef.current) return;
    const reduced = prefersReducedMotion();

    if (reduced) {
      gsap.set(sectionRef.current, { backgroundColor: '#F2EDE3' });
      return;
    }

    // Set initial background explicitly to --bone for 100% legibility from frame one
    gsap.set(sectionRef.current, { backgroundColor: '#F2EDE3' });

    // Transition background color back out to --void (#08090A) as section exits
    gsap.to(sectionRef.current, {
      backgroundColor: '#08090A',
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'bottom 75%',
        end: 'bottom 15%',
        scrub: 1,
      },
    });
  }, sectionRef);

  return (
    <section
      ref={sectionRef}
      id="outreach"
      className="relative w-full py-[120px] md:py-[180px] px-gutter overflow-hidden transition-colors"
      style={{ backgroundColor: '#F2EDE3' }}
    >
      {/* Soft --moss → --forest radial gradient overlay in lower right at 22% opacity */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(circle at 85% 85%, rgba(107, 143, 62, 0.22) 0%, rgba(30, 86, 49, 0.22) 45%, transparent 75%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1560px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Headline, Body, CTA */}
        <div className="lg:col-span-8 flex flex-col items-start">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-void/70 mb-4 font-semibold">
            06 — OUTREACH
          </p>

          <h2
            className="font-display text-void mb-8"
            style={{
              fontSize: 'var(--t-display)',
              lineHeight: 0.88,
              letterSpacing: '-0.03em',
            }}
          >
            {COPY.outreach.headline}
          </h2>

          <p className="font-body text-void/85 text-[16px] leading-relaxed max-w-[580px] mb-10">
            {COPY.outreach.body}
          </p>

          <Button variant="inverted" href="/contact">
            {COPY.outreach.cta}
          </Button>
        </div>

        {/* Right Column: Key Commitments */}
        <div className="lg:col-span-4 flex flex-col space-y-6 lg:border-l lg:border-void/15 lg:pl-10">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-void/60 block mb-1">
              FOCUS REGION
            </span>
            <p className="font-body text-[15px] text-void font-medium">
              Rural Karnataka & Government Schools
            </p>
          </div>
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-void/60 block mb-1">
              FEE STRUCTURE
            </span>
            <p className="font-body text-[15px] text-void font-medium">
              Offered Free of Charge
            </p>
          </div>
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-void/60 block mb-1">
              PROGRAMMES
            </span>
            <p className="font-body text-[15px] text-void font-medium">
              Exhibitions · Teacher Training · Field Walks
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
