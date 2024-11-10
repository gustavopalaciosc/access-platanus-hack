// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('supabase-auth-token');
  const protectedRoutes = ['/scan', '/participants', '/home']; // Add your protected routes here
  const loginRoute = '/login'; // Login route

  // If user is trying to access a protected route without a token, redirect to login
  if (protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route)) && !token) {
    const loginUrl = new URL(loginRoute, req.url);
    return NextResponse.redirect(loginUrl);
  }

  // If user is already authenticated and tries to go to login, redirect to home
  if (req.nextUrl.pathname === loginRoute && token) {
    const homeUrl = new URL('/home', req.url);
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}
