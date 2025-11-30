import countries from "@/assets/countries.json";
type ValidationResult = {
  errors: string[];
  isValid: boolean;
};

/**
 * Validates a new user registration
 * @param {string} email - The user's email address
 * @param {string} password - The user's password
 * @param {string} confirmPassword - The user's password confirmation
 * @returns {ValidationResult} - An object containing an array of errors and a boolean indicating whether the validation was successful or not
 */
export const validateNewUser = (
  email: string,
  password: string,
  confirmPassword?: string,
  location?: string
) : ValidationResult => {
  const errors: string[] = [];
  if (!email || !password) {
    errors.push("Email and password are required");
  }
  if (password.length < 8) {
    errors.push("Password must be at least 8 characters");
  }
  if (confirmPassword && password !== confirmPassword) {
    errors.push("Passwords do not match");
  }
   console.log(errors);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errors.push("Invalid email format");
  }

// More comprehensive special characters
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#^=+~_\-])[A-Za-z\d@$!%*?&.#^=+~_\-]{8,}$/;
  if (!passwordRegex.test(password)) {
    errors.push(
      "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character"
    );
  }
  // validate location
  
  if (!location || !countries.find((country) => country.name === location)) {
    errors.push('Please enter your location');
    
  }

  if (errors.length > 0) {
    console.log(password);
    console.log(errors);
    return { errors, isValid: false };
  } else {
    return { errors: [], isValid: true };
  }
};

export const validateNewEmployer = (
  fullName:string,
  email:string,
  password:string,
  confirmPassword:string,
  company:string,

)=>{
  const errors :string[]= []

  if(!fullName || !email || !password || !confirmPassword || !company){
    errors.push("All fields are required");
  }

  if(fullName.length>100){
    errors.push("Full name cannot exceed 100 characters");
  }
  if(company.length>150){
    errors.push("Company name cannot exceed 150 characters");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errors.push("Invalid email format");
  }

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters");
  }

  // More comprehensive special characters
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#^=+~_\-])[A-Za-z\d@$!%*?&.#^=+~_\-]{8,}$/;
    if (!passwordRegex.test(password)) {
      errors.push(
        "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character"
      );
    }

  if(password !== confirmPassword){
    errors.push("Passwords do not match");
  }

  if(errors.length>0){
    return {errors,isValid:false};
  }else{
    return {errors:[],isValid:true};
  }
}


export const validateLoginCredentials = (email:string,password:string)=>{
  const errors :string[]= []

  if(!email || !password){
    errors.push("All fields are required");
  }
  if(password.length<8){
    errors.push("Password must be at least 8 characters");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errors.push("Invalid email format");
  }

  if(errors.length>0){
    return {errors,isValid:false};
  }else{
    return {errors:[],isValid:true};
  }
}


  export interface JobValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
  missingFields: string[];
}

import { JobFormData } from '@/types/jobs';

export interface JobValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
  missingFields: string[];
}

export const validateJobRequiredFields = (data: JobFormData): JobValidationResult => {
  const errors: Record<string, string> = {};
  const missingFields: string[] = [];

  // Basic Info - Required
  if (!data.title?.trim()) {
    errors.title = 'Job title is required';
    missingFields.push('title');
  } else if (data.title.length > 200) {
    errors.title = 'Title cannot exceed 200 characters';
  }

  if (!data.companyName?.trim()) {
    errors.companyName = 'Company name is required';
    missingFields.push('companyName');                                                                                  
  }

  if (!data.description?.trim()) {
    errors.description = 'Job description is required';
    missingFields.push('description');
  }

  // Category - Required
  const validCategories = ['Medical', 'General', 'Legal', 'Ecommerce', 'Finance', 'Logistics', 'Other'];
  if (!data.category) {
    errors.category = 'Category is required';
    missingFields.push('category');
  } else if (!validCategories.includes(data.category)) {
    errors.category = `${data.category} is not a valid category`;
  }

  // Employment Type - Required
  const validEmploymentTypes = ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'];
  if (!data.employmentType) {
    errors.employmentType = 'Employment type is required';
    missingFields.push('employmentType');
  } else if (!validEmploymentTypes.includes(data.employmentType)) {
    errors.employmentType = `${data.employmentType} is not a valid employment type`;
  }

  // Location - Required
  if (!data.locationType) {
    errors.locationType = 'Location type is required (remote/onsite/hybrid)';
    missingFields.push('locationType');
  } else if (!['remote', 'onsite', 'hybrid'].includes(data.locationType)) {
    errors.locationType = 'Invalid location type';
  }

  if (!data.country?.trim()) {
    errors.country = 'Country is required';
    missingFields.push('country');
  }

  // City required for onsite/hybrid
  if (data.locationType !== 'remote' && !data.city?.trim()) {
    errors.city = 'City is required for onsite/hybrid positions';
    missingFields.push('city');
  }

  // Salary validation (using flattened salary fields)
  if (data.salaryMin !== undefined && data.salaryMin < 0) {
    errors.salaryMin = 'Minimum salary cannot be negative';
  }

  if (data.salaryMax !== undefined) {
    if (data.salaryMax < 0) {
      errors.salaryMax = 'Maximum salary cannot be negative';
    }
    if (data.salaryMin !== undefined && data.salaryMax < data.salaryMin) {
      errors.salaryMax = 'Maximum salary must be greater than or equal to minimum salary';
    }
  }

  if (data.salaryCurrency) {
    const validCurrencies = ['USD', 'EUR', 'GBP', 'INR', 'PHP', 'PKR', 'BDT', 'NGN', 'CAD', 'AUD'];
    if (!validCurrencies.includes(data.salaryCurrency)) {
      errors.salaryCurrency = 'Invalid currency';
    }
  }

  if (data.salaryPeriod) {
    const validPeriods = ['year', 'month', 'hour', 'project'];
    if (!validPeriods.includes(data.salaryPeriod)) {
      errors.salaryPeriod = 'Invalid salary period';
    }
  }

  // Application Method - Required
  const validMethods = ['external', 'email', 'internal'];
  if (!data.application?.method) {
    errors.application_method = 'Application method is required';
    missingFields.push('application_method');
  } else if (!validMethods.includes(data.application.method)) {
    errors.application_method = 'Invalid application method';
  }

  // Validate based on application method
  if (data.application?.method === 'external' && !data.application.url?.trim()) {
    errors.application_url = 'Application URL is required for external applications';
    missingFields.push('application_url');
  }

  if (data.application?.method === 'email') {
    if (!data.application.email?.trim()) {
      errors.application_email = 'Email is required for email applications';
      missingFields.push('application_email');
    } else if (!/^\S+@\S+\.\S+$/.test(data.application.email)) {
      errors.application_email = 'Invalid email address';
    }
  }

  if (data.application?.instructions && data.application.instructions.length > 1000) {
    errors.application_instructions = 'Instructions cannot exceed 1000 characters';
  }

  // Experience Level validation
  if (data.experienceLevel) {
    const validExperienceLevels = ['Entry Level', 'Mid Level', 'Senior', 'Not Specified'];
    if (!validExperienceLevels.includes(data.experienceLevel)) {
      errors.experienceLevel = 'Invalid experience level';
    }
  }

  // Skills validation (comma or newline-separated string)
  if (data.skills) {
    const skillsArray = data.skills.split(/[,\n]/).filter(skill => skill.trim() !== '');
    if (skillsArray.length > 50) {
      errors.skills = 'Cannot have more than 50 skills';
    }
  }

  // Responsibilities validation (newline-separated string)
  if (data.responsibilities) {
    const responsibilitiesArray = data.responsibilities.split('\n').filter(item => item.trim() !== '');
    if (responsibilitiesArray.length > 100) {
      errors.responsibilities = 'Cannot have more than 100 responsibility items';
    }
  }

  // Requirements validation (newline-separated string)
  if (data.requirements) {
    const requirementsArray = data.requirements.split('\n').filter(item => item.trim() !== '');
    if (requirementsArray.length > 100) {
      errors.requirements = 'Cannot have more than 100 requirement items';
    }
  }

  // Typing speed validation
  if (data.typingSpeedMin !== undefined && data.typingSpeedMin < 0) {
    errors.typingSpeedMin = 'Typing speed cannot be negative';
  }

  // Company website validation (if provided)
  if (data.otherCompanyWebsite && !isValidUrl(data.otherCompanyWebsite)) {
    errors.otherCompanyWebsite = 'Invalid company website URL';
  }

  // Application URL validation (if provided)
  if (data.application?.url && !isValidUrl(data.application.url)) {
    errors.application_url = 'Invalid application URL';
  }

  // Other company validation if hiring for other company
  if (data.hiringForOtherCompany === 'yes') {
    if (!data.otherCompanyName?.trim()) {
      errors.otherCompanyName = 'Company name is required when hiring for another company';
      missingFields.push('otherCompanyName');
    }
    if (!data.otherCompanyDescription?.trim()) {
      errors.otherCompanyDescription = 'Company description is required when hiring for another company';
      missingFields.push('otherCompanyDescription');
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    missingFields,
  };
};

/**
 * Validates if a job draft has minimum fields to be saved
 * (Less strict than full validation)
 */
export const validateJobDraft = (data: Partial<JobFormData>): JobValidationResult => {
  const errors: Record<string, string> = {};
  const missingFields: string[] = [];

  // For drafts, only title and employerId are required
  if (!data.title?.trim()) {
    errors.title = 'Job title is required to save draft';
    missingFields.push('title');
  } else if (data.title.length > 200) {
    errors.title = 'Title cannot exceed 200 characters';
  }

  if (!data.employerId?.trim()) {
    errors.employerId = 'Employer ID is required';
    missingFields.push('employerId');
  }

  // Validate data types if provided (but don't require them)
  if (data.category) {
    const validCategories = ['Medical', 'General', 'Legal', 'Ecommerce', 'Finance', 'Logistics', 'Other'];
    if (!validCategories.includes(data.category)) {
      errors.category = `${data.category} is not a valid category`;
    }
  }

  if (data.employmentType) {
    const validEmploymentTypes = ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'];
    if (!validEmploymentTypes.includes(data.employmentType)) {
      errors.employmentType = `${data.employmentType} is not a valid employment type`;
    }
  }

  if (data.locationType) {
    if (!['remote', 'onsite', 'hybrid'].includes(data.locationType)) {
      errors.locationType = 'Invalid location type';
    }
  }

  if (data.salaryMin !== undefined && data.salaryMin < 0) {
    errors.salaryMin = 'Minimum salary cannot be negative';
  }

  if (data.salaryMax !== undefined && data.salaryMin !== undefined && data.salaryMax < data.salaryMin) {
    errors.salaryMax = 'Maximum salary must be greater than or equal to minimum salary';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    missingFields,
  };
};

/**
 * Get completion percentage for a job draft
 */
export const getJobCompletionPercentage = (data: Partial<JobFormData>): number => {
  const requiredFields = [
    'title',
    'companyName',
    'description',
    'category',
    'employmentType',
    'locationType',
    'country',
    'application.method',
  ];

  let completedFields = 0;
  let totalFields = requiredFields.length;

  if (data.title?.trim()) completedFields++;
  if (data.companyName?.trim()) completedFields++;
  if (data.description?.trim()) completedFields++;
  if (data.category) completedFields++;
  if (data.employmentType) completedFields++;
  if (data.locationType) completedFields++;
  if (data.country?.trim()) completedFields++;
  if (data.application?.method) completedFields++;

  // Check conditional fields
  if (data.application?.method === 'external') {
    totalFields++;
    if (data.application.url?.trim()) completedFields++;
  }
  if (data.application?.method === 'email') {
    totalFields++;
    if (data.application.email?.trim()) completedFields++;
  }
  if (data.locationType !== 'remote') {
    totalFields++;
    if (data.city?.trim()) completedFields++;
  }

  return Math.round((completedFields / totalFields) * 100);
};

/**
 * Get user-friendly field names for error messages
 */
export const getFieldLabel = (fieldName: string): string => {
  const labels: Record<string, string> = {
    title: 'Job Title',
    companyName: 'Company Name',
    description: 'Job Description',
    responsibilities: 'Responsibilities',
    requirements: 'Requirements',
    category: 'Category',
    employmentType: 'Employment Type',
    locationType: 'Location Type',
    country: 'Country',
    city: 'City',
    application_method: 'Application Method',
    application_url: 'Application URL',
    application_email: 'Application Email',
    salaryMin: 'Minimum Salary',
    salaryMax: 'Maximum Salary',
    skills: 'Required Skills',
    otherCompanyName: 'Other Company Name',
    otherCompanyDescription: 'Other Company Description',
  };

  return labels[fieldName] || fieldName;
};

/**
 * Check which tabs have validation errors
 */
export const getTabValidationStatus = (data: Partial<JobFormData>) => {
  const tabErrors = {
    company: [] as string[],
    details: [] as string[],
    description: [] as string[],
    application: [] as string[],
  };

  // Company tab fields
  if (!data.companyName?.trim()) tabErrors.company.push('companyName');
  if (data.hiringForOtherCompany === 'yes') {
    if (!data.otherCompanyName?.trim()) tabErrors.company.push('otherCompanyName');
    if (!data.otherCompanyDescription?.trim()) tabErrors.company.push('otherCompanyDescription');
  }

  // Details tab fields
  if (!data.title?.trim()) tabErrors.details.push('title');
  if (!data.category) tabErrors.details.push('category');
  if (!data.employmentType) tabErrors.details.push('employmentType');
  if (!data.locationType) tabErrors.details.push('locationType');
  if (!data.country?.trim()) tabErrors.details.push('country');
  if (data.locationType !== 'remote' && !data.city?.trim()) tabErrors.details.push('city');

  // Description tab fields
  if (!data.description?.trim()) tabErrors.description.push('description');

  // Application tab fields
  if (!data.application?.method) tabErrors.application.push('application_method');
  if (data.application?.method === 'external' && !data.application.url?.trim()) {
    tabErrors.application.push('application_url');
  }
  if (data.application?.method === 'email' && !data.application.email?.trim()) {
    tabErrors.application.push('application_email');
  }

  return {
    company: tabErrors.company.length === 0,
    details: tabErrors.details.length === 0,
    description: tabErrors.description.length === 0,
    application: tabErrors.application.length === 0,
    errors: tabErrors,
  };
};

// Helper function for URL validation
function isValidUrl(string: string): boolean {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}