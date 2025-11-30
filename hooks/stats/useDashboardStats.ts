import jobService from "@/services/jobs"
import { useQuery } from "@tanstack/react-query"





export const useDashboardStats = () => {
    return useQuery({
        queryKey: ['dashboard-stats'],
        queryFn: async () =>    jobService.getDashboardStats(),
        staleTime: 60 * 60 * 1000,
        retry:2
    })
}