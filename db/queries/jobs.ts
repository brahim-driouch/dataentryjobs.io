import { HydratedDocument } from "mongoose";
import { IJob, IJobModel } from "@/types/jobs";
import { JobFormData } from "@/types/jobs";
import { auth } from "@/lib/auth";
import connectDB from "../connection";
import Job from "../models/Job";
import { transformFormDataToJob } from "@/utils/job-form-data-transformers";

const createJob = async (jobData: JobFormData): Promise<string> => {
  try {
    const session = await auth();
    if (!session) {
      throw new Error('Unauthorized');
    }

   

    await connectDB();

    const data = transformFormDataToJob(jobData);
   
  //TODO : FIX employer_id NOT GETTING SAVED TO DB

    const job: HydratedDocument<IJobModel> = await Job.create(data);
    
   

    return job._id.toString();
  } catch (error) {
    console.error('Error creating job:', error);
    throw error;
  }
};

const getJobs = async (page: number, limit: number = 10,employer_id:string) => {
  try {
    await connectDB();
    const skip = (page - 1) * limit;
       const jobs  = await Job.find({ employer_id })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .lean({ virtuals: true });
    return jobs;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
};

// get single job by id

const getJobById = async (id: string) => {
  try {
    if (!id) {
      throw new Error('Invalid job id');
    }
    
    await connectDB();
    
    const job = await Job.findById(id).lean({ virtuals: true }) as unknown as IJob ;
    
    // ✅ Add this check - findById returns null if not found
    if (!job) {
      throw new Error('Job not found');
    }
    
    return job;
  } catch (error) {
    console.error('Error fetching job:', error);
    throw error;
  }
};

// db/queries/jobs.ts
const updateJob = async (data: JobFormData): Promise<IJob> => {
  try {
    await connectDB();
  console.log(data)

    // Transform FormData to Job model format
    const updateData: any = {
      title: data.title,
      company_name: data.companyName,
      description: data.description,
      responsibilities: data.responsibilities.split('\n').filter(r => r.trim()),
      requirements: data.requirements.split('\n').filter(r => r.trim()),
      category: data.category,
      experience_level: data.experienceLevel,
      employment_type: data.employmentType,
      
      // ✅ Complete location object
      'location.type': data.locationType,
      'location.country': data.country,
      'location.country_code': data.countryCode,
      'location.city': data.city,
      'location.state': data.state,
      'location.timezone': data.timezone,
      'location.is_remote': data.isRemote,
      'location.remote_regions': data.remoteRegions?.split(',').map(r => r.trim()).filter(Boolean) || [],
      
      // ✅ Complete salary object
      'salary.min': data.salaryMin,
      'salary.max': data.salaryMax,
      'salary.currency': data.salaryCurrency,
      'salary.period': data.salaryPeriod,
      'salary.is_disclosed': data.salaryIsDisclosed,
      
      skills: data.skills.split(',').map(s => s.trim()).filter(Boolean),
      certifications: data.certifications?.split(',').map(c => c.trim()).filter(Boolean) || [],
      language_requirements: data.languageRequirements?.split(',').map(l => l.trim()).filter(Boolean) || [],
      application: data.application,
      status: data.status,
      expires_date: data.expiresDate,
      hiring_for_other_company: data.hiringForOtherCompany,
      other_company_name: data.otherCompanyName,
      other_company_description: data.otherCompanyDescription,
      other_company_website: data.otherCompanyWebsite,
      urgent_hiring: data.urgentHiring
    };

    // Handle typing speed conditionally
    if (data.typingSpeedRequired) {
      updateData['typing_speed.min'] = data.typingSpeedMin;
      updateData['typing_speed.required'] = true;
    } else {
      updateData.typing_speed = undefined;
    }

    const updatedJob = await Job.findByIdAndUpdate(
      data._id,
      { $set: updateData }, 
      { new: true, runValidators: true }
    ).lean({ virtuals: true }) as unknown as IJob;

    if (!updatedJob) {
      throw new Error('Job not found');
    }

    return updatedJob;
  } catch (error) {
    console.error('Error updating job:', error);
    throw error;
  }

};
const jobQueries = {
  createJob,
  getJobs,
  getJobById,
  updateJob
};

export default jobQueries;