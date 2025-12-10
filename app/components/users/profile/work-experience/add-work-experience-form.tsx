import { IWorkExperienceDTO, EmploymentType, IndustryCategory } from "@/types/profile";
import { useState } from "react";
import { Briefcase, MapPin, Calendar, Plus, X, Save, Info, Code, Award } from "lucide-react";
import { dataTransformerToSnakeCase } from "@/utils/data-transformer";
import { showSuccess } from "@/utils/showSuccess";
import { showErrors } from "@/utils/show-errors";
import { useQueryClient } from "@tanstack/react-query";
import { useAddWorkExperience } from "@/hooks/profile/useAddWorkExperience";

type AddProfileExperienceFormProps = {
  setEditMode: (editMode: boolean) => void;
  userId: string;
};

export default function AddProfileExperienceForm({ 
  setEditMode,
  userId
}: AddProfileExperienceFormProps) {
  // states
  const [newAchievement, setNewAchievement] = useState("");
  const [newTechnology, setNewTechnology] = useState("");
  const [newWorkExperience, setNewWorkExperience] = useState<IWorkExperienceDTO>({
    company: "",
    position: "",
    employmentType: EmploymentType.FULL_TIME,
    location: "",
    remote: false,
    startDate: "",
    endDate: "",
    currentlyWorking: false,
    description: "",
    achievements: [],
    userId: userId, 
    industryCategory: IndustryCategory.OTHER,
    order: 0,  
  });
  
  // hooks
  const mutation = useAddWorkExperience(userId)
  //const mutation = useUpdateWorkExperience(userId);
  const queryClient = useQueryClient();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setNewWorkExperience({ ...newWorkExperience, [name]: checked });
      
      // Clear endDate if currently working
      if (name === 'currentlyWorking' && checked) {
        setNewWorkExperience({ ...newWorkExperience, currentlyWorking: true, endDate: undefined });
      }
    } else {
      setNewWorkExperience({ ...newWorkExperience, [name]: value });
    }
  };

  // Handle adding achievement
  const handleAddAchievement = () => {
    if (newAchievement.trim()) {
      const achievements = newWorkExperience.achievements || [];
      setNewWorkExperience({ 
        ...newWorkExperience, 
        achievements: [...achievements, newAchievement.trim()] 
      });
      setNewAchievement("");
    }
  };

  // Handle removing achievement
  const handleRemoveAchievement = (index: number) => {
    const achievements = newWorkExperience.achievements || [];
    setNewWorkExperience({ 
      ...newWorkExperience, 
      achievements: achievements.filter((_, i) => i !== index) 
    });
  };



  // Handle save
  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await mutation.mutateAsync(newWorkExperience as IWorkExperienceDTO);
      showSuccess("Work experience updated successfully");
      await queryClient.invalidateQueries({ queryKey: ['profile', userId] });
      setEditMode(false);
    } catch (error: Error | unknown) {
      showErrors([`Error: ${error instanceof Error ? error.message : "Please try again"}`], () => {});
    }
  };

  return (
    <div className="w-full space-y-4 p-5">
      {/* Information Card */}
      <div className="bg-linear-to-r from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-100">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-white rounded-lg">
            <Info size={16} className="text-indigo-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900">Add your work experience</p>
            <p className="text-xs text-gray-600 mt-1">
              Include your previous roles, responsibilities, and achievements to showcase your professional journey
            </p>
          </div>
        </div>
      </div>

      {/* Edit Form */}
      <div className="space-y-4">
        {/* Company & Position */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-gray-700 mb-1.5 block">
              Company <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="company"
              value={newWorkExperience.company}
              onChange={handleChange}
              className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              placeholder="Google"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-700 mb-1.5 block">
              Position <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="position"
              value={newWorkExperience.position}
              onChange={handleChange}
              className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              placeholder="Senior Software Engineer"
            />
          </div>
        </div>

        {/* Employment Type & Location */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-gray-700 mb-1.5 block">
              Employment Type <span className="text-rose-500">*</span>
            </label>
            <select
              name="employmentType"
              value={newWorkExperience.employmentType}
              onChange={handleChange}
              className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            >
              <option value="fulltime">Full-time</option>
              <option value="parttime">Part-time</option>
              <option value="contract">Contract</option>
              <option value="freelance">Freelance</option>
              <option value="internship">Internship</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-700 mb-1.5 block">Location</label>
            <input
              type="text"
              name="location"
              value={newWorkExperience.location}
              onChange={handleChange}
              className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              placeholder="San Francisco, CA"
            />
          </div>
        </div>

        {/* Remote Work Checkbox */}
        <div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="remote"
              checked={newWorkExperience.remote}
              onChange={handleChange}
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-2 focus:ring-indigo-500"
            />
            <span className="text-sm font-medium text-gray-700">Remote Position</span>
          </label>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-gray-700 mb-1.5 block">
              Start Date <span className="text-rose-500">*</span>
            </label>
            <input
              type="date"
              name="startDate"
              value={newWorkExperience.startDate}
              onChange={handleChange}
              className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-700 mb-1.5 block">
              End Date {!newWorkExperience.currentlyWorking && <span className="text-rose-500">*</span>}
            </label>
            <input
              type="date"
              name="endDate"
              value={newWorkExperience.endDate || ''}
              onChange={handleChange}
              disabled={newWorkExperience.currentlyWorking}
              className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>
        </div>

        {/* Currently Working Checkbox */}
        <div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="currentlyWorking"
              checked={newWorkExperience.currentlyWorking}
              onChange={handleChange}
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-2 focus:ring-indigo-500"
            />
            <span className="text-sm font-medium text-gray-700">I currently work here</span>
          </label>
        </div>

        {/* Description */}
        <div>
          <label className="text-xs font-semibold text-gray-700 mb-1.5 block">
            Description <span className="text-rose-500">*</span>
          </label>
          <textarea
            name="description"
            value={newWorkExperience.description}
            rows={4}
            onChange={handleChange}
            className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none transition-all"
            placeholder="Describe your role, responsibilities, and key projects..."
          />
          <p className="text-xs text-gray-500 mt-1.5">{newWorkExperience.description?.length || 0} characters</p>
        </div>

        {/* Achievements */}
        <div>
          <label className="text-xs font-semibold text-gray-700 mb-1.5 block">
            Key Achievements
          </label>
          <div className="space-y-2">
            {newWorkExperience.achievements?.map((achievement, index) => (
              <div key={index} className="flex items-center gap-2 group">
                <Award size={14} className="text-indigo-600 shrink-0" />
                <span className="flex-1 text-sm text-gray-700">{achievement}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveAchievement(index)}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-50 rounded transition-all"
                >
                  <X size={14} className="text-red-600" />
                </button>
              </div>
            ))}
            <div className="flex gap-2">
              <input
                type="text"
                value={newAchievement}
                onChange={(e) => setNewAchievement(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddAchievement()}
                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                placeholder="Add an achievement..."
              />
              <button
                type="button"
                onClick={handleAddAchievement}
                className="px-3 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
        </div>

       
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
          <button
            onClick={() => setEditMode(false)}
            className="px-5 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2.5 text-sm font-semibold text-white bg-linear-to-r from-indigo-600 to-purple-600 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all flex items-center gap-2 shadow-lg shadow-indigo-500/30"
          >
            <Save size={16} />
            Save Changes
          </button>
        </div>
      </div>
    
  );
}