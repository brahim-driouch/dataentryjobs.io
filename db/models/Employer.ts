import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import {  IEmployer, IEmployerModel, IPaymentHistory } from '@/types/employer';


const employerSchema = new mongoose.Schema({
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
    index: true
  },
  
  password_hash: {
    type: String,
    required: [true, 'Password is required'],
    select: false // Don't include password in queries by default
  },
  
  // Profile
  full_name: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  
  company_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: [true, 'Company is required'],
    index: true
  },
  
  role: {
    type: String,
    enum: ['owner', 'recruiter', 'admin'],
    default: 'owner'
  },
  
  // Subscription
  subscription: {
    plan: {
      type: String,
      enum: ['free', 'basic', 'premium', 'enterprise'],
      default: 'free'
    },
    status: {
      type: String,
      enum: ['active', 'cancelled', 'expired', 'trial'],
      default: 'trial'
    },
    jobs_remaining: {
      type: Number,
      default: 1, // Free tier gets 1 job post
      min: 0
    },
    jobs_total: {
      type: Number,
      default: 1,
      min: 0
    },
    renews_at: {
      type: Date,
      default: null
    },
    stripe_customer_id: {
      type: String,
      default: null
    },
    stripe_subscription_id: {
      type: String,
      default: null
    }
  },
  
  // Payment History
  payment_history: [{
    amount: {
      type: Number,
      required: true,
      min: 0
    },
    currency: {
      type: String,
      default: 'USD'
    },
    date: {
      type: Date,
      default: Date.now
    },
    stripe_payment_intent_id: String,
    description: String
  }],
  
  // Settings
  email_notifications: {
    type: Boolean,
    default: true
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
employerSchema.index({ email: 1 });
employerSchema.index({ company_id: 1 });
employerSchema.index({ 'subscription.status': 1 });

// Pre-save middleware - Hash password
employerSchema.pre('save', async function(next) {
  // Only hash if password is modified
  if (!this.isModified('password_hash')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password_hash = await bcrypt.hash(this.password_hash, salt);
    next();
  } catch (error: Error | any) {
    next(error);
  }
});

// Instance method - Compare password
employerSchema.methods.comparePassword = async function(candidatePassword : string) {
  // Need to explicitly select password_hash since it's not selected by default
  if (!this.password_hash) {
    const employer = await (this.constructor as IEmployerModel).findById(this._id).select('+password_hash');
    this.password_hash = employer?.password_hash;
  }
  return bcrypt.compare(candidatePassword, this.password_hash);
};

// Instance method - Update last login
employerSchema.methods.updateLastLogin = function() {
  this.last_login = new Date();
  return this.save();
};

// Instance method - Check if can post job
employerSchema.methods.canPostJob = function() {
  return this.subscription.jobs_remaining > 0 && 
         ['active', 'trial'].includes(this.subscription.status);
};

// Instance method - Decrease job credits
employerSchema.methods.decreaseJobCredits = function() {
  if (this.subscription.jobs_remaining > 0) {
    this.subscription.jobs_remaining -= 1;
    return this.save();
  }
  throw new Error('No job credits remaining');
};

// Instance method - Add payment to history
employerSchema.methods.addPayment = function(paymentData: IPaymentHistory) {
  this.payment_history.push(paymentData);
  return this.save();
};

// Static method - Find by email with password
employerSchema.statics.findByEmailWithPassword = function(email) {
  return this.findOne({ email }).select('+password_hash');
};

const Employer = mongoose.models.Employer || mongoose.model<IEmployer, IEmployerModel>('Employer', employerSchema);

export default Employer;