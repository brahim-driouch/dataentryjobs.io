// Client component for auto-redirect and sign out
"use client";

import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export const AutoRedirect = () => {
  useEffect(() => {
    const signOutAndRedirect = async () => {
      try {
        // Call sign out API
       signOut()
      } catch (error) {
        console.error('Sign out error:', error);
      } finally {
        // Redirect to login after 3 seconds
        setTimeout(() => {
          redirect('/getting-started/employers');
        }, 3000);
      }
    };

    signOutAndRedirect();
  }, []);

  return (
    <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 mt-4">
      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
      <span>Signing out and redirecting...</span>
    </div>
  );
}