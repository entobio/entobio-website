/**
 * src/components/layout/Nav.tsx
 * Header navigation — HOMEPAGE-BUILD-SPEC §3.7
 *
 * Fixed, z-40, top: 0, padding: 24px 32px, three zones, transparent — no glass pill.
 * After 120px of scroll: bg rgba(8,9,10,0.72), backdrop-blur-md, border-b border-rule (300ms).
 * Hidden on scroll-down past 400px, revealed on scroll-up.
 */

'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

export function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // After 120px scroll, activate background blur + border
      setIsScrolled(currentScrollY > 120);

      // Hide on scroll down past 400px, reveal on scroll up
      if (currentScrollY > 400 && currentScrollY > lastScrollY.current) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isHidden ? '-translate-y-full' : 'translate-y-0'
      } ${
        isScrolled
          ? 'bg-[rgba(8,9,10,0.72)] backdrop-blur-md border-b border-rule py-4 px-6 md:px-8'
          : 'bg-transparent py-6 px-6 md:px-8'
      }`}
    >
      <div className="max-w-[1560px] mx-auto flex items-center justify-between">
        {/* Left Zone: Logo Mark */}
        <Link
          href="/"
          className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone font-semibold hover:text-amber transition-colors duration-200"
        >
          ENTOBIO CONSULT
        </Link>

        {/* Centre Zone: Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 font-body text-[14px] text-bone-dim">
          <Link
            href="/#marquee"
            className="hover:text-bone transition-colors duration-200"
          >
            Catalogue
          </Link>
          <span className="opacity-20 text-[10px]">·</span>
          <Link
            href="/services"
            className="hover:text-bone transition-colors duration-200"
          >
            Imaging
          </Link>
          <span className="opacity-20 text-[10px]">·</span>
          <Link
            href="/outreach"
            className="hover:text-bone transition-colors duration-200"
          >
            Outreach
          </Link>
          <span className="opacity-20 text-[10px]">·</span>
          <Link
            href="/about"
            className="hover:text-bone transition-colors duration-200"
          >
            About
          </Link>
        </nav>

        {/* Right Zone: Enquire CTA Button */}
        <div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center border border-rule text-bone rounded-[2px] px-[20px] py-[9px] font-mono text-[11px] uppercase tracking-[0.18em] hover:bg-amber hover:text-void hover:border-amber transition-all duration-200"
          >
            Enquire
          </Link>
        </div>
      </div>
    </header>
  );
}
