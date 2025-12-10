import { DegreeType, IEducation } from "@/types/profile";
import mongoose, { Model, Schema } from "mongoose";

const EducationSchema = new Schema<IEducation>({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  school: { type: String, required: true },
  degree: { type: String, required: true },
  field_of_study: { type: String, required: true },
  degree_type: { 
    type: String, 
    enum: Object.values(DegreeType), 
    required: true 
  },
  start_date: { type: String, required: true },
  end_date: { type: String },
  currently_enrolled: { type: Boolean, default: false },
  gpa: { type: Number },
  description: { type: String },
  achievements: [{ type: String }],
  location: { type: String },
  order: { type: Number, default: 0 }
}, { timestamps: true });

EducationSchema.index({ user_id: 1, order: 1 });

export const Education: Model<IEducation> = mongoose.models.Education || mongoose.model<IEducation>('Education', EducationSchema);