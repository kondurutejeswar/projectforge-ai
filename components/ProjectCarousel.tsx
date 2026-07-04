'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Project } from '@/lib/types';
import ProjectCard from './ProjectCard';

export default function ProjectCarousel({ projects }: { projects: Project[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    trackRef.current?.scrollBy({ left: dir === 'left' ? -360 : 360, behavior: 'smooth' });
  };

  return (
    <section id="featured" className="max-w-7xl mx-auto px-5 sm:px-8 py-20 scroll-mt-20">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="section-eyebrow">Featured</p>
          <h2 className="text-3xl sm:text-4xl mt-2">Tier 1 flagship projects</h2>
        </div>
        <div className="hidden sm:flex gap-2">
          <button
            onClick={() => scroll('left')}
            className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-slate-300 hover:border-signal-green hover:text-signal-green transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-slate-300 hover:border-signal-green hover:text-signal-green transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <motion.div
        ref={trackRef}
        className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: 'none' }}
      >
        {projects.map((p, i) => (
          <div key={p.slug} className="min-w-[300px] sm:min-w-[340px] snap-start">
            <ProjectCard project={p} index={i} />
          </div>
        ))}
      </motion.div>
    </section>
  );
}
