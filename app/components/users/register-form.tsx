"use client";

import { useState } from 'react';
import { 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  AlertCircle,
  CheckCircle,
  Loader2,
  MapPin,

} from 'lucide-react';
import Link from 'next/link';
import countries  from "@/assets/countries.json";
import { validateNewUser } from '@/lib/data-validator';
import { newUser } from '@/types/user';
import { useUserRegistration } from '@/hooks/users/useUserRegistration';
export const UserRegistrationForm = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    location: '',
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [success, setSuccess] = useState(false);
  const mutation = useUserRegistration();




  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    
 

  // validation
  const {isValid, errors:_errors} = validateNewUser(formData.email, formData.password, formData.confirmPassword, formData.location);
  if (!isValid) {
    setErrors(_errors);
    return;
  }
  

  if (!termsAccepted) {
      setErrors(['Please accept the terms and conditions']);
      return;
    }
    try {
    await mutation.mutateAsync(formData as newUser);
    setSuccess(true);
    } catch (err: any) {
      mutation.isError ? setErrors([mutation.error.message]) : setErrors([err.message]);
    } 
  };

  if (success) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome to DataEntryJobs.io!
          </h2>
          <p className="text-gray-600 mb-4">
            Your account has been created successfully. Please check your email for verification.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              DataEntry<span className="text-blue-600">Jobs.io</span>
            </h1>
          </Link>
          <h2 className="text-2xl font-bold text-gray-900">Create Your Account</h2>
          <p className="text-gray-600 mt-2">
            Join thousands of data entry professionals
          </p>
        </div>

        {/* Registration Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {errors && errors.length > 0 && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div className="text-sm text-red-600">
                {errors.map((error, index) => (
                  <p key={index}>{"- "}{error}</p>
                ))}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@example.com"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number (Optional)
              </label>
              
            </div>

       
          <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Location
              </label>
              <div className="relative">
                <select
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  
                >
                  <option value="">Select your location</option>
                  {countries.map((country) => (
                    <option key={country.name} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>
           

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Minimum 8 characters"
                  className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="Confirm your password"
                  className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Terms Agreement */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="flex items-start gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-0.5" 
                   
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                />
                <span className="text-sm text-gray-600">
                  I agree to the{' '}
                  <Link href="/terms" className="text-blue-600 hover:text-blue-700 font-semibold">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-blue-600 hover:text-blue-700 font-semibold">
                    Privacy Policy
                  </Link>
                  . I understand that DataEntryJobs.io will process my data in accordance with these policies.
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={mutation.isPending || !termsAccepted}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <span>Create Job Seeker Account</span>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Already have an account?</span>
            </div>
          </div>

          {/* Login Link */}
          <Link
            href="/auth/login"
            className="block w-full text-center border-2 border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600 font-semibold py-3 rounded-lg transition-all duration-200"
          >
            Sign In to Your Account
          </Link>
        </div>

        {/* Employer CTA */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Are you an employer?{' '}
            <Link 
              href="/auth/employer/register" 
              className="font-medium text-green-600 hover:text-green-500"
            >
              Post jobs and hire talent
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserRegistrationForm;