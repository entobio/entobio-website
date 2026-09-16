# ENTOBIO CONSULT — HOMEPAGE BUILD SPEC
**"THE LENS"**
Written for Antigravity. Implementation register — treat values as exact, not approximate.

Stack: Next.js 15 (App Router) · TypeScript · Tailwind · GSAP + ScrollTrigger · Lenis · Framer Motion (micro only) · Vercel

---

## 0. THE CONCEPT

**The entire homepage is the experience of looking through a microscope.**

Not "a website about a scientist." The site *is* the instrument. You arrive out of focus. You rack into sharpness. You move a lens across the frame and the world under it resolves. You scroll and you descend — metre, centimetre, millimetre, micrometre — until you're inside the specimen. Then you come back out.

Everything on this page serves that one metaphor. It's cinematic, it's dark, it's slow, and it's built almost entirely from CSS transforms, clip-paths and GSAP scrub. **Nothing here needs Three.js.** The spectacle comes from his photography at enormous scale plus one genuinely original interaction — not from a shader.

### Why this wins
Every "award-winning" agency site right now is: gradient mesh, floating 3D blob, Instrument Serif, glass pill nav. The four MotionSites prompts you sent are all variations of that. It's a beautiful formula and it's *completely saturated*.

The lens hero is the same production value pointed at something nobody else has: **award-winning extreme macro photography of insects nobody has ever looked at closely.** That's the unfair advantage. A Framer template can copy our layout. It cannot copy a 2mm mirid bug shot at 5:1 magnification.

---

## 1. GLOBAL

### 1.1 Palette — dark, not cream
The cream direction was the problem. Flip it. Photography glows out of near-black; cream survives only as type and one section.

```css
--void:       #08090A;   /* page base — near black, faint cool bias */
--carbon:     #0F1113;   /* raised surfaces */
--bone:       #F2EDE3;   /* primary type */
--bone-dim:   rgba(242,237,227,0.56);
--bone-faint: rgba(242,237,227,0.24);
--rule:       rgba(242,237,227,0.12);
--forest:     #1E5631;   /* his green, retained */
--moss:       #6B8F3E;
--amber:      #D89A3E;   /* single accent — CTAs, active states, honours */
--glow:       rgba(216,154,62,0.14);
```

Exactly one section (Outreach, §8) breaks into light. That contrast is the whole point — after eight dark screens it lands like a window opening.

### 1.2 Type

```
Display  — Instrument Serif, 400 + 400 italic   (self-hosted woff2)
UI/Body  — Inter Tight, 400 / 500               (self-hosted woff2)
Mono     — Geist Mono, 400 / 600                (self-hosted woff2)
```

Rules:
- Display sizes are **viewport-relative and large**: `clamp(3.2rem, 11vw, 13rem)`, `line-height: 0.86`, `letter-spacing: -0.03em`
- Mono is always uppercase, `letter-spacing: 0.18em`, `font-size: 11px`, `--bone-dim`
- **Every species binomial is italic display serif.** No exceptions.

### 1.3 Motion primitives

```ts
export const EASE = {
  out:  'expo.out',
  soft: [0.22, 1, 0.36, 1],
  rack: 'power3.inOut',
} as const;

// Universal lerp for all pointer-following
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const FOLLOW = 0.09;  // pointer smoothing — deliberately heavy, feels like glass
```

Lenis: `{ duration: 1.15, easing: t => Math.min(1, 1.001 - 2**(-10*t)), smoothWheel: true, touchMultiplier: 1.6 }`

**Critical:** GSAP drives everything scroll-based. Framer Motion only for hover/exit on isolated components. Never both on one element.

**Font/ScrollTrigger guard** (our known bug):
```ts
await document.fonts.ready;
ScrollTrigger.refresh();
```
Run inside the same `useEffect` that creates the triggers, before any `.create()` call.

### 1.4 Reduced motion
`prefers-reduced-motion: reduce` → preloader skips to done, lens locks centre at 45% opacity, all scrub timelines snap to `progress: 0.5` static composition, marquees pause. The page must still read perfectly as a static document.

---

## 2. PRELOADER — "RACKING FOCUS"

Full-viewport `--void`, `z-index: 100`. Duration 2.2s, then out. Runs once per session (`sessionStorage`).

**Layers, bottom to top:**

1. The hero image, already mounted beneath, at `filter: blur(48px) brightness(0.3) saturate(0.4)` and `scale(1.14)`
2. A centred SVG graticule — microscope reticle. Thin `--bone-faint` circle `r=140`, crosshair lines to the edges, and 40 tick marks around the circumference. `stroke-width: 1`, non-scaling.
3. Centre, mono: a counter ticking `000 → 150`, `font-size: 13px`, `letter-spacing: 0.3em`
4. Beneath, mono `--bone-faint`: `RESOLVING SPECIMEN`

**Timeline:**
```
0.0 – 0.3   graticule fades in, scales 1.06 → 1
0.3 – 1.7   counter 000 → 150 (GSAP snap:1, ease 'power2.out')
            SIMULTANEOUS: blur 48 → 0, brightness 0.3 → 1,
            saturate 0.4 → 1, scale 1.14 → 1.04   (ease: EASE.rack)
1.7 – 1.9   counter holds; label swaps to the species name, italic serif
1.9 – 2.2   graticule + counter fade out, scale 1 → 1.4
            hero type stagger-enters from y:40, opacity:0
```

The rack-focus IS the brand. It's his actual technique, it's the site's thesis in two seconds, and it's four CSS properties on one element.

---

## 3. ACT 1 — HERO · "THE LENS"

**This is the section that wins the award. Build it first, build it obsessively.**

`section#hero`, `height: 100svh`, `position: relative`, `overflow: hidden`, `background: var(--void)`

### 3.1 Structure

```
section#hero
├─ div.lens-stage            (absolute inset-0, z-0)
│  ├─ img.layer-base         Extreme macro, viewport-filling
│  ├─ img.layer-reveal       SAME image, different grade — clip-pathed
│  ├─ svg.lens-ring          Reticle ring + crosshair, follows pointer
│  └─ div.vignette
├─ header.nav                (z-20)
├─ div.hero-type             (z-10, centred)
└─ div.stat-rail             (z-10, bottom)
```

### 3.2 The lens — the core interaction

Two copies of the same photograph, stacked, identical position and size:

```css
.layer-base {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  object-fit: cover; object-position: center;
  filter: brightness(0.34) saturate(0.35) contrast(1.05) blur(3px);
  transform: scale(1.04) translate3d(var(--drift-x), var(--drift-y), 0);
  will-change: transform, filter;
}

.layer-reveal {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  object-fit: cover; object-position: center;
  filter: brightness(1.06) saturate(1.12) contrast(1.08);
  transform: scale(1.04) translate3d(var(--drift-x), var(--drift-y), 0);
  clip-path: circle(var(--lens-r) at var(--lens-x) var(--lens-y));
  will-change: clip-path, transform;
}
```

JS, one rAF loop:
```ts
// targets set by pointermove; smoothed every frame
lensX = lerp(lensX, targetX, FOLLOW);
lensY = lerp(lensY, targetY, FOLLOW);
root.style.setProperty('--lens-x', `${lensX}px`);
root.style.setProperty('--lens-y', `${lensY}px`);

// ambient parallax on BOTH layers, opposite sign, very subtle
const dx = (targetX / innerWidth  - 0.5);
const dy = (targetY / innerHeight - 0.5);
root.style.setProperty('--drift-x', `${dx * -18}px`);
root.style.setProperty('--drift-y', `${dy * -12}px`);
```

`--lens-r`: `clamp(150px, 17vw, 260px)`. On `pointerdown` animate to `clamp(210px, 24vw, 360px)` over 500ms `EASE.soft`; back on `pointerup`. **Press and the lens opens.** People will discover this and press it repeatedly.

### 3.3 The ring — the detail that makes it feel engineered

An SVG that tracks the same lerped point:
- Circle at `r = --lens-r`, `stroke: rgba(242,237,227,0.34)`, `stroke-width: 1`
- A second circle at `r + 12`, `stroke: var(--amber)`, `stroke-width: 1`, `stroke-dasharray: 2 10`, slowly rotating (`20s linear infinite`)
- Four short crosshair ticks at N/E/S/W, 14px long, inset 8px from the ring
- Mono readout pinned bottom-right of the ring, offset `+14px`:
  ```
  ×40   ·   OBJ 4/0.10
  ```
  and beneath it, live-updating to 1 decimal:
  ```
  X 412.6   Y 288.1
  ```

That coordinate readout costs eight lines and is the difference between "nice hover effect" and "this is an instrument."

### 3.4 Touch fallback
No pointer on touch. Instead the lens **orbits autonomously** — a slow Lissajous path, 14s period, radius 30% of viewport:
```ts
lensX = cx + Math.sin(t * 0.42) * innerWidth  * 0.30;
lensY = cy + Math.sin(t * 0.61) * innerHeight * 0.22;
```
Reads as a specimen being scanned. On mobile also drop `--lens-r` to `clamp(120px, 34vw, 200px)`.

### 3.5 Hero type

Centred, `z-10`, `pointer-events: none` (so the lens works everywhere):

```
[mono, --bone-dim, mb-7]
BENGALURU · INDIA — ESTABLISHED 2025

[Instrument Serif, --bone]
Everything
begins with
a name.

[Inter Tight, 15px, --bone-dim, max-w-[440px], mt-8]
Independent insect taxonomy, biodiversity research
and scientific macro imaging.
```

Display: `font-size: clamp(3.4rem, 10.5vw, 12rem)`, `line-height: 0.84`, `letter-spacing: -0.035em`, `text-align: center`.

**Type sits in `mix-blend-mode: difference`.** As the lens passes beneath, the letters invert against the revealed brightness. Costs one line, produces an effect people screenshot. Test contrast on both grades; if difference reads muddy, fall back to `exclusion`, then to plain with a `text-shadow: 0 2px 40px rgba(0,0,0,0.5)`.

### 3.6 Stat rail

Absolute bottom, `padding: 0 40px 36px`, four cells, `display: grid; grid-template-columns: repeat(4,1fr)`, hairline `--rule` above.

Each cell: number in Instrument Serif `clamp(1.6rem, 2.6vw, 2.6rem)`, label in mono beneath.

```
150   SPECIES DESCRIBED
36    PUBLICATIONS
3     TAXA NAMED IN HIS HONOUR
16    YEARS IN THE FIELD
```

Numbers count up on preloader exit, `duration: 1.4`, `stagger: 0.08`, `snap: 1`.

On mobile: 2×2 grid, hairlines between.

### 3.7 Nav

Fixed, `z-40`, `top: 0`, `padding: 24px 32px`, three zones, transparent — **no glass pill.** The pill is the single most over-used element in the reference set; skipping it is a differentiator.

Left: logo mark, 22px, `--bone`. Centre: `Catalogue · Imaging · Outreach · About` in Inter Tight 14px `--bone-dim`, hover to `--bone`, 200ms. Right: `Enquire` — `border: 1px solid --rule`, `border-radius: 2px`, `padding: 9px 20px`, mono 11px, hover `background: --amber; color: --void`.

After 120px of scroll, nav gains `background: rgba(8,9,10,0.72); backdrop-filter: blur(14px); border-bottom: 1px solid var(--rule)` over 300ms. Hidden on scroll-down past 400px, revealed on scroll-up.

### 3.8 Hero asset requirement
One image, **minimum 3200px wide**, extreme macro, subject roughly centred, dark or dark-gradable background, high micro-contrast (compound eye, wing scales, setae, cuticle texture). Any of his award-winning plates that meets this works.

Fallback if the file is small: `object-fit: cover` + `image-rendering: high-quality` and reduce lens radius. Better fallback: pick a different plate.

---

## 4. ACT 2 — "THE DESCENT"

Pinned scroll section. `height: 420vh`. The user scrolls and **falls into the specimen** — six orders of magnitude.

`ScrollTrigger`: `pin: true, scrub: 1.1, start: 'top top', end: 'bottom bottom'`

Four stacked images, each a deeper magnification. Cross-scale, cross-fade:

```ts
// For layer i of 4, active window = [i*0.25, (i+1)*0.25]
tl.fromTo(layer[i],
  { scale: 1.0,  opacity: 0 },
  { scale: 2.35, opacity: 1, ease: 'none', duration: 0.25 },
  i * 0.25
);
tl.to(layer[i], { opacity: 0, duration: 0.06 }, (i+1) * 0.25 - 0.06);
```

Each layer holds `transform-origin: 50% 48%`, `will-change: transform, opacity`.

**Scale readout**, centre-left, mono, swapping at each threshold with a 200ms blur-out/in:
```
1 METRE          →  the grassland
1 CENTIMETRE     →  the leaf
1 MILLIMETRE     →  the insect
200 MICROMETRES  →  the wing
```

At the final layer, display serif fades in over the top:

> **This is where he works.**

Then one mono line beneath:
```
HYPSELOECUS SANDALUM  ·  YESHWANTH, 2014  ·  2.4 MM
```

*(Verify that binomial and year against his CV before build. If uncertain, use any species from his publication list with a confirmed authority string.)*

**Asset need:** four images at increasing magnification. Ideal is a real series. If unavailable, use four different plates of ascending intimacy — habitat → whole insect → head → wing/eye detail. Works nearly as well.

---

## 5. ACT 3 — "ONE HUNDRED AND FIFTY"

The proof, rendered as motion instead of a table.

`--void` background. Section header, left, `padding: 140px 40px 60px`:

```
[mono --bone-dim]  02 — THE RECORD
[display, clamp(2.4rem, 6vw, 6rem)]
One hundred and
fifty species.
[Inter Tight 15px --bone-dim, max-w-[380px]]
Each one named, described and deposited.
Most had never been formally recorded.
```

**Below: three marquee rows of specimen plates**, alternating direction.

```
Row 1  →  left,  speed 0.55,  card 300×400
Row 2  ←  right, speed 0.40,  card 340×440
Row 3  →  left,  speed 0.70,  card 260×340
```

Implementation: duplicate each row's children ×3, translate via GSAP `xPercent` on an infinite `repeat: -1` linear tween. **Additionally** modulate speed with scroll velocity from Lenis:
```ts
lenis.on('scroll', ({ velocity }) => {
  gsap.to(marqueeTweens, {
    timeScale: 1 + Math.min(Math.abs(velocity) * 0.12, 3.2),
    duration: 0.5, overwrite: true
  });
});
```
Rows accelerate as you scroll and settle when you stop. Cheap, and it makes the whole section feel alive.

**Card:** plate image, `border-radius: 2px`, `filter: grayscale(0.5) brightness(0.72)`. On hover: `grayscale(0) brightness(1)`, `scale(1.03)`, 400ms `EASE.soft`, and a mono caption slides up from the bottom edge:
```
Hypseloecus sandalum          ← italic serif
YESHWANTH, 2014 · MIRIDAE     ← mono
```

**The three eponymous taxa** get `border: 1px solid var(--amber)` and a small amber index dot, with caption line: `NAMED IN HIS HONOUR`. Use exactly: *Evacanthus yeshwanthi*, *Oryctopterus yeshwanthi*, *Axiagastus yeshwanthi*.

Ship with however many real plates exist — 18 is plenty across three rows. **No placeholders, no stock.** Fewer real cards beats a full grid of fakes.

---

## 6. ACT 4 — THE MANIFESTO

Full-bleed `--void`. `height: 300vh`, pinned, scrubbed. No imagery except one extremely faint, slowly rotating wing-venation macro at `opacity: 0.06`, `filter: blur(2px)`, rotating `0 → 8deg` across the scroll.

Four lines, display serif, `clamp(2rem, 5.4vw, 5.4rem)`, centred, one at a time. Each enters `y: 30, opacity: 0, filter: blur(10px)` → `y: 0, opacity: 1, blur: 0`, holds, exits `y: -30, opacity: 0, blur: 10`.

```
A species without a name cannot be protected.
It cannot be regulated, traded, or conserved.
It cannot appear in a law, a report, or a paper.
Taxonomy is the layer beneath all of biology.
```

Then the last line lands and **stays**, in `--amber`:

> **And almost nobody can still do it.**

---

## 7. ACT 5 — CAPABILITIES

Restraint after four loud acts. `--carbon` background.

Nine rows, hairline-separated, `padding: 26px 40px`. Mono index left (`01`–`09`), service name in display serif `clamp(1.5rem, 3vw, 2.6rem)` centre-left, short line in Inter Tight `--bone-dim` right-aligned, revealed on hover.

On row hover: the row's background lifts to `rgba(242,237,227,0.03)`, the name shifts `x: 14px` over 400ms, and **a small plate image fades in pinned to the cursor** (`180×240`, `opacity: 0 → 1`, lerped follow). Different plate per row. This is a well-known pattern executed cleanly and it's the right amount of energy here.

Order (his own ranking):
```
01  Insect Identification
02  Taxonomic Research & Species Revisions
03  Scientific Imaging & Focus-Stacked Photography
04  Science Outreach & Biodiversity Education
05  Biodiversity Surveys & Environmental Impact Assessment
06  Training Workshops & Internships
07  Pollinator & Agricultural Biodiversity Research
08  Integrated Pest Management Consultancy
09  Museum & Research Collection Curation
```

No prices. Each row links to `/services#slug` — a single simple page, not six.

---

## 8. ACT 6 — OUTREACH · THE LIGHT BREAK

**The only light section on the page.** After six dark screens this should feel like a curtain pulled back.

Background: `--bone`, full-bleed, with a soft `--moss` → `--forest` radial in the lower right at 22% opacity.

Everything inverts — `--void` type on bone. Display serif:

> **Free biodiversity programmes for government schools.**

Body, Inter Tight 16px, max-width 460px. Right side: the illustrated leafhopper mascot, entering with a gentle spring, and drifting `±8px` on a 6s loop.

CTA: solid `--void` pill, `--bone` text, `padding: 14px 30px`. Label: **Request a session**.

Transition into and out of this section: animate `background-color` on the section wrapper across a 60vh scrub so the flip is a gradient, not a hard cut. That transition is worth doing properly — it's the biggest emotional beat on the page after the hero.

---

## 9. ACT 7 — THE RECORD + CONTACT

Back to `--void`. Quiet, factual, fast.

Three typographic columns, mono headers, Inter Tight lists, hairline dividers:

```
INSTITUTIONS          JOURNALS                        HONOURS
NCBS-TIFR             Zootaxa                         Fellow, Royal Entomological Society
UAS GKVK              ZooKeys                         Ernst Mayr Travel Grant, Harvard ×2
ICAR                  European Journal of Taxonomy    Mohamed bin Zayed Species Fund
Natural History       Journal of Experimental Biology  International Heteropterists' Society
  Museum, London      Ecology and Evolution
Smithsonian NMNH      Philippine Journal of Science
Harvard MCZ
University of Bristol
```

Text only. No logo soup — set beautifully in type it reads more expensive and avoids every trademark question.

**Contact:** one line of display serif —

> **Have something you can't identify?**

— a three-field form (name, email, message) with underline-only inputs, mono labels, and an amber submit. Web3Forms. That's the whole conversion mechanism. Nothing more.

---

## 10. FOOTER

`--void`. Hairline top. Three columns of links, mono. Contact: `Bengaluru, Karnataka, India` and the email. ORCID / ResearchGate / Google Scholar.

Then the wordmark: **ENTOBIO CONSULT**, Instrument Serif, `font-size: 15vw`, `--bone` at `opacity: 0.07`, `letter-spacing: -0.04em`, clipped by the viewport bottom so its lower third is cut off.

On scroll into view it rises `y: 60 → 0` over the last 40vh. Standard move, always looks good, costs nothing.

Credit line, mono, 10px: `SITE BY BUILDROCKET LABS`.

---

## 11. PERFORMANCE — NON-NEGOTIABLE

The lens hero and the descent are both image-heavy. Budget or it dies on mobile.

- Every photograph: AVIF primary, WebP fallback, `next/image`, explicit `sizes`
- Hero pair: `priority`, preloaded, LQIP blur placeholder. The two lens layers are the **same file** — one network request, two `<img>` tags, browser cache handles it. Do not export two files.
- Descent layers: `loading="lazy"` on 3 and 4, prefetched at 30% scroll progress
- Marquee plates: `loading="lazy"`, max 900px wide, `decoding="async"`
- `content-visibility: auto` on Acts 4–7
- Kill every `will-change` after its animation completes (`onComplete: () => el.style.willChange = 'auto'`)
- **Targets:** LCP < 2.2s on 4G · CLS < 0.03 · Lighthouse mobile ≥ 90

If mobile Lighthouse drops below 85, the first thing to cut is the descent (down to two layers), **not** the lens. The lens is the site.

---

## 12. BUILD ORDER

```
1  Tokens, fonts, Lenis + GSAP harness, font-ready guard
2  ★ HERO — lens, ring, readout, type, stat rail.
     Do not proceed until this is genuinely excellent.
     Expect to spend 40% of total build time here.
3  Preloader (build after hero — it animates INTO the hero)
4  Nav + scroll states
5  Act 3 marquee (second-biggest visual payoff, relatively cheap)
6  Act 6 outreach light break
7  Act 2 descent
8  Act 4 manifesto
9  Act 5 capabilities
10 Act 7 record + contact + footer
11 Mobile pass — every act, on a real device
12 Reduced-motion pass
13 Performance pass to budget
14 Scientific accuracy review — every binomial, every italic, every year
```

---

## 13. WHAT WE ARE DELIBERATELY NOT BUILDING

Cut from the earlier plan. Do not reintroduce.

- ~~150-species catalogue engine with filters and 150 routes~~ → **18–24 real plates in a marquee**
- ~~Specimen submission protocol, multi-step~~ → **three-field form**
- ~~Six separate service pages~~ → **one page with anchors**
- ~~Publications database~~ → **one static page, the list from his CV**
- ~~Sanity CMS~~ → **static content in TS files.** He isn't going to edit this. A CMS is a week of work protecting against an event that won't happen.
- ~~Three.js / WebGL / Vanta~~ → **not needed.** Every effect here is CSS transforms, clip-path, and GSAP scrub.
- ~~Dark mode toggle~~ → the site is dark.

Inner pages: `/about`, `/services`, `/publications`, `/outreach`, `/contact`. Same tokens, same type, simple stacked layouts, one screen of effort each. **The homepage is the portfolio asset.**

---

## 14. THE TEST

Before we ship, this has to be true:

> A designer lands on the hero, moves their cursor, and stops. Then presses. Then moves it again. Then screenshots it.

If the lens doesn't produce that, nothing else on the page matters — and if it does, nothing else on the page has to work as hard.
