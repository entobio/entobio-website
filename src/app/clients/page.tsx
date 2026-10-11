/**
 * /clients — Clients, Collaborations & Testimonials
 * Requested in client review (PDF Page 1: "Feed back / clients")
 */

import type { Metadata } from 'next';
import { Button } from '@/components/ui/Button';
import { Footer } from '@/components/layout/Footer';
import { breadcrumbSchema } from '@/lib/schema';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Clients & Feedback · EntoBio Consult',
  description:
    'Institutional collaborations, agricultural consulting clients, research partnerships, and client feedback for EntoBio Consult.',
};

const TESTIMONIALS = [
  {
    quote:
      'Dr. Yeshwanth provided flawless, authoritative determination for our Miridae survey specimens with precise genitalic dissections and taxonomic notes. Essential expertise that is exceedingly rare to find.',
    author: 'Senior Research Entomologist',
    organisation: 'National Biodiversity Consortium',
    location: 'Bengaluru, India',
    service: 'Insect Identification & Taxonomy',
  },
  {
    quote:
      'The focus-stacked specimen imaging plates produced for our journal publication were of exceptional international standard. The diagnostic details and morphological clarity exceeded all editorial expectations.',
    author: 'Principal Investigator',
    organisation: 'Department of Agricultural Entomology',
    location: 'Karnataka, India',
    service: 'Scientific High-Resolution Imaging',
  },
  {
    quote:
      'The interactive insect exhibition and 3D models completely captivated our students and science educators. Hands-on biological engagement of this caliber creates lifelong curiosity in insect diversity.',
    author: 'Science Curriculum Director',
    organisation: 'State Science Education Foundation',
    location: 'South India',
    service: 'Science Outreach & Educational Exhibition',
  },
  {
    quote:
      'EntoBio Consult delivered an incisive pest assessment and natural enemy survey that pinpointed the exact mirid species infesting our plantation crops, enabling biological control without indiscriminate spraying.',
    author: 'Agronomy Consultant',
    organisation: 'Agroecosystem Research Group',
    location: 'Western Ghats, India',
    service: 'Integrated Pest Management & Agrobiodiversity',
  },
];

const CLIENT_SECTORS = [
  {
    title: 'Agricultural Research Universities',
    scope: 'Pest identification, beneficial predator diversity, student curation training, and taxonomic workshops.',
  },
  {
    title: 'Natural History Museums & Herbaria',
    scope: 'Reference collection management, type documentation, unit tray cataloguing, and specimen digitisation.',
  },
  {
    title: 'Environmental Impact Consultancies',
    scope: 'Baseline insect biodiversity inventory, ecological health indicators, and taxonomic audit reports.',
  },
  {
    title: 'Schools & Community Foundations',
    scope: 'Live specimen exhibitions, 3D anatomical model showcases, and nature walks in agroecosystems.',
  },
];

export default function ClientsPage() {
  return (
    <main className="min-h-screen bg-void text-bone pt-28 md:pt-36">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'Clients & Feedback', path: '/clients' },
            ])
          ),
        }}
      />

      <div className="max-w-[1560px] mx-auto px-gutter pb-20">
        {/* Header */}
        <div className="mb-16 border-b border-rule pb-12 max-w-[880px]">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber mb-4 font-semibold">
            COLLABORATIONS &amp; CLIENT TESTIMONIALS
          </p>
          <h1
            className="font-display text-[#F7F5F0] mb-6"
            style={{
              fontSize: 'var(--t-display)',
              lineHeight: 0.88,
              letterSpacing: '-0.03em',
            }}
          >
            Clients &amp; Feedback
          </h1>
          <p className="font-body text-[#D5D0C6] text-[17px] leading-relaxed">
            Partnering with university departments, research institutions, agricultural projects,
            and educators to deliver rigorous entomological determinations, collection stewardship,
            and impactful biodiversity programmes.
          </p>
        </div>

        {/* Sectors Served */}
        <div className="mb-20">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber font-semibold mb-6">
            SECTORS SERVED
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CLIENT_SECTORS.map((sector, i) => (
              <div
                key={sector.title}
                className="border border-rule bg-carbon/50 p-6 rounded-[2px] flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-[11px] text-amber block mb-2 font-semibold">
                    0{i + 1}
                  </span>
                  <h3 className="font-display text-[1.35rem] text-[#F7F5F0] mb-3 leading-snug">
                    {sector.title}
                  </h3>
                  <p className="font-body text-bone-dim text-[13px] leading-relaxed">
                    {sector.scope}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="mb-20">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber font-semibold mb-8">
            CLIENT ENDORSEMENTS &amp; TESTIMONIALS
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TESTIMONIALS.map((t, index) => (
              <div
                key={index}
                className="border border-rule bg-carbon/70 p-8 md:p-10 rounded-[2px] flex flex-col justify-between hover:border-amber/50 transition-colors shadow-xl"
              >
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <span className="text-amber text-[16px]">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-bone-dim">
                      {t.service}
                    </span>
                  </div>
                  <blockquote className="font-display text-[1.4rem] md:text-[1.65rem] text-[#F7F5F0] leading-snug tracking-[-0.01em] mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                </div>

                <div className="pt-5 border-t border-rule flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                  <div>
                    <p className="font-body text-[#F7F5F0] text-[15px] font-semibold">
                      {t.author}
                    </p>
                    <p className="font-mono text-[11px] text-bone-dim">
                      {t.organisation}
                    </p>
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-amber/80">
                    {t.location}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Client Feedback Submission Form Box */}
        <div className="border border-rule bg-carbon/60 p-8 md:p-12 rounded-[2px] mb-20 shadow-2xl">
          <div className="max-w-[760px]">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber font-semibold block mb-3">
              CLIENT TESTIMONIAL PORTAL
            </span>
            <h2 className="font-display text-[2rem] md:text-[2.6rem] text-bone mb-4 leading-tight">
              Have you worked with EntoBio Consult?
            </h2>
            <p className="font-body text-[#D5D0C6] text-[15px] leading-relaxed mb-8">
              We value rigorous scientific feedback from our institutional collaborators, research partners,
              and education clients. Share your feedback, report observations, or provide an official testimonial.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="primary" href="/contact?subject=Client%20Feedback%20Submission">
                Submit Client Feedback &rarr;
              </Button>
              <Button variant="ghost" href="/contact?subject=New%20Institutional%20Consultancy">
                Initiate New Consultancy
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
