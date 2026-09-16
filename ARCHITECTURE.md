# ARCHITECTURE.md — ENTOBIO CONSULT

---

## 1. FILE STRUCTURE

```
entobio-consult/
├── CLAUDE.md
├── DESIGN.md
├── ARCHITECTURE.md
├── CONTENT.md
├── HOMEPAGE-BUILD-SPEC.md
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
│
├── public/
│   ├── fonts/                  InstrumentSerif-Regular/Italic, InterTight-400/500,
│   │                           GeistMono-400/600  (woff2 only)
│   ├── brand/                  logo marks, favicons, og images, mascot
│   └── media/
│       ├── hero/               hero-specimen.avif|webp  (≥3200px)
│       ├── descent/            descent-01..04
│       ├── plates/             plate-01..24
│       ├── lab/                imaging setup, microscope, drawers
│       └── outreach/           school sessions, exhibitions
│
└── src/
    ├── app/
    │   ├── layout.tsx          fonts, Lenis provider, metadata, JSON-LD
    │   ├── page.tsx            HOMEPAGE — composes the seven acts
    │   ├── globals.css         tokens, resets, font-face
    │   ├── about/page.tsx
    │   ├── services/page.tsx
    │   ├── publications/page.tsx
    │   ├── outreach/page.tsx
    │   ├── contact/page.tsx
    │   ├── sitemap.ts
    │   ├── robots.ts
    │   └── not-found.tsx       mascot, confused pose
    │
    ├── components/
    │   ├── home/
    │   │   ├── Preloader.tsx
    │   │   ├── Hero.tsx              ← the priority build
    │   │   ├── LensStage.tsx         ← clip-path lens + ring + readout
    │   │   ├── StatRail.tsx
    │   │   ├── Descent.tsx
    │   │   ├── SpeciesMarquee.tsx
    │   │   ├── Manifesto.tsx
    │   │   ├── Capabilities.tsx
    │   │   ├── OutreachBreak.tsx
    │   │   └── RecordContact.tsx
    │   ├── layout/
    │   │   ├── Nav.tsx
    │   │   ├── Footer.tsx
    │   │   └── SmoothScroll.tsx      Lenis provider
    │   └── ui/
    │       ├── Binomial.tsx          ← enforces italic. USE THIS ALWAYS.
    │       ├── SpecimenLabel.tsx
    │       ├── Button.tsx
    │       ├── Rule.tsx
    │       └── MonoLabel.tsx
    │
    ├── content/
    │   ├── species.ts          verified species data
    │   ├── credentials.ts      institutions, journals, honours
    │   ├── services.ts         nine capabilities
    │   ├── publications.ts     36 entries from CV
    │   └── copy.ts             all headline / body strings
    │
    ├── hooks/
    │   ├── usePointerLens.ts   lerped pointer + touch orbit fallback
    │   ├── useScrollTrigger.ts font-ready-gated GSAP context wrapper
    │   └── useReducedMotion.ts
    │
    └── lib/
        ├── site.ts             ← SINGLE SOURCE OF TRUTH for domain/metadata
        ├── gsap.ts             registers plugins once, exports EASE
        └── schema.ts           JSON-LD builders
```

---

## 2. CRITICAL PRIMITIVES

### 2.1 `src/lib/site.ts` — never hardcode a URL anywhere else

```ts
export const SITE = {
  url: 'https://entobioconsult.com',
  name: 'EntoBio Consult',
  tagline: 'Independent insect taxonomy, biodiversity research and scientific macro imaging.',
  founder: 'Dr. H. M. Yeshwanth',
  orcid: '0000-0002-5104-3401',
  email: 'contact@entobioconsult.com',
  locality: 'Bengaluru',
  region: 'Karnataka',
  country: 'IN',
  founded: '2025-05-08',
  builtBy: { name: 'BuildRocket Labs', url: 'https://buildrocketlabs.com' },
} as const;
```

Every canonical, OG tag, sitemap entry and JSON-LD `url` reads from this. No exceptions.

### 2.2 `src/components/ui/Binomial.tsx` — accuracy enforced in code

```tsx
export function Binomial({ genus, species, authority, className }: {
  genus: string; species: string; authority?: string; className?: string;
}) {
  return (
    <span className={className}>
      <i className="font-display italic">{genus} {species}</i>
      {authority && (
        <span className="font-mono not-italic text-[11px] tracking-[0.18em]
                         uppercase text-bone-dim ml-2">{authority}</span>
      )}
    </span>
  );
}
```

**Every species name on the site renders through this component.** Never hand-write `<i>Genus species</i>` inline — that's how an un-italicised name eventually ships.

### 2.3 `src/hooks/useScrollTrigger.ts` — the font-desync guard

```ts
export function useGsapContext(
  setup: (ctx: gsap.Context) => void,
  scope: React.RefObject<HTMLElement>
) {
  useIsomorphicLayoutEffect(() => {
    let ctx: gsap.Context | undefined;
    let cancelled = false;

    document.fonts.ready.then(() => {
      if (cancelled) return;
      ctx = gsap.context(setup, scope);
      ScrollTrigger.refresh();
    });

    return () => { cancelled = true; ctx?.revert(); };
  }, []);
}
```

**All ScrollTrigger creation goes through this.** No direct `ScrollTrigger.create()` anywhere in components.

### 2.4 `src/hooks/usePointerLens.ts`

Owns the single rAF loop for the hero. Returns nothing — writes CSS custom properties on `document.documentElement` directly. One loop for the whole page; do not create a second rAF anywhere.

```ts
// Writes: --lens-x, --lens-y, --lens-r, --drift-x, --drift-y
// Desktop: lerped pointer follow, FOLLOW = 0.09
// Touch:   autonomous Lissajous orbit
// Reduced motion: locks centre, exits loop
// Pauses the loop when #hero leaves the viewport (IntersectionObserver)
```

That last point matters — a rAF loop running behind six more sections is wasted battery.

---

## 3. RENDERING

- All pages static (`force-static`). No dynamic routes, no ISR, no server actions.
- Contact form posts client-side to Web3Forms.
- `Preloader`, `LensStage`, `Descent`, `SpeciesMarquee` are `'use client'`. Everything else server.
- GSAP is dynamically imported inside the client components — keeps it out of the server bundle graph.

---

## 4. IMAGES

```ts
// next.config.mjs
images: {
  formats: ['image/avif', 'image/webp'],
  deviceSizes: [640, 828, 1200, 1920, 2560, 3200],
}
```

| Asset | Treatment |
|---|---|
| Hero specimen | `priority`, preloaded, LQIP. **One file, two `<img>` tags** — the lens layers share a source. |
| Descent 01–02 | eager |
| Descent 03–04 | lazy, prefetched at 30% section progress |
| Plates | lazy, `sizes="(max-width:640px) 70vw, 320px"`, max 900px source |

---

## 5. SEO / AEO

JSON-LD in `layout.tsx`, built from `src/lib/schema.ts`:

- `Organization` — EntoBio Consult, `foundingDate`, `areaServed: Worldwide`, `address` at locality level only (client requested no street address)
- `Person` — Dr. H. M. Yeshwanth, `identifier` = ORCID, `sameAs` → ORCID, Google Scholar, ResearchGate
- `WebSite`
- `BreadcrumbList` on inner pages

Plus:
- `sitemap.ts`, `robots.ts`
- `/public/llms.txt` — plain-text summary of who he is and what the organisation does, written for retrieval
- OG image per page, 1200×630, generated at build via `next/og`
- One concise, factual, quotable "About EntoBio Consult" paragraph present on every page — written so a language model can lift it cleanly

**Target queries:** insect identification service India · taxonomic consultant Hemiptera · Miridae identification · scientific focus stacking India · insect biodiversity survey consultant · museum collection curation India. All near-zero competition.

---

## 6. ANALYTICS

GA4 + Microsoft Clarity, both via `next/script` with `strategy="afterInteractive"`.

Track: `lens_engaged` (first pointer move inside hero), `descent_completed`, `outreach_cta`, `contact_submit`.

`lens_engaged` is the one that tells us whether the hero works.

---

## 7. QUALITY GATES

Nothing ships until all pass:

1. `tsc --noEmit` clean, `eslint` clean
2. Lighthouse mobile ≥ 90 all four categories
3. Every species name renders through `<Binomial>`
4. No hardcoded URL outside `site.ts`
5. `prefers-reduced-motion` produces a complete, readable static page
6. Full keyboard traversal with visible focus
7. Tested on a real mid-range Android over 4G — not just desktop throttling
8. No console errors or warnings
9. Every number on the page traceable to `CONTENT.md`

---

## 8. DEPLOY

```
1. Verify DNSSEC state at registrar BEFORE changing nameservers
2. Point domain to Vercel
3. Confirm canonical resolves to the apex in site.ts (check page source, not assumption)
4. Submit sitemap — Google Search Console + Bing Webmaster Tools
5. Verify GA4 + Clarity firing
6. Test the contact form end to end, twice
7. OG preview check — Twitter, LinkedIn, WhatsApp
```
