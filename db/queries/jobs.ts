import { HydratedDocument } from "mongoose";
import { IJobModel } from "@/types/jobs";
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

const jobQueries = {
  createJob,
};

export default jobQueries;