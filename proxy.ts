// middleware.ts
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isOnEmployerRoute = req.nextUrl.pathname.startsWith('/employer');
  const isOnAuthRoute = req.nextUrl.pathname.startsWith('/login') || 
                         req.nextUrl.pathname.startsWith('/signup');

  // Protect employer routes
  if (isOnEmployerRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Redirect logged-in users away from auth pages
  if (isOnAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL('/employer/dashboard', req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};