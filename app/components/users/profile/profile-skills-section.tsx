import { useState } from "react";



type ProfileSkillsSectionProps = {
    skill:string,
    setSelectedSkills: (skills: HTMLElement[]) => void,
    selectedSkills: HTMLElement[]
}
export const ProfileSkillsSection = ({skill,setSelectedSkills,selectedSkills}: ProfileSkillsSectionProps) => {
  const [isSelected, setIsSelected] = useState(false); 
  const handleSelectSkill = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSelected(!isSelected);
    setSelectedSkills([...selectedSkills, e.target as HTMLElement]);
  } 
  return (
       <>
                   
                      <span
                      onClick={handleSelectSkill}
                        className={isSelected ? "px-4 py-2 flex items-center justify-between bg-red-600 text-white rounded-xl text-sm font-medium border border-blue-200 hover:shadow-md transition-all cursor-default" : "px-4 py-2 bg-linear-to-r flex items-center justify-between from-blue-50 to-indigo-50 text-blue-700 rounded-xl text-sm font-medium border border-blue-200 hover:shadow-md transition-all cursor-default"}
                      >
                        {skill}
                         
                      </span>
                     

                  
                    {/* <button className="px-4 py-2 border-2 border-dashed border-gray-300 rounded-xl text-sm font-medium text-gray-600 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50/50 transition-all">
                      + Add Skill
                    </button> */}
                  </>
    );
};