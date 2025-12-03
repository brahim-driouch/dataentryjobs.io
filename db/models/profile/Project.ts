import { IProject } from "@/types/profile";
import mongoose, { Model, Schema } from "mongoose";

const ProjectSchema = new Schema<IProject>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  role: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String },
  currentlyWorking: { type: Boolean, default: false },
  url: { type: String },
  repositoryUrl: { type: String },
  technologies: [{ type: String }],
  highlights: [{ type: String }],
  order: { type: Number, default: 0 }
}, { timestamps: true });

ProjectSchema.index({ userId: 1, order: 1 });

export const Project: Model<IProject> = mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);