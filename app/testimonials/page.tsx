import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import TestimonialForm from '@/components/TestimonialForm';

export const metadata = {
  title: 'Student Reviews — ProjectForge AI',
  description: 'Real reviews from B.Tech CSE/IT students who bought IEEE final year projects from ProjectForge AI.',
};

export default function TestimonialsPage() {
  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
      <div className="mb-12 max-w-2xl">
        <p className="section-eyebrow">Testimonials</p>
        <h1 className="text-3xl sm:text-5xl mt-2 mb-3">Real students, real submissions</h1>
        <p className="text-slate-400">
          Every review below comes from a student who bought a project kit. New reviews are
          moderated before publishing, so what you see here is verified.
        </p>
      </div>

      <div className="mb-16">
        <TestimonialsCarousel />
      </div>

      <div className="glass-panel p-6 sm:p-10 max-w-2xl mx-auto">
        <TestimonialForm />
      </div>
    </div>
  );
}
