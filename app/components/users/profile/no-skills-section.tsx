import { Award, Plus, Star, Target, Zap } from "lucide-react";

export const NoSkillsSection = () => {
  return (
    <div className="bg-linear-to-br from-purple-50 to-pink-50 rounded-2xl border-2 border-dashed border-purple-200 p-8 hover:border-purple-300 transition-all duration-300">
      <div className="max-w-md mx-auto text-center">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-2xl mb-4">
          <Award className="text-purple-600" size={32} />
        </div>

        {/* Heading */}
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Add Your Skills
        </h3>
        
        {/* Description */}
        <p className="text-gray-600 mb-6">
          Highlight your expertise to match with the right opportunities
        </p>

        {/* Stats/Benefits */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <Target className="text-purple-600 mx-auto mb-1" size={20} />
            <p className="text-xs font-semibold text-gray-900">4x</p>
            <p className="text-xs text-gray-600">Better Match</p>
          </div>
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <Zap className="text-yellow-600 mx-auto mb-1" size={20} />
            <p className="text-xs font-semibold text-gray-900">Faster</p>
            <p className="text-xs text-gray-600">Shortlisting</p>
          </div>
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <Star className="text-orange-600 mx-auto mb-1" size={20} />
            <p className="text-xs font-semibold text-gray-900">Higher</p>
            <p className="text-xs text-gray-600">Salary Offers</p>
          </div>
        </div>

        {/* CTA Button */}
        <button
          className="w-full px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all flex items-center justify-center gap-2 font-semibold shadow-lg hover:shadow-xl group"
        >
          <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
          <span>Add Skills</span>
        </button>

        {/* Helper Text */}
        <p className="text-xs text-gray-500 mt-4">
          Add at least 5-10 skills to maximize your job matches
        </p>
      </div>
    </div>
  );
};