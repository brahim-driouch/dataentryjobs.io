import { Document, Model, Types } from "mongoose";
import { IJob } from "./jobs";
import { IUser } from "./user";

// Interview interface (adjust based on your Interview model)
interface IInterview {
  _id: Types.ObjectId;
  // Add other interview fields as needed
}

// Screening Answer
interface IScreeningAnswer {
  question: string;
  answer: string;
  questionId: Types.ObjectId;
}

// Note
interface INote {
  content: string;
  addedBy: Types.ObjectId | IUser;
  addedAt: Date;
  isPrivate: boolean;
}

// Timeline Event
interface ITimelineEvent {
  event: 'applied' | 'viewed' | 'shortlisted' | 'interview_scheduled' | 'interview_completed' | 'rejected' | 'hired' | 'withdrawn' | 'note_added' | 'rating_added';
  description: string;
  date: Date;
  performedBy?: Types.ObjectId | IUser;
  metadata?: any;
}

// Resume
interface IResume {
  url: string;
  fileName: string;
  uploadedAt: Date;
}

// Base Application interface (before population)
export interface IApplication {
  candidate: Types.ObjectId;
  job: Types.ObjectId;
  status: 'pending' | 'reviewing' | 'shortlisted' | 'interview' | 'rejected' | 'hired' | 'withdrawn';
  coverLetter?: string;
  resume?: IResume;
  portfolioUrl?: string;
  linkedInUrl?: string;
  githubUrl?: string;
  appliedDate: Date;
  lastStatusUpdate: Date;
  screeningAnswers: IScreeningAnswer[];
  rating?: number;
  notes: INote[];
  interviews: Types.ObjectId[];
  timeline: ITimelineEvent[];
  viewedByEmployer: boolean;
  viewedAt?: Date;
  source: 'website' | 'linkedin' | 'indeed' | 'glassdoor' | 'referral' | 'other';
  isArchived: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  updatedAt: Date;
}

// Populated Application interface (with populated references)
export interface IApplicationPopulated extends Omit<IApplication, 'candidate' | 'job' | 'interviews'> {
  candidate: IUser;
  job: IJob;
  interviews: IInterview[];
}

// Virtual properties interface
interface IApplicationVirtuals {
  appliedDateFormatted: string;
  candidateName: string;
  jobTitle: string;
}

// Instance methods interface
export interface IApplicationMethods {
  getTimeAgo(date: Date): string;
  addTimelineEvent(event: string, description: string, performedBy?: Types.ObjectId | null, metadata?: any): Promise<IApplicationDocument>;
  updateStatus(newStatus: string, performedBy?: Types.ObjectId | null, notes?: string): Promise<IApplicationDocument>;
}

// Static methods interface
interface IApplicationStatics extends Model<IApplicationDocument> {
  getApplicationsByStatus(jobId: Types.ObjectId | string, status: string): Promise<IApplicationDocument[]>;
  getStatsForJob(jobId: Types.ObjectId | string): Promise<Array<{ _id: string; count: number }>>;
}

// Complete Document interface - FIXED: Omit 'timeline' from Document to avoid conflict
export interface IApplicationDocument extends Omit<Document, 'timeline'>, IApplication, IApplicationMethods, IApplicationVirtuals {
  _id: Types.ObjectId;
}

// Model type
export type ApplicationModel = Model<IApplicationDocument, {}, IApplicationMethods> & IApplicationStatics;