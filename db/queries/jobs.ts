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

    if (!mongoose.Types.ObjectId.isValid(session.user.id)) {
      throw new Error('Invalid user ID');
    }

    const { errors, isValid } = validateJobRequiredFields(jobData);
    if (!isValid) {
      throw new Error('Invalid job data');
    }

    await connectDB();

    const data = convertFormDataToJob(jobData);
    data.employer_id = new mongoose.Types.ObjectId(session.user.id);
    
    // Clean undefined values recursively
    const cleanData = JSON.parse(JSON.stringify(data, (key, value) => {
      return value === undefined ? null : value;
    }));

    console.log('Cleaned data:', cleanData);

    const job: HydratedDocument<IJobModel> = await Job.create(cleanData);
    
    console.log('Created job:', {
      _id: job._id,
      employer_id: job.employer_id,
      company_id: job.company_id
    });

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