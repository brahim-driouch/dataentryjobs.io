import mongoose, { Document, Types } from 'mongoose';

export interface IJobPreferences {
  categories: ('Medical' | 'General' | 'Legal' | 'Ecommerce' | 'Finance' | 'Logistics' | 'Other')[];
  locations: string[];
  remote_only: boolean;
  min_salary: number | null;
  salary_currency: 'USD' | 'EUR' | 'GBP' | 'INR' | 'PHP' | 'PKR' | 'BDT' | 'NGN' | 'CAD' | 'AUD';
}

export interface IUser extends Document {

  
  _id:Types.ObjectId;
  // Auth
  email: string;
  password_hash: string;
  
  // Profile
  full_name: string;

  //phone number
  phone_number: string;

  //location
  location: string; 
  
  // Preferences
  job_preferences: IJobPreferences;
  
  // Saved Jobs
  saved_jobs: Types.ObjectId[];

  // email verification
  email_verified: boolean;
  
  // Email Alerts
  email_alerts_enabled: boolean;
  alert_frequency: 'daily' | 'weekly' | 'instant';
  
  // Timestamps
  last_login: Date | null;
  
  // Methods
  comparePassword(candidatePassword: string): Promise<boolean>;
  saveJob(jobId: Types.ObjectId | string): Promise<IUser>;
  unsaveJob(jobId: Types.ObjectId | string): Promise<IUser>;
  isJobSaved(jobId: Types.ObjectId | string): boolean;
  
  // Mongoose timestamps
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserModel extends mongoose.Model<IUser> {
  // Static methods can be added here if needed
  findByEmailWithPassword(email: string): Promise<IUser | null>;
}

export type newUser = Omit<IUser, '_id' | 'createdAt' | 'updatedAt'| 'last_login' | 'password_hash'| 'saved_jobs'| 'email_alerts_enabled'| 'alert_frequency'> & { password: string, confirmPassword: string };
export type UserLogin = { email: string, password: string };