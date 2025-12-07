"use client";

import { IPersonalInfoDTO } from "@/types/profile";
import { 
  Save, Edit2, User, Mail, Phone, MapPin, Globe, Briefcase, 
  Calendar, Info, X, Linkedin, Github, Camera, Upload
} from "lucide-react";
import { useState } from "react";

type ProfileAboutSectionProps = {
  aboutInfo: IPersonalInfoDTO;
};

export const ProfileAboutSection = ({ aboutInfo }: ProfileAboutSectionProps) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [personalInfo, setPersonalInfo] = useState<IPersonalInfoDTO>(aboutInfo);
  const [photoHover, setPhotoHover] = useState(false);

  const calculateCompletion = () => {
    const fields = [
      personalInfo.fullName,
      personalInfo.title,
      personalInfo.summary,
      personalInfo.phone,
      personalInfo.location?.country,
      personalInfo.linkedinUrl,
      personalInfo.githubUrl,
      personalInfo.profilePhoto,
    ];
    
    const filled = fields.filter(field => field && field.toString().trim().length > 0).length;
    return Math.round((filled / fields.length) * 100);
  };

  const completionPercentage = calculateCompletion();

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

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // TODO: Add API call to save data
    setEditMode(false);
  };

  const formatSalaryRange = () => {
    if (!personalInfo.expectedSalaryMin && !personalInfo.expectedSalaryMax) return null;
    const currency = personalInfo.salaryCurrency || 'USD';
    const min = personalInfo.expectedSalaryMin?.toLocaleString() || '0';
    const max = personalInfo.expectedSalaryMax?.toLocaleString() || '0';
    return `${currency} ${min} - ${max}`;
  };

  const formatLocation = () => {
    const { city, state, country } = personalInfo.location;
    const parts = [city, state, country].filter(Boolean);
    return parts.join(', ') || 'Not specified';
  };

  const missingFields = () => {
    const fields = [];
    if (!personalInfo.fullName) fields.push('Full Name');
    if (!personalInfo.title) fields.push('Title');
    if (!personalInfo.summary) fields.push('Summary');
    if (!personalInfo.phone) fields.push('Phone');
    if (!personalInfo.profilePhoto) fields.push('Photo');
    return fields;
  };

  const getInitials = () => {
    return personalInfo.fullName
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      {/* Header with linear */}
      <div className="bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 px-5 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl">
              <User className="text-white" size={18} />
            </div>
            <div>
              <h3 className="font-semibold text-white">Professional Profile</h3>
              {completionPercentage < 100 && (
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 bg-white/20 rounded-full h-1.5 w-24">
                    <div 
                      className="bg-white h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${completionPercentage}%` }}
                    />
                  </div>
                  <span className="text-xs text-white/90 font-medium">{completionPercentage}%</span>
                </div>
              )}
            </div>
          </div>
          <button
            onClick={() => setEditMode(!editMode)}
            className="p-2 rounded-xl bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all"
            aria-label={editMode ? "Close editor" : "Edit profile"}
          >
            {editMode ? <X size={18} /> : <Edit2 size={18} />}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {editMode ? (
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
                      {getInitials()}
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
                    name="title"
                    value={personalInfo.title}
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
        ) : (
          <div className="space-y-5">
            {/* Profile Header with Photo */}
            <div className="flex items-start gap-4">
              <div className="w-20 h-20 rounded-2xl overflow-hidden bg-linear-to-br from-indigo-100 to-purple-100 flex items-center justify-center shrink-0 ring-4 ring-indigo-50">
                {personalInfo.profilePhoto ? (
                  <img 
                    src={personalInfo.profilePhoto} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-2xl font-bold text-indigo-600">
                    {getInitials()}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-gray-900 text-xl">{personalInfo.fullName}</h4>
                <p className="text-indigo-600 font-semibold text-sm mt-0.5">{personalInfo.title}</p>
                {completionPercentage < 100 && (
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex-1 bg-gray-100 rounded-full h-1.5 max-w-xs">
                      <div 
                        className="bg-linear-to-r from-indigo-500 to-purple-500 h-1.5 rounded-full transition-all duration-500"
                        style={{ width: `${completionPercentage}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 font-medium">{completionPercentage}%</span>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2.5 p-3 bg-gray-50 rounded-xl">
                <Mail size={16} className="text-indigo-600 shrink-0" />
                <span className="text-sm text-gray-700 truncate">{personalInfo.email}</span>
              </div>
              {personalInfo.phone && (
                <div className="flex items-center gap-2.5 p-3 bg-gray-50 rounded-xl">
                  <Phone size={16} className="text-indigo-600 shrink-0" />
                  <span className="text-sm text-gray-700">{personalInfo.phone}</span>
                </div>
              )}
              <div className="flex items-center gap-2.5 p-3 bg-gray-50 rounded-xl">
                <MapPin size={16} className="text-indigo-600 shrink-0" />
                <span className="text-sm text-gray-700 truncate">{formatLocation()}</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 bg-gray-50 rounded-xl">
                <Calendar size={16} className="text-indigo-600 shrink-0" />
                <span className="text-sm text-gray-700 capitalize">{personalInfo.availability}</span>
              </div>
            </div>

            {/* Summary */}
            {personalInfo.summary && (
              <div className="p-4 bg-linear-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {personalInfo.summary}
                </p>
              </div>
            )}

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-linear-to-br from-indigo-50 to-indigo-100 rounded-xl p-3 text-center">
                <Briefcase size={16} className="text-indigo-600 mx-auto mb-1.5" />
                <div className="font-semibold text-gray-900 text-xs capitalize">{personalInfo.remotePreference}</div>
                <div className="text-gray-600 text-xs mt-0.5">Work Type</div>
              </div>
              
              {personalInfo.willingToRelocate && (
                <div className="bg-linear-to-br from-purple-50 to-purple-100 rounded-xl p-3 text-center">
                  <MapPin size={16} className="text-purple-600 mx-auto mb-1.5" />
                  <div className="font-semibold text-gray-900 text-xs">Relocate</div>
                  <div className="text-gray-600 text-xs mt-0.5">Willing</div>
                </div>
              )}
              
              {formatSalaryRange() && (
                <div className="bg-linear-to-br from-emerald-50 to-emerald-100 rounded-xl p-3 text-center col-span-2">
                  <div className="font-semibold text-gray-900 text-xs truncate">{formatSalaryRange()}</div>
                  <div className="text-gray-600 text-xs mt-0.5">Expected Salary</div>
                </div>
              )}
            </div>

            {/* Professional Links */}
            {(personalInfo.linkedinUrl || personalInfo.githubUrl || personalInfo.portfolioUrl) && (
              <div className="flex flex-wrap gap-2">
                {personalInfo.linkedinUrl && (
                  <a
                    href={personalInfo.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-xl text-xs font-semibold hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg shadow-blue-500/30"
                  >
                    <Linkedin size={14} />
                    LinkedIn
                  </a>
                )}
                {personalInfo.githubUrl && (
                  <a
                    href={personalInfo.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-gray-700 to-gray-800 text-white rounded-xl text-xs font-semibold hover:from-gray-800 hover:to-gray-900 transition-all shadow-lg shadow-gray-500/30"
                  >
                    <Github size={14} />
                    GitHub
                  </a>
                )}
                {personalInfo.portfolioUrl && (
                  <a
                    href={personalInfo.portfolioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-purple-500 to-purple-600 text-white rounded-xl text-xs font-semibold hover:from-purple-600 hover:to-purple-700 transition-all shadow-lg shadow-purple-500/30"
                  >
                    <Globe size={14} />
                    Portfolio
                  </a>
                )}
              </div>
            )}

            {/* Completion Prompt */}
            {completionPercentage < 100 && missingFields().length > 0 && (
              <div className="bg-linear-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white rounded-lg">
                    <Info size={16} className="text-indigo-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900">Complete your profile</p>
                    <p className="text-xs text-gray-600 mt-1">
                      Add {missingFields().slice(0, 2).join(' and ')} to stand out to recruiters
                    </p>
                  </div>
                  <button
                    onClick={() => setEditMode(true)}
                    className="px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-white rounded-lg hover:bg-indigo-50 transition-all whitespace-nowrap"
                  >
                    Complete Now
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};