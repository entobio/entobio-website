/**
 * src/lib/site.ts
 * SINGLE SOURCE OF TRUTH for domain, metadata, and canonical URLs.
 * Every canonical tag, OG URL, sitemap entry and JSON-LD `url` reads from this.
 * Never hardcode a domain anywhere else. — CLAUDE.md §6.3
 */

export const SITE = {
  url: 'https://entobioconsult.com',
  name: 'EntoBio Consult',
  tagline: 'Independent insect taxonomy, biodiversity research and scientific macro imaging.',
  founder: 'Dr. H. M. Yeshwanth',
  orcid: '0000-0002-5104-3401',
  scholar: 'https://scholar.google.com/citations?user=4P1X5bAAAAAJ&hl=en',
  researchGate: 'https://www.researchgate.net/profile/Yeshwanth-H-M',
  email: 'contact@entobioconsult.com',
  locality: 'Bengaluru',
  region: 'Karnataka',
  country: 'IN',
  founded: '2025-05-08',
  builtBy: { name: 'BuildRocket Labs', url: 'https://buildrocketlabs.com' },
} as const;
