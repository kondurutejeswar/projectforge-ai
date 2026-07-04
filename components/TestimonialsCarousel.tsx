'use client';

import { useEffect, useState } from 'react';
import { fetchApprovedTestimonials } from '@/lib/supabaseClient';
import { seedTestimonials } from '@/lib/testimonials';
import { Testimonial } from '@/lib/types';
import TestimonialCard from './TestimonialCard';

export default function TestimonialsCarousel() {
  const [items, setItems] = useState<Testimonial[]>(seedTestimonials);

  useEffect(() => {
    fetchApprovedTestimonials().then(({ data }) => {
      if (data && data.length > 0) {
        setItems([...(data as Testimonial[]), ...seedTestimonials]);
      }
    });
  }, []);

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {items.map((t, i) => (
        <TestimonialCard key={t.id} t={t} index={i} />
      ))}
    </div>
  );
}
