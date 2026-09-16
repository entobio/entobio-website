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
import { SERVICES } from '@/content/services';

export function Capabilities() {
  return (
    <section
      id="capabilities"
      className="relative w-full bg-carbon py-[120px] overflow-hidden"
    >
      {/* Section Header */}
      <div className="px-gutter mb-12 max-w-[1560px] mx-auto">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone-dim">
          05 — CAPABILITIES
        </p>
      </div>

      {/* Nine Hairline-Separated Capability Rows */}
      <div className="border-t border-rule w-full">
        {SERVICES.map((service) => (
          <Link
            key={service.n}
            href={service.n === '03' ? '/imaging' : `/services#service-${service.n}`}
            className="group relative block border-b border-rule py-[26px] px-gutter transition-colors duration-300 hover:bg-[rgba(242,237,227,0.03)]"
          >
            <div className="max-w-[1560px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              {/* Index (01–09) */}
              <div className="md:col-span-1">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone-dim group-hover:text-bone transition-colors duration-200">
                  {service.n}
                </span>
              </div>

              {/* Service Name (Display Serif, shifts +14px on hover) */}
              <div className="md:col-span-6">
                <h3
                  className="font-display text-bone transition-transform duration-300 ease-out group-hover:translate-x-[14px]"
                  style={{
                    fontSize: 'clamp(1.5rem, 3vw, 2.6rem)',
                    lineHeight: 1.05,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {service.name}
                </h3>
              </div>

              {/* Short Description Line */}
              <div className="md:col-span-5 text-left md:text-right">
                <p className="font-body text-[14px] text-bone-dim opacity-70 group-hover:opacity-100 transition-opacity duration-300">
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
