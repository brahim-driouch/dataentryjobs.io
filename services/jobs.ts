


// getJobs 

import { IJob, JobFormData } from "@/types/jobs";


// services/jobs.ts
const updateJob = async (data: JobFormData): Promise<IJob> => {
  if (!data._id) {
    throw new Error("Job ID is required for update");
  }

  const response = await fetch(`/api/jobs/${data._id}`, {
    method: 'PUT', 
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });


  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to update job');
  }
  return await response.json();
};



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

const deleteJob = async (id: string): Promise<IJob> => {
  const response = await fetch(`/api/jobs/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || 'Failed to delete job');
  }

  const job = await response.json();
 return job
};


const getDashboardStats = async()=>{
    const response = await fetch(`/api/employers/dashboard/stats`);
    if(!response.ok){
        throw new Error("Jobs not found");
    }
    const data = await response.json();
    if(!data){
        throw new Error("Jobs not found");
    }
    return data
}
const jobService ={
getJobs,
getJob,
updateJob,
deleteJob,
getDashboardStats
}

export default jobService;