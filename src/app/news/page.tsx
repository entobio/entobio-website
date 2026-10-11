/**
 * /news — News Feed, Flash Updates, Invited Talks & Activities
 * Requested in client review (PDF Page 1: "news feed or flash ex: invited talks or other activity")
 */

import type { Metadata } from 'next';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Footer } from '@/components/layout/Footer';
import { breadcrumbSchema } from '@/lib/schema';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'News, Invited Talks & Activities · EntoBio Consult',
  description:
    'Latest flash updates, invited keynote talks, scientific workshops, field surveys, and public outreach dispatches by Dr. H. M. Yeshwanth and EntoBio Consult.',
};

const FLASH_UPDATES = [
  {
    tag: 'FLASH UPDATE',
    date: 'OCTOBER 2026',
    title: 'New Miridae Taxa Described from Western Ghats Shola Ecosystems',
    summary:
      'Publication accepted in international taxonomic journal detailing two new plant bug species with diagnostic genitalic plates and biological host associations.',
    status: 'Publication',
  },
  {
    tag: 'UPCOMING TALK',
    date: 'NOVEMBER 2026',
    title: 'Keynote: "Taxonomy as Infrastructure for Conservation"',
    summary:
      'Invited plenary talk on the crisis of descriptive insect taxonomy in South Asia and strategies for integrating high-resolution stacking microscopy into biodiversity monitoring.',
    status: 'Invited Talk',
  },
  {
    tag: 'WORKSHOP',
    date: 'DECEMBER 2026',
    title: 'Advanced Hemiptera Morphology & Focus-Stacking Masterclass',
    summary:
      'Hands-on technical workshop for postgraduate scholars and curators on micro-dissections, genitalia clearing, and automated stacking photography.',
    status: 'Training',
  },
];

const INVITED_TALKS = [
  {
    year: '2026',
    title: 'Taxonomic Revisions in Tropical Heteroptera: Methods and Discoveries',
    event: 'National Symposium on Insect Biosystematics & Evolutionary Biology',
    institution: 'Agricultural Sciences Campus, Bengaluru',
    type: 'Keynote Lecture',
  },
  {
    year: '2025',
    title: 'Bridging Taxonomy and Ecological Agriculture: Beneficial Bugs in Pest Suppression',
    event: 'State Conference on Agroecosystem Diversity and Climate Resilience',
    institution: 'Department of Agriculture & Plant Pathology',
    type: 'Guest Seminar',
  },
  {
    year: '2024',
    title: 'Comparative Morphology of Indian Mirinae and Discovery of Endemic Genera',
    event: 'Smithsonian Research Presentation',
    institution: 'National Museum of Natural History, Washington D.C.',
    type: 'Ernst Mayr Fellowship Lecture',
  },
  {
    year: '2024',
    title: 'Insect Diversity of the Andaman and Nicobar Islands: Biogeography and Endemism',
    event: 'Island Ecology and Marine-Terrestrial Interface Seminar',
    institution: 'Port Blair & Bengaluru Consortium',
    type: 'Invited Address',
  },
  {
    year: '2023',
    title: 'Digitisation of Type Specimen Collections in Indian Natural History Museums',
    event: 'Biodiversity Information Standards & Curation Summit',
    institution: 'National Centre for Biological Sciences, TIFR',
    type: 'Plenary Presentation',
  },
];

const FIELD_ACTIVITIES = [
  {
    date: '2025–2026',
    title: 'Island Insect Biodiversity Survey — Andaman Archipelago',
    image: '/media/web/field/img_6704.webp',
    imageAlt: 'Microhabitat observation of living Miridae',
    desc: 'Systematic surveys of leafhoppers and plant bugs across rainforest fragments and mangrove littoral zones, resulting in multiple candidate species for formal description.',
  },
  {
    date: '2025',
    title: 'High-Altitude Agroecosystem & Predator Survey',
    image: '/media/web/field/_mg_4130.webp',
    imageAlt: 'Field observation of predatory true bug suppression',
    desc: 'Documentation of cold-adapted and predatory Heteroptera in agricultural and forest systems, focusing on natural biological control interactions.',
  },
  {
    date: '2025',
    title: 'Government School Biodiversity Discovery Days',
    image: '/media/web/outreach/exhibition-10-yesh9011.webp',
    imageAlt: 'Public insect exhibition hall and school visits',
    desc: 'Interactive live insect display and 3D model workshops conducted across district government high schools to inspire young naturalists.',
  },
];

export default function NewsPage() {
  return (
    <main className="min-h-screen bg-void text-bone pt-28 md:pt-36">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'News & Talks', path: '/news' },
            ])
          ),
        }}
      />

      <div className="max-w-[1560px] mx-auto px-gutter pb-20">
        {/* Header */}
        <div className="mb-16 border-b border-rule pb-12 max-w-[880px]">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber mb-4 font-semibold">
            DISPATCHES, LECTURES &amp; EXPEDITIONS
          </p>
          <h1
            className="font-display text-[#F7F5F0] mb-6"
            style={{
              fontSize: 'var(--t-display)',
              lineHeight: 0.88,
              letterSpacing: '-0.03em',
            }}
          >
            News &amp; Invited Talks
          </h1>
          <p className="font-body text-[#D5D0C6] text-[17px] leading-relaxed">
            Flash announcements on new taxonomic discoveries, invited university lectures,
            symposium addresses, field expeditions, and educational outreach activities.
          </p>
        </div>

        {/* Flash News & Timely Updates */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-2.5 h-2.5 rounded-full bg-amber animate-ping" aria-hidden="true" />
            <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber font-semibold">
              FLASH BULLETINS &amp; RECENT ANNOUNCEMENTS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FLASH_UPDATES.map((item, idx) => (
              <div
                key={idx}
                className="border border-rule bg-carbon/70 p-8 rounded-[2px] flex flex-col justify-between hover:border-amber/60 transition-colors shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-rule mb-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-amber font-semibold">
                      {item.tag}
                    </span>
                    <span className="font-mono text-[11px] tracking-[0.14em] text-bone-faint">
                      {item.date}
                    </span>
                  </div>
                  <h3 className="font-display text-[1.5rem] text-[#F7F5F0] leading-snug mb-3">
                    {item.title}
                  </h3>
                  <p className="font-body text-bone-dim text-[14px] leading-relaxed mb-6">
                    {item.summary}
                  </p>
                </div>
                <div className="pt-4 border-t border-rule font-mono text-[10px] uppercase tracking-[0.16em] text-bone-dim">
                  Status: <span className="text-amber">{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chronological Invited Talks Table */}
        <div className="mb-20">
          <div className="mb-8">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber font-semibold mb-2">
              INVITED TALKS &amp; KEYNOTE LECTURES
            </h2>
            <p className="font-body text-bone-dim text-[14px]">
              Guest lectures and keynote addresses delivered at international museums, universities, and scientific congresses.
            </p>
          </div>

          <div className="border-t border-rule w-full">
            {INVITED_TALKS.map((talk, index) => (
              <div
                key={index}
                className="border-b border-rule py-7 px-4 hover:bg-carbon/40 transition-colors grid grid-cols-1 lg:grid-cols-12 gap-4 items-baseline"
              >
                <div className="lg:col-span-1">
                  <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-amber font-semibold">
                    {talk.year}
                  </span>
                </div>
                <div className="lg:col-span-6">
                  <h3 className="font-display text-[1.4rem] md:text-[1.65rem] text-[#F7F5F0] leading-tight">
                    {talk.title}
                  </h3>
                  <p className="font-body text-[14px] text-bone-dim mt-1.5">
                    {talk.event}
                  </p>
                </div>
                <div className="lg:col-span-3">
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-bone-dim">
                    {talk.institution}
                  </p>
                </div>
                <div className="lg:col-span-2 text-left lg:text-right">
                  <span className="inline-block border border-rule/60 text-amber font-mono text-[10px] uppercase tracking-[0.16em] px-3 py-1 rounded-[2px]">
                    {talk.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Field Expeditions & Activities */}
        <div className="mb-20">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber font-semibold mb-8">
            RECENT FIELD EXPEDITIONS &amp; EXTENSION ACTIVITIES
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FIELD_ACTIVITIES.map((act, i) => (
              <div
                key={i}
                className="border border-rule bg-carbon/50 rounded-[2px] flex flex-col justify-between overflow-hidden group hover:border-amber/60 transition-all duration-300 shadow-lg"
              >
                {act.image && (
                  <div className="relative w-full h-[180px] bg-void overflow-hidden border-b border-rule">
                    <Image
                      src={act.image}
                      alt={act.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-carbon via-transparent to-transparent pointer-events-none" />
                  </div>
                )}
                <div className="p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-[11px] text-amber font-semibold block mb-2.5">
                      {act.date}
                    </span>
                    <h3 className="font-display text-[1.4rem] text-[#F7F5F0] mb-3 leading-snug group-hover:text-amber transition-colors">
                      {act.title}
                    </h3>
                    <p className="font-body text-bone-dim text-[14px] leading-relaxed">
                      {act.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Speaking / Workshop Invitation CTA */}
        <div className="border border-amber/40 bg-carbon/60 p-8 md:p-12 rounded-[2px] shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="max-w-[700px]">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber font-semibold block mb-2">
              INVITE FOR KEYNOTE OR WORKSHOP
            </span>
            <h2 className="font-display text-[1.8rem] md:text-[2.4rem] text-bone leading-tight">
              Invite Dr. Yeshwanth for a talk, seminar, or taxonomy masterclass
            </h2>
            <p className="font-body text-bone-dim text-[14px] mt-2">
              Available for academic keynotes, guest lectures, and institutional specimen curation training worldwide.
            </p>
          </div>
          <Button variant="primary" href="/contact?subject=Speaking%20Invitation">
            Send Invitation Enquiry &rarr;
          </Button>
        </div>
      </div>

      <Footer />
    </main>
  );
}
