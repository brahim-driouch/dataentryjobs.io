import { EmploymentType, IWorkExperienceDTO } from "@/types/profile";
import { ProfileWorkExperienceSectionContent } from "./profile-work-experience-section-content";
import { useState } from "react";
import AddProfileExperienceForm from "./add-work-experience-form";
import { NoWorkExperienceSection } from "./no-experience-section";
import { Edit2, Plus, ToolCase, User, X } from "lucide-react";
import { useSession } from "next-auth/react";

  
const experiences: IWorkExperienceDTO[] = [
    {
      id: "1",
      userId: "user123",
      company: "Tech Innovations Inc.",
      position: "Senior Full Stack Developer",
      employmentType: EmploymentType.FULL_TIME,
      location: "San Francisco, CA",
      remote: true,
      startDate: "2022-01-15",
      currentlyWorking: true,
      description: "Leading development of microservices architecture and mentoring junior developers. Responsible for designing and implementing scalable solutions for high-traffic applications.",
      achievements: [
        "Reduced API response time by 40% through optimization",
        "Led migration from monolith to microservices architecture",
        "Mentored 5 junior developers, 3 promoted to mid-level"
      ],
      technologies: ["React", "Node.js", "TypeScript", "PostgreSQL", "AWS", "Docker"],
      order: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: "2",
      userId: "user123",
      company: "Digital Solutions Ltd.",
      position: "Full Stack Developer",
      employmentType: EmploymentType.FULL_TIME,
      location: "New York, NY",
      remote: false,
      startDate: "2019-06-01",
      endDate: "2021-12-31",
      currentlyWorking: false,
      description: "Developed and maintained web applications using modern JavaScript frameworks. Collaborated with cross-functional teams to deliver high-quality software solutions.",
      achievements: [
        "Built customer portal used by 50,000+ users",
        "Implemented automated testing, increasing code coverage to 85%"
      ],
      technologies: ["React", "Express", "MongoDB", "Redux"],
      order: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]; 
  // type ProfileWorkExperienceSectionWrapperProps = {
  //   experiences: IWorkExperienceDTO[];
  // };

export default function ProfileWorkExperienceSectionWrapper() {
  const [ediatableExperiences,setEditableExperiences] = useState<IWorkExperienceDTO[]>(experiences)
      const [addMode,setAddMode] = useState(false)

//session
const session = useSession();
if (!session) return null
const userId = session?.data?.user?.id;
  
 

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
       {/* Header */}
        <div className="w-full flex justify-between items-center bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 p-5">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl">
              <ToolCase className="text-white" size={18} />
            </div>
            <div>
              <h3 className="font-semibold text-white">Work experience</h3>
                  <h4 className="text-xs text-white/90">Professional experience and achievements </h4>
            </div>
          </div>
          </div>
          <button
            onClick={() => setAddMode(!addMode)}
            className="p-2 rounded-xl bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all"
            aria-label={addMode ? "Close editor" : "Add new experience"}
          >
            {addMode ? <X size={18} /> : <Plus size={18} />}
          </button>
        

      </div>
        {addMode && (
            <AddProfileExperienceForm userId=""  setEditMode={setAddMode} />
          )}
        {experiences && experiences.length === 0 &&(
          <NoWorkExperienceSection />
        )}
       
      {experiences && experiences.length > 0 &&(
          <ProfileWorkExperienceSectionContent  experiences={experiences}/>
      )}
       
      </div>

    );
} 

