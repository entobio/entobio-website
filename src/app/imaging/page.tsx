/**
 * src/app/imaging/page.tsx
 * DEDICATED SCIENTIFIC IMAGING PAGE — IMAGING-PAGE-SPEC.md & FACTS.md §7
 *
 * Server Component with dedicated SEO metadata and JSON-LD schemas:
 * - BreadcrumbList
 * - Service JSON-LD per row (6 services, areaServed: India)
 * - FAQPage JSON-LD
 * Scope: Indian research institutions only.
 */

import type { Metadata } from 'next';
import { ImagingHero } from '@/components/imaging/ImagingHero';
import { FocusStackComparison } from '@/components/imaging/FocusStackComparison';
import { SpecimenGallery } from '@/components/imaging/SpecimenGallery';
import { ImagingServicesIndex } from '@/components/imaging/ImagingServicesIndex';
import { ImagingDeliverables } from '@/components/imaging/ImagingDeliverables';
import { ImagingEquipment } from '@/components/imaging/ImagingEquipment';
import { SpecimenHandling } from '@/components/imaging/SpecimenHandling';
import { ImagingEnquiryForm } from '@/components/imaging/ImagingEnquiryForm';
import { Footer } from '@/components/layout/Footer';
import {
  breadcrumbSchema,
  imagingServicesSchema,
  imagingFaqSchema,
} from '@/lib/schema';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Scientific Specimen Imaging & Focus Stacking',
  description:
    'Publication-grade focus-stacked macro and micro imaging for taxonomic research, type specimen documentation, and collection digitisation across Indian institutions.',
  keywords: [
    'focus stacking service India',
    'scientific specimen imaging India',
    'insect photography for publication',
    'type specimen imaging',
    'museum collection digitisation India',
    'entomological imaging service',
    'macro photography scientific',
  ],
};

export default function ImagingPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Scientific Imaging', path: '/imaging' },
  ]);
  const servicesJsonLd = imagingServicesSchema();
  const faqJsonLd = imagingFaqSchema();

  return (
    <main className="min-h-screen bg-void text-bone">
      {/* Structured Data / JSON-LD for SEO & AEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbs, ...servicesJsonLd, faqJsonLd]),
        }}
      />

      {/* Hero Section */}
      <ImagingHero />

      {/* Focus Stack Demonstration (Gated behind real assets) */}
      <FocusStackComparison />

      {/* Publication Specimen Plates Gallery */}
      <SpecimenGallery />

      {/* Five-Row Services Index */}
      <ImagingServicesIndex />

      {/* Deliverables & Technical Specifications */}
      <ImagingDeliverables />

      {/* Equipment & Optical Rig Specifications */}
      <ImagingEquipment />

      {/* Specimen Handling Protocol & Indian Scope */}
      <SpecimenHandling />

      {/* Structured Brief Enquiry Form */}
      <ImagingEnquiryForm />

      {/* Site Footer */}
      <Footer />
    </main>
  );
}
