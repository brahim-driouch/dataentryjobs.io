import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';


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
  //phone number
  phone_number: {
    type: String,
    trim: true
  },

  // location
  location: {
    country: {
      type: String,
      required: [true, 'Country is required']
    },
    countryCode: {
      type: String,
      uppercase: true,
      minlength: 2,
      maxlength: 3
    },
    city: String,
    state: String,
    timezone: String
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
  
  //email verified
  email_verified: {
    type: Boolean,
    default: false
  },


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

// // Indexes
// userSchema.index({ email: 1 });

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
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  if (!this.password_hash) {
    console.error("⚠️ No password_hash found on user");
    return false;
  }

  
  const result = await bcrypt.compare(candidatePassword, this.password_hash);
  console.log("   Comparison result:", result);
  
  return result;
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
