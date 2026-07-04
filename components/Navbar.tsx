'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Terminal } from 'lucide-react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/testimonials', label: 'Testimonials' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (pathname?.startsWith('/admin')) return null;

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-base-950/90 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-5 sm:px-8 h-16">
        <Link href="/" className="flex items-center gap-2 group" onClick={() => setOpen(false)}>
          <span className="w-8 h-8 rounded-md bg-signal-green/10 border border-signal-green/40 flex items-center justify-center text-signal-green group-hover:shadow-glow-green transition-shadow">
            <Terminal size={16} />
          </span>
          <span className="font-display font-semibold text-slate-50 text-lg">
            ProjectForge<span className="text-signal-green">.AI</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-slate-300 hover:text-signal-green transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/#inquiry" className="btn-primary text-sm px-5 py-2.5">
            Get Full Kit Now
          </Link>
        </div>

        <button
          className="md:hidden text-slate-200"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden border-t border-white/10 bg-base-950/95"
          >
            <div className="flex flex-col px-5 py-4 gap-4">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-slate-200 text-base py-1"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="/#inquiry"
                onClick={() => setOpen(false)}
                className="btn-primary text-sm mt-2"
              >
                Get Full Kit Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
