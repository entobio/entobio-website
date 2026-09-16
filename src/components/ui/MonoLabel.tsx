/**
 * src/components/ui/MonoLabel.tsx
 * Mono label — DESIGN.md §3
 *
 * Always uppercase, letter-spacing: 0.18em, font-size: 11px, --bone-dim.
 * This is the one-size-one-treatment-everywhere rule.
 */

import type { ReactNode } from 'react';

interface MonoLabelProps {
  children: ReactNode;
  className?: string;
  as?: 'span' | 'div' | 'p';
}

export function MonoLabel({ children, className, as: Tag = 'span' }: MonoLabelProps) {
  return (
    <Tag
      className={`font-mono text-[11px] uppercase tracking-[0.18em] text-bone-dim ${className ?? ''}`}
    >
      {children}
    </Tag>
  );
}
