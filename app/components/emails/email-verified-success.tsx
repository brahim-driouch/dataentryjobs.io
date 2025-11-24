"use client";
import Link from "next/link"
import { useSession } from "next-auth/react"
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export const EmailVerifiedSuccess = () => {
  const { data: session, update, status } = useSession();
  const router = useRouter();
  const hasUpdatedRef = useRef(false);

  useEffect(() => {
    const forceSessionUpdate = async () => {
      if (status === "authenticated" && !hasUpdatedRef.current) {
        hasUpdatedRef.current = true;
        
        console.log("🔄 Forcing session update...");
        
        // Force a session update with a custom flag
        await update({ 
          refresh: true,
          timestamp: Date.now() 
        });
        
        // Wait a bit and refresh the page to update server components
        setTimeout(() => {
          console.log("🔄 Refreshing page...");
          router.refresh(); // This will trigger server components to re-render
        }, 1000);
      }
    };

    forceSessionUpdate();
  }, [status, update, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Updating your session...</p>
        </div>
      </div>
    );
  }

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
          Your email has been verified. You can now access all features of your account.
        </p>
        <div className="space-y-3">
          <Link 
            href={session?.user?.userType === 'employer' ? '/in/employer' : '/in/user'}
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Go to Dashboard
          </Link>
          <Link 
            href="/jobs" 
            className="block w-full border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 rounded-lg transition-colors"
          >
            Browse Jobs
          </Link>
        </div>
      </div>
    </div>
  );
}