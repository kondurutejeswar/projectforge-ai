'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Star, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { submitTestimonial } from '@/lib/supabaseClient';
import { projects } from '@/lib/projects';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function TestimonialForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [form, setForm] = useState({ name: '', college: '', project: '', review: '' });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('submitting');
    const { error } = await submitTestimonial({ ...form, rating });
    if (error) {
      setStatus('error');
      return;
    }
    setStatus('success');
    setForm({ name: '', college: '', project: '', review: '' });
    setRating(5);
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center text-center gap-3 py-12"
      >
        <CheckCircle2 className="text-signal-green" size={40} />
        <h3 className="text-xl text-slate-50">Thanks for the review!</h3>
        <p className="text-slate-400 max-w-sm text-sm">
          Your review is queued for moderation and will appear on this page once approved —
          usually within 24 hours.
        </p>
        <button onClick={() => setStatus('idle')} className="text-signal-blue text-sm mt-2 hover:underline">
          Submit another review
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <p className="section-eyebrow">Share your experience</p>
        <h3 className="text-2xl mt-2">Submit a review</h3>
        <p className="text-xs text-slate-500 mt-2">
          Reviews are moderated before appearing publicly — this keeps things trustworthy for
          students checking us out before purchase.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <input
          required
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          placeholder="Your name"
          className="input-field"
        />
        <input
          required
          value={form.college}
          onChange={(e) => setForm((f) => ({ ...f, college: e.target.value }))}
          placeholder="College / University"
          className="input-field"
        />
      </div>

      <select
        required
        value={form.project}
        onChange={(e) => setForm((f) => ({ ...f, project: e.target.value }))}
        className="input-field"
      >
        <option value="" disabled>
          Which project did you buy?
        </option>
        {projects.map((p) => (
          <option key={p.slug} value={p.title}>
            {p.title}
          </option>
        ))}
      </select>

      <div>
        <span className="text-xs text-slate-400 mb-2 inline-block">Your rating</span>
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => {
            const val = i + 1;
            return (
              <button
                type="button"
                key={val}
                onMouseEnter={() => setHoverRating(val)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(val)}
                aria-label={`Rate ${val} stars`}
              >
                <Star
                  size={24}
                  className={
                    val <= (hoverRating || rating)
                      ? 'fill-signal-green text-signal-green'
                      : 'text-slate-700'
                  }
                />
              </button>
            );
          })}
        </div>
      </div>

      <textarea
        required
        value={form.review}
        onChange={(e) => setForm((f) => ({ ...f, review: e.target.value }))}
        placeholder="How did the project, support, and delivery go?"
        rows={4}
        className="input-field resize-none"
      />

      {status === 'error' && (
        <p className="flex items-center gap-2 text-sm text-red-400">
          <AlertCircle size={15} /> Couldn't submit right now. Please try again shortly.
        </p>
      )}

      <button type="submit" disabled={status === 'submitting'} className="btn-primary w-full">
        {status === 'submitting' ? (
          <>
            <Loader2 size={18} className="animate-spin" /> Submitting...
          </>
        ) : (
          'Submit Review'
        )}
      </button>

      <style jsx>{`
        .input-field {
          width: 100%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.5rem;
          padding: 0.65rem 0.85rem;
          font-size: 0.9rem;
          color: #f4f6fb;
        }
        .input-field::placeholder {
          color: #5b6580;
        }
        .input-field:focus {
          outline: none;
          border-color: #22d3a6;
          box-shadow: 0 0 0 1px rgba(34, 211, 166, 0.4);
        }
      `}</style>
    </form>
  );
}
