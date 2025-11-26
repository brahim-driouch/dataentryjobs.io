// hooks/useUserLogging.ts
import { EmployerLogin } from '@/types/employer';
import { useMutation } from '@tanstack/react-query';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export const useEmployerLogin = () => {
  const router = useRouter();
  
  return useMutation<any, Error, EmployerLogin>({
    mutationFn: async (userData) => {
      
      const response = await signIn('employer-login', { 
        email: userData.email,
        password: userData.password,
        redirect: false,
      });


      if (response?.error) {
        throw new Error("Invalid email or password");
      }

      if (!response?.ok) {
        throw new Error('Invalid email or password');
      }

      return response;
    },
    onSuccess: () => {
      router.push('/in/employers');
      router.refresh();
    },
    onError: (error) => {
      console.log("🔴 Mutation onError:", error.message);
      // ❌ DON'T re-throw here - just log it
      // The error is already handled in the component's catch block
    }
  });
};