# BUILD-PLAN.md — ENTOBIO CONSULT
**Sequenced Antigravity sessions. Work top to bottom. One session per block.**

Drop all five docs (`CLAUDE.md`, `DESIGN.md`, `ARCHITECTURE.md`, `CONTENT.md`, `HOMEPAGE-BUILD-SPEC.md`) into the repo root before session 1 so the agent auto-loads them.

---

## SESSION 1 — SCAFFOLD

> Read CLAUDE.md, DESIGN.md and ARCHITECTURE.md fully before starting.
>
> Scaffold the Next.js 15 project exactly per ARCHITECTURE.md §1. TypeScri
pt strict, Tailwind, App Router. Create the full folder tree including empty content and hook files.
>
> Implement: `globals.css` with every token from DESIGN.md §2–5 as CSS custom properties; all six `@font-face` declarations with `font-display: optional`; `tailwind.config.ts` extending theme with the tokens so they're available as utilities; `src/lib/site.ts`; `src/lib/gsap.ts` registering ScrollTrigger once and exporting EASE; `src/components/layout/SmoothScroll.tsx` with Lenis configured per HOMEPAGE-BUILD-SPEC §1.3; `src/hooks/useScrollTrigger.ts` implementing the font-ready-gated GSAP context exactly as written in ARCHITECTURE.md §2.3.
>
> Build the four `src/content/` files with the data from CONTENT.md. Mark pending species entries `verified: false`.
>
> Build `src/components/ui/`: `Binomial`, `SpecimenLabel`, `Button`, `Rule`, `MonoLabel`.
>
> Verify `tsc --noEmit` and `next build` both pass. Nothing visual yet.

---

## SESSION 2 — ★ THE HERO

**This is the project. Budget 40% of total time here. Do not move on until it's excellent.**

> Read HOMEPAGE-BUILD-SPEC.md §3 in full.
>
> Build `Hero.tsx`, `LensStage.tsx`, `StatRail.tsx` and `usePointerLens.ts`.
>
> The lens: two `<img>` of the SAME source file, stacked, identical sizing. Base layer graded dark and soft. Reveal layer graded bright and sharp, with `clip-path: circle(var(--lens-r) at var(--lens-x) var(--lens-y))`.
>
> `usePointerLens` owns ONE rAF loop for the whole page. It writes `--lens-x`, `--lens-y`, `--lens-r`, `--drift-x`, `--drift-y` directly to `document.documentElement`. Lerp factor 0.09. On `pointerdown` the radius animates open, on `pointerup` it closes. On touch devices the lens follows an autonomous Lissajous orbit instead. Under `prefers-reduced-motion` it locks centre and the loop exits. Pause the loop via IntersectionObserver when the hero leaves the viewport.
>
> The ring: SVG tracking the same lerped point — inner circle at `--lens-r`, outer dashed amber arc rotating 20s linear, four crosshair ticks, and a mono readout showing `×40 · OBJ 4/0.10` plus live `X`/`Y` coordinates to one decimal.
>
> Hero type centred, `pointer-events: none`, `mix-blend-mode: difference`. Test contrast against both image grades; if it reads muddy fall back to `exclusion`, then to plain type with a soft text-shadow.
>
> Stat rail at the bottom, four cells, hairline above, numbers counting up on mount. 2×2 on mobile.
>
> Use a placeholder dark macro image if the real one isn't in `/public/media/hero/` yet — but structure it so swapping the file is the only change needed.
>
> **Iterate until it is genuinely arresting.** Tune the lerp, the radius, the grade differential between layers, and the ring weight. This one interaction carries the entire site.

---

## SESSION 3 — PRELOADER + NAV

> Build `Preloader.tsx` per HOMEPAGE-BUILD-SPEC §2 — it animates INTO the hero, so build it after the hero exists.
>
> Reticle SVG with 40 circumference ticks. Counter 000→150 with GSAP `snap: 1`. Simultaneously rack the hero image from `blur(48px) brightness(0.3) saturate(0.4) scale(1.14)` to fully resolved. Total 2200ms. Runs once per session via `sessionStorage`, feature-detected, failing silently. Skips entirely under reduced motion.
>
> Build `Nav.tsx` per §3.7. Transparent, no glass pill. Background and blur appear after 120px scroll. Hides on scroll-down past 400px, reveals on scroll-up.

---

## SESSION 4 — SPECIES MARQUEE

> Build `SpeciesMarquee.tsx` per HOMEPAGE-BUILD-SPEC §5.
>
> Three rows, alternating direction, speeds 0.55 / 0.40 / 0.70. Children duplicated ×3, animated via GSAP `xPercent` on an infinite linear repeat.
>
> Hook row `timeScale` to Lenis scroll velocity so the rows accelerate as the user scrolls and settle when they stop — `1 + min(abs(velocity) * 0.12, 3.2)`, 0.5s tween, overwrite true.
>
> Cards default `grayscale(0.5) brightness(0.72)`, resolving to full colour and `scale(1.03)` on hover with a mono caption sliding up from the bottom edge. Every binomial renders through `<Binomial>`.
>
> Only render entries where `verified: true`. Cards with an unverified name show plate + family + citation instead — never a guessed binomial. Pause on reduced motion.

---

## SESSION 5 — OUTREACH LIGHT BREAK

> Build `OutreachBreak.tsx` per HOMEPAGE-BUILD-SPEC §8.
>
> This is the only light section on the page. Background `--bone` with a soft `--moss`→`--forest` radial lower-right at 22%. All type inverts to `--void`.
>
> The transition in and out matters more than the section itself — animate the wrapper's background-color across a 60vh ScrollTrigger scrub so the flip is a gradient, not a cut. Spend real time on this.
>
> Mascot on the right, spring entrance, ±8px drift on a 6s loop. Copy from CONTENT.md §9.

---

## SESSION 6 — DESCENT

> Build `Descent.tsx` per HOMEPAGE-BUILD-SPEC §4. Pinned, 420vh, `scrub: 1.1`.
>
> Four stacked layers, each scaling 1.0→2.35 and cross-fading within its 25% window, `transform-origin: 50% 48%`. Scale readout swapping at each threshold with a 200ms blur out/in. Final display line: "This is where he works."
>
> Layers 3 and 4 lazy, prefetched at 30% progress. Two layers only on mobile. Static mid-composition under reduced motion.
>
> Clear `will-change` on every element after its tween completes.

---

## SESSION 7 — MANIFESTO + CAPABILITIES

> Build `Manifesto.tsx` per §6 — pinned 300vh, four lines entering and exiting with the focus-rack idiom (blur 10 → 0 → 10), final amber line landing and staying. One wing-venation image behind at 0.06 opacity rotating 0→8deg.
>
> Build `Capabilities.tsx` per §7 — nine hairline-separated rows on `--carbon`. Row hover lifts the background, shifts the name +14px, and fades in a 180×240 plate pinned to the lerped cursor position. Different plate per row. Stacked list with no cursor-follow on mobile.

---

## SESSION 8 — RECORD, CONTACT, FOOTER

> Build `RecordContact.tsx` per §9 — three typographic columns from CONTENT.md §10, type only, no logos. Then the contact block: one display headline, three underline-only fields, mono labels, amber submit, posting to Web3Forms client-side.
>
> Build `Footer.tsx` per §10 — link columns, contact at city level only, the giant `ENTOBIO CONSULT` wordmark at 15vw / 0.07 opacity clipped by the viewport bottom, rising y:60→0 across the last 40vh.
>
> Then compose all seven acts in `src/app/page.tsx` and check the full-page scroll rhythm end to end. Adjust section spacing until the pacing feels right — this is a judgement pass, not a spec pass.

---

## SESSION 9 — INNER PAGES

> Build `/about`, `/services`, `/publications`, `/outreach`, `/contact` and `not-found.tsx`.
>
> Same tokens, same type, simple stacked layouts. One screen of effort each — these exist for completeness, not to impress. Content from CONTENT.md §8, §9, §11, §12. Publications list from the CV, filterable by year, DOI-linked where available.
>
> 404 uses the confused mascot pose.

---

## SESSION 10 — SEO / AEO

> Implement everything in ARCHITECTURE.md §5. JSON-LD builders in `src/lib/schema.ts` — Organization, Person with ORCID identifier and sameAs links, WebSite, BreadcrumbList. `sitemap.ts`, `robots.ts`, `/public/llms.txt` from CONTENT.md §14. Per-page OG images via `next/og`. Verify every URL reads from `site.ts`.

---

## SESSION 11 — QUALITY PASS

> Work through ARCHITECTURE.md §7 gate by gate.
>
> 1. `tsc --noEmit` and eslint clean
> 2. Full `prefers-reduced-motion` audit — the page must read as a complete static document
> 3. Keyboard traversal, visible focus everywhere
> 4. Contrast check every text/background pair against AA
> 5. Grep for hardcoded URLs outside `site.ts`
> 6. Grep for any `<i>` containing a species name not wrapped in `<Binomial>`
> 7. Grep for orphaned `will-change`
> 8. Console clean
> 9. Lighthouse mobile ≥ 90 — if below 85, cut Descent to two layers, never the lens

---

## SESSION 12 — MOBILE

> Test every act on a real mid-range Android over 4G. Not desktop throttling.
>
> Confirm: lens orbit reads well and doesn't drain battery · descent is two layers · marquee is one row · stat rail is 2×2 · hero type is confident, not shrunken · outreach transition still works · no horizontal overflow anywhere.
>
> Around 65% of visitors and every awards juror will look at this on a phone. It must be genuinely good, not a fallback.

---

## SESSION 13 — LAUNCH

> ARCHITECTURE.md §8. DNSSEC check first, always.

---

## ESCALATION

Come back to strategy chat only for:
- A scientific fact not verifiable from CONTENT.md
- A required asset that doesn't exist
- A change to the concept rather than the implementation

Everything else — component structure, easing values, spacing, extra UI ideas, refactors — decide and build inside Antigravity.

**When choosing between two options, take the more ambitious one.** Timid is the only real failure mode on this project.
