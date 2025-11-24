// app/auth/verify-email/employers/components/invalid-token.tsx
import Link from "next/link";

export function InvalidVerificationToken() {
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
            href="/auth/resend-verification-link/employer" 
            className="block w-full border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 rounded-lg transition-colors"
          >
            Resend Verification Email
          </Link>
        </div>
      </div>
    </div>
  );
}