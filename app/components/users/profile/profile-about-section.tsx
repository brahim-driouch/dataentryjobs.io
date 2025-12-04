"use client";

import { Save, Edit2, User } from "lucide-react";
import { useState } from "react";

type ProfileAboutSectionProps = {
  editMode: string | null;
  setEditMode: (mode: string | null) => void;
  fullName: string;
  title: string;
  summary: string;
}

export const ProfileAboutSection = ({ editMode, setEditMode, fullName, title, summary }: ProfileAboutSectionProps) => {
  const [personalInfo, setPersonalInfo] = useState({
    fullName: fullName,
    title: title,
    summary: summary,
  });

  // input change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPersonalInfo({
      ...personalInfo,
      [name]: value,
    });
  };

  // save handler
  const handleSave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // TODO: Add API call to save data
    setEditMode(null);
  };

  return (
    <div className=" rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
      {/* Section Header */}
      <div className="bg-linear-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <User className="text-blue-600" size={20} />
            </div>
          
          </div>
          <button
            onClick={() => setEditMode(editMode === 'personal' ? null : 'personal')}
            className="p-2 rounded-lg text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
          >
            <Edit2 size={18} />
          </button>
        </div>
      </div>

      {/* Section Content */}
      <div className="p-6">
        {editMode === 'personal' ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={personalInfo.fullName}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                  Professional Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={personalInfo.title}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  onChange={handleChange}
                  placeholder="e.g. Senior Software Engineer"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                Professional Summary
              </label>
              <textarea
                name="summary"
                value={personalInfo.summary}
                rows={5}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                onChange={handleChange}
                placeholder="Tell us about your professional experience and goals..."
              />
              <p className="text-xs text-gray-500 mt-1.5">
                {personalInfo.summary.length} characters
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setEditMode(null)}
                className="px-5 py-2.5 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all font-medium text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all flex items-center gap-2 font-medium shadow-sm hover:shadow-md"
              >
                <Save size={18} />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Display Title */}
            <div className="pb-3 border-b border-gray-100">
            
              <h3 className="text-xl font-semibold text-gray-900">
                {personalInfo.title}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {personalInfo.fullName}
              </p>
            </div>

            {/* Display Summary */}
            <div>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {personalInfo.summary}
              </p>
            </div>

            {/* Empty State */}
            {!personalInfo.summary && (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-3">No professional summary added yet</p>
                <button
                  onClick={() => setEditMode('personal')}
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  Add your professional summary
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}