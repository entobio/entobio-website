/**
 * src/components/layout/Footer.tsx
 * FOOTER — HOMEPAGE-BUILD-SPEC §10
 *
 * --void background, hairline top.
 * Three columns of mono links / contact (city level only) / academic IDs.
 * Giant wordmark ENTOBIO CONSULT at 15vw / 0.07 opacity clipped by viewport bottom, rising y: 60 → 0 across last 40vh.
 * Credit line: SITE BY BUILDROCKET LABS.
 */

'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { gsap } from '@/lib/gsap';
import { useGsapContext } from '@/hooks/useScrollTrigger';
import { SITE } from '@/lib/site';

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const wordmarkRef = useRef<HTMLHeadingElement>(null);

  useGsapContext(() => {
    if (!footerRef.current || !wordmarkRef.current) return;
    const reduced = prefersReducedMotion();

    if (reduced) {
      gsap.set(wordmarkRef.current, { y: 0, opacity: 0.07 });
      return;
    }

    // Wordmark rises y: 60 → 0 over the last 40vh on scroll
    gsap.fromTo(
      wordmarkRef.current,
      { y: 60 },
      {
        y: 0,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 80%',
          end: 'bottom bottom',
          scrub: 1,
        },
      }
    );
  }, footerRef);

  return (
    <footer
      ref={footerRef}
      className="relative w-full bg-void border-t border-rule pt-20 overflow-hidden"
    >
      <div className="max-w-[1560px] mx-auto px-gutter relative z-10">
        {/* Three Columns of Mono Info & Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 mb-20 font-mono text-[11px] uppercase tracking-[0.18em] text-bone-dim">
          {/* Column 1: Navigation Links */}
          <div className="flex flex-col space-y-3">
            <span className="text-amber text-[10px] mb-1 font-semibold">NAVIGATION</span>
            <Link href="/#marquee" className="hover:text-bone transition-colors duration-200">
              Catalogue
            </Link>
            <Link href="/services" className="hover:text-bone transition-colors duration-200">
              Services &amp; Capabilities
            </Link>
            <Link href="/imaging" className="hover:text-bone transition-colors duration-200">
              Scientific Imaging
            </Link>
            <Link href="/publications" className="hover:text-bone transition-colors duration-200">
              Publications
            </Link>
            <Link href="/outreach" className="hover:text-bone transition-colors duration-200">
              Outreach &amp; Education
            </Link>
            <Link href="/merchandise" className="hover:text-bone transition-colors duration-200">
              Merchandise &amp; Gear
            </Link>
            <Link href="/clients" className="hover:text-bone transition-colors duration-200">
              Clients &amp; Feedback
            </Link>
            <Link href="/news" className="hover:text-bone transition-colors duration-200">
              News &amp; Invited Talks
            </Link>
            <Link href="/about" className="hover:text-bone transition-colors duration-200">
              About Founder
            </Link>
          </div>

          {/* Column 2: Locality & Contact */}
          <div className="flex flex-col space-y-3">
            <span className="text-bone-dim text-[10px] mb-1 font-semibold">LOCATION & CONTACT</span>
            <p className="text-bone/90">
              {SITE.locality}, {SITE.region}, {SITE.country}
            </p>
            <a
              href={`mailto:${SITE.email}`}
              className="hover:text-bone transition-colors duration-200 lowercase tracking-normal"
            >
              {SITE.email}
            </a>
          </div>

          {/* Column 3: Academic Profiles */}
          <div className="flex flex-col space-y-3">
            <span className="text-bone-dim text-[10px] mb-1 font-semibold">ACADEMIC PROFILES</span>
            <a
              href={`https://orcid.org/${SITE.orcid}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-bone transition-colors duration-200"
            >
              ORCID: {SITE.orcid}
            </a>
            <a
              href={SITE.researchGate}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-bone transition-colors duration-200"
            >
              ResearchGate
            </a>
            <a
              href={SITE.scholar}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-bone transition-colors duration-200"
            >
              Google Scholar
            </a>
          </div>
        </div>

        {/* Credit Line, Colophon & Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-6 border-t border-rule font-mono text-[10px] uppercase tracking-[0.18em] text-bone-dim text-center md:text-left">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p>Typeset in Instrument Serif, Inter Tight &amp; Geist Mono</p>
          <a
            href={SITE.builtBy.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber transition-colors duration-200"
          >
            SITE BY BUILDROCKET LABS
          </a>
        </div>
      </div>

      {/* Giant Wordmark ENTOBIO CONSULT at 15vw / 0.07 opacity clipped by viewport bottom */}
      <div className="w-full overflow-hidden leading-none select-none pointer-events-none flex justify-center -mb-[3vw]">
        <h2
          ref={wordmarkRef}
          className="font-display text-bone opacity-[0.07] tracking-[-0.04em] whitespace-nowrap"
          style={{
            fontSize: '15vw',
            lineHeight: 0.75,
          }}
        >
          ENTOBIO CONSULT
        </h2>
      </div>
    </footer>
  );
}
