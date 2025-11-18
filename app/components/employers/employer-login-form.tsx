"use client";

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import FormInput from './form-input';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login hit');
    // Add login validation logic here
    try {
      // Validate login data
      // const { isValid, errors: _errors } = validateEmployerLogin(formData.email, formData.password);
      // if (!isValid) {
      //   setErrors(_errors);
      //   return;
      // }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
          type="submit"
          className="w-full bg-linear-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
        >
          Sign In to Account
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