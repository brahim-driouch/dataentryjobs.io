"use client";

import { IPersonalInfoDTO } from "@/types/profile";
import { 
   Edit2, User, X
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import PersonalInfoForm from "./add-personnal-info-form";
import { ProfileAboutSectionContent } from "./profile-about-section-content";

type ProfileAboutSectionProps = {
  aboutInfo: IPersonalInfoDTO;
};

export const ProfileAboutSectionWrapper = ({ aboutInfo }: ProfileAboutSectionProps) => {
 // states
  const [editMode, setEditMode] = useState<boolean>(false);
  const [personalInfo, setPersonalInfo] = useState<IPersonalInfoDTO>(aboutInfo);

  // session
  const session = useSession();
  if(!session)return null;
  const userId = session.data?.user?.id;
  if(!userId)return null;

 

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


  const missingFields = () => {
    const fields = [];
    if (!personalInfo.fullName) fields.push('Full Name');
    if (!personalInfo.title) fields.push('Title');
    if (!personalInfo.summary) fields.push('Summary');
    if (!personalInfo.phone) fields.push('Phone');
    if (!personalInfo.profilePhoto) fields.push('Photo');
    return fields;
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
          <PersonalInfoForm
            personalInfo={personalInfo}
            completionPercentage={completionPercentage}
            missingFields={missingFields}  
            setPersonalInfo={setPersonalInfo}
            setEditMode={setEditMode}
            userId={userId}
          />
        ) : (
          <ProfileAboutSectionContent
            personalInfo={personalInfo}
            completionPercentage={completionPercentage}
            setEditMode={setEditMode}
            missingFields={missingFields}
            
          />
        )}
      </div>
    </div>
  );
};