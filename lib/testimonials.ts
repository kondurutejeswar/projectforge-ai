import { Testimonial } from './types';

/**
 * Seed testimonials shown before Supabase is connected, or as a fallback
 * if the `testimonials` table is empty. Once Supabase is wired up
 * (see lib/supabaseClient.ts), TestimonialsCarousel merges these with
 * live approved rows from the database.
 */
export const seedTestimonials: Testimonial[] = [
  {
    id: 'seed-1',
    name: 'Ananya R.',
    college: 'VNR VJIET, Hyderabad',
    project: 'AI-Based Diabetic Retinopathy Detection System',
    rating: 5,
    review:
      'Got the full kit 3 weeks before submission. The report was IEEE-formatted already and the support call helped me actually understand the CNN architecture for my viva.',
    approved: true,
    created_at: '2026-04-12',
  },
  {
    id: 'seed-2',
    name: 'Rohit K.',
    college: 'CBIT, Hyderabad',
    project: 'GenAI Resume Screener & Job Matcher',
    rating: 5,
    review:
      'Live demo worked exactly as shown before I paid, which is rare. Panel was impressed that it used an actual RAG pipeline instead of a basic keyword matcher.',
    approved: true,
    created_at: '2026-03-28',
  },
  {
    id: 'seed-3',
    name: 'Sneha M.',
    college: 'JNTUH',
    project: 'IoT-Based Smart Agriculture Monitoring System',
    rating: 4,
    review:
      'Hardware setup guide was clear enough that I assembled it myself in a weekend. Only wish the PPT template had more diagrams, but support added them when I asked.',
    approved: true,
    created_at: '2026-02-15',
  },
  {
    id: 'seed-4',
    name: 'Vishal T.',
    college: 'MVSR Engineering College',
    project: 'AI-Powered Phishing URL Detector',
    rating: 5,
    review:
      'Best decision for a final-year project on a budget. Source-only plan was enough since our college wanted us to write the report ourselves.',
    approved: true,
    created_at: '2026-01-30',
  },
];
