/**
 * src/content/publications.ts
 * 36 entries from CV — ARCHITECTURE.md §1, CONTENT.md §3
 *
 * Publication list to be populated from his CV.
 * Structure placeholder — entries will be added when confirmed.
 */

export type Publication = {
  title: string;
  journal: string;
  volume: string;
  year: number;
  doi?: string;
  verified: boolean;
};

/**
 * Publications extracted from CONTENT.md §3 paper references.
 * These are the papers cited in the species data — verified as his.
 * Full title/DOI to be confirmed from CV.
 */
export const PUBLICATIONS: readonly Publication[] = [
  { title: 'Revision of Hypseloecus (5 new species)', journal: 'Zootaxa', volume: '3878(1)', year: 2014, verified: false },
  { title: 'New species of Ectmetopterus', journal: 'Zootaxa', volume: '3904(4)', year: 2015, verified: false },
  { title: 'New species of Sulawesifulvius', journal: 'ZooKeys', volume: '475', year: 2015, verified: false },
  { title: 'Cylapinae of India', journal: 'Zootaxa', volume: '4084(3)', year: 2016, verified: false },
  { title: 'Revision of Platypleura', journal: 'Zootaxa', volume: '4311(4)', year: 2017, verified: false },
  { title: 'Indian Hyalopeplini', journal: 'Zootaxa', volume: '4378(3)', year: 2018, verified: false },
  { title: 'Klabonosa', journal: 'Zootaxa', volume: '4413(3)', year: 2018, verified: false },
  { title: 'Indian Mecistoscelini', journal: 'Zootaxa', volume: '4711(1)', year: 2019, verified: false },
  { title: 'New species of Brodskyella', journal: 'Coleopterists Bulletin', volume: '73(4)', year: 2019, verified: false },
  { title: 'Stegelytrini', journal: 'Zootaxa', volume: '4822(4)', year: 2020, verified: false },
  { title: 'Scaphoideini (new genus + 3 species)', journal: 'Zootaxa', volume: '4895(1)', year: 2020, verified: false },
  { title: 'Isometopinae, India & Sri Lanka', journal: 'Zootaxa', volume: '4903(2)', year: 2021, verified: false },
  { title: 'New species of Macropsis', journal: 'Zootaxa', volume: '4903(3)', year: 2021, verified: false },
  { title: 'Eccritotarsini', journal: 'European Journal of Taxonomy', volume: '745', year: 2021, verified: false },
  { title: 'Revision of Drabescus', journal: 'Zootaxa', volume: '5128(2)', year: 2022, verified: false },
  { title: 'Hylicinae', journal: 'Zootaxa', volume: '5319(4)', year: 2023, verified: false },
  { title: 'Ledrinae of the Indian subcontinent', journal: 'Zootaxa', volume: '5623(1)', year: 2025, verified: false },
] as const;
