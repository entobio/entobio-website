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
      'Independent insect taxonomy, biodiversity research and scientific macro imaging.',
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

  /** The Manifesto — CONTENT.md §6 [V] */
  manifesto: {
    lines: [
      'A species without a name cannot be protected.',
      'It cannot be regulated, traded, or conserved.',
      'It cannot appear in a law, a report, or a paper.',
      'Taxonomy is the layer beneath all of biology.',
    ] as const,
    finalLine: 'And almost nobody can still do it.',
  },

  /** Species Marquee header — CONTENT.md §7 [V] */
  marquee: {
    index: '03 — ONE HUNDRED AND FIFTY',
    headline: ['One hundred and', 'fifty species.'],
    body: [
      'Each one named, described and deposited.',
      'Most had never been formally recorded.',
    ] as const,
  },

  /** Eponymous caption — CONTENT.md §2 [V] */
  eponymous: {
    caption: 'NAMED IN HIS HONOUR',
    explainer:
      'When a colleague names a species after you, it is the field\u2019s way of recording that you changed what it knows.',
  },

  /** Outreach — CONTENT.md §9 [V] */
  outreach: {
    headline: 'Free biodiversity programmes for government schools.',
    body: 'Insect exhibitions with live and preserved specimens, entomophilately and scientific art. Teacher training and educational resources. Field visits, nature walks and citizen science. Offered free to government schools, with a focus on rural Karnataka.',
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

  /** Stats — CONTENT.md §1 [V] */
  stats: [
    { value: 150, label: 'SPECIES DESCRIBED' },
    { value: 36, label: 'PUBLICATIONS' },
    { value: 3, label: 'TAXA NAMED IN HIS HONOUR' },
    { value: 16, label: 'YEARS IN THE FIELD' },
  ] as const,

  /** Founder — CONTENT.md §12 [V] */
  founder: {
    name: 'Dr. H. M. Yeshwanth',
    title: 'Ph.D., FRES',
    role: 'Founder and Principal Consultant, EntoBio Consult.',
    bio: [
      'Ph.D. in Agricultural Entomology (Taxonomy), UAS GKVK, 2014. Dissertation on the Mirid Bugs (Hemiptera: Miridae) of South India.',
      'Scientist In-charge and Curator of the Museum and Collection Facility at the National Centre for Biological Sciences, TIFR (2022\u20132024). Assistant Professor and Curator, Department of Entomology, UAS GKVK (2017\u20132022). Research Associate, ICAR Network Project on Insect Biosystematics.',
      'Fellow of the Royal Entomological Society, London. Twice awarded the Ernst Mayr Travel Grant by the Museum of Comparative Zoology, Harvard University (Natural History Museum, London in 2016, and the Smithsonian National Museum of Natural History, Washington DC in 2024).',
      'Co-editor of Indian Insects: Diversity and Science (CRC Press, 2019).',
      'Field surveys across South India, the North-Eastern Hill regions, and the Andaman & Nicobar Islands, continuously since 2009.',
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
