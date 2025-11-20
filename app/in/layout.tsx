import { Suspense } from "react";
import { VerificationBanner } from "@/app/components/shared/verification-banner";
import { auth } from "@/lib/auth";

export default async function InLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const showBanner = session?.user && !session.user.isVerified;
  console.log("layout")
  return (
    <>
      {showBanner && <VerificationBanner userType={session?.user?.userType} />}
      <Suspense fallback={<div>Loading...</div>}>
        {children}
      </Suspense>
    </>
  );
}