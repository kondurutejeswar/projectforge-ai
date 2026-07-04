'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, MessageCircle } from 'lucide-react';
import { PricingPlan } from '@/lib/types';

export default function PricingCard({ plan, projectTitle }: { plan: PricingPlan; projectTitle: string }) {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919999999999';
  const text = encodeURIComponent(
    `Hi! I'd like to go ahead with the "${plan.name}" plan for "${projectTitle}". Can you share payment details?`
  );

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      className={`rounded-xl p-6 flex flex-col border transition-shadow duration-300 ${
        plan.highlighted
          ? 'border-signal-green/50 bg-signal-green/5 hover:shadow-glow-green'
          : 'border-white/10 bg-white/[0.02] hover:shadow-glow-blue'
      }`}
    >
      {plan.highlighted && (
        <span className="self-start mb-3 text-[10px] font-mono uppercase tracking-wide text-signal-green bg-signal-green/10 border border-signal-green/30 rounded-full px-2 py-0.5">
          Most Popular
        </span>
      )}
      <h3 className="text-lg text-slate-50 mb-1">{plan.name}</h3>
      <p className="text-3xl font-display text-slate-50 mb-4">
        ₹{plan.price.toLocaleString('en-IN')}
      </p>
      <ul className="space-y-2 mb-6 flex-1">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
            <CheckCircle2 size={14} className="text-signal-green mt-0.5 shrink-0" />
            {f}
          </li>
        ))}
      </ul>
      <a
        href={`https://wa.me/${number}?text=${text}`}
        target="_blank"
        rel="noopener noreferrer"
        className={plan.highlighted ? 'btn-primary text-sm' : 'btn-secondary text-sm'}
      >
        <MessageCircle size={15} /> Contact on WhatsApp
      </a>
    </motion.div>
  );
}
