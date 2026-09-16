/**
 * src/components/home/Capabilities.tsx
 * ACT 5 — CAPABILITIES — HOMEPAGE-BUILD-SPEC §7
 *
 * Restraint after four loud acts. --carbon background.
 * Nine rows, hairline-separated, padding: 26px 40px.
 * Mono index left (01–09), service name in display serif clamp(1.5rem, 3vw, 2.6rem).
 * On row hover: background lifts to rgba(242,237,227,0.03), name shifts x: 14px over 400ms,
 * and a small plate image (180×240) fades in pinned to the lerped cursor position.
 * Stacked list with no cursor-follow plate on mobile.
 */

'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { lerp } from '@/lib/gsap';
import { SERVICES } from '@/content/services';
import { CAP_SLOT_IDS } from '@/content/media';
import { getSlot } from '@/lib/media';
import { PlateSlot, shouldRenderPlateSlot } from '@/components/ui/PlateSlot';

function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(pointer: coarse)').matches;
}

export function Capabilities() {
  const sectionRef = useRef<HTMLElement>(null);
  const plateRef = useRef<HTMLDivElement>(null);

  // Holds the CAP slot ID of the hovered row, not a path. IMAGE-STRATEGY.md §4.1:
  // capability plates are lab and process objects, one per service, CAP-01…09.
  const [activeSlotId, setActiveSlotId] = useState<string | null>(null);
  const [isMobile] = useState(isTouchDevice);

  // Target and current lerped positions for the cursor-follow plate
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);

  // Cursor follow lerp loop
  useEffect(() => {
    if (isMobile) return;

    function tick() {
      currentPos.current.x = lerp(currentPos.current.x, targetPos.current.x, 0.12);
      currentPos.current.y = lerp(currentPos.current.y, targetPos.current.y, 0.12);

      if (plateRef.current) {
        plateRef.current.style.transform = `translate3d(${currentPos.current.x - 90}px, ${currentPos.current.y - 120}px, 0)`;
      }

      rafId.current = requestAnimationFrame(tick);
    }

    rafId.current = requestAnimationFrame(tick);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isMobile]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (isMobile || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    targetPos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const activeSlot = activeSlotId ? getSlot(activeSlotId) : undefined;
  const activePlaceholderId =
    activeSlotId && shouldRenderPlateSlot(activeSlotId) ? activeSlotId : null;

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      onMouseMove={handleMouseMove}
      className="relative w-full bg-carbon py-[120px] overflow-hidden"
    >
      {/* Section Header */}
      <div className="px-gutter mb-12 max-w-[1560px] mx-auto">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone-dim">
          03 — CAPABILITIES
        </p>
      </div>

      {/* Nine Hairline-Separated Capability Rows */}
      <div className="border-t border-rule w-full">
        {SERVICES.map((service, index) => {
          const capSlotId = CAP_SLOT_IDS[index] ?? null;
          const slug = service.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

          return (
            <Link
              key={service.n}
              href={`/services#${slug}`}
              onMouseEnter={() => setActiveSlotId(capSlotId)}
              onMouseLeave={() => setActiveSlotId(null)}
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
                    className="font-display text-bone transition-transform duration-400 ease-out group-hover:translate-x-[14px]"
                    style={{
                      fontSize: 'clamp(1.5rem, 3vw, 2.6rem)',
                      lineHeight: 1.05,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {service.name}
                  </h3>
                </div>

                {/* Short Description Line (Revealed on hover) */}
                <div className="md:col-span-5 text-left md:text-right">
                  <p className="font-body text-[14px] text-bone-dim opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                    {service.line}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Cursor-Follow Floating Plate Preview (Desktop Only) */}
      {!isMobile && (
        <div
          ref={plateRef}
          className={`absolute top-0 left-0 w-[180px] h-[240px] pointer-events-none z-30 transition-opacity duration-300 ease-out rounded-[2px] overflow-hidden border border-rule shadow-2xl ${
            activeSlot?.src || activePlaceholderId ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          style={{ willChange: 'transform, opacity' }}
        >
          {activeSlot?.src && (
            <Image
              src={activeSlot.src}
              alt={activeSlot.alt}
              fill
              sizes="180px"
              className="object-cover object-center"
            />
          )}
          {/* Development only — renders nothing in production. */}
          {activePlaceholderId && <PlateSlot id={activePlaceholderId} />}
        </div>
      )}
    </section>
  );
}
