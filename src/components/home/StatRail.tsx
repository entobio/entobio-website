/**
 * src/components/home/StatRail.tsx
 * Four stats, absolute bottom of hero — HOMEPAGE-BUILD-SPEC §3.6
 *
 * Numbers count up on mount. 2×2 on mobile with hairlines between.
 * 'use client' — needs GSAP count-up animation
 */

'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { COPY } from '@/content/copy';

export function StatRail() {
  const railRef = useRef<HTMLDivElement>(null);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (!railRef.current) return;

    // Count up on mount — HOMEPAGE-BUILD-SPEC §3.6
    // "Numbers count up on preloader exit, duration: 1.4, stagger: 0.08, snap: 1"
    const targets = numberRefs.current.filter(Boolean);

    const ctx = gsap.context(() => {
      targets.forEach((el, i) => {
        if (!el) return;
        const target = COPY.stats[i].value;
        const obj = { val: 0 };

        gsap.to(obj, {
          val: target,
          duration: 1.4,
          delay: i * 0.08,
          ease: 'power2.out',
          snap: { val: 1 },
          onUpdate: () => {
            el.textContent = String(Math.round(obj.val));
          },
        });
      });
    }, railRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={railRef}
      className="stat-rail absolute bottom-0 left-0 right-0 z-10 px-6 md:px-10 pb-6 md:pb-9"
    >
      {/* Hairline above */}
      <div className="w-full h-px bg-rule mb-6" />

      {/* 3-col on desktop/tablet, stacked with hairlines on mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-5 sm:gap-y-0">
        {COPY.stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`
              stat-cell relative
              ${/* Vertical hairline between columns on tablet/desktop */ ''}
              ${i > 0 ? 'sm:border-l sm:border-rule sm:pl-8 lg:pl-10' : ''}
              ${/* Horizontal hairline between items on small mobile screens */ ''}
              ${i > 0 ? 'border-t border-rule/60 pt-4 sm:border-t-0 sm:pt-0' : ''}
            `}
          >
            <div className="flex items-baseline gap-2">
              <span
                ref={(el) => { numberRefs.current[i] = el; }}
                className="font-display block text-bone"
                style={{
                  fontSize: 'clamp(2rem, 3.2vw, 3rem)',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                }}
              >
                0
              </span>
              <span className="font-mono text-amber text-[14px] font-semibold" aria-hidden="true">+</span>
            </div>
            <span
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone-dim mt-2 block font-medium"
            >
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
