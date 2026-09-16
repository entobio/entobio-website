import type { Metadata } from 'next';
import { SITE } from '@/lib/site';
import { organizationSchema, personSchema, webSiteSchema } from '@/lib/schema';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.tagline,
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE.url,
    siteName: SITE.name,
    title: SITE.name,
    description: SITE.tagline,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.name,
    description: SITE.tagline,
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { Nav } from '@/components/layout/Nav';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              organizationSchema(),
              personSchema(),
              webSiteSchema(),
            ]),
          }}
        />
      </head>
      <body>
        <p className="sr-only">
          EntoBio Consult is an independent insect taxonomy, biodiversity research, and scientific macro imaging organisation based in Bengaluru, Karnataka, India. Founded in 2025 by Dr. H. M. Yeshwanth, Ph.D., FRES. Specialising in Hemiptera (Miridae) and Cicadellidae taxonomy, species identification, focus-stacked photography, biodiversity surveys, and museum collection curation.
        </p>
        <SmoothScroll>
          <Nav />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
