import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import ProjectCarousel from '@/components/ProjectCarousel';
import TestimonialCard from '@/components/TestimonialCard';
import { projects } from '@/lib/projects';
import { seedTestimonials } from '@/lib/testimonials';
import { ShieldCheck, FileText, Video, Headset, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const guarantees = [
  { icon: ShieldCheck, label: 'Working Source Code', desc: 'Runs exactly as demoed, no missing dependencies.' },
  { icon: FileText, label: 'IEEE-Format Report', desc: 'Ready for submission, formatted to your college template.' },
  { icon: Video, label: 'Explainer Video', desc: 'Understand every module before your viva, at your pace.' },
  { icon: Headset, label: 'Support Till Submission', desc: 'Doubt-clearing calls until your review is done.' },
];

export default function HomePage() {
  const featured = projects.filter((p) => p.tier === 'Tier 1');

  return (
    <>
      <Hero />
      <Stats />
      <ProjectCarousel projects={featured} />

      {/* Guarantees */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20">
        <div className="text-center mb-12">
          <p className="section-eyebrow">Why students trust us</p>
          <h2 className="text-3xl sm:text-4xl mt-2">Every kit ships with the same four guarantees</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {guarantees.map((g) => (
            <div key={g.label} className="glass-panel p-6 hover:border-signal-green/30 transition-colors">
              <g.icon className="text-signal-green mb-4" size={26} />
              <h3 className="text-slate-50 text-base mb-1.5">{g.label}</h3>
              <p className="text-slate-400 text-sm">{g.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial teaser */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="section-eyebrow">Social proof</p>
            <h2 className="text-3xl sm:text-4xl mt-2">What students are saying</h2>
          </div>
          <Link href="/testimonials" className="hidden sm:flex items-center gap-1 text-signal-blue text-sm hover:underline">
            See all reviews <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {seedTestimonials.slice(0, 3).map((t, i) => (
            <TestimonialCard key={t.id} t={t} index={i} />
          ))}
        </div>
        <Link href="/testimonials" className="sm:hidden flex items-center justify-center gap-1 text-signal-blue text-sm mt-6 hover:underline">
          See all reviews <ArrowRight size={14} />
        </Link>
      </section>

      {/* Secondary CTA banner */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 pb-20">
        <div className="glass-panel p-10 sm:p-14 text-center relative overflow-hidden">
          <h2 className="text-3xl sm:text-4xl mb-4">60+ projects. Every domain covered.</h2>
          <p className="text-slate-400 max-w-lg mx-auto mb-8">
            Medical AI, GenAI, Computer Vision, IoT, Blockchain, Cybersecurity, and NLP —
            browse the full catalog and filter by tier and domain.
          </p>
          <Link href="/projects" className="btn-primary">
            Browse All Projects <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
