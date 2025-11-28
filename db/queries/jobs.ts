import { HydratedDocument } from "mongoose";
import { IJob, IJobModel } from "@/types/jobs";
import { JobFormData } from "@/types/jobs";
import { auth } from "@/lib/auth";
import connectDB from "../connection";
import Job from "../models/Job";
import mongoose from "mongoose";
import { validateJobRequiredFields } from "@/lib/data-validator";
import { convertFormDataToJob } from "@/utils/job-form-data-transformers";

const createJob = async (jobData: JobFormData): Promise<string> => {
  try {
    const session = await auth();
    if (!session) {
      throw new Error('Unauthorized');
    }

   

    await connectDB();

    const data = convertFormDataToJob(jobData);
   
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
const jobQueries = {
  createJob,
  getJobs,
  getJobById
};

export default jobQueries;