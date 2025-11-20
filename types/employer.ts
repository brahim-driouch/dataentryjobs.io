import { Document, Types, Model } from 'mongoose';

export interface IPaymentHistory {
  amount: number;
  currency: string;
  date: Date;
  stripe_payment_intent_id?: string;
  description?: string;
}

export interface ISubscription {
  plan: 'free' | 'basic' | 'premium' | 'enterprise';
  status: 'active' | 'cancelled' | 'expired' | 'trial';
  jobs_remaining: number;
  jobs_total: number;
  renews_at?: Date;
  stripe_customer_id?: string;
  stripe_subscription_id?: string;
}

export interface IEmployer extends Document {
  // Auth
  _id: Types.ObjectId;
  email: string;
  password_hash: string;
  
  // Profile
  full_name: string;
  company_id: Types.ObjectId;
  role: 'owner' | 'recruiter' | 'admin';
  
  // Subscription
  subscription: ISubscription;
  
  // Payment History
  payment_history: IPaymentHistory[];
  
  // Settings
  email_notifications: boolean;
  
  // Timestamps
  last_login?: Date;

  //email verification
  email_verified: boolean;
  
  // Methods
  comparePassword(candidatePassword: string): Promise<boolean>;
  updateLastLogin(): Promise<IEmployer>;
  canPostJob(): boolean;
  decreaseJobCredits(): Promise<IEmployer>;
  addPayment(paymentData: IPaymentHistory): Promise<IEmployer>;
  
  // Timestamps (from options)
  createdAt: Date;
  updatedAt: Date;
}

// Static methods interface - EXTEND Mongoose Model
export interface IEmployerModel extends Model<IEmployer> {
  // Custom static methods
  findByEmailWithPassword(email: string): Promise<IEmployer | null>;
  
  // Inherit all default Mongoose static methods like findById, findOne, etc.
}

export type NewEmployer = {
  fullName:string;
  email:string;
  company:string;
  password:string;
  confirmPassword:string
}

export type EmployerLogin = {
  email:string;
  password:string;
}