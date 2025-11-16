import { EmailVerificationTemplate } from "@/app/components/emails/email-verification-template";
import { LoginForm } from "@/app/components/users/login-form";



export default function UserLoginPage() {
    return (
        <div className="w-full py-10 min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
       
            <EmailVerificationTemplate verificationUrl="kjhk" />
            

        </div>
    );
}