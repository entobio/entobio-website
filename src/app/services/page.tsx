/**
 * /services — Capabilities & Services page
 * ARCHITECTURE.md §1, CONTENT.md §8
 */

import type { Metadata } from 'next';
import { SITE } from '@/lib/site';
import { SERVICES } from '@/content/services';
import { Button } from '@/components/ui/Button';
import { Footer } from '@/components/layout/Footer';
import { breadcrumbSchema } from '@/lib/schema';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Services & Capabilities',
  description: `Insect identification, taxonomic research, scientific imaging, biodiversity surveys and more. ${SITE.name}, ${SITE.locality}.`,
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-void text-bone pt-28 md:pt-36">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'Services', path: '/services' },
            ])
          ),
        }}
      />
      <div className="max-w-[1560px] mx-auto px-gutter pb-20">
        {/* Page Header — PDF Page 6 */}
        <div className="mb-16 border-b border-rule pb-12 max-w-[900px]">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber mb-4 font-semibold">
            ENTOMOLOGICAL CONSULTING &amp; RESEARCH
          </p>
          <h1
            className="font-display text-bone mb-6"
            style={{
              fontSize: 'var(--t-display)',
              lineHeight: 0.88,
              letterSpacing: '-0.03em',
            }}
          >
            Focus on science and services
          </h1>
          <p className="font-body text-[#D5D0C6] text-[17px] leading-relaxed">
            Providing scientific expertise and practical support in insect identification, taxonomy,
            biodiversity documentation, specimen imaging.
          </p>
        </div>

        {/* Stacked Eight Services */}
        <div className="space-y-16 mb-20">
          {SERVICES.map((service) => {
            return (
              <div
                key={service.n}
                id={`service-${service.n}`}
                className="scroll-mt-32 border-b border-rule pb-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >
                {/* Number & Name */}
                <div className="lg:col-span-6 flex flex-col items-start">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber mb-2 font-semibold">
                    SERVICE {service.n}
                  </span>
                  <h2
                    className="font-display text-[#F7F5F0]"
                    style={{
                      fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
                      lineHeight: 0.95,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {service.name}
                  </h2>
                </div>

                {/* Description & Action */}
                <div className="lg:col-span-6 flex flex-col items-start lg:items-end text-left lg:text-right">
                  <p className="font-body text-bone-dim text-[15px] leading-relaxed mb-6 max-w-[480px]">
                    {service.line}
                  </p>
                  {service.n === '02' ? (
                    <div className="flex flex-wrap items-center gap-3">
                      <Button variant="primary" href="/imaging">
                        Explore Imaging Lab →
                      </Button>
                      <Button variant="ghost" href="/contact">
                        Enquire for Service 02
                      </Button>
                    </div>
                  ) : (
                    <Button variant="ghost" href="/contact">
                      Enquire for Service {service.n}
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </main>
  );
}
