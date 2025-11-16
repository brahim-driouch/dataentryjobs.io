// hooks/useUserLogging.ts
import { userLogin } from '@/types/user';
import { useMutation } from '@tanstack/react-query';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export const useUserLogging = () => {
  const router = useRouter();
  
  return useMutation<any, Error, userLogin>({
    mutationFn: async (userData) => {
      const response = await signIn('user-login', { // ✅ Correct ID
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
      router.push('/in/jobs'); // User dashboard
      router.refresh();
    },
    onError: (error) => {
     throw new Error(error.message || 'Login failed');
    }
  });
};