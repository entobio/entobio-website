/**
 * src/content/species.ts
 * Verified species data — CONTENT.md §2–3
 *
 * RULE: Only entries with `verified: true` may render a binomial.
 * Pending entries exist for structure but must be gated in production.
 */

export type Species = {
  genus: string;
  species: string;
  authority: string;
  family: string;
  /** Slot ID in src/content/media.ts (e.g. 'PLATE-01'), never a path. */
  plateSlot: string | null;
  eponymous?: boolean;
  verified: boolean;
};

/**
 * The three eponymous taxa — CONTENT.md §2 [V]
 * These are the only species names verified as safe to render at launch.
 */
export const EPONYMOUS: readonly Species[] = [
  {
    genus: 'Evacanthus',
    species: 'yeshwanthi',
    authority: '',
    family: 'Cicadellidae',
    plateSlot: 'PLATE-01',
    eponymous: true,
    verified: true,
  },
  {
    genus: 'Oryctopterus',
    species: 'yeshwanthi',
    authority: '',
    family: 'Stenopelmatidae',
    plateSlot: 'PLATE-02',
    eponymous: true,
    verified: true,
  },
  {
    genus: 'Axiagastus',
    species: 'yeshwanthi',
    authority: '',
    family: 'Pentatomidae',
    plateSlot: 'PLATE-03',
    eponymous: true,
    verified: true,
  },
] as const;

/**
 * Marquee species — CONTENT.md §3 [P]
 * All marked verified: false until epithets and years are confirmed
 * from the actual papers. Structure is correct, values need verification.
 *
 * Fallback per CONTENT.md §3: render cards with the family in mono and
 * the publication citation — no binomial. A card reading
 * "MIRIDAE · ZOOTAXA 4084(3), 2016" is honest and deliberate.
 */
export const MARQUEE_SPECIES: Species[] = [
  // Zootaxa 3878(1), 2014 — Hypseloecus (5 new spp.)
  { genus: 'Hypseloecus', species: 'sp.', authority: 'ZOOTAXA 3878(1), 2014', family: 'Miridae', plateSlot: 'PLATE-04', verified: false },
  // Zootaxa 3904(4), 2015 — Ectmetopterus (2 new spp.)
  { genus: 'Ectmetopterus', species: 'sp.', authority: 'ZOOTAXA 3904(4), 2015', family: 'Miridae', plateSlot: 'PLATE-05', verified: false },
  // ZooKeys 475, 2015 — Sulawesifulvius (1 new sp.)
  { genus: 'Sulawesifulvius', species: 'sp.', authority: 'ZOOKEYS 475, 2015', family: 'Miridae', plateSlot: 'PLATE-06', verified: false },
  // Zootaxa 4084(3), 2016 — Cylapinae of India
  { genus: 'Cylapinae', species: 'sp.', authority: 'ZOOTAXA 4084(3), 2016', family: 'Miridae', plateSlot: 'PLATE-07', verified: false },
  // Zootaxa 4311(4), 2017 — Platypleura
  { genus: 'Platypleura', species: 'sp.', authority: 'ZOOTAXA 4311(4), 2017', family: 'Cicadidae', plateSlot: 'PLATE-08', verified: false },
  // Zootaxa 4378(3), 2018 — Indian Hyalopeplini
  { genus: 'Hyalopeplini', species: 'sp.', authority: 'ZOOTAXA 4378(3), 2018', family: 'Miridae', plateSlot: 'PLATE-09', verified: false },
  // Zootaxa 4413(3), 2018 — Klabonosa
  { genus: 'Klabonosa', species: 'sp.', authority: 'ZOOTAXA 4413(3), 2018', family: 'Miridae', plateSlot: 'PLATE-10', verified: false },
  // Zootaxa 4711(1), 2019 — Indian Mecistoscelini
  { genus: 'Mecistoscelini', species: 'sp.', authority: 'ZOOTAXA 4711(1), 2019', family: 'Berytidae', plateSlot: 'PLATE-11', verified: false },
  // Coleopterists Bulletin 73(4), 2019 — Brodskyella (2 new spp.)
  { genus: 'Brodskyella', species: 'sp.', authority: 'COLEOPT. BULL. 73(4), 2019', family: 'Chrysomelidae', plateSlot: 'PLATE-12', verified: false },
  // Zootaxa 4822(4), 2020 — Stegelytrini
  { genus: 'Stegelytrini', species: 'sp.', authority: 'ZOOTAXA 4822(4), 2020', family: 'Miridae', plateSlot: 'PLATE-13', verified: false },
  // Zootaxa 4895(1), 2020 — Scaphoideini (new genus + 3 spp.)
  { genus: 'Scaphoideini', species: 'sp.', authority: 'ZOOTAXA 4895(1), 2020', family: 'Cicadellidae', plateSlot: 'PLATE-14', verified: false },
  // Zootaxa 4903(2), 2021 — Isometopinae, India & Sri Lanka
  { genus: 'Isometopinae', species: 'sp.', authority: 'ZOOTAXA 4903(2), 2021', family: 'Miridae', plateSlot: 'PLATE-15', verified: false },
  // Zootaxa 4903(3), 2021 — Macropsis (3 new spp.)
  { genus: 'Macropsis', species: 'sp.', authority: 'ZOOTAXA 4903(3), 2021', family: 'Macropsinae', plateSlot: 'PLATE-16', verified: false },
  // European J. Taxonomy 745, 2021 — Eccritotarsini
  { genus: 'Eccritotarsini', species: 'sp.', authority: 'EUR. J. TAXON. 745, 2021', family: 'Miridae', plateSlot: 'PLATE-17', verified: false },
  // Zootaxa 5128(2), 2022 — Drabescus
  { genus: 'Drabescus', species: 'sp.', authority: 'ZOOTAXA 5128(2), 2022', family: 'Cicadellidae', plateSlot: 'PLATE-18', verified: false },
  // Zootaxa 5319(4), 2023 — Hylicinae
  { genus: 'Hylicinae', species: 'sp.', authority: 'ZOOTAXA 5319(4), 2023', family: 'Hylicinae', plateSlot: 'PLATE-19', verified: false },
  // Zootaxa 5623(1), 2025 — Ledrinae of the Indian subcontinent
  { genus: 'Ledrinae', species: 'sp.', authority: 'ZOOTAXA 5623(1), 2025', family: 'Cicadellidae', plateSlot: 'PLATE-20', verified: false },
];

/** All species — eponymous (verified) + marquee (pending) */
export const ALL_SPECIES: readonly Species[] = [...EPONYMOUS, ...MARQUEE_SPECIES];
