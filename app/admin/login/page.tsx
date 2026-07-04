'use client';

import { useState, FormEvent, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, Loader2, AlertCircle, Terminal } from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Incorrect password.');
        setLoading(false);
        return;
      }

      router.push(params.get('from') || '/admin');
      router.refresh();
    } catch {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-5">
      <form onSubmit={handleSubmit} className="glass-panel p-8 w-full max-w-sm">
        <div className="flex items-center gap-2 mb-6">
          <span className="w-9 h-9 rounded-md bg-signal-green/10 border border-signal-green/40 flex items-center justify-center text-signal-green">
            <Terminal size={17} />
          </span>
          <div>
            <p className="text-slate-50 font-display leading-none">Admin</p>
            <p className="text-xs text-slate-500 font-mono">ProjectForge.AI</p>
          </div>
        </div>

        <label className="block mb-5">
          <span className="text-xs text-slate-400 mb-1.5 inline-flex items-center gap-1.5">
            <Lock size={12} /> Admin password
          </span>
          <input
            autoFocus
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-signal-green/60 focus:ring-1 focus:ring-signal-green/40"
          />
        </label>

        {error && (
          <p className="flex items-center gap-2 text-sm text-red-400 mb-4">
            <AlertCircle size={15} /> {error}
          </p>
        )}

        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" /> Checking...
            </>
          ) : (
            'Log in'
          )}
        </button>
      </form>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
