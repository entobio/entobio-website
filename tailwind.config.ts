/**
 * tailwind.config.ts
 *
 * Tailwind v4 uses CSS-first configuration via @theme in globals.css.
 * This file exists for tooling compatibility (IDE plugins, etc.) and
 * documents the design token mapping.
 *
 * The authoritative token definitions live in src/app/globals.css.
 * — DESIGN.md §2–5
 */

import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        void: '#08090A',
        carbon: '#0F1113',
        'carbon-lift': '#14171A',
        bone: '#F2EDE3',
        'bone-dim': 'rgba(242, 237, 227, 0.62)',
        'bone-faint': 'rgba(242, 237, 227, 0.30)',
        rule: 'rgba(242, 237, 227, 0.12)',
        'rule-strong': 'rgba(242, 237, 227, 0.22)',
        forest: '#1E5631',
        moss: '#6B8F3E',
        amber: '#D89A3E',
        'amber-dim': 'rgba(216, 154, 62, 0.42)',
        glow: 'rgba(216, 154, 62, 0.14)',
      },
      fontFamily: {
        display: ["'Instrument Serif'", 'Georgia', "'Times New Roman'", 'serif'],
        body: ["'Inter Tight'", 'system-ui', '-apple-system', 'sans-serif'],
        mono: ["'Geist Mono'", 'ui-monospace', "'SFMono-Regular'", 'monospace'],
      },
      fontSize: {
        hero: 'clamp(3.4rem, 10.5vw, 12rem)',
        display: 'clamp(2.4rem, 6vw, 6rem)',
        section: 'clamp(2rem, 5.4vw, 5.4rem)',
        row: 'clamp(1.5rem, 3vw, 2.6rem)',
        lead: 'clamp(1rem, 1.2vw, 1.125rem)',
        body: '0.9375rem',
        small: '0.8125rem',
        mono: '0.6875rem',
      },
      spacing: {
        gutter: 'clamp(20px, 5vw, 64px)',
        section: 'clamp(96px, 14vh, 200px)',
      },
      maxWidth: {
        container: '1560px',
      },
      screens: {
        sm: '640px',
        md: '1024px',
        lg: '1440px',
      },
      transitionTimingFunction: {
        cubic: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
