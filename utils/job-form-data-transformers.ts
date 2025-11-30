// utils/job-transformers.ts

import { IJob, JobFormData } from '@/types/jobs';

/**
 * Transform IJob (from database) to JobFormData (for forms/frontend)
 * Converts:
 * - snake_case to camelCase
 * - Nested objects to flat structure
 * - Arrays to comma/newline separated strings
 * - Includes virtual properties
 */
export const transformJobToFormData = (job: IJob): JobFormData => {
  return {
    // IDs
    _id: job._id?.toString(),
    employerId: job.employer_id?.toString(),
    companyId: job.company_id?.toString(),
    
    // Basic Info
    title: job.title || '',
    companyName: job.company_name || '',
    companyLogo: null, // File uploads handled separately
    
    // Job Details - Arrays to strings
    description: job.description || '',
    responsibilities: Array.isArray(job.responsibilities) 
      ? job.responsibilities.join('\n') 
      : '',
    requirements: Array.isArray(job.requirements) 
      ? job.requirements.join('\n') 
      : '',
    
    // Classification
    category: job.category || 'Other',
    subcategory: job.subcategory,
    experienceLevel: job.experience_level || 'Not Specified',
    employmentType: job.employment_type || 'Full-time',
    
    // Location - Nested to flat
    locationType: job.location?.type || 'remote',
    country: job.location?.country || '',
    countryCode: job.location?.country_code,
    city: job.location?.city,
    state: job.location?.state,
    timezone: job.location?.timezone,
    isRemote: job.location?.is_remote ?? true,
    remoteRegions: Array.isArray(job.location?.remote_regions) 
      ? job.location.remote_regions.join(', ') 
      : '',
    
    // Salary - Nested to flat
    salaryMin: job.salary?.min,
    salaryMax: job.salary?.max,
    salaryCurrency: job.salary?.currency || 'USD',
    salaryPeriod: job.salary?.period || 'month',
    salaryIsDisclosed: job.salary?.is_disclosed ?? false,
    
    // Requirements - Arrays to strings
    skills: Array.isArray(job.skills) 
      ? job.skills.join(', ') 
      : '',
    certifications: Array.isArray(job.certifications) 
      ? job.certifications.join(', ') 
      : '',
    typingSpeedMin: job.typing_speed?.min,
    typingSpeedRequired: job.typing_speed?.required ?? false,
    languageRequirements: Array.isArray(job.language_requirements) 
      ? job.language_requirements.join(', ') 
      : '',
    
    // Application
    application: job.application || {
      method: 'internal',
      url: '',
      email: '',
      instructions: ''
    },
    
    // Metadata
    status: job.status || 'draft',
    featured: job.featured,
    featuredUntil: job.featured_until ? new Date(job.featured_until) : undefined,
    
    // Timestamps
    expiresDate: job.expires_date ? new Date(job.expires_date) : undefined,
    postedDate: job.posted_date ? new Date(job.posted_date) : undefined,
    
    // Other company hiring
    hiringForOtherCompany: job.hiring_for_other_company || 'no',
    otherCompanyName: job.other_company_name,
    otherCompanyDescription: job.other_company_description,
    otherCompanyLogo: null, // File uploads handled separately
    otherCompanyWebsite: job.other_company_website,
    
    // Flags
    urgentHiring: job.urgent_hiring,
    isVerified: job.is_verified,
    isRemoteFriendly: job.is_remote_friendly,
    isEntryLevelFriendly: job.is_entry_level_friendly,
    
    // Virtual properties (read-only, for display)
    daysUntilExpiration: job.days_until_expiration,
    isExpired: job.is_expired,
    applicationCount: job.application_count,
    
    // Analytics (read-only)
    views: job.views,
    clicks: job.clicks,
    viewsLast7Days: job.views_last_7_days,
    
    // Timestamps (read-only)
    createdAt: job.createdAt ? new Date(job.createdAt) : undefined,
    updatedAt: job.updatedAt ? new Date(job.updatedAt) : undefined,
  };
};

/**
 * Transform JobFormData (from forms/frontend) to database format
 * Converts:
 * - camelCase to snake_case
 * - Flat structure to nested objects
 * - Strings to arrays
 * - Prepares data for MongoDB
 */
export const transformFormDataToJob = (formData: JobFormData): Partial<IJob> => {
  const jobData: any = {
    // Basic Info
    title: formData.title,
    company_name: formData.companyName,
    
    // Job Details - Strings to arrays
    description: formData.description,
    responsibilities: formData.responsibilities
      .split('\n')
      .map(r => r.trim())
      .filter(Boolean),
    requirements: formData.requirements
      .split('\n')
      .map(r => r.trim())
      .filter(Boolean),
    
    // Classification
    category: formData.category,
    subcategory: formData.subcategory,
    experience_level: formData.experienceLevel,
    employment_type: formData.employmentType,
    
    // Location - Flat to nested
    location: {
      type: formData.locationType,
      country: formData.country,
      country_code: formData.countryCode,
      city: formData.city,
      state: formData.state,
      timezone: formData.timezone,
      is_remote: formData.isRemote,
      remote_regions: formData.remoteRegions
        ? formData.remoteRegions.split(',').map(r => r.trim()).filter(Boolean)
        : []
    },
    
    // Salary - Flat to nested
    salary: {
      min: formData.salaryMin,
      max: formData.salaryMax,
      currency: formData.salaryCurrency,
      period: formData.salaryPeriod,
      is_disclosed: formData.salaryIsDisclosed
    },
    
    // Requirements - Strings to arrays
    skills: formData.skills
      .split(',')
      .map(s => s.trim())
      .filter(Boolean),
    certifications: formData.certifications
      ? formData.certifications.split(',').map(c => c.trim()).filter(Boolean)
      : [],
    language_requirements: formData.languageRequirements
      ? formData.languageRequirements.split(',').map(l => l.trim()).filter(Boolean)
      : [],
    
    // Application
    application: formData.application,
    
    // Metadata
    status: formData.status,
    featured: formData.featured,
    featured_until: formData.featuredUntil,
    
    // Timestamps
    expires_date: formData.expiresDate,
    
    // Other company hiring
    hiring_for_other_company: formData.hiringForOtherCompany,
    other_company_name: formData.otherCompanyName,
    other_company_description: formData.otherCompanyDescription,
    other_company_website: formData.otherCompanyWebsite,
    
    // Flags
    urgent_hiring: formData.urgentHiring,
    is_verified: formData.isVerified,
    is_remote_friendly: formData.isRemoteFriendly,
    is_entry_level_friendly: formData.isEntryLevelFriendly,
  };

  // Handle typing speed conditionally
  if (formData.typingSpeedRequired && formData.typingSpeedMin) {
    jobData.typing_speed = {
      min: formData.typingSpeedMin,
      required: true
    };
  }

  // Add IDs if present (for updates)
  if (formData.employerId) {
    jobData.employer_id = formData.employerId;
  }
  if (formData.companyId) {
    jobData.company_id = formData.companyId;
  }

  return jobData;
};

/**
 * Transform IJob to a clean camelCase object for frontend display
 * Useful for API responses that don't need form editing
 */
export const transformJobToCleanObject = (job: IJob) => {
  return {
    id: job._id?.toString(),
    employerId: job.employer_id?.toString(),
    companyId: job.company_id?.toString(),
    
    // Basic Info
    title: job.title,
    slug: job.slug,
    companyName: job.company_name,
    companyLogo: job.company_logo,
    
    // Job Details
    description: job.description,
    responsibilities: job.responsibilities,
    requirements: job.requirements,
    
    // Classification
    category: job.category,
    subcategory: job.subcategory,
    experienceLevel: job.experience_level,
    employmentType: job.employment_type,
    
    // Location
    location: {
      type: job.location.type,
      country: job.location.country,
      countryCode: job.location.country_code,
      city: job.location.city,
      state: job.location.state,
      timezone: job.location.timezone,
      isRemote: job.location.is_remote,
      remoteRegions: job.location.remote_regions
    },
    
    // Salary
    salary: {
      min: job.salary.min,
      max: job.salary.max,
      currency: job.salary.currency,
      period: job.salary.period,
      isDisclosed: job.salary.is_disclosed
    },
    
    // Requirements
    skills: job.skills,
    certifications: job.certifications,
    typingSpeed: job.typing_speed ? {
      min: job.typing_speed.min,
      required: job.typing_speed.required
    } : undefined,
    languageRequirements: job.language_requirements,
    
    // Application
    application: job.application,
    
    // Metadata
    status: job.status,
    featured: job.featured,
    featuredUntil: job.featured_until,
    
    // Timestamps
    postedDate: job.posted_date,
    expiresDate: job.expires_date,
    filledDate: job.filled_date,
    
    // Analytics
    views: job.views,
    clicks: job.clicks,
    viewsLast7Days: job.views_last_7_days,
    
    // Other company
    hiringForOtherCompany: job.hiring_for_other_company,
    otherCompanyName: job.other_company_name,
    otherCompanyDescription: job.other_company_description,
    otherCompanyLogo: job.other_company_logo,
    otherCompanyWebsite: job.other_company_website,
    
    // Flags
    isVerified: job.is_verified,
    isRemoteFriendly: job.is_remote_friendly,
    isEntryLevelFriendly: job.is_entry_level_friendly,
    urgentHiring: job.urgent_hiring,
    
    // Virtual properties
    daysUntilExpiration: job.days_until_expiration,
    isExpired: job.is_expired,
    applicationCount: job.application_count,
    
    // Timestamps
    createdAt: job.createdAt,
    updatedAt: job.updatedAt,
  };
};

/**
 * Batch transform multiple jobs
 */
export const transformJobsToFormData = (jobs: IJob[]): JobFormData[] => {
  return jobs.map(transformJobToFormData);
};

export const transformJobsToCleanObjects = (jobs: IJob[]) => {
  return jobs.map(transformJobToCleanObject);
};