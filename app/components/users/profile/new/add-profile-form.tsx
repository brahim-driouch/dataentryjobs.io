"use client";

import { useState } from "react";
import {
  User,
  Briefcase,
  GraduationCap,
  Award,
  FileText,
  Save,
  Plus,
  Trash2,
  Check,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { useSession } from "next-auth/react";
import PersonnalInfoForm from "./personnal-info-form";
import { IUserLocation } from "@/types/user";
import { Availability, RemotePreference } from "@/types/profile";

export default function ProfileSetupWizard() {
  const session = useSession();

  if(!session){
    return null
}

const user = session.data?.user;
console.log(user)

   const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    personalInfo: {

      fullName: user?.name as string,
      professionalTitle:"",
      email: user?.email as string,
      phone: "",
      location: user?.location as IUserLocation,
      summary: "",
      availability:Availability.IMMEDIATELY,
      remotePreference:RemotePreference.FLEXIBLE,
      willingToRelocate:false,
      expectedSalaryMin:0,
      expectedSalaryMax:0,
      salaryCurrency:"USD"
    },
    workExperience: [
      {
        id: 1,
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        currentlyWorking: false,
        description: "",
      },
    ],
    education: [
      {
        id: 1,
        school: "",
        degree: "",
        fieldOfStudy: "",
        startDate: "",
        endDate: "",
        currentlyEnrolled: false,
      },
    ],
    skills: [] as string[],
    certifications: [
      {
        id: 1,
        name: "",
        issuer: "",
        issueDate: "",
      },
    ],
  });

  const [skillInput, setSkillInput] = useState("");

  const tabs = [
    { id: 0, name: "Personal Info", icon: User },
    { id: 1, name: "Experience", icon: Briefcase },
    { id: 2, name: "Education", icon: GraduationCap },
    { id: 3, name: "Skills", icon: Award },
    { id: 4, name: "Certifications", icon: FileText },
  ];



  const addWorkExperience = () => {

    setFormData({
      ...formData,
      workExperience: [
        ...formData.workExperience,
        {
          id: Date.now(),
          company: "",
          position: "",
          startDate: "",
          endDate: "",
          currentlyWorking: false,
          description: "",
        },
      ],
    });
  };

  const removeWorkExperience = (id: number) => {
    setFormData({
      ...formData,
      workExperience: formData.workExperience.filter((exp) => exp.id !== id),
    });
  };

  const updateWorkExperience = (id: number, field: string, value: any) => {
    if (value.trim() === "") return;
    setFormData({
      ...formData,
      workExperience: formData.workExperience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    });
  };

  const addEducation = () => {
    if (formData.education.length >= 5) return;
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        {
          id: Date.now(),
          school: "",
          degree: "",
          fieldOfStudy: "",
          startDate: "",
          endDate: "",
          currentlyEnrolled: false,
        },
      ],
    });
  };

  const removeEducation = (id: number) => {
    setFormData({
      ...formData,
      education: formData.education.filter((edu) => edu.id !== id),
    });
  };

  const updateEducation = (id: number, field: string, value: any) => {
    if (value.trim() === "") return;
    setFormData({
      ...formData,
      education: formData.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    });
  };

  const addSkill = () => {
    if (skillInput.trim() === "") return;
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, skillInput.trim()],
      });
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    if (skill.trim() === "") return;
    setFormData({
      ...formData,
      skills: formData.skills.filter((s) => s !== skill),
    });
  };

  const addCertification = () => {
    if (skillInput.trim() === "") return;
    setFormData({
      ...formData,
      certifications: [
        ...formData.certifications,
        {
          id: Date.now(),
          name: "",
          issuer: "",
          issueDate: "",
        },
      ],
    });
  };

  const removeCertification = (id: number) => {
    if (id === undefined) return;
    setFormData({
      ...formData,
      certifications: formData.certifications.filter((cert) => cert.id !== id),
    });
  };

  const updateCertification = (id: number, field: string, value: any) => {
    if (value.trim() === "") return;
    setFormData({
      ...formData,
      certifications: formData.certifications.map((cert) =>
        cert.id === id ? { ...cert, [field]: value } : cert
      ),
    });
  };

  const handleSubmit = async () => {
    console.log("Form Data:", formData);
    try {
      // TODO: Replace with your actual API endpoint
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Profile saved successfully!");
        // You might want to redirect or show a success message
      } else {
        alert("Failed to save profile. Please try again.");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("An error occurred while saving your profile.");
    }
  };

  const isLastTab = activeTab === tabs.length - 1;

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50/30 to-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Complete Your Profile
          </h1>
          <p className="text-gray-600">
            Add your information to stand out to employers
          </p>
        </div>


        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="border-b border-gray-200 bg-gray-50">
            <div className="flex overflow-x-auto">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition-all ${
                      isActive
                        ? " border-blue-600 text-blue-600 bg-white"
                        
                        : "border-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    }`}
                  >
                 
                    <span className="hidden sm:inline">{tab.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-6 md:p-8">
            {/* Personal Info Tab */}
            {activeTab === 0 && (
             <PersonnalInfoForm personalInfo={formData.personalInfo}/>
            )}

            {activeTab === 1 && (
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-900">
                    Work Experience
                  </h2>
                  <button
                    onClick={addWorkExperience}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all text-sm font-medium"
                  >
                    <Plus size={18} />
                    Add Experience
                  </button>
                </div>

                {formData.workExperience.map((exp, index) => (
                  <div
                    key={exp.id}
                    className="p-5 bg-gray-50 rounded-xl border border-gray-200 space-y-4"
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-gray-900">
                        Experience #{index + 1}
                      </h3>
                      {formData.workExperience.length > 1 && (
                        <button
                          onClick={() => removeWorkExperience(exp.id)}
                          className="text-red-600 hover:text-red-700 p-1"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        </label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) =>
                            updateWorkExperience(exp.id, "company", e.target.value)
                          }
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Company Name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        </label>
                        <input
                          type="text"
                          value={exp.position}
                          onChange={(e) =>
                            updateWorkExperience(exp.id, "position", e.target.value)
                          }
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Job Title"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        </label>
                        <input
                          type="month"
                          value={exp.startDate}
                          onChange={(e) =>
                            updateWorkExperience(exp.id, "startDate", e.target.value)
                          }
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          End Date
                        </label>
                        <input
                          type="month"
                          value={exp.endDate}
                          onChange={(e) =>
                            updateWorkExperience(exp.id, "endDate", e.target.value)
                          }
                          disabled={exp.currentlyWorking}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={`current-${exp.id}`}
                        checked={exp.currentlyWorking}
                        onChange={(e) =>
                          updateWorkExperience(
                            exp.id,
                            "currentlyWorking",
                            e.target.checked
                          )
                        }
                        className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                      />
                      <label
                        htmlFor={`current-${exp.id}`}
                        className="text-sm text-gray-700"
                      >
                        I currently work here
                      </label>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Description
                      </label>
                      <textarea
                        value={exp.description}
                        onChange={(e) =>
                          updateWorkExperience(exp.id, "description", e.target.value)
                        }
                        rows={3}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        placeholder="Describe your responsibilities and achievements..."
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 2 && (
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Education</h2>
                  <button
                    onClick={addEducation}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all text-sm font-medium"
                  >
                    <Plus size={18} />
                    Add Education
                  </button>
                </div>

                {formData.education.map((edu, index) => (
                  <div
                    key={edu.id}
                    className="p-5 bg-gray-50 rounded-xl border border-gray-200 space-y-4"
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-gray-900">
                        Education #{index + 1}
                      </h3>
                      {formData.education.length > 1 && (
                        <button
                          onClick={() => removeEducation(edu.id)}
                          className="text-red-600 hover:text-red-700 p-1"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        </label>
                        <input
                          type="text"
                          value={edu.school}
                          onChange={(e) =>
                            updateEducation(edu.id, "school", e.target.value)
                          }
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="University Name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        </label>
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) =>
                            updateEducation(edu.id, "degree", e.target.value)
                          }
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Bachelor's Degree"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        </label>
                        <input
                          type="text"
                          value={edu.fieldOfStudy}
                          onChange={(e) =>
                            updateEducation(edu.id, "fieldOfStudy", e.target.value)
                          }
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Computer Science"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        </label>
                        <input
                          type="month"
                          value={edu.startDate}
                          onChange={(e) =>
                            updateEducation(edu.id, "startDate", e.target.value)
                          }
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          End Date
                        </label>
                        <input
                          type="month"
                          value={edu.endDate}
                          onChange={(e) =>
                            updateEducation(edu.id, "endDate", e.target.value)
                          }
                          disabled={edu.currentlyEnrolled}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={`enrolled-${edu.id}`}
                        checked={edu.currentlyEnrolled}
                        onChange={(e) =>
                          updateEducation(
                            edu.id,
                            "currentlyEnrolled",
                            e.target.checked
                          )
                        }
                        className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                      />
                      <label
                        htmlFor={`enrolled-${edu.id}`}
                        className="text-sm text-gray-700"
                      >
                        I currently study here
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Skills & Expertise
                </h2>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addSkill()}
                    className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Type a skill and press Enter or click Add"
                  />
                  <button
                    onClick={addSkill}
                    className="px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-medium"
                  >
                    Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-xl border border-blue-200"
                    >
                      <span className="font-medium">{skill}</span>
                      <button
                        onClick={() => removeSkill(skill)}
                        className="hover:text-red-600 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>

                {formData.skills.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No skills added yet. Add at least 3 skills to continue.
                  </div>
                )}
              </div>
            )}

            {activeTab === 4 && (
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-900">
                    Certifications & Licenses
                  </h2>
                  <button
                    onClick={addCertification}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all text-sm font-medium"
                  >
                    <Plus size={18} />
                    Add Certification
                  </button>
                </div>

                {formData.certifications.map((cert, index) => (
                  <div
                    key={cert.id}
                    className="p-5 bg-gray-50 rounded-xl border border-gray-200 space-y-4"
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-gray-900">
                        Certification #{index + 1}
                      </h3>
                      {formData.certifications.length > 1 && (
                        <button
                          onClick={() => removeCertification(cert.id)}
                          className="text-red-600 hover:text-red-700 p-1"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        </label>
                        <input
                          type="text"
                          value={cert.name}
                          onChange={(e) =>
                            updateCertification(cert.id, "name", e.target.value)
                          }
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="AWS Certified Solutions Architect"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        </label>
                        <input
                          type="text"
                          value={cert.issuer}
                          onChange={(e) =>
                            updateCertification(cert.id, "issuer", e.target.value)
                          }
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Amazon Web Services"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        </label>
                        <input
                          type="month"
                          value={cert.issueDate}
                          onChange={(e) =>
                            updateCertification(cert.id, "issueDate", e.target.value)
                          }
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <p className="text-sm text-gray-500 italic">
                  Certifications are optional but help you stand out!
                </p>
              </div>
            )}
          </div>

          <div className="border-t border-gray-200 px-6 md:px-8 py-4 bg-gray-50 flex justify-between items-center">
            <button
              onClick={() => setActiveTab(Math.max(0, activeTab - 1))}
              disabled={activeTab === 0}
              className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 rounded-xl hover:bg-gray-100 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft size={18} />
              <span>Previous</span>
            </button>

           
             
             
            
          </div>
        </div>
      </div>
    </div>
  );
}