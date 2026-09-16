/**
 * src/content/media.ts
 * The image registry — IMAGE-STRATEGY.md §4 (slot manifest) and §6 (placeholder system).
 *
 * SINGLE SOURCE OF TRUTH for every image path on the site. Nothing anywhere
 * else may hardcode a path under /media. Components resolve slots by ID
 * through src/lib/media.ts.
 *
 * THE GOVERNING RULE — IMAGE-STRATEGY.md §1:
 *   Generated imagery may depict atmosphere and texture.
 *   It may never depict a specimen that is identified.
 *
 * That is why `source` is part of the type. A slot marked `client` may only
 * ever be filled by one of Dr. Yeshwanth's own photographs. Pointing a
 * `client` slot at a generated file is the one edit that must never be made
 * here — it is the fabrication failure CLAUDE.md §4.1 and §4.3 exist to stop.
 *
 * `src: null` is the correct, shippable state for an unfilled slot.
 * IMAGE-STRATEGY.md §6: "Never ship a placeholder to production. Ship a
 * shorter page."
 */

export type MediaSlot = {
  id: string;
  src: string | null;
  alt: string;
  source: 'generated' | 'client';
  w: number;
  h: number;
  /** if true and src is null → parent section hidden in prod */
  required: boolean;
  /**
   * Optional modern-format siblings of `src`, most-preferred first, for slots
   * rendered through a raw <picture> rather than next/image (which negotiates
   * formats itself). CLAUDE.md §8: AVIF primary, WebP fallback, `src` last.
   * Every path still lives here and nowhere else.
   */
  sources?: { src: string; type: string; srcSet?: string; sizes?: string }[];
  lqip?: string;
};

/* ------------------------------------------------------------------ *
 * §4.1 — GENERATED (Higgsfield). Atmosphere and texture only.
 * Every one of these carries the §2 grade block: born gradable to --void.
 * ------------------------------------------------------------------ */

const GENERATED: MediaSlot[] = [
  {
    // The single highest-priority asset on the site. One file, two <img>.
    // ARCHITECTURE.md §4 / IMAGE-STRATEGY.md §5.1 / REMEDIATION § 4e.
    id: 'HERO-01',
    src: '/media/hero/hero-specimen.png',
    sources: [
      {
        src: '/media/hero/hero-specimen.avif',
        srcSet: '/media/hero/hero-specimen-1080.avif 1080w, /media/hero/hero-specimen.avif 3840w',
        sizes: '100vw',
        type: 'image/avif',
      },
      {
        src: '/media/hero/hero-specimen.webp',
        srcSet: '/media/hero/hero-specimen-1080.webp 1080w, /media/hero/hero-specimen.webp 3840w',
        sizes: '100vw',
        type: 'image/webp',
      },
    ],
    lqip: 'data:image/webp;base64,UklGRnwAAABXRUJQVlA4IHAAAADwBACdASogABIAPzmMvFYvKSYjsBgIAeAnCWcAzNGrwD1fGXYkveTpESCU1XzSUdAA/tn1dezKpgBUdedpGIuOvIISu7Ilj2AsfcqejvQigOAPnfyscMyJ04dMEaXbc5AttK6cherZfgRVKtkAAAAA',
    alt: '',
    source: 'generated',
    w: 3840,
    h: 2160,
    required: true,
  },
  {
    id: 'DESCENT-01',
    src: null,
    alt: 'the grassland',
    source: 'generated',
    w: 2400,
    h: 1600,
    required: false,
  },
  {
    id: 'DESCENT-02',
    src: '/media/descent/descent-02.png',
    alt: 'the leaf',
    source: 'generated',
    w: 2400,
    h: 1600,
    required: true,
  },
  {
    id: 'DESCENT-03',
    src: '/media/descent/descent-03.png',
    alt: 'the insect',
    source: 'generated',
    w: 2400,
    h: 1600,
    required: true,
  },
  {
    id: 'DESCENT-04',
    src: '/media/descent/descent-04.png',
    alt: 'the wing',
    source: 'generated',
    w: 2400,
    h: 1600,
    required: true,
  },
  {
    // Renders at 0.06 opacity — must be near-black at source.
    // Not yet generated; Manifesto currently falls back to DESCENT-04.
    id: 'MANIFESTO-BG',
    src: null,
    alt: '',
    source: 'generated',
    w: 2400,
    h: 1600,
    required: false,
  },
];

/* ------------------------------------------------------------------ *
 * §4.1 — CAPABILITIES PLATES. Lab and process objects, NOT insects.
 * Subjects are fixed by IMAGE-STRATEGY.md §5.3 and mirrored in `alt`.
 * ------------------------------------------------------------------ */

const CAP_SUBJECTS: readonly string[] = [
  'A stereomicroscope eyepiece and objective turret',
  'An open bound scientific monograph',
  'A macro lens barrel on a motorised focus rail',
  'A wooden-framed glazed display case',
  'A furled collecting net',
  'A row of glass vials in a wooden rack',
  'A dried flower head at extreme macro',
  'Dried cereal grain heads',
  'A shallow wooden entomological drawer with unit trays and pins',
];

const CAPABILITY_PLATES: MediaSlot[] = CAP_SUBJECTS.map((subject, i) => ({
  id: `CAP-${String(i + 1).padStart(2, '0')}`,
  src: null,
  alt: subject,
  source: 'generated',
  w: 720,
  h: 960,
  required: false,
}));

/* ------------------------------------------------------------------ *
 * §4.2 — CLIENT PHOTOGRAPH ONLY.
 * These stay null until his files arrive. A section with no verified
 * asset is hidden, never filled.
 * ------------------------------------------------------------------ */

/** PLATE-01…24 — marquee enrichment. Fallback: typographic cards (§3). */
const MARQUEE_PLATES: MediaSlot[] = Array.from({ length: 24 }, (_, i) => ({
  id: `PLATE-${String(i + 1).padStart(2, '0')}`,
  src: null,
  alt: '',
  source: 'client' as const,
  w: 2400,
  h: 3000,
  required: false,
}));

/** IMAGING-GALLERY-01…08 — /imaging filmstrip. Fallback: section hidden. */
const IMAGING_GALLERY: MediaSlot[] = Array.from({ length: 8 }, (_, i) => ({
  id: `IMAGING-GALLERY-${String(i + 1).padStart(2, '0')}`,
  src: null,
  alt: '',
  source: 'client' as const,
  w: 2400,
  h: 1600,
  required: true,
}));

/** LAB-01…04 — /imaging equipment. Fallback: reuse CAP plates. */
const LAB_PLATES: MediaSlot[] = Array.from({ length: 4 }, (_, i) => ({
  id: `LAB-${String(i + 1).padStart(2, '0')}`,
  src: null,
  alt: '',
  source: 'client' as const,
  w: 2400,
  h: 1600,
  required: false,
}));

/** OUTREACH-01…03 — /outreach. Fallback: mascot illustration only. */
const OUTREACH_PLATES: MediaSlot[] = Array.from({ length: 3 }, (_, i) => ({
  id: `OUTREACH-${String(i + 1).padStart(2, '0')}`,
  src: null,
  alt: '',
  source: 'client' as const,
  w: 2400,
  h: 1600,
  required: false,
}));

const CLIENT: MediaSlot[] = [
  // /imaging before-after slider — one shallow frame + the final merged
  // plate, same specimen. Both or neither: the section is hidden entirely
  // until the pair exists.
  {
    id: 'IMAGING-STACK-A',
    src: null,
    alt: '',
    source: 'client',
    w: 2400,
    h: 1600,
    required: true,
  },
  {
    id: 'IMAGING-STACK-B',
    src: null,
    alt: '',
    source: 'client',
    w: 2400,
    h: 1600,
    required: true,
  },
  // /about hero. Fallback: typographic hero, no image.
  {
    id: 'FOUNDER-01',
    src: null,
    alt: '',
    source: 'client',
    w: 2400,
    h: 1600,
    required: false,
  },
  ...MARQUEE_PLATES,
  ...IMAGING_GALLERY,
  ...LAB_PLATES,
  ...OUTREACH_PLATES,
];

/* ------------------------------------------------------------------ */

export const MEDIA: readonly MediaSlot[] = [
  ...GENERATED,
  ...CAPABILITY_PLATES,
  ...CLIENT,
] as const;

/** Lookup index. Built once at module scope. */
export const MEDIA_BY_ID: ReadonlyMap<string, MediaSlot> = new Map(
  MEDIA.map((slot) => [slot.id, slot]),
);

/** Ordered ID groups, so sections don't rebuild the naming convention. */
export const DESCENT_SLOT_IDS = [
  'DESCENT-01',
  'DESCENT-02',
  'DESCENT-03',
  'DESCENT-04',
] as const;

export const CAP_SLOT_IDS = CAPABILITY_PLATES.map((s) => s.id);
export const PLATE_SLOT_IDS = MARQUEE_PLATES.map((s) => s.id);
export const IMAGING_GALLERY_SLOT_IDS = IMAGING_GALLERY.map((s) => s.id);
export const LAB_SLOT_IDS = LAB_PLATES.map((s) => s.id);
export const OUTREACH_SLOT_IDS = OUTREACH_PLATES.map((s) => s.id);
