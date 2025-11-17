"use client";
import { useResendVerificationLink } from "@/hooks/useResendVerificationLink";
import { AlertCircle, ArrowLeft, CheckCircle2, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";




export const ResendVerificationLinkForm =()=>{
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const mutation = useResendVerificationLink();
  
  const handleResend = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
   const emailREgex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || email.trim() === '' || !emailREgex.test(email)) {
          setMessage({ type: 'error', text: 'Please enter a valid email address' });
          return;
        }

      await mutation.mutateAsync(email.trim().toLowerCase());
                  

      setMessage({ type: 'success', text: 'Verification email sent successfully' });
    } catch (error) {
      setMessage({ type: 'error', text: mutation?.error?.message || 'Failed to send verification link' });
    }
  };

  return (
    <div className="">
      <div className="max-w-md w-full">
        {/* Back Button */}
        <Link 
          href="/auth/login/users" 
          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Login
        </Link>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Resend Verification Email
            </h1>
            <p className="text-gray-600">
              Enter your email address and we'll send you a new verification link.
            </p>
          </div>

          {/* Success Message */}
          {message && message.type === 'success' && (
              <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
            <p className="text-sm text-green-800">
              Verification email sent! Please check your inbox and spam folder.
            </p>
          </div>
          )}

          {/* Error Message */}
          {message && message.type === 'error' && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <p className="text-sm text-red-800">{message.text}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleResend} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="you@company.com"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>
            </div>



            {mutation.isPending ? (
            <button
              disabled
              className="w-full bg-blue-400 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2"
            >
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Sending...
            </button>
            ) : (
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <Mail className="w-5 h-5" />
                Resend Verification Email
              </button>
            )}
            

           
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Don't have an account?</span>
            </div>
          </div>

          {/* Sign Up Link */}
          <Link
            href="/signup"
            className="block w-full text-center border-2 border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600 font-semibold py-3 rounded-xl transition-all"
          >
            Create Account
          </Link>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Need help? <a href="/contact" className="text-blue-600 hover:text-blue-700 font-semibold">Contact support</a>
        </p>
      </div>
    </div>
  );
}