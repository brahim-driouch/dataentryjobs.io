import { EmploymentType, IWorkExperience } from "@/types/profile";
import mongoose, { Model, Schema } from "mongoose";

const WorkExperienceSchema = new Schema<IWorkExperience>({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  company: { type: String, required: true },
  position: { type: String, required: true },
  employment_type: { 
    type: String, 
    enum: Object.values(EmploymentType), 
    required: true 
},
  location: { type: String, required: true },
  remote: { type: Boolean, default: false },
  start_date: { type: String, required: true },
  end_date: { type: String },
  currently_working: { type: Boolean, default: false },
  description: { type: String, required: true },
  achievements: [{ type: String }],
  order: { type: Number, default: 0 }
}, { timestamps: true });

WorkExperienceSchema.index({ user_id: 1, order: 1 });

export const WorkExperience: Model<IWorkExperience> = mongoose.models.WorkExperience || mongoose.model<IWorkExperience>('WorkExperience', WorkExperienceSchema);