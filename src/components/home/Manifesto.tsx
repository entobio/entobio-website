/**
 * src/components/home/Manifesto.tsx
 * ACT 4 — THE MANIFESTO — HOMEPAGE-BUILD-SPEC §6
 *
 * Full-bleed --void background. Pinned 300vh, scrubbed.
 * Faint, slowly rotating wing-venation macro at opacity: 0.06, blur: 2px, rotating 0 → 8deg.
 * Four lines enter and exit with focus-rack idiom (blur 10 → 0 → 10).
 * Final amber line lands and stays ("And almost nobody can still do it.").
 */

'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { resolveSrc } from '@/lib/media';
import { gsap, EASE } from '@/lib/gsap';
import { useGsapContext } from '@/hooks/useScrollTrigger';
import { COPY } from '@/content/copy';

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Backdrop texture — the dedicated MANIFESTO-BG slot when it is generated,
 * falling back to DESCENT-04 (wing venation) until then. Renders at 0.06
 * opacity; both are §4.1 generated texture, no scientific claim.
 */
const MANIFESTO_BG = resolveSrc('MANIFESTO-BG', 'DESCENT-04');

export function Manifesto() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  const allLines = [...COPY.manifesto.lines, COPY.manifesto.finalLine];

  useGsapContext(() => {
    if (!containerRef.current || !pinRef.current) return;

    const reduced = prefersReducedMotion();

    // Reduced motion fallback: unpinned static layout
    if (reduced) {
      gsap.set(pinRef.current, { position: 'relative', height: 'auto', padding: '120px 40px' });
      lineRefs.current.forEach((el, i) => {
        if (!el) return;
        const isFinal = i === allLines.length - 1;
        gsap.set(el, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          color: isFinal ? '#D89A3E' : '#F2EDE3',
        });
      });
      return;
    }

    // Wing venation background rotation (0 → 8deg across 300vh scrub)
    if (bgImageRef.current) {
      gsap.fromTo(
        bgImageRef.current,
        { rotate: 0 },
        {
          rotate: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
          },
        }
      );
    }

    // Pinned Timeline for the 5 manifesto lines
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        pin: pinRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      },
    });

    const totalLines = allLines.length; // 5 lines
    const stepDuration = 1 / totalLines; // 0.2 per line

    allLines.forEach((_, i) => {
      const el = lineRefs.current[i];
      if (!el) return;

      const startTime = i * stepDuration;
      const isFinalLine = i === totalLines - 1;

      // Focus-rack Entrance: y: 30, opacity: 0, blur: 10px → y: 0, opacity: 1, blur: 0px
      tl.fromTo(
        el,
        { y: 30, opacity: 0, filter: 'blur(10px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: stepDuration * 0.45,
          ease: EASE.rack,
        },
        startTime
      );

      // Focus-rack Exit for lines 1-4: y: 0, opacity: 1, blur: 0px → y: -30, opacity: 0, blur: 10px
      // Line 5 (final amber line) stays on screen!
      if (!isFinalLine) {
        tl.to(
          el,
          {
            y: -30,
            opacity: 0,
            filter: 'blur(10px)',
            duration: stepDuration * 0.45,
            ease: EASE.rack,
          },
          startTime + stepDuration * 0.55
        );
      }
    });
  }, containerRef);

  return (
    <section
      ref={containerRef}
      id="manifesto"
      className="relative w-full bg-void"
      style={{ height: '300vh' }}
    >
      {/* Pinned Viewport Container */}
      <div
        ref={pinRef}
        className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-void flex items-center justify-center"
      >
        {/* Background Wing-Venation Macro Image (opacity: 0.06, blur: 2px, rotating 0→8deg) */}
        <div
          ref={bgImageRef}
          className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.06] filter blur-[2px] scale-110"
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

        {/* Centered Manifesto Lines */}
        <div className="relative z-10 max-w-[1200px] w-full px-gutter text-center flex flex-col items-center justify-center min-h-[300px]">
          {allLines.map((line, i) => {
            const isFinal = i === allLines.length - 1;

            return (
              <p
                key={i}
                ref={(el) => {
                  lineRefs.current[i] = el;
                }}
                className={`font-display absolute text-center leading-[0.92] tracking-[-0.03em] ${
                  isFinal ? 'text-amber font-semibold' : 'text-bone'
                }`}
                style={{
                  fontSize: 'var(--t-section)',
                  maxWidth: '900px',
                }}
              >
                {line}
              </p>
            );
          })}
        </div>
      </div>
    </section>
  );
}
