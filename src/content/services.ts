/**
 * src/content/services.ts
 * Focus on science and services — PDF Page 6 & 7
 * Order reflects client ranking and updated service scope.
 */

export type Service = {
  n: string;
  name: string;
  line: string;
};

export const SERVICES_HEADER = {
  eyebrow: '05 — SCIENCE & SERVICES',
  sectionTitle: 'Focus on science and services',
  subtitle:
    'Providing scientific expertise and practical support in insect identification, taxonomy, biodiversity documentation, specimen imaging.',
} as const;

export const SERVICES: readonly Service[] = [
  {
    n: '01',
    name: 'Insect Identification',
    line: 'Authoritative determination from physical specimens, with collection metadata.',
  },
  {
    n: '02',
    name: 'Scientific Imaging & Focus-Stacked Photography',
    line: 'Publication-quality plates, diagnostic imaging, and specimen digitisation.',
  },
  {
    n: '03',
    name: 'Science Outreach & Biodiversity Education',
    line: 'School programmes, insect exhibitions, and teacher training.',
  },
  {
    n: '04',
    name: 'Biodiversity Surveys & Environmental Impact Assessment',
    line: 'Systematic insect survey and ecological monitoring for institutional projects.',
  },
  {
    n: '05',
    name: 'Training Workshops & Internships',
    line: 'Taxonomy, microscopy and curation training for researchers and students.',
  },
  {
    n: '06',
    name: 'Agrobiodiversity, Pollinator Diversity, Beneficial Insects and Conservation Research',
    line: 'Pollinator identification, beneficial insect assessment, and agroecosystem diversity research.',
  },
  {
    n: '07',
    name: 'Integrated Pest Management Consultancy',
    line: 'Species-accurate pest diagnosis and scientifically grounded management advice.',
  },
  {
    n: '08',
    name: 'Natural History & Research Collection management',
    line: 'Collection management, specimen preservation, curation, and digitisation.',
  },
] as const;
