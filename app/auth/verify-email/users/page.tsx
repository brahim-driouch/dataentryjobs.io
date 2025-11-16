import { verifyToken } from "@/lib/jwt";
import Link from "next/link";

type SearchParams = {
 searchParams: Promise<{ [key: string]: string | string[] | undefined }>
};

export default async function UsersEmailVerificationPage({ searchParams }: SearchParams) {
  const { token } = (await searchParams) ;

  if (!token) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Invalid Verification Link</h1>
          <p className="text-gray-600 mb-6">
            The verification link is missing or incomplete. Please check your email and try again.
          </p>
          <Link 
            href="/signup" 
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            Return to Sign Up
          </Link>
        </div>
      </div>
    );
  }

  const result = await verifyToken(token as string);

  if (!result.isValid) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Verification Failed</h1>
          <p className="text-gray-600 mb-4">
            This verification link has expired or is invalid. Please request a new verification email.
          </p>
          <div className="space-y-3">
            <Link 
              href="/login" 
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              Go to Login
            </Link>
            <Link 
              href="/resend-verification" 
              className="block w-full border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 rounded-lg transition-colors"
            >
              Resend Verification Email
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // If you want to mark the user as verified in your database, do it here
  // await markUserAsVerified(result.userId);

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
            href="/dashboard" 
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