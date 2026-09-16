/**
 * src/app/opengraph-image.tsx
 * Dynamic 1200x630 OG image generation using next/og — ARCHITECTURE.md §5
 * All metadata reads from SITE constants in site.ts
 */

import { ImageResponse } from 'next/og';
import { SITE } from '@/lib/site';

export const alt = `${SITE.name} — ${SITE.tagline}`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          backgroundColor: '#08090A',
          padding: '80px 80px',
          color: '#F2EDE3',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Top Header Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '16px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#D89A3E',
            fontFamily: 'monospace',
          }}
        >
          <div
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: '#D89A3E',
              display: 'flex',
            }}
          />
          <span>{SITE.name} · BENGALURU, INDIA</span>
        </div>

        {/* Main Display Headline */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: '56px',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              color: '#F2EDE3',
              maxWidth: '960px',
              fontStyle: 'italic',
            }}
          >
            {SITE.tagline}
          </div>
        </div>

        {/* Footer Subline */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            borderTop: '1px solid rgba(242, 237, 227, 0.16)',
            paddingTop: '24px',
            fontSize: '15px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'rgba(242, 237, 227, 0.62)',
            fontFamily: 'monospace',
          }}
        >
          <span>{SITE.founder}, Ph.D., FRES</span>
          <span>150 SPECIES DESCRIBED · 36 PAPERS</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
