"use client";
import { useState } from "react";
import { GraduationCap, Award, FileText, X, Plus, Edit2, Frown } from "lucide-react";
import { ProfileHeader } from "@/app/components/users/profile/profile-header";
import { ProfileAboutSection } from "@/app/components/users/profile/profile-about-section";
import { ProfileWorkExperienceSection } from "@/app/components/users/profile/profile-work-experience-section";
import { ProfileEducationSection } from "@/app/components/users/profile/profile-education-section";
import { ProfileSkillsSection } from "@/app/components/users/profile/profile-skills-section";
import { ProfileCertificationsSection } from "@/app/components/users/profile/profile-certifications";
import { useUserProfile } from "@/hooks/users/useProfileInfo";
import { useSession } from "next-auth/react";
import { NoAboutSection } from "@/app/components/users/profile/no-about-section";
import { useRouter } from "next/navigation";
import { NoExperienceSection } from "@/app/components/users/profile/no-experience-section";
import { NoEducationSection } from "@/app/components/users/profile/no-education-section";
import { NoskillsSection } from "@/app/components/users/profile/so-skills-section";
import { NoCertificationsSection } from "@/app/components/users/profile/no-certifications-section";
import Link from "next/link";

export default function JobSeekerProfile() {
  const [editMode, setEditMode] = useState<string | null>(null);
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    const session = useSession();
    const router = useRouter();
    if(!session){
        return null
    }
    const id = session.data?.user.id;

    if(!id){
        return null
    }
  const {data } = useUserProfile(id);

  



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

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50/30 to-gray-50 py-8">
     {data?.personalInfo ? <ProfileAboutSection aboutInfo={data.personalInfo} /> : <NoAboutSection />}
     {data?.experience ? <ProfileWorkExperienceSection  experience={data?.experience} /> : <NoExperienceSection />}
     {data?.education ? <ProfileEducationSection education={data?.education} /> : <NoEducationSection />}
     {data?.skills ? <ProfileSkillsSection skills={data?.skills} />   : <NoskillsSection />}
     {data?.certifications ? <ProfileCertificationsSection certifications={data?.certifications} /> : <NoCertificationsSection />}
    </div>
  )
}