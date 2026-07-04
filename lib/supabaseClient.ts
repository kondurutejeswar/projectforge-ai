import { createClient } from '@supabase/supabase-js';

/**
 * ─────────────────────────────────────────────────────────────
 *  SUPABASE SETUP
 *  1. Create a project at https://supabase.com
 *  2. Copy your Project URL + anon public key into .env.local
 *     (see .env.local.example)
 *  3. Run the SQL below in the Supabase SQL editor to create tables:
 *
 *  create table inquiries (
 *    id uuid primary key default gen_random_uuid(),
 *    full_name text not null,
 *    college text not null,
 *    project_title text not null,
 *    email text not null,
 *    whatsapp text not null,
 *    message text,
 *    created_at timestamp with time zone default now()
 *  );
 *
 *  create table testimonials (
 *    id uuid primary key default gen_random_uuid(),
 *    name text not null,
 *    college text not null,
 *    project text not null,
 *    rating int not null check (rating between 1 and 5),
 *    review text not null,
 *    approved boolean default false,
 *    created_at timestamp with time zone default now()
 *  );
 *
 *  -- Only show approved reviews to the public:
 *  alter table testimonials enable row level security;
 *  create policy "public read approved" on testimonials
 *    for select using (approved = true);
 *  create policy "public insert" on testimonials
 *    for insert with check (true);
 *
 *  alter table inquiries enable row level security;
 *  create policy "public insert" on inquiries
 *    for insert with check (true);
 * ─────────────────────────────────────────────────────────────
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

// If env vars are missing (e.g. local dev without Supabase configured yet),
// `isSupabaseConfigured` lets forms fall back to the EmailJS-only path
// instead of throwing at import time.
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export interface InquiryPayload {
  full_name: string;
  college: string;
  project_title: string;
  email: string;
  whatsapp: string;
  message: string;
}

export interface TestimonialPayload {
  name: string;
  college: string;
  project: string;
  rating: number;
  review: string;
}

export async function submitInquiry(payload: InquiryPayload) {
  if (!supabase) {
    console.warn('Supabase not configured — inquiry not persisted:', payload);
    return { error: null, skipped: true };
  }
  const { error } = await supabase.from('inquiries').insert([payload]);
  return { error, skipped: false };
}

export async function submitTestimonial(payload: TestimonialPayload) {
  if (!supabase) {
    console.warn('Supabase not configured — testimonial not persisted:', payload);
    return { error: null, skipped: true };
  }
  const { error } = await supabase
    .from('testimonials')
    .insert([{ ...payload, approved: false }]);
  return { error, skipped: false };
}

export async function fetchApprovedTestimonials() {
  if (!supabase) return { data: [], error: null };
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('approved', true)
    .order('created_at', { ascending: false });
  return { data: data ?? [], error };
}
