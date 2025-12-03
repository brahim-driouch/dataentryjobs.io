
import { Availability, IPersonalInfo, REMOTE_PREFERENCES, RemotePreference } from '@/types/profile';
import mongoose, { Schema, Model } from 'mongoose';




const PersonalInfoSchema = new Schema<IPersonalInfo>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  location: { type: String, required: true },
  city: { type: String },
  state: { type: String },
  country: { type: String },
  zipCode: { type: String },
  professionalTitle: { type: String, required: true },
  profilePhoto: { type: String },
  resumeUrl: { type: String },
  portfolioUrl: { type: String },
  linkedinUrl: { type: String },
  githubUrl: { type: String },
  websiteUrl: { type: String },
  summary: { type: String, required: true },
  availability: { 
    type: String, 
    enum: Object.values(Availability), 
    default: Availability.IMMEDIATELY 
  },

  remotePreference: { 
    type: String, 
    enum: Object.values(REMOTE_PREFERENCES), 
    default: RemotePreference.FLEXIBLE 
  },
  willingToRelocate: { type: Boolean, default: false },
  expectedSalaryMin: { type: Number },
  expectedSalaryMax: { type: Number },
  salaryCurrency: { type: String, default: 'USD' }
}, { timestamps: true });

PersonalInfoSchema.index({ userId: 1 });

export const PersonalInfo: Model<IPersonalInfo> = mongoose.models.PersonalInfo || mongoose.model<IPersonalInfo>('PersonalInfo', PersonalInfoSchema);






// Skill Interface & Schema









