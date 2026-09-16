/**
 * src/content/services.ts
 * Nine capabilities — CONTENT.md §8 [V]
 * Order is his own ranking. No pricing anywhere on the site.
 */

export type Service = {
  n: string;
  name: string;
  line: string;
};

export const SERVICES: readonly Service[] = [
  {
    n: '01',
    name: 'Insect Identification',
    line: 'Authoritative determination from physical specimens, with collection metadata.',
  },
  {
    n: '02',
    name: 'Taxonomic Research & Species Revisions',
    line: 'Revisionary work, new species descriptions, and generic reassessment.',
  },
  {
    n: '03',
    name: 'Scientific Imaging & Focus-Stacked Photography',
    line: 'Publication-quality plates, diagnostic imaging, and type digitisation.',
  },
  {
    n: '04',
    name: 'Science Outreach & Biodiversity Education',
    line: 'School programmes, insect exhibitions, and teacher training.',
  },
  {
    n: '05',
    name: 'Biodiversity Surveys & Environmental Impact Assessment',
    line: 'Systematic insect survey and ecological monitoring for institutional projects.',
  },
  {
    n: '06',
    name: 'Training Workshops & Internships',
    line: 'Taxonomy, microscopy and curation training for researchers and students.',
  },
  {
    n: '07',
    name: 'Pollinator & Agricultural Biodiversity Research',
    line: 'Pollinator identification and agroecosystem diversity assessment.',
  },
  {
    n: '08',
    name: 'Integrated Pest Management Consultancy',
    line: 'Species-accurate pest diagnosis and scientifically grounded management advice.',
  },
  {
    n: '09',
    name: 'Museum & Research Collection Curation',
    line: 'Collection management, specimen preservation, and digitisation.',
  },
] as const;
