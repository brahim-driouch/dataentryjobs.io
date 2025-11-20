
"use client";
import { Mail, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface VerificationBannerProps {
    userType: 'employer' | 'user' ;
}
export const VerificationBanner = ({userType}: VerificationBannerProps) => {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <div className=" top-0 left-0 z-[999px] w-full  bg-linear-to-r from-amber-500 to-orange-500 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-3 flex-1">
                        <div className="shrink-0">
                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                <Mail className="w-5 h-5 text-white" />
                            </div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-white font-medium text-sm sm:text-base">
                                Verify your email address to complete your registration
                            </p>
                            <p className="text-white/90 text-xs sm:text-sm mt-0.5">
                                Check your inbox for a verification link
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                        <Link  href={`/resend-verification-link/${userType === 'employer' ? 'employers' : 'users'}`}className="bg-white text-orange-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-50 transition-colors shadow-sm">
                            Resend Email
                        </Link>
                        <button 
                            onClick={() => setIsVisible(false)}
                            className="text-white/80 hover:text-white p-1 rounded transition-colors"
                            aria-label="Dismiss banner"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};