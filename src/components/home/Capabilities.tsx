/**
 * src/components/home/Capabilities.tsx
 * ACT 5 — CAPABILITIES — HOMEPAGE-BUILD-SPEC §7
 *
 * Restraint after four loud acts. --carbon background.
 * Nine rows, hairline-separated, padding: 26px 40px.
 * Mono index left (01–09), service name in display serif clamp(1.5rem, 3vw, 2.6rem).
 * On row hover: background lifts to rgba(242,237,227,0.03), name shifts x: 14px over 400ms.
 */

import Link from 'next/link';
import { SERVICES, SERVICES_HEADER } from '@/content/services';

export function Capabilities() {
  return (
    <section
      id="capabilities"
      className="relative w-full bg-carbon py-[120px] overflow-hidden"
    >
      {/* Section Header — PDF Page 6 */}
      <div className="px-gutter mb-14 max-w-[1560px] mx-auto">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber mb-3 font-semibold">
          {SERVICES_HEADER.eyebrow}
        </p>
        <h2
          className="font-display text-[#F7F5F0] mb-4"
          style={{
            fontSize: 'clamp(2.4rem, 4.5vw, 4rem)',
            lineHeight: 0.95,
            letterSpacing: '-0.025em',
          }}
        >
          {SERVICES_HEADER.sectionTitle}
        </h2>
        <p className="font-body text-[#D5D0C6] text-[16px] max-w-[700px] leading-relaxed">
          {SERVICES_HEADER.subtitle}
        </p>
      </div>

      {/* Eight Hairline-Separated Service Rows */}
      <div className="border-t border-rule w-full">
        {SERVICES.map((service) => (
          <Link
            key={service.n}
            href={service.n === '02' ? '/imaging' : `/services#service-${service.n}`}
            className="group relative block border-b border-rule py-[28px] px-gutter transition-colors duration-300 hover:bg-[rgba(242,237,227,0.04)]"
          >
            <div className="max-w-[1560px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              {/* Index (01–08) */}
              <div className="md:col-span-1">
                <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-amber group-hover:text-amber font-semibold transition-colors duration-200">
                  {service.n}
                </span>
              </div>

              {/* Service Name (Display Serif, shifts +14px on hover) */}
              <div className="md:col-span-6">
                <h3
                  className="font-display text-[#F7F5F0] group-hover:text-white transition-all duration-300 ease-out group-hover:translate-x-[14px]"
                  style={{
                    fontSize: 'clamp(1.5rem, 2.8vw, 2.5rem)',
                    lineHeight: 1.05,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {service.name}
                </h3>
              </div>

              {/* Short Description Line */}
              <div className="md:col-span-5 text-left md:text-right">
                <p className="font-body text-[14px] text-bone-dim opacity-85 group-hover:opacity-100 transition-opacity duration-300">
                  {service.line}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
