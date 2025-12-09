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
  userId: mongoose.Types.ObjectId;
  company: string;
  position: string;
  employmentType: EmploymentType;
  location: string;
  remote: boolean;
  startDate: string;
  endDate?: string;
  currentlyWorking: boolean;
  description: string;
  achievements?: string[];
  technologies?: string[];
  order: number;
  createdAt: Date;
  updatedAt: Date;
}
// Project Interface & Schema
export interface IProject extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  role: string;
  startDate: string;
  endDate?: string;
  currentlyWorking: boolean;
  url?: string;
  repositoryUrl?: string;
  technologies?: string[];
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
  description: string;
  achievements?: string[];
  technologies?: string[];
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
    user_id: string;
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
    technologies?: string[];
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
    experience: IWorkExperienceDTO[];
    education: IEducationDTO[];
    skills: ISkillDTO[];
    certifications: ICertificationDTO[];   
}