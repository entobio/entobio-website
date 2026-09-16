/**
 * src/components/ui/Button.tsx
 * Three variants per DESIGN.md §6:
 * - Primary:  bg amber, text void, pill radius, Inter Tight 500
 * - Ghost:    1px solid rule, text bone, 2px radius, Geist Mono 11px
 * - Inverted: bg void, text bone, pill radius (Outreach only)
 */

import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';
import Link from 'next/link';

type Variant = 'primary' | 'ghost' | 'inverted';

type ButtonBaseProps = {
  variant?: Variant;
  children: ReactNode;
  className?: string;
};

type AsButton = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    href?: never;
  };

type AsAnchor = ButtonBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    href: string;
  };

type ButtonProps = AsButton | AsAnchor;

const base =
  'inline-flex items-center justify-center transition-all cursor-pointer';

const variants: Record<Variant, string> = {
  primary: [
    base,
    'bg-amber text-void rounded-[999px] px-[30px] py-[14px]',
    'font-body font-medium text-[15px]',
    'hover:brightness-[1.08] hover:scale-[1.02]',
    'duration-200',
  ].join(' '),

  ghost: [
    base,
    'border border-rule text-bone rounded-[2px] px-[20px] py-[9px]',
    'font-mono text-[11px] uppercase tracking-[0.18em]',
    'hover:bg-amber hover:text-void hover:border-amber',
    'duration-200',
  ].join(' '),

  inverted: [
    base,
    'bg-void text-bone rounded-[999px] px-[30px] py-[14px]',
    'font-body font-medium text-[15px]',
    'hover:brightness-[1.08] hover:scale-[1.02]',
    'duration-200',
  ].join(' '),
};

export function Button(props: ButtonProps) {
  const { variant = 'primary', children, className, ...rest } = props;
  const classes = `${variants[variant]} ${className ?? ''}`;

  if ('href' in rest && rest.href) {
    const { href, ...anchorRest } = rest as AsAnchor;
    const isInternal = href.startsWith('/') || href.startsWith('#');

    if (isInternal) {
      return (
        <Link href={href} className={classes} {...anchorRest}>
          {children}
        </Link>
      );
    }

    return (
      <a href={href} className={classes} {...anchorRest}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...(rest as Omit<AsButton, 'variant' | 'children' | 'className'>)}>
      {children}
    </button>
  );
}
