/**
 * src/components/layout/Nav.tsx
 * Header navigation — HOMEPAGE-BUILD-SPEC §3.7, REMEDIATION § 3f
 *
 * Fixed, z-40, top: 0, padding: 24px 32px, three zones, transparent — no glass pill.
 * After 120px of scroll: bg rgba(8,9,10,0.72), backdrop-blur-md, border-b border-rule (300ms).
 * Hidden on scroll-down past 400px, revealed on scroll-up.
 *
 * Below 768px: Full-screen overlay menu drawer, keyboard accessible (Tab trap, Esc to close, scroll lock).
 */

'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { SITE } from '@/lib/site';

const NAV_ITEMS = [
  { n: '01', label: 'Catalogue', href: '/#marquee' },
  { n: '02', label: 'Capabilities & Services', href: '/services' },
  { n: '03', label: 'Scientific Imaging', href: '/imaging' },
  { n: '04', label: 'Publications', href: '/publications' },
  { n: '05', label: 'Outreach & Training', href: '/outreach' },
  { n: '06', label: 'About Founder', href: '/about' },
  { n: '07', label: 'Contact & Enquiries', href: '/contact' },
];

export function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const lastScrollY = useRef(0);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Scroll visibility management
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // After 120px scroll, activate background blur + border
      setIsScrolled(currentScrollY > 120);

      // Hide on scroll down past 400px, reveal on scroll up (never hide when mobile menu is open)
      if (!isMobileOpen && currentScrollY > 400 && currentScrollY > lastScrollY.current) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobileOpen]);

  // Mobile menu keyboard accessibility & scroll lock
  useEffect(() => {
    if (!isMobileOpen) return;

    // Focus close button on open
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileOpen(false);
      }

      // Tab key trap inside the mobile navigation overlay
      if (e.key === 'Tab' && mobileMenuRef.current) {
        const focusables = mobileMenuRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            last.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === last) {
            first.focus();
            e.preventDefault();
          }
        }
      }
    };

    // Lock body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    // Auto-close on viewport resize to desktop
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobileOpen]);

  return (
    <>
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
            onClick={() => setIsMobileOpen(false)}
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone font-semibold hover:text-amber transition-colors duration-200"
          >
            ENTOBIO CONSULT
          </Link>

          {/* Centre Zone: Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-8 font-body text-[14px] text-bone-dim">
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
              Services
            </Link>
            <span className="opacity-20 text-[10px]">·</span>
            <Link
              href="/imaging"
              className="hover:text-bone transition-colors duration-200"
            >
              Imaging
            </Link>
            <span className="opacity-20 text-[10px]">·</span>
            <Link
              href="/publications"
              className="hover:text-bone transition-colors duration-200"
            >
              Publications
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

          {/* Right Zone: Desktop CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center border border-rule text-bone rounded-[2px] px-[20px] py-[9px] font-mono text-[11px] uppercase tracking-[0.18em] hover:bg-amber hover:text-void hover:border-amber transition-all duration-200"
              >
                Enquire
              </Link>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setIsMobileOpen((open) => !open)}
              aria-label={isMobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMobileOpen}
              aria-controls="mobile-navigation-overlay"
              className="md:hidden flex items-center gap-2.5 py-1.5 px-2.5 -mr-2 text-bone hover:text-amber border border-transparent hover:border-rule rounded-[2px] transition-colors focus:outline-none focus:ring-1 focus:ring-amber"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone-dim">
                {isMobileOpen ? 'CLOSE' : 'MENU'}
              </span>
              <div className="w-4 h-3.5 relative flex flex-col justify-between" aria-hidden="true">
                <span
                  className={`w-full h-[1.5px] bg-current transition-transform duration-200 ${
                    isMobileOpen ? 'rotate-45 translate-y-[6px]' : ''
                  }`}
                />
                <span
                  className={`w-full h-[1.5px] bg-current transition-opacity duration-200 ${
                    isMobileOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`w-full h-[1.5px] bg-current transition-transform duration-200 ${
                    isMobileOpen ? '-rotate-45 -translate-y-[6px]' : ''
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Navigation Overlay */}
      {isMobileOpen && (
        <div
          ref={mobileMenuRef}
          id="mobile-navigation-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
          className="fixed inset-0 z-50 bg-void/98 backdrop-blur-2xl flex flex-col justify-between px-6 py-6 sm:px-8 sm:py-8 md:hidden overflow-y-auto"
        >
          {/* Top Bar inside Overlay */}
          <div className="flex items-center justify-between border-b border-rule pb-5">
            <Link
              href="/"
              onClick={() => setIsMobileOpen(false)}
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone font-semibold"
            >
              ENTOBIO CONSULT
            </Link>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setIsMobileOpen(false)}
              aria-label="Close navigation"
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber hover:text-bone transition-colors py-1 px-2 -mr-2"
            >
              CLOSE [✕]
            </button>
          </div>

          {/* Nav Links Stacked */}
          <nav className="flex flex-col space-y-5 my-auto py-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.n}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className="group flex items-baseline gap-4 py-1"
              >
                <span className="font-mono text-[11px] tracking-[0.18em] text-amber">
                  {item.n}
                </span>
                <span className="font-display text-[30px] sm:text-[34px] leading-tight text-bone group-hover:text-amber group-hover:translate-x-2 transition-all duration-200">
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>

          {/* Bottom Colophon and Contact Details */}
          <div className="border-t border-rule pt-5 flex flex-col gap-4 font-mono text-[11px] tracking-[0.18em] text-bone-dim">
            <div className="flex justify-between items-center">
              <span>BENGALURU, INDIA</span>
              <span className="text-amber">EST. 2025</span>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <a
                href={`mailto:${SITE.email}`}
                className="text-[10px] text-bone-dim lowercase tracking-normal hover:text-bone transition-colors"
              >
                {SITE.email}
              </a>
              <Link
                href="/contact"
                onClick={() => setIsMobileOpen(false)}
                className="inline-flex items-center justify-center border border-rule text-bone rounded-[2px] px-[20px] py-[8px] uppercase text-[10px] tracking-[0.18em] hover:bg-amber hover:text-void hover:border-amber transition-all duration-200"
              >
                Enquire Now →
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
