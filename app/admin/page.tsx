'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  Check,
  X,
  Trash2,
  LogOut,
  Loader2,
  Terminal,
  Inbox,
} from 'lucide-react';
import { Testimonial } from '@/lib/types';

type Filter = 'pending' | 'approved' | 'all';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<Filter>('pending');
  const [busyId, setBusyId] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/testimonials');
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Could not load reviews.');
      } else {
        setItems(data.data || []);
      }
    } catch {
      setError('Could not load reviews.');
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    if (filter === 'pending') return items.filter((t) => !t.approved);
    if (filter === 'approved') return items.filter((t) => t.approved);
    return items;
  }, [items, filter]);

  const pendingCount = items.filter((t) => !t.approved).length;

  async function setApproved(id: string, approved: boolean) {
    setBusyId(id);
    const prev = items;
    setItems((cur) => cur.map((t) => (t.id === id ? { ...t, approved } : t)));
    const res = await fetch('/api/admin/testimonials', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, approved }),
    });
    if (!res.ok) setItems(prev);
    setBusyId(null);
  }

  async function remove(id: string) {
    if (!confirm('Delete this review permanently?')) return;
    setBusyId(id);
    const prev = items;
    setItems((cur) => cur.filter((t) => t.id !== id));
    const res = await fetch('/api/admin/testimonials', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    if (!res.ok) setItems(prev);
    setBusyId(null);
  }

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-white/10 bg-base-900/40">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-md bg-signal-green/10 border border-signal-green/40 flex items-center justify-center text-signal-green">
              <Terminal size={16} />
            </span>
            <div className="leading-none">
              <p className="text-slate-50 font-display text-sm">Review Moderation</p>
              <p className="text-[11px] text-slate-500 font-mono">ProjectForge.AI Admin</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-red-400 transition-colors"
          >
            <LogOut size={15} /> Log out
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex gap-2">
            <Tab active={filter === 'pending'} onClick={() => setFilter('pending')}>
              Pending {pendingCount > 0 && <Badge>{pendingCount}</Badge>}
            </Tab>
            <Tab active={filter === 'approved'} onClick={() => setFilter('approved')}>
              Approved
            </Tab>
            <Tab active={filter === 'all'} onClick={() => setFilter('all')}>
              All
            </Tab>
          </div>
          <p className="text-xs text-slate-500 font-mono">{items.length} total reviews</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24 text-slate-500 gap-2">
            <Loader2 className="animate-spin" size={18} /> Loading reviews...
          </div>
        ) : error ? (
          <div className="glass-panel p-8 text-center text-sm text-red-400">{error}</div>
        ) : filtered.length === 0 ? (
          <div className="glass-panel p-12 text-center text-slate-500 flex flex-col items-center gap-3">
            <Inbox size={28} />
            <p>Nothing here right now.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {filtered.map((t) => (
                <motion.div
                  key={t.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="glass-panel p-5 sm:p-6"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <p className="text-slate-50 font-medium">{t.name}</p>
                      <p className="text-xs text-slate-500">{t.college}</p>
                      <p className="text-xs text-signal-blue font-mono mt-0.5">{t.project}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={13}
                            className={
                              i < t.rating ? 'fill-signal-green text-signal-green' : 'text-slate-700'
                            }
                          />
                        ))}
                      </div>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                          t.approved
                            ? 'border-signal-green/40 text-signal-green'
                            : 'border-yellow-500/40 text-yellow-400'
                        }`}
                      >
                        {t.approved ? 'APPROVED' : 'PENDING'}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-slate-300 mb-4">{t.review}</p>

                  <div className="flex items-center gap-2">
                    {!t.approved ? (
                      <button
                        disabled={busyId === t.id}
                        onClick={() => setApproved(t.id, true)}
                        className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg bg-signal-green text-base-950 font-semibold hover:shadow-glow-green transition-shadow disabled:opacity-50"
                      >
                        <Check size={14} /> Approve
                      </button>
                    ) : (
                      <button
                        disabled={busyId === t.id}
                        onClick={() => setApproved(t.id, false)}
                        className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg border border-white/15 text-slate-300 hover:border-yellow-500/50 hover:text-yellow-400 transition-colors disabled:opacity-50"
                      >
                        <X size={14} /> Unpublish
                      </button>
                    )}
                    <button
                      disabled={busyId === t.id}
                      onClick={() => remove(t.id)}
                      className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg border border-white/15 text-slate-400 hover:border-red-500/50 hover:text-red-400 transition-colors disabled:opacity-50"
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}

function Tab({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg transition-colors ${
        active ? 'bg-white/10 text-slate-50' : 'text-slate-400 hover:text-slate-200'
      }`}
    >
      {children}
    </button>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[10px] bg-signal-green text-base-950 font-semibold rounded-full px-1.5 py-0.5 leading-none">
      {children}
    </span>
  );
}
