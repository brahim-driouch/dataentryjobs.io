// app/auth/verify-email/employers/components/already-verified.tsx
import Link from "next/link";

interface AlreadyVerifiedProps {
  message: string;
}

export function AlreadyVerified({ message }: AlreadyVerifiedProps) {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Email Already Verified</h1>
        <p className="text-gray-600 mb-4">
          {message}
        </p>
        <div className="space-y-3 mt-4">
          <Link 
            href="/getting-started/employers" 
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Go to Login Now
          </Link>
        </div>
      </div>
    </div>
  );
}