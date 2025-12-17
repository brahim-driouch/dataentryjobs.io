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
import ProfileWorkExperienceSectionWrapper from "@/app/components/users/profile/work-experience/profile-work-experience-section-wrapper";

export default function JobSeekerProfile() {
  const session = useSession();
  
  // Fix: Check session.data, not session
  if (!session.data?.user?.id) {
    return null;
  }
  
  const id = session.data.user.id;
  const { data, isLoading } = useUserProfile(id);
  
  if (isLoading) return null;
  
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50/30 to-gray-50 py-8">
      {data?.personalInfo?.email ? (
        <ProfileAboutSectionWrapper aboutInfo={data.personalInfo} />
      ) : (
        <NoAboutSection />
      )}
      
      {/* Fix: Remove extra curly braces */}
      <ProfileWorkExperienceSectionWrapper experiences={data?.experiences || []} />
      
      {data?.education && data.education.length > 0 ? (
        <ProfileEducationSection education={data.education} />
      ) : (
        <NoEducationSection />
      )}
      
      {data?.skills && data.skills.length > 0 ? (
        <ProfileSkillsSection skills={data.skills} />
      ) : (
        <NoSkillsSection />
      )}
      
      {data?.certifications && data.certifications.length > 0 ? (
        <ProfileCertificationsSection certifications={data.certifications} />
      ) : (
        <NoCertificationsSection />
      )}
    </div>
  );
}