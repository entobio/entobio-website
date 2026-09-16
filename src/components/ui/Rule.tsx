/**
 * src/components/ui/Rule.tsx
 * Hairline separator — DESIGN.md §6
 *
 * 1px solid var(--rule). Used liberally — they're the structural
 * grammar of the whole page. Never use a box-shadow to separate content.
 */

interface RuleProps {
  className?: string;
  strong?: boolean;
}

export function Rule({ className, strong = false }: RuleProps) {
  return (
    <hr
      className={`border-0 h-px w-full ${
        strong ? 'bg-rule-strong' : 'bg-rule'
      } ${className ?? ''}`}
    />
  );
}
