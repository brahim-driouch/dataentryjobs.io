import { EmploymentType, IWorkExperienceDTO } from "@/types/profile";
import { ProfileWorkExperienceSectionContent } from "./profile-work-experience-section-content";
import { useState } from "react";
import AddProfileExperienceForm from "./add-work-experience-form";
import { NoWorkExperienceSection } from "./no-experience-section";
import { Edit2, Plus, ToolCase, User, X } from "lucide-react";
import { useSession } from "next-auth/react";

  

  type ProfileWorkExperienceSectionWrapperProps = {
    experiences: IWorkExperienceDTO[];
  };

export default function ProfileWorkExperienceSectionWrapper({experiences}:ProfileWorkExperienceSectionWrapperProps) {
  
  const [ediatableExperiences,setEditableExperiences] = useState<IWorkExperienceDTO[]>(experiences)
      const [addMode,setAddMode] = useState(false)

//session
const session = useSession();
if (!session) return null
const userId = session?.data?.user?.id;
  
console.log("experiences",experiences)

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
            <AddProfileExperienceForm userId={userId || ""}  setEditMode={setAddMode} />
          )}
        {((!experiences || experiences.length === 0) && !addMode)&&(
          <NoWorkExperienceSection setAddMode={setAddMode} />
        )}
       
      {experiences && experiences.length > 0 &&(
          <ProfileWorkExperienceSectionContent  experiences={experiences}/>
      )}
       
      </div>

    );
} 

