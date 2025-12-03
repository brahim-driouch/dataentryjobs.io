import { ILanguage, LanguageProficiency } from "@/types/profile";
import mongoose, { Model, Schema } from "mongoose";

const LanguageSchema = new Schema<ILanguage>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  language: { type: String, required: true },
  proficiency: { 
    type: String, 
    enum: Object.values(LanguageProficiency), 
    required: true 
  },
  order: { type: Number, default: 0 }
}, { timestamps: true });

LanguageSchema.index({ userId: 1, order: 1 });

export const Language: Model<ILanguage> = mongoose.models.Language || mongoose.model<ILanguage>('Language', LanguageSchema);