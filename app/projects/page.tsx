'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { projects, domains, tiers } from '@/lib/projects';
import ProjectCard from '@/components/ProjectCard';
import FilterBar from '@/components/FilterBar';
import { SearchX } from 'lucide-react';

export default function ProjectsCatalogPage() {
  const [domain, setDomain] = useState<string | null>(null);
  const [tier, setTier] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesDomain = !domain || p.domain === domain;
      const matchesTier = !tier || p.tier === tier;
      const q = search.trim().toLowerCase();
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.shortDesc.toLowerCase().includes(q) ||
        p.techStack.some((t) => t.toLowerCase().includes(q));
      return matchesDomain && matchesTier && matchesSearch;
    });
  }, [domain, tier, search]);

  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
      <div className="mb-10">
        <p className="section-eyebrow">Project Catalog</p>
        <h1 className="text-3xl sm:text-5xl mt-2 mb-3">
          {projects.length}+ IEEE final-year projects, ready to deploy
        </h1>
        <p className="text-slate-400 max-w-2xl">
          Every project ships with a live demo, source code, and IEEE-format documentation.
          Filter by domain or tier to find the right fit for your syllabus and panel.
        </p>
      </div>

      <FilterBar
        domains={domains}
        tiers={tiers}
        activeDomain={domain}
        activeTier={tier}
        search={search}
        onDomainChange={setDomain}
        onTierChange={setTier}
        onSearchChange={setSearch}
      />

      {filtered.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center text-center py-24 text-slate-500"
        >
          <SearchX size={36} className="mb-4" />
          <p>No projects match those filters. Try clearing the search or picking "All".</p>
        </motion.div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
