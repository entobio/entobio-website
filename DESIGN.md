# DESIGN.md — ENTOBIO CONSULT
**The design system. Authoritative for all tokens, type, colour, spacing and motion.**

---

## 1. PRINCIPLE

**Dark instrument, glowing specimen.**

The page is a darkened laboratory. His photography is the only light source. Type is bone-white and confident. Colour appears exactly twice: amber as the instrument accent, and one full section of daylight.

Restraint everywhere so the three loud moments — the lens, the descent, the light break — hit at full force.

---

## 2. COLOUR

```css
:root {
  /* Base */
  --void:        #08090A;
  --carbon:      #0F1113;
  --carbon-lift: #14171A;

  /* Type */
  --bone:        #F2EDE3;
  --bone-dim:    rgba(242, 237, 227, 0.62);
  --bone-faint:  rgba(242, 237, 227, 0.30);
  --rule:        rgba(242, 237, 227, 0.12);
  --rule-strong: rgba(242, 237, 227, 0.22);

  /* Brand — client's own greens, retained */
  --forest:      #1E5631;
  --moss:        #6B8F3E;

  /* Accent — the instrument */
  --amber:       #D89A3E;
  --amber-dim:   rgba(216, 154, 62, 0.42);
  --glow:        rgba(216, 154, 62, 0.14);
}
```

**Contrast note:** `--bone-dim` at 0.62 on `--void` clears AA for body text. Do not lower it. `--bone-faint` is decorative only — never body copy.

### Usage law
- `--amber` appears on: the lens ring arc, the three eponymous species cards, primary CTAs, active/focus states, and the manifesto's final line. **Nowhere else.**
- `--forest` / `--moss` appear **only** in the Outreach section.
- Everything else is void, carbon and bone.

---

## 3. TYPOGRAPHY

### Faces (self-hosted woff2, `/public/fonts/`)

| Role | Family | Weights |
|---|---|---|
| Display | **Instrument Serif** | 400, 400 italic |
| Body / UI | **Inter Tight** | 400, 500 |
| Mono / labels | **Geist Mono** | 400, 600 |

```css
@font-face {
  font-family: 'Instrument Serif';
  src: url('/fonts/InstrumentSerif-Regular.woff2') format('woff2');
  font-weight: 400; font-style: normal; font-display: optional;
}
/* + italic, + Inter Tight 400/500, + Geist Mono 400/600 */
```

`font-display: optional` on all three — prevents the ScrollTrigger desync (see `CLAUDE.md` §6.1).

### Scale

```css
/* Display — always viewport-relative, always large */
--t-hero:     clamp(3.4rem, 10.5vw, 12rem);   /* lh 0.84  ls -0.035em */
--t-display:  clamp(2.4rem, 6vw,    6rem);    /* lh 0.88  ls -0.03em  */
--t-section:  clamp(2rem,   5.4vw,  5.4rem);  /* lh 0.92  ls -0.03em  */
--t-row:      clamp(1.5rem, 3vw,    2.6rem);  /* lh 1.0   ls -0.02em  */

/* Body */
--t-lead:     clamp(1rem, 1.2vw, 1.125rem);   /* lh 1.5  */
--t-body:     0.9375rem;                       /* lh 1.6  */
--t-small:    0.8125rem;                       /* lh 1.5  */

/* Mono — one size, one treatment, everywhere */
--t-mono:     0.6875rem;   /* 11px, uppercase, ls 0.18em */
```

### Rules
- Display serif is **never** below 1.5rem. If it needs to be small, it's mono or Inter.
- Mono is **always** uppercase with `letter-spacing: 0.18em` and `--bone-dim`.
- Body copy never exceeds `65ch`.
- **Binomials:** Instrument Serif italic, at the surrounding size. Authority + year in Geist Mono roman beside it.

```html
<span class="binomial"><i>Hypseloecus sandalum</i></span>
<span class="authority">YESHWANTH, 2014</span>
```

---

## 4. SPACING & LAYOUT

8px base grid.

```css
--gutter:   clamp(20px, 5vw, 64px);
--max:      1560px;
--section:  clamp(96px, 14vh, 200px);   /* vertical section rhythm */
```

Full-bleed sections escape the container entirely. Text blocks inside them respect `--gutter`.

Border radius: **2px maximum, or 999px for pills.** Nothing in between. Rounded cards are the visual signature of the template aesthetic we are avoiding.

---

## 5. MOTION

### Easing

```ts
export const EASE = {
  out:  'expo.out',              // entrances
  soft: 'power3.out',            // hovers, small moves
  rack: 'power3.inOut',          // focus racks, scale changes
  cubic: [0.22, 1, 0.36, 1],     // CSS transitions
} as const;
```

### Duration
| Interaction | Duration |
|---|---|
| Hover / colour | 200ms |
| Small transform | 400ms |
| Entrance | 800ms |
| Focus rack | 1400ms |
| Preloader total | 2200ms |

### Pointer smoothing
Everything cursor-following uses the same lerp factor:
```ts
const FOLLOW = 0.09;  // heavy on purpose — the lens should feel like glass, not a cursor
```

### Signature: the focus rack
The site's core motion idiom. Content enters blurred and resolves:

```ts
gsap.fromTo(el,
  { filter: 'blur(14px)', opacity: 0, y: 24 },
  { filter: 'blur(0px)', opacity: 1, y: 0, duration: 0.9, ease: EASE.rack }
);
```

Use this instead of a plain fade for every significant entrance. It is his actual scientific technique and it is what makes the motion feel *authored to this client* rather than applied from a library.

**Never blur more than one large element at a time** — `filter: blur()` is expensive. Batch entrances, don't overlap them.

---

## 6. COMPONENT NOTES

### Buttons
```
Primary:   bg --amber, text --void, radius 999px, padding 14px 30px,
           Inter Tight 500. Hover: brightness(1.08), scale(1.02), 200ms.
Ghost:     1px solid --rule, text --bone, radius 2px, padding 9px 20px,
           Geist Mono 11px. Hover: bg --amber, text --void, border --amber.
Inverted:  (Outreach only) bg --void, text --bone, radius 999px.
```

### Hairlines
`1px solid var(--rule)`. Used liberally — they're the structural grammar of the whole page. Never use a box-shadow to separate content.

### Specimen label
Recurring device. Mono, `--bone-dim`, left-aligned, `line-height: 1.7`, sitting on a hairline:
```
INDIA: KARNATAKA, HESARAGHATTA
13.1389°N  77.4832°E · 12.viii.2011
COLL. H. M. YESHWANTH
```
Only render with verified data. Never invent coordinates.

### Focus states
```css
:focus-visible {
  outline: 1px solid var(--amber);
  outline-offset: 3px;
  border-radius: 2px;
}
```

---

## 7. IMAGERY

- Photography: **his only.** Full-bleed or edge-to-edge, never in a rounded card with a shadow.
- Default grade in marquees/grids: `grayscale(0.5) brightness(0.72)` → full colour on hover, 400ms.
- Illustration: flat vector line art, single-weight strokes, `--bone` or `--forest`. Victorian monograph register, not 3D render.
- The mascot appears in **exactly one place**: the Outreach section.

---

## 8. RESPONSIVE

Breakpoints: `640` / `1024` / `1440`.

Mobile rules:
- Hero display type drops to `clamp(2.6rem, 13vw, 4.5rem)`, still confident
- Lens becomes an autonomous orbit (no pointer) at reduced radius
- Stat rail → 2×2 grid with hairlines
- Descent → two layers instead of four
- Marquees → single row, slower
- Capabilities → stacked list, no cursor-follow plate

**The mobile experience must be genuinely good, not a degraded fallback.** Around 65% of visitors will be on a phone, and awards juries check.

---

## 9. THE ANTI-PATTERN LIST

Things that will make this look like every other site. Do not build them.

- Glass/blur pill navigation
- Gradient mesh or aurora backgrounds
- Floating 3D blobs
- Rounded cards with soft drop shadows
- Icon grids in 3×2 boxes
- Fade-up-on-scroll as the only entrance animation
- Emoji anywhere
- "Trusted by" logo strips
- Bento grids
- Marquee text that says the same word repeatedly
