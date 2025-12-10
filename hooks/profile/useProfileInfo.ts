import userService from "@/services/profile"
import { useQuery } from "@tanstack/react-query"
import { ProfileResponse } from "@/db/queries/users"





export const useUserProfile = <ProfileResponse , Error>(id:string) => {
    return useQuery({
        queryKey: ['profile', id],
        queryFn: () => userService.getProfileByUseryId(id),
        enabled: !!id,
        staleTime: 60 * 60 * 1000,
        retry: 3,
        refetchOnWindowFocus: false,
    })
}