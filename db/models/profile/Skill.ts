import { ISkill, ProficiencyLevel, SkillCategory } from "@/types/profile";
import mongoose, { Model, Schema } from "mongoose";

const SkillSchema = new Schema<ISkill>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  category: { 
    type: String, 
    enum: Object.values(SkillCategory), 
    required: true 
  },
  proficiencyLevel: { 
    type: String, 
    enum: Object.values(ProficiencyLevel), 
    required: true 
  },
  yearsOfExperience: { type: Number },
  order: { type: Number, default: 0 }
}, { timestamps: true });

SkillSchema.index({ userId: 1, order: 1 });

export const Skill: Model<ISkill> = mongoose.models.Skill || mongoose.model<ISkill>('Skill', SkillSchema);