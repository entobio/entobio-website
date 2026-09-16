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

      {/* 4-col on desktop, 2×2 on mobile */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6">
        {COPY.stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`
              stat-cell relative
              ${/* Vertical hairline between cols on desktop */ ''}
              ${i > 0 ? 'md:border-l md:border-rule md:pl-6' : ''}
              ${/* Horizontal hairlines on mobile 2×2 grid */ ''}
              ${i >= 2 ? 'border-t border-rule pt-6 md:border-t-0 md:pt-0' : ''}
              ${i % 2 !== 0 ? 'pl-6 border-l border-rule md:border-l md:pl-6' : ''}
            `}
          >
            <span
              ref={(el) => { numberRefs.current[i] = el; }}
              className="font-display block"
              style={{
                fontSize: 'clamp(1.6rem, 2.6vw, 2.6rem)',
                lineHeight: 1,
                letterSpacing: '-0.02em',
              }}
            >
              0
            </span>
            <span
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone-dim mt-1.5 block"
            >
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
