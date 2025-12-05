import { Building, Calendar, Plus } from "lucide-react";

type ProfileWorkExperienceSectionProps = {
    id:number;
    position:string;
    company:string;
    startDate:string;
    endDate:string;
    description:string;
    technologies:string[];
}[]

export const ProfileWorkExperienceSection = ({experience}:{experience:ProfileWorkExperienceSectionProps})=> {

    return (
          <div className="space-y-6">
              {experience.map((exp)=>(
                <>
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
        
                </>
              ))}
            
         
          </div>
    )
}