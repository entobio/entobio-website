/**
 * src/lib/media.ts
 * Resolution helpers over the image registry — IMAGE-STRATEGY.md §4, §6.
 *
 * Sections gate themselves on assets through `hasAssets`. Nothing outside
 * src/content/media.ts may know a path under /media.
 */

import { MEDIA_BY_ID, type MediaSlot } from '@/content/media';

/**
 * Resolve a slot by ID. Returns undefined for an unknown ID rather than
 * throwing — an unregistered slot must degrade to "no image", never to a
 * broken build or a runtime crash on a live page.
 */
export function getSlot(id: string): MediaSlot | undefined {
  return MEDIA_BY_ID.get(id);
}

/** Resolve several slots in order, dropping unknown IDs. */
export function getSlots(ids: readonly string[]): MediaSlot[] {
  return ids.map(getSlot).filter((s): s is MediaSlot => Boolean(s));
}

/** True when the slot exists and is filled. */
export function hasAsset(id: string): boolean {
  return Boolean(MEDIA_BY_ID.get(id)?.src);
}

/**
 * True when EVERY listed slot is filled. This is the section gate:
 *
 *   if (!hasAssets(['IMAGING-STACK-A', 'IMAGING-STACK-B'])) return null;
 *
 * An empty list is vacuously true — a section with no asset dependency is
 * never hidden by this.
 */
export function hasAssets(ids: string[]): boolean {
  return ids.every(hasAsset);
}

/** Only the filled slots from a list — for grids that shrink rather than gap. */
export function filledSlots(ids: readonly string[]): MediaSlot[] {
  return getSlots(ids).filter((s) => Boolean(s.src));
}

/**
 * The src for a slot, with an optional ordered fallback chain of other slot
 * IDs. Returns null when nothing in the chain is filled, which callers must
 * treat as "render no image".
 */
export function resolveSrc(id: string, ...fallbackIds: string[]): string | null {
  for (const candidate of [id, ...fallbackIds]) {
    const src = MEDIA_BY_ID.get(candidate)?.src;
    if (src) return src;
  }
  return null;
}
