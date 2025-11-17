

import { ResendVerificationLinkForm } from "@/app/components/users/resend-verification-link-form";
import { useResendVerificationLink } from "@/hooks/useResendVerificationLink";
import { AlertCircle, ArrowLeft, CheckCircle2, Mail } from "lucide-react";

export default function ResendVerificationPage() {
  
    return <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <ResendVerificationLinkForm />
    </div>
}