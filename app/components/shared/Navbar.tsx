// components/Navigation/Navbar.tsx
'use client';
import { useState } from 'react';
import Link from 'next/link';
import { mainNavigation } from '@/constants/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const status  = null;
  const session = {
    user:{
        role:null
    }
  };
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="shrink-0">
            <Link href="/" className="text-xl font-bold text-blue-600">
              DataEntryJobs.io
            </Link>
          </div>

          {/* Main Navigation - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {mainNavigation.map((item) => (
              <div key={item.label} className="relative group">
                <Link
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  {item.label}
                </Link>
                {/* Dropdown menu would go here */}
              </div>
            ))}
          </div>

          {/* Right Side - Auth & Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {status === 'authenticated' ? (
              <>
                {session?.user?.role === 'employer' ? (
                  <>
                    <Link
                      href="/employer/dashboard"
                      className="text-gray-700 hover:text-blue-600"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/employer/post-job"
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                      Post a Job
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href="/user/profile"
                      className="text-gray-700 hover:text-blue-600"
                    >
                      My Profile
                    </Link>
                    <Link
                      href="/user/saved-jobs"
                      className="text-gray-700 hover:text-blue-600"
                    >
                      Saved Jobs
                    </Link>
                  </>
                )}
                <button
                  
                  className="text-gray-700 hover:text-blue-600"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/employer/login"
                  className="text-gray-700 hover:text-blue-600"
                >
                  For Employers
                </Link>
                <Link
                  href="/auth/users/login"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {mainNavigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}