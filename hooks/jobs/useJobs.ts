import jobService from "@/services/jobs";
import { IJob } from "@/types/jobs";
import { useQuery } from "@tanstack/react-query";

interface JobsResponse {
  jobs: IJob[];
  total: number;
  page: number;
  totalPages: number;
  hasMore: boolean;
}
export const useJobs = (page: number, limit: number = 10) => {
  return useQuery<JobsResponse, Error>({
    queryKey: ['jobs', page, limit],
    queryFn: () => jobService.getJobs(page, limit),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2, 
  });
  
};

// Now error is typed as Error
// const { data, error } = useJobs(1);
// error?.message // string