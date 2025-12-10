import { Briefcase, Eye, Plus, Sparkles, TrendingUp } from "lucide-react";

export const NoWorkExperienceSection = ({setAddMode}: {setAddMode: (addMode: boolean) => void}) => {
  
 
  return (
    <div className="w-full bg-linear-to-br from-blue-50 to-indigo-50 rounded-2xl border-2 border-dashed border-blue-200 p-8 hover:border-blue-300 transition-all duration-300">
      <div className="max-w-md mx-auto text-center">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
          <Briefcase className="text-blue-600" size={32} />
        </div>

        {/* Heading */}
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Add Your Work Experience
        </h3>
        
        {/* Description */}
        <p className="text-gray-600 mb-6">
          Showcase your professional background to stand out to employers
        </p>

        {/* Stats/Benefits */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <Eye className="text-blue-600 mx-auto mb-1" size={20} />
            <p className="text-xs font-semibold text-gray-900">3x</p>
            <p className="text-xs text-gray-600">More Views</p>
          </div>
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <TrendingUp className="text-green-600 mx-auto mb-1" size={20} />
            <p className="text-xs font-semibold text-gray-900">5x</p>
            <p className="text-xs text-gray-600">More Interest</p>
          </div>
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <Sparkles className="text-yellow-600 mx-auto mb-1" size={20} />
            <p className="text-xs font-semibold text-gray-900">2x</p>
            <p className="text-xs text-gray-600">Job Offers</p>
          </div>
        </div>

        {/* CTA Button */}
        <button
          className="inline-flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300"
          onClick={() => setAddMode(true)}
        >
          Add Work Experience
        </button>

        {/* Helper Text */}
        <p className="text-xs text-gray-500 mt-4">
          Include your job title, company, dates, and key achievements
        </p>
      </div>
    </div>
  );
};