import { Availability, IPersonalInfo, RemotePreference } from "@/types/profile";
import { IUserLocation } from "@/types/user";
import { useState } from "react";
import { MapPin, Phone, Mail, User, Briefcase, DollarSign, Globe, Home, ChevronDown, Save } from "lucide-react";
import countries from "@/assets/countries.json";
import { useUpdatePersonalInfo } from "@/hooks/users/useUpdatePeersonalInfo";
import { useSession } from "next-auth/react";
import { dataTransformerToSnakeCase } from "@/utils/data-transformer";
import { showSuccess } from "@/utils/showSuccess";
import { showErrors } from "@/utils/show-errors";

export type PersonalInfoFormProps = {
  personalInfo: {
    fullName: string;
    professionalTitle?: string;
    email: string;
    summary?: string;
    phone?: string;
    location: IUserLocation;
    availability: Availability;
    remotePreference: RemotePreference;
    willingToRelocate: boolean;
    expectedSalaryMin: number;
    expectedSalaryMax: number;
    salaryCurrency: string;
  };
};

export default function PersonalInfoForm({ personalInfo }: PersonalInfoFormProps) {

  // session
  const session = useSession();
  if(!session)return null;
  const id = session.data?.user?.id;

  //...rest
  const [formData, setFormData] = useState(personalInfo);
  // mutation 
      const mutation = useUpdatePersonalInfo(id as string,dataTransformerToSnakeCase(formData) as IPersonalInfo);

  const handlePersonalInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    
    if (name === "fullName" || name === "email") return;
    if(name === "country") {
      setFormData({
        ...formData,
        location: {
          ...formData.location,
          country: value,
        },
      });
      return;
    }
    
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSaveProfileInfo =async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
    await  mutation.mutateAsync();
   
    } catch (error) {
      console.log(error);
      showErrors(["Error updating profile, please check your inputs"],()=>{}); 
    }

  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Personal Information
        </h2>
        <p className="text-gray-600">
          Basic details about yourself and how employers can reach you
        </p>
      </div>

      {/* Basic Information */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <User size={20} className="text-blue-600" />
          Basic Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                disabled
                type="text"
                name="fullName"
                value={formData.fullName}
                className="w-full pl-10 pr-4 py-3 border bg-gray-50 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-not-allowed"
                placeholder="John Doe"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Contact support to change your name
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Professional Title
            </label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                name="professionalTitle"
                value={formData.professionalTitle}
                onChange={handlePersonalInfoChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="e.g., Senior Data Entry Specialist"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                disabled
                type="email"
                name="email"
                value={formData.email}
                className="w-full pl-10 pr-4 py-3 border bg-gray-50 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-not-allowed"
                placeholder="john@example.com"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Your verified email address
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handlePersonalInfoChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" size={18} />
              <select
                name="country"
                value={formData.location?.country}
                onChange={handlePersonalInfoChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white cursor-pointer"
              >
                <option value="">Select a country</option>
                {countries.map((country) => (
                  <option key={country.code} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
              {/* Custom dropdown arrow */}
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <ChevronDown size={20} className="text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Summary */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Briefcase size={20} className="text-blue-600" />
          Professional Summary
        </h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            About You
          </label>
          <textarea
            name="summary"
            value={formData.summary}
            onChange={handlePersonalInfoChange}
            rows={5}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
            placeholder="Tell employers about your experience, skills, and what makes you a great candidate..."
          />
          <div className="flex justify-between items-center mt-2">
            <p className="text-xs text-gray-500">
              Write a compelling summary to attract employers
            </p>
            <p className="text-xs text-gray-500">
              {formData.summary?.length || 0} characters
            </p>
          </div>
        </div>
      </div>

      {/* Work Preferences */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Globe size={20} className="text-blue-600" />
          Work Preferences
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Availability
            </label>
            <div className="relative">
              <select
                name="availability"
                value={formData.availability}
                onChange={handlePersonalInfoChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white pr-10"
              >
                <option value="immediately">Available Immediately</option>
                <option value="two_weeks">Available in 2 Weeks</option>
                <option value="one_month">Available in 1 Month</option>
                <option value="not_looking">Not Currently Looking</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Remote Preference
            </label>
            <div className="relative">
              <select
                name="remotePreference"
                value={formData.remotePreference}
                onChange={handlePersonalInfoChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white pr-10"
              >
                <option value="remote">Remote Only</option>
                <option value="hybrid">Hybrid</option>
                <option value="onsite">On-site Only</option>
                <option value="flexible">Flexible</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="willingToRelocate"
              checked={formData.willingToRelocate}
              onChange={handlePersonalInfoChange}
              className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
            <div>
              <span className="text-sm font-medium text-gray-900 flex items-center gap-2">
                <Home size={16} className="text-blue-600" />
                Willing to Relocate
              </span>
              <p className="text-xs text-gray-600 mt-1">
                I'm open to relocating for the right opportunity
              </p>
            </div>
          </label>
        </div>
      </div>

      {/* Salary Expectations */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <DollarSign size={20} className="text-blue-600" />
          Salary Expectations
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Minimum Salary
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="number"
                name="expectedSalaryMin"
                value={formData.expectedSalaryMin}
                onChange={handlePersonalInfoChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="30000"
                min="0"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Maximum Salary
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="number"
                name="expectedSalaryMax"
                value={formData.expectedSalaryMax}
                onChange={handlePersonalInfoChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="50000"
                min="0"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Currency
            </label>
            <div className="relative">
              <select
                name="salaryCurrency"
                value={formData.salaryCurrency}
                onChange={handlePersonalInfoChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white pr-10"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="CAD">CAD ($)</option>
                <option value="AUD">AUD ($)</option>
                <option value="INR">INR (₹)</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-4">
          <p className="text-xs text-gray-600">
            💡 <strong>Tip:</strong> Providing salary expectations helps employers match you with suitable positions. This information is optional and won't be publicly visible.
          </p>
        </div>
         <div className="flex justify-end">
         <button
                onClick={(e)=>handleSaveProfileInfo(e)}
                className="flex items-center gap-2 px-6 py-2.5 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all font-semibold shadow-sm hover:shadow-md"
              >
                <Save size={18} />
                <span>Save</span>
              </button>
         </div>
      </div>
    </div>
  );
}