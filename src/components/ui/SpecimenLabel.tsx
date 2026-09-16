/**
 * src/components/ui/SpecimenLabel.tsx
 * Recurring device — DESIGN.md §6
 *
 * Mono, --bone-dim, left-aligned, line-height: 1.7, sitting on a hairline.
 * Only renders with verified data. Never invent coordinates.
 */

interface SpecimenLabelProps {
  locality: string;
  coordinates?: string;
  date?: string;
  collector: string;
  className?: string;
}

export function SpecimenLabel({
  locality,
  coordinates,
  date,
  collector,
  className,
}: SpecimenLabelProps) {
  return (
    <div
      className={`font-mono text-[11px] uppercase tracking-[0.18em] leading-[1.7] text-bone-dim border-t border-rule pt-3 ${className ?? ''}`}
    >
      <div>{locality}</div>
      {(coordinates || date) && (
        <div>
          {coordinates}
          {coordinates && date && ' · '}
          {date}
        </div>
      )}
      <div>COLL. {collector}</div>
    </div>
  );
}
