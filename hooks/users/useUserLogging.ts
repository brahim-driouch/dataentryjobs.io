// hooks/useUserLogging.ts
import { UserLogin } from '@/types/user';
import { useMutation } from '@tanstack/react-query';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export const useUserLogin = () => {
  const router = useRouter();
  
  return useMutation<any, Error, UserLogin>({
    mutationFn: async (userData) => {
      console.log("🟢 Step 1: Calling signIn with email:", userData.email);
      
      const response = await signIn('user-login', { 
        email: userData.email,
        password: userData.password,
        redirect: false,
      });

      console.log("🟢 Step 2: SignIn response:", response);

      if (response?.error) {
        console.log("🔴 SignIn error:", response.error);
        throw new Error("Invalid email or password");
      }

      if (!response?.ok) {
        console.log("🔴 SignIn not OK");
        throw new Error('Invalid email or password');
      }

      console.log("✅ SignIn successful!");
      return response;
    },
    onSuccess: () => {
      console.log("✅ Mutation onSuccess - redirecting to dashboard");
      router.push('/in/user');
      router.refresh();
    },
    onError: (error) => {
      console.log("🔴 Mutation onError:", error.message);
      // ❌ DON'T re-throw here - just log it
      // The error is already handled in the component's catch block
    }
  });
};