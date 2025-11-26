import mongoose, { Document, Types } from 'mongoose';

export interface ILocation {
  type: 'remote' | 'onsite' | 'hybrid';
  country: string;
  country_code?: string;
  city?: string;
  state?: string;
  timezone?: string;
  is_remote: boolean;
  remote_regions?: string[];
}

export interface ISalary {
  min?: number;
  max?: number;
  currency: 'USD' | 'EUR' | 'GBP' | 'INR' | 'PHP' | 'PKR' | 'BDT' | 'NGN' | 'CAD' | 'AUD';
  period: 'year' | 'month' | 'hour' | 'project';
  is_disclosed: boolean;
}

export interface IApplication {
  method: 'external' | 'email' | 'internal';
  url?: string;
  email?: string;
  instructions?: string;
}

export interface ITypingSpeed {
  min?: number;
  required: boolean;
}

export interface ISource {
  platform: 'Manual' | 'Indeed' | 'LinkedIn' | 'Glassdoor' | 'Company Website' | 'Other';
  original_url?: string;
  scraped_at?: Date;
}

export interface IJob extends Document {
  // Basic Info
  title: string;
  slug: string;
  company_id: Types.ObjectId;
  company_name: string;
  company_logo?: string;
  employer_id: Types.ObjectId;
  
  // Job Details
  description: string;
  responsibilities: string[];
  requirements: string[];
  
  // Classification
  category: 'Medical' | 'General' | 'Legal' | 'Ecommerce' | 'Finance' | 'Logistics' | 'Other';
  subcategory?: string;
  experience_level: 'Entry Level' | 'Mid Level' | 'Senior' | 'Not Specified';
  employment_type: 'Full-time' | 'Part-time' | 'Contract' | 'Freelance' | 'Internship';
  
  // Location
  location: ILocation;
  
  // Compensation
  salary: ISalary;
  
  // Requirements
  skills: string[];
  certifications: string[];
  typing_speed?: ITypingSpeed;
  language_requirements: string[];
  
  // Application
  application: IApplication;
  
  // Metadata
  status: 'active' | 'filled' | 'expired' | 'pending_approval' | 'draft' | 'rejected';
  featured: boolean;
  featured_until?: Date;
  
  // Timestamps
  posted_date: Date;
  expires_date: Date;
  filled_date?: Date;
  
  // Analytics
  views: number;
  clicks: number;
  views_last_7_days: number;
  
  // Source
  source: ISource;
  
  // SEO
  meta_title?: string;
  meta_description?: string;
  
  // Other company hiring
  hiring_for_other_company: 'yes' | 'no';
  other_company_name?: string;
  other_company_description?: string;
  other_company_logo?: string;
  other_company_website?: string;
  
  // Flags
  is_verified: boolean;
  is_remote_friendly: boolean;
  is_entry_level_friendly: boolean;
  urgent_hiring: boolean;
  
  // Virtual fields
  days_until_expiration?: number;
  is_expired?: boolean;
  application_count?: number;
  
  // Methods
  markAsFilled(): Promise<IJob>;
  incrementViews(): Promise<IJob>;
  incrementClicks(): Promise<IJob>;
  
  // Timestamps (from options)
  createdAt: Date;
  updatedAt: Date;
}

// Static methods interface
export interface IJobModel extends mongoose.Model<IJob> {
  getActiveJobs(filters?: any, options?: any): Promise<IJob[]>;
  getFeaturedJobs(limit?: number): Promise<IJob[]>;
  expireOldJobs(): Promise<number>;
  removeExpiredFeatured(): Promise<number>;
  resetWeeklyViews(): Promise<number>;
}

/**
 * Form data interface that matches the model structure
 * Arrays are kept as strings in the form and converted before saving
 */
export interface JobFormData {
  // Draft/Job ID (for updates)
  _id?: string;
  
  // Employer ID
  employer_id?: string;
  
  // Basic Info
  title: string;
  company_id?: string; // ObjectId as string
  company_name: string;
  company_logo?: File | null;
  
  // Job Details (strings in form, converted to arrays before saving)
  description: string;
  responsibilities: string; // textarea content, split by newlines
  requirements: string; // textarea content, split by newlines
  
  // Classification
  category: 'Medical' | 'General' | 'Legal' | 'Ecommerce' | 'Finance' | 'Logistics' | 'Other';
  subcategory?: string;
  experience_level: 'Entry Level' | 'Mid Level' | 'Senior' | 'Not Specified';
  employment_type: 'Full-time' | 'Part-time' | 'Contract' | 'Freelance' | 'Internship';
  
  // Location (flat structure in form, converted to nested before saving)
  locationType: 'remote' | 'onsite' | 'hybrid';
  country: string;
  country_code?: string;
  city?: string;
  state?: string;
  timezone?: string;
  is_remote: boolean;
  remote_regions?: string; // comma-separated, converted to array
  
  // Salary (flat structure in form, converted to nested before saving)
  salary_min?: number;
  salary_max?: number;
  salary_currency: 'USD' | 'EUR' | 'GBP' | 'INR' | 'PHP' | 'PKR' | 'BDT' | 'NGN' | 'CAD' | 'AUD';
  salary_period: 'year' | 'month' | 'hour' | 'project';
  salary_is_disclosed: boolean;
  
  // Requirements (strings in form, converted to arrays before saving)
  skills: string; // comma-separated or newline-separated
  certifications?: string; // comma-separated or newline-separated
  typing_speed_min?: number;
  typing_speed_required: boolean;
  language_requirements?: string; // comma-separated or newline-separated
  
  // Application
  application: IApplication;
  
  // Metadata
  status: 'active' | 'filled' | 'expired' | 'pending_approval' | 'draft' | 'rejected';
  featured?: boolean;
  featured_until?: Date;
  
  // Timestamps
  expires_date?: Date;
  
  // Other company hiring
  hiring_for_other_company: 'yes' | 'no';
  other_company_name?: string;
  other_company_description?: string;
  other_company_logo?: File | null;
  other_company_website?: string;
  
  // Flags
  urgent_hiring?: boolean;
  is_verified?: boolean;
  is_remote_friendly?: boolean;
  is_entry_level_friendly?: boolean;
}
