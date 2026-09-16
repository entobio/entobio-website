/**
 * src/components/home/OutreachBreak.tsx
 * ACT 6 — OUTREACH · THE LIGHT BREAK — HOMEPAGE-BUILD-SPEC §8
 *
 * The ONLY light section on the page.
 * Background: --bone, full-bleed, with soft --moss → --forest radial in lower right at 22%.
 * Text inverts to --void on bone.
 * Smooth background-color transition into and out of section across a ScrollTrigger scrub.
 * Illustrated leafhopper mascot on right with gentle spring entrance and ±8px drift on 6s loop.
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

/** Vector Leafhopper Mascot Illustration — Monograph Line Art Style */
function LeafhopperMascot() {
  return (
    <svg
      viewBox="0 0 320 320"
      className="w-[240px] h-[240px] md:w-[320px] md:h-[320px] text-void overflow-visible"
      aria-hidden="true"
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Antennae */}
        <path d="M 145 60 C 130 30, 110 20, 90 15" strokeDasharray="3 3" />
        <path d="M 175 60 C 190 30, 210 20, 230 15" strokeDasharray="3 3" />

        {/* Head & Pronotum */}
        <path d="M 130 75 C 130 55, 190 55, 190 75 L 205 105 L 115 105 Z" fill="rgba(30, 86, 49, 0.08)" />

        {/* Compound Eyes */}
        <circle cx="125" cy="70" r="10" fill="currentColor" />
        <circle cx="195" cy="70" r="10" fill="currentColor" />

        {/* Scutellum (Triangle) */}
        <polygon points="160,105 130,140 190,140" fill="rgba(107, 143, 62, 0.18)" />

        {/* Forewings / Hemelytra */}
        <path d="M 130 140 L 95 240 C 90 270, 150 290, 160 295 C 170 290, 230 270, 225 240 L 190 140 Z" fill="rgba(30, 86, 49, 0.05)" />

        {/* Wing Venation details */}
        <path d="M 160 140 L 160 295" strokeWidth="1" strokeDasharray="4 4" />
        <path d="M 145 180 C 120 200, 110 230, 120 265" strokeWidth="1" />
        <path d="M 175 180 C 200 200, 210 230, 200 265" strokeWidth="1" />
        <path d="M 130 140 C 110 180, 100 220, 110 260" strokeWidth="1" />
        <path d="M 190 140 C 210 180, 220 220, 210 260" strokeWidth="1" />

        {/* Legs (Thoracic Apendages) */}
        <path d="M 120 110 L 80 130 L 65 170" strokeWidth="1.75" />
        <path d="M 200 110 L 240 130 L 255 170" strokeWidth="1.75" />
        <path d="M 115 130 L 70 160 L 55 210" strokeWidth="1.75" />
        <path d="M 205 130 L 250 160 L 265 210" strokeWidth="1.75" />
        <path d="M 140 150 L 85 200 L 70 270" strokeWidth="2" />
        <path d="M 180 150 L 235 200 L 250 270" strokeWidth="2" />

        {/* Tibial Spines (characteristic of Cicadellidae) */}
        <line x1="77" y1="220" x2="71" y2="223" strokeWidth="1.5" />
        <line x1="75" y1="235" x2="69" y2="238" strokeWidth="1.5" />
        <line x1="73" y1="250" x2="67" y2="253" strokeWidth="1.5" />
        <line x1="243" y1="220" x2="249" y2="223" strokeWidth="1.5" />
        <line x1="245" y1="235" x2="251" y2="238" strokeWidth="1.5" />
        <line x1="247" y1="250" x2="253" y2="253" strokeWidth="1.5" />
      </g>
    </svg>
  );
}

export function OutreachBreak() {
  const sectionRef = useRef<HTMLElement>(null);
  const mascotRef = useRef<HTMLDivElement>(null);

  useGsapContext(() => {
    if (!sectionRef.current) return;
    const reduced = prefersReducedMotion();

    if (reduced) {
      gsap.set(sectionRef.current, { backgroundColor: '#F2EDE3' });
      return;
    }

    // Scrub 1: Transition background color into --bone (#F2EDE3) as section enters
    gsap.fromTo(
      sectionRef.current,
      { backgroundColor: '#08090A' },
      {
        backgroundColor: '#F2EDE3',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          end: 'top 25%',
          scrub: 1,
        },
      }
    );

    // Scrub 2: Transition background color back out to --void (#08090A) as section exits
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

    // Mascot Spring Entrance Animation
    if (mascotRef.current) {
      gsap.fromTo(
        mascotRef.current,
        { scale: 0.75, opacity: 0, y: 30 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Continuous ±8px floating drift loop (6s period)
      gsap.to(mascotRef.current, {
        y: -8,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    }
  }, sectionRef);

  return (
    <section
      ref={sectionRef}
      id="outreach"
      className="relative w-full py-[120px] md:py-[180px] px-gutter overflow-hidden transition-colors"
      style={{ backgroundColor: 'var(--void)' }}
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
        <div className="lg:col-span-7 flex flex-col items-start">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-void/60 mb-4 font-semibold">
            04 — OUTREACH
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

          <p className="font-body text-void/80 text-[16px] leading-relaxed max-w-[460px] mb-10">
            {COPY.outreach.body}
          </p>

          <Button variant="inverted" href="/contact">
            {COPY.outreach.cta}
          </Button>
        </div>

        {/* Right Column: Illustrated Leafhopper Mascot */}
        <div className="lg:col-span-5 flex items-center justify-center lg:justify-end">
          <div ref={mascotRef} className="will-change-transform">
            <LeafhopperMascot />
          </div>
        </div>
      </div>
    </section>
  );
}
