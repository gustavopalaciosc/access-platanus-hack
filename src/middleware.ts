// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('supabase-auth-token');
  const protectedRoutes = ['/scan', '/participants', '/home']; // Add your protected routes here

  // Check if the current path matches any protected route
  if (protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route)) && !token) {
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
