/**
 * src/components/publications/PublicationsList.tsx
 * Client component for interactive filtering and search of publications.
 */

'use client';

import { useState, useMemo } from 'react';
import { PUBLICATIONS } from '@/content/publications';
import { PublicationTitle } from '@/components/ui/PublicationTitle';

export function PublicationsList() {
  const [selectedYear, setSelectedYear] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Extract unique years sorted descending
  const years = useMemo(() => {
    const unique = Array.from(new Set(PUBLICATIONS.map((p) => p.year)));
    return unique.sort((a, b) => b - a);
  }, []);

  // Filtered publications list
  const filteredPublications = useMemo(() => {
    return PUBLICATIONS.filter((pub) => {
      const matchesYear = selectedYear === 'ALL' || pub.year === Number(selectedYear);
      const matchesSearch =
        searchQuery.trim() === '' ||
        pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pub.journal.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesYear && matchesSearch;
    });
  }, [selectedYear, searchQuery]);

  return (
    <>
      {/* Filters & Search Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-rule font-mono text-[11px] uppercase tracking-[0.18em]">
        {/* Year Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-bone-dim mr-2 font-semibold">YEAR:</span>
          <button
            onClick={() => setSelectedYear('ALL')}
            className={`px-3 py-1.5 rounded-[2px] transition-colors ${
              selectedYear === 'ALL'
                ? 'bg-amber text-void font-semibold'
                : 'border border-rule text-bone-dim hover:text-bone'
            }`}
          >
            ALL ({PUBLICATIONS.length})
          </button>
          {years.map((y) => (
            <button
              key={y}
              onClick={() => setSelectedYear(String(y))}
              className={`px-3 py-1.5 rounded-[2px] transition-colors ${
                selectedYear === String(y)
                  ? 'bg-amber text-void font-semibold'
                  : 'border border-rule text-bone-dim hover:text-bone'
              }`}
            >
              {y}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="w-full sm:w-64">
          <input
            type="text"
            placeholder="FILTER TITLES OR JOURNALS..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border border-rule px-3 py-1.5 text-bone font-mono text-[11px] uppercase placeholder:text-bone-dim/40 focus:outline-none focus:border-amber transition-colors"
          />
        </div>
      </div>

      {/* Publications List */}
      <div className="space-y-6 mb-20">
        {filteredPublications.length === 0 ? (
          <div className="py-12 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-bone-dim">
            No publications found matching your filter criteria.
          </div>
        ) : (
          filteredPublications.map((pub, idx) => (
            <div
              key={idx}
              className="group border-b border-rule/60 pb-6 flex flex-col md:flex-row md:items-baseline justify-between gap-4 transition-colors hover:border-amber/40"
            >
              <div>
                <h3 className="font-display text-[1.4rem] md:text-[1.8rem] text-bone leading-tight group-hover:text-amber transition-colors">
                  <PublicationTitle title={pub.title} isBook={pub.isBook} />
                </h3>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone-dim mt-1.5">
                  <span className="italic font-display text-[14px] text-bone">{pub.journal}</span>{' '}
                  <span>{pub.volume}</span>
                </p>
              </div>

              <div className="flex items-center gap-4 flex-shrink-0 font-mono text-[11px] uppercase tracking-[0.18em]">
                <span className="text-amber font-semibold">{pub.year}</span>
                {pub.doi ? (
                  <a
                    href={`https://doi.org/${pub.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-rule px-3 py-1 text-bone-dim hover:bg-amber hover:text-void hover:border-amber transition-colors"
                  >
                    DOI
                  </a>
                ) : (
                  <span className="text-bone-dim text-[10px]">CITED</span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
