'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Testimonial } from '@/lib/types';

export default function TestimonialCard({ t, index = 0 }: { t: Testimonial; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: (index % 4) * 0.08, duration: 0.45 }}
      className="glass-panel p-6 h-full flex flex-col hover:border-signal-green/30 transition-colors"
    >
      <Quote className="text-signal-green/40 mb-3" size={26} />
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={14}
            className={i < t.rating ? 'fill-signal-green text-signal-green' : 'text-slate-700'}
          />
        ))}
      </div>
      <p className="text-slate-300 text-sm mb-5 flex-1">{t.review}</p>
      <div className="border-t border-white/10 pt-4">
        <p className="text-slate-50 text-sm font-medium">{t.name}</p>
        <p className="text-slate-500 text-xs">{t.college}</p>
        <p className="text-signal-blue text-xs mt-1 font-mono">{t.project}</p>
      </div>
    </motion.div>
  );
}
