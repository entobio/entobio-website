/**
 * src/components/ui/PublicationTitle.tsx
 * Formats publication titles with genus/binomial names routed through <Binomial>.
 * FACTS.md §4: "Genus names appearing in a title must be italicised."
 * FACTS.md §10: "Everything through <Binomial>."
 */

import React from 'react';
import { Binomial } from './Binomial';

interface PublicationTitleProps {
  title: string;
  isBook?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Regex matching any of the 17 taxa names in publication titles.
 * Notice Soractellus nigrominutus is ordered before single genus names.
 */
const TAXA_REGEX =
  /\b(Soractellus nigrominutus|Hypseloecus|Ectmetopterus|Sulawesifulvius|Platypleura|Klabonosa|Brodskyella|Eucalyptus|Macropsis|Heissothignus|Drabescus|Paraidioscopus|Libengaia|Ctenoplectra|Leucopholis|Monobazus|Brachygaster)\b/;

const TAXA_MAP: Record<string, { genus: string; species?: string }> = {
  'Soractellus nigrominutus': { genus: 'Soractellus', species: 'nigrominutus' },
  Hypseloecus: { genus: 'Hypseloecus' },
  Ectmetopterus: { genus: 'Ectmetopterus' },
  Sulawesifulvius: { genus: 'Sulawesifulvius' },
  Platypleura: { genus: 'Platypleura' },
  Klabonosa: { genus: 'Klabonosa' },
  Brodskyella: { genus: 'Brodskyella' },
  Eucalyptus: { genus: 'Eucalyptus' },
  Macropsis: { genus: 'Macropsis' },
  Heissothignus: { genus: 'Heissothignus' },
  Drabescus: { genus: 'Drabescus' },
  Paraidioscopus: { genus: 'Paraidioscopus' },
  Libengaia: { genus: 'Libengaia' },
  Ctenoplectra: { genus: 'Ctenoplectra' },
  Leucopholis: { genus: 'Leucopholis' },
  Monobazus: { genus: 'Monobazus' },
  Brachygaster: { genus: 'Brachygaster' },
};

export function PublicationTitle({ title, isBook, className, style }: PublicationTitleProps) {
  if (isBook) {
    return (
      <span className={className} style={style}>
        <i className="font-display italic">{title}</i>
      </span>
    );
  }

  const tokens = title.split(TAXA_REGEX);

  return (
    <span className={className} style={style}>
      {tokens.map((token, i) => {
        const taxon = TAXA_MAP[token];
        if (taxon) {
          return (
            <Binomial
              key={i}
              genus={taxon.genus}
              species={taxon.species}
            />
          );
        }
        return <React.Fragment key={i}>{token}</React.Fragment>;
      })}
    </span>
  );
}
