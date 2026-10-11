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
      SITE.researchGate,
      SITE.scholar,
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

export function imagingServicesSchema() {
  const services = [
    {
      name: 'Single Specimen Imaging',
      description:
        'Focus-stacked macro and micro plates of individual specimens: insects, arthropods, small invertebrates, botanical material. Publication-ready, figure-composed, at agreed magnification.',
    },
    {
      name: 'Digitisation of the Collections',
      description:
        'Batch imaging of reference collections, teaching sets, and institutional series, with consistent lighting, optical scale calibration, and metadata across the specimen series.',
    },
    {
      name: 'Slide & Microscope Preparation Imaging',
      description:
        'Transmitted light, brightfield and phase imaging of permanent and temporary slide preparations.',
    },
    {
      name: 'Comparative Plates',
      description:
        'Multi-specimen figures composed for publication: aligned, scaled, labelled and laid out to journal specification.',
    },
    {
      name: 'Custom Documentation',
      description:
        'Non-standard samples, unusual magnifications, or imaging workflows developed for a specific research question.',
    },
  ];

  return services.map((s, index) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE.url}/imaging#service-0${index + 1}`,
    name: s.name,
    description: s.description,
    serviceType: 'Scientific Specimen Imaging',
    provider: {
      '@id': `${SITE.url}/#organization`,
    },
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
    url: `${SITE.url}/imaging`,
  }));
}

export function imagingFaqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Which institutions are eligible for scientific specimen imaging?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Specimen imaging intake is available to universities, natural history museums, ICAR institutes, research laboratories, and institutional collections across India. Due to permit and biological transfer restrictions, international specimen intake is not available.',
        },
      },
      {
        '@type': 'Question',
        name: 'How are fragile or type specimens handled during optical capture?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Specimens are logged on arrival, examined for structural stability, imaged in our Bengaluru facility using non-destructive optical stacking techniques, and returned in their original housing.',
        },
      },
      {
        '@type': 'Question',
        name: 'What sample types are accepted for macro and micro imaging?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We accept pinned dry-mounted insects, small arthropods, botanical specimens, permanent or temporary slide preparations, and alcohol-preserved material from institutions within India.',
        },
      },
    ],
  };
}

