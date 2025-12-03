import { DegreeType, IEducation } from "@/types/profile";
import mongoose, { Model, Schema } from "mongoose";

const EducationSchema = new Schema<IEducation>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  school: { type: String, required: true },
  degree: { type: String, required: true },
  fieldOfStudy: { type: String, required: true },
  degreeType: { 
    type: String, 
    enum: Object.values(DegreeType), 
    required: true 
  },
  startDate: { type: String, required: true },
  endDate: { type: String },
  currentlyEnrolled: { type: Boolean, default: false },
  gpa: { type: Number },
  description: { type: String },
  achievements: [{ type: String }],
  location: { type: String },
  order: { type: Number, default: 0 }
}, { timestamps: true });

EducationSchema.index({ userId: 1, order: 1 });

export const Education: Model<IEducation> = mongoose.models.Education || mongoose.model<IEducation>('Education', EducationSchema);