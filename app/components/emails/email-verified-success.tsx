"use client";
import { useEffect } from "react";
import { signOut } from "next-auth/react";

export const EmailVerifiedSuccess = () => {
  useEffect(() => {
    // Sign out and redirect after 3 seconds
    const timer = setTimeout(async () => {
      await signOut({ 
        redirect: true, 
        callbackUrl: "/getting-started/employers" 
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Email Verified Successfully!</h1>
        <p className="text-gray-600 mb-6">
          Your email has been verified. Signing you out and redirecting to login...
        </p>
        <p className="text-sm text-gray-500">
          Redirecting in 3 seconds...
        </p>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mt-4"></div>
      </div>
    </div>
  );
}