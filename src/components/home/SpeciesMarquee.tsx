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

/**
 * Eponymous Taxon Card — FACTS.md §2
 * Amber border, NAMED IN HIS HONOUR, no authority string.
 */
function EponymousCard({ taxon, index }: { taxon: EponymousTaxon; index: number }) {
  return (
    <article
      tabIndex={0}
      className="group relative flex flex-col justify-between bg-carbon p-6 md:p-7 border border-amber rounded-[2px] transition-colors duration-300 hover:bg-carbon-lift focus-visible:outline-1 focus-visible:outline-amber"
    >
      <header className="flex items-center justify-between pb-3 border-b border-rule">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber shrink-0" aria-hidden="true" />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber font-semibold">
            {COPY.eponymous.caption}
          </span>
        </div>
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone-faint">
          0{index + 1}
        </span>
      </header>

      <div className="py-6">
        <Binomial
          genus={taxon.genus}
          species={taxon.species}
          className="block text-bone text-[1.8rem] md:text-[2.2rem] leading-[1.05] tracking-[-0.02em]"
        />
      </div>

      <footer className="pt-3 border-t border-rule flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-bone-dim">
        <span>{taxon.family}</span>
        <span className="text-amber/80 text-[10px]">EPONYMOUS</span>
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

      {/* Distinct Eponymous Honours Block — FACTS.md §2 */}
      <div className="px-gutter mb-16 max-w-[1560px] mx-auto">
        <div className="border border-amber/40 bg-carbon/40 p-6 md:p-8 rounded-[2px]">
          <div className="mb-6 flex flex-col md:flex-row md:items-baseline justify-between gap-3 pb-4 border-b border-rule">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber font-semibold">
                {COPY.eponymous.caption}
              </p>
              <h3 className="font-display text-[1.4rem] md:text-[1.8rem] text-bone mt-1">
                Taxa named in his honour by colleagues
              </h3>
            </div>
            <p className="font-body text-bone-dim text-[13px] max-w-[480px]">
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
