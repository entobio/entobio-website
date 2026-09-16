/**
 * src/components/imaging/FocusStackComparison.tsx
 * DEMONSTRATION SLIDER — IMAGING-PAGE-SPEC.md §3.2
 *
 * An interactive drag slider: one shallow-focus frame on one side,
 * the final merged plate on the other.
 *
 * GATED: Requires real client assets IMAGING-STACK-A and IMAGING-STACK-B.
 * If either asset is null/unfilled, the section returns null and hides entirely.
 * It will immediately mount the moment Dr. Yeshwanth's files are added.
 */

'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { getSlot, hasAssets } from '@/lib/media';

export function FocusStackComparison() {
  // Gated behind real asset check per IMAGING-PAGE-SPEC.md §3.2
  const isAvailable = hasAssets(['IMAGING-STACK-A', 'IMAGING-STACK-B']);
  const slotA = getSlot('IMAGING-STACK-A');
  const slotB = getSlot('IMAGING-STACK-B');

  const [sliderPos, setSliderPos] = useState(50); // percentage 0 to 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clampedPercentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(clampedPercentage);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    handleMove(e.clientX);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      setSliderPos((p) => Math.max(0, p - 5));
    } else if (e.key === 'ArrowRight') {
      setSliderPos((p) => Math.min(100, p + 5));
    }
  };

  // If assets are not yet present, hide the section entirely per IMAGING-PAGE-SPEC.md §3.2
  if (!isAvailable || !slotA?.src || !slotB?.src) {
    return null;
  }

  return (
    <section className="relative w-full bg-carbon py-24 border-t border-rule overflow-hidden">
      <div className="max-w-[1560px] mx-auto px-gutter">
        {/* Section Header */}
        <div className="max-w-[760px] mb-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber mb-3">
            THE OPTICAL PRINCIPLE
          </p>
          <h2
            className="font-display text-bone mb-6"
            style={{
              fontSize: 'clamp(2rem, 4.5vw, 3.8rem)',
              lineHeight: 1.0,
              letterSpacing: '-0.02em',
            }}
          >
            One photograph cannot hold a whole insect in focus.
          </h2>
          <p className="font-body text-bone-dim text-[16px] leading-relaxed">
            At high magnification, depth of field collapses to fractions of a
            millimetre. A single frame renders one thin plane sharp and the rest
            dissolved. A focus-stacked plate is assembled from dozens of frames,
            each stepped forward by microns, merged into one image sharp from
            end to end.
          </p>
        </div>

        {/* Interactive Comparison Stage */}
        <div className="relative w-full max-w-[1280px] mx-auto">
          <div
            ref={containerRef}
            tabIndex={0}
            role="slider"
            aria-label="Focus stack comparison slider"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(sliderPos)}
            onKeyDown={handleKeyDown}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            className="relative w-full aspect-[16/10] md:aspect-[16/9] bg-void select-none cursor-ew-resize overflow-hidden border border-rule rounded-[2px] touch-none focus:outline-none focus:ring-1 focus:ring-amber"
          >
            {/* Base Image: Merged Stack (Full Width) */}
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={slotB.src}
                alt="Merged focus-stacked specimen plate"
                fill
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover object-center"
              />
              <div className="absolute bottom-4 right-4 bg-void/80 backdrop-blur-sm border border-rule px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-amber">
                MERGED FOCUS STACK
              </div>
            </div>

            {/* Revealing Overlay Image: Single Shallow Frame */}
            <div
              className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
              style={{ clipPath: `inset(0 calc(100% - ${sliderPos}%) 0 0)` }}
            >
              <Image
                src={slotA.src}
                alt="Single shallow depth of field exposure"
                fill
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover object-center"
              />
              <div className="absolute bottom-4 left-4 bg-void/80 backdrop-blur-sm border border-rule px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-bone-dim">
                SINGLE EXPOSURE (SHALLOW DOF)
              </div>
            </div>

            {/* Vertical Divider Bar */}
            <div
              className="absolute top-0 bottom-0 w-[2px] bg-bone shadow-[0_0_12px_rgba(0,0,0,0.8)] z-20 pointer-events-none"
              style={{ left: `${sliderPos}%` }}
            >
              {/* Central Drag Handle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-void border-2 border-amber flex items-center justify-center shadow-lg">
                <span className="font-mono text-[10px] text-amber select-none">↔</span>
              </div>
            </div>
          </div>

          {/* Instruction Caption */}
          <div className="flex items-center justify-between mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-bone-dim">
            <span>← SINGLE SLICE</span>
            <span className="text-amber">DRAG TO COMPARE</span>
            <span>MERGED PLATE →</span>
          </div>
        </div>
      </div>
    </section>
  );
}
