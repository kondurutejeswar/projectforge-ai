import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseAdminConfigured } from '@/lib/supabaseAdmin';

// Note: this route is only reachable with a valid admin session cookie —
// see middleware.ts, which guards every path under /api/admin/*.

export async function GET() {
  if (!isSupabaseAdminConfigured || !supabaseAdmin) {
    return NextResponse.json(
      { error: 'Supabase service role key not configured.' },
      { status: 500 }
    );
  }

  const { data, error } = await supabaseAdmin
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function PATCH(request: NextRequest) {
  if (!isSupabaseAdminConfigured || !supabaseAdmin) {
    return NextResponse.json(
      { error: 'Supabase service role key not configured.' },
      { status: 500 }
    );
  }

  const { id, approved } = await request.json();
  if (!id || typeof approved !== 'boolean') {
    return NextResponse.json({ error: 'id and approved (boolean) are required.' }, { status: 400 });
  }

  const { error } = await supabaseAdmin.from('testimonials').update({ approved }).eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(request: NextRequest) {
  if (!isSupabaseAdminConfigured || !supabaseAdmin) {
    return NextResponse.json(
      { error: 'Supabase service role key not configured.' },
      { status: 500 }
    );
  }

  const { id } = await request.json();
  if (!id) return NextResponse.json({ error: 'id is required.' }, { status: 400 });

  const { error } = await supabaseAdmin.from('testimonials').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
