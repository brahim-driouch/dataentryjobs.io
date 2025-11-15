import mongoose from 'mongoose'; 
import slugify from '@/utils/slugify';

const companySchema = new mongoose.Schema({
  // Basic Info
  name: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true,
    unique: true,
    maxlength: [200, 'Company name cannot exceed 200 characters'],
    index: true
  },
  
  slug: {
    type: String,
    unique: true,
    index: true
  },
  
  logo: {
    type: String,
    default: null
  },
  
  website: {
    type: String,
    trim: true,
    validate: {
      validator: function(value: string) {
        if (!value) return true;
        return /^https?:\/\/.+/.test(value);
      },
      message: 'Website must be a valid URL'
    }
  },
  
  // Details
  description: {
    type: String,
    trim: true,
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  
  industry: {
    type: String,
    trim: true,
    enum: {
      values: [
        'Healthcare',
        'Technology',
        'Finance',
        'E-commerce',
        'Legal',
        'Logistics',
        'Education',
        'Manufacturing',
        'Retail',
        'Other'
      ],
      message: '{VALUE} is not a valid industry'
    }
  },
  
  size: {
    type: String,
    enum: ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+', 'Not Specified'],
    default: 'Not Specified'
  },
  
  founded_year: {
    type: Number,
    min: [1800, 'Founded year must be after 1800'],
    max: [new Date().getFullYear(), 'Founded year cannot be in the future'],
    validate: {
      validator: Number.isInteger,
      message: 'Founded year must be an integer'
    }
  },
  
  // Location
  headquarters: {
    country: {
      type: String,
      trim: true
    },
    city: {
      type: String,
      trim: true
    },
    state: {
      type: String,
      trim: true
    }
  },
  
  // Contact
  contact: {
    email: {
      type: String,
      trim: true,
      lowercase: true,
      validate: {
        validator: function(value: string) {
          if (!value) return true;
          return /^\S+@\S+\.\S+$/.test(value);
        },
        message: 'Please provide a valid email address'
      }
    },
    phone: {
      type: String,
      trim: true
    }
  },
  
  // Social
  social: {
    linkedin: {
      type: String,
      trim: true
    },
    twitter: {
      type: String,
      trim: true
    },
    facebook: {
      type: String,
      trim: true
    }
  },
  
  // Stats (denormalized for performance)
  total_jobs: {
    type: Number,
    default: 0,
    min: 0
  },
  
  active_jobs: {
    type: Number,
    default: 0,
    min: 0
  },
  
  // Verification
  is_verified: {
    type: Boolean,
    default: false
  },
  
  verified_at: {
    type: Date,
    default: null
  }
  
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
companySchema.index({ name: 1 });
companySchema.index({ slug: 1 });
companySchema.index({ industry: 1 });

// Pre-save middleware - Generate slug
companySchema.pre('save', function(next: () => void) {
  if (this.isModified('name') || this.isNew) {
    this.slug = slugify(this.name);
  }
  next();
});

// Virtual for active_jobs_list
companySchema.virtual('jobs', {
  ref: 'Job',
  localField: '_id',
  foreignField: 'company_id'
});

// Instance method - Update job counts
companySchema.methods.updateJobCounts = async function() {
  const Job = mongoose.model('Job');
  
  const [total, active] = await Promise.all([
    Job.countDocuments({ company_id: this._id }),
    Job.countDocuments({ company_id: this._id, status: 'active' })
  ]);
  
  this.total_jobs = total;
  this.active_jobs = active;
  
  return this.save();
};

// Static method - Find or create company
companySchema.statics.findOrCreate = async function(companyData) {
  const { name, ...rest } = companyData;
  
  let company = await this.findOne({ name });
  
  if (!company) {
    company = await this.create({ name, ...rest });
  }
  
  return company;
};

const Company = mongoose.models.Company || mongoose.model('Company', companySchema);

export default Company;