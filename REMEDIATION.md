# REMEDIATION.md — ENTOBIO CONSULT
**Six batches, in order. One Antigravity session per batch. Do not reorder.**

Add `FACTS.md` to the repo root first. It overrides every other document, including the audit.

---

## ⚠️ READ BEFORE STARTING

The audit report in this repo contains one significant error. It claims **"150+ taxa described"** is a fabricated figure and that the true number is 24 species and 2 genera.

**That is wrong.** Dr. Yeshwanth's CV states, in his own words: *"Insects discovered new to science – 150 species (mirid bugs and leafhoppers)."* 150 is verified. The lower figure was introduced when this repo's `CONTENT.md` was rewritten during the build.

The specification documents in this repository drifted substantially from the originals — different fonts, different colours, different headline copy, different numbers. **`FACTS.md` is now the single source of truth.** Where any repo document disagrees with it, `FACTS.md` wins. Do not modify `FACTS.md`.

---

## BATCH 1 — FONTS AND TOKENS
*Fifteen minutes. Transforms the entire site.*

> The site is currently rendering in Times New Roman and Courier because `/public/fonts/` is empty while `globals.css` declares six `@font-face` rules pointing at files that do not exist.
>
> Read `FACTS.md` §8. The repo drifted to Cinzel and Newsreader; the correct faces are **Instrument Serif** (400, 400 italic), **Inter Tight** (400, 500) and **Geist Mono** (400, 600). All three are free.
>
> Download the woff2 files into `/public/fonts/`, rewrite the `@font-face` declarations to match, set `font-display: optional` on all of them, and update the Tailwind font family config.
>
> Then correct every design token in `globals.css` to the values in `FACTS.md` §8. Note that `--bone-dim` rises to `0.72` and `--bone-faint` to `0.38` — the previous values were failing WCAG AA.
>
> Grep for and eliminate every raw Tailwind colour utility (`text-amber-500` and similar). Tokens only. The preloader status pill is one known instance.
>
> Fix the footer colophon to name the correct three fonts.
>
> Verify visually at 1920 and 390 that real fonts are loading before finishing.

---

## BATCH 2 — SCIENTIFIC INTEGRITY
*The highest-severity batch. Nothing here is cosmetic.*

> Read `FACTS.md` §1, §2, §3 and §4 in full.
>
> **2a. Delete `src/content/species.ts`.** It lists subfamilies and tribes as genera (*Cylapinae*, *Hylicinae*, *Isometopinae*) and assigns several to the wrong family (*Stegelytrini* to Miridae when it is Cicadellidae; *Mecistoscelini* to Berytidae when it is Miridae). An entomologist reads this as a first-year error on his own website. We cannot verify individual binomials and must not invent them.
>
> **2b. Rebuild the marquee as a publications marquee.** Create `src/content/publications.ts` from the 31 international papers plus the book listed in `FACTS.md` §4. Each card: subject line in Instrument Serif, journal and volume in Geist Mono, year in `--amber`. Any genus name appearing in a title must be italic.
>
> Keep the section header *"One hundred and fifty species."* The papers are the evidence for that number.
>
> Preserve the existing marquee mechanics. Add pause-on-hover. Make cards keyboard-focusable with `tabIndex={0}`.
>
> **2c. Present the three eponymous taxa separately** as a distinct honours block, not mixed into the marquee. Amber border, `NAMED IN HIS HONOUR`. No authority string — we do not know it and must not invent one.
>
> **2d. Remove every AI image paired with a real species name.** In `Descent.tsx`, *Hypseloecus sandalum* sits over `descent-04.png` and *Ernestinus mimicus* over `descent-01.png`. Both are generated images. Delete the binomial captions entirely — the images become uncaptioned atmosphere. Delete `descent-01.png`, which contains a hallucinated wooden ruler reading "CARNIVALA GRASSLAND DISCOVERY".
>
> **2e. Delete every fabricated statistic:** `600+` participants, `40+` workshops, `15+` institutions, and `"Two decades of field research"` (the correct figure is 16 years). Remove them; do not substitute smaller numbers. He never gave us these.
>
> **2f. Correct `150+` wherever it appears** — including `opengraph-image.tsx` — to a plain `150`, and confirm no document in the repo still claims 24 or 26.
>
> **2g.** Fix the unformatted binomial in `Preloader.tsx` line 166 and italicise genus names in publication titles on `/publications`. Everything through `<Binomial>`.

---

## BATCH 3 — BREAKING BUGS

> **3a. Preloader GSAP scope.** In `Preloader.tsx` the timeline is wrapped in `gsap.context(..., containerRef)` where `containerRef` is the overlay div. It then queries `.layer-base`, `.layer-reveal` and `.hero-type`, which live in a sibling subtree in `Hero.tsx` and are never found. The hero entrance animation has never once run. Either scope the context to a shared parent or pass element refs directly.
>
> **3b. Descent pin conflict.** `Descent.tsx` line 212 applies `sticky top-0` while line 105 passes the same element to ScrollTrigger `pin`. This is explicitly forbidden — it causes stutter and erratic offsets in WebKit. Remove the CSS sticky; use ScrollTrigger pinning alone.
>
> **3c. Reduced-motion manifesto collapse.** In `TaxonomicArgument.tsx` all five sentences are `absolute inset-0 opacity-0`. Under `prefers-reduced-motion` a CSS override sets them all to `opacity: 1`, stacking five paragraphs on top of each other. Restructure so the reduced-motion path renders them as a normal vertical stack in flow. Also ensure that if GSAP fails to initialise, the section is readable rather than an empty black void.
>
> **3d. Button hard reloads.** `Button.tsx` renders a raw `<a>` for internal hrefs, so every CTA triggers a full page reload and destroys the Lenis instance. Use Next `<Link>` for internal routes; keep `<a>` only for external.
>
> **3e. Consolidate rAF loops.** Three run concurrently — `usePointerLens.ts`, `LensStage.tsx`, `Capabilities.tsx` — and none pause when off-screen. Consolidate to one, driven by the GSAP ticker, with an IntersectionObserver pausing it when the hero leaves the viewport.
>
> **3f. Mobile navigation.** Below 768px there is no navigation at all — links are `hidden md:flex` with no hamburger and no drawer. Mobile visitors currently cannot reach any inner page from the nav. Build a proper full-screen overlay menu, keyboard accessible.
>
> **3g.** Fix the broken `/services` anchors in `Capabilities.tsx` — the hrefs and the section IDs do not match.

---

## BATCH 4 — HERO

> The audit's verdict is that the lens concept is sound but the execution is broken. Fix the execution.
>
> **4a. Remove `mix-blend-mode: difference` from `.hero-type`.** When the lens sweeps the headline it inverts the letters into unreadable olive-grey artefacts. It looks broken to a jury within five seconds. Replace with solid `--bone` type and a soft `text-shadow` for legibility over bright areas.
>
> **4b. Fix the collision.** Below 1024px the lens circle overlaps the headline and the coordinate readout clips through the subline. Constrain the lens travel or reposition the type so they never intersect.
>
> **4c. Restore the correct headline** per `FACTS.md` §9: *"Everything begins with a name."* The repo drifted to *"Rigour begins with the specimen."*
>
> **4d. Make the lens feel like an instrument, not a cursor follower.** Add a calibrated graticule inside the lens — fine crosshair with tick marks — and a thin rotating dashed amber arc on the rim. Keep the coordinate readout but move it clear of the type. This is the difference between a hover effect and an optical instrument.
>
> **4e. Fix mobile LCP.** It is currently 5.1 seconds against a 2.2 second budget; the hero reveal image is an unoptimised 824 KB WebP. Serve AVIF with responsive `sizes`, preload it, add an LQIP placeholder. Confirm both lens layers read from a single source file.
>
> Note: the hero image itself is AI-generated and will be replaced once Dr. Yeshwanth's photographs arrive. Build so that swap is a one-line change.

---

## BATCH 5 — CLEANUP AND ACCESSIBILITY

> **5a. Delete:** `MascotBug.tsx` (amateur clip-art quality, clashes with everything around it), the floating cursor preview card in `Capabilities.tsx`, the `framer-motion` dependency (installed, never imported, 35 KB), the unused components `SpecimenLabel.tsx` / `MonoLabel.tsx` / `Rule.tsx` / `useReducedMotion.ts`, and the default Next.js boilerplate SVGs in `/public`.
>
> **5b. Fix the Outreach entrance.** The section begins with `--void` background and `text-void` type — black on black, 1:1 contrast — until ScrollTrigger interpolates. Set the initial state so text is legible from the first frame.
>
> **5c. Contrast.** With the raised token values from Batch 1, re-verify every text and background pair against WCAG AA. `--bone-faint` is decorative only and must never carry body copy.
>
> **5d. Clear every permanent `will-change`** in `globals.css`, `LensStage.tsx`, `SpeciesMarquee.tsx`, `Capabilities.tsx`. Set to `auto` on animation complete.
>
> **5e.** Fix heading hierarchy in `RecordContact.tsx` (h4 under h2). Separate the merged Record and Contact sections. Resolve the duplicate "THE RECORD" section labels and renumber the acts consistently.
>
> **5f.** Footer: make the ResearchGate and Google Scholar links real, using the URLs in `FACTS.md` §6. They are currently dead `<span>` elements.
>
> **5g.** Schema: replace the fake Google Scholar URL in `src/lib/schema.ts` with the real one. Remove the `logo` field until a real logo file exists at that path. Wire up the orphaned `breadcrumbSchema`.
>
> **5h.** Move `/publications` metadata out of the client component so the page gets its own title and description.
>
> **5i.** Content: `"specialized"` → `"specialised"` on `/services`. Remove em-dashes from body copy per `FACTS.md` §10. Set the Web3Forms key as a real environment variable in Vercel.

---

## BATCH 6 — THE IMAGING PAGE

> Build `/imaging` per `IMAGING-PAGE-SPEC.md`, **with the scope correction in `FACTS.md` §7**: Indian institutions only. Dr. Yeshwanth has confirmed international specimen shipping is not viable due to permit complexity. Remove any language implying worldwide intake.
>
> Build the hero, the six-row services index, deliverables, specimen handling, and the structured enquiry form.
>
> Leave every operational commitment — file formats, scale bars, proof plates, specimen return, turnaround times — as TODO comments pending his confirmation. These are promises he has to honour on delivery, not copy we get to write for him. Do not ship unconfirmed claims.
>
> The focus-stack comparison slider is blocked on his files. Build the component and gate it behind an asset check so it appears the moment they arrive.
>
> Promote **Imaging** to a top-level nav item. Point the homepage Capabilities imaging row and the `/services` imaging section here.
>
> Add `Service` JSON-LD per row and the page summary to `/public/llms.txt`.

---

## AFTER ALL SIX

Re-run the full audit. Then report back:
- Lighthouse mobile homepage — target ≥ 90, LCP < 2.2s, JS < 190 KB
- Confirmation that no generated image sits adjacent to any species name
- Confirmation that every number on the site appears in `FACTS.md` §1
- Confirmation that real fonts are loading

Still outstanding after that, and blocked on Dr. Yeshwanth: all real photography, the focus-stack slider files, and confirmation of the imaging page commitments.
