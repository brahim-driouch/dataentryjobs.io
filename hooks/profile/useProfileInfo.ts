import userService from "@/services/profile"
import { ProfileResponseDTO } from "@/types/profile"
import { useQuery } from "@tanstack/react-query"





export const useUserProfile = (id:string) => {
    return useQuery<ProfileResponseDTO , Error>({
        queryKey: ['profile', id],
        queryFn: () => userService.getProfileByUseryId(id) as Promise<ProfileResponseDTO>,
        staleTime: 60 * 60 * 1000,
        retry: 3,
        refetchOnWindowFocus: false,
    })
}