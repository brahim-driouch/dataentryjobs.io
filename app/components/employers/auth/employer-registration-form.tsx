"use client";

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import FormInput from './form-input';
import { validateNewEmployer } from '@/lib/data-validator';
import { showErrors } from '@/utils/show-errors';
import { useEmployerRegistration } from '@/hooks/employers/useEmployerRegistration';
import { toast } from 'react-toastify';

interface EmployerSignupFormProps {
  setIsLogin: (isLogin: boolean) => void;
}

const EmployerSignupForm = ({ setIsLogin }: EmployerSignupFormProps) => {
  const toastRef = useRef<HTMLDivElement>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
    fullName: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const mutation = useEmployerRegistration();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateCurrentStep = (): boolean => {
    let stepErrors: string[] = [];

    switch (currentStep) {
      case 1:
        if (!formData.fullName.trim()) {
          stepErrors.push('Full name is required');
        }
        if (!formData.company.trim()) {
          stepErrors.push('Company name is required');
        }
        break;

      case 2:
        if (!formData.email.trim()) {
          stepErrors.push('Email address is required');
        } else {
          const emailValidation = validateNewEmployer(
            'valid',
            formData.email,
            'valid',
            'valid',
            'valid'
          );
          const emailErrors = emailValidation.errors.filter(error => 
            error.toLowerCase().includes('email')
          );
          stepErrors.push(...emailErrors);
        }
        break;

      case 3:
        const passwordValidation = validateNewEmployer(
          formData.fullName,
          formData.email,
          formData.password,
          formData.confirmPassword,
          formData.company
        );
        
        stepErrors = passwordValidation.errors.filter(error => 
          !error.toLowerCase().includes('all fields') && 
          (error.toLowerCase().includes('password') || error.toLowerCase().includes('confirm'))
        );
        break;
    }

    if (stepErrors.length > 0) {
      setErrors(stepErrors);
      return false;
    }

    setErrors([]);
    return true;
  };

  const nextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setErrors([]);
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    // Final validation using your existing function
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

    try {
      await mutation.mutateAsync(formData);
      toast.success("Registered successfully, check your email for verification link", {
        autoClose: 5000,
        position: "top-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
        company: '',
        fullName: ''
      });
    } catch (error) {
      setErrors([error instanceof Error ? error.message : typeof error === "string" ? error : "Something bad happened, try again later"]);
      console.error('Signup error:', error);
    }
  };

  // Side effect show error toast
  useEffect(() => {
    if (errors.length > 0 ) {
      showErrors( errors, setErrors);
    }
  }, [errors]);

  // Progress steps
  const steps = [
    { number: 1, title: 'Personal Info' },
    { number: 2, title: 'Contact' },
    { number: 3, title: 'Security' },
    { number: 4, title: 'Review' }
  ];

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
        <p className="text-gray-600 mt-2">Sign up as an employer</p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          {steps.map((step, index) => (
            <div key={step.number} className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 font-semibold ${
                  currentStep >= step.number
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'border-gray-300 text-gray-500'
                } ${currentStep === step.number ? 'ring-2 ring-blue-200' : ''}`}
              >
                {step.number}
              </div>
              <span
                className={`text-xs mt-2 ${
                  currentStep >= step.number ? 'text-blue-600 font-medium' : 'text-gray-500'
                }`}
              >
                {step.title}
              </span>
            </div>
          ))}
        </div>
        <div className="flex">
          {steps.slice(0, -1).map((step, index) => (
            <div
              key={step.number}
              className={`flex-1 h-1 ${
                currentStep > step.number ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Remove the form tag to prevent automatic submission */}
      <div>
        {/* Step 1: Personal Information */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fadeIn">
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
          </div>
        )}

        {/* Step 2: Contact Information */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <FormInput
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email address"
              icon="mail"
            />
          </div>
        )}

        {/* Step 3: Security */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fadeIn">
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
          </div>
        )}

        {/* Step 4: Review and Submit */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-gray-50 rounded-xl p-6 space-y-4">
              <h3 className="font-semibold text-lg text-gray-900 mb-4">Review Your Information</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Full Name:</span>
                  <span className="font-medium">{formData.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Company:</span>
                  <span className="font-medium">{formData.company}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium">{formData.email}</span>
                </div>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 text-center">
              By creating an account, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className={`flex ${currentStep > 1 ? ' flex-col-reverse  justify-start' : 'justify-end'} mt-8 space-x-4`}>
          {currentStep > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="w-full mt-2 flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-all duration-200 flex-1"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          )}
          
          {currentStep < 4 ? (
            <button
              type="button"
              onClick={nextStep}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-all duration-200 flex-1 shadow-lg hover:shadow-xl"
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button" // Changed from "submit" to "button"
              onClick={handleSubmit} // Explicitly call handleSubmit
              disabled={mutation.isPending}
              className="w-full bg-linear-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {mutation.isPending ? 'Creating Account...' : 'Create Employer Account'}
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => setIsLogin(true)}
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Sign in here
          </button>
        </p>
      </div>
    </div>
  );
};

export default EmployerSignupForm;