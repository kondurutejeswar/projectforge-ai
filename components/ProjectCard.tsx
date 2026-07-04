'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { Project } from '@/lib/types';

const domainGlow: Record<string, string> = {
  'Medical AI': 'hover:shadow-glow-green',
  GenAI: 'hover:shadow-glow-violet',
  'Computer Vision': 'hover:shadow-glow-blue',
  IoT: 'hover:shadow-glow-green',
  Blockchain: 'hover:shadow-glow-violet',
  Cybersecurity: 'hover:shadow-glow-blue',
  NLP: 'hover:shadow-glow-violet',
};

export default function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: (index % 6) * 0.06, duration: 0.45 }}
      whileHover={{ y: -4, scale: 1.015 }}
      className={`terminal-frame flex flex-col h-full transition-shadow duration-300 ${domainGlow[project.domain] || 'hover:shadow-glow-green'}`}
    >
      {/* terminal title bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-white/[0.02]">
        <div className="terminal-dots flex gap-1.5">
          <span className="bg-red-400/70" />
          <span className="bg-yellow-400/70" />
          <span className="bg-green-400/70" />
        </div>
        <div className="flex items-center gap-2">
          {project.tier === 'Tier 1' && (
            <span className="flex items-center gap-1 text-[10px] font-mono text-signal-violet">
              <Sparkles size={10} /> TIER 1
            </span>
          )}
          <span className="text-[10px] font-mono text-slate-500">{project.domain}</span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg text-slate-50 mb-2 leading-snug">{project.title}</h3>
        <p className="text-sm text-slate-400 mb-4 flex-1">{project.shortDesc}</p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.techStack.slice(0, 4).map((t) => (
            <span key={t} className="tag-chip">
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3 mt-auto">
          <Link
            href={`/projects/${project.slug}`}
            className="flex-1 text-center text-sm rounded-lg border border-white/15 text-slate-200 py-2.5 hover:border-signal-blue/60 hover:text-signal-blue transition-colors"
          >
            View Details
          </Link>
          <Link
            href={`/projects/${project.slug}#inquiry`}
            className="flex-1 flex items-center justify-center gap-1 text-center text-sm rounded-lg bg-signal-green text-base-950 font-semibold py-2.5 hover:shadow-glow-green transition-shadow"
          >
            Get Project <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
