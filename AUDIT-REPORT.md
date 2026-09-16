# Comprehensive Production Audit: EntoBio Consult (`entobioconsult.com`)

**Date of Audit:** 16 September 2026  
**Auditor:** Antigravity Engineering & Design QA  
**Target URL:** `http://localhost:3000` (Production Next.js 16.1.6 Turbopack Release)  
**Reference Specifications:** `CLAUDE.md`, `DESIGN.md`, `ARCHITECTURE.md`, `CONTENT.md`, `HOMEPAGE-BUILD-SPEC.md`, `IMAGE-STRATEGY.md`, `IMAGING-PAGE-SPEC.md`  
**Verdict Executive Status:** **FAILED — NOT READY FOR AWARD SUBMISSION OR PRODUCTION DEPLOYMENT**

---

## PART 1 — SPEC COMPLIANCE

### 1.1 Preloader & Initial Mount
- **Spec Called For (`HOMEPAGE-BUILD-SPEC.md` §3):**
  - Dark screen (`#08090A`). Center mono counter `000` → `100%` (`ui-mono`, 12px, tabular numbers).
  - Micro-label below counter: `"CALIBRATING OPTICAL AXIS · 40×"`.
  - Duration: 1.2s total. Progress linked to asset preload (or simulated 1.2s if cached).
  - Completion: Counter fades out (0.2s). A sharp horizontal slit aperture opens from center (`clip-path: inset(49% 0 49% 0)` → `inset(0% 0 0% 0)`), 0.6s `power3.inOut`.
  - Hero image underneath focus-racks from `blur(12px)` to `blur(0px)` simultaneously.
  - Hero type animates in: display line 1 from `y: 40, opacity: 0`, line 2 staggered 0.15s later.
  - Nav fades in: 0.3s after aperture finishes.
  - `sessionStorage` check: On return visits in the same session, preloader is bypassed entirely.
- **What Is Actually Built (`src/components/layout/Preloader.tsx`):**
  - Counter `0` → `100` with micro-label `"CALIBRATING OPTICAL AXIS · 40×"` in `ui-mono` text.
  - Fixed `sessionStorage` key `entobio-preloader-seen`.
  - Slit aperture implemented with clip-path animation on `#preloader-aperture`.
- **Every Gap, In Specifics:**
  1. **Hero Focus-Rack & Type Stagger Animation Is Completely Broken:** In `src/components/layout/Preloader.tsx` (lines 142–176), the animation timeline is wrapped in `gsap.context(..., containerRef)`. `containerRef` is attached to the Preloader overlay `<div>` (`id="preloader-overlay"`). Lines 157–174 attempt to query and animate `.layer-base`, `.layer-reveal`, and `.hero-type`:
     ```ts
     .to(".layer-base, .layer-reveal", { filter: "blur(0px)", ... }, "-=0.4")
     .to(".hero-type", { y: 0, opacity: 1, ... }, "-=0.3")
     ```
     Because GSAP contexts scope query selectors strictly to descendants of `containerRef.current`, `.layer-base`, `.layer-reveal`, and `.hero-type` (which live inside `Hero.tsx` in a sibling DOM subtree) are **never found**. The hero image never focus-racks on load; `.hero-type` relies on its default un-animated state or CSS transitions, rendering the choreographed optical entrance completely non-functional.
  2. **Binomial Violation on Error Screen:** In `src/components/layout/Preloader.tsx` (lines 165–168), fallback/error specimen text injects raw text without `<Binomial>`:
     ```tsx
     <span className="font-mono text-xs text-amber-500">Hypseloecus sandalum Yeshwanth, 2014</span>
     ```
     This bypasses `<Binomial>` formatting, leaving the authority unseparated and violating `CLAUDE.md` §4.1.

---

### 1.2 Navigation
- **Spec Called For (`HOMEPAGE-BUILD-SPEC.md` §3, `DESIGN.md` §8):**
  - Fixed, top-0, z-50. Height: 64px (`h-16`).
  - Left: `"ENTOBIO CONSULT"` (Cinzel/Newsreader serif, 13px, tracking-widest) + `"· BANGALORE"` (mono, 9px, bone-faint).
  - Center: Nav links — `Expertise`, `Imaging`, `Research`, `Outreach`, `About`.
  - Right: `"ENGAGE"` button (pill, amber border on hover, 11px mono).
  - Background: Transparent over Hero. On scroll past hero (ScrollTrigger `hero-exit`), transitions to `bg-void/85 backdrop-blur-md` with 1px border-b `border-bone/10`.
  - Active section indicator: Underline or amber dot tracking current scroll position.
  - Mobile (<768px): Hamburger menu transitioning to full-screen overlay with large display links.
- **What Is Actually Built (`src/components/layout/Nav.tsx`):**
  - Height 64px, fixed top-0, z-50.
  - Left brand: `"ENTOBIO CONSULT"` + `"· BANGALORE"`.
  - Links: `About`, `Services`, `Publications`, `Outreach`, `Contact`.
  - Right CTA: `"INITIATE ENGAGEMENT"` (`/contact`).
- **Every Gap, In Specifics:**
  1. **Missing `Imaging` Route Link:** The spec explicitly mandated `Imaging` as a top-level nav link. The built nav replaces it with `Services` because the `/imaging` route was completely omitted from the build.
  2. **No Active Section Indicator:** Zero scroll tracking or active indicator exists in `Nav.tsx`. Current route or active scroll section is entirely unindicated.
  3. **Mobile Menu Is Non-Existent:** In `src/components/layout/Nav.tsx` (line 78), links are wrapped in `<div className="hidden md:flex items-center gap-8">`. For screens `< 768px`, there is **no hamburger button, no mobile drawer, and no mobile navigation menu whatsoever**. A mobile visitor has zero means of navigating to About, Services, Publications, Outreach, or Contact from the navigation bar.

---

### 1.3 Act 1: The Threshold (Hero)
- **Spec Called For (`HOMEPAGE-BUILD-SPEC.md` §4):**
  - Full viewport: `100vh` (or `100svh`), fixed position or pinned during entry.
  - Dual-layer image with circular lens aperture:
    - Base layer: `HERO-01` (`/public/media/hero/hero-low.webp`), 100×, dark field, greyscale, low brightness.
    - Reveal layer: `HERO-02` (`/public/media/hero/hero-high.webp`), 400× optical zoom, high contrast, fine structural detail.
  - Lens: 280px diameter circle (`w-[280px] h-[280px] rounded-full`). On mouse move, smoothly tracks cursor (`lerp: 0.08`).
  - Lens rim: 1px border `rgba(197, 160, 89, 0.4)` (amber at 40%), subtle outer glow.
  - Lens readout: Micro-label pinned to bottom-right of lens circle: `"×400 · OBJ 40/0.65"`.
  - Display type:
    - `"THE UNSEEN ARCHITECTURE"` (Display serif, ~72px desktop, responsive).
    - Subtitle: `"Taxonomic Entomology & Scientific Imaging · Dr. H.M. Yeshwanth"` (Mono, 13px).
    - Position: Left-aligned, vertically centered or lower-third.
  - Scroll indicator: Center bottom. `"SCROLL TO DESCEND"` + animated hairline arrow.
- **What Is Actually Built (`src/components/home/Hero.tsx`, `LensStage.tsx`):**
  - Dual-layer canvas/DOM structure with `.layer-base` and `.layer-reveal`.
  - Mouse tracking lens circle with `usePointerLens.ts`.
  - Readout tracking lens position.
- **Every Gap, In Specifics:**
  1. **Display Type Text Deviation:** The spec called for `"THE UNSEEN ARCHITECTURE"`. The codebase (`Hero.tsx` line 52) instead renders:
     ```tsx
     "Rigour begins with the specimen."
     ```
  2. **Lens Readout Spec Discrepancy:** Built readout displays `"×40 · OBJ 4/0.10"`. The spec explicitly called for `"×400 · OBJ 40/0.65"` corresponding to the high-magnification reveal.
  3. **Optical Lens Blend Destroys Typography Legibility:** In `src/components/home/Hero.tsx` (line 48), `.hero-type` has `style={{ mixBlendMode: 'difference' }}`. When the user sweeps the circular lens over the text, the white text abruptly shifts to an inverted, muddy olive-grey zebra pattern over the bright specimen highlights, destroying the intended editorial typography.
  4. **Lens Boundary & Readout Collision:** On viewports under 1024px, the lens circle collides with the left-aligned hero headline, and the coordinate readout text (`×40 · OBJ 4/0.10`) clips directly through the subline text.
  5. **Scroll Indicator Label Mismatch:** Built indicator in `Hero.tsx` (line 92) reads `"SCROLL TO ENTER"` instead of the specified `"SCROLL TO DESCEND"`.

---

### 1.4 Act 2: The Specimen Ledger (Species Marquee)
- **Spec Called For (`HOMEPAGE-BUILD-SPEC.md` §5):**
  - Horizontal infinite ticker / marquee.
  - Height: ~120px. Background: `#08090A`. Border-t and border-b: 1px `border-bone/10`.
  - Speed: ~40s per cycle. Smooth pause on hover.
  - Content: 22 described species cards.
  - Card structure:
    - Binomial: `<Binomial name={species.name} authority={species.authority} />` (italic name, roman authority).
    - Family / Tribe: Mono 10px, bone-faint (`"MIRIDAE: DERAEOCORINAE"`).
    - Year: Mono 10px, amber (`"2014"`).
    - Type locality: Mono 10px, bone-faint (`"Karnataka, India"`).
    - Specimen thumbnail: 48×48 square, greyscale, sharp.
  - Section label above marquee: `"01 — THE DESCRIBED TAXA"` (mono, 11px, tracking-widest).
  - Subline: `"22 species and 2 genera described across 16 years of field collection and morphological analysis."`
- **What Is Actually Built (`src/components/home/SpeciesMarquee.tsx`):**
  - Section label: `"01 — THE DESCRIBED TAXA"`.
  - Infinite horizontal ticker using GSAP repeat xPercent.
  - 10 selected species cards rendered from `src/content/species.ts`.
- **Every Gap, In Specifics:**
  1. **Missing 12 Species (10 Built vs 22 Mandated):** `HOMEPAGE-BUILD-SPEC.md` §5 specifies: `"Content: 22 described species cards."` `src/content/species.ts` only exports 10 species (`SPECIES_RECORD.slice(0, 10)`), omitting more than half of the described taxa.
  2. **Complete Absence of Specimen Thumbnails:** The spec called for: `"Specimen thumbnail: 48×48 square, greyscale, sharp."` The built `SpeciesMarquee.tsx` has **zero thumbnail images**. Every card is plain text only.
  3. **Pause On Hover Not Implemented:** Hovering over the ticker does not pause the GSAP marquee scroll. Users cannot read the type localities or authorities before the card slides off-screen.
  4. **Subline Fact Discrepancy:** The subline in `SpeciesMarquee.tsx` (line 55) hardcodes `"24 new species and 2 new genera described across 16 years..."`, contradicting the 22 species stated in `HOMEPAGE-BUILD-SPEC.md` §5.

---

### 1.5 Act 3: The Descent (Optical Journey)
- **Spec Called For (`HOMEPAGE-BUILD-SPEC.md` §6):**
  - Pin-scroll sequence. Total scroll distance: `400vh` (4 panels × 100vh).
  - Pinned viewport displaying 4 progressive magnification levels:
    - Level 1: 1× — Whole habitus / field context (`HABITUS-01`, 1920×1080).
    - Level 2: 10× — Diagnostic anatomy / head & pronotum (`ANATOMY-01`).
    - Level 3: 40× — Wing venation / surface micro-sculpture (`WING-01`).
    - Level 4: 100× — Genital capsule / micro-pilosity (`GENITALIA-01`).
  - Text overlay: Pinned left or right, crossfading between 4 levels.
  - Each level text: Magnification badge (`"1×"`, `"10×"`, `"40×"`, `"100×"`), Scale bar (calibrated SVG hairline with real micron measure: `"5.0 mm"`, `"1.0 mm"`, `"200 µm"`, `"50 µm"`), Title, Diagnostic description.
  - Transition: Smooth crossfade + subtle zoom-in (`scale: 1` → `scale: 1.08`) per panel.
- **What Is Actually Built (`src/components/home/Descent.tsx`):**
  - 4 layers mapped to `/public/media/descent/descent-01.png` through `descent-04.png`.
  - Pinned scroll container with scale bars and magnification indicators.
- **Every Gap, In Specifics:**
  1. **Illegal Pinning & CSS Sticky Conflict:** `src/components/home/Descent.tsx` line 212 has:
     ```tsx
     <div ref={pinRef} className="sticky top-0 h-screen w-full overflow-hidden">
     ```
     while line 105 passes `pin: pinRef.current` to GSAP ScrollTrigger. `CLAUDE.md` §6.2 explicitly forbids this: *"Pinning: NEVER mix CSS position: sticky with GSAP ScrollTrigger pin on the same element."* This creates layout stutter and erratic scroll offsets on Safari/WebKit.
  2. **Act Label Numbering Error:** In `Descent.tsx` (line 217), the section header is labeled:
     ```tsx
     "02 — THE RECORD"
     ```
     This is completely out of spec. Act 2 was The Specimen Ledger (`01 — THE DESCRIBED TAXA`), Act 3 was titled `"02 — THE DESCENT"`. Later on the page, Act 7 is also labeled `"05 — THE RECORD"`—creating two completely separate sections with the identical name `"THE RECORD"`.
  3. **Fake PNG Assets That Are Low-Res JPEGs:** Files `/public/media/descent/descent-01.png` through `04.png` are actually 1024×1024 JPEGs saved with a `.png` extension. Blown up across a 1920×1080 desktop screen, they appear severely pixelated and blurry, ruining the optical resolution illusion.
  4. **AI Hallucination in Level 1 Image:** `descent-01.png` depicts an AI-hallucinated insect pinned alongside a giant fake wooden ruler with garbled text reading `"CARNIVALA GRASSLAND DISCOVERY"`, violating the scientific integrity spec.
  5. **Direct Violation of `CLAUDE.md` §4.1:** Level 4 (`Descent.tsx` lines 284–290) places a real species binomial (*Hypseloecus sandalum* Yeshwanth, 2014) directly over `descent-04.png`, which is an AI-generated synthetic wing texture.

---

### 1.6 Act 4: The Taxonomic Argument (Manifesto)
- **Spec Called For (`HOMEPAGE-BUILD-SPEC.md` §7):**
  - Full-screen text statement. Pinned or slow-scroll.
  - Typography: Display serif (Newsreader / Cinzel), italic, ~48px desktop.
  - Background: Deepest void `#050506`.
  - Layout: Centered, max-width ~800px.
  - Text: 5 sentences from `CONTENT.md` §1 ("The Argument").
  - Animation: Sentence-by-sentence scrubbed highlight. Active sentence: `text-bone` (100% opacity). Inactive sentences: `text-bone-faint` (25% opacity).
  - Transition: As user scrolls through 200vh, sentences step: 1 active → 2 active → 3 active → 4 active → 5 active.
- **What Is Actually Built (`src/components/home/TaxonomicArgument.tsx`):**
  - Pinned 300vh scroll section rendering 5 sentences from `CONTENT.md`.
- **Every Gap, In Specifics:**
  1. **Catastrophic Black Hole on Static Scroll / Reduced Motion:** In `src/components/home/TaxonomicArgument.tsx` (line 152), each sentence container is given:
     ```tsx
     className="absolute inset-0 flex items-center justify-center opacity-0"
     ```
     Because all 5 sentences are `absolute` and start at `opacity-0`, if GSAP fails, is delayed, or under `prefers-reduced-motion`, **the entire 300vh section is an empty black void**.
  2. **Reduced Motion Stacking Collision:** Under `prefers-reduced-motion: reduce`, CSS sets `opacity: 1 !important` on `.sentence`. Because all 5 sentences share `absolute inset-0`, **all 5 full-paragraph sentences render simultaneously on top of each other**, resulting in a completely illegible jumble of overlapping serif glyphs.
  3. **Animation Scrub Bug:** The timeline in `TaxonomicArgument.tsx` (lines 79–122) sets each sentence to fade in and then immediately fade out to 0 before the next sentence fades in. At any given point in the scroll, only one isolated sentence is visible; the specified *"sentence-by-sentence scrubbed reading with inactive sentences dimmed to 25%"* is completely missing.

---

### 1.7 Act 5: The Capabilities Matrix (Services)
- **Spec Called For (`HOMEPAGE-BUILD-SPEC.md` §8):**
  - Section label: `"03 — CAPABILITIES"`.
  - 4 capability rows (not cards — horizontal rows separated by 1px rules):
    - 01: `"Taxonomic Identification & Species Verification"`
    - 02: `"Agricultural & Quarantine Pest Diagnostics"`
    - 03: `"Scientific Imaging & Focus-Stacked Photography"`
    - 04: `"Biodiversity Assessment & Ecological Surveys"`
  - Each row:
    - Number (mono, amber, 12px): `"01"`, `"02"`, `"03"`, `"04"`.
    - Title: Display serif, 28px.
    - Summary: 2–3 lines, body text, bone-muted.
    - Deliverable tag: Mono, 11px, pill/bracketed: `"[ FORMAL DETERMINATION LABEL + REPORT ]"`.
    - Turnaround / Spec note: Mono, 10px, bone-faint: `"From 48h · Morphological + Genitalic"`.
    - Hover state: Background subtly lightens to `#111315`. Arrow icon shifts 4px right.
    - Click: Navigates to `/services#{anchor}`.
- **What Is Actually Built (`src/components/home/Capabilities.tsx`):**
  - Section label: `"03 — CAPABILITIES"`.
  - 4 interactive horizontal rows with mouse-following hover preview card.
- **Every Gap, In Specifics:**
  1. **Every Anchor Link Is Broken:** In `Capabilities.tsx` (lines 35–64), the rows link to:
     - `/services#taxonomic-identification`
     - `/services#pest-diagnostics`
     - `/services#scientific-imaging-focus-stacked-photography`
     - `/services#biodiversity-assessment`
     However, `/src/app/services/page.tsx` (lines 80, 114, 148, 182) defines the section IDs as:
     - `id="service-01"`
     - `id="service-02"`
     - `id="service-03"`
     - `id="service-04"`
     **None of the anchor links match.** Clicking any capability on the homepage navigates to the top of `/services` without scrolling to the respective service.
  2. **Violates Spec Ban on Cards (Hover Floating Card):** Spec explicitly mandates: *"4 capability rows (not cards — horizontal rows separated by 1px rules)"*. `Capabilities.tsx` implemented a floating cursor-following preview card with a canvas/image element that lags behind the pointer and constantly triggers browser composite repaints.
  3. **Turnaround Spec Notes Omitted:** The spec-mandated turnaround notes (`"From 48h · Morphological + Genitalic"`, etc.) were completely left out of the capability row UI.

---

### 1.8 Act 6: Outreach Break
- **Spec Called For (`HOMEPAGE-BUILD-SPEC.md` §9):**
  - Section label: `"04 — PUBLIC SCIENCE & EDUCATION"`.
  - Palette shift: Background shifts from dark `#08090A` to light warm `#E8E2D6` (bone-light) or deep amber-tinted `#12100C`.
  - Content:
    - Headline: Display serif, warm: `"Science belongs to everyone who looks closely."`
    - Body: 2 paragraphs on workshops, training, public engagement.
    - 3 metric counters:
      - `"600+"` participants trained
      - `"40+"` workshops conducted
      - `"15+"` institutions visited
    - CTA: `"EXPLORE OUTREACH PROGRAMMES"` → `/outreach`.
    - Mascot illustration: Stylised Mirid bug mascot SVG (`src/components/ui/MascotBug.tsx`).
- **What Is Actually Built (`src/components/home/OutreachBreak.tsx`):**
  - Background transition to `#EAE5DB`.
  - Mascot SVG, metric counters, button to `/outreach`.
- **Every Gap, In Specifics:**
  1. **Act Label Numbering Error:** In `OutreachBreak.tsx` (line 124), the header is labeled:
     ```tsx
     "04 — OUTREACH"
     ```
     instead of the specified `"04 — PUBLIC SCIENCE & EDUCATION"`.
  2. **Severe Contrast Defect on Entrance (Invisible Text):** The section starts with background `#08090A` while child headings and labels are styled with `text-void` (`#08090A`). Until the user scrolls deep enough for ScrollTrigger to interpolate the background to `#EAE5DB`, **the text is completely black-on-black (1:1 contrast ratio)**.
  3. **Untraceable Outreach Statistics:** The counters display `"600+"`, `"40+"`, `"15+"`. `CONTENT.md` contains no source citations, dates, or institution lists verifying these figures.

---

### 1.9 Act 7: The Record (Publications & Authority)
- **Spec Called For (`HOMEPAGE-BUILD-SPEC.md` §10):**
  - Section label: `"05 — THE SCIENTIFIC RECORD"`.
  - 2-column layout:
    - Left column: Large counter + authority statement:
      - `"36"` peer-reviewed publications.
      - `"16"` years of field research.
      - `"22"` described taxa.
      - Statement: `"Every description published in peer-reviewed taxonomy journals: Zootaxa, ZooKeys, Entomologia Generalis."`
    - Right column: 5 selected publication citations from `src/content/publications.ts`:
      - Authors, Year, Title (with binomial italicised), Journal (italicised), Volume, Pages, DOI link.
  - Below: CTA link `"VIEW COMPLETE BIBLIOGRAPHY (36 PAPERS)"` → `/publications`.
- **What Is Actually Built (`src/components/home/RecordContact.tsx`):**
  - Combined section housing both Publications and Contact.
- **Every Gap, In Specifics:**
  1. **Section Mislabeled and Duplicated:** `RecordContact.tsx` line 147 labels this block:
     ```tsx
     "05 — THE RECORD"
     ```
     This duplicates the `"02 — THE RECORD"` label assigned to Act 3 in `Descent.tsx`. Furthermore, it truncates the specified title `"05 — THE SCIENTIFIC RECORD"`.
  2. **Unseparated Contact Section:** `HOMEPAGE-BUILD-SPEC.md` defines Act 7 as The Record and the Footer/Contact as an independent closing act. `RecordContact.tsx` glues them together in a single file with confusing dual-numbered headers (`"05 — THE RECORD"` followed immediately by `"06 — CONTACT"`).
  3. **DOI Links Are Missing:** In `RecordContact.tsx` (lines 182–215), the publication items render the title and journal in plain text. None of the listed publications include clickable DOI links to external publisher records.

---

### 1.10 Footer
- **Spec Called For (`HOMEPAGE-BUILD-SPEC.md` §11, `DESIGN.md` §9):**
  - Dark `#050506`. Border-t 1px `border-bone/10`.
  - Top row: Brand mark + `"Taxonomic Entomology & Scientific Imaging · Bangalore, India"`.
  - Middle: 4 columns: Navigation links, Services links, Academic profiles (ZooBank, ResearchGate, ORCID, Google Scholar), Legal/Colophon.
  - Bottom row: Copyright, `"Typeset in Cinzel & Newsreader"`, `"Designed with scientific precision"`.
- **What Is Actually Built (`src/components/layout/Footer.tsx`):**
  - Standard footer layout with columns for Navigation, Practice, and Academic Profiles.
- **Every Gap, In Specifics:**
  1. **Dead Academic Profile Links:** In `src/components/layout/Footer.tsx` (lines 104–118), ResearchGate and Google Scholar are rendered as static `<span>` tags with `"Profile pending"`, rather than active links or omitted entirely until published.
  2. **Font Colophon Fact Error:** Line 140 states: `"Typeset in Newsreader and JetBrains Mono"`. Yet `globals.css` imports Cinzel, Newsreader, and JetBrains Mono—and in actual production, zero font files are present in `/public/fonts/`, so the entire site is rendered in system Times New Roman and Courier.

---

### 1.11 Missing & Unspecified Features Summary
| Feature / Element | Status | Spec Reference | Actual Built State |
| :--- | :--- | :--- | :--- |
| `/imaging` Route | **MISSING** | `IMAGING-PAGE-SPEC.md` | Omitted completely; redirects/links to `/services` |
| Mobile Navigation Drawer | **MISSING** | `DESIGN.md` §8 | Hidden at `< 768px`; mobile users cannot navigate |
| Hover Pause on Species Marquee | **MISSING** | `HOMEPAGE-BUILD-SPEC.md` §5 | Marquee never pauses on hover |
| 12 Species Marquee Cards | **MISSING** | `HOMEPAGE-BUILD-SPEC.md` §5 | Only 10 species cards built (22 required) |
| 48×48 Specimen Thumbnails | **MISSING** | `HOMEPAGE-BUILD-SPEC.md` §5 | Omitted completely; cards are text-only |
| Floating Cursor Preview Card in Capabilities | **UNSPECIFIED** | `HOMEPAGE-BUILD-SPEC.md` §8 | Explicitly banned ("not cards"); built anyway |
| Preloader Hero Animation Trigger | **BROKEN** | `HOMEPAGE-BUILD-SPEC.md` §3 | Scoped GSAP context prevents hero entrance animation |
| Sticky + Pin Scroll Conflict in Descent | **ILLEGAL** | `CLAUDE.md` §6.2 | `sticky top-0` mixed with `pin: pinRef.current` |

---

## PART 2 — VISUAL AUDIT

Screenshots were captured at viewports 1920px, 1440px, 768px, and 390px, along with all inner pages (`/about`, `/services`, `/publications`, `/outreach`, `/contact`, `/404`).

```
Screenshots stored at:
- /Users/prajwal/.gemini/antigravity-ide/brain/f3388004-1615-490f-9d19-72d005bdc13b/screenshots/homepage-1920-hero.png
- /Users/prajwal/.gemini/antigravity-ide/brain/f3388004-1615-490f-9d19-72d005bdc13b/screenshots/homepage-1920-full.png
- /Users/prajwal/.gemini/antigravity-ide/brain/f3388004-1615-490f-9d19-72d005bdc13b/screenshots/homepage-1440-full.png
- /Users/prajwal/.gemini/antigravity-ide/brain/f3388004-1615-490f-9d19-72d005bdc13b/screenshots/homepage-768-full.png
- /Users/prajwal/.gemini/antigravity-ide/brain/f3388004-1615-490f-9d19-72d005bdc13b/screenshots/homepage-390-full.png
- /Users/prajwal/.gemini/antigravity-ide/brain/f3388004-1615-490f-9d19-72d005bdc13b/screenshots/page-about.png
- /Users/prajwal/.gemini/antigravity-ide/brain/f3388004-1615-490f-9d19-72d005bdc13b/screenshots/page-services.png
- /Users/prajwal/.gemini/antigravity-ide/brain/f3388004-1615-490f-9d19-72d005bdc13b/screenshots/page-publications.png
- /Users/prajwal/.gemini/antigravity-ide/brain/f3388004-1615-490f-9d19-72d005bdc13b/screenshots/page-outreach.png
- /Users/prajwal/.gemini/antigravity-ide/brain/f3388004-1615-490f-9d19-72d005bdc13b/screenshots/page-contact.png
- /Users/prajwal/.gemini/antigravity-ide/brain/f3388004-1615-490f-9d19-72d005bdc13b/screenshots/page-404.png
```

### 2.1 The Hero
- **Does it stop you?** No. It looks like a tech demo widget placed over a dark background. It fails to convey authoritative, museum-grade scientific mastery.
- **Does the lens feel like an instrument or a hover effect?** It feels entirely like a decorative cursor follower. A true scientific microscope instrument has measurable reticles, optical depth, chromatic abberation, calibrated field graticules, and depth-of-field rack focusing. Here, moving the mouse simply drags a CSS `clip-path` circle that un-blurs a stock 3D render.
- **Is the image carrying it?** No. The underlying image (`HERO-01` / `HERO-02`) is an AI-generated rendering of insect ommatidia that looks like a metallic honeycomb grid from a sci-fi video game rather than a biological specimen photographed under scanning electron or confocal microscopy.
- **Critical Failure — Typography Difference Blend:** Because `.hero-type` has `mix-blend-mode: difference`, sweeping the lens over the headline causes the letters of `"Rigour begins with the specimen."` to flash into jarring, inverted olive-grey artifacts. It looks broken.

---

### 2.2 Pacing & Visual Rhythm
- **Hero to Marquee:** Abrupt transition. The hero ends at `100vh`, cutting directly into a solid black ticker without any optical deceleration.
- **Act 3 (Descent) Drags Severely:** Pinning the user for 400vh across 4 static images feels sluggish and repetitive because each layer lacks genuine morphological depth.
- **Act 4 (Manifesto) Is a Dead Zone:** Because the sentences are hidden by default, scrolling through this 300vh section presents the viewer with an empty, pitch-black screen for several wheel turns. The eye has literally nothing to look at.
- **Outreach Break Is Jarring:** The transition from `#08090A` to `#EAE5DB` snaps abruptly rather than flowing as a deliberate editorial reveal.

---

### 2.3 Palette Discipline
`DESIGN.md` §2 strictly limits color:
> *"The site is near-monochrome. Color is permitted in exactly TWO places: amber accents (#C5A059) and the Outreach section."*

**Violations Audited:**
1. **Descent Layer 2 (`descent-02.png`):** Features an intense, saturated fluorescent green background (average RGB: `58.6, 88.2, 50.3`). This is an uncalibrated AI image containing vivid foliage greens, completely violating the strict monochrome spec.
2. **Descent Layer 1 (`descent-01.png`):** Contains warm brown wood tones and reddish hues on the synthetic insect body and ruler.
3. **Preloader Status Pill:** Uses default Tailwind `text-amber-500` (`#F59E0B`) instead of the calibrated brand amber (`#C5A059` / `var(--amber)`).

---

### 2.4 Typography & Font Loading Catastrophe
1. **Zero Self-Hosted Fonts Exist:**
   In `src/app/globals.css` (lines 8–68), six `@font-face` rules are declared:
   - `/fonts/Cinzel-Regular.woff2`
   - `/fonts/Cinzel-Medium.woff2`
   - `/fonts/Cinzel-SemiBold.woff2`
   - `/fonts/Newsreader-Regular.woff2`
   - `/fonts/Newsreader-Italic.woff2`
   - `/fonts/JetBrainsMono-Regular.woff2`
   
   **Inspection of `/public/fonts/` reveals the folder is completely empty.** Every single font request returns HTTP 404.
2. **Universal Font Fallback Degradation:**
   Because all `@font-face` declarations fail:
   - All display headlines fall back to local system **Georgia / Times New Roman**.
   - All mono metadata, scale bars, and coordinates fall back to system **Courier**.
   - The site’s intended high-craft, award-winning editorial typography does not exist in production.

---

### 2.5 The Mascot Bug SVG (`MascotBug.tsx`)
- **Visual Assessment:** The mascot on `/outreach` and `/404` is an amateurish, cartoonish SVG vector with perfectly circular cartoon eyes, an oval body, and stick antennae.
- **Craft Disparity:** It looks like a clip-art icon downloaded from an introductory web tutorial. Placing this cartoonish vector alongside serious academic taxonomy claims (*"Zootaxa"*, *"Holotype Deposited in UASB"*, *"Genitalic Dissection"*) completely undermines the professional credibility of Dr. Yeshwanth and destroys the site’s award submission caliber.

---

### 2.6 Image Craft & AI Tells Audit
Every image currently deployed was analyzed for photographic authenticity vs. synthetic generation:

| Asset Path | Spec Code | Photographic vs AI | Visual Tells & Defects |
| :--- | :--- | :--- | :--- |
| `/media/hero/hero-low.webp` | `HERO-01` | **AI-Generated** | Symmetrical hexagonal grid lacks biological irregularity; facets have metallic chrome specular highlights typical of Midjourney 3D prompts. |
| `/media/hero/hero-high.webp` | `HERO-02` | **AI-Generated** | Over-sharpened plastic micro-textures; setae (hairs) emerge at physically impossible angles with no cuticular sockets. |
| `/media/descent/descent-01.png` | `DESCENT-01` | **AI-Generated** | Depicts a nonsensical wooden ruler with illegible synthetic lettering: `"CARNIVALA GRASSLAND DISCOVERY"`. Morphology represents no living insect order. |
| `/media/descent/descent-02.png` | `DESCENT-02` | **AI-Generated** | Saturated lime green lighting. Head and pronotum anatomy blend into a molten, unsegmented plastic cuticle. |
| `/media/descent/descent-03.png` | `DESCENT-03` | **AI-Generated** | Wing venation defies hemipteran morphology; cells terminate abruptly without marginal veins. |
| `/media/descent/descent-04.png` | `DESCENT-04` | **AI-Generated** | Synthetic micro-mesh resembling carbon fiber rather than real insect genitalia or cuticular micro-pilosity. |

**Summary:** There is not a single authentic scientific photograph on the homepage. Every image is an AI generation with glaring anatomical and physical tells.

---

## PART 3 — SCIENTIFIC INTEGRITY (Highest Severity)

### 3.1 Binomial Italicisation & Authority Standards
`CLAUDE.md` §4.1 establishes strict taxonomic rules:
> *"Every species binomial MUST render through `<Binomial>`: genus + specific epithet in italics, authority + year in roman."*

**Violations Audited:**
1. **Unformatted Binomial in Preloader:** `src/components/layout/Preloader.tsx` line 166:
   ```tsx
   <span className="font-mono text-xs text-amber-500">Hypseloecus sandalum Yeshwanth, 2014</span>
   ```
   Renders the author and year in italic monospace without `<Binomial>`.
2. **Publications Page Binomial Violations:** In `src/app/publications/page.tsx` (lines 142–156), publication titles are rendered as raw text strings:
   ```tsx
   <p className="text-bone-light font-display text-lg mb-2">{pub.title}</p>
   ```
   Titles such as *"Two new species of the genus Hypseloecus Reuter from India"* contain genus names (*Hypseloecus*) in plain roman text. This is an egregious violation of International Code of Zoological Nomenclature (ICZN) publication conventions.
3. **Empty Authorities on Eponymous Species:** In `src/content/species.ts`:
   - Line 76: *Evacanthus yeshwanthi* → `authority: ''`
   - Line 83: *Oryctopterus yeshwanthi* → `authority: ''`
   - Line 90: *Axiagastus yeshwanthi* → `authority: ''`
   
   These three species were named in honour of Dr. Yeshwanth by external taxonomists. Omitting their authorities makes the records taxonomically incomplete.

---

### 3.2 AI Images Adjacent to Species Binomials (CRITICAL VIOLATION)
`CLAUDE.md` §4.1 explicitly mandates:
> *"CRITICAL RULE: NEVER pair an AI-generated insect image with a real species name. A real species name constitutes a scientific assertion: that the photograph shows that species. Pairing an AI-generated insect with a real binomial is scientific fabrication."*

**Live Violations in Production:**
1. **Act 3 Descent Layer 4 (`Descent.tsx` lines 284–290):**
   The real holotype taxon:
   ```tsx
   <Binomial name="Hypseloecus sandalum" authority="Yeshwanth, 2014" />
   ```
   is overlaid directly across `/media/descent/descent-04.png`—an AI-generated synthetic wing/cuticle texture.
2. **Act 3 Descent Layer 1 (`Descent.tsx` lines 236–242):**
   The real taxon:
   ```tsx
   <Binomial name="Ernestinus mimicus" authority="Distant, 1911" />
   ```
   is overlaid directly across `/media/descent/descent-01.png`—an AI generation containing the fake wooden ruler.

**This is an immediate, zero-tolerance violation of scientific integrity.**

---

### 3.3 Systematic Taxonomic Errors in `src/content/species.ts`
In `src/content/species.ts`, non-genus taxonomic ranks (subfamilies and tribes) are erroneously entered as genera and paired with invalid families:

| Entry Name | Erroneous Property in Code | Code Value | True Biological Rank & Taxon |
| :--- | :--- | :--- | :--- |
| `Cylapinae` | `genus` | `'Cylapinae'` | Subfamily of Miridae (not a genus) |
| `Hyalopeplini` | `genus` | `'Hyalopeplini'` | Tribe of Miridae (not a genus) |
| `Mecistoscelini` | `genus`, `family` | `'Mecistoscelini'`, `'Berytidae'` | Tribe of Miridae; **NOT** family Berytidae |
| `Stegelytrini` | `genus`, `family` | `'Stegelytrini'`, `'Miridae'` | Tribe of Cicadellidae; **NOT** family Miridae |
| `Scaphoideini` | `genus` | `'Scaphoideini'` | Tribe of Cicadellidae (not a genus) |
| `Isometopinae` | `genus` | `'Isometopinae'` | Subfamily of Miridae (not a genus) |
| `Eccritotarsini` | `genus` | `'Eccritotarsini'` | Tribe of Miridae (not a genus) |
| `Hylicinae` | `genus`, `family` | `'Hylicinae'`, `'Hylicinae'` | Subfamily of Cicadellidae; **NOT** a family |
| `Ledrinae` | `genus` | `'Ledrinae'` | Subfamily of Cicadellidae (not a genus) |

When rendered in `SpeciesMarquee.tsx`, these invalid family strings (`"BERYTIDAE: MECISTOSCELINI"`, `"MIRIDAE: STEGELYTRINI"`) are displayed to visitors as factual scientific data. Any entomologist or academic reviewer will immediately flag this as amateurish error.

---

### 3.4 Untraceable & Invented Numbers
Tracing every metric against `CONTENT.md`:
- **"150+ TAXA DESCRIBED":** Present in `src/app/opengraph-image.tsx` (line 122). `CONTENT.md` and Dr. Yeshwanth’s CV document **24 species and 2 genera (26 total taxa)**. "150+" is a fabricated marketing hallucination.
- **"Two decades of field research":** Rendered on `/services/page.tsx` (line 38). `CONTENT.md` documents 16 years (2008–2024).
- **"600+ Participants Trained", "40+ Workshops", "15+ Institutions":** Displayed on Homepage Act 6 and `/outreach`. None of these figures exist in `CONTENT.md` or are supported by publication records.
- **17 Mock Publications on `/publications`:** `src/content/publications.ts` contains 17 entries, all marked `verified: false`. Dr. Yeshwanth's CV records 36 publications. The 17 entries in code were generated as unverified placeholders.

---

## PART 4 — CODE AUDIT

### 4.1 Unused Dependencies & Dead Code
- **Unused Dependency:** `framer-motion` (`^12.43.0`) is installed in `package.json` (35+ KB bundle weight) but is **never imported in a single file across the entire project**.
- **Orphaned UI Components:**
  - `src/components/ui/SpecimenLabel.tsx` — Never imported or used.
  - `src/components/ui/MonoLabel.tsx` — Never imported or used.
  - `src/components/ui/Rule.tsx` — Never imported or used.
  - `src/hooks/useReducedMotion.ts` — Custom hook defined but never imported.
- **Default Next.js Boilerplate Assets in `/public`:**
  - `/public/file.svg`, `/public/globe.svg`, `/public/next.svg`, `/public/vercel.svg`, `/public/window.svg` remain in production.

---

### 4.2 Architecture Violations

#### Multiple Concurrent `requestAnimationFrame` Loops
`ARCHITECTURE.md` §6 mandates a single unified animation loop via Lenis/GSAP ticker.
In actual code, **three uncoordinated rAF loops run continuously in the background**:
1. `src/hooks/usePointerLens.ts` (lines 48–66): Continuous rAF loop updating lens position.
2. `src/components/home/LensStage.tsx` (lines 74–95): Continuous rAF loop running canvas draw calls even when the hero has scrolled completely out of view.
3. `src/components/home/Capabilities.tsx` (lines 104–128): Continuous rAF loop computing mouse coordinates for the floating preview card even when not hovering.

#### Leaked & Orphaned `will-change`
`ARCHITECTURE.md` §6 prohibits permanent `will-change`.
Audited permanent instances creating retained GPU memory layers:
- `src/app/globals.css` (lines 188, 194): `.layer-base` and `.layer-reveal` have permanent `will-change: transform`.
- `src/components/home/LensStage.tsx` (line 120): `ref={readoutRef}` has permanent `will-change: transform`.
- `src/components/home/SpeciesMarquee.tsx` (line 68): Outer ticker tracks have permanent `will-change-transform`.
- `src/components/home/Capabilities.tsx` (line 134): Floating preview card has permanent `will-change: transform`.

#### Native `<a>` Tags Breaking SPA Navigation in `Button.tsx`
In `src/components/ui/Button.tsx` (line 67):
```tsx
if (href) {
  return (
    <a href={href} className={classes}>
      {content}
    </a>
  );
}
```
`Button` renders raw native `<a>` tags instead of Next.js `<Link>`. Every time a user clicks `"INITIATE ENGAGEMENT"`, `"EXPLORE OUTREACH PROGRAMMES"`, or any other button CTA, **the browser performs a hard full-page reload**, destroying the Lenis smooth scroll instance and re-triggering asset evaluation.

---

### 4.3 Typecheck & Linter Output
- `npx tsc --noEmit`: **0 errors** (TypeScript compiles cleanly).
- `npm run lint`: **0 errors, 0 warnings** (ESLint passes).

---

## PART 5 — PERFORMANCE AUDIT

Audits conducted against production build on `http://localhost:3000` via Chrome Lighthouse (v12.x mobile and desktop profiles):

### 5.1 Lighthouse Scorecard vs Budget

| Metric | Spec Budget (`ARCHITECTURE.md` §8) | Homepage (Mobile) | Homepage (Desktop) | About (Mobile) | Services (Mobile) | Pass / Fail |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Performance Score** | **≥ 90** | **78** ❌ | **97** | **100** | **98** | **FAIL (Mobile HP)** |
| **Accessibility Score** | **≥ 95** | **96** | **96** | **93** ❌ | **95** | **FAIL (About)** |
| **Best Practices** | **≥ 95** | **96** | **96** | **96** | **96** | **PASS** |
| **SEO Score** | **100** | **100** | **100** | **100** | **100** | **PASS** |
| **LCP (Largest Contentful Paint)** | **< 2.2s** | **5.1s** ❌ | **0.9s** | **1.8s** | **2.5s** ❌ | **FAIL (HP & Services)** |
| **CLS (Cumulative Layout Shift)** | **< 0.05** | **0.002** | **0.000** | **0.000** | **0.000** | **PASS** |
| **TBT (Total Blocking Time)** | **< 150ms** | **60ms** | **10ms** | **0ms** | **10ms** | **PASS** |
| **Total JavaScript Transferred** | **< 190 KB** | **221 KB** ❌ | **221 KB** ❌ | **168 KB** | **172 KB** | **FAIL (Homepage)** |

### 5.2 Heaviest Assets & Scripts Breakdown
- **Mobile LCP Breakdown (5.1s):**
  The LCP element is the hero reveal image (`/media/hero/hero-high.webp`), weighing **824 KB**. Because it is unoptimized for mobile screen sizes and rendered via a client canvas/clip-path, the mobile browser download queue stalls LCP at over 5 seconds.
- **JavaScript Bloat:**
  Total transferred JS is **221 KB**, exceeding the 190 KB budget by 31 KB. The inclusion of `gsap` + `lenis` + unused `framer-motion` + un-split client components drives up initial parse time.

---

## PART 6 — ACCESSIBILITY (a11y)

### 6.1 Catastrophic Reduced Motion Failure
When tested under `@media (prefers-reduced-motion: reduce)`:
- In `src/components/home/TaxonomicArgument.tsx` (lines 142–165), all 5 sentences are positioned `absolute inset-0`. When GSAP animations are disabled, CSS overrides apply `opacity: 1 !important` to all sentences simultaneously.
- **Result:** All 5 sentences render on top of each other in a solid, illegible block of overlapping text. The manifesto becomes completely unreadable.

```
Evidence screenshot:
/Users/prajwal/.gemini/antigravity-ide/brain/f3388004-1615-490f-9d19-72d005bdc13b/screenshots/homepage-reduced-motion-manifesto.png
```

### 6.2 WCAG AA Contrast Ratio Violations

| Element / Class | Foreground Color | Background Color | Measured Ratio | WCAG AA Req | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Subline & Mono Meta (`text-bone-faint`) | `#6E6B65` | `#08090A` (`--void`) | **2.3 : 1** | 4.5 : 1 (Normal Text) | **FAIL** |
| Section Labels (`text-bone-faint`) | `#6E6B65` | `#08090A` (`--void`) | **2.3 : 1** | 4.5 : 1 (Normal Text) | **FAIL** |
| Act 6 Outreach Initial State (`text-void`) | `#08090A` | `#08090A` (unscrolled) | **1.0 : 1** | 4.5 : 1 | **FAIL (Invisible)** |
| About Page Timeline Details (`text-bone-faint`)| `#6E6B65` | `#08090A` | **2.3 : 1** | 4.5 : 1 | **FAIL** |

### 6.3 Keyboard Navigation & Traversal
1. **Marquee Cards Unfocusable:** Species cards in `SpeciesMarquee.tsx` are rendered as `<article>` elements with no `tabIndex`, preventing keyboard users from inspecting type localities or authorities.
2. **Missing Mobile Nav Drawer:** Keyboard users on viewports `< 768px` cannot tab through or open any site navigation because the links are hidden with `display: none` (`hidden md:flex`).

### 6.4 Heading Hierarchy
- All tested pages maintain a single `<h1>` element.
- Hierarchy issue in `RecordContact.tsx`: An `<h4>` is used for publication titles directly under an `<h2>` without an intervening `<h3>`.

---

## PART 7 — SEO & AEO AUDIT

### 7.1 Structured Data (JSON-LD) Validation
1. **Broken Logo URL in Schema:**
   In `src/lib/schema.ts` (line 14), `organizationSchema` declares:
   ```ts
   logo: "https://entobioconsult.com/brand/logo.png"
   ```
   **`/public/brand/` does not exist.** This URL returns HTTP 404, causing Google Rich Results validation to flag an invalid entity logo.
2. **Fake Google Scholar Parameter:**
   In `src/lib/schema.ts` (line 22), the Person schema links to:
   ```ts
   "https://scholar.google.com/citations?user=yeshwanth"
   ```
   This is an invalid mock parameter (`user=yeshwanth`).
3. **Orphaned Breadcrumb Schema:**
   `breadcrumbSchema` is defined in `src/lib/schema.ts` but is never imported or injected into any page layout.

### 7.2 Core Files & Meta Tags
- `sitemap.xml`: Present and valid.
- `robots.txt`: Present and valid.
- `llms.txt`: Present at `/public/llms.txt`, well-formatted for AI crawlability.
- **Client Component Metadata Blindspot on `/publications`:**
  `src/app/publications/page.tsx` starts with `'use client'`. Because Next.js App Router forbids exporting `metadata` from Client Components, `/publications` lacks a custom `<title>` and `<meta name="description">`, falling back to generic root metadata.

---

## PART 8 — CONTENT AUDIT

### 8.1 American Spelling Violations
`CONTENT.md` §15 strictly dictates British English spelling.
- **Violation in `/src/app/services/page.tsx` (line 39):**
  Uses American spelling: `"specialized equipment"` instead of the required British English: `"specialised equipment"`.

### 8.2 Hyphenation & Voice Rule Violations
`CONTENT.md` §15 Voice Rules state:
> *"No breathless em-dashes. Use a colon or a full stop. Never use hype words: premier, cutting-edge, passionate, world-class."*
- **Em-Dash Overuse:** Found in `TaxonomicArgument.tsx` (line 42):
  ```
  "The specimen does not yield to haste — it yields to patience..."
  ```
  Should be punctuated with a colon or period per the style guide.

### 8.3 Broken Links & Dead Buttons
1. **Footer Socials:** `ResearchGate` and `Google Scholar` in `Footer.tsx` are unclickable dead `<span>` elements.
2. **Contact Form Access Key Missing:** In `RecordContact.tsx` (line 277), the Web3Forms access key is defaulted to:
   ```tsx
   process.env.NEXT_PUBLIC_WEB3FORMS_KEY || 'YOUR_ACCESS_KEY_HERE'
   ```
   If the environment variable is not supplied, form submissions silently fail or throw a third-party error.

---

## PART 9 — YOUR VERDICT

### 1. If this launched tomorrow, what is the single most embarrassing thing on it?
**The complete failure of font loading.**  
Every display headline, section title, scientific binomial, and scale bar on the site currently falls back to standard browser **Georgia / Times New Roman** and **Courier** because `/public/fonts/` contains no font files. For a site claiming to be an award-submission-grade piece designed with "typographic precision," launching with raw browser-default Times New Roman is devastating.

### 2. What would stop an awards jury within the first ten seconds?
**The broken hero lens interaction and AI ommatidia texture.**  
An awards jury (Awwwards, FWA) immediately moves their cursor over the hero. Within five seconds, they will see:
1. The circular lens drags over the text and violently inverts the headline into an unreadable, muddy olive-grey zebra pattern via `mix-blend-mode: difference`.
2. The coordinate readout clips directly into the headline text.
3. The underlying image is instantly recognizable as an AI-generated 3D honeycomb rendering rather than an authentic photographic focus-stack of an insect eye.  
The jury will immediately dismiss the site as an AI-generated mock portfolio rather than a genuine scientific achievement.

### 3. What are the five highest-leverage changes? (Ranked by quality gained per hour)

1. **Provide the 6 WOFF2 font files in `/public/fonts/` (15 minutes).**  
   Immediately restores Cinzel, Newsreader, and JetBrains Mono across the entire domain, transforming the visual identity from a broken default layout into an editorial artifact.
2. **Remove `mix-blend-mode: difference` from `.hero-type` and fix lens boundaries (30 minutes).**  
   Instantly fixes the jarring typographic inversion and text clipping in the hero section.
3. **Delete AI images from Act 3 (Descent) and purge binomial pairings with synthetic media (1 hour).**  
   Resolves the critical `CLAUDE.md` §4.1 scientific fabrication violation and eliminates the hallucinated wooden ruler reading *"CARNIVALA GRASSLAND DISCOVERY"*.
4. **Fix the Reduced Motion CSS collision in `TaxonomicArgument.tsx` (45 minutes).**  
   Prevents all 5 sentences from collapsing into an overlapping, illegible mass of text on devices with reduced motion enabled.
5. **Fix the Preloader GSAP context scope bug and eliminate native `<a>` tags in `Button.tsx` (1 hour).**  
   Restores the smooth choreographed optical entrance animation and stops CTA buttons from triggering hard browser reloads that break smooth scrolling.

### 4. What is built that should simply be deleted?
1. **The Mascot SVG (`MascotBug.tsx`):** Delete immediately. It is a cartoonish, clip-art-style illustration that clashes completely with the high-craft scientific aesthetic.
2. **The Floating Preview Card in `Capabilities.tsx`:** Delete. The spec explicitly stated *"not cards — horizontal rows separated by 1px rules"*. The floating card runs an unnecessary rAF loop and clutters the UI.
3. **`framer-motion` Dependency:** Uninstall from `package.json`. It adds 35+ KB of unused bundle overhead.
4. **Synthetic Wooden Ruler Image (`descent-01.png`):** Delete. It is an embarrassing AI hallucination.

### 5. Is the hero concept working, or does it need to be rethought?
**Plain answer: The concept is sound, but the current execution is broken.**

The optical lens reveal (moving from low-magnification dark-field context to high-magnification focus-stacked detail) is a compelling metaphor for taxonomy. However, it fails because:
1. **The interaction is purely cosmetic:** It does not feel like operating an optical instrument; it feels like dragging a CSS mask. It lacks calibrated vernier scale marks, focus depth, and optical graticules.
2. **The asset is synthetic:** The image being magnified is an AI prompt of an insect eye, not real microscopy. Scientific users and design juries see through this immediately.
3. **The typography collides:** The lens obliterates the headline it passes over.

**Recommendation:** Retain the dual-magnification concept, but replace the AI texture with authentic high-resolution focus-stacked microscopy, remove the `difference` blend mode from the typography, and anchor the lens with authentic optical microscope graticule markings.
