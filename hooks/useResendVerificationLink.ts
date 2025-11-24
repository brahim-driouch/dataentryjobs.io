import { sendEmailVerificationLink } from '@/lib/emails';
import { useMutation } from '@tanstack/react-query';



type  SendVerificationLinkResponse = {
    message: string
}
type ResendVerificationLinkVars = {
  email: string;
  userType: 'user' | 'employer';
}
export const useResendVerificationLink = () => {
  return useMutation<SendVerificationLinkResponse , Error, ResendVerificationLinkVars>({
    mutationFn: async (userData:{email:string, userType:'user' | 'employer'}) => {
      const url = `${userData.userType === 'user' ? '/api/auth/resend-verification-link/users' : '/api/auth/resend-verification-link/employers'}`
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
       const data = await response.json();
      if (!response.ok) {
      
        
        throw new Error(data.message || 'Failed to send verification link');
      }

      return  data
    },
  });
};