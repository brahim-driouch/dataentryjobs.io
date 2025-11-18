// middleware.ts
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { hasCompany, isEmployer, isUser, isVerified } from "./utils/auth";

export default auth((req) => {
  const session = req.auth;
  const isLoggedIn = !!session;
  const pathname = req.nextUrl.pathname;

  // ========================================
  // 1. DEFINE ROUTE TYPES
  // ========================================
  const publicRoutes = [
    "/",
    "/jobs",
    "/resources",
    "/getting-started/employer"
    
  ];

  const authRoutes = [
    "/auth/login/employer",
    "/auth/register/employer", 
    "/auth/login/user",
    "/auth/register/user",
  ];

  const protectedRoutes = {
    employer: "/in/employer",
    user: "/in/user",
  };

  const verificationRoutes = {
    employer: "/auth/resend-verification-link/employer",
    user: "/auth/resend-verification-link/user",
  };

  // Check route types
  const isPublicRoute = publicRoutes.some(route => 
    pathname === route || pathname.startsWith(route + "/")
  );
  const isAuthRoute = authRoutes.some(route => 
    pathname === route || pathname.startsWith(route + "/")
  );
  const isEmployerProtectedRoute = pathname.startsWith(protectedRoutes.employer);
  const isUserProtectedRoute = pathname.startsWith(protectedRoutes.user);
  const isAnyProtectedRoute = isEmployerProtectedRoute || isUserProtectedRoute;
  const isVerificationRoute = pathname.startsWith("/auth/resend-verification-link");

  console.log('Middleware Debug:', {
    pathname,
    isLoggedIn,
    isPublicRoute,
    isAuthRoute,
    isEmployerProtectedRoute,
    isUserProtectedRoute
  });

  // ========================================
  // 2. PUBLIC ROUTES - Allow everyone
  // ========================================
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // ========================================
  // 3. HANDLE NOT LOGGED IN USERS
  // ========================================
  if (!isLoggedIn) {
    // Allow access to auth routes
    if (isAuthRoute) {
      return NextResponse.next();
    }
    
    // Redirect protected routes to home
    if (isAnyProtectedRoute) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    
    // For any other non-public routes, redirect to home
    return NextResponse.redirect(new URL("/", req.url));
  }

  // From this point, user IS logged in
  // ========================================
  // 4. HANDLE VERIFICATION STATUS
  // ========================================
  if (!isVerified(session)) {
    // Allow verification routes
    if (isVerificationRoute) {
      return NextResponse.next();
    }

    // Redirect to verification page based on user type
    if (isEmployer(session)) {
      return NextResponse.redirect(new URL(verificationRoutes.employer, req.url));
    } else {
      return NextResponse.redirect(new URL(verificationRoutes.user, req.url));
    }
  }

  // From this point, user IS logged in AND verified
  // ========================================
  // 5. REDIRECT AWAY FROM AUTH ROUTES
  // ========================================
  if (isAuthRoute) {
    if (isEmployer(session) && hasCompany(session)) {
      return NextResponse.redirect(new URL("/in/employer", req.url));
    } else if (isUser(session)) {
      return NextResponse.redirect(new URL("/in/user", req.url));
    }
    // If employer doesn't have company yet, let them continue to auth
    return NextResponse.next();
  }

  // ========================================
  // 6. PROTECT EMPLOYER ROUTES
  // ========================================
  if (isEmployerProtectedRoute) {
    if (!isEmployer(session)) {
      // Wrong user type - redirect based on actual user type
      if (isUser(session)) {
        return NextResponse.redirect(new URL("/in/user", req.url));
      }
      // Not an employer at all
      return NextResponse.redirect(new URL("/auth/login/employer", req.url));
    }
    
    // Employer but no company - redirect to company setup
    if (!hasCompany(session)) {
      return NextResponse.redirect(new URL("/auth/register/employer/company", req.url));
    }
  }

  // ========================================
  // 7. PROTECT USER ROUTES  
  // ========================================
  if (isUserProtectedRoute) {
    if (!isUser(session)) {
      // Wrong user type - redirect based on actual user type
      if (isEmployer(session)) {
        return NextResponse.redirect(new URL("/in/employer", req.url));
      }
      // Not a user at all
      return NextResponse.redirect(new URL("/auth/login/user", req.url));
    }
  }

  // ========================================
  // 8. ALLOW ALL OTHER ROUTES
  // ========================================
  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};