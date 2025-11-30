// hooks/jobs/useJobUpdate.ts
import { useMutation } from "@tanstack/react-query";
import { JobFormData } from "@/types/jobs";
import jobService from "@/services/jobs";

export const useJobUpdate = () => {
  return useMutation({
    mutationFn: (data: JobFormData) => jobService.updateJob(data),
    onError: (error) => {
      console.error("Error updating job:", error);
    },
  });
};