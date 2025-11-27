import { IJob, JobFormData } from "@/types/jobs";
import mongoose from "mongoose";

export const  convertFormDataToJob = (formData: JobFormData): Partial<IJob> => {
  return {
    title: formData.title,
    employer_id: formData.employer_id ? new mongoose.Types.ObjectId(formData.employer_id) : undefined,
    company_name: formData.hiring_for_other_company === "no" ? formData.company_name : formData.other_company_name,
    company_id: formData.company_id ? new mongoose.Types.ObjectId(formData.company_id) : undefined,
    
    description: formData.description,
    // Convert textarea strings to arrays (split by newlines, filter empty)
    responsibilities: formData.responsibilities
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0),
    requirements: formData.requirements
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0),
    
    category: formData.category,
    subcategory: formData.subcategory,
    experience_level: formData.experience_level,
    employment_type: formData.employment_type,
    
    // Convert flat location to nested object
    location: {
      type: formData.locationType,
      country: formData.country,
      country_code: formData.country_code,
      city: formData.city,
      state: formData.state,
      timezone: formData.timezone,
      is_remote: formData.is_remote,
      remote_regions: formData.remote_regions
        ? formData.remote_regions.split(',').map(r => r.trim()).filter(r => r.length > 0)
        : []
    },
    
    // Convert flat salary to nested object
    salary: {
      min: formData.salary_min,
      max: formData.salary_max,
      currency: formData.salary_currency,
      period: formData.salary_period,
      is_disclosed: formData.salary_is_disclosed
    },
    
    // Convert comma/newline-separated strings to arrays
    skills: formData.skills
      .split(/[,\n]/)
      .map(skill => skill.trim())
      .filter(skill => skill.length > 0),
    certifications: formData.certifications
      ? formData.certifications
          .split(/[,\n]/)
          .map(cert => cert.trim())
          .filter(cert => cert.length > 0)
      : [],
    typing_speed: {
      min: formData.typing_speed_min,
      required: formData.typing_speed_required
    },
    language_requirements: formData.language_requirements
      ? formData.language_requirements
          .split(/[,\n]/)
          .map(lang => lang.trim())
          .filter(lang => lang.length > 0)
      : [],
    
    application: formData.application,
    
    status: formData.status,
    featured: formData.featured || false,
    featured_until: formData.featured_until,
    expires_date: formData.expires_date || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    
    hiring_for_other_company: formData.hiring_for_other_company,
    other_company_name: formData.other_company_name,
    other_company_description: formData.other_company_description,
    other_company_website: formData.other_company_website,
    
    urgent_hiring: formData.urgent_hiring || false,
    is_verified: formData.is_verified || false,
    is_remote_friendly: formData.is_remote_friendly || false,
    is_entry_level_friendly: formData.is_entry_level_friendly || false,
    
    source: {
      platform: 'Manual',
      original_url: undefined,
      scraped_at: undefined
    }
  };
}

/**
 * Helper function to convert model data to form format (for editing)
 */
export const   convertJobToFormData = (job: IJob): JobFormData => {
  return {
    _id: job._id?.toString(),
    employer_id: job.employer_id?.toString(),
    
    title: job.title,
    company_id: job.company_id?.toString(),
    company_name: job.company_name,
    company_logo: null, // File will be handled separately
    
    description: job.description,
    // Convert arrays back to newline-separated strings
    responsibilities: job.responsibilities.join('\n'),
    requirements: job.requirements.join('\n'),
    
    category: job.category,
    subcategory: job.subcategory,
    experience_level: job.experience_level,
    employment_type: job.employment_type,
    
    // Flatten location
    locationType: job.location.type,
    country: job.location.country,
    country_code: job.location.country_code,
    city: job.location.city,
    state: job.location.state,
    timezone: job.location.timezone,
    is_remote: job.location.is_remote,
    remote_regions: job.location.remote_regions?.join(', '),
    
    // Flatten salary
    salary_min: job.salary.min,
    salary_max: job.salary.max,
    salary_currency: job.salary.currency,
    salary_period: job.salary.period,
    salary_is_disclosed: job.salary.is_disclosed,
    
    // Convert arrays to comma-separated strings
    skills: job.skills.join(', '),
    certifications: job.certifications.join(', '),
    typing_speed_min: job.typing_speed?.min,
    typing_speed_required: job.typing_speed?.required || false,
    language_requirements: job.language_requirements.join(', '),
    
    application: job.application,
    
    status: job.status,
    featured: job.featured,
    featured_until: job.featured_until,
    expires_date: job.expires_date,
    
    hiring_for_other_company: job.hiring_for_other_company,
    other_company_name: job.other_company_name,
    other_company_description: job.other_company_description,
    other_company_logo: null, // File will be handled separately
    other_company_website: job.other_company_website,
    
    urgent_hiring: job.urgent_hiring,
    is_verified: job.is_verified,
    is_remote_friendly: job.is_remote_friendly,
    is_entry_level_friendly: job.is_entry_level_friendly
  };
}