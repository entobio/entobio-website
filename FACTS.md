# FACTS.md — ENTOBIO CONSULT
**THE SINGLE SOURCE OF TRUTH. This file overrides every other document in the repository.**

Created because the specification documents in this repo drifted from the originals during the build. Where any file — `CONTENT.md`, `HOMEPAGE-BUILD-SPEC.md`, `DESIGN.md`, or any other — disagrees with this one, **this one wins**. Nothing in this file may be altered by an AI agent. Every value here traces to Dr. Yeshwanth's CV or his own written answers.

---

## 1. THE NUMBERS — verified, do not change

| Value | Label | Source |
|---|---|---|
| **150** | Species described new to science | CV, Honors and Awards: *"Insects discovered new to science – 150 species (mirid bugs and leafhoppers)"* |
| **36** | Peer-reviewed publications | CV: 31 international + 5 national |
| **3** | Taxa named in his honour | CV, verified list below |
| **16** | Years in the field | CV: *"long-term insect surveys and collections (2009–present)"* |

**150 is correct.** Any document in this repo stating 24, 26, or "24 species and 2 genera" is wrong and must be corrected. A previous audit incorrectly flagged 150 as fabricated — it is the figure Dr. Yeshwanth states in his own CV.

**These four numbers are the only statistics permitted on the site.** Delete any other.

### Numbers currently on the site that must be REMOVED
- `600+` participants trained
- `40+` workshops conducted
- `15+` institutions visited
- `"Two decades of field research"` → the correct figure is 16 years

None of these came from him. They were invented during the build. Remove them entirely; do not substitute smaller numbers.

---

## 2. TAXA NAMED IN HIS HONOUR — the only verified species names

```ts
export const EPONYMOUS = [
  { genus: 'Evacanthus',   species: 'yeshwanthi' },
  { genus: 'Oryctopterus', species: 'yeshwanthi' },
  { genus: 'Axiagastus',   species: 'yeshwanthi' },
] as const;
```

Authorities are unknown to us and **must not be invented.** These are presented as honours conferred by other scientists, not as his own descriptions, so rendering without an authority is correct and complete in that context.

Caption: `NAMED IN HIS HONOUR`

---

## 3. SPECIES DATA — critical correction

**`src/content/species.ts` currently contains serious taxonomic errors and must be rebuilt.**

The following entries are recorded as **genera**. They are not genera. They are subfamilies and tribes, and several are assigned to the wrong family:

| Entry | Actually is | Currently assigned to | Correct family |
|---|---|---|---|
| Cylapinae | Subfamily | — | Miridae |
| Hyalopeplini | Tribe | — | Miridae |
| Mecistoscelini | Tribe | **Berytidae — WRONG** | Miridae |
| Stegelytrini | Tribe | **Miridae — WRONG** | Cicadellidae |
| Scaphoideini | Tribe | — | Cicadellidae |
| Isometopinae | Subfamily | — | Miridae |
| Eccritotarsini | Tribe | — | Miridae |
| Hylicinae | Subfamily | **"Hylicinae" as family — WRONG** | Cicadellidae |
| Ledrinae | Subfamily | — | Cicadellidae |

**How this happened:** these are the *subjects of his papers*, not genera. They were taken from a table listing his publications and converted into species records.

**An entomologist reading "BERYTIDAE: MECISTOSCELINI" on his own website sees a first-year error.** This is the highest-severity content bug on the site.

### The fix
**Delete `species.ts` entirely.** We cannot verify individual binomials, and inventing them is prohibited.

Replace the species marquee with a **publications marquee** (§4). Every card becomes a real published paper: verifiable, impressive to his peers, and the actual evidence for the figure 150.

Keep only the three eponymous taxa from §2, presented separately as honours.

---

## 4. PUBLICATIONS — the new marquee source

All thirty-six are on his CV. These are real, citable, and carry zero fabrication risk.

International (31), abbreviated — full list in his CV:

```
Hypseloecus, five new species            Zootaxa 3878(1)      2014
Ectmetopterus, two new species           Zootaxa 3904(4)      2015
Sulawesifulvius, new species             ZooKeys 475          2015
Cylapinae of India                       Zootaxa 4084(3)      2016
Platypleura, new species                 Zootaxa 4311(4)      2017
Indian Hyalopeplini                      Zootaxa 4378(3)      2018
Klabonosa, new species                   Zootaxa 4413(3)      2018
Derbid planthopper take-off              J. Exp. Biol.        2019
Soractellus nigrominutus                 Zootaxa 4614(3)      2019
Indian Mecistoscelini                    Zootaxa 4711(1)      2019
Brodskyella, two new species             Coleopterists Bull.  2019
Leafhopper tribe Stegelytrini            Zootaxa 4822(4)      2020
Mirid pests of Eucalyptus                J. Kansas Ent. Soc.  2020
Scaphoideini, new genus, three species   Zootaxa 4895(1)      2020
Isometopinae of India and Sri Lanka      Zootaxa 4903(2)      2021
Macropsis, three new species             Zootaxa 4903(3)      2021
Eccritotarsini review                    Eur. J. Taxonomy 745 2021
Heissothignus, taxonomic position        Zootaxa 5032(2)      2021
Drabescus review                         Zootaxa 5128(2)      2022
Paraidioscopus                           Zootaxa 5222(3)      2022
Hylicinae                                Zootaxa 5319(4)      2023
Arboreal eurymeline leafhoppers          Zootaxa 5462(1)      2024
Agalliini and Macropsini                 Zootaxa 5486(2)      2024
Libengaia in Africa and India            Zootaxa 5507(1)      2024
Ctenoplectra review                      J. Insect Biodiv.    2024
Leucopholis delimitation                 Philippine J. Sci.   2024
Monobazus-group genera                   Zootaxa 5567(1)      2025
Brachygaster, new species                Zootaxa 5618(1)      2025
Host-pathogen-vector continuum           Ecology & Evolution  2025
Ledrinae of the Indian subcontinent      Zootaxa 5623(1)      2025
Mukariini and Punctulini, Thailand       Zootaxa 5741(1)      2026
```

**Book:** *Indian Insects: Diversity and Science*, CRC Press, 2019. ISBN 9780367184131. Co-edited with S. Ramani and Prashanth Mohanraj.

Card format: subject line in Instrument Serif, journal and volume in mono, year in amber. Genus names appearing in a title must be italicised.

---

## 5. VERIFIED BIOGRAPHY

```
Ph.D. Agricultural Entomology (Taxonomy), UAS GKVK, 2009–2014
Dissertation: Taxonomy of Mirid Bugs (Hemiptera: Miridae) of South India
ASRB-NET qualified, 2014

Scientist In-charge & Curator, Museum and Collection Facility,
  NCBS-TIFR, 2022–2024
Assistant Professor and Curator, Dept. of Entomology, UAS GKVK, 2017–2022
Research Associate, ICAR Network Project on Insect Biosystematics, 2013–2017
Post Doctoral Research Fellow, UAS GKVK, 2025–2026

Fellow of the Royal Entomological Society, London
Ernst Mayr Travel Grant, Museum of Comparative Zoology, Harvard:
  2016 (Natural History Museum, London) and 2024 (Smithsonian NMNH)
Mohamed bin Zayed Species Conservation Fund, 2021–2023
University of Bristol Micro-Poll Project, Nepal, 2022
Member, International Heteropterists' Society

Field surveys across South India, North-Eastern Hill regions, and the
Andaman & Nicobar Islands, continuously since 2009
```

---

## 6. IDENTITY AND CONTACT

```
Name published as:  Dr. H. M. Yeshwanth, Ph.D., FRES
Organisation:       EntoBio Consult
Founded:            8 May 2025
Location published: Bengaluru, Karnataka, India   (city level ONLY)
Email published:    contact@entobioconsult.com
Domain:             entobioconsult.com
ORCID:              0000-0002-5104-3401
Google Scholar:     https://scholar.google.com/citations?user=4P1X5bAAAAAJ&hl=en
ResearchGate:       https://www.researchgate.net/profile/Yeshwanth-H-M
```

**Never publish:** his street address, his personal phone number, his Gmail address, or his referees (Prof. Viraktamath, Dr. Poorani, Prof. Sane). Referees belong on a CV, not a website.

**Never publish a photograph of him.** He declined. Hands, equipment and specimens only.

The Google Scholar link in `src/lib/schema.ts` is currently a fake placeholder (`user=yeshwanth`). Replace with the real URL above.

---

## 7. IMAGING SERVICE — scope correction

He has stated: **international specimen shipping is not viable** — permits make it too complex.

The `/imaging` page serves **Indian institutions only**: universities, museums, ICAR institutes, research labs, private laboratories.

Remove any language implying worldwide specimen intake. `IMAGING-PAGE-SPEC.md` §3.1 contains a line about accepting specimens from institutions worldwide — that line is now void.

Every operational commitment on that page (file formats, scale bars, proof plates, specimen return, turnaround) is **pending his confirmation** and must not ship until confirmed.

---

## 8. DESIGN TOKENS — restored

The repo drifted to a different type and colour system. These are the correct values.

```css
--void:        #08090A;
--carbon:      #0F1113;
--carbon-lift: #14171A;
--bone:        #F2EDE3;
--bone-dim:    rgba(242, 237, 227, 0.72);   /* raised from 0.62 — was failing AA */
--bone-faint:  rgba(242, 237, 227, 0.38);   /* decorative only, never body text */
--rule:        rgba(242, 237, 227, 0.12);
--forest:      #1E5631;
--moss:        #6B8F3E;
--amber:       #D89A3E;
```

```
Display:  Instrument Serif   400, 400 italic
Body:     Inter Tight        400, 500
Mono:     Geist Mono         400, 600
```

All three are free and self-hostable. **Download the woff2 files into `/public/fonts/` — the folder is currently empty and the entire site renders in Times New Roman.**

Never use raw Tailwind colour utilities (`text-amber-500`, etc.). Tokens only.

---

## 9. VERIFIED COPY

**Hero**
```
BENGALURU · INDIA — ESTABLISHED 2025

Everything
begins with
a name.

Independent insect taxonomy, biodiversity research
and scientific macro imaging.
```

**Manifesto** — four lines, then the amber closer
```
A species without a name cannot be protected.
It cannot be regulated, traded, or conserved.
It cannot appear in a law, a report, or a paper.
Taxonomy is the layer beneath all of biology.

And almost nobody can still do it.
```

**Marquee header**
```
One hundred and
fifty species.

Each one named, described and deposited.
Most had never been formally recorded.
```

**His own words, usable verbatim with attribution:**
> "My long-term vision is for EntoBio Consult to become India's leading independent centre for insect taxonomy, biodiversity research, scientific imaging, education, and outreach."

---

## 10. VOICE

British English. Short declarative sentences. No exclamation marks. No em-dashes in body copy. No emoji. Never: *premier, cutting-edge, passionate, world-class, state-of-the-art, leading provider*.

Species binomials always italic, authority always roman, always rendered through `<Binomial>`.
