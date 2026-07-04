import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-5 py-32 text-center">
      <p className="font-mono text-signal-green text-sm mb-4">error: 404</p>
      <h1 className="text-4xl mb-4">This project doesn't exist (yet)</h1>
      <p className="text-slate-400 mb-8">
        The page you're looking for may have been moved or the project slug changed.
        Browse the full catalog instead.
      </p>
      <Link href="/projects" className="btn-primary inline-flex">
        <ArrowLeft size={16} /> Back to catalog
      </Link>
    </div>
  );
}
