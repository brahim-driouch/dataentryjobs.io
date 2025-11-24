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
    "/getting-started/employers",
    "/auth/verify-email/users",
    "/auth/verify-email/employers",
    "/auth/logout/employers",
    "/auth/logout/users",
    
  ];

  const authRoutes = [
    "/auth/login/employer",
    "/auth/register/employer", 
    "/auth/login/users",
    "/auth/register/users",
  ];

  const protectedRoutes = {
    employer: "/in/employer",
    user: "/in/user",
  };

  const verificationRoutes = {
    employer: "/auth/resend-verification-link/employer",
    user: "/auth/resend-verification-link/user",
  };
   const logoutRoutes = [
    "/auth/verify-email/employers",
    "/auth/verify-email/users",
    "/api/auth/logout/employers",
    "/api/auth/logout/users",
  ];


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

 


  const isLogoutRoute = logoutRoutes.some(route => 
    pathname === route || pathname.startsWith(route + "/")
  );



  // ========================================
  // 2. ALLOW LOGOUT/VERIFICATION ROUTES - Bypass all checks
  // ========================================
  if (isLogoutRoute) {
    return NextResponse.next();
  }

  // ========================================
  // 3. PUBLIC ROUTES - Allow everyone
  // ========================================
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // ========================================
  // 4. HANDLE NOT LOGGED IN USERS
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
      return NextResponse.redirect(new URL("/auth/getting-started/employers", req.url));
    }
    
    // Employer but no company - redirect to company setup
    if (!hasCompany(session)) {
      return NextResponse.redirect(new URL("/auth/getting-started/employers", req.url));
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