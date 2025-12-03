import { ApplicationModel, IApplicationDocument, IApplicationMethods } from "@/types/application";
import { IApplication } from "@/types/jobs";
import { IUser } from "@/types/user";
import mongoose, { Document, Model } from "mongoose";

// User interface (simplified - adjust based on your User model)


// Job interface (simplified - adjust based on your Job model)



// Instance methods interface




// Model type

// Updated schema with proper typing
const applicationSchema = new mongoose.Schema<IApplicationDocument, ApplicationModel, IApplicationMethods>({
  // Candidate Information
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Job Information
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  
  // Application Status
  status: {
    type: String,
    enum: ['pending', 'reviewing', 'shortlisted', 'interview', 'rejected', 'hired', 'withdrawn'],
    default: 'pending'
  },
  
  // Application Content
  coverLetter: {
    type: String,
    maxlength: 2000
  },
  resume: {
    url: String,
    fileName: String,
    uploadedAt: Date
  },
  portfolioUrl: String,
  linkedInUrl: String,
  githubUrl: String,
  
  // Application Metadata
  appliedDate: {
    type: Date,
    default: Date.now
  },
  lastStatusUpdate: {
    type: Date,
    default: Date.now
  },
  
  // Screening Questions (if any)
  screeningAnswers: [{
    question: String,
    answer: String,
    questionId: mongoose.Schema.Types.ObjectId
  }],
  
  // Ratings & Notes
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: null
  },
  notes: [{
    content: String,
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    addedAt: {
      type: Date,
      default: Date.now
    },
    isPrivate: {
      type: Boolean,
      default: false
    }
  }],
  
  // Interview Process
  interviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Interview'
  }],
  
  // Timeline Events
  timeline: [{
    event: {
      type: String,
      enum: ['applied', 'viewed', 'shortlisted', 'interview_scheduled', 'interview_completed', 'rejected', 'hired', 'withdrawn', 'note_added', 'rating_added']
    },
    description: String,
    date: {
      type: Date,
      default: Date.now
    },
    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    metadata: mongoose.Schema.Types.Mixed
  }],
  
  // Analytics
  viewedByEmployer: {
    type: Boolean,
    default: false
  },
  viewedAt: Date,
  source: {
    type: String,
    enum: ['website', 'linkedin', 'indeed', 'glassdoor', 'referral', 'other'],
    default: 'website'
  },
  
  // Internal Flags
  isArchived: {
    type: Boolean,
    default: false
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  }
}, {
  timestamps: true
});

// Indexes for better query performance
applicationSchema.index({ job: 1, status: 1 });
applicationSchema.index({ candidate: 1, job: 1 }, { unique: true });
applicationSchema.index({ status: 1, appliedDate: -1 });
applicationSchema.index({ 'timeline.date': -1 });
applicationSchema.index({ job: 1, appliedDate: -1 });

// Virtual for formatted applied date
applicationSchema.virtual('appliedDateFormatted').get(function(this: IApplicationDocument) {
  return this.getTimeAgo(this.appliedDate);
});

// Virtual for candidate name (handles both ObjectId and populated User)
applicationSchema.virtual('candidateName').get(function(this: IApplicationDocument) {
  if (typeof this.candidate === 'object' && 'name' in this.candidate) {
    return this.candidate.name || 'Unknown Candidate';
  }
  return 'Unknown Candidate';
});

// Virtual for job title (handles both ObjectId and populated Job)
applicationSchema.virtual('jobTitle').get(function(this: IApplicationDocument) {
  if (typeof this.job === 'object' && 'title' in this.job) {
    return this.job.title || 'Unknown Job';
  }
  return 'Unknown Job';
});

// Instance methods
applicationSchema.methods.getTimeAgo = function(this: IApplicationDocument, date: Date): string {
  const diffInSeconds = (new Date().getTime() - date.getTime()) / 1000;
  if (diffInSeconds < 60) return 'Just now';
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hours ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) return `${diffInDays} days ago`;
  return date.toLocaleDateString();
};

applicationSchema.methods.addTimelineEvent = function(
  this: IApplicationDocument,
  event: string,
  description: string,
  performedBy: mongoose.Types.ObjectId | null = null,
  metadata: any = {}
): Promise<IApplicationDocument> {
  this.timeline.push({
    event: event as any,
    description,
    performedBy: performedBy || undefined,
    metadata,
    date: new Date()
  });
  return this.save() as Promise<IApplicationDocument>;
};

applicationSchema.methods.updateStatus = function(
  this: IApplicationDocument,
  newStatus: string,
  performedBy: mongoose.Types.ObjectId | null = null,
  notes: string = ''
): Promise<IApplicationDocument> {
  const oldStatus = this.status;
  this.status = newStatus as any;
  this.lastStatusUpdate = new Date();
  
  this.timeline.push({
    event: 'applied',
    description: `Status changed from ${oldStatus} to ${newStatus}. ${notes}`.trim(),
    performedBy: performedBy || undefined,
    metadata: { oldStatus, newStatus },
    date: new Date()
  });
  
  return this.save() as Promise<IApplicationDocument>;
};

// Static methods
applicationSchema.statics.getApplicationsByStatus = function(
  this: ApplicationModel,
  jobId: mongoose.Types.ObjectId | string,
  status: string
): Promise<IApplicationDocument[]> {
  return this.find({ job: jobId, status }).populate('candidate', 'name email avatar experience location');
};

applicationSchema.statics.getStatsForJob = function(
  this: ApplicationModel,
  jobId: mongoose.Types.ObjectId | string
): Promise<Array<{ _id: string; count: number }>> {
  return this.aggregate([
    { $match: { job: new mongoose.Types.ObjectId(jobId as string) } },
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 }
      }
    }
  ]);
};

// Middleware
applicationSchema.pre('save', function(this: IApplicationDocument, next) {
  if (this.isModified('status')) {
    this.lastStatusUpdate = new Date();
  }
  next();
});

// Ensure virtual fields are serialized
applicationSchema.set('toJSON', { virtuals: true });
applicationSchema.set('toObject', { virtuals: true });

const Application = mongoose.models.Application || mongoose.model<IApplicationDocument, ApplicationModel>('Application', applicationSchema);

export default Application;