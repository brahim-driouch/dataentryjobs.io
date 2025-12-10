// types/profile.types.ts

import mongoose, { Document, Types } from "mongoose";
import { IUserLocation } from "./user";

export interface PersonalInfo {
  id?: string;
  userId: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
  professionalTitle: string;
  profilePhoto?: string;
  resumeUrl?: string;
  portfolioUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  websiteUrl?: string;
  summary: string;
  availability: 'immediately' | 'two_weeks' | 'one_month' | 'not_looking';
  workAuthorization: 'citizen' | 'green_card' | 'visa_holder' | 'need_sponsorship';
  remotePreference: 'remote' | 'hybrid' | 'onsite' | 'flexible';
  willingToRelocate: boolean;
  expectedSalaryMin?: number;
  expectedSalaryMax?: number;
  salaryCurrency: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkExperience {
  id: string;
  userId: string;
  company: string;
  position: string;
  employmentType: 'full_time' | 'part_time' | 'contract' | 'freelance' | 'internship';
  location: string;
  remote: boolean;
  startDate: string; // YYYY-MM format
  endDate: string | null; // null if current position
  currentlyWorking: boolean;
  description: string;
  achievements?: string[];
  technologies?: string[];
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Education {
  id: string;
  userId: string;
  school: string;
  degree: string;
  fieldOfStudy: string;
  degreeType: 'high_school' | 'associate' | 'bachelor' | 'master' | 'doctorate' | 'certificate' | 'bootcamp';
  startDate: string; // YYYY-MM format
  endDate: string | null;
  currentlyEnrolled: boolean;
  gpa?: number;
  description?: string;
  achievements?: string[];
  location?: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Skill {
  id: string;
  userId: string;
  name: string;
  category: 'technical' | 'software' | 'language' | 'soft_skill' | 'tool' | 'other';
  proficiencyLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  yearsOfExperience?: number;
  order: number;
  createdAt: Date;
}

export interface Certification {
  id: string;
  userId: string;
  name: string;
  issuer: string;
  issueDate: string; // YYYY-MM format
  expirationDate?: string | null;
  credentialId?: string;
  credentialUrl?: string;
  description?: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Language {
  id: string;
  userId: string;
  language: string;
  proficiency: 'elementary' | 'limited_working' | 'professional_working' | 'full_professional' | 'native';
  order: number;
  createdAt: Date;
}

export interface Project {
  id: string;
  userId: string;
  title: string;
  description: string;
  role: string;
  startDate: string;
  endDate: string | null;
  currentlyWorking: boolean;
  url?: string;
  repositoryUrl?: string;
  technologies?: string[];
  highlights?: string[];
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

// Complete Profile Type
export interface JobSeekerProfile {
  personalInfo: PersonalInfo;
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  certifications: Certification[];
  languages: Language[];
  projects: Project[];
}

// Profile Completion Status
export interface ProfileCompletion {
  overall: number; // 0-100
  sections: {
    personalInfo: boolean;
    workExperience: boolean;
    education: boolean;
    skills: boolean;
    certifications: boolean;
    languages: boolean;
    projects: boolean;
  };
}

// Form DTOs for creating/updating
export interface CreatePersonalInfoDTO {
  fullName: string;
  phone: string;
  location: string;
  professionalTitle: string;
  summary: string;
  availability: PersonalInfo['availability'];
  workAuthorization: PersonalInfo['workAuthorization'];
  remotePreference: PersonalInfo['remotePreference'];
  willingToRelocate: boolean;
}

export interface UpdatePersonalInfoDTO extends Partial<CreatePersonalInfoDTO> {
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
  profilePhoto?: string;
  resumeUrl?: string;
  portfolioUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  websiteUrl?: string;
  expectedSalaryMin?: number;
  expectedSalaryMax?: number;
  salaryCurrency?: string;
}

export interface CreateWorkExperienceDTO {
  company: string;
  position: string;
  employmentType: WorkExperience['employmentType'];
  location: string;
  remote: boolean;
  startDate: string;
  endDate: string | null;
  currentlyWorking: boolean;
  description: string;
  achievements?: string[];
  technologies?: string[];
}

export interface UpdateWorkExperienceDTO extends Partial<CreateWorkExperienceDTO> {}

export interface CreateEducationDTO {
  school: string;
  degree: string;
  fieldOfStudy: string;
  degreeType: Education['degreeType'];
  startDate: string;
  endDate: string | null;
  currentlyEnrolled: boolean;
  gpa?: number;
  description?: string;
  achievements?: string[];
  location?: string;
}

export interface UpdateEducationDTO extends Partial<CreateEducationDTO> {}

export interface CreateSkillDTO {
  name: string;
  category: Skill['category'];
  proficiencyLevel: Skill['proficiencyLevel'];
  yearsOfExperience?: number;
}

export interface CreateCertificationDTO {
  name: string;
  issuer: string;
  issueDate: string;
  expirationDate?: string | null;
  credentialId?: string;
  credentialUrl?: string;
  description?: string;
}

export interface UpdateCertificationDTO extends Partial<CreateCertificationDTO> {}

export interface CreateLanguageDTO {
  language: string;
  proficiency: Language['proficiency'];
}

export interface CreateProjectDTO {
  title: string;
  description: string;
  role: string;
  startDate: string;
  endDate: string | null;
  currentlyWorking: boolean;
  url?: string;
  repositoryUrl?: string;
  technologies?: string[];
  highlights?: string[];
}

export interface IPersonalInfo extends Document {
  _id: mongoose.Types.ObjectId;
  user_id : mongoose.Types.ObjectId;
  full_name: string;
  email: string;
  phone?: string;
  location: IUserLocation;  
  professional_title?: string;
  profile_photo?: string;
  resume_url?: string;
  portfolio_url?: string;
  linkedin_url?: string;
  github_url?: string;
  website_url?: string;
  summary?: string;
  availability: Availability;
  remote_preference: RemotePreference;
  willing_to_relocate: boolean;
  expected_salary_min?: number;
  expected_salary_max?: number;
  salary_currency: string;
  createdAt: Date;
  updatedAt: Date;
}

// Enums
export enum Availability {
  IMMEDIATELY = 'immediately',
  TWO_WEEKS = 'two_weeks',
  ONE_MONTH = 'one_month',
  NOT_LOOKING = 'not_looking'
}

// export enum WorkAuthorization {
//   CITIZEN = 'citizen',
//   GREEN_CARD = 'green_card',
//   VISA_HOLDER = 'visa_holder',
//   NEED_SPONSORSHIP = 'need_sponsorship'
// }

export enum RemotePreference {
  REMOTE = 'remote',
  HYBRID = 'hybrid',
  ONSITE = 'onsite',
  FLEXIBLE = 'flexible'
}

export enum EmploymentType {
  FULL_TIME = 'full_time',
  PART_TIME = 'part_time',
  CONTRACT = 'contract',
  FREELANCE = 'freelance',
  INTERNSHIP = 'internship'
}

export enum DegreeType {
  HIGH_SCHOOL = 'high_school',
  ASSOCIATE = 'associate',
  BACHELOR = 'bachelor',
  MASTER = 'master',
  DOCTORATE = 'doctorate',
  CERTIFICATE = 'certificate',
  BOOTCAMP = 'bootcamp'
}

export enum SkillCategory {
  TECHNICAL = 'technical',
  SOFTWARE = 'software',
  LANGUAGE = 'language',
  SOFT_SKILL = 'soft_skill',
  TOOL = 'tool',
  OTHER = 'other'
}

export enum ProficiencyLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  EXPERT = 'expert'
}

export enum LanguageProficiency {
  ELEMENTARY = 'elementary',
  LIMITED_WORKING = 'limited_working',
  PROFESSIONAL_WORKING = 'professional_working',
  FULL_PROFESSIONAL = 'full_professional',
  NATIVE = 'native'
}
// Language Interface & Schema
export interface ILanguage extends Document {
  userId: mongoose.Types.ObjectId;
  language: string;
  proficiency: LanguageProficiency;
  order: number;
  createdAt: Date;
}

// Work Experience Interface & Schema
export interface IWorkExperience extends Document {
  user_id: mongoose.Types.ObjectId | string;
  company: string;
  position: string;
  employment_type: EmploymentType;
  location: string;
  remote: boolean;
  start_date: string;
  end_date?: string;
  currently_working: boolean;
  description: string;
  achievements?: string[];
  industry_category: IndustryCategory;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}
// Project Interface & Schema
export interface IProject extends Document {
  user_id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  role: string;
  start_date: string;
  end_date?: string;
  currently_working: boolean;
  url?: string;
  repository_url?: string;
  highlights?: string[];
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

 // Certification Interface & Schema
 export interface ICertification extends Document {
   userId: mongoose.Types.ObjectId;
   name: string;
   issuer: string;
   issueDate: string;
   expirationDate?: string;
   credentialId?: string;
   credentialUrl?: string;
   description?: string;
   order: number;
   createdAt: Date;
   updatedAt: Date;
 }
 

export interface ISkill extends Document {
  user_id: mongoose.Types.ObjectId;
  name: string;
  category: SkillCategory;
  proficiency_level: ProficiencyLevel;
  years_of_experience?: number;
  order: number;
  createdAt: Date;
}
// Education Interface & Schema
export interface IEducation extends Document {
  user_id: mongoose.Types.ObjectId;
  school: string;
  degree: string;
  field_of_study: string;
  degree_type: DegreeType;
  start_date: string;
  end_date?: string;
  currently_enrolled: boolean;
  gpa?: number;
  description?: string;
  achievements?: string[];
  location?: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}


export interface UpdateProjectDTO extends Partial<CreateProjectDTO> {}

// Validation helpers
export const EMPLOYMENT_TYPES = ['full_time', 'part_time', 'contract', 'freelance', 'internship'] as const;
export const DEGREE_TYPES = ['high_school', 'associate', 'bachelor', 'master', 'doctorate', 'certificate', 'bootcamp'] as const;
export const SKILL_CATEGORIES = ['technical', 'software', 'language', 'soft_skill', 'tool', 'other'] as const;
export const PROFICIENCY_LEVELS = ['beginner', 'intermediate', 'advanced', 'expert'] as const;
export const LANGUAGE_PROFICIENCY = ['elementary', 'limited_working', 'professional_working', 'full_professional', 'native'] as const;
export const AVAILABILITY_OPTIONS = ['immediately', 'two_weeks', 'one_month', 'not_looking'] as const;
export const WORK_AUTHORIZATION_OPTIONS = ['citizen', 'green_card', 'visa_holder', 'need_sponsorship'] as const;
export const REMOTE_PREFERENCES = ['remote', 'hybrid', 'onsite', 'flexible'] as const;

export interface IProfile {
  personalInfo: IPersonalInfo;
  experience: IWorkExperience;
  education: IEducation;
  skills: ISkill;
  certifications: ICertification;
}

export interface IPersonalInfoDTO {
  id?: string
  userId: string;
  fullName: string;
  professionalTitle: string;
  summary: string;
  availability: Availability;
  remotePreference: RemotePreference;
  willingToRelocate: boolean;
  expectedSalaryMin?: number;
  expectedSalaryMax?: number;
  salaryCurrency?: string;
  phone?: string;
  location: IUserLocation;
  profilePhoto?: string;
  resumeUrl?: string;
  portfolioUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  websiteUrl?: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IWorkExperienceDTO {
  id?: string;
  userId: string;
  company: string;
  position: string;
  employmentType: EmploymentType;
  location: string;
  remote: boolean;
  startDate: string;
  endDate?: string;
  currentlyWorking: boolean;
  industryCategory: IndustryCategory;
  description: string;
  achievements?: string[];
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface IEducationDTO {
    id?: string;
    userId: string;
    school: string;
    degree: string;
    fieldOfStudy: string;
    degreeType: DegreeType;
    startDate: string;
    endDate?: string;
    currentlyEnrolled: boolean;
    gpa?: number;
    description?: string;
    achievements?: string[];
    location?: string;
    order: number;
    createdAt: Date;
    updatedAt: Date;
}
export interface ISkillDTO {
    id?: string;
    userId: string;
    name: string;
    category: SkillCategory;
    proficiencyLevel: ProficiencyLevel;
    yearsOfExperience?: number;
    order: number;
    createdAt: Date;
    updatedAt: Date;
}
export interface ICertificationDTO {
    id?: string;
    userId: string;
    name: string;
    issuer: string;
    issueDate: string;
    expirationDate?: string;
    credentialId?: string;
    credentialUrl?: string;
    description?: string;
    order: number;
    createdAt: Date;
    updatedAt: Date;
}
export interface ISkillDTO {
    id?: string;
    userId: string;
    name: string;
    category: SkillCategory;
    proficiencyLevel: ProficiencyLevel;
    yearsOfExperience?: number;
    order: number;
    createdAt: Date;
    updatedAt: Date;
}

// DB RESPONSE

export interface IPersonalInfoDbResponse {
    _id?: Types.ObjectId;
    user_id: string;
    full_name: string;
  professional_title: string;
    summary: string;
    availability: Availability;
    remote_preference: RemotePreference;
    willing_to_relocate: boolean;
    expected_salary_min?: number;
    expected_salary_max?: number;
    salary_currency?: string;
    phone?: string;
    location: IUserLocation;
    profile_photo?: string;
    resume_url?: string;
    portfolio_url?: string;
    linkedin_url?: string;
    github_url?: string;
    website_url?: string;
    email: string;
    created_at: Date;
    updated_at: Date;
}
export interface IWorkExperienceDbResponse {
    _id?: Types.ObjectId;
    user_id?: string;
    company: string;
    position: string;
    employment_type: EmploymentType;
    location: string;
    remote: boolean;
    start_date: string;
    end_date?: string;
    currently_working: boolean;
    description: string;
    achievements?: string[];
    industryCategory: IndustryCategory;
    order: number;
    created_at: Date;
    updated_at: Date;
} 

export interface IEducationDbResponse {
    _id?: Types.ObjectId;
    user_id: string;
    school: string;
    degree: string;
    field_of_study: string;
    degree_type: DegreeType;
    start_date: string;
    end_date?: string;
    currently_enrolled: boolean;
    gpa?: number;
    description?: string;
    achievements?: string[];
    location?: string;
    order: number;
    created_at: Date;
    updated_at: Date;
}

export interface ISkillDbResponse {
    _id?: Types.ObjectId;
    user_id: string;
    name: string;
    category: SkillCategory;
    proficiency_level: ProficiencyLevel;
    years_of_experience?: number;
    order: number;
    created_at: Date;
    updated_at: Date;
}

export interface ICertificationDbResponse {
    _id?: Types.ObjectId;
    user_id: string;
    name: string;
    issuer: string;
    issue_date: string;
    expiration_date?: string;
    credential_id?: string;
    credential_url?: string;
    description?: string;
    order: number;
    created_at: Date;
    updated_at: Date;
}

export type ProfileResponse = {
    personalInfo: IPersonalInfoDTO;
    experiences: IWorkExperienceDTO[];
    education: IEducationDTO[];
    skills: ISkillDTO[];
    certifications: ICertificationDTO[];   
}


export enum IndustryCategory {
  // Technology & Digital
  INFORMATION_TECHNOLOGY = 'Information Technology & Services',
  SOFTWARE_DEVELOPMENT = 'Software Development',
  TELECOMMUNICATIONS = 'Telecommunications',
  INTERNET = 'Internet & E-commerce',
  COMPUTER_HARDWARE = 'Computer Hardware & Networking',
  CYBERSECURITY = 'Cybersecurity',
  ARTIFICIAL_INTELLIGENCE = 'Artificial Intelligence & Machine Learning',
  
  // Finance & Professional Services
  BANKING = 'Banking',
  FINANCIAL_SERVICES = 'Financial Services',
  INSURANCE = 'Insurance',
  INVESTMENT_MANAGEMENT = 'Investment Management & Venture Capital',
  ACCOUNTING = 'Accounting',
  CONSULTING = 'Management & Strategy Consulting',
  LEGAL_SERVICES = 'Legal Services',
  
  // Healthcare & Life Sciences
  HEALTHCARE = 'Healthcare Services',
  HOSPITAL_HEALTHCARE = 'Hospital & Healthcare Facilities',
  PHARMACEUTICALS = 'Pharmaceuticals',
  BIOTECHNOLOGY = 'Biotechnology',
  MEDICAL_DEVICES = 'Medical Devices & Equipment',
  MENTAL_HEALTH = 'Mental Health Care',
  VETERINARY = 'Veterinary Services',
  
  // Education & Research
  EDUCATION = 'Education',
  HIGHER_EDUCATION = 'Higher Education',
  E_LEARNING = 'E-Learning & EdTech',
  RESEARCH = 'Research & Development',
  LIBRARIES = 'Libraries & Museums',
  
  // Manufacturing & Industrial
  MANUFACTURING = 'Manufacturing',
  AUTOMOTIVE = 'Automotive',
  AEROSPACE = 'Aerospace & Defense',
  INDUSTRIAL_AUTOMATION = 'Industrial Automation',
  CHEMICALS = 'Chemicals',
  PLASTICS = 'Plastics & Polymers',
  TEXTILES = 'Textiles & Apparel',
  ELECTRONICS = 'Electronics Manufacturing',
  
  // Retail & Consumer Goods
  RETAIL = 'Retail',
  E_COMMERCE = 'E-Commerce',
  CONSUMER_GOODS = 'Consumer Goods',
  LUXURY_GOODS = 'Luxury Goods & Jewelry',
  FASHION = 'Fashion & Apparel',
  SPORTING_GOODS = 'Sporting Goods',
  FOOD_BEVERAGE = 'Food & Beverage',
  TOBACCO = 'Tobacco',
  
  // Hospitality & Travel
  HOSPITALITY = 'Hospitality',
  HOTELS = 'Hotels & Resorts',
  RESTAURANTS = 'Restaurants & Food Service',
  TRAVEL_TOURISM = 'Travel & Tourism',
  AIRLINES = 'Airlines & Aviation',
  EVENTS = 'Events Services',
  
  // Media & Entertainment
  MEDIA = 'Media & Communications',
  ENTERTAINMENT = 'Entertainment',
  BROADCAST_MEDIA = 'Broadcast Media',
  PUBLISHING = 'Publishing',
  MUSIC = 'Music',
  FILM = 'Film & Video Production',
  GAMING = 'Gaming & Esports',
  ANIMATION = 'Animation & VFX',
  
  // Real Estate & Construction
  REAL_ESTATE = 'Real Estate',
  CONSTRUCTION = 'Construction',
  ARCHITECTURE = 'Architecture & Planning',
  CIVIL_ENGINEERING = 'Civil Engineering',
  PROPERTY_MANAGEMENT = 'Property Management',
  
  // Energy & Utilities
  OIL_GAS = 'Oil & Gas',
  RENEWABLE_ENERGY = 'Renewable Energy',
  UTILITIES = 'Utilities',
  MINING = 'Mining & Metals',
  ENVIRONMENTAL_SERVICES = 'Environmental Services',
  
  // Transportation & Logistics
  LOGISTICS = 'Logistics & Supply Chain',
  SHIPPING = 'Shipping & Maritime',
  WAREHOUSING = 'Warehousing & Storage',
  TRANSPORTATION = 'Transportation',
  DELIVERY_SERVICES = 'Package Delivery & Courier',
  
  // Agriculture & Natural Resources
  AGRICULTURE = 'Agriculture',
  FARMING = 'Farming & Ranching',
  FISHERY = 'Fishery',
  FORESTRY = 'Forestry',
  
  // Government & Public Sector
  GOVERNMENT = 'Government Administration',
  DEFENSE = 'Defense & Space',
  PUBLIC_SAFETY = 'Public Safety & Law Enforcement',
  NONPROFIT = 'Non-Profit Organizations',
  INTERNATIONAL_AFFAIRS = 'International Affairs',
  
  // Business Services
  HUMAN_RESOURCES = 'Human Resources Services',
  MARKETING_ADVERTISING = 'Marketing & Advertising',
  PUBLIC_RELATIONS = 'Public Relations',
  MARKET_RESEARCH = 'Market Research',
  STAFFING_RECRUITING = 'Staffing & Recruiting',
  FACILITIES_SERVICES = 'Facilities Services',
  SECURITY_SERVICES = 'Security & Investigations',
  
  // Creative & Design
  GRAPHIC_DESIGN = 'Graphic Design',
  INDUSTRIAL_DESIGN = 'Industrial Design',
  PHOTOGRAPHY = 'Photography',
  ARTS_CRAFTS = 'Arts & Crafts',
  
  // Personal Services
  WELLNESS_FITNESS = 'Wellness & Fitness',
  BEAUTY_COSMETICS = 'Beauty & Cosmetics',
  PERSONAL_CARE = 'Personal Care Services',
  
  // Sports & Recreation
  SPORTS = 'Sports',
  RECREATION = 'Recreational Facilities',
  
  // Other
  OTHER = 'Other'
}