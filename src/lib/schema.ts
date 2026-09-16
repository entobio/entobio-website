/**
 * src/lib/schema.ts
 * JSON-LD builders for SEO & AEO.
 * All URLs read strictly from SITE constants in site.ts.
 * — ARCHITECTURE.md §5
 */

import { SITE } from './site';

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE.url}/#organization`,
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/brand/logo.png`,
    foundingDate: '2025',
    areaServed: 'Worldwide',
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE.locality,
      addressRegion: SITE.region,
      addressCountry: SITE.country,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: SITE.email,
      contactType: 'customer support',
      areaServed: 'Worldwide',
    },
  };
}

export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE.url}/#person`,
    name: SITE.founder,
    jobTitle: 'Founder and Principal Consultant',
    worksFor: {
      '@id': `${SITE.url}/#organization`,
    },
    identifier: SITE.orcid,
    sameAs: [
      `https://orcid.org/${SITE.orcid}`,
      'https://www.researchgate.net/profile/H-M-Yeshwanth',
      'https://scholar.google.com/citations?user=yeshwanth',
    ],
  };
}

export function webSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE.url}/#website`,
    name: SITE.name,
    url: SITE.url,
    publisher: {
      '@id': `${SITE.url}/#organization`,
    },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE.url}${item.path}`,
    })),
  };
}
