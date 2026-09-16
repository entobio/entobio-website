# IMAGE-STRATEGY.md — ENTOBIO CONSULT
**Authoritative for every image on the site: what goes where, where it comes from, and how it's graded.**

---

## 1. THE GOVERNING RULE

> **Generated imagery may depict atmosphere and texture. It may never depict a specimen that is identified.**

The distinction is whether the pixel makes a **scientific claim**.

| Makes no claim — generation OK | Makes a claim — client photograph only |
|---|---|
| Wing venation lattice at 40× | Any image captioned with a binomial |
| Grassland at dusk | Anything in a specimen-label frame |
| Leaf surface texture | Anything on the `/imaging` page presented as his work |
| Cuticle micro-texture | Anything a taxonomist would read as a determination |
| Lab objects — optics, drawers, vials | Type specimens, holotypes |
| Declared line-art illustration | Focus-stack before/after demonstrations |

**Why this matters more than it looks.** Dr. Yeshwanth's audience is other taxonomists. A synthetic insect labelled *Evacanthus yeshwanthi* is not a design flaw — it is a credibility event for him, in front of the exact people this site exists to reach. It is also a reputational risk for BuildRocket Labs when this becomes our portfolio flagship.

**Current state: the site is in violation.** The species marquee ships AI insects under real binomials. §3 fixes this permanently.

---

## 2. THE GRADE — non-negotiable for every generated asset

The current Descent layers break the palette. Layer 02 is bright green; `DESIGN.md` §2 permits colour exactly twice, and green outside Outreach is not one of them.

**Every generated image must be born gradable to `--void` (#08090A).** Not corrected afterwards — corrected afterwards always looks corrected.

Append this block verbatim to every Higgsfield prompt:

```
LIGHTING AND GRADE — MANDATORY:
Extremely low-key. Single hard directional light source from the upper left,
raking across the surface. Deep crushed black shadows occupying at least 60%
of the frame. Near-monochrome — desaturated to almost neutral, retaining only
the faintest cool green-grey cast. No vivid greens, no blues, no warm tones.
Background falls off to pure black at the edges. Scientific specimen
photography lighting, not nature documentary lighting. Dark museum vitrine
under a single lamp. High micro-contrast on surface texture, low overall
brightness. Photographic, not illustrated. No text, no watermark, no border.
```

**Rejection test.** Place the output on a `#08090A` field. If you can see where the image ends, reject and regenerate. It must dissolve into the page.

---

## 3. THE MARQUEE REFACTOR — do this first

**Delete every photograph from `SpeciesMarquee.tsx`.** Replace with typographic accession cards.

### Why this is an upgrade, not a compromise
- Eliminates the fabrication problem permanently — text is verifiable
- More distinctive: everyone has a photo carousel, nobody has a typographic one
- It is the literal payoff of the hero headline, *"Everything begins with a name"*
- Unblocked today; needs no assets

### Card specification

```
┌──────────────────────────────────┐
│  ⌗ 047                     [dot] │   mono 11px --bone-faint / amber dot
│                                  │
│  Evacanthus                      │   Instrument Serif italic
│  yeshwanthi                      │   clamp(1.8rem, 3.2vw, 3rem), lh 0.92
│                                  │
│  ──────────────────────────────  │   1px --rule
│                                  │
│  CICADELLIDAE · EVACANTHINAE     │   mono 11px --bone-dim
│  NAMED IN HIS HONOUR             │   mono 11px --amber (eponymous only)
└──────────────────────────────────┘
```

- Card: `320×280`, `background: var(--carbon)`, `border: 1px solid var(--rule)`, `border-radius: 2px`
- Hover: border → `--rule-strong`, background → `--carbon-lift`, the binomial shifts `x: +6px`, 400ms `EASE.soft`
- Eponymous cards: `border-color: var(--amber)`, amber index dot, honour line
- Unverified species: omit genus/species entirely, show `FAMILY` and `ZOOTAXA 4084(3) · 2016` in mono at display size instead. Reads as deliberate archival redaction, not as missing data.
- Keep everything else exactly as built: three rows, alternating direction, speeds 0.55 / 0.40 / 0.70, Lenis velocity coupling, reduced-motion pause.

### Later
When real plates arrive, a *minority* of cards gain a photograph — roughly one in four, irregular. Mostly type, occasionally an image. That asymmetry is a stronger composition than a uniform photo grid, so this is the permanent design, not a stopgap.

---

## 4. SLOT MANIFEST

Every image slot on the site. `src/content/media.ts` mirrors this table.

### 4.1 Generate now (Higgsfield) — 15 assets

| ID | Location | Subject | Size | Notes |
|---|---|---|---|---|
| `HERO-01` | Hero, both lens layers | **Abstract extreme macro texture** — wing venation lattice or compound-eye ommatidia | 3840×2160 | One file, two `<img>`. Highest priority asset on the site. |
| `DESCENT-01` | Descent layer 1 | Dry grassland, low angle, dusk | 2400×1600 | |
| `DESCENT-02` | Descent layer 2 | Leaf surface, raking light, trichomes visible | 2400×1600 | **Must not be green.** Near-monochrome. |
| `DESCENT-03` | Descent layer 3 | Chitinous cuticle surface, punctures and setae | 2400×1600 | Texture only — no whole insect, no identifiable body plan |
| `DESCENT-04` | Descent layer 4 | Wing membrane venation, extreme micro | 2400×1600 | |
| `MANIFESTO-BG` | Manifesto backdrop | Wing venation, near-black, very low contrast | 2400×1600 | Renders at 0.06 opacity — start almost black |
| `CAP-01…09` | Capabilities hover plates | **Lab and process objects, not insects** | 720×960 each | See §5.3 |

**Capabilities plates are deliberately not insects.** They're the tools of the work — optics, drawers, pinning trays, vials, slides. This removes the claim problem, and it's more informative: it shows visitors what each service physically involves.

### 4.2 Client photograph only — placeholders until his files arrive

| ID | Location | Requirement | Fallback while waiting |
|---|---|---|---|
| `PLATE-01…24` | Marquee (optional enrichment) | Focus-stacked plates | Typographic cards — §3 |
| `IMAGING-STACK-A/B` | `/imaging` before-after slider | One shallow frame + final merged plate, same specimen | Section hidden entirely |
| `IMAGING-GALLERY-01…08` | `/imaging` filmstrip | Publication plates | Section hidden entirely |
| `FOUNDER-01` | `/about` hero | Microscope, stacking rail, or specimen drawer | Typographic hero, no image |
| `OUTREACH-01…03` | `/outreach` | School sessions, exhibitions | Mascot illustration only |
| `LAB-01…04` | `/imaging` equipment | His actual setup | Reuse `CAP` plates |

**Rule: a section with no verified asset is hidden, never filled.** Fewer sections that are real beats more sections that are fake.

### 4.3 Built in code, not generated
Mascot poses (SVG), 404 mascot, OG images (`next/og`), wing-venation pattern tile (SVG), logo marks.

---

## 5. HIGGSFIELD PROMPTS

Run `models_explore` first and select the highest-fidelity photorealistic macro model available. Use `generate_image_batch` for groups. **Append the §2 grade block to every prompt.**

### 5.1 `HERO-01` — the most important image on the site

Generate 8 variants. This carries the entire hero interaction; do not settle.

**Variant A — ommatidia lattice**
```
Extreme scientific macro photograph at approximately 40x magnification of the
compound eye of an insect. The frame is filled edge to edge with the hexagonal
ommatidia lattice — hundreds of perfectly tessellated hexagonal facets in
regular array, each facet catching a minute specular highlight. Shallow but
razor-sharp focus stacking across the curvature. Surface shows fine microscopic
texture between facets. Abstract and architectural, filling the entire frame,
no visible body or outline of the animal. Reads as an alien crystalline
structure. Ultra high resolution, publication-grade diagnostic imaging.
```

**Variant B — wing venation**
```
Extreme scientific macro photograph of an insect wing membrane at high
magnification. The frame is completely filled by the network of veins — dark
branching structural veins crossing a translucent membrane, forming irregular
polygonal cells. Fine microtrichia visible along the vein edges. Backlit
faintly so the membrane glows very slightly translucent against deep black,
while the veins read as solid dark lines. Abstract, map-like, architectural.
No wing outline, no body, no background context. Focus-stacked razor sharpness
across the whole field. Ultra high resolution.
```

**Variant C — cuticle micro-texture**
```
Extreme scientific macro photograph of insect exoskeleton cuticle at very high
magnification. Frame entirely filled with the chitinous surface — dense regular
punctation, fine erect setae casting long raking shadows, and a subtle
iridescent sheen on the surface where light grazes it. Reads as hammered dark
metal or meteorite surface. Completely abstract, no recognisable body part or
outline. Focus-stacked, razor sharp across the field. Ultra high resolution.
```

**Selection criteria, in order:**
1. **Uniform high-frequency detail across the whole frame** — the lens reveal is most striking over a repeating structure. Reject anything with a boring or empty region.
2. **Sits at roughly 30% brightness** so the bright reveal layer has somewhere to go.
3. **No recognisable insect outline.** If you can tell what animal it is, it's a claim. Reject.
4. **Dissolves into `#08090A` at the edges.**

### 5.2 Descent layers — generate as one batch of 4

```
DESCENT-01
A dry tropical grassland at last light, photographed low to the ground with
tall seed-heavy grass stems in the near foreground and the field falling away
into darkness behind. Documentary field photography, natural, unmanicured.
No people, no structures, no sky detail.

DESCENT-02
Extreme close macro of a leaf surface, shot at a raking angle so the light
grazes across it. Fine trichome hairs stand up along the midrib catching the
light, the surface shows cellular texture and a single small water droplet
holding a highlight. Fills the frame. IMPORTANT: near-monochrome, desaturated
almost to grey — this must NOT read as a green nature photograph.

DESCENT-03
Extreme macro of a chitinous insect cuticle surface at very high magnification.
Dense punctures, erect setae throwing long shadows under raking light, faint
iridescence. Abstract surface texture filling the frame — no identifiable body
part, no outline, no recognisable animal.

DESCENT-04
Extreme micro photograph of an insect wing membrane. Branching dark veins over
a faintly translucent membrane forming irregular polygonal cells. Microtrichia
along the vein edges. Abstract and map-like, filling the frame edge to edge.
```

Plus:
```
MANIFESTO-BG
Insect wing venation, extremely dark and low contrast, veins barely emerging
from a near-black field. Almost abstract. This renders at 6% opacity — it must
be nearly black already, with only the faintest structural suggestion visible.
```

### 5.3 Capabilities plates — one batch of 9

All share this prefix:
```
Scientific laboratory still life photograph, single object, dark museum
vitrine lighting, single raking light source, deep black background, shallow
depth of field, vertical 3:4 composition, object centred.
```

| Slot | Service | Subject |
|---|---|---|
| `CAP-01` | Insect Identification | A stereomicroscope eyepiece and objective turret, three-quarter view |
| `CAP-02` | Taxonomic Research | An open bound scientific monograph, dense text and a plate figure, edge-on |
| `CAP-03` | Scientific Imaging | A macro lens barrel on a motorised focus rail, front element catching light |
| `CAP-04` | Science Outreach | A wooden-framed glazed display case, empty, seen at an angle |
| `CAP-05` | Biodiversity Surveys | A furled white collecting net against black, handle and hoop only |
| `CAP-06` | Training & Internships | A row of glass vials in a wooden rack, alcohol-filled, backlit faintly |
| `CAP-07` | Pollinator Research | A dried flower head, extreme macro, anthers and pollen texture |
| `CAP-08` | IPM Consultancy | Dried cereal grain heads, macro, raking light |
| `CAP-09` | Collection Curation | A shallow wooden entomological drawer, empty, showing unit trays and pins |

**No insects in any of these.** Tools and context only.

---

## 6. PLACEHOLDER SYSTEM

Placeholders must look **intentional**, so the site is presentable to him and to prospects while we wait.

`src/components/ui/PlateSlot.tsx` — renders an empty museum drawer slot:

```
┌─────────────────────────────┐
│                             │   background: --carbon
│                             │   border: 1px dashed --rule
│         ⌗ SLOT              │   mono 11px --bone-faint, centred
│      AWAITING PLATE         │
│                             │
└─────────────────────────────┘
```

- In **development**: full slot ID and required dimensions render inside it
- In **production**: the entire parent section is hidden if its required assets are missing

```ts
// src/content/media.ts
export type MediaSlot = {
  id: string;
  src: string | null;
  alt: string;
  source: 'generated' | 'client';
  w: number; h: number;
  required: boolean;   // if true and src is null → parent section hidden in prod
};
```

**Never ship a placeholder to production.** Ship a shorter page.

---

## 7. WHEN HIS PHOTOGRAPHS ARRIVE

1. Audit resolution — reject anything under 2400px on the long edge for feature use
2. Convert to AVIF + WebP, strip EXIF except copyright
3. Fill in priority order: `IMAGING-STACK` → `FOUNDER-01` → `IMAGING-GALLERY` → marquee enrichment → `OUTREACH`
4. **Test the real plate against `HERO-01`.** The abstract texture may well win — decide on the merits, not on sentiment.
5. Retire any generated asset a real photograph can replace
6. Confirm image rights for every published plate before it goes live
