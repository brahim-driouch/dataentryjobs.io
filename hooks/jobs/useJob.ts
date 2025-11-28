import jobService from "@/services/jobs"
import { IJob } from "@/types/jobs"
import { useQuery } from "@tanstack/react-query"

export const useJob =  (id: string) => {
  return useQuery<IJob, Error>({
    queryKey: ['job', id], // ✅ Add 'job' prefix for better cache organization
    queryFn:  () =>  jobService.getJob(id),
    enabled: !!id, // ✅ Only run query if id exists
    staleTime: 5 * 60 * 1000,
    retry: 2
  })
}