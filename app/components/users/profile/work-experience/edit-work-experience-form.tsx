import { IWorkExperienceDTO } from "@/types/profile";
import { useState, useEffect, SetStateAction, Dispatch } from "react";
import { Award, Code, TrendingUp, X, Plus, Save, Trash2 } from "lucide-react";

type EditWorkExperienceFormProps = {
  experience: IWorkExperienceDTO;
 setEditMode:Dispatch<SetStateAction<boolean>>
}

export const EditWorkExperienceForm = ({ 
  experience, 
  setEditMode

}: EditWorkExperienceFormProps) => {
  const [formData, setFormData] = useState<IWorkExperienceDTO>({ ...experience });
  const [newAchievement, setNewAchievement] = useState("");
  const [newTechnology, setNewTechnology] = useState("");

  // Initialize arrays if they don't exist
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      achievements: prev.achievements || [],
     
    }));
  }, [experience]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddAchievement = () => {
    if (newAchievement.trim()) {
      setFormData(prev => ({
        ...prev,
        achievements: [...(prev.achievements || []), newAchievement.trim()]
      }));
      setNewAchievement("");
    }
  };

  const handleRemoveAchievement = (index: number) => {
    setFormData(prev => ({
      ...prev,
      achievements: prev.achievements?.filter((_, i) => i !== index) || []
    }));
  };

   const formatDateForInput = (dateString: string | undefined): string => {
    if (!dateString) return "";
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "";
      
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      
      return `${year}-${month}-${day}`;
    } catch {
      return "";
    }
  };
  

  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Edit Work Experience</h2>
        <div className="flex gap-2">
         
            <button
              type="button"
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete experience"
            >
              <Trash2 size={20} />
            </button>
          
        </div>
      </div>

      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Job Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.position || ""}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company *
          </label>
          <input
            type="text"
            name="company"
            value={formData.company || ""}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Date *
          </label>
          <input
            type="date"
            name="startDate"
            value={formatDateForInput(formData.startDate) || ""}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            End Date
          </label>
          <input
            type="date"
            name="endDate"
            value={formatDateForInput(formData.endDate) || ""}
            onChange={handleInputChange}
            placeholder="Present"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />
          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              id="currentJob"
              checked={!formData.endDate}
              onChange={(e) => {
                setFormData(prev => ({
                  ...prev,
                  endDate: e.target.checked ? "" : new Date().toISOString().slice(0, 7)
                }));
              }}
              className="mr-2"
            />
            <label htmlFor="currentJob" className="text-sm text-gray-600">
              I currently work here
            </label>
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description *
        </label>
        <textarea
          name="description"
          value={formData.description || ""}
          onChange={handleInputChange}
          required
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition resize-vertical"
          placeholder="Describe your role and responsibilities..."
        />
      </div>

      {/* Achievements Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
            <Award size={14} className="text-indigo-600" />
            Key Achievements
          </label>
          <span className="text-xs text-gray-500">
            {formData.achievements?.length || 0} items
          </span>
        </div>

        <div className="space-y-2">
          {formData.achievements?.map((achievement, index) => (
            <div key={index} className="flex items-center gap-2">
              <TrendingUp size={14} className="text-emerald-600 mt-0.5 shrink-0" />
              <input
                type="text"
                value={achievement}
                onChange={(e) => {
                  const newAchievements = [...formData.achievements!];
                  newAchievements[index] = e.target.value;
                  setFormData(prev => ({ ...prev, achievements: newAchievements }));
                }}
                className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition"
              />
              <button
                type="button"
                onClick={() => handleRemoveAchievement(index)}
                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={newAchievement}
            onChange={(e) => setNewAchievement(e.target.value)}
            placeholder="Add a new achievement..."
            className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddAchievement();
              }
            }}
          />
          <button
            type="button"
            onClick={handleAddAchievement}
            className="px-4 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg font-medium transition-colors flex items-center gap-1.5"
          >
            <Plus size={16} />
            Add
          </button>
        </div>
      </div>

      {/* Technologies Section */}
      <div className="space-y-3">
        

       

   
      </div>

      {/* Location (Optional) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Location
        </label>
        <input
          type="text"
          name="location"
          value={formData.location || ""}
          onChange={handleInputChange}
          placeholder="City, Country"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
        />
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={() => setEditMode(false)}
          className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg font-medium transition-colors flex items-center gap-1.5"
        >
          <Save size={16} />
          Save Changes
        </button>
      </div>
    </form>
  );
};