'use client';

import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { submitInquiry } from '@/lib/supabaseClient';
import { sendInquiryEmail } from '@/lib/sendEmail';

interface InquiryFormProps {
  /** Pre-fills the project field when embedded on a project detail page */
  defaultProjectTitle?: string;
  /** Tighter spacing/labels for the footer placement */
  compact?: boolean;
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function InquiryForm({ defaultProjectTitle = '', compact = false }: InquiryFormProps) {
  const [status, setStatus] = useState<Status>('idle');
  const [form, setForm] = useState({
    full_name: '',
    college: '',
    project_title: defaultProjectTitle,
    email: '',
    whatsapp: '',
    message: '',
  });

  const update = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('submitting');

    const { error } = await submitInquiry(form);
    await sendInquiryEmail({
      from_name: form.full_name,
      college: form.college,
      project_title: form.project_title,
      email: form.email,
      whatsapp: form.whatsapp,
      message: form.message,
    });

    if (error) {
      setStatus('error');
      return;
    }

    setStatus('success');
    setForm({ full_name: '', college: '', project_title: '', email: '', whatsapp: '', message: '' });
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center text-center gap-3 py-10"
      >
        <CheckCircle2 className="text-signal-green" size={40} />
        <h3 className="text-xl text-slate-50">Inquiry sent</h3>
        <p className="text-slate-400 max-w-xs text-sm">
          We've received your details. Expect a reply on WhatsApp or email within a few hours.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="text-signal-blue text-sm mt-2 hover:underline"
        >
          Send another inquiry
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {!compact && (
        <div>
          <p className="section-eyebrow">Get this project</p>
          <h3 className="text-2xl mt-2">Send an inquiry</h3>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Full Name" required>
          <input
            required
            value={form.full_name}
            onChange={update('full_name')}
            placeholder="Priya Sharma"
            className="input-field"
          />
        </Field>
        <Field label="College / University" required>
          <input
            required
            value={form.college}
            onChange={update('college')}
            placeholder="CBIT, Hyderabad"
            className="input-field"
          />
        </Field>
      </div>

      <Field label="Desired Project Title / Number" required>
        <input
          required
          value={form.project_title}
          onChange={update('project_title')}
          placeholder="e.g. AI-Based Diabetic Retinopathy Detection"
          className="input-field"
        />
      </Field>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Email" required>
          <input
            required
            type="email"
            value={form.email}
            onChange={update('email')}
            placeholder="you@college.edu"
            className="input-field"
          />
        </Field>
        <Field label="WhatsApp Number" required>
          <input
            required
            type="tel"
            value={form.whatsapp}
            onChange={update('whatsapp')}
            placeholder="+91 98765 43210"
            className="input-field"
          />
        </Field>
      </div>

      <Field label="Message">
        <textarea
          value={form.message}
          onChange={update('message')}
          placeholder="Any specific requirement, deadline, or panel guideline we should know?"
          rows={3}
          className="input-field resize-none"
        />
      </Field>

      <AnimatePresence>
        {status === 'error' && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 text-sm text-red-400"
          >
            <AlertCircle size={15} /> Something went wrong. Please try again or reach us on WhatsApp.
          </motion.p>
        )}
      </AnimatePresence>

      <button type="submit" disabled={status === 'submitting'} className="btn-primary w-full">
        {status === 'submitting' ? (
          <>
            <Loader2 size={18} className="animate-spin" /> Sending...
          </>
        ) : (
          'Send Inquiry'
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

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-xs text-slate-400 mb-1.5 inline-block">
        {label} {required && <span className="text-signal-green">*</span>}
      </span>
      {children}
    </label>
  );
}
