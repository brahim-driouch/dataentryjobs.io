import jobService from "@/services/jobs"
import { useMutation } from "@tanstack/react-query"




export const   useDeleteJob = () => {
      return useMutation({
        mutationFn: (   id:string)=>jobService.deleteJob(id),
        onError: (error) => {
          console.error("Error deleting job:", error);
        },
      })
}