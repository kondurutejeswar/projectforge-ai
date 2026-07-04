import { NextRequest, NextResponse } from 'next/server';

// Paths that must stay reachable without a session (the login form itself
// and the endpoint that creates the session).
const PUBLIC_PATHS = ['/admin/login', '/api/admin/login'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const expected = process.env.ADMIN_PASSWORD;
  const cookie = request.cookies.get('pf_admin_auth')?.value;

  const authenticated = Boolean(expected) && cookie === expected;

  if (!authenticated) {
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
