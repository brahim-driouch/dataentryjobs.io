import { newUser } from '@/types/user';
import { useMutation } from '@tanstack/react-query';



interface UserRegistrationResponse {
  message: string;
  user: {
    id: string;
    email: string;
    full_name: string;
    country?: string;
  };
}

export const useUserRegistration = () => {
  return useMutation<UserRegistrationResponse, Error, newUser>({
  
    mutationFn: async (userData) => {
      const response = await fetch('/api/auth/register/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const error = await response.json();
        
        throw new Error(error.message || 'Registration failed');
      }

      return response.json();
    },
  });
};