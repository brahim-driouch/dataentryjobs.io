// components/Navigation/Navbar.tsx
'use client';
import { useState } from 'react';
import Link from 'next/link';
import { mainNavigation } from '@/constants/navigation';
import { useSession, signOut } from 'next-auth/react';
import { LoggedInUserLinks } from './logged-in-user-links';
import { X } from 'lucide-react';



const AuthLinks =()=>{
  return (
  
  <>
       <Link
                      href="/getting-started/employer"
                      className="text-gray-700 hover:text-blue-600"
                    >
                      For Employers
                    </Link>
                    <Link
                      href="/auth/login/users"
                      className="text-gray-700 hover:text-blue-600"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/auth/register/users"
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                      Sign Up
                    </Link>
  
  </>
  )
}
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();
  const [showUserMenu,setShowUserMenu]=useState(false)
  const isLoading = status === 'loading';
  const isAuthenticated = status === 'authenticated';

  const getUserNameInitials = (name:string)=>{
  const nameArray = name.split(" ")
  console.log(nameArray)
  const initals = `${nameArray[0][0]}${nameArray[1][0]}`
  return initals.toUpperCase()
  }

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Always visible */}
          <div className="shrink-0">
            <Link href="/" className="text-xl font-bold text-blue-600">
              DataEntryJobs.io
            </Link>
          </div>

          {/* Show content only when NOT loading */}
          {!isLoading && (
            <>
              {/* Main Navigation - Desktop */}
              <div className="hidden md:flex items-center space-x-8">
                {mainNavigation.map((item) => (
                  <div key={item.label} className="relative group">
                    <Link
                      href={item.href}
                      className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md  font-medium"
                    >
                      {item.label}
                    </Link>
                  </div>
                ))}
              </div>

              {/* Right Side - Auth & Actions */}
              <div className="hidden md:flex items-center space-x-4">
                {isAuthenticated && session?.user ? (
                  <>
                    {session.user.userType === 'employer' ? (
                      <>
                        <Link
                          href="/in/employer/dashboard"
                          className="text-gray-700 hover:text-blue-600"
                        >
                          Dashboard
                        </Link>
                        <Link
                          href="/in/employer/post-job"
                          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        >
                          Post a Job
                        </Link>
                      </>
                    ) : (
                      <div onClick={()=>setShowUserMenu(!showUserMenu)} className='relative w-10 h-10 rounded-full border border-gray-300 hover:border-gray-400 cursor-pointer text-blue-500 font-bold flex justify-center items-center bg-gray-200'>
                          {showUserMenu ? <X color='red' size={24}/> : getUserNameInitials(session.user.name)}
                          {showUserMenu && <LoggedInUserLinks/>}
                      </div>
                    )}
                    
                  </>
                ) : (
                  <AuthLinks/>
                )}
              </div>

              {/* Mobile menu button - Only show when not loading */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="text-gray-700 hover:text-blue-600"
                >
                  ☰
                </button>
              </div>
            </>
          )}

          
        </div>
      </div>

      {/* Mobile menu - Only show when not loading */}
      {!isLoading && isOpen && (
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

            {/* Mobile Auth Links */}
            <div className="border-t border-gray-200 pt-3 mt-3">
              {isAuthenticated && session?.user ? (
                <>
                  {session.user.userType === 'employer' ? (
                    <>
                      <Link
                        href="/in/employer/dashboard"
                        className="block px-3 py-2 text-gray-700 hover:text-blue-600"
                        onClick={() => setIsOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Link
                        href="/in/employer/post-job"
                        className="block px-3 py-2 text-gray-700 hover:text-blue-600"
                        onClick={() => setIsOpen(false)}
                      >
                        Post a Job
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/in/user/profile"
                        className="block px-3 py-2 text-gray-700 hover:text-blue-600"
                        onClick={() => setIsOpen(false)}
                      >
                        My Profile
                      </Link>
                      <Link
                        href="/in/user/saved-jobs"
                        className="block px-3 py-2 text-gray-700 hover:text-blue-600"
                        onClick={() => setIsOpen(false)}
                      >
                        Saved Jobs
                      </Link>
                    </>
                  )}
                  <button
                    onClick={() => {
                      signOut({ callbackUrl: '/' });
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/getting-started/employer"
                    className="block px-3 py-2 text-gray-700 hover:text-blue-600"
                    onClick={() => setIsOpen(false)}
                  >
                    For Employers
                  </Link>
                  <Link
                    href="/auth/login/user"
                    className="block px-3 py-2 text-gray-700 hover:text-blue-600"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/register/user"
                    className="block px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}