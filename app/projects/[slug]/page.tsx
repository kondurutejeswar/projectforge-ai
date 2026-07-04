import { notFound } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, ExternalLink, ArrowLeft, BadgeCheck } from 'lucide-react';
import { projects, getProjectBySlug } from '@/lib/projects';
import InquiryForm from '@/components/InquiryForm';
import PricingCard from '@/components/PricingCard';

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  if (!project) return {};
  return {
    title: `${project.title} — ProjectForge AI`,
    description: project.shortDesc,
  };
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  if (!project) return notFound();

  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14">
      <Link href="/projects" className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-signal-green mb-8">
        <ArrowLeft size={15} /> Back to catalog
      </Link>

      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="tag-chip">{project.tier}</span>
        <span className="tag-chip">{project.domain}</span>
        {project.ieeeBase && (
          <span className="tag-chip flex items-center gap-1">
            <BadgeCheck size={12} className="text-signal-blue" /> {project.ieeeBase}
          </span>
        )}
      </div>

      <h1 className="text-3xl sm:text-5xl mb-4 max-w-3xl">{project.title}</h1>
      <p className="text-slate-400 max-w-2xl mb-8">{project.longDesc}</p>

      <div className="flex flex-wrap gap-1.5 mb-10">
        {project.techStack.map((t) => (
          <span key={t} className="tag-chip">
            {t}
          </span>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          {/* Live demo embed */}
          <div className="terminal-frame">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-white/[0.02]">
              <div className="terminal-dots flex gap-1.5">
                <span className="bg-red-400/70" />
                <span className="bg-yellow-400/70" />
                <span className="bg-green-400/70" />
              </div>
              <span className="text-[10px] font-mono text-slate-500">live-demo.mp4</span>
            </div>
            <div className="aspect-video bg-base-950">
              {project.demoVideoUrl ? (
                <iframe
                  src={project.demoVideoUrl}
                  title={`${project.title} demo video`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-500 text-sm">
                  Demo video coming soon — request a live walkthrough via the inquiry form.
                </div>
              )}
            </div>
            {project.demoUrl && (
              <div className="px-4 py-3 border-t border-white/10 flex justify-between items-center">
                <span className="text-xs text-slate-500 font-mono">hosted-demo</span>
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-signal-blue text-sm hover:underline"
                >
                  Open live demo <ExternalLink size={13} />
                </a>
              </div>
            )}
          </div>

          {/* Features */}
          <div>
            <h2 className="text-2xl mb-5">What's included in the build</h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {project.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-slate-300">
                  <CheckCircle2 size={16} className="text-signal-green mt-0.5 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Pricing */}
          <div>
            <h2 className="text-2xl mb-5">Choose your kit</h2>
            <div className="grid sm:grid-cols-3 gap-5">
              {project.pricing.map((plan) => (
                <PricingCard key={plan.name} plan={plan} projectTitle={project.title} />
              ))}
            </div>
          </div>
        </div>

        {/* Sticky inquiry form */}
        <div id="inquiry" className="lg:sticky lg:top-24 h-fit scroll-mt-24">
          <div className="glass-panel p-6">
            <InquiryForm defaultProjectTitle={project.title} />
          </div>
        </div>
      </div>
    </div>
  );
}
