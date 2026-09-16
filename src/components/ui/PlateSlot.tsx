/**
 * src/components/ui/PlateSlot.tsx
 * The placeholder system — IMAGE-STRATEGY.md §6.
 *
 * An empty museum drawer slot: --carbon field, 1px dashed --rule hairline,
 * mono ⌗ SLOT / AWAITING PLATE centred. It must read as intentional — the
 * site stays presentable to the client and to prospects while assets are
 * outstanding.
 *
 * In development it additionally renders the slot ID and required dimensions.
 * In production it renders nothing at all: the rule is that the parent
 * section hides itself rather than shipping a placeholder.
 *
 * Parents gate on `shouldRenderPlateSlot(id)` — see hasAssets() in
 * src/lib/media.ts for the section-level gate.
 */

import { getSlot } from '@/lib/media';

/** Single definition of "are we in dev", so dev-only branches can't drift. */
export const IS_DEV = process.env.NODE_ENV === 'development';

/**
 * The signal to the parent. False in production, and false whenever the slot
 * is already filled — in both cases the parent must render the real image or
 * hide itself, never a placeholder.
 */
export function shouldRenderPlateSlot(id: string): boolean {
  if (!IS_DEV) return false;
  return !getSlot(id)?.src;
}

interface PlateSlotProps {
  /** Slot ID from the src/content/media.ts manifest. */
  id: string;
  /** Optional extra classes for sizing within the parent's layout. */
  className?: string;
}

export function PlateSlot({ id, className }: PlateSlotProps) {
  // Production: render nothing. The parent is responsible for hiding itself.
  if (!shouldRenderPlateSlot(id)) return null;

  const slot = getSlot(id);

  return (
    <div
      aria-hidden="true"
      data-plate-slot={id}
      className={`relative w-full h-full min-h-[120px] bg-carbon border border-dashed border-rule rounded-[2px] flex flex-col items-center justify-center gap-1.5 text-center select-none pointer-events-none ${
        className ?? ''
      }`}
    >
      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone-faint">
        ⌗ SLOT
      </span>
      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone-faint">
        AWAITING PLATE
      </span>

      {/* Development only — the slot ID and the dimensions it must be filled at. */}
      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-bone-faint/70 mt-2">
        {id}
      </span>
      {slot && (
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-bone-faint/70">
          {slot.w}×{slot.h} · {slot.source}
          {slot.required ? ' · REQUIRED' : ''}
        </span>
      )}
      {!slot && (
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-amber">
          UNREGISTERED SLOT
        </span>
      )}
    </div>
  );
}
