"use client";
import { useState } from 'react';
import { 
  User, Mail, Phone, MapPin, Briefcase, GraduationCap, 
  Award, FileText, Edit2, Save, X, Plus, Trash2, 
  Calendar, Building, ExternalLink, Globe, Linkedin, Github
} from 'lucide-react';
import { ProfileHeader } from '@/app/components/users/profile/profile-header';

export default function JobSeekerProfile() {
  const [editMode, setEditMode] = useState<string | null>(null);
  const [profile, setProfile] = useState({
    personalInfo: {
      fullName: "Alex Johnson",
      email: "alex.johnson@email.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      title: "Senior Software Engineer",
      summary: "Passionate software engineer with 8+ years of experience building scalable web applications. Specialized in React, Node.js, and cloud architecture.",
      profilePhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
    },
    experience: [
      {
        id: 1,
        company: "Tech Corp",
        position: "Senior Software Engineer",
        startDate: "Jan 2020",
        endDate: "Present",
        description: "Led development of microservices architecture serving 10M+ users. Mentored junior developers and established coding standards.",
        technologies: ["React", "Node.js", "AWS", "Docker"]
      },
      {
        id: 2,
        company: "StartupXYZ",
        position: "Full Stack Developer",
        startDate: "Jun 2017",
        endDate: "Dec 2019",
        description: "Built customer-facing features using React and Node.js. Improved page load times by 40% through optimization.",
        technologies: ["React", "Express", "MongoDB"]
      }
    ],
    education: [
      {
        id: 1,
        school: "University of California",
        degree: "Bachelor of Science in Computer Science",
        startDate: "2013",
        endDate: "2017",
        description: "GPA: 3.8/4.0. Focus on algorithms and distributed systems."
      }
    ],
    skills: [
      "JavaScript", "React", "Node.js", "TypeScript", "Python", 
      "AWS", "Docker", "PostgreSQL", "MongoDB", "GraphQL"
    ],
    certifications: [
      { id: 1, name: "AWS Certified Solutions Architect", issuer: "Amazon", year: "2022" },
      { id: 2, name: "Professional Scrum Master", issuer: "Scrum.org", year: "2021" }
    ],
   
  });

  const handleSave = (section: string) => {
    setEditMode(null);


  };

  const ProfileSection = ({ title, icon: Icon, children, sectionKey }: { title: string; icon: any; children: React.ReactNode; sectionKey?: string }) => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div className="bg-linear-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Icon className="text-blue-600" size={20} />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          </div>
          {sectionKey && (
            <button
              onClick={() => setEditMode(editMode === sectionKey ? null : sectionKey)}
              className="p-2 rounded-lg text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
            >
              {editMode === sectionKey ? <X size={18} /> : <Edit2 size={18} />}
            </button>
          )}
        </div>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50/30 to-gray-50">
      {/* Hero Header */}
     <ProfileHeader/>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* About / Summary */}
        <ProfileSection title="About" icon={User} sectionKey="personal">
          <div className="space-y-4">
            {editMode === 'personal' ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">Full Name</label>
                    <input
                      type="text"
                      value={profile.personalInfo.fullName}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      onChange={(e) => setProfile({
                        ...profile,
                        personalInfo: { ...profile.personalInfo, fullName: e.target.value }
                      })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">Professional Title</label>
                    <input
                      type="text"
                      value={profile.personalInfo.title}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      onChange={(e) => setProfile({
                        ...profile,
                        personalInfo: { ...profile.personalInfo, title: e.target.value }
                      })}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">Professional Summary</label>
                  <textarea
                    value={profile.personalInfo.summary}
                    rows={5}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    onChange={(e) => setProfile({
                      ...profile,
                      personalInfo: { ...profile.personalInfo, summary: e.target.value }
                    })}
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    onClick={() => setEditMode(null)}
                    className="px-5 py-2.5 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleSave('personal')}
                    className="px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all flex items-center gap-2 font-medium shadow-sm hover:shadow-md"
                  >
                    <Save size={18} />
                    <span>Save Changes</span>
                  </button>
                </div>
              </>
            ) : (
              <p className="text-gray-700 leading-relaxed">{profile.personalInfo.summary}</p>
            )}
          </div>
        </ProfileSection>

        {/* Experience */}
        <ProfileSection title="Work Experience" icon={Briefcase}>
          <div className="space-y-6">
            {profile.experience.map((exp, index) => (
              <div key={exp.id} className="relative pl-6 pb-6 border-l-2 border-blue-100 last:pb-0 group">
                <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-600 rounded-full ring-4 ring-white"></div>
                
                <div className="bg-gray-50 rounded-xl p-5 group-hover:bg-blue-50/50 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{exp.position}</h3>
                      <div className="flex items-center gap-2 text-gray-600 mt-1">
                        <Building size={16} className="text-gray-400" />
                        <span className="font-medium">{exp.company}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 bg-white px-3 py-1.5 rounded-lg">
                      <Calendar size={14} />
                      <span>{exp.startDate} - {exp.endDate}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed mb-3">{exp.description}</p>
                  
                  {exp.technologies && (
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, i) => (
                        <span key={i} className="px-3 py-1 bg-white text-blue-700 rounded-lg text-xs font-medium border border-blue-100">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            <button className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 hover:bg-blue-50/50 transition-all flex items-center justify-center gap-2 text-gray-600 hover:text-blue-600 font-medium">
              <Plus size={18} />
              <span>Add Work Experience</span>
            </button>
          </div>
        </ProfileSection>

        {/* Education */}
        <ProfileSection title="Education" icon={GraduationCap}>
          <div className="space-y-6">
            {profile.education.map((edu) => (
              <div key={edu.id} className="bg-linear-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-100">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{edu.degree}</h3>
                    <p className="text-gray-700 font-medium mt-1">{edu.school}</p>
                  </div>
                  <span className="text-sm text-gray-600 bg-white px-3 py-1.5 rounded-lg">
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
                <p className="text-gray-600 mt-3">{edu.description}</p>
              </div>
            ))}
            
            <button className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 hover:bg-blue-50/50 transition-all flex items-center justify-center gap-2 text-gray-600 hover:text-blue-600 font-medium">
              <Plus size={18} />
              <span>Add Education</span>
            </button>
          </div>
        </ProfileSection>

        {/* Skills */}
        <ProfileSection title="Skills & Expertise" icon={Award}>
          <div className="flex flex-wrap gap-2.5">
            {profile.skills.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-linear-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-xl text-sm font-medium border border-blue-200 hover:shadow-md transition-all cursor-default"
              >
                {skill}
              </span>
            ))}
            <button className="px-4 py-2 border-2 border-dashed border-gray-300 rounded-xl text-sm font-medium text-gray-600 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50/50 transition-all">
              + Add Skill
            </button>
          </div>
        </ProfileSection>

        {/* Certifications */}
        <ProfileSection title="Certifications & Licenses" icon={FileText}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profile.certifications.map((cert) => (
              <div key={cert.id} className="flex items-start gap-4 p-4 bg-linear-to-br from-amber-50 to-yellow-50 rounded-xl border border-amber-100 hover:shadow-md transition-all">
                <div className="p-2 bg-white rounded-lg">
                  <Award className="text-amber-600" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{cert.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{cert.issuer} • {cert.year}</p>
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-4 py-3 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 hover:bg-blue-50/50 transition-all flex items-center justify-center gap-2 text-gray-600 hover:text-blue-600 font-medium">
            <Plus size={18} />
            <span>Add Certification</span>
          </button>
        </ProfileSection>
      </div>
    </div>
  );
}