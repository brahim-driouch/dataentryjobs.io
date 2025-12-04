"use client";
import { useState } from "react";
import { GraduationCap, Award, FileText, X, Plus, Edit2 } from "lucide-react";
import { ProfileHeader } from "@/app/components/users/profile/profile-header";
import { ProfileAboutSection } from "@/app/components/users/profile/profile-about-section";
import { ProfileWorkExperienceSection } from "@/app/components/users/profile/profile-work-experience-section";
import { ProfileEducationSection } from "@/app/components/users/profile/profile-education-section";
import { ProfileSkillsSection } from "@/app/components/users/profile/profile-skills-section";
import { ProfileCertificationsSection } from "@/app/components/users/profile/profile-certifications";

export default function JobSeekerProfile() {
  const [editMode, setEditMode] = useState<string | null>(null);
    const [selectedSkills, setSelectedSkills] = useState<HTMLElement[]>([]);

  const [profile] = useState({
    personalInfo: {
      fullName: "Alex Johnson",
      email: "alex.johnson@email.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      title: "Senior Software Engineer",
      summary:
        "Passionate software engineer with 8+ years of experience building scalable web applications. Specialized in React, Node.js, and cloud architecture.",
      profilePhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    },
    experience: [
      {
        id: 1,
        company: "Tech Corp",
        position: "Senior Software Engineer",
        startDate: "Jan 2020",
        endDate: "Present",
        description:
          "Led development of microservices architecture serving 10M+ users. Mentored junior developers and established coding standards.",
        technologies: ["React", "Node.js", "AWS", "Docker"],
      },
      {
        id: 2,
        company: "StartupXYZ",
        position: "Full Stack Developer",
        startDate: "Jun 2017",
        endDate: "Dec 2019",
        description:
          "Built customer-facing features using React and Node.js. Improved page load times by 40% through optimization.",
        technologies: ["React", "Express", "MongoDB"],
      },
    ],
    education: [
      {
        id: 1,
        school: "University of California",
        degree: "Bachelor of Science in Computer Science",
        startDate: "2013",
        endDate: "2017",
        description:
          "GPA: 3.8/4.0. Focus on algorithms and distributed systems.",
      },
    ],
    skills: [
      "JavaScript",
      "React",
      "Node.js",
      "TypeScript",
      "Python",
      "AWS",
      "Docker",
      "PostgreSQL",
      "MongoDB",
      "GraphQL",
    ],
    certifications: [
      {
        id: 1,
        name: "AWS Certified Solutions Architect",
        issuer: "Amazon",
        year: "2022",
      },
      {
        id: 2,
        name: "Professional Scrum Master",
        issuer: "Scrum.org",
        year: "2021",
      },
    ],
  });

  const handleDeleteSkill = (e: React.MouseEvent) => {
    e.stopPropagation();
    // remove target from dom
   selectedSkills.forEach((skill) => {
    skill.remove();
   })
   setSelectedSkills([]);

  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-50">
      {/* Hero Header */}
      <div className="bg-linear-to-r from-blue-600 to-blue-700 shadow-lg rounded-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:p-8 ">
          <ProfileHeader />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10 mt-10">
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - About & Skills */}
          <div className="lg:col-span-2 space-y-10">
            {/* About Section */}
            <section className="space-y-2">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FileText className="text-blue-600" size={20} />
                  </div>
                  About
                </h2>
                <button
                  onClick={() => setEditMode(editMode === 'about' ? null : 'about')}
                  className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  {editMode === 'about' ? 'Cancel' : 'Edit'}
                </button>
              </div>
              <ProfileAboutSection
                editMode={editMode}
                setEditMode={setEditMode}
                fullName={profile.personalInfo.fullName}
                title={profile.personalInfo.title}
                summary={profile.personalInfo.summary}
              />
            </section>

            {/* Experience Section */}
            <section className="space-y-2">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Award className="text-blue-600" size={20} />
                  </div>
                  Work Experience
                </h2>
                <button
                  onClick={() => setEditMode(editMode === 'experience' ? null : 'experience')}
                  className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-2"
                >
                  <Plus size={16} />
                  Add Experience
                </button>
              </div>
              <div className="space-y-4">
                {profile.experience.map((exp) => (
                  <ProfileWorkExperienceSection key={exp.id} experience={exp} />
                ))}
              </div>
            </section>

            {/* Education Section */}
            <section className="space-y-2">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <GraduationCap className="text-blue-600" size={20} />
                  </div>
                  Education
                </h2>
                <button
                  onClick={() => setEditMode(editMode === 'education' ? null : 'education')}
                  className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-2"
                >
                  <Plus size={16} />
                  Add Education
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profile.education.map((edu) => (
                  <ProfileEducationSection key={edu.id} {...edu} />
                ))}
              </div>
            </section>

            {/* Certifications Section */}
            <section className="space-y-2">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Award className="text-blue-600" size={20} />
                  </div>
                  Certifications
                </h2>
                <button
                  onClick={() => setEditMode(editMode === 'certifications' ? null : 'certifications')}
                  className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-2"
                >
                  <Plus size={16} />
                  Add Certification
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profile.certifications.map((cert) => (
                  <ProfileCertificationsSection key={cert.id} {...cert} />
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Skills */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Skills Section */}
              <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Award className="text-blue-600" size={20} />
                    </div>
                    Skills & Expertise
                  </h2>
                  <button
                    onClick={() => setEditMode(editMode === 'skills' ? null : 'skills')}
                    className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                   <Plus size={16} />
                  </button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {profile.skills.map((skill) => (
                    <ProfileSkillsSection setSelectedSkills={setSelectedSkills} selectedSkills={selectedSkills} key={skill} skill={skill} />
                  ))}
                </div>
                {editMode === 'skills' && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Add a skill..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Add
                      </button>
                    </div>
                  </div>
                )}
                {selectedSkills.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex items-center gap-2">
                     
                      <button onClick={handleDeleteSkill} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </section>

              {/* Contact Info */}
              <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Email</p>
                    <p className="font-medium text-gray-900">{profile.personalInfo.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Phone</p>
                    <p className="font-medium text-gray-900">{profile.personalInfo.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Location</p>
                    <p className="font-medium text-gray-900">{profile.personalInfo.location}</p>
                  </div>
                </div>
                <button className="mt-6 w-full px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium">
                  Contact Me
                </button>
              </section>

              {/* Profile Stats */}
              <section className="bg-linear-to-r from-blue-600 to-blue-700 rounded-2xl shadow-lg p-6 text-white">
                <h2 className="text-xl font-bold mb-6">Profile Strength</h2>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Completeness</span>
                      <span>85%</span>
                    </div>
                    <div className="h-2 bg-blue-500 rounded-full overflow-hidden">
                      <div className="h-full bg-white w-4/5"></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center pt-4">
                    <div className="bg-white/20 rounded-xl p-4">
                      <p className="text-2xl font-bold">{profile.experience.length}</p>
                      <p className="text-sm opacity-90">Experiences</p>
                    </div>
                    <div className="bg-white/20 rounded-xl p-4">
                      <p className="text-2xl font-bold">{profile.skills.length}</p>
                      <p className="text-sm opacity-90">Skills</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}