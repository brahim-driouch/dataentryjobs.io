"use client";

import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import FormInput from './form-input';
import { validateNewEmployer } from '@/lib/data-validator';
import { showErrors } from '@/utils/show-errors';
import { useEmployerRegistration } from '@/hooks/useEmployerRegistration';
import { toast } from 'react-toastify';

interface EmployerSignupFormProps {
  setIsLogin: (isLogin: boolean) => void;
}

const EmployerSignupForm = ({ setIsLogin }: EmployerSignupFormProps) => {
  const [errors, setErrors] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
    fullName: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const mutation = useEmployerRegistration()
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { isValid, errors: _errors } = validateNewEmployer(
        formData.fullName,
        formData.email,
        formData.password,
        formData.confirmPassword,
        formData.company
      );

      if (!isValid) {
        setErrors(_errors);
        return;
      }
      // Proceed with signup logic
      await mutation.mutateAsync(formData)
      toast.success("registered successfully, check your email for verification link",{
        autoClose: 5000,
        position: "top-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })
    } catch (error) {
      setErrors([error instanceof Error ? error.message : typeof error === "string" ? error : "Something bad happened, try again later"])
      console.error('Signup error:', error);
    }
  };
  



// side effect show error toast
  useEffect(() => {
    if (errors.length > 0) {
      showErrors(errors,setErrors);
    }
  }, [errors]);



  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
        <p className="text-gray-600 mt-2">Sign up as an employer</p>
      </div>


      <form onSubmit={handleSubmit} className="space-y-6">
        <FormInput
          label="Full Name"
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          placeholder="Enter your full name"
        />
        
        <FormInput
          label="Company Name"
          type="text"
          name="company"
          value={formData.company}
          onChange={handleInputChange}
          placeholder="Enter your company name"
          icon="building"
        />

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

        <FormInput
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          placeholder="Confirm your password"
          icon="lock"
          showPassword={showConfirmPassword}
          onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
        />

        <button
          type="submit"
          className="w-full bg-linear-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
        >
          Create Employer Account
          <ArrowRight className="w-5 h-5" />
        </button>

        <p className="text-center text-gray-600">
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => setIsLogin(true)}
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Sign in here
          </button>
        </p>
      </form>
    </div>
  );
};

export default EmployerSignupForm;