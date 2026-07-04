import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected) {
    return NextResponse.json(
      { error: 'ADMIN_PASSWORD is not set on the server. Add it to your environment variables.' },
      { status: 500 }
    );
  }

  let password: string | undefined;
  try {
    const body = await request.json();
    password = body?.password;
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  if (password !== expected) {
    return NextResponse.json({ error: 'Incorrect password.' }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  // The cookie value is only ever compared server-side (middleware.ts) against
  // ADMIN_PASSWORD — it never appears in client-side JS or NEXT_PUBLIC_ vars.
  response.cookies.set('pf_admin_auth', expected, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 8, // 8 hour session
  });
  return response;
}
