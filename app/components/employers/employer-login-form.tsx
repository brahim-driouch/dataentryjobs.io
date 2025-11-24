"use client";

import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import FormInput from './form-input';
import { showErrors } from '@/utils/show-errors';
import { toast } from 'react-toastify';
import { useEmployerLogin } from '@/hooks/useEmployerLogin';
import { validateLoginCredentials } from '@/lib/data-validator';

interface EmployerLoginFormProps {
  setIsLogin: (isLogin: boolean) => void;
}

const EmployerLoginForm = ({ setIsLogin }: EmployerLoginFormProps) => {
  const [errors, setErrors] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  // mutation
  const mutation = useEmployerLogin();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const {isValid, errors: validationErrors} = validateLoginCredentials(formData.email, formData.password);
      if(!isValid){
        setErrors(validationErrors);
        showErrors(validationErrors, setErrors); // ✅ Show immediately
        return;
      }

      await mutation.mutateAsync(formData);
      
      // ✅ Toast will show on successful login
      toast.success("Logged in successfully", {
        autoClose: 5000,
        position: "top-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

    } catch (error: any | Error) {
      const errorMessages = [error instanceof Error ? error.message : typeof error === "string" ? error : "Something bad happened, try again later"];
      setErrors(errorMessages);
      showErrors(errorMessages, setErrors); 
    }
  };

  useEffect(() => {
    if(errors.length > 0){
      showErrors(errors, setErrors);
    }
  }, [errors]); // Changed from errors.length

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
        <p className="text-gray-600 mt-2">Sign in to your employer account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <FormInput
          label="Email Address"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Enter your email address"
          icon="mail"
        />

        <FormInput
          label="Password"
          type={showPassword ? "text" : "password"}
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Enter your password"
          icon="lock"
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword(!showPassword)}
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
            <span className="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
          <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            Forgot password?
          </Link>
        </div>

        <button
          disabled={mutation.isPending}
          type="submit"
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {mutation.isPending ? 'Logging in...' : 'Sign In to Account'}
          <ArrowRight className="w-5 h-5" />
        </button>

        <p className="text-center text-gray-600">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={() => setIsLogin(false)}
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Sign up here
          </button>
        </p>
      </form>
    </div>
  );
};

export default EmployerLoginForm;