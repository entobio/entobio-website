/**
 * src/components/layout/SmoothScroll.tsx
 * Lenis smooth-scroll provider.
 * Configured per HOMEPAGE-BUILD-SPEC §1.3.
 * — ARCHITECTURE.md §1 (layout/SmoothScroll.tsx)
 */

'use client';

import { ReactLenis } from 'lenis/react';
import type { ReactNode } from 'react';

/**
 * Lenis easing — exponential out, matches the spec:
 * `t => Math.min(1, 1.001 - 2**(-10*t))`
 */
function lenisEasing(t: number): number {
  return Math.min(1, 1.001 - Math.pow(2, -10 * t));
}

interface SmoothScrollProps {
  children: ReactNode;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.15,
        easing: lenisEasing,
        smoothWheel: true,
        touchMultiplier: 1.6,
      }}
    >
      {children}
    </ReactLenis>
  );
}
