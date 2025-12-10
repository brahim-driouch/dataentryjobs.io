import { EmploymentType, IWorkExperienceDTO } from "@/types/profile";
import { Award, Building2, Calendar, Code, Edit2, GripVertical, MapPin, Trash2, TrendingUp } from "lucide-react";
import { Dispatch, SetStateAction } from "react";



type SingleWorkExperienceComponentProps = {
    experience: IWorkExperienceDTO;
    setEditMode: Dispatch<SetStateAction<boolean>>;

}



export const SingleWorkExperienceComponent = ({experience,setEditMode}: SingleWorkExperienceComponentProps) => {
    const handleDelete = (id: string) => {
       
      };
       const getEmploymentTypeColor = (type: EmploymentType) => {
    const colors = {
      'full-time': 'bg-emerald-100 text-emerald-700',
      'part-time': 'bg-blue-100 text-blue-700',
      'contract': 'bg-purple-100 text-purple-700',
      'freelance': 'bg-orange-100 text-orange-700',
      'internship': 'bg-pink-100 text-pink-700',
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

    const formatDate = (dateString: string) => {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };
  
    const calculateDuration = (start: string, end?: string, current?: boolean) => {
      const startDate = new Date(start);
      const endDate = current ? new Date() : end ? new Date(end) : new Date();
      
      const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + 
                     (endDate.getMonth() - startDate.getMonth());
      
      const years = Math.floor(months / 12);
      const remainingMonths = months % 12;
      
      if (years === 0) return `${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
      if (remainingMonths === 0) return `${years} year${years !== 1 ? 's' : ''}`;
      return `${years} year${years !== 1 ? 's' : ''} ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
    };
    return (
        <>
          <div className="group relative p-5 bg-white border border-gray-200 rounded-xl hover:border-indigo-200 hover:shadow-md transition-all">
                {/* Drag Handle */}
                <div className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-move">
                  <GripVertical size={16} className="text-gray-400" />
                </div>

                <div className="pl-4">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-3 mb-2">
                        <div className="w-12 h-12 bg-linear-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center shrink-0">
                          <Building2 size={20} className="text-indigo-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-gray-900 text-lg">{experience.position}</h4>
                          <p className="text-indigo-600 font-semibold text-sm">{experience.company}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-2 text-xs text-gray-600">
                        <span className={`px-2.5 py-1 rounded-lg font-medium ${getEmploymentTypeColor(experience.employmentType)}`}>
                          {experience.employmentType.charAt(0).toUpperCase() + experience.employmentType.slice(1).replace('-', ' ')}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {formatDate(experience.startDate)} - {experience.currentlyWorking ? 'Present' : formatDate(experience.endDate || '')}
                        </span>
                        <span className="text-gray-500">• {calculateDuration(experience.startDate, experience.endDate, experience.currentlyWorking)}</span>
                        <span className="flex items-center gap-1">
                          <MapPin size={12} />
                          {experience.location}
                          {experience.remote && ' • Remote'}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                      onClick={() => setEditMode(true)}
                        
                        className="p-2 rounded-lg text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all"
                        aria-label="Edit"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(experience.id!)}
                        className="p-2 rounded-lg text-gray-600 hover:bg-rose-50 hover:text-rose-600 transition-all"
                        aria-label="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                 
                
                
               
              </div>
             {/* Description */}
                  <p className="text-sm text-gray-700 leading-relaxed mb-3">
                    {experience.description}
                  </p>

                  {/* Achievements */}
                  {experience.achievements && experience.achievements.length > 0 && (
                    <div className="mb-3">
                      <h5 className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
                        <Award size={12} className="text-indigo-600" />
                        Key Achievements
                      </h5>
                      <ul className="space-y-1.5">
                        {experience.achievements.map((achievement, idx) => (
                          <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                            <TrendingUp size={12} className="text-emerald-600 mt-1 shrink-0" />
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  
                   </div>
        </>
    );
}