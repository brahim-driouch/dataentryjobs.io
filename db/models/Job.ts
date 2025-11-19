import mongoose from "mongoose";
import slugify from "@/utils/slugify";

const jobSchema = new mongoose.Schema({
  // Basic Info
  title: {
    type: String,
    required: [true, 'Job title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters'],
  },
  
  slug: {
    type: String,
    unique: true,
  },
  
  company_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
  },
  
  company_name: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true,
  },
  
  company_logo: {
    type: String,
    default: null
  },
  
  // Job Details
  description: {
    type: String,
    required: [true, 'Job description is required'],
    trim: true
  },
  
  responsibilities: [{
    type: String,
    trim: true
  }],
  
  requirements: [{
    type: String,
    trim: true
  }],
  
  // Classification
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: {
      values: ['Medical', 'General', 'Legal', 'Ecommerce', 'Finance', 'Logistics', 'Other'],
      message: '{VALUE} is not a valid category'
    },
  },
  
  subcategory: {
    type: String,
    trim: true
  },
  
  experience_level: {
    type: String,
    enum: ['Entry Level', 'Mid Level', 'Senior', 'Not Specified'],
    default: 'Not Specified'
  },
  
  employment_type: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'],
    required: [true, 'Employment type is required']
  },
  
  // Location
  location: {
    type: {
      type: String,
      enum: ['remote', 'onsite', 'hybrid'],
      required: true
    },
    country: {
      type: String,
      required: [true, 'Country is required'],
      trim: true,
    },
    country_code: {
      type: String,
      uppercase: true,
      trim: true,
      maxlength: 3
    },
    city: {
      type: String,
      trim: true
    },
    state: {
      type: String,
      trim: true
    },
    timezone: {
      type: String,
      trim: true
    },
    is_remote: {
      type: Boolean,
      required: true,
    },
    remote_regions: [{
      type: String,
      trim: true
    }]
  },
  
  // Compensation
  salary: {
    min: {
      type: Number,
      min: [0, 'Minimum salary cannot be negative']
    },
    max: {
      type: Number,
      min: [0, 'Maximum salary cannot be negative'],
      validate: {
        validator: function(value: number) {
          return !this.salary.min || value >= this.salary.min;
        },
        message: 'Maximum salary must be greater than or equal to minimum salary'
      }
    },
    currency: {
      type: String,
      enum: ['USD', 'EUR', 'GBP', 'INR', 'PHP', 'PKR', 'BDT', 'NGN', 'CAD', 'AUD'],
      default: 'USD'
    },
    period: {
      type: String,
      enum: ['year', 'month', 'hour', 'project'],
      default: 'year'
    },
    is_disclosed: {
      type: Boolean,
      default: false
    }
  },
  
  // Requirements
  skills: [{
    type: String,
    trim: true
  }],
  
  certifications: [{
    type: String,
    trim: true
  }],
  
  typing_speed: {
    min: {
      type: Number,
      min: [0, 'Typing speed cannot be negative']
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  
  language_requirements: [{
    type: String,
    trim: true
  }],
  
  // Application
  application: {
    method: {
      type: String,
      enum: ['external', 'email', 'internal'],
      required: true,
      default: 'external'
    },
    url: {
      type: String,
      trim: true,
      validate: {
        validator: function(value) {
          if (this.application.method === 'external' && !value) return false;
          return true;
        },
        message: 'Application URL is required for external applications'
      }
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      validate: {
        validator: function(value) {
          if (this.application.method === 'email' && !value) return false;
          if (value && !/^\S+@\S+\.\S+$/.test(value)) return false;
          return true;
        },
        message: 'Valid application email is required for email applications'
      }
    },
    instructions: {
      type: String,
      trim: true,
      maxlength: [1000, 'Instructions cannot exceed 1000 characters']
    }
  },
  
  // Metadata
  status: {
    type: String,
    enum: ['active', 'filled', 'expired', 'pending_approval', 'draft', 'rejected'],
    default: 'pending_approval',
  },
  
  featured: {
    type: Boolean,
    default: false,
  },
  
  featured_until: {
    type: Date,
    default: null,
  },
  
  // Timestamps
  posted_date: {
    type: Date,
    default: Date.now,
  },
  
  expires_date: {
    type: Date,
    required: true,
    default: function() {
      // Default to 30 days from now
      return new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    }
  },
  
  filled_date: {
    type: Date,
    default: null
  },
  
  // Analytics
  views: {
    type: Number,
    default: 0,
    min: 0
  },
  
  clicks: {
    type: Number,
    default: 0,
    min: 0
  },
  
  views_last_7_days: {
    type: Number,
    default: 0,
    min: 0
  },
  
  // Source (if scraped)
  source: {
    platform: {
      type: String,
      enum: ['Manual', 'Indeed', 'LinkedIn', 'Glassdoor', 'Company Website', 'Other'],
      default: 'Manual'
    },
    original_url: {
      type: String,
      trim: true
    },
    scraped_at: {
      type: Date,
      default: null
    }
  },
  
  // SEO
  meta_title: {
    type: String,
    trim: true,
    maxlength: [60, 'Meta title cannot exceed 60 characters']
  },
  
  meta_description: {
    type: String,
    trim: true,
    maxlength: [160, 'Meta description cannot exceed 160 characters']
  },
  
  // Flags
  is_verified: {
    type: Boolean,
    default: false
  },
  
  is_remote_friendly: {
    type: Boolean,
    default: false
  },
  
  is_entry_level_friendly: {
    type: Boolean,
    default: false
  },
  
  urgent_hiring: {
    type: Boolean,
    default: false
  }
  
}, {
  timestamps: true, // Adds createdAt and updatedAt
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
jobSchema.index({ status: 1, posted_date: -1 });
jobSchema.index({ 'location.country': 1, status: 1, posted_date: -1 });
jobSchema.index({ 'location.is_remote': 1, status: 1, posted_date: -1 });
jobSchema.index({ category: 1, status: 1, posted_date: -1 });
jobSchema.index({ featured: 1, posted_date: -1 });
jobSchema.index({ expires_date: 1 });

// Text search index
jobSchema.index({
  title: 'text',
  description: 'text',
  company_name: 'text',
  skills: 'text'
}, {
  weights: {
    title: 10,
    company_name: 5,
    skills: 3,
    description: 1
  }
});

// Pre-save middleware - Generate slug
jobSchema.pre('save', async function(next) {
  if (this.isModified('title') || this.isNew) {
    // Generate base slug from title and company name
    const baseSlug = slugify(`${this.title} ${this.company_name}`);
    
    // Make slug unique by appending random string
    const randomString = Math.random().toString(36).substring(2, 8);
    this.slug = `${baseSlug}-${randomString}`;
  }
  
  // Auto-generate meta tags if not provided
  if (!this.meta_title) {
    this.meta_title = `${this.title} - ${this.company_name} | DataEntryJobs.io`;
  }
  
  if (!this.meta_description && this.salary && this.location) {
    const salaryInfo = this.salary.is_disclosed 
      ? `${this.salary.min ? `$${this.salary.min}` : ''}${this.salary.max ? `-$${this.salary.max}` : ''} ${this.salary.period}` 
      : '';
    const locationInfo = this.location.is_remote ? 'Remote' : `${this.location.city || this.location.country}`;
    
    this.meta_description = `Apply for ${this.title} at ${this.company_name}. ${salaryInfo}. ${locationInfo}. ${this.employment_type}.`;
  }
  
  next();
});

// Pre-save middleware - Update featured status
jobSchema.pre('save', function(next) {
  // If featured_until has passed, set featured to false
  if (this.featured && this.featured_until && this.featured_until < new Date()) {
    this.featured = false;
  }
  next();
});

// Virtual for days until expiration
jobSchema.virtual('days_until_expiration').get(function() {
  if (!this.expires_date || !(this.expires_date instanceof Date)) return null;
  const now = new Date();
  const diff = this.expires_date.getTime() - now .getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
});

// Virtual for is_expired
jobSchema.virtual('is_expired').get(function() {
  return this.expires_date < new Date();
});

// Virtual for application_count (if tracking applications)
jobSchema.virtual('application_count', {
  ref: 'Application',
  localField: '_id',
  foreignField: 'job_id',
  count: true
});

// Instance method - Mark as filled
jobSchema.methods.markAsFilled = function() {
  this.status = 'filled';
  this.filled_date = new Date();
  return this.save();
};

// Instance method - Increment view count
jobSchema.methods.incrementViews = function() {
  this.views += 1;
  this.views_last_7_days += 1;
  return this.save();
};

// Instance method - Increment click count
jobSchema.methods.incrementClicks = function() {
  this.clicks += 1;
  return this.save();
};

// Static method - Get active jobs
jobSchema.statics.getActiveJobs = function(filters = {}, options = {}) {
  const {
    page = 1,
    limit = 20,
    sort = '-posted_date',
    category,
    country,
    remote_only,
    min_salary,
    search
  } = options;
  
  const query = { status: 'active', ...filters };
  
  if (category) query.category = category;
  if (country) query['location.country'] = country;
  if (remote_only) query['location.is_remote'] = true;
  if (min_salary) query['salary.min'] = { $gte: min_salary };
  if (search) {
    query.$text = { $search: search };
  }
  
  const skip = (page - 1) * limit;
  
  return this.find(query)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .select('-__v');
};

// Static method - Get featured jobs
jobSchema.statics.getFeaturedJobs = function(limit = 5) {
  return this.find({
    status: 'active',
    featured: true,
    featured_until: { $gte: new Date() }
  })
    .sort('-posted_date')
    .limit(limit)
    .select('-__v');
};

// Static method - Expire old jobs (for cron job)
jobSchema.statics.expireOldJobs = async function() {
  const result = await this.updateMany(
    {
      status: 'active',
      expires_date: { $lt: new Date() }
    },
    {
      $set: { status: 'expired' }
    }
  );
  return result.modifiedCount;
};

// Static method - Remove expired featured status (for cron job)
jobSchema.statics.removeExpiredFeatured = async function() {
  const result = await this.updateMany(
    {
      featured: true,
      featured_until: { $lt: new Date() }
    },
    {
      $set: { featured: false }
    }
  );
  return result.modifiedCount;
};

// Static method - Reset weekly view counters (for cron job)
jobSchema.statics.resetWeeklyViews = async function() {
  const result = await this.updateMany(
    {},
    {
      $set: { views_last_7_days: 0 }
    }
  );
  return result.modifiedCount;
};

const Job= mongoose.models.Job || mongoose.model('Job', jobSchema);

export default Job;