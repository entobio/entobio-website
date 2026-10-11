/**
 * src/components/home/Manifesto.tsx
 * ACT 4 — THE MANIFESTO — HOMEPAGE-BUILD-SPEC §6
 *
 * Full-bleed --void background. Pinned 300vh, scrubbed.
 * Faint, slowly rotating wing-venation macro at opacity: 0.06, blur: 2px, rotating 0 → 8deg.
 * Four lines enter and exit with focus-rack idiom (blur 10 → 0 → 10).
 * Final amber line lands and stays ("And almost nobody can still do it.").
 *
 * Progressive Enhancement:
 * Defaults to readable static flow stack. If GSAP fails or under prefers-reduced-motion,
 * renders as a clean vertical stack in flow — never an empty black void or collapsed stack.
 */

'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { resolveSrc } from '@/lib/media';
import { gsap, EASE } from '@/lib/gsap';
import { useGsapContext } from '@/hooks/useScrollTrigger';
import { COPY } from '@/content/copy';

const MANIFESTO_BG = resolveSrc('MANIFESTO-BG', 'DESCENT-04');

export function Manifesto() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLParagraphElement>(null);

  useGsapContext(() => {
    if (!containerRef.current || !textRef.current) return;

    // Subtle parallax on the background wing venation
    if (bgImageRef.current) {
      gsap.fromTo(
        bgImageRef.current,
        { scale: 1.05, opacity: 0.04, rotate: 0 },
        {
          scale: 1.15,
          opacity: 0.08,
          rotate: 4,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }

    // Majestic Focus-Rack entrance for the single statement
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
        end: 'center center',
        toggleActions: 'play none none reverse',
      },
    });

    if (tagRef.current) {
      tl.fromTo(
        tagRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
      );
    }

    tl.fromTo(
      textRef.current,
      { opacity: 0, y: 35, filter: 'blur(12px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1.2,
        ease: EASE.rack,
      },
      '-=0.5'
    );
  }, containerRef);

  return (
    <section
      ref={containerRef}
      id="manifesto"
      className="relative w-full bg-void min-h-[75vh] md:min-h-[85vh] flex items-center justify-center py-24 md:py-36 px-gutter overflow-hidden border-t border-b border-rule/50"
    >
      {/* Background Wing-Venation Macro Texture (opacity: 0.05) */}
      <div
        ref={bgImageRef}
        className="absolute inset-0 w-full h-full pointer-events-none filter blur-[1.5px]"
        aria-hidden="true"
      >
        {MANIFESTO_BG && (
          <Image
            src={MANIFESTO_BG}
            alt=""
            fill
            className="object-cover object-center"
          />
        )}
      </div>

      {/* Atmospheric radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(8,9,10,0.4) 0%, rgba(8,9,10,0.95) 75%)',
        }}
        aria-hidden="true"
      />

      {/* Content Container */}
      <div className="relative z-10 max-w-[1100px] mx-auto text-center flex flex-col items-center">
        {/* Eyebrow tag */}
        <p
          ref={tagRef}
          className="font-mono text-[11px] uppercase tracking-[0.22em] text-amber mb-8 md:mb-12 font-medium"
        >
          04 — THE TAXONOMIC IMPERATIVE
        </p>

        {/* The Single Retained Statement — PDF Page 4 & 5 */}
        <h2
          ref={textRef}
          className="font-display text-[#F7F5F0] text-center leading-[1.02] tracking-[-0.03em] max-w-[960px] drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]"
          style={{
            fontSize: 'clamp(2.5rem, 5.5vw, 5.2rem)',
          }}
        >
          &ldquo;{COPY.manifesto.statement}&rdquo;
        </h2>

        {/* Decorative precision caliper line */}
        <div className="mt-10 md:mt-14 flex items-center justify-center gap-4 w-full max-w-[280px]">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-amber/60" />
          <span className="w-1.5 h-1.5 rounded-full bg-amber" />
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-amber/60" />
        </div>

        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone-dim mt-5">
          ENTOMOLOGICAL CONSERVATION &amp; NOMENCLATURE
        </p>
      </div>
    </section>
  );
}
