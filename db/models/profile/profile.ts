
import { Availability, IPersonalInfo, REMOTE_PREFERENCES, RemotePreference } from '@/types/profile';
import mongoose, { Schema, Model } from 'mongoose';




const PersonalInfoSchema = new Schema<IPersonalInfo>({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  full_name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: false,default:"" },
   location: {
    country: {
      type: String,
      required: [true, 'Country is required']
    },
    country_code: {
      type: String,
      uppercase: true,
      minlength: 2,
      maxlength: 3
    },
  city:{type:String,required:false,default:""},
    state: {type:String,required:false,default:""},
    timezone: {type:String,required:false,default:""}
  },
  professional_title: { type: String },
  profile_photo: { type: String ,default:"" },
  resume_url: { type: String ,default:"" },
  portfolio_url: { type: String ,default:"" },
  linkedin_url: { type: String ,default:"" },
  github_url: { type: String ,default:"" },
  website_url: { type: String ,default:"" },
  summary: { type: String,default:"" },
  availability: { 
    type: String, 
    enum: Object.values(Availability), 
    default: Availability.IMMEDIATELY 
  },

  remote_preference: { 
    type: String, 
    enum: Object.values(REMOTE_PREFERENCES), 
    default: RemotePreference.FLEXIBLE 
  },
  willing_to_relocate: { type: Boolean, default: false },
  expected_salary_min: { type: Number },
  expected_salary_max: { type: Number },
  salary_currency: { type: String, default: 'USD' }
}, { timestamps: true });

PersonalInfoSchema.index({ user_id: 1 });

export const PersonalInfo: Model<IPersonalInfo> = mongoose.models.PersonalInfo || mongoose.model<IPersonalInfo>('PersonalInfo', PersonalInfoSchema);






// Skill Interface & Schema









