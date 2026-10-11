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
  { n: '02', label: 'Services', href: '/services' },
  { n: '03', label: 'Imaging', href: '/imaging' },
  { n: '04', label: 'Publications', href: '/publications' },
  { n: '05', label: 'Outreach', href: '/outreach' },
  { n: '06', label: 'Merchandise', href: '/merchandise' },
  { n: '07', label: 'Clients & Feedback', href: '/clients' },
  { n: '08', label: 'News & Talks', href: '/news' },
  { n: '09', label: 'About', href: '/about' },
  { n: '10', label: 'Contact & Enquiries', href: '/contact' },
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
      if (window.innerWidth >= 1024) {
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
            ? 'bg-[rgba(8,9,10,0.85)] backdrop-blur-md border-b border-rule py-3.5 px-4 sm:px-6 md:px-8'
            : 'bg-gradient-to-b from-void/90 via-void/40 to-transparent py-5 px-4 sm:px-6 md:px-8'
        }`}
      >
        <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-4">
          {/* Left Zone: Logo Mark */}
          <Link
            href="/"
            onClick={() => setIsMobileOpen(false)}
            className="font-mono text-[12px] uppercase tracking-[0.2em] text-[#F7F5F0] font-semibold hover:text-amber transition-colors duration-200 shrink-0"
          >
            ENTOBIO CONSULT
          </Link>

          {/* Centre Zone: Desktop Navigation Links (Increased font size & high contrast per PDF page 1) */}
          <nav className="hidden xl:flex items-center gap-4 2xl:gap-6 font-body text-[15px] text-[#E8E4DC] font-medium">
            <Link
              href="/#marquee"
              className="hover:text-white hover:text-amber transition-colors duration-200 py-1 px-1.5"
            >
              Catalogue
            </Link>
            <span className="opacity-30 text-[11px] text-bone-dim" aria-hidden="true">·</span>
            <Link
              href="/services"
              className="hover:text-white hover:text-amber transition-colors duration-200 py-1 px-1.5"
            >
              Services
            </Link>
            <span className="opacity-30 text-[11px] text-bone-dim" aria-hidden="true">·</span>
            <Link
              href="/imaging"
              className="hover:text-white hover:text-amber transition-colors duration-200 py-1 px-1.5"
            >
              Imaging
            </Link>
            <span className="opacity-30 text-[11px] text-bone-dim" aria-hidden="true">·</span>
            <Link
              href="/publications"
              className="hover:text-white hover:text-amber transition-colors duration-200 py-1 px-1.5"
            >
              Publications
            </Link>
            <span className="opacity-30 text-[11px] text-bone-dim" aria-hidden="true">·</span>
            <Link
              href="/outreach"
              className="hover:text-white hover:text-amber transition-colors duration-200 py-1 px-1.5"
            >
              Outreach
            </Link>
            <span className="opacity-30 text-[11px] text-bone-dim" aria-hidden="true">·</span>
            <Link
              href="/merchandise"
              className="hover:text-white hover:text-amber transition-colors duration-200 py-1 px-1.5"
            >
              Merchandise
            </Link>
            <span className="opacity-30 text-[11px] text-bone-dim" aria-hidden="true">·</span>
            <Link
              href="/clients"
              className="hover:text-white hover:text-amber transition-colors duration-200 py-1 px-1.5"
            >
              Clients &amp; Feedback
            </Link>
            <span className="opacity-30 text-[11px] text-bone-dim" aria-hidden="true">·</span>
            <Link
              href="/news"
              className="hover:text-white hover:text-amber transition-colors duration-200 py-1 px-1.5"
            >
              News &amp; Talks
            </Link>
            <span className="opacity-30 text-[11px] text-bone-dim" aria-hidden="true">·</span>
            <Link
              href="/about"
              className="hover:text-white hover:text-amber transition-colors duration-200 py-1 px-1.5"
            >
              About
            </Link>
          </nav>

          {/* Fallback compact navigation for medium/large desktop (lg-xl) */}
          <nav className="hidden lg:flex xl:hidden items-center gap-3 font-body text-[14px] text-[#E8E4DC]">
            <Link href="/services" className="hover:text-amber transition-colors">Services</Link>
            <span className="opacity-30 text-[10px]">·</span>
            <Link href="/imaging" className="hover:text-amber transition-colors">Imaging</Link>
            <span className="opacity-30 text-[10px]">·</span>
            <Link href="/publications" className="hover:text-amber transition-colors">Publications</Link>
            <span className="opacity-30 text-[10px]">·</span>
            <Link href="/outreach" className="hover:text-amber transition-colors">Outreach</Link>
            <span className="opacity-30 text-[10px]">·</span>
            <Link href="/merchandise" className="hover:text-amber transition-colors">Shop</Link>
            <span className="opacity-30 text-[10px]">·</span>
            <Link href="/clients" className="hover:text-amber transition-colors">Clients</Link>
            <span className="opacity-30 text-[10px]">·</span>
            <Link href="/news" className="hover:text-amber transition-colors">News</Link>
            <span className="opacity-30 text-[10px]">·</span>
            <Link href="/about" className="hover:text-amber transition-colors">About</Link>
          </nav>

          {/* Right Zone: Vibrant Amber CTA Button & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-amber text-void border border-amber rounded-[2px] px-[20px] py-[8px] font-mono text-[11px] font-semibold uppercase tracking-[0.18em] shadow-[0_2px_12px_rgba(216,154,62,0.25)] hover:bg-[#E5A84B] hover:shadow-[0_4px_20px_rgba(216,154,62,0.45)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
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
              className="lg:hidden flex items-center gap-2.5 py-1.5 px-2.5 -mr-2 text-bone hover:text-amber border border-rule/50 hover:border-amber/60 rounded-[2px] transition-colors focus:outline-none focus:ring-1 focus:ring-amber"
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
          className="fixed inset-0 z-50 bg-void/98 backdrop-blur-2xl flex flex-col justify-between px-6 py-6 sm:px-8 sm:py-8 lg:hidden overflow-y-auto"
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
          <nav className="flex flex-col space-y-3.5 my-auto py-6">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.n}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className="group flex items-baseline gap-3.5 py-0.5"
              >
                <span className="font-mono text-[10px] tracking-[0.18em] text-amber">
                  {item.n}
                </span>
                <span className="font-display text-[22px] sm:text-[26px] leading-tight text-[#F7F5F0] group-hover:text-amber group-hover:translate-x-2 transition-all duration-200">
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
