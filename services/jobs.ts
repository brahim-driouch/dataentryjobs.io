


// getJobs 

import { IJob } from "@/types/jobs";
import { convertJobToFormData } from "@/utils/job-form-data-transformers";


const getJobs = async (page:number,limit:number = 10) => {
    

      if(page < 1){
        page = 1;
      }
     const JobsResponse = await fetch(`/api/jobs?page=${page}&limit=${limit}`);

     if(!JobsResponse.ok){
        throw new Error("Jobs not found");
     }
     const jobs = await JobsResponse.json();
     if(!jobs){
        throw new Error("Jobs not found");
     }
      return {jobs:jobs,total:jobs.length,page:page,totalPages:Math.ceil(jobs.length/limit),hasMore:jobs.length >= limit};
}


// get single job

const getJob = async (id: string): Promise<IJob> => {
  const response = await fetch(`/api/jobs/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || 'Failed to fetch job');
  }

  const job = await response.json();
 return job
};

const jobService ={
getJobs,
getJob
}

export default jobService;