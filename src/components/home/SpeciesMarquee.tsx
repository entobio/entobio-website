/**
 * src/components/home/SpeciesMarquee.tsx
 * ACT 3 — "ONE HUNDRED AND FIFTY" — HOMEPAGE-BUILD-SPEC §5
 *
 * Three rows of typographic accession cards alternating directions.
 * Children duplicated ×3, animated via GSAP xPercent infinite linear repeat.
 * Speed modulated by Lenis scroll velocity.
 *
 * NO PHOTOGRAPHS. IMAGE-STRATEGY.md §1 and §3: a generated insect under a real
 * binomial is a scientific claim this project may not make. The type IS the
 * composition — it is also the literal payoff of the hero headline,
 * "Everything begins with a name."
 *
 * Verified entries render the binomial through <Binomial>. Unverified entries
 * omit genus and species entirely and stand on the family and the citation —
 * deliberate archival redaction, not a missing-data state.
 */

'use client';

import { useEffect, useRef } from 'react';
import { useLenis } from 'lenis/react';
import { gsap } from '@/lib/gsap';
import { COPY } from '@/content/copy';
import { ALL_SPECIES, type Species } from '@/content/species';
import { Binomial } from '@/components/ui/Binomial';

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Accession card geometry — IMAGE-STRATEGY.md §3 */
const CARD_W = 320;
const CARD_H = 280;

/**
 * The one display size on the card — IMAGE-STRATEGY.md §3.
 *
 * Long suprageneric names (Chrysomelidae, Sulawesifulvius) overrun 320px at
 * the full size and clip. Type is the entire composition here, so it is fitted
 * optically to the longest line rather than truncated: short names keep the
 * full size, long ones step down one or two notches. Nothing is ever cut off,
 * and no element is added to compensate.
 */
const DISPLAY_SIZES = [
  'clamp(1.8rem, 3.2vw, 3rem)',   // ≤ 11 characters — the specified size
  'clamp(1.6rem, 2.8vw, 2.6rem)', // 12–13
  'clamp(1.4rem, 2.4vw, 2.2rem)', // 14+
] as const;

function fitDisplaySize(...lines: string[]): string {
  const longest = Math.max(...lines.map((l) => l.length));
  if (longest <= 11) return DISPLAY_SIZES[0];
  if (longest <= 13) return DISPLAY_SIZES[1];
  return DISPLAY_SIZES[2];
}

/**
 * Citation as printed on the card: "ZOOTAXA 4084(3) · 2016".
 * The stored value is "ZOOTAXA 4084(3), 2016" — this only swaps the separator,
 * it never reformats or infers any part of the reference.
 */
function formatCitation(authority: string): string {
  return authority.replace(/,\s*(\d{4})$/, ' · $1');
}

/**
 * Individual accession card — typographic, no image.
 *
 * Verified:   index · binomial (stacked, italic) · rule · family [· honour]
 * Unverified: index · family (roman, display) · rule · citation (mono)
 *
 * Both states share the same three-part composition, so a redacted card reads
 * as the same kind of record with one field deliberately left unset.
 */
function MarqueeCard({
  species,
  accession,
}: {
  species: Species;
  accession: number;
}) {
  const isEponymous = Boolean(species.eponymous);
  const isVerified = species.verified;

  // The binomial stacks, so genus and species are measured as separate lines.
  const displaySize = isVerified
    ? fitDisplaySize(species.genus, species.species)
    : fitDisplaySize(species.family);

  return (
    <article
      className={`group relative flex flex-col flex-shrink-0 overflow-hidden bg-carbon p-6 border transition-colors duration-[400ms] ${
        isEponymous
          ? 'border-amber'
          : 'border-rule hover:border-rule-strong'
      } hover:bg-carbon-lift`}
      style={{
        width: `${CARD_W}px`,
        height: `${CARD_H}px`,
        borderRadius: '2px',
        transitionTimingFunction: 'var(--ease-cubic)',
      }}
    >
      {/* Index ⌗ 001 — amber dot marks an eponymous taxon */}
      <header className="flex items-start justify-between">
        <span
          className={`font-mono text-[11px] uppercase tracking-[0.18em] ${
            isEponymous ? 'text-amber' : 'text-bone-faint'
          }`}
        >
          ⌗ {String(accession).padStart(3, '0')}
        </span>
        {isEponymous && (
          <span
            className="w-1.5 h-1.5 rounded-full bg-amber mt-1 shrink-0"
            aria-hidden="true"
          />
        )}
      </header>

      {/* The name, or the redaction that stands in its place */}
      <div
        className="flex-1 flex flex-col justify-center transition-transform duration-[400ms] group-hover:translate-x-[6px]"
        style={{ transitionTimingFunction: 'var(--ease-cubic)' }}
      >
        {isVerified ? (
          <Binomial
            genus={species.genus}
            species={species.species}
            authority={species.authority}
            stack
            className="block text-bone"
            /* Instrument Serif italic, lh 0.92 — IMAGE-STRATEGY.md §3 */
            style={{
              fontSize: displaySize,
              lineHeight: 0.92,
              letterSpacing: '-0.02em',
            }}
          />
        ) : (
          /* No genus, no species. Suprageneric names are roman — CLAUDE.md §4.1 */
          <span
            className="font-display not-italic text-bone block"
            style={{
              fontSize: displaySize,
              lineHeight: 0.92,
              letterSpacing: '-0.02em',
            }}
          >
            {species.family}
          </span>
        )}
      </div>

      {/* Hairline rule */}
      <hr className="border-0 border-t border-rule my-4" />

      {/* Footer register */}
      <footer className="flex flex-col gap-1">
        {isVerified ? (
          <>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone-dim">
              {species.family}
            </span>
            {isEponymous && (
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber">
                {COPY.eponymous.caption}
              </span>
            )}
          </>
        ) : (
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone-dim">
            {formatCitation(species.authority)}
          </span>
        )}
      </footer>
    </article>
  );
}

export function SpeciesMarquee() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tweensRef = useRef<gsap.core.Tween[]>([]);

  // Accession number is the entry's position in the record, assigned once
  // before the rows are split so a card keeps its number in every row.
  const entries = ALL_SPECIES.map((species, i) => ({ species, accession: i + 1 }));

  // Split across 3 rows
  const itemsPerRow = Math.ceil(entries.length / 3);
  const row1Data = entries.slice(0, itemsPerRow);
  const row2Data = entries.slice(itemsPerRow, itemsPerRow * 2);
  const row3Data = entries.slice(itemsPerRow * 2);

  // Triple items for seamless loop. Speeds and directions unchanged.
  const rows = [
    { data: [...row1Data, ...row1Data, ...row1Data], dir: -1, speed: 0.55 },
    { data: [...row2Data, ...row2Data, ...row2Data], dir: 1, speed: 0.40 },
    { data: [...row3Data, ...row3Data, ...row3Data], dir: -1, speed: 0.70 },
  ];

  useEffect(() => {
    const reduced = prefersReducedMotion();
    if (reduced) return;

    // Triple items for seamless loop
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

        // xPercent loop: -50% to 0% for right (+1), 0% to -50% for left (-1)
        const fromX = r.dir === -1 ? 0 : -50;
        const toX = r.dir === -1 ? -50 : 0;
        const baseDuration = 35 / r.speed;

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

  // Hook row timeScale to Lenis scroll velocity
  useLenis(({ velocity }) => {
    if (!tweensRef.current.length || prefersReducedMotion()) return;
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
      <div className="px-[40px] mb-[60px] max-w-[1560px] mx-auto">
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
        <p className="font-body text-bone-dim text-[15px] max-w-[380px] leading-relaxed">
          {COPY.marquee.body.join(' ')}
        </p>
      </div>

      {/* Marquee Rows Container — 1 row on mobile, 3 rows on desktop */}
      <div className="flex flex-col gap-8 w-full">
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
              className="flex gap-6 w-max will-change-transform"
            >
              {row.data.map((entry, itemIndex) => (
                <MarqueeCard
                  key={`${rowIndex}-${itemIndex}-${entry.accession}`}
                  species={entry.species}
                  accession={entry.accession}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
