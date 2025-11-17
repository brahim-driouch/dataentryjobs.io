import { sendEmailVerificationLink } from '@/lib/emails';
import { useMutation } from '@tanstack/react-query';



type  SendVerificationLinkResponse = {
    message: string
}

export const useResendVerificationLink = () => {
  return useMutation<SendVerificationLinkResponse , Error, string>({
    mutationFn: async (userEmail) => {
      const response = await fetch('/api/auth/resend-verification-link/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({userEmail}),
      })
       const data = await response.json();
      if (!response.ok) {
      
        
        throw new Error(data.message || 'Failed to send verification link');
      }

      return  data
    },
  });
};