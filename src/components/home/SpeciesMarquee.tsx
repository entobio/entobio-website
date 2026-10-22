/**
 * src/components/home/SpeciesMarquee.tsx
 * ACT 3 — "ONE HUNDRED AND FIFTY" — HOMEPAGE-BUILD-SPEC §5
 * Rebuilt as Publications Marquee + Separate Eponymous Honours Block — FACTS.md §1, §2, §3, §4
 *
 * Header: "One hundred and fifty species." The papers are the evidence for that number.
 * Honours Block: The three eponymous taxa conferred by colleagues, amber border, NAMED IN HIS HONOUR.
 * Marquee: Thirty-two accession cards (31 papers + 1 book) in 3 alternating tracks.
 * Pause-on-hover & keyboard-focusable with tabIndex={0}.
 */

'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useLenis } from 'lenis/react';
import { gsap } from '@/lib/gsap';
import { COPY } from '@/content/copy';
import { PUBLICATIONS, EPONYMOUS, type Publication, type EponymousTaxon } from '@/content/publications';
import { Binomial } from '@/components/ui/Binomial';
import { PublicationTitle } from '@/components/ui/PublicationTitle';

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

const CARD_W = 340;
const CARD_H = 260;

const EPONYMOUS_DETAILS: Record<string, { common: string; dedication: string }> = {
  Evacanthus: {
    common: 'Leafhopper',
    dedication: 'Named by Viraktamath & Webb',
  },
  Oryctopterus: {
    common: 'Jerusalem Cricket',
    dedication: 'Named by Hiremath & Prathapan',
  },
  Axiagastus: {
    common: 'Shield Bug',
    dedication: 'Named by Salini',
  },
};

/**
 * Eponymous Taxon Card — PDF Page 1 revision
 * Authentic typographic specimen accession card.
 * Mismatched insect photographs are completely omitted per client instruction.
 */
function EponymousCard({ taxon, index }: { taxon: EponymousTaxon; index: number }) {
  const details = EPONYMOUS_DETAILS[taxon.genus];

  return (
    <article
      tabIndex={0}
      className="group relative flex flex-col justify-between bg-carbon/80 p-6 md:p-7 border border-rule hover:border-amber/80 rounded-[2px] transition-all duration-300 hover:bg-carbon-lift focus-visible:outline-1 focus-visible:outline-amber shadow-lg"
    >
      <header className="flex items-center justify-between pb-3 border-b border-rule">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber shrink-0 animate-pulse" aria-hidden="true" />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber font-semibold">
            {COPY.eponymous.caption}
          </span>
        </div>
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone-faint">
          0{index + 1}
        </span>
      </header>

      {/* Specimen Viewport Aperture — Authentic museum-grade typographic cartouche */}
      <div className="relative my-4 w-full h-[180px] bg-void/90 border border-rule/60 rounded-[2px] overflow-hidden flex flex-col items-center justify-center p-5 text-center group-hover:border-amber/50 transition-colors">
        {/* Optical graticule crosshairs and reticle circle */}
        <div className="absolute inset-0 pointer-events-none opacity-20 group-hover:opacity-30 transition-opacity" aria-hidden="true">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-amber/50 -translate-x-1/2" />
          <div className="absolute top-1/2 left-0 right-0 h-px bg-amber/50 -translate-y-1/2" />
          <div className="absolute inset-4 border border-rule/50 rounded-full" />
          <div className="absolute inset-8 border border-amber/20 rounded-full" />
        </div>

        {/* Specimen metadata overlay */}
        <div className="relative z-10 space-y-1.5">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-amber font-semibold block">
            {details?.common ?? 'Taxon Record'} · {taxon.family}
          </span>

          <Binomial
            genus={taxon.genus}
            species={taxon.species}
            className="block text-[#F7F5F0] text-[1.55rem] md:text-[1.8rem] leading-[1.1] tracking-[-0.02em] font-medium"
          />

          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-bone-dim pt-1">
            {details?.dedication ?? 'Named in Honour'}
          </p>
        </div>
      </div>

      <footer className="pt-3 border-t border-rule flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-bone-dim">
        <span className="text-[#E8E4DC] font-medium">{taxon.family}</span>
        <span className="text-amber text-[10px] font-semibold tracking-[0.16em]">EPONYMOUS</span>
      </footer>
    </article>
  );
}

/**
 * Publication Marquee Card — FACTS.md §4
 * Subject line in Instrument Serif, journal and volume in mono, year in amber.
 * Keyboard-focusable with tabIndex={0}.
 */
function PublicationCard({
  pub,
  accession,
  onFocus,
  onBlur,
}: {
  pub: Publication;
  accession: number;
  onFocus?: () => void;
  onBlur?: () => void;
}) {
  return (
    <article
      tabIndex={0}
      onFocus={onFocus}
      onBlur={onBlur}
      className="group relative flex flex-col flex-shrink-0 justify-between overflow-hidden bg-carbon p-6 border border-rule transition-colors duration-[400ms] hover:border-rule-strong hover:bg-carbon-lift focus-visible:outline-1 focus-visible:outline-amber"
      style={{
        width: `${CARD_W}px`,
        height: `${CARD_H}px`,
        borderRadius: '2px',
        transitionTimingFunction: 'var(--ease-cubic)',
      }}
    >
      {/* Top row: Accession number + Year in amber */}
      <header className="flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone-faint">
          ⌗ {String(accession).padStart(3, '0')}
        </span>
        <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-amber font-semibold">
          {pub.year}
        </span>
      </header>

      {/* Middle: Subject line / title in Instrument Serif with italicised genus */}
      <div
        className="flex-1 flex flex-col justify-center my-3 transition-transform duration-[400ms] group-hover:translate-x-[4px]"
        style={{ transitionTimingFunction: 'var(--ease-cubic)' }}
      >
        <h3
          className="font-display text-bone leading-[1.1] tracking-[-0.02em]"
          style={{
            fontSize: 'clamp(1.35rem, 2.2vw, 1.65rem)',
          }}
        >
          <PublicationTitle title={pub.title} isBook={pub.isBook} />
        </h3>
      </div>

      {/* Bottom row: Journal & volume in mono */}
      <footer className="pt-3 border-t border-rule font-mono text-[11px] uppercase tracking-[0.18em] text-bone-dim flex items-center justify-between">
        <span className="truncate mr-2">
          {pub.journal}
          {pub.volume ? ` · ${pub.volume}` : ''}
        </span>
        {pub.isBook && (
          <span className="text-[10px] text-amber/80 flex-shrink-0">BOOK</span>
        )}
      </footer>
    </article>
  );
}

export function SpeciesMarquee() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tweensRef = useRef<gsap.core.Tween[]>([]);
  const [isPaused, setIsPaused] = useState(false);

  // Map 32 publications with accession index
  const entries = PUBLICATIONS.map((pub, i) => ({ pub, accession: i + 1 }));

  // Split across 3 rows for desktop
  const itemsPerRow = Math.ceil(entries.length / 3);
  const row1Data = entries.slice(0, itemsPerRow);
  const row2Data = entries.slice(itemsPerRow, itemsPerRow * 2);
  const row3Data = entries.slice(itemsPerRow * 2);

  // Triple items for seamless linear loop
  const rows = [
    { data: [...row1Data, ...row1Data, ...row1Data], dir: -1, speed: 0.55 },
    { data: [...row2Data, ...row2Data, ...row2Data], dir: 1, speed: 0.40 },
    { data: [...row3Data, ...row3Data, ...row3Data], dir: -1, speed: 0.70 },
  ];

  useEffect(() => {
    const reduced = prefersReducedMotion();
    if (reduced) return;

    const rowsConfig = [
      { dir: -1, speed: 0.55 },
      { dir: 1, speed: 0.40 },
      { dir: -1, speed: 0.70 },
    ];

    tweensRef.current = [];

    const ctx = gsap.context(() => {
      rowRefs.current.forEach((el, index) => {
        if (!el) return;
        const r = rowsConfig[index];

        const fromX = r.dir === -1 ? 0 : -50;
        const toX = r.dir === -1 ? -50 : 0;
        const baseDuration = 45 / r.speed;

        const tween = gsap.fromTo(
          el,
          { xPercent: fromX },
          {
            xPercent: toX,
            duration: baseDuration,
            ease: 'none',
            repeat: -1,
          }
        );

        tweensRef.current.push(tween);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Pause / resume helpers
  const handlePause = () => {
    setIsPaused(true);
    tweensRef.current.forEach((t) => t.pause());
  };

  const handleResume = () => {
    setIsPaused(false);
    tweensRef.current.forEach((t) => t.resume());
  };

  // Hook row timeScale to Lenis scroll velocity
  useLenis(({ velocity }) => {
    if (!tweensRef.current.length || prefersReducedMotion() || isPaused) return;
    const targetTimeScale = 1 + Math.min(Math.abs(velocity) * 0.12, 3.2);

    gsap.to(tweensRef.current, {
      timeScale: targetTimeScale,
      duration: 0.5,
      overwrite: true,
    });
  });

  return (
    <section
      ref={sectionRef}
      id="marquee"
      className="relative bg-void py-[120px] overflow-hidden"
    >
      {/* Section Header */}
      <div className="px-gutter mb-[60px] max-w-[1560px] mx-auto">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone-dim mb-4">
          {COPY.marquee.index}
        </p>
        <h2
          className="font-display text-bone mb-6"
          style={{
            fontSize: 'var(--t-display)',
            lineHeight: 0.88,
            letterSpacing: '-0.03em',
          }}
        >
          {COPY.marquee.headline.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h2>
        <p className="font-body text-bone-dim text-[15px] max-w-[420px] leading-relaxed">
          {COPY.marquee.body.join(' ')}
        </p>
      </div>

      {/* Distinct Eponymous Taxa Block — PDF Page 2 */}
      <div className="px-gutter mb-16 max-w-[1560px] mx-auto">
        <div className="border border-amber/40 bg-carbon/50 p-6 md:p-8 rounded-[2px] shadow-2xl">
          <div className="mb-6 flex flex-col md:flex-row md:items-baseline justify-between gap-3 pb-4 border-b border-rule">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber font-semibold">
                {COPY.eponymous.caption}
              </p>
              <h3 className="font-display text-[1.5rem] md:text-[2rem] text-bone mt-1">
                Eponymous Taxa
              </h3>
            </div>
            <p className="font-body text-bone-dim text-[13px] max-w-[500px]">
              {COPY.eponymous.explainer}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {EPONYMOUS.map((taxon, i) => (
              <EponymousCard key={taxon.genus} taxon={taxon} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* Publications Marquee Section Header & Bridge */}
      <div className="px-gutter mb-6 max-w-[1560px] mx-auto flex items-end justify-between">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber font-semibold">
            TAXONOMIC ARCHIVE
          </span>
          <h3 className="font-display text-[1.5rem] md:text-[2rem] text-bone mt-1">
            Revisional Papers &amp; New Taxa
          </h3>
        </div>
        <Link
          href="/publications"
          className="hidden sm:inline-flex items-center gap-2 border border-rule px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-bone-dim hover:text-amber hover:border-amber transition-colors rounded-[2px]"
        >
          <span>Explore All 36 Publications</span>
          <span>→</span>
        </Link>
      </div>

      {/* Publications Marquee Rows — Pause-on-hover & Keyboard-focusable */}
      <div
        className="flex flex-col gap-8 w-full"
        onMouseEnter={handlePause}
        onMouseLeave={handleResume}
      >
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={`overflow-hidden w-full select-none ${
              rowIndex > 0 ? 'hidden md:block' : ''
            }`}
          >
            <div
              ref={(el) => {
                rowRefs.current[rowIndex] = el;
              }}
              className="flex gap-6 w-max"
            >
              {row.data.map((entry, itemIndex) => (
                <PublicationCard
                  key={`${rowIndex}-${itemIndex}-${entry.accession}`}
                  pub={entry.pub}
                  accession={entry.accession}
                  onFocus={handlePause}
                  onBlur={handleResume}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
