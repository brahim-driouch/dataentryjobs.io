import { EmploymentType, IWorkExperience } from "@/types/profile";
import mongoose, { Model, Schema } from "mongoose";

const WorkExperienceSchema = new Schema<IWorkExperience>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  company: { type: String, required: true },
  position: { type: String, required: true },
  employmentType: { 
    type: String, 
    enum: Object.values(EmploymentType), 
    required: true 
  },
  location: { type: String, required: true },
  remote: { type: Boolean, default: false },
  startDate: { type: String, required: true },
  endDate: { type: String },
  currentlyWorking: { type: Boolean, default: false },
  description: { type: String, required: true },
  achievements: [{ type: String }],
  technologies: [{ type: String }],
  order: { type: Number, default: 0 }
}, { timestamps: true });

WorkExperienceSchema.index({ userId: 1, order: 1 });

export const WorkExperience: Model<IWorkExperience> = mongoose.models.WorkExperience || mongoose.model<IWorkExperience>('WorkExperience', WorkExperienceSchema);