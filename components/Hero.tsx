'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, PlayCircle } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.55, ease: 'easeOut' },
  }),
};

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-24 sm:pt-28 sm:pb-32">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 text-center">
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] font-mono text-xs text-slate-400"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-signal-green animate-pulse-slow" />
          60+ projects live · 500+ students helped
        </motion.div>

        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-4xl sm:text-6xl leading-[1.08] mb-6"
        >
          Ready-to-Deploy <span className="text-signal-green">IEEE</span> Final Year
          Projects
          <br className="hidden sm:block" />
          <span className="text-slate-400 text-3xl sm:text-4xl font-body font-normal">
            {' '}
            Live Demos + Full Kits, verified before you pay.
          </span>
        </motion.h1>

        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-slate-400 max-w-xl mx-auto mb-10"
        >
          CSE and IT students building GenAI, Computer Vision, IoT, and Medical AI
          projects — with a working demo, IEEE-format report, PPT, and video, backed by
          support till submission.
        </motion.p>

        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/projects" className="btn-primary">
            Get Full Kit Now <ArrowRight size={18} />
          </Link>
          <a href="#featured" className="btn-secondary">
            <PlayCircle size={18} /> Watch Live Demos
          </a>
        </motion.div>
      </div>

      {/* Ambient terminal-grid backdrop */}
      <div
        className="absolute inset-0 -z-10 opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse 60% 50% at 50% 30%, black, transparent)',
        }}
      />
    </section>
  );
}
