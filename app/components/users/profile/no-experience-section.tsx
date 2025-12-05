



"use client";

import { User, Edit2 } from "lucide-react";




 export const NoExperienceSection = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div className="bg-linear-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <User className="text-blue-600" size={20} />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">Experience</h2>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-50 rounded-xl">
            <User className="text-blue-600" size={24} />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">
              Add your experience
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Help employers learn about your background and experience
            </p>
            <button
              className="px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all flex items-center gap-2 font-medium shadow-sm hover:shadow-md"
            >
              <Edit2 size={18} />
              <span>Add Information</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};