/**
 * Homepage — composes the eight acts.
 * ARCHITECTURE.md §1: src/app/page.tsx
 *
 * All pages are static (force-static). — ARCHITECTURE.md §3
 */

import { Hero } from '@/components/home/Hero';
import { Preloader } from '@/components/home/Preloader';
import { Descent } from '@/components/home/Descent';
import { SpeciesMarquee } from '@/components/home/SpeciesMarquee';
import { Manifesto } from '@/components/home/Manifesto';
import { Capabilities } from '@/components/home/Capabilities';
import { OutreachBreak } from '@/components/home/OutreachBreak';
import { TheRecord } from '@/components/home/TheRecord';
import { ContactSection } from '@/components/home/ContactSection';
import { Footer } from '@/components/layout/Footer';

export const dynamic = 'force-static';

export default function HomePage() {
  return (
    <main className="relative bg-void w-full overflow-hidden">
      {/* Preloader — Racking Focus */}
      <Preloader />

      {/* ACT 1: Hero + Lens */}
      <Hero />

      {/* ACT 2: Descent */}
      <Descent />

      {/* ACT 3: Species Marquee ("One hundred and fifty species") */}
      <SpeciesMarquee />

      {/* ACT 4: Manifesto */}
      <Manifesto />

      {/* ACT 5: Capabilities */}
      <Capabilities />

      {/* ACT 6: Outreach Light Break */}
      <OutreachBreak />

      {/* ACT 7: The Record */}
      <TheRecord />

      {/* ACT 8: Contact */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
