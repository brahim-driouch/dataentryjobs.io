import { IWorkExperienceDTO } from "@/types/profile";
import { Briefcase, MapPin, Calendar, Award, Code } from "lucide-react";



type WorkExperienceDisplayProps = {
  experience: IWorkExperienceDTO;
};

export const   ProfileWorkExperienceSectionContent   = ({ experience }: WorkExperienceDisplayProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const formatEmploymentType = (type: string) => {
    return type.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join('-');
  };

  const calculateDuration = () => {
    const start = new Date(experience.startDate);
    const end = experience.currentlyWorking ? new Date() : new Date(experience.endDate!);
    
    const months = (end.getFullYear() - start.getFullYear()) * 12 + 
                   (end.getMonth() - start.getMonth());
    
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (years > 0 && remainingMonths > 0) {
      return `${years} yr${years > 1 ? 's' : ''} ${remainingMonths} mo${remainingMonths > 1 ? 's' : ''}`;
    } else if (years > 0) {
      return `${years} yr${years > 1 ? 's' : ''}`;
    } else {
      return `${remainingMonths} mo${remainingMonths > 1 ? 's' : ''}`;
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 px-5 py-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl">
              <Briefcase className="text-white" size={20} />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">{experience.position}</h3>
              <p className="text-white/90 font-medium text-sm mt-0.5">{experience.company}</p>
            </div>
          </div>
          <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-lg">
            <span className="text-xs font-semibold text-white">
              {formatEmploymentType(experience.employmentType)}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Meta Info */}
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar size={16} className="text-indigo-600" />
            <span>
              {formatDate(experience.startDate)} - {' '}
              {experience.currentlyWorking ? (
                <span className="font-semibold text-indigo-600">Present</span>
              ) : (
                formatDate(experience.endDate!)
              )}
            </span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-500">{calculateDuration()}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg">
            <MapPin size={14} className="text-indigo-600" />
            <span className="text-sm text-gray-700">{experience.location}</span>
          </div>
          {experience.remote && (
            <div className="px-3 py-1.5 bg-emerald-50 rounded-lg">
              <span className="text-sm font-medium text-emerald-700">Remote</span>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="pt-2">
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
            {experience.description}
          </p>
        </div>

        {/* Achievements */}
        {experience.achievements && experience.achievements.length > 0 && (
          <div className="pt-2">
            <div className="flex items-center gap-2 mb-3">
              <Award size={16} className="text-indigo-600" />
              <h4 className="text-sm font-semibold text-gray-900">Key Achievements</h4>
            </div>
            <ul className="space-y-2">
              {experience.achievements.map((achievement, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-indigo-600 font-bold mt-1">•</span>
                  <span className="flex-1">{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Technologies */}
        {experience.technologies && experience.technologies.length > 0 && (
          <div className="pt-2">
            <div className="flex items-center gap-2 mb-3">
              <Code size={16} className="text-indigo-600" />
              <h4 className="text-sm font-semibold text-gray-900">Technologies Used</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {experience.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-linear-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-lg text-xs font-medium text-indigo-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}