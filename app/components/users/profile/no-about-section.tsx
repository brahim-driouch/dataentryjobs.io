import { Eye, MessageSquare, Plus, User, UserCheck } from "lucide-react";

export const NoAboutSection = () => {
  return (
    <div className="bg-linear-to-br from-cyan-50 to-blue-50 rounded-2xl border-2 border-dashed border-cyan-200 p-8 hover:border-cyan-300 transition-all duration-300">
      <div className="max-w-md mx-auto text-center">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-100 rounded-2xl mb-4">
          <User className="text-cyan-600" size={32} />
        </div>

        {/* Heading */}
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Tell Your Story
        </h3>
        
        {/* Description */}
        <p className="text-gray-600 mb-6">
          Create a professional summary to introduce yourself to employers
        </p>

        {/* Stats/Benefits */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <Eye className="text-cyan-600 mx-auto mb-1" size={20} />
            <p className="text-xs font-semibold text-gray-900">First</p>
            <p className="text-xs text-gray-600">Impression</p>
          </div>
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <UserCheck className="text-green-600 mx-auto mb-1" size={20} />
            <p className="text-xs font-semibold text-gray-900">+50%</p>
            <p className="text-xs text-gray-600">Profile Views</p>
          </div>
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <MessageSquare className="text-blue-600 mx-auto mb-1" size={20} />
            <p className="text-xs font-semibold text-gray-900">3x</p>
            <p className="text-xs text-gray-600">Messages</p>
          </div>
        </div>

        {/* CTA Button */}
        <button
          className="w-full px-6 py-3 bg-cyan-600 text-white rounded-xl hover:bg-cyan-700 transition-all flex items-center justify-center gap-2 font-semibold shadow-lg hover:shadow-xl group"
        >
          <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
          <span>Add Your Summary</span>
        </button>

        {/* Helper Text */}
        <p className="text-xs text-gray-500 mt-4">
          Share your experience, skills, and what makes you unique
        </p>
      </div>
    </div>
  );
};
