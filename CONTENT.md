# CONTENT.md — ENTOBIO CONSULT
**Every string and number on this site. If it isn't here, it doesn't render.**

---

## 0. THE VERIFICATION RULE

Each item below is marked:

- **`[V]` VERIFIED** — sourced from his CV or a published paper. Safe to render.
- **`[P]` PENDING** — structure is correct, exact value must be confirmed before it appears on screen.

**Anything marked `[P]` must render as a `<PendingData>` component in dev (visible red outline) and be omitted entirely in production builds.** Never guess a `[P]` value into existence.

---

## 1. THE NUMBERS `[V]`

| Value | Label | Source |
|---|---|---|
| **150** | Species described | CV, Honors: "Insects discovered new to science – 150 species (mirid bugs and leafhoppers)" |
| **36** | Publications | CV: 31 international + 5 national |
| **3** | Taxa named in his honour | CV, verified list below |
| **16** | Years in the field | CV: "long-term insect surveys and collections (2009–present)" |

**These four numbers are the only statistics on the site.** Do not add others.

---

## 2. THE THREE EPONYMOUS TAXA `[V]`

The only species names verified as safe to render at launch.

```ts
export const EPONYMOUS = [
  { genus: 'Evacanthus',   species: 'yeshwanthi' },
  { genus: 'Oryctopterus', species: 'yeshwanthi' },
  { genus: 'Axiagastus',   species: 'yeshwanthi' },
] as const;
```

Caption line: `NAMED IN HIS HONOUR`

Explainer, used once beside them:
> When a colleague names a species after you, it is the field's way of recording that you changed what it knows.

---

## 3. SPECIES DATA `[P]`

The marquee needs 18–24 entries. **Do not invent them.**

```ts
// src/content/species.ts
export type Species = {
  genus: string;
  species: string;
  authority: string;      // e.g. 'Yeshwanth, 2014'
  family: string;
  plate: string | null;   // path under /media/plates/
  eponymous?: boolean;
  verified: boolean;      // MUST be true to render
};
```

**Genera he has published on** — use these as the extraction shortlist. Epithets and years come from the papers themselves:

| Genus / group | Paper | Year |
|---|---|---|
| *Hypseloecus* (5 new spp.) | Zootaxa 3878(1) | 2014 |
| *Ectmetopterus* (2 new spp.) | Zootaxa 3904(4) | 2015 |
| *Sulawesifulvius* (1 new sp.) | ZooKeys 475 | 2015 |
| Cylapinae of India | Zootaxa 4084(3) | 2016 |
| *Platypleura* | Zootaxa 4311(4) | 2017 |
| Indian Hyalopeplini | Zootaxa 4378(3) | 2018 |
| *Klabonosa* | Zootaxa 4413(3) | 2018 |
| Indian Mecistoscelini | Zootaxa 4711(1) | 2019 |
| *Brodskyella* (2 new spp.) | Coleopterists Bulletin 73(4) | 2019 |
| Stegelytrini | Zootaxa 4822(4) | 2020 |
| Scaphoideini (new genus + 3 spp.) | Zootaxa 4895(1) | 2020 |
| Isometopinae, India & Sri Lanka | Zootaxa 4903(2) | 2021 |
| *Macropsis* (3 new spp.) | Zootaxa 4903(3) | 2021 |
| Eccritotarsini | European J. Taxonomy 745 | 2021 |
| *Drabescus* | Zootaxa 5128(2) | 2022 |
| Hylicinae | Zootaxa 5319(4) | 2023 |
| Ledrinae of the Indian subcontinent | Zootaxa 5623(1) | 2025 |

**Fallback if epithets can't be confirmed in time:** render cards with the plate, the **family** in mono, and the publication citation — no binomial. A card reading `MIRIDAE · ZOOTAXA 4084(3), 2016` is honest, looks deliberate, and is infinitely better than a fabricated name.

**Ship with however many are verified.** Twelve real cards beat twenty-four with four invented.

---

## 4. HERO COPY `[V]`

```
Eyebrow (mono):
BENGALURU · INDIA — ESTABLISHED 2025

Headline (display):
Everything
begins with
a name.

Subline (Inter Tight):
Independent insect taxonomy, biodiversity research
and scientific macro imaging.
```

---

## 5. THE DESCENT `[V structure / P specimen]`

Scale readouts:
```
1 METRE           the grassland
1 CENTIMETRE      the leaf
1 MILLIMETRE      the insect
200 MICROMETRES   the wing
```

Final line (display): **This is where he works.**

Specimen caption beneath — `[P]`, needs one confirmed species + measurement. If unconfirmed, omit the caption entirely; the line stands alone perfectly well.

---

## 6. THE MANIFESTO `[V — our copy]`

```
A species without a name cannot be protected.
It cannot be regulated, traded, or conserved.
It cannot appear in a law, a report, or a paper.
Taxonomy is the layer beneath all of biology.
```

Final line, `--amber`:
> **And almost nobody can still do it.**

*This is our writing, grounded in his own words: "Taxonomy is the foundation of biodiversity research, conservation, and agriculture, yet it is often overlooked. Accurate species identification requires years of specialised training and cannot be replaced by AI or image recognition alone."*

---

## 7. SPECIES MARQUEE HEADER `[V]`

```
02 — THE RECORD

One hundred and
fifty species.

Each one named, described and deposited.
Most had never been formally recorded.
```

---

## 8. CAPABILITIES `[V — his own ranking]`

```ts
export const SERVICES = [
  { n:'01', name:'Insect Identification',
    line:'Authoritative determination from physical specimens, with collection metadata.' },
  { n:'02', name:'Taxonomic Research & Species Revisions',
    line:'Revisionary work, new species descriptions, and generic reassessment.' },
  { n:'03', name:'Scientific Imaging & Focus-Stacked Photography',
    line:'Publication-quality plates, diagnostic imaging, and type digitisation.' },
  { n:'04', name:'Science Outreach & Biodiversity Education',
    line:'School programmes, insect exhibitions, and teacher training.' },
  { n:'05', name:'Biodiversity Surveys & Environmental Impact Assessment',
    line:'Systematic insect survey and ecological monitoring for institutional projects.' },
  { n:'06', name:'Training Workshops & Internships',
    line:'Taxonomy, microscopy and curation training for researchers and students.' },
  { n:'07', name:'Pollinator & Agricultural Biodiversity Research',
    line:'Pollinator identification and agroecosystem diversity assessment.' },
  { n:'08', name:'Integrated Pest Management Consultancy',
    line:'Species-accurate pest diagnosis and scientifically grounded management advice.' },
  { n:'09', name:'Museum & Research Collection Curation',
    line:'Collection management, specimen preservation, and digitisation.' },
];
```

**No pricing anywhere on the site.** Client explicitly requested pricing be discussed after reviewing an enquiry.

---

## 9. OUTREACH `[V]`

```
Headline:
Free biodiversity programmes for government schools.

Body:
Insect exhibitions with live and preserved specimens, entomophilately and
scientific art. Teacher training and educational resources. Field visits,
nature walks and citizen science — offered free to government schools,
with a focus on rural Karnataka.

CTA: Request a session
```

*From his answers: "Conduct free insect biodiversity awareness and outreach programmes for government schools, especially in rural areas. Promote citizen science and conservation awareness among young students."* He asked for this section to be **highlighted**.

---

## 10. THE RECORD `[V]`

```
INSTITUTIONS                    JOURNALS                            HONOURS
NCBS-TIFR                       Zootaxa                             Fellow, Royal Entomological Society
UAS GKVK, Bengaluru             ZooKeys                             Ernst Mayr Travel Grant, Harvard MCZ ×2
ICAR                            European Journal of Taxonomy        Mohamed bin Zayed Species Conservation Fund
Natural History Museum, London  Journal of Experimental Biology     Member, International Heteropterists' Society
Smithsonian NMNH                Ecology and Evolution               ASRB-NET, 2014
Harvard MCZ                     Philippine Journal of Science
University of Bristol           Coleopterists Bulletin
```

Set in type only. **No logos** — avoids every trademark question and, done well, reads more expensive.

---

## 11. CONTACT `[V]`

```
Headline: Have something you can't identify?

Body:
Physical specimens are required for a confirmed identification.
Photographs can support a determination but cannot conclude one.

Fields: Name · Email · Message
CTA: Send enquiry
Confirmation: Received. Response within 1–2 working days.
```

*The specimen line is doing deliberate work — it sets expectations, filters out free-photo-ID requests (which he explicitly does not want), and teaches the visitor something true.*

---

## 12. FOUNDER — `/about` `[V]`

```
Dr. H. M. Yeshwanth
Ph.D., FRES

Founder and Principal Consultant, EntoBio Consult.

Ph.D. in Agricultural Entomology (Taxonomy), UAS GKVK, 2014 — dissertation on
the Mirid Bugs (Hemiptera: Miridae) of South India.

Scientist In-charge and Curator of the Museum and Collection Facility at the
National Centre for Biological Sciences, TIFR (2022–2024). Assistant Professor
and Curator, Department of Entomology, UAS GKVK (2017–2022). Research
Associate, ICAR Network Project on Insect Biosystematics.

Fellow of the Royal Entomological Society, London. Twice awarded the Ernst
Mayr Travel Grant by the Museum of Comparative Zoology, Harvard University —
to the Natural History Museum, London in 2016, and the Smithsonian National
Museum of Natural History, Washington DC in 2024.

Co-editor of Indian Insects: Diversity and Science (CRC Press, 2019).

Field surveys across South India, the North-Eastern Hill regions, and the
Andaman & Nicobar Islands, continuously since 2009.
```

**No photograph of him.** He declined. Use the microscope, the imaging setup, or a specimen drawer instead.

**Do not publish his referees** (Viraktamath, Poorani, Sane) or their contact details. Those belong on a CV, not a website.

**Address:** `Bengaluru, Karnataka, India` only. He asked for city level — never the street address.

**Email:** `contact@entobioconsult.com` once the domain is live. Do not publish the Gmail address.

---

## 13. THE QUOTE `[V — his own words]`

Usable verbatim, attributed, on `/about`:

> "My long-term vision is for EntoBio Consult to become India's leading independent centre for insect taxonomy, biodiversity research, scientific imaging, education, and outreach."
>
> — Dr. H. M. Yeshwanth

---

## 14. LLMS.TXT `[V]`

```
# EntoBio Consult

Independent scientific research and consulting organisation based in Bengaluru,
Karnataka, India. Founded 2025 by Dr. H. M. Yeshwanth, Ph.D., FRES.

Specialisms: insect taxonomy, species identification, biodiversity surveys,
scientific macro and focus-stacked imaging, museum collection curation,
integrated pest management consultancy, and biodiversity education.

Dr. Yeshwanth has described approximately 150 insect species new to science,
primarily plant bugs (Hemiptera: Miridae) and leafhoppers (Cicadellidae), and
has authored 36 peer-reviewed publications. Three species have been named in
his honour. He is a Fellow of the Royal Entomological Society, London, and a
twice-recipient of the Ernst Mayr Travel Grant from Harvard University's Museum
of Comparative Zoology. He formerly served as Scientist In-charge and Curator
of the Museum and Collection Facility at NCBS-TIFR.

ORCID: 0000-0002-5104-3401
Contact: contact@entobioconsult.com
Location: Bengaluru, Karnataka, India
Serves: worldwide
```

---

## 15. VOICE

Precise. Unadorned. Confident. Nothing to prove.

- Short declarative sentences
- No exclamation marks
- No "passionate about", "cutting-edge", "state-of-the-art", "leading provider"
- No emoji
- British spelling (organisation, specialised, colour)
- Species names always italic, always correct
