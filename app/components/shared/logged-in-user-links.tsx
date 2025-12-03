"use client";
import { ClipboardList, ListChecksIcon, LogInIcon, Settings2, User2Icon } from "lucide-react";
import { signOut } from "next-auth/react"
import Link from "next/link"

export const LoggedInUserLinks = ()=>{
  return (
    <div className="absolute top-12 right-4 w-96 lg:w-64 z-[999px] bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="py-2">
        <Link
          href="/in/user/profile"
          className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150"
        >
          <User2Icon size={18} className="shrink-0" />
          <span className="font-medium">My Profile</span>
        </Link>
        
        <Link
          href="/in/user/preferences"
          className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150"
        >
          <Settings2 size={18} className="shrink-0" />
          <span className="font-medium">My Preferences</span>
        </Link>
        
        <div className="my-2 border-t border-gray-100" />
        
        <Link
          href="/in/user/saved-jobs"
          className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150"
        >
          <ListChecksIcon size={18} className="shrink-0" />
          <span className="font-medium">Saved Jobs</span>
        </Link>
        
        <Link
          href="/in/user/applications"
          className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150"
        >
          <ClipboardList size={18} className="shrink-0" />
          <span className="font-medium">My Applications</span>
        </Link>
        
        <div className="my-2 border-t border-gray-100" />
        
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="w-full flex items-center space-x-3 z-50 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors duration-150 cursor-pointer"
        >
          <LogInIcon size={18} className="shrink-0" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  )
}