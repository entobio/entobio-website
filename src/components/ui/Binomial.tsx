/**
 * src/components/ui/Binomial.tsx
 * Accuracy enforced in code — ARCHITECTURE.md §2.2
 *
 * EVERY species name on the site renders through this component.
 * Never hand-write <i>Genus species</i> inline — that's how an
 * un-italicised name eventually ships.
 */

interface BinomialProps {
  genus: string;
  species?: string;
  authority?: string;
  className?: string;
  style?: React.CSSProperties;
  /**
   * Break the epithet onto its own line. Genus and species stay inside a
   * single <i>, so the italic invariant is unchanged — only the line box
   * differs. Used by the accession cards in the species marquee.
   */
  stack?: boolean;
}

export function Binomial({ genus, species, authority, className, style, stack }: BinomialProps) {
  return (
    <span className={className} style={style}>
      <i className="font-display italic">
        {species ? (
          stack ? (
            <>
              <span className="block">{genus}</span>
              <span className="block">{species}</span>
            </>
          ) : (
            <>{genus} {species}</>
          )
        ) : (
          genus
        )}
      </i>
      {authority && (
        <span
          className="font-mono not-italic text-[11px] tracking-[0.18em] uppercase text-bone-dim ml-2"
        >
          {authority}
        </span>
      )}
    </span>
  );
}
