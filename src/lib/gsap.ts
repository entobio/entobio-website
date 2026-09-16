/**
 * src/lib/gsap.ts
 * Registers GSAP plugins once and exports the EASE constants.
 * All GSAP imports in the project should go through this file.
 * — ARCHITECTURE.md §2, DESIGN.md §5
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugins once — safe to call multiple times but we gate it
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Easing tokens — DESIGN.md §5
 * GSAP owns scroll-driven motion. These are the only easings used.
 */
export const EASE = {
  /** Entrances */
  out: 'expo.out',
  /** Hovers, small moves */
  soft: 'power3.out',
  /** Focus racks, scale changes */
  rack: 'power3.inOut',
  /** CSS transitions — cubic-bezier array for GSAP CustomEase or CSS */
  cubic: [0.22, 1, 0.36, 1] as const,
} as const;

/**
 * Universal lerp for all pointer-following.
 * HOMEPAGE-BUILD-SPEC §1.3
 */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/**
 * Pointer smoothing factor — deliberately heavy, feels like glass.
 * HOMEPAGE-BUILD-SPEC §1.3
 */
export const FOLLOW = 0.09;

export { gsap, ScrollTrigger };
