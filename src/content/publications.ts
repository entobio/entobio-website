/**
 * src/content/publications.ts
 * Authoritative publications and eponymous taxa — FACTS.md §2 and §4
 *
 * All thirty-six entries trace to Dr. Yeshwanth's verified CV.
 * International papers (31) + Co-edited Book (1).
 */

export type EponymousTaxon = {
  genus: string;
  species: string;
  family: string;
};

export const EPONYMOUS: readonly EponymousTaxon[] = [
  { genus: 'Evacanthus', species: 'yeshwanthi', family: 'Cicadellidae' },
  { genus: 'Oryctopterus', species: 'yeshwanthi', family: 'Stenopelmatidae' },
  { genus: 'Axiagastus', species: 'yeshwanthi', family: 'Pentatomidae' },
] as const;

export type Publication = {
  id: string;
  title: string;
  journal: string;
  volume: string;
  year: number;
  isBook?: boolean;
  doi?: string;
  verified: boolean;
};

export const PUBLICATIONS: readonly Publication[] = [
  {
    id: 'PUB-01',
    title: 'Hypseloecus, five new species',
    journal: 'Zootaxa',
    volume: '3878(1)',
    year: 2014,
    verified: true,
  },
  {
    id: 'PUB-02',
    title: 'Ectmetopterus, two new species',
    journal: 'Zootaxa',
    volume: '3904(4)',
    year: 2015,
    verified: true,
  },
  {
    id: 'PUB-03',
    title: 'Sulawesifulvius, new species',
    journal: 'ZooKeys',
    volume: '475',
    year: 2015,
    verified: true,
  },
  {
    id: 'PUB-04',
    title: 'Cylapinae of India',
    journal: 'Zootaxa',
    volume: '4084(3)',
    year: 2016,
    verified: true,
  },
  {
    id: 'PUB-05',
    title: 'Platypleura, new species',
    journal: 'Zootaxa',
    volume: '4311(4)',
    year: 2017,
    verified: true,
  },
  {
    id: 'PUB-06',
    title: 'Indian Hyalopeplini',
    journal: 'Zootaxa',
    volume: '4378(3)',
    year: 2018,
    verified: true,
  },
  {
    id: 'PUB-07',
    title: 'Klabonosa, new species',
    journal: 'Zootaxa',
    volume: '4413(3)',
    year: 2018,
    verified: true,
  },
  {
    id: 'PUB-08',
    title: 'Derbid planthopper take-off',
    journal: 'J. Exp. Biol.',
    volume: '',
    year: 2019,
    verified: true,
  },
  {
    id: 'PUB-09',
    title: 'Soractellus nigrominutus',
    journal: 'Zootaxa',
    volume: '4614(3)',
    year: 2019,
    verified: true,
  },
  {
    id: 'PUB-10',
    title: 'Indian Mecistoscelini',
    journal: 'Zootaxa',
    volume: '4711(1)',
    year: 2019,
    verified: true,
  },
  {
    id: 'PUB-11',
    title: 'Brodskyella, two new species',
    journal: 'Coleopterists Bull.',
    volume: '73(4)',
    year: 2019,
    verified: true,
  },
  {
    id: 'PUB-12',
    title: 'Leafhopper tribe Stegelytrini',
    journal: 'Zootaxa',
    volume: '4822(4)',
    year: 2020,
    verified: true,
  },
  {
    id: 'PUB-13',
    title: 'Mirid pests of Eucalyptus',
    journal: 'J. Kansas Ent. Soc.',
    volume: '',
    year: 2020,
    verified: true,
  },
  {
    id: 'PUB-14',
    title: 'Scaphoideini, new genus, three species',
    journal: 'Zootaxa',
    volume: '4895(1)',
    year: 2020,
    verified: true,
  },
  {
    id: 'PUB-15',
    title: 'Isometopinae of India and Sri Lanka',
    journal: 'Zootaxa',
    volume: '4903(2)',
    year: 2021,
    verified: true,
  },
  {
    id: 'PUB-16',
    title: 'Macropsis, three new species',
    journal: 'Zootaxa',
    volume: '4903(3)',
    year: 2021,
    verified: true,
  },
  {
    id: 'PUB-17',
    title: 'Eccritotarsini review',
    journal: 'Eur. J. Taxonomy',
    volume: '745',
    year: 2021,
    verified: true,
  },
  {
    id: 'PUB-18',
    title: 'Heissothignus, taxonomic position',
    journal: 'Zootaxa',
    volume: '5032(2)',
    year: 2021,
    verified: true,
  },
  {
    id: 'PUB-19',
    title: 'Drabescus review',
    journal: 'Zootaxa',
    volume: '5128(2)',
    year: 2022,
    verified: true,
  },
  {
    id: 'PUB-20',
    title: 'Paraidioscopus',
    journal: 'Zootaxa',
    volume: '5222(3)',
    year: 2022,
    verified: true,
  },
  {
    id: 'PUB-21',
    title: 'Hylicinae',
    journal: 'Zootaxa',
    volume: '5319(4)',
    year: 2023,
    verified: true,
  },
  {
    id: 'PUB-22',
    title: 'Arboreal eurymeline leafhoppers',
    journal: 'Zootaxa',
    volume: '5462(1)',
    year: 2024,
    verified: true,
  },
  {
    id: 'PUB-23',
    title: 'Agalliini and Macropsini',
    journal: 'Zootaxa',
    volume: '5486(2)',
    year: 2024,
    verified: true,
  },
  {
    id: 'PUB-24',
    title: 'Libengaia in Africa and India',
    journal: 'Zootaxa',
    volume: '5507(1)',
    year: 2024,
    verified: true,
  },
  {
    id: 'PUB-25',
    title: 'Ctenoplectra review',
    journal: 'J. Insect Biodiv.',
    volume: '',
    year: 2024,
    verified: true,
  },
  {
    id: 'PUB-26',
    title: 'Leucopholis delimitation',
    journal: 'Philippine J. Sci.',
    volume: '',
    year: 2024,
    verified: true,
  },
  {
    id: 'PUB-27',
    title: 'Monobazus-group genera',
    journal: 'Zootaxa',
    volume: '5567(1)',
    year: 2025,
    verified: true,
  },
  {
    id: 'PUB-28',
    title: 'Brachygaster, new species',
    journal: 'Zootaxa',
    volume: '5618(1)',
    year: 2025,
    verified: true,
  },
  {
    id: 'PUB-29',
    title: 'Host-pathogen-vector continuum',
    journal: 'Ecology & Evolution',
    volume: '',
    year: 2025,
    verified: true,
  },
  {
    id: 'PUB-30',
    title: 'Ledrinae of the Indian subcontinent',
    journal: 'Zootaxa',
    volume: '5623(1)',
    year: 2025,
    verified: true,
  },
  {
    id: 'PUB-31',
    title: 'Mukariini and Punctulini, Thailand',
    journal: 'Zootaxa',
    volume: '5741(1)',
    year: 2026,
    verified: true,
  },
  {
    id: 'PUB-32',
    title: 'Indian Insects: Diversity and Science',
    journal: 'CRC Press',
    volume: 'ISBN 9780367184131',
    year: 2019,
    isBook: true,
    verified: true,
  },
] as const;
