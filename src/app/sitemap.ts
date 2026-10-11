/**
 * src/app/sitemap.ts
 * ARCHITECTURE.md §5 — reads from SITE constants
 */

import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    '',
    '/about',
    '/services',
    '/imaging',
    '/publications',
    '/outreach',
    '/merchandise',
    '/clients',
    '/news',
    '/contact',
  ];

  return pages.map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: path === '' ? 1 : 0.8,
  }));
}
