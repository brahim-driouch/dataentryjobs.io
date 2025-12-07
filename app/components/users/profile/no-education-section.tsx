"use client";

import { Award, BookOpen, GraduationCap, Plus, TrendingUp } from "lucide-react";





 export const NoEducationSection = () => {
  return (
    <div className="bg-linear-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-dashed border-green-200 p-8 hover:border-green-300 transition-all duration-300">
      <div className="max-w-md mx-auto text-center">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-2xl mb-4">
          <GraduationCap className="text-green-600" size={32} />
        </div>

        {/* Heading */}
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Add Your Education
        </h3>
        
        {/* Description */}
        <p className="text-gray-600 mb-6">
          Showcase your academic achievements and qualifications
        </p>

        {/* Stats/Benefits */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <Award className="text-green-600 mx-auto mb-1" size={20} />
            <p className="text-xs font-semibold text-gray-900">+40%</p>
            <p className="text-xs text-gray-600">Credibility</p>
          </div>
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <BookOpen className="text-blue-600 mx-auto mb-1" size={20} />
            <p className="text-xs font-semibold text-gray-900">2x</p>
            <p className="text-xs text-gray-600">Interviews</p>
          </div>
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <TrendingUp className="text-purple-600 mx-auto mb-1" size={20} />
            <p className="text-xs font-semibold text-gray-900">Better</p>
            <p className="text-xs text-gray-600">Matches</p>
          </div>
        </div>

        {/* CTA Button */}
        <button
          className="w-full px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all flex items-center justify-center gap-2 font-semibold shadow-lg hover:shadow-xl group"
        >
          <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
          <span>Add Education</span>
        </button>

        {/* Helper Text */}
        <p className="text-xs text-gray-500 mt-4">
          Include degrees, certifications, bootcamps, or relevant courses
        </p>
      </div>
    </div>
  );
};
