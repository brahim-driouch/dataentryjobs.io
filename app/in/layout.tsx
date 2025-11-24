"use client";
import { useSession } from "next-auth/react";
import { VerificationBanner } from "@/app/components/shared/verification-banner";

export default function InLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return  <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </div>;
  }

  const showBanner = session?.user && !session.user.isVerified;

  return (
    <>
      {showBanner && <VerificationBanner userType={session?.user?.userType} />}
      {children}
    </>
  );
}