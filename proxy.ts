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
    "/resources", // Fixed typo: "ressources" → "resources"
  ];

  const authRoutes = {
    employerLogin: "/auth/login/employer",
    employerRegister: "/auth/register/employer",
    userLogin: "/auth/login/user",
    userRegister: "/auth/register/user",
  };

  const protectedRoutes = {
    employer: "/in/employer",
    user: "/in/user",
  };

  const verificationRoutes = {
    employer: "/auth/resend-verification-link/employer",
    user: "/auth/resend-verification-link/user",
  };

  // Check route types
  const isPublicRoute = publicRoutes.some(route => pathname === route || pathname.startsWith(route));
  const isEmployerAuthRoute = pathname.startsWith("/auth/login/employer") || pathname.startsWith("/auth/register/employer");
  const isUserAuthRoute = pathname.startsWith("/auth/login/user") || pathname.startsWith("/auth/register/user");
  const isAnyAuthRoute = isEmployerAuthRoute || isUserAuthRoute;
  const isEmployerProtectedRoute = pathname.startsWith(protectedRoutes.employer);
  const isUserProtectedRoute = pathname.startsWith(protectedRoutes.user);
  const isAnyProtectedRoute = isEmployerProtectedRoute || isUserProtectedRoute;
  const isVerificationRoute = pathname.startsWith("/resend-verification-link");

  // ========================================
  // 2. PUBLIC ROUTES - Allow everyone
  // ========================================
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // ========================================
  // 3. NOT LOGGED IN - Redirect to home
  // ========================================
  if (!isLoggedIn && isAnyProtectedRoute) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // ========================================
  // 4. LOGGED IN BUT NOT VERIFIED
  // ========================================
  if (isLoggedIn && !isVerified(session)) {
    // Don't redirect if already on verification page
    if (isVerificationRoute) {
      return NextResponse.next();
    }

    // Redirect to appropriate verification page
    if (isEmployer(session)) {
      return NextResponse.redirect(new URL(verificationRoutes.employer, req.url));
    } else {
      return NextResponse.redirect(new URL(verificationRoutes.user, req.url));
    }
  }

  // ========================================
  // 5. LOGGED IN - Redirect away from auth routes
  // ========================================
  if (isLoggedIn && isAnyAuthRoute) {
    if (isEmployer(session) && hasCompany(session)) {
      return NextResponse.redirect(new URL(protectedRoutes.employer, req.url));
    } else if (isUser(session)) {
      return NextResponse.redirect(new URL(protectedRoutes.user, req.url));
    }
  }

  // ========================================
  // 6. PROTECT EMPLOYER ROUTES
  // ========================================
  if (isEmployerProtectedRoute) {
    const userIsEmployer = isEmployer(session);
    const userHasCompany = hasCompany(session);

    if (!isLoggedIn || !userIsEmployer || !userHasCompany) {
      // Wrong user type or not authorized
      if (isLoggedIn && isUser(session)) {
        // Logged in as user, redirect to user area
        return NextResponse.redirect(new URL(protectedRoutes.user, req.url));
      } else {
        // Not logged in or invalid session
        return NextResponse.redirect(new URL(authRoutes.employerLogin, req.url));
      }
    }
  }

  // ========================================
  // 7. PROTECT USER ROUTES
  // ========================================
  if (isUserProtectedRoute) {
    const userIsRegularUser = isUser(session);

    if (!isLoggedIn || !userIsRegularUser) {
      // Wrong user type or not authorized
      if (isLoggedIn && isEmployer(session)) {
        // Logged in as employer, redirect to employer area
        return NextResponse.redirect(new URL(protectedRoutes.employer, req.url));
      } else {
        // Not logged in or invalid session
        return NextResponse.redirect(new URL(authRoutes.userLogin, req.url));
      }
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