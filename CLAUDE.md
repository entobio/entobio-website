# CLAUDE.md — ENTOBIO CONSULT
**Master context. Auto-loaded every session. Read fully before writing any code.**

---

## 1. WHAT THIS IS

A single-page-focused marketing website for **EntoBio Consult** — an independent insect taxonomy, biodiversity research and scientific macro imaging consultancy in Bengaluru, founded by **Dr. H. M. Yeshwanth, FRES**.

Built by **BuildRocket Labs**. Pro bono for the client. **The real objective is that this becomes BuildRocket Labs' flagship portfolio asset** — the site we show to win $2K–5K international clients.

**Therefore: the homepage is the product.** Inner pages exist to make the site complete, not to be impressive. Effort allocation is roughly 70% homepage, 30% everything else. Never invert this.

---

## 2. THE STANDARD

This site is being built to be submitted to Awwwards, CSSDA and FWA.

Concretely, that means:
- The hero must produce a stop-and-play reaction within three seconds
- Motion must feel authored, not applied — every easing curve deliberate
- Typography must be confident and large, never timid
- Nothing may look like a template, a Framer starter, or a Tailwind UI block
- Performance must not be sacrificed for it (Lighthouse mobile ≥ 90)

**The test, before shipping any section:** *would a senior designer screenshot this?* If not, it isn't finished.

---

## 3. THE CONCEPT — "THE LENS"

The homepage is the experience of looking through a microscope.

You arrive out of focus. The page racks into sharpness. You move a lens across the hero and the specimen beneath resolves. You scroll and descend through six orders of magnitude into the insect. Then you come back out.

**Every effect on this site is justified by that metaphor.** If a visual element could be swapped onto a fintech landing page without loss, it does not belong here.

Full implementation spec: **`HOMEPAGE-BUILD-SPEC.md`**. That document is authoritative for the homepage. This one is authoritative for everything else.

---

## 4. NON-NEGOTIABLE RULES

### 4.1 Scientific accuracy — the highest-severity rule
This is a working taxonomist's own website. His peers will read it.

- **Every genus and species name is italic.** Always. `<i>` or a `.binomial` class. No exceptions.
- Authority and year are **roman**, never italic: *Hypseloecus sandalum* Yeshwanth, 2014
- Family and order names are roman, capitalised: Miridae, Hemiptera
- `sp. nov.`, `gen. nov.`, `comb. nov.` are italic
- **Never invent a species name, a date, an authority, a citation or a DOI.** If a value isn't in `src/content/` marked `verified: true`, it does not render. Use the placeholder mechanism in `CONTENT.md` instead.

A fabricated binomial on a taxonomist's site is the single most damaging bug possible in this project. Treat any uncertainty as a blocker.

### 4.2 No invented statistics
Standing BuildRocket doctrine. Every number on this site traces to his CV. The verified set is in `CONTENT.md`. Do not add, round, extrapolate or estimate.

### 4.3 No stock photography
The client explicitly banned stock insect images. Every photograph is his. If an asset is missing, ship the section with fewer items — never with a placeholder that could be mistaken for real.

Illustrated insects must be **visibly illustrations** (line art, flat vector). Never a generated image presented as a real specimen.

### 4.4 No Three.js / WebGL / Vanta
Not needed. Every effect in the spec is CSS transforms, `clip-path`, and GSAP scrub. Do not introduce a 3D dependency to solve a problem that a transform solves.

### 4.5 No browser storage in artifacts or components
No `localStorage` / `sessionStorage` except the single preloader-seen flag, which must be feature-detected and fail silently.

---

## 5. STACK

```
Next.js 15 (App Router) · TypeScript (strict) · Tailwind CSS
GSAP + ScrollTrigger  — all scroll-driven motion
Lenis                 — smooth scroll
Framer Motion         — component-level micro-interactions ONLY
Web3Forms             — contact form
Vercel                — hosting
```

**No CMS.** Content lives in typed TS files under `src/content/`. The client will not be editing this site; a CMS is a week of work protecting against an event that will not happen.

**GSAP and Framer Motion must never animate the same element.** GSAP owns anything tied to scroll. Framer owns hover, tap, and mount/unmount on isolated components.

---

## 6. HARD-WON BUGS — READ BEFORE BUILDING MOTION

### 6.1 ScrollTrigger / font-swap desync
Fonts loading after ScrollTrigger initialises shifts layout and destroys pinned section calculations. **Every** ScrollTrigger setup must be gated:

```ts
useEffect(() => {
  let ctx: gsap.Context;
  document.fonts.ready.then(() => {
    ctx = gsap.context(() => { /* create triggers here */ }, scope);
    ScrollTrigger.refresh();
  });
  return () => ctx?.revert();
}, []);
```

Also set `font-display: optional` on display faces.

### 6.2 Lenis vs `position: sticky`
Native sticky behaves unpredictably inside a Lenis-managed scroll container. **Use ScrollTrigger `pin: true`, never CSS sticky**, for any pinned section.

### 6.3 Canonical URL drift
One source of truth: `src/lib/site.ts`. Every canonical tag, OG URL, sitemap entry and JSON-LD `url` reads from it. Never hardcode a domain anywhere else. (We shipped a site with a wrong canonical once. Not again.)

### 6.4 `will-change` leaks
`will-change` left on after animation completes causes GPU memory pressure and mobile jank. Always clear it:
```ts
onComplete: () => { el.style.willChange = 'auto'; }
```

### 6.5 DNSSEC
Before pointing the domain, confirm DNSSEC state at the registrar. A key mismatch silently kills both site and email with no obvious error. This has cost us a live client site before.

---

## 7. ACCESSIBILITY

The audience includes senior academics and government officers. This is not optional polish.

- WCAG AA contrast minimum on all text. Verify `--bone-dim` against `--void` — if it fails, raise the alpha, don't ship it.
- `prefers-reduced-motion: reduce` → preloader skips, lens locks centre at 45% opacity, all scrub timelines snap to a static mid-composition, marquees pause. **The page must read perfectly as a static document.**
- Full keyboard navigation. Visible focus rings (`outline: 1px solid var(--amber); outline-offset: 3px`).
- Semantic HTML. One `<h1>`. Decorative images `alt=""`, `aria-hidden`.
- The lens hero is decorative enhancement — all hero content must be readable without it.

---

## 8. PERFORMANCE BUDGET

| Metric | Target |
|---|---|
| LCP (4G mobile) | < 2.2s |
| CLS | < 0.03 |
| Lighthouse mobile | ≥ 90 all categories |
| Homepage JS (gzipped) | < 190KB |

Images: AVIF primary, WebP fallback, `next/image` with explicit `sizes`, LQIP blur placeholders.

**The two hero lens layers use the same source file.** One network request, two `<img>` tags, different CSS filters. Never export two files.

If mobile Lighthouse falls below 85, cut the Descent section to two layers. **Never cut the lens.** The lens is the site.

---

## 9. WORKING AGREEMENT

Prajwal is building this inside Antigravity end to end. Escalate to a strategy conversation **only** for:
- A scientific fact that cannot be verified from `CONTENT.md`
- A required asset that does not exist
- A decision that changes the concept rather than the implementation

Everything else — component structure, easing values, spacing, refactors, additional UI ideas — decide and build. Bias hard toward shipping.

**When in doubt, make it more ambitious, not less.** Timid is the only failure mode that matters here.
