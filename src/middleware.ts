
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the request is for an admin page
  if (pathname.startsWith('/admin')) {
    // Exclude the login page itself to avoid redirect loops
    if (pathname === '/admin/login') {
      return NextResponse.next();
    }

    const session = request.cookies.get('admin-session');

    // If no session cookie is found, redirect to the admin login page
    if (!session) {
      const url = new URL('/admin/login', request.url);
      url.searchParams.set('from', pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
