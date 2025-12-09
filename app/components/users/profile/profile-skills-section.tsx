import { ISkillDTO } from "@/types/profile";
import { useState } from "react";



type ProfileSkillsSectionProps = {
    skills:ISkillDTO[]
}
export const ProfileSkillsSection = ({skills}: ProfileSkillsSectionProps) => {
  const [isSelected, setIsSelected] = useState(false); 

  return (
       <>
                   
                  {skills.map((skill)=>(
                    <span
                        className={isSelected ? "px-4 py-2 flex items-center justify-between bg-red-600 text-white rounded-xl text-sm font-medium border border-blue-200 hover:shadow-md transition-all cursor-default" : "px-4 py-2 bg-linear-to-r flex items-center justify-between from-blue-50 to-indigo-50 text-blue-700 rounded-xl text-sm font-medium border border-blue-200 hover:shadow-md transition-all cursor-default"}
                      >
                        {skill.name}
                         
                      </span>
                     
                  ))}

                  
                    {/* <button className="px-4 py-2 border-2 border-dashed border-gray-300 rounded-xl text-sm font-medium text-gray-600 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50/50 transition-all">
                      + Add Skill
                    </button> */}
                  </>
    );
};