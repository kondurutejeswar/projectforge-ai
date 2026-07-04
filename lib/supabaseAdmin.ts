import { createClient } from '@supabase/supabase-js';

/**
 * ⚠️ SERVER-ONLY. Do not import this file from any 'use client' component,
 * and never prefix SUPABASE_SERVICE_ROLE_KEY with NEXT_PUBLIC_.
 *
 * The service role key bypasses Row Level Security, which is what lets the
 * admin dashboard read *unapproved* testimonials (the public anon key in
 * lib/supabaseClient.ts can only ever see approved = true rows). It's only
 * ever used inside app/api/admin/* route handlers, which run server-side.
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? '';

export const isSupabaseAdminConfigured = Boolean(supabaseUrl && serviceRoleKey);

export const supabaseAdmin = isSupabaseAdminConfigured
  ? createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    })
  : null;
