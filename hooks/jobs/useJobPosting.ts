
import { JobFormData } from '@/types/jobs';
import { convertFormDataToJob } from '@/utils/job-form-data-transformers';
import { showErrors } from '@/utils/show-errors';
import { useMutation } from '@tanstack/react-query';



type  JobPostingResponse = {
    id: string
}



export const useJobPosting = () => {
  return useMutation<JobPostingResponse , Error, JobFormData>({
    mutationFn: async (jobData:JobFormData) => {
     
      const response = await fetch("/api/jobs/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData),
      })
       const data = await response.json();
      if (!response.ok) {
       console.log(data)
       showErrors([data.error],()=>{})
     
      }

      return  data
    },  
   
  });
};