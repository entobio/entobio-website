# IMAGING-PAGE-SPEC.md — `/imaging`
**The second-most-important page on the site. Build it properly.**

---

## 1. WHY THIS PAGE EXISTS

Dr. Yeshwanth sent us a link to Macroscopic Solutions (US). Their published rates:

| Service | Price |
|---|---|
| Single specimen imaging | $95 – $395 |
| Drill core imaging | $125 – $595 |
| Thin section imaging | $125 – $595 |
| Linear progression imaging | $375 – $1,200 |
| Large format imaging | $3,000 |
| Collection digitisation | On request |

He does publication-grade focus-stacked imaging at that level, from Bengaluru.

**Strategically this is the single most valuable service on his list, for three reasons:**

1. **It is the only service deliverable internationally with nobody travelling.** Specimens ship in, files go back. Every other service he offers requires him physically present.
2. **It is productisable.** Everything else is bespoke consultancy priced per engagement. This has repeatable units.
3. **The cost gap is enormous.** That is the whole geographic-arbitrage thesis, applied to the one service where it actually works.

The original brief for this entire project was *"a website that works 24/7 to bring him business across the world."* **This page is that sentence made real.** Nothing else on the site can deliver it.

---

## 2. WHAT WE TAKE, AND WHAT WE DO NOT

**Take:** the information architecture. Segment by *sample type*, and for each one state the deliverable precisely enough that an institutional buyer can self-qualify without a call.

**Do not take:** their copy, their visual design, or their pricing display. Their site is a WooCommerce catalogue and is visually irrelevant to us. Every word on our page is written from scratch.

**No prices.** He was explicit, and it's also correct here: when your rate advantage is this large, you never want a number anchoring the conversation before they've seen the quality. Structure by deliverable, close with an enquiry.

---

## 3. PAGE STRUCTURE

### 3.1 Hero
Full-width, `--void`. Dark, quiet, confident.

```
[mono]     SCIENTIFIC IMAGING

[display]  Sharper than
           the eye can focus.

[body, max-w-[520px]]
Focus-stacked macro and micro imaging for publication, type
documentation, and collection digitisation. Specimens accepted
from institutions worldwide.
```

Background: `HERO-01` variant or `DESCENT-04`, heavily darkened, static.

That final sentence is the international signal. **Confirm with Dr. Yeshwanth before it ships** — question 2 in the asset request message. If the answer is no, change to *"for research institutions, museums and universities."*

### 3.2 What focus stacking is — the demonstration

The best section on the page, and it needs his files.

An interactive drag slider: one shallow-focus frame on one side, the final merged plate on the other. Drag the divider to move between them.

```
[display]  One photograph cannot hold a whole insect in focus.

[body]
At high magnification, depth of field collapses to fractions of a
millimetre. A single frame renders one thin plane sharp and the rest
dissolved. A focus-stacked plate is assembled from dozens of frames,
each stepped forward by microns, merged into one image sharp from
end to end.

[mono]     DRAG TO COMPARE
```

**Requires `IMAGING-STACK-A` and `IMAGING-STACK-B` — his real files, same specimen.** Cannot be generated: a synthetic before/after is a fabricated demonstration of his own technique, which is the worst possible thing to fake on this page.

**If unavailable: hide the section entirely.** Do not substitute.

### 3.3 Services index

Six rows, hairline-separated, mono index + display serif name + description. Same visual language as the homepage Capabilities section.

```
01  Single Specimen Imaging
    Focus-stacked macro and micro plates of individual specimens —
    insects, arthropods, small invertebrates, botanical material.
    Publication-ready, figure-composed, at agreed magnification.

02  Type Specimen Documentation
    Diagnostic imaging of holotypes, paratypes and voucher material,
    including dorsal, lateral and genitalic preparations, to the
    standard required for taxonomic publication.

03  Collection Digitisation
    Batch imaging of museum drawers, unit trays, teaching sets and
    reference collections, with consistent lighting, scale and
    metadata across the series.

04  Slide & Microscope Preparation Imaging
    Transmitted light, brightfield and phase imaging of permanent
    and temporary slide preparations.

05  Comparative Plates
    Multi-specimen figures composed for publication — aligned,
    scaled, labelled and laid out to journal specification.

06  Custom Documentation
    Non-standard samples, unusual magnifications, or imaging
    workflows developed for a specific research question.
```

Row hover: background lift, name shifts `+14px`, description reveals. Consistent with homepage.

### 3.4 Deliverables

Three columns, mono headers, plain lists. **The trust-builder** — this is what tells an institutional buyer you've done this before.

```
FORMATS                  STANDARDS                   PROCESS
TIFF, 16-bit, uncompressed   Scale bar on every plate    Enquiry and sample review
JPEG, publication quality    Consistent colour reference  Shipping and handling advice
Layered composite on request Full capture metadata        Capture and stacking
Figure-composed plates       Journal figure specification Proof plates for approval
Archival master + web copy   Specimen returned intact     Final delivery and archive
```

**Verify every line with him before it ships.** These are operational commitments, not marketing copy. Anything he can't stand behind gets cut. Better a shorter honest list than a promise he has to break on delivery.

### 3.5 Equipment
Short, factual, mono-set. `LAB-01…04` if his photographs arrive; typographic-only if not. **Do not generate photographs of "his" equipment** — that's a claim about his facility.

### 3.6 Specimen handling
Answers the institutional buyer's real anxiety before they have to ask it.

```
[display]  Specimens are returned as they arrived.

[body]
Material is logged on arrival, imaged, and repacked in its original
housing. Dry-mounted, slide-mounted and alcohol-preserved material
all accepted. Import and export documentation for international
consignments is the sender's responsibility; we advise on packing
and can supply a condition report on receipt and return.
```

**Confirm with him.** Every sentence here is a commitment.

### 3.7 Enquiry
Not a generic form. A structured brief:

```
Institution
Contact and email
Sample type            [ Insect · Other arthropod · Botanical · Slide · Other ]
Approximate quantity
Intended use           [ Publication · Type documentation · Digitisation · Other ]
Country of origin
Notes
```

`Country of origin` is doing real work — it tells him instantly whether a consignment is domestic or international, which changes everything about how he quotes.

CTA: **Request a quote**

---

## 4. SEO / AEO

This page is the strongest commercial SEO asset on the site — near-zero competition on every one of these:

```
focus stacking service India
scientific specimen imaging India
insect photography for publication
type specimen imaging
museum collection digitisation India
entomological imaging service
publication-quality macro photography scientific
```

- `Service` JSON-LD per row, `provider` → the Organization entity
- `FAQPage` schema on the handling and deliverables sections
- Question-shaped H2s
- Add this page's summary to `/public/llms.txt`

---

## 5. LINKING

- Homepage Capabilities row `03` links here, not to `/services#imaging`
- Nav: promote **Imaging** to a top-level item
- `/services` row 03 links here
- `/about` mentions the imaging lab and links here

---

## 6. BUILD ORDER

1. Hero, services index, deliverables, handling, enquiry form — buildable now
2. Equipment section — typographic version now, photographs later
3. Focus-stack slider — **blocked on his files.** Build the component behind a flag so it drops in the moment they arrive.
