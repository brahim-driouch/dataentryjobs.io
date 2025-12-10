"use client";
import { ProfileAboutSectionWrapper } from "@/app/components/users/profile/about/profile-about-section-wrapper";
import { ProfileEducationSection } from "@/app/components/users/profile/profile-education-section";
import { ProfileSkillsSection } from "@/app/components/users/profile/profile-skills-section";
import { ProfileCertificationsSection } from "@/app/components/users/profile/profile-certifications";
import { useUserProfile } from "@/hooks/profile/useProfileInfo";
import { useSession } from "next-auth/react";
import { NoAboutSection } from "@/app/components/users/profile/about/no-about-section";
import { NoEducationSection } from "@/app/components/users/profile/no-education-section";
import { NoCertificationsSection } from "@/app/components/users/profile/no-certifications-section";
import { NoSkillsSection } from "@/app/components/users/profile/no-skills-section";
import { ICertificationDTO, IEducationDTO, IPersonalInfoDTO, ISkillDTO, IWorkExperienceDTO } from "@/types/profile";
import ProfileWorkExperienceSectionWrapper from "@/app/components/users/profile/work-experience/profile-work-experience-section-wrapper";
import { useState } from "react";

export default function JobSeekerProfile() {
  
    const session = useSession();
    if(!session){
        return null
    }
    const id = session.data?.user.id;

    if(!id){
        return null
    }
  const {data,isLoading } = useUserProfile(id);
  if(isLoading) return null;

  const  personalInfo = data?.data?.personalInfo as IPersonalInfoDTO;
  const  experiences = data?.data?.experiences as IWorkExperienceDTO[];
  const  education = data?.data?.education as IEducationDTO[];
  const  skills = data?.data?.skills as ISkillDTO[];
  const  certifications = data?.data?.certifications as ICertificationDTO[];
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50/30 to-gray-50 py-8">
    
     {personalInfo?.email ? <ProfileAboutSectionWrapper aboutInfo={personalInfo} /> : <NoAboutSection />}
     { <ProfileWorkExperienceSectionWrapper  experiences={experiences} /> }
     {education && education?.length > 0 ? <ProfileEducationSection education={education} /> : <NoEducationSection />}
     {skills && skills?.length > 0 ? <ProfileSkillsSection skills={skills} />   : <NoSkillsSection />}
     {certifications && certifications.length > 0 ? <ProfileCertificationsSection certifications={certifications} /> : <NoCertificationsSection />}
    </div>
  )
}