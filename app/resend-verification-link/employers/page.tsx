

import { ResendVerificationLinkForm } from "@/app/components/users/resend-verification-link-form";


export default function ResendVerificationPage() {
  
    return <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <ResendVerificationLinkForm userType="employer" />
    </div>
}