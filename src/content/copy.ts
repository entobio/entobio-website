/**
 * src/content/copy.ts
 * All headline and body strings — CONTENT.md §4–9, §11–13 [V]
 *
 * Every string on the site lives here. If it isn't in this file,
 * it doesn't render. — CONTENT.md §0
 */

export const COPY = {
  /** Hero — CONTENT.md §4 [V] */
  hero: {
    eyebrow: 'BENGALURU · INDIA — ESTABLISHED 2025',
    headline: ['Everything', 'begins with', 'a name.'],
    subline:
      'Entomologist | Independent Researcher | Taxonomy | Biodiversity | High-Resolution Scientific Imaging',
  },

  /** The Descent — CONTENT.md §5 [V structure] */
  descent: {
    scales: [
      { value: '1 METRE', label: 'the grassland' },
      { value: '1 CENTIMETRE', label: 'the leaf' },
      { value: '1 MILLIMETRE', label: 'the insect' },
      { value: '200 MICROMETRES', label: 'the wing' },
    ] as const,
    finalLine: 'This is where he works.',
  },

  /** The Manifesto — single retained statement from client review */
  manifesto: {
    statement: 'A species without a name cannot be protected.',
    lines: ['A species without a name cannot be protected.'] as const,
    finalLine: '',
  },

  /** Species & Discoveries header — CONTENT.md §7 */
  marquee: {
    index: '03 — TAXONOMIC DISCOVERIES',
    headline: ['One hundred and', 'fifty species.'],
    body: [
      'Each one named, described and deposited.',
      'Documenting and conserving insect diversity across the subcontinent.',
    ] as const,
  },

  /** Eponymous caption — PDF Page 2 */
  eponymous: {
    caption: 'EPONYMOUS TAXA',
    explainer:
      'Taxa named in his honour by scientific peers — a lasting record of taxonomic impact and contribution to insect science.',
  },

  /** Outreach — PDF Page 8 & 9 */
  outreach: {
    headline: 'Biodiversity programmes & science education.',
    body: 'Insect exhibitions with live and preserved specimens, scientific art, and 3D models. Educational resources and biological field training for science educators. Guided biodiversity walks and hands-on insect observation in agroecosystems and biodiverse and aquatic habitats.',
    cta: 'Request a session',
  },

  /** Contact — CONTENT.md §11 [V] */
  contact: {
    headline: 'Have something you can\u2019t identify?',
    body: 'Physical specimens are required for a confirmed identification. Photographs can support a determination but cannot conclude one.',
    cta: 'Send enquiry',
    confirmation: 'Received. Response within 1\u20132 working days.',
    fields: ['Name', 'Email', 'Message'] as const,
  },

  /** Stats — 3 key metrics (Taxa named in honour removed per PDF Page 1) */
  stats: [
    { value: 150, label: 'SPECIES DESCRIBED' },
    { value: 36, label: 'PUBLICATIONS' },
    { value: 16, label: 'YEARS IN THE FIELD' },
  ] as const,

  /** Founder — PDF Page 9 & 10 verbatim bio */
  founder: {
    name: 'Dr. H. M. Yeshwanth',
    title: 'Ph.D., FRES',
    role: 'Founder and Principal Consultant, EntoBio Consult.',
    bio: [
      'An entomologist and independent researcher specialising in insect taxonomy, biodiversity, and natural history. His primary research interests are Miridae (plant bugs) and leafhoppers, with a broader focus on insect diversity, species identification, and conservation. He holds a Ph.D. in Agricultural Entomology from the University of Agricultural Sciences, Bengaluru (UAS GKVK).',
      'He previously served as an Assistant Professor in the Department of Entomology at UAS GKVK, teaching undergraduate and postgraduate students. He also served as Curator of Research Collections, contributing to the development and management of scientific insect collections and providing insect identification services. Since 2009, he has conducted extensive field surveys across India, including the Andaman and Nicobar Islands, documenting insect diversity and contributing to taxonomic research.',
      'Through EntoBio Consult, he provides independent research and scientific services in insect taxonomy, biodiversity assessment, species identification, natural history and research collection management, and high-resolution scientific imaging.',
    ] as const,
  },

  /** Quote — CONTENT.md §13 [V] */
  quote: {
    text: 'My long-term vision is for EntoBio Consult to become India\u2019s leading independent centre for insect taxonomy, biodiversity research, scientific imaging, education, and outreach.',
    attribution: 'Dr. H. M. Yeshwanth',
  },

  /** Footer credit */
  footer: {
    credit: 'SITE BY BUILDROCKET LABS',
  },
} as const;
