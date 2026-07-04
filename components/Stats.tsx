'use client';

import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useRef } from 'react';

const stats = [
  { value: 60, suffix: '+', label: 'IEEE Projects Delivered' },
  { value: 500, suffix: '+', label: 'Students Helped' },
  { value: 7, suffix: '', label: 'Tech Domains Covered' },
  { value: 98, suffix: '%', label: 'Panel Approval Rate' },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) => Math.round(v));

  useEffect(() => {
    if (inView) {
      const controls = animate(motionVal, value, { duration: 1.4, ease: 'easeOut' });
      return controls.stop;
    }
  }, [inView, value, motionVal]);

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="border-y border-white/10 bg-base-900/40">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="text-center"
          >
            <div className="font-display text-3xl sm:text-4xl text-signal-green">
              <Counter value={s.value} suffix={s.suffix} />
            </div>
            <p className="text-slate-400 text-sm mt-2">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
