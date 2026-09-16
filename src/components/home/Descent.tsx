/**
 * src/components/home/Descent.tsx
 * ACT 2 — "THE DESCENT" — HOMEPAGE-BUILD-SPEC §4
 *
 * Pinned scroll section, 420vh height, scrub: 1.1.
 * Four stacked image layers scaling 1.0 → 2.35 and cross-fading within 25% windows.
 * transform-origin: 50% 48%, will-change cleared on complete.
 * Scale readout center-left, swapping at each threshold with 200ms blur-out/in.
 * Final display serif line: "This is where he works." + binomial caption.
 * Layers 3 & 4 lazy, prefetched at 30% progress.
 * Reduced motion: static mid-composition.
 * Mobile: two layers only.
 */

'use client';

import { useRef, useState, useSyncExternalStore } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';
import { useGsapContext } from '@/hooks/useScrollTrigger';
import { COPY } from '@/content/copy';
import { DESCENT_SLOT_IDS } from '@/content/media';
import { getSlot } from '@/lib/media';

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function subscribeWindow(callback: () => void) {
  window.addEventListener('resize', callback, { passive: true });
  return () => window.removeEventListener('resize', callback);
}

function getMobileSnapshot() {
  return window.innerWidth < 640;
}

function getMobileServerSnapshot() {
  return false;
}

/**
 * The four magnification steps. Paths are resolved from the DESCENT-01…04
 * slots in src/content/media.ts — the scale readouts live here because they
 * are copy, not media.
 */
const DESCENT_SCALES = ['1 METRE', '1 CENTIMETRE', '1 MILLIMETRE', '200 MICROMETRES'];

const DESCENT_IMAGES = DESCENT_SLOT_IDS.map((id, i) => {
  const slot = getSlot(id);
  return {
    id,
    src: slot?.src ?? null,
    scale: DESCENT_SCALES[i],
    label: slot?.alt ?? '',
  };
});

export function Descent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const readoutRef = useRef<HTMLDivElement>(null);
  const finalContentRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [prefetchLateLayers, setPrefetchLateLayers] = useState(false);
  const isMobile = useSyncExternalStore(
    subscribeWindow,
    getMobileSnapshot,
    getMobileServerSnapshot
  );

  useGsapContext(() => {
    if (!containerRef.current || !pinRef.current) return;

    const reduced = prefersReducedMotion();

    // Reduced Motion fallback: static mid-composition (Layer 2 - Insect)
    if (reduced) {
      gsap.set(pinRef.current, { position: 'relative', height: '100vh' });
      layerRefs.current.forEach((el, idx) => {
        if (!el) return;
        if (idx === 2) {
          gsap.set(el, { opacity: 1, scale: 1.0 });
        } else {
          gsap.set(el, { opacity: 0 });
        }
      });
      setActiveIndex(2);
      return;
    }

    const activeLayers = isMobile ? [DESCENT_IMAGES[0], DESCENT_IMAGES[2]] : DESCENT_IMAGES;
    const numLayers = activeLayers.length;
    const stepDuration = 1 / numLayers;

    // Master Timeline pinned over 420vh scroll distance
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        pin: pinRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.1,
        onEnter: () => {
          layerRefs.current.forEach((el) => {
            if (el) el.style.willChange = 'transform, opacity';
          });
        },
        onLeave: () => {
          layerRefs.current.forEach((el) => {
            if (el) el.style.willChange = 'auto';
          });
        },
        onEnterBack: () => {
          layerRefs.current.forEach((el) => {
            if (el) el.style.willChange = 'transform, opacity';
          });
        },
        onLeaveBack: () => {
          layerRefs.current.forEach((el) => {
            if (el) el.style.willChange = 'auto';
          });
        },
        onUpdate: (self) => {
          const progress = self.progress;

          // Prefetch late layers (3 & 4) at 30% progress
          if (progress >= 0.3 && !prefetchLateLayers) {
            setPrefetchLateLayers(true);
          }

          // Compute active layer index for readout threshold
          const newIndex = Math.min(
            Math.floor(progress * numLayers),
            numLayers - 1
          );

          if (newIndex !== activeIndex) {
            // Animate scale readout with 200ms blur out/in
            if (readoutRef.current) {
              gsap.to(readoutRef.current, {
                filter: 'blur(8px)',
                opacity: 0,
                duration: 0.1,
                onComplete: () => {
                  setActiveIndex(newIndex);
                  gsap.to(readoutRef.current, {
                    filter: 'blur(0px)',
                    opacity: 1,
                    duration: 0.1,
                  });
                },
              });
            } else {
              setActiveIndex(newIndex);
            }
          }
        },
      },
    });

    // Animate each layer scaling 1.0 → 2.35 and cross-fading
    activeLayers.forEach((_, i) => {
      const el = layerRefs.current[i];
      if (!el) return;

      const startTime = i * stepDuration;
      const fadeOutDuration = 0.06;

      tl.fromTo(
        el,
        { scale: 1.0, opacity: i === 0 ? 1 : 0 },
        {
          scale: 2.35,
          opacity: 1,
          ease: 'none',
          duration: stepDuration,
          onComplete: () => {
            el.style.willChange = 'auto'; // Clear will-change after completion
          },
        },
        startTime
      );

      // Fade out near end of layer window (except last layer)
      if (i < numLayers - 1) {
        tl.to(
          el,
          {
            opacity: 0,
            duration: fadeOutDuration,
            onComplete: () => {
              el.style.willChange = 'auto';
            },
          },
          startTime + stepDuration - fadeOutDuration
        );
      }
    });

    // Final layer text overlay entrance at end of descent
    if (finalContentRef.current) {
      tl.fromTo(
        finalContentRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.15,
          ease: 'power3.out',
        },
        1 - 0.18
      );
    }
  }, containerRef);

  const activeScales = isMobile
    ? [DESCENT_IMAGES[0], DESCENT_IMAGES[2]]
    : DESCENT_IMAGES;

  return (
    <section
      ref={containerRef}
      id="descent"
      className="relative w-full bg-void"
      style={{ height: '420vh' }}
    >
      {/* Pinned Viewport Container */}
      <div
        ref={pinRef}
        className="w-full h-screen overflow-hidden bg-void"
      >
        {/* Four Stacked Layers */}
        {activeScales.map((img, i) => {
          const isLate = i >= 2;
          const shouldLoad = !isLate || prefetchLateLayers;

          return (
            <div
              key={img.scale}
              ref={(el) => {
                layerRefs.current[i] = el;
              }}
              className="absolute inset-0 w-full h-full pointer-events-none opacity-0"
              style={{
                transformOrigin: '50% 48%',
              }}
            >
              {shouldLoad && img.src && (
                <Image
                  src={img.src}
                  alt={img.label}
                  fill
                  priority={i < 2}
                  loading={i < 2 ? 'eager' : 'lazy'}
                  sizes="100vw"
                  className="object-cover object-center w-full h-full"
                />
              )}
            </div>
          );
        })}

        {/* Ambient Dark Vignette Overlay */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, rgba(8,9,10,0.7) 100%)',
          }}
          aria-hidden="true"
        />

        {/* Scale Readout — Centre-Left */}
        <div
          ref={readoutRef}
          className="absolute left-6 md:left-16 top-1/2 -translate-y-1/2 z-20 pointer-events-none"
        >
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone-dim flex items-center gap-3">
            <span className="text-bone font-semibold">{activeScales[activeIndex]?.scale}</span>
            <span className="text-bone-faint">→</span>
            <span className="text-bone-dim">{activeScales[activeIndex]?.label}</span>
          </div>
        </div>

        {/* Final Display Line Overlay — Center */}
        <div
          ref={finalContentRef}
          className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-gutter pointer-events-none opacity-0"
        >
          <h2
            className="font-display text-bone mb-6 drop-shadow-lg"
            style={{
              fontSize: 'var(--t-display)',
              lineHeight: 0.88,
              letterSpacing: '-0.03em',
            }}
          >
            {COPY.descent.finalLine}
          </h2>
        </div>
      </div>
    </section>
  );
}
