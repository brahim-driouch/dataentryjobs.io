"use client";
import { ListChecksIcon, LogInIcon, Settings2, User2Icon } from "lucide-react";
import { signOut } from "next-auth/react"
import Link from "next/link"


export const LoggedInUserLinks = ()=>{
  return (
    <div className="flex bg-gray-100 border border-gray-200 flex-col justify-start items-start space-y-4 py-4 px-2 text-base absolute font-normal top-10 right-4 w-64 shadow-lg">
         <Link
                          href="/in/user/profile"
                          className="w-full flex justify-start items-center space-x-2 text-gray-700 hover:text-blue-600"
                        >
                          <User2Icon size={16} />  <span> My Profile </span>
                        </Link>
                        <Link
                          href="/in/user/profile"
                          className="w-full flex justify-start items-center space-x-2 text-gray-700 hover:text-blue-600"
                        >
                          <Settings2 size={16} />  <span> My Preferences </span>
                        </Link>
                        <Link
                          href="/in/user/saved-jobs"
                          className="w-full flex justify-start items-center space-x-2 text-gray-700 hover:text-blue-600"
                        >
                         <ListChecksIcon size={16}/> <span>Saved Jobs</span>
                        </Link>
                        <button
                      onClick={() => signOut({ callbackUrl: '/' })}
                          className="w-full flex justify-start cursor-pointer items-center space-x-2 text-gray-700 hover:text-blue-600"
                    >
                      <LogInIcon size={16}/>  <span>Sign Out</span>
                    </button>
    </div>
  )
}