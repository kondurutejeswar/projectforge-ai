'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Terminal, ShieldCheck, FileCheck2, Clock } from 'lucide-react';
import InquiryForm from './InquiryForm';

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return null;

  return (
    <footer className="border-t border-white/10 mt-24 bg-base-900/40">
      <div id="inquiry" className="max-w-7xl mx-auto px-5 sm:px-8 py-20 scroll-mt-24">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="section-eyebrow">Still deciding?</p>
            <h2 className="text-3xl sm:text-4xl mt-3 mb-4">
              Tell us your project brief.<br /> We'll reply within hours.
            </h2>
            <p className="text-slate-400 max-w-md mb-6">
              Not sure which project fits your syllabus or panel requirements? Send your
              college name and preferred domain — we'll recommend a Tier 1 or Tier 2 project
              and share the live demo before you pay anything.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="tag-chip flex items-center gap-1.5">
                <ShieldCheck size={13} className="text-signal-green" /> Source Code + Report
              </span>
              <span className="tag-chip flex items-center gap-1.5">
                <FileCheck2 size={13} className="text-signal-blue" /> Video + PPT included
              </span>
              <span className="tag-chip flex items-center gap-1.5">
                <Clock size={13} className="text-signal-violet" /> Support till submission
              </span>
            </div>
          </div>

          <div className="glass-panel p-6 sm:p-8">
            <InquiryForm compact />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-10 flex flex-col md:flex-row gap-8 md:gap-0 md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-md bg-signal-green/10 border border-signal-green/40 flex items-center justify-center text-signal-green">
              <Terminal size={14} />
            </span>
            <span className="font-display font-semibold text-slate-100">
              ProjectForge<span className="text-signal-green">.AI</span>
            </span>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-slate-400">
            <Link href="/" className="hover:text-signal-green">Home</Link>
            <Link href="/projects" className="hover:text-signal-green">Projects</Link>
            <Link href="/testimonials" className="hover:text-signal-green">Testimonials</Link>
            <a href={`mailto:${process.env.NEXT_PUBLIC_OWNER_EMAIL || 'hello@projectforge.ai'}`} className="hover:text-signal-green">
              Email us
            </a>
          </div>

          <p className="text-xs text-slate-600 font-mono">
            © {new Date().getFullYear()} ProjectForge.AI — built for CSE/IT final-years.
          </p>
        </div>
      </div>
    </footer>
  );
}
