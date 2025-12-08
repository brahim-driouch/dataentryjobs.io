import { IPersonalInfoDTO } from "@/types/profile";
import { getInitials } from "@/utils/get-initials";
import { Briefcase, Calendar, Github, Globe, Info, Linkedin, Mail, MapPin, Phone } from "lucide-react";

type ProfileAboutSectionContentProps = {
    personalInfo: IPersonalInfoDTO;
    setEditMode: (editMode: boolean) => void;
    completionPercentage: number;
    missingFields: () => string[];
};

export const ProfileAboutSectionContent = ({ personalInfo,setEditMode,completionPercentage,missingFields }: ProfileAboutSectionContentProps) => {       


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
 return (
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
                    {getInitials(personalInfo.fullName)}
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
        
)

}