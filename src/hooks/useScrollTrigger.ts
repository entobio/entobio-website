/**
 * src/hooks/useScrollTrigger.ts
 * Font-ready-gated GSAP context wrapper.
 * ALL ScrollTrigger creation goes through this hook.
 * No direct ScrollTrigger.create() anywhere in components.
 * — ARCHITECTURE.md §2.3, CLAUDE.md §6.1
 */

'use client';

import { useEffect, useLayoutEffect, type RefObject } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

/**
 * useIsomorphicLayoutEffect — SSR-safe useLayoutEffect.
 * Uses useLayoutEffect on client, useEffect on server.
 */
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * Creates a GSAP context gated behind document.fonts.ready.
 * This prevents the ScrollTrigger/font-swap desync described in CLAUDE.md §6.1:
 * fonts loading after ScrollTrigger initialises shifts layout and destroys
 * pinned section calculations.
 *
 * @param setup — callback receiving the gsap.Context, called after fonts are ready
 * @param scope — React ref for the GSAP context scope (for selector scoping + cleanup)
 */
export function useGsapContext(
  setup: (ctx: gsap.Context) => void,
  scope: RefObject<HTMLElement | null>
) {
  useIsomorphicLayoutEffect(() => {
    let ctx: gsap.Context | undefined;
    let cancelled = false;

    document.fonts.ready.then(() => {
      if (cancelled) return;
      ctx = gsap.context(setup, scope);
      ScrollTrigger.refresh();
    });

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);
}
