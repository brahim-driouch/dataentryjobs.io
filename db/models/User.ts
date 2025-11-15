import mongoose, { ObjectId } from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUserModel } from '@/types/user';


const userSchema = new mongoose.Schema({
  // Auth
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function(value) {
        return /^\S+@\S+\.\S+$/.test(value);
      },
      message: 'Please provide a valid email address'
    },
    index: true,
  },
  
  password_hash: {
    type: String,
    required: [true, 'Password is required'],
    select: false
  },
  
  // Profile
  full_name: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  
  // Preferences
  job_preferences: {
    categories: [{
      type: String,
      enum: ['Medical', 'General', 'Legal', 'Ecommerce', 'Finance', 'Logistics', 'Other']
    }],
    locations: [{
      type: String,
      trim: true
    }],
    remote_only: {
      type: Boolean,
      default: false
    },
    min_salary: {
      type: Number,
      min: 0,
      default: null
    },
    salary_currency: {
      type: String,
      enum: ['USD', 'EUR', 'GBP', 'INR', 'PHP', 'PKR', 'BDT', 'NGN', 'CAD', 'AUD'],
      default: 'USD'
    }
  },
  
  // Saved Jobs
  saved_jobs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job'
  }],
  
  // Email Alerts
  email_alerts_enabled: {
    type: Boolean,
    default: true
  },
  
  alert_frequency: {
    type: String,
    enum: ['daily', 'weekly', 'instant'],
    default: 'weekly'
  },
  
  // Timestamps
  last_login: {
    type: Date,
    default: null
  }
  
}, {
  timestamps: true
});

// Indexes
userSchema.index({ email: 1 });

// Pre-save middleware - Hash password
userSchema.pre('save', async function(next) {
  if (!this.isModified('password_hash')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password_hash = await bcrypt.hash(this.password_hash, salt);
    next();
  } catch (error:Error | any) {
    next(error);
  }
});

// Instance method - Compare password
userSchema.methods.comparePassword = async function(candidatePassword:string) {
  if (!this.password_hash) {
    const user = await (this.constructor as IUserModel).findById(this._id).select('+password_hash');
    this.password_hash = user?.password_hash;
  }
  return bcrypt.compare(candidatePassword, this.password_hash);
};

// Instance method - Save job
userSchema.methods.saveJob = function(jobId: mongoose.Types.ObjectId) {
  if (!this.saved_jobs.includes(jobId)) {
    this.saved_jobs.push(jobId);
    return this.save();
  }
  return Promise.resolve(this);
};

// Instance method - Unsave job
userSchema.methods.unsaveJob = function(jobId: mongoose.Types.ObjectId) {
  this.saved_jobs = this.saved_jobs.filter((id: { equals: (arg0: mongoose.Types.ObjectId) => any; }) => !id.equals(jobId));
  return this.save();
};

// Instance method - Check if job is saved
userSchema.methods.isJobSaved = function(jobId: mongoose.Types.ObjectId) {
  return this.saved_jobs.some((id: { equals: (arg0: string) => any; }) => id.equals(jobId.toString()));
};

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
