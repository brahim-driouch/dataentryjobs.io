
"use client";

import { EmploymentType, IWorkExperienceDTO } from "@/types/profile";
import { 
  Briefcase, Plus, Edit2, Trash2, Save, X, MapPin, Calendar,
  Award, Code, Building2, TrendingUp, GripVertical
} from "lucide-react";
import { useState } from "react";

type WorkExperienceSectionProps = {
  experiences: IWorkExperienceDTO[];
};

export const ProfileWorkExperienceSectionContent = ({ experiences: initialExperiences }: WorkExperienceSectionProps) => {
  const [experiences, setExperiences] = useState<IWorkExperienceDTO[]>(initialExperiences);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [editForm, setEditForm] = useState<Partial<IWorkExperienceDTO>>({});

  const handleEdit = (experience: IWorkExperienceDTO) => {
    setEditingId(experience.id || null);
    setEditForm(experience);
    setIsAdding(false);
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsAdding(false);
    setEditForm({});
  };

  const handleSave = () => {
    if (isAdding) {
      const newExperience: IWorkExperienceDTO = {
        ...editForm as IWorkExperienceDTO,
        id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const updated = [...experiences, newExperience];
      setExperiences(updated);
    } else {
      const updated = experiences.map(exp => 
        exp.id === editingId ? { ...editForm as IWorkExperienceDTO, updatedAt: new Date() } : exp
      );
      setExperiences(updated);
    }
    handleCancel();
  };

  const handleDelete = (id: string) => {
    const updated = experiences.filter(exp => exp.id !== id);
    setExperiences(updated);
  };

  const handleChange = (field: string, value: any) => {
    setEditForm({ ...editForm, [field]: value });
  };

  const handleArrayChange = (field: 'achievements' | 'technologies', index: number, value: string) => {
    const array = [...(editForm[field] || [])];
    array[index] = value;
    setEditForm({ ...editForm, [field]: array });
  };

  const handleArrayAdd = (field: 'achievements' | 'technologies') => {
    const array = [...(editForm[field] || []), ''];
    setEditForm({ ...editForm, [field]: array });
  };

  const handleArrayRemove = (field: 'achievements' | 'technologies', index: number) => {
    const array = (editForm[field] || []).filter((_, i) => i !== index);
    setEditForm({ ...editForm, [field]: array });
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

  return (
    <div className="w-full rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      {/* Header */}
  

      {/* Content */}
      <div className="p-5">
        <div className="space-y-4">
          {experiences.map((exp, index) => (
            <div key={exp.id}>
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
                        <div className="w-12 h-12 bg-linear-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Building2 size={20} className="text-indigo-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-gray-900 text-lg">{exp.position}</h4>
                          <p className="text-indigo-600 font-semibold text-sm">{exp.company}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-2 text-xs text-gray-600">
                        <span className={`px-2.5 py-1 rounded-lg font-medium ${getEmploymentTypeColor(exp.employmentType)}`}>
                          {exp.employmentType.charAt(0).toUpperCase() + exp.employmentType.slice(1).replace('-', ' ')}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {formatDate(exp.startDate)} - {exp.currentlyWorking ? 'Present' : formatDate(exp.endDate || '')}
                        </span>
                        <span className="text-gray-500">• {calculateDuration(exp.startDate, exp.endDate, exp.currentlyWorking)}</span>
                        <span className="flex items-center gap-1">
                          <MapPin size={12} />
                          {exp.location}
                          {exp.remote && ' • Remote'}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleEdit(exp)}
                        className="p-2 rounded-lg text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all"
                        aria-label="Edit"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(exp.id!)}
                        className="p-2 rounded-lg text-gray-600 hover:bg-rose-50 hover:text-rose-600 transition-all"
                        aria-label="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-700 leading-relaxed mb-3">
                    {exp.description}
                  </p>

                  {/* Achievements */}
                  {exp.achievements && exp.achievements.length > 0 && (
                    <div className="mb-3">
                      <h5 className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
                        <Award size={12} className="text-indigo-600" />
                        Key Achievements
                      </h5>
                      <ul className="space-y-1.5">
                        {exp.achievements.map((achievement, idx) => (
                          <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                            <TrendingUp size={12} className="text-emerald-600 mt-1 flex-shrink-0" />
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Technologies */}
                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="mt-3">
                      <h5 className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
                        <Code size={12} className="text-indigo-600" />
                        Technologies
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1.5 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-lg"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Edit/Add Form */}
        {(editingId || isAdding) && (
          <div className="mt-6 p-5 bg-gray-50 border border-gray-200 rounded-xl">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-bold text-gray-900">
                {isAdding ? 'Add New Experience' : 'Edit Experience'}
              </h4>
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all flex items-center gap-2"
                >
                  <Save size={16} />
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all flex items-center gap-2"
                >
                  <X size={16} />
                  Cancel
                </button>
              </div>
            </div>
            
            {/* Form fields would go here */}
            <div className="text-sm text-gray-500">
              Form fields for editing/adding work experience would be implemented here
            </div>
          </div>
        )}
      </div>
    </div>
  );
};