/**
 * src/components/imaging/ImagingHero.tsx
 * HERO — IMAGING-PAGE-SPEC.md §3.1 & FACTS.md §7
 *
 * Full-width, --void. Dark, quiet, confident.
 * Static darkened background. No synthetic equipment claims.
 * Scope: Indian institutions only (universities, museums, ICAR institutes, research labs).
 */

import Image from 'next/image';
import Link from 'next/link';

export function ImagingHero() {
  return (
    <section className="relative w-full min-h-[85vh] flex items-center bg-void overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      {/* Static Darkened Optical / Specimen Backdrop */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-15 overflow-hidden">
        <Image
          src="/media/descent/descent-04.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center filter grayscale contrast-125"
        />
        {/* Subtle vignette and gradient fades to --void */}
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-void via-transparent to-void" />
      </div>

      <div className="relative z-10 w-full max-w-[1560px] mx-auto px-gutter">
        <div className="max-w-[880px]">
          {/* Breadcrumb / Category Tag */}
          <div className="flex items-center gap-3 mb-6">
            <Link
              href="/services"
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone-dim hover:text-amber transition-colors"
            >
              ← Services
            </Link>
            <span className="text-rule text-[11px]">/</span>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber font-semibold">
              SCIENTIFIC IMAGING
            </span>
          </div>

          {/* Display Headline */}
          <h1
            className="font-display text-bone mb-8"
            style={{
              fontSize: 'clamp(2.8rem, 6.5vw, 6rem)',
              lineHeight: 0.95,
              letterSpacing: '-0.025em',
            }}
          >
            Sharper than
            <br />
            the eye can focus.
          </h1>

          {/* Body Copy — Indian Institutions Scope (FACTS.md §7) */}
          <p className="font-body text-bone-dim text-[16px] md:text-[18px] leading-relaxed max-w-[580px] mb-10">
            Focus-stacked macro and micro imaging for publication, type documentation,
            and collection digitisation. Available for research institutions,
            museums and universities across India.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#enquiry"
              className="inline-flex items-center justify-center bg-amber text-void font-mono text-[11px] uppercase tracking-[0.18em] font-semibold px-7 py-3.5 rounded-[2px] hover:bg-bone transition-all duration-200"
            >
              Request a Quote
            </a>
            <a
              href="#services-index"
              className="inline-flex items-center justify-center border border-rule text-bone-dim hover:text-bone hover:border-bone font-mono text-[11px] uppercase tracking-[0.18em] px-6 py-3.5 rounded-[2px] transition-all duration-200"
            >
              Explore Services Index ↓
            </a>
          </div>

          {/* Scope indicator pill */}
          <div className="mt-12 inline-flex items-center gap-2.5 border border-rule bg-carbon/60 px-3.5 py-1.5 rounded-[2px]">
            <span className="w-1.5 h-1.5 rounded-full bg-amber" />
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-bone-dim">
              Domestic specimen intake: Indian research institutions & universities
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
