import { NewEmployer } from '@/types/employer';
import { useMutation } from '@tanstack/react-query';



interface UserRegistrationResponse {
  message: string;
  employer: {
    id: string;
    email: string;
    companyId:string
  };
}

export const useEmployerRegistration = () => {
  return useMutation<UserRegistrationResponse, Error, NewEmployer>({
    mutationFn: async (userData) => {
      const response = await fetch('/api/auth/register/employer', {
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