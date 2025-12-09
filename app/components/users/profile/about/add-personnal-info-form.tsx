import { Availability, IPersonalInfo, IPersonalInfoDTO, RemotePreference } from "@/types/profile";
import { IUserLocation } from "@/types/user";
import { useState } from "react";
import { MapPin, Phone, Mail, User, Briefcase, DollarSign, Globe, Home, ChevronDown, Save, Info, Camera, Upload, Linkedin, Github } from "lucide-react";
import countries from "@/assets/countries.json";
import { useUpdatePersonalInfo } from "@/hooks/users/useUpdatePersonnalInfo";
import { useSession } from "next-auth/react";
import { dataTransformerToSnakeCase } from "@/utils/data-transformer";
import { showSuccess } from "@/utils/showSuccess";
import { showErrors } from "@/utils/show-errors";
import { useQueryClient } from "@tanstack/react-query";
import { getInitials } from "@/utils/get-initials";

 type PersonalInfoFormProps = {
  personalInfo: IPersonalInfoDTO;
  completionPercentage: number;
  missingFields: () => string[];
  setPersonalInfo: (info: IPersonalInfoDTO) => void;
  setEditMode: (editMode: boolean) => void;
  userId:string
};
export default function AddPersonalInfoForm({ personalInfo, completionPercentage,userId, missingFields, setPersonalInfo, setEditMode }: PersonalInfoFormProps) {

  // states
  const [photoHover, setPhotoHover] = useState(false);
  // hooks
  const mutation = useUpdatePersonalInfo(userId);
  const queryClient = useQueryClient();


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setPersonalInfo({ ...personalInfo, [name]: checked });
    } else if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setPersonalInfo({
        ...personalInfo,
        [parent]: { ...(personalInfo as any)[parent], [child]: value }
      });
    } else {
      setPersonalInfo({ ...personalInfo, [name]: value });
    }
  };

  // handle photo upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // TODO: Upload to server and get URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPersonalInfo({ ...personalInfo, profilePhoto: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  // handle save
   const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const transformedData = dataTransformerToSnakeCase(personalInfo);
      await mutation.mutateAsync(transformedData as IPersonalInfo);
    showSuccess("Profile updated successfully");
    await queryClient.invalidateQueries({ queryKey: ['profile', userId] });
    setEditMode(false);
    } catch (error:Error | unknown) {
      showErrors([`Error:${error instanceof Error ? error.message : "Please try again"}`],()=>{}); 
    }
  };

 return(
          <div className="space-y-4">
            {/* Progress Indicator */}
            {completionPercentage < 100 && (
              <div className="bg-linear-to-r from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-100">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white rounded-lg">
                    <Info size={16} className="text-indigo-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900">Boost your profile visibility</p>
                    <p className="text-xs text-gray-600 mt-1">
                      {missingFields().length > 0 
                        ? `Add ${missingFields().slice(0, 3).join(', ')} to complete your profile`
                        : 'Your profile is looking great!'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Photo Upload */}
            <div className="flex justify-center">
              <div 
                className="relative group"
                onMouseEnter={() => setPhotoHover(true)}
                onMouseLeave={() => setPhotoHover(false)}
              >
                <div className="w-28 h-28 rounded-2xl overflow-hidden bg-linear-to-br from-indigo-100 to-purple-100 flex items-center justify-center relative">
                  {personalInfo.profilePhoto ? (
                    <img 
                      src={personalInfo.profilePhoto} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-3xl font-bold text-indigo-600">
                      {getInitials(personalInfo.fullName)}
                    </span>
                  )}
                  <div className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity ${photoHover ? 'opacity-100' : 'opacity-0'}`}>
                    <Camera className="text-white" size={24} />
                  </div>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="absolute -bottom-2 -right-2 p-2 bg-indigo-600 rounded-lg shadow-lg">
                  <Upload size={14} className="text-white" />
                </div>
              </div>
            </div>

            {/* Edit Form */}
            <div className="space-y-4">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-700 mb-1.5 block">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={personalInfo.fullName}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 mb-1.5 block">
                    Professional Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="professionalTitle"
                    value={personalInfo.professionalTitle}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    placeholder="Senior Software Engineer"
                  />
                </div>
              </div>

              {/* Contact */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-700 mb-1.5 block">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={personalInfo.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 mb-1.5 block">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={personalInfo.phone || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="text-xs font-semibold text-gray-700 mb-1.5 block">Location</label>
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="text"
                    name="location.city"
                    value={personalInfo.location.city}
                    onChange={handleChange}
                    className="px-3 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    placeholder="City"
                  />
                  <input
                    type="text"
                    name="location.state"
                    value={personalInfo.location.state}
                    onChange={handleChange}
                    className="px-3 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    placeholder="State"
                  />
                  <input
                    type="text"
                    name="location.country"
                    value={personalInfo.location.country}
                    onChange={handleChange}
                    className="px-3 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    placeholder="Country"
                  />
                </div>
              </div>

              {/* Summary */}
              <div>
                <label className="text-xs font-semibold text-gray-700 mb-1.5 block">
                  Professional Summary
                </label>
                <textarea
                  name="summary"
                  value={personalInfo.summary}
                  rows={4}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none transition-all"
                  placeholder="Passionate software engineer with 5+ years of experience in full-stack development..."
                />
                <p className="text-xs text-gray-500 mt-1.5">{personalInfo.summary?.length || 0} characters</p>
              </div>

              {/* Work Preferences */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-700 mb-1.5 block">Availability</label>
                  <select
                    name="availability"
                    value={personalInfo.availability}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  >
                    <option value="immediately">Immediately</option>
                    <option value="2weeks">2 Weeks</option>
                    <option value="1month">1 Month</option>
                    <option value="3months">3 Months</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 mb-1.5 block">Work Type</label>
                  <select
                    name="remotePreference"
                    value={personalInfo.remotePreference}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  >
                    <option value="remote">Remote Only</option>
                    <option value="hybrid">Hybrid</option>
                    <option value="onsite">On-site</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>
              </div>

              {/* Professional Links */}
              <div>
                <label className="text-xs font-semibold text-gray-700 mb-1.5 block">Professional Links</label>
                <div className="space-y-2">
                  <div className="relative">
                    <Linkedin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="url"
                      name="linkedinUrl"
                      value={personalInfo.linkedinUrl || ''}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                      placeholder="linkedin.com/in/yourprofile"
                    />
                  </div>
                  <div className="relative">
                    <Github size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="url"
                      name="githubUrl"
                      value={personalInfo.githubUrl || ''}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                      placeholder="github.com/yourusername"
                    />
                  </div>
                  <div className="relative">
                    <Globe size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="url"
                      name="portfolioUrl"
                      value={personalInfo.portfolioUrl || ''}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                      placeholder="yourportfolio.com"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  onClick={() => setEditMode(false)}
                  className="px-5 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-linear-to-r from-indigo-600 to-purple-600 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all flex items-center gap-2 shadow-lg shadow-indigo-500/30"
                >
                  <Save size={16} />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        
  );
}