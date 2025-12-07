"use client";
import { Frown } from "lucide-react";
import { ProfileAboutSection } from "@/app/components/users/profile/profile-about-section";
import { ProfileWorkExperienceSection } from "@/app/components/users/profile/profile-work-experience-section";
import { ProfileEducationSection } from "@/app/components/users/profile/profile-education-section";
import { ProfileSkillsSection } from "@/app/components/users/profile/profile-skills-section";
import { ProfileCertificationsSection } from "@/app/components/users/profile/profile-certifications";
import { useUserProfile } from "@/hooks/users/useProfileInfo";
import { useSession } from "next-auth/react";
import { NoAboutSection } from "@/app/components/users/profile/no-about-section";
import { NoExperienceSection } from "@/app/components/users/profile/no-experience-section";
import { NoEducationSection } from "@/app/components/users/profile/no-education-section";
import { NoCertificationsSection } from "@/app/components/users/profile/no-certifications-section";
import Link from "next/link";
import { NoSkillsSection } from "@/app/components/users/profile/no-skills-section";
import { IPersonalInfoDTO } from "@/types/profile";

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


  // const handleDeleteSkill = (e: React.MouseEvent) => {
  //   e.stopPropagation();
  //   profile.skills = profile.skills.filter((skill) => !(selectedSkills.includes(skill)));
  //   setSelectedSkills([]);

  // };


    if(!data){
      return <div className="min-h-screen text-gray-700 space-y-4 pt-24 flex flex-col justify-start items-center bg-linear-to-br from-gray-50 via-blue-50/30 to-gray-50 py-8">
       <span className="text-2xl">You have not added any information yet</span>
       <Frown size={24}/> 
       <Link href="/in/user/profile/new" className="px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all flex items-center gap-2 font-medium shadow-sm hover:shadow-md">
         Add Information
       </Link>
    </div>
  }
  const  personalInfo = data?.personalInfo as IPersonalInfoDTO;
  const  experience = data?.experience;
  const  education = data?.education;
  const  skills = data?.skills;
  const  certifications = data?.certifications;
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50/30 to-gray-50 py-8">
     {personalInfo?.email ? <ProfileAboutSection aboutInfo={personalInfo} /> : <NoAboutSection />}
     {experience.length > 0 ? <ProfileWorkExperienceSection  experience={experience} /> : <NoExperienceSection />}
     {education.length > 0 ? <ProfileEducationSection education={education} /> : <NoEducationSection />}
     {skills.length > 0 ? <ProfileSkillsSection skills={skills} />   : <NoSkillsSection />}
     {certifications.length > 0 ? <ProfileCertificationsSection certifications={certifications} /> : <NoCertificationsSection />}
    </div>
  )
}