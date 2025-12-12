
"use client";

import { EmploymentType, IWorkExperienceDTO } from "@/types/profile";
import { 
  Briefcase, Plus, Edit2, Trash2, Save, X, MapPin, Calendar,
  Award, Code, Building2, TrendingUp, GripVertical
} from "lucide-react";
import { useState } from "react";
import { EditWorkExperienceForm } from "./edit-work-experience-form";
import { SingleWorkExperienceComponent } from "./single-work-experience-component";

type WorkExperienceSectionProps = {
  experiences: IWorkExperienceDTO[];
};

export const ProfileWorkExperienceSectionContent = ({ experiences: initialExperiences }: WorkExperienceSectionProps) => {
  const [experiences] = useState<IWorkExperienceDTO[]>(initialExperiences);
  const [editingId, setEditingId] = useState<string | null>(null);
  

  

 
 

 




 

  return (
    <div className="w-full rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      {/* Header */}
  

      {/* Content */}
      <div className="p-5">
        <div className="space-y-4">
          {experiences.map((exp, index) => (
            <div key={exp.id}>
            
                               {editingId === exp.id ? <EditWorkExperienceForm   setEditingId={setEditingId} experience={exp} /> : <SingleWorkExperienceComponent experience={exp} setEditingId={setEditingId} />}

            </div>
          ))}
        </div>

        
      </div>
    </div>
  );
};