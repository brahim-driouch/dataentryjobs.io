import profileService from "@/services/profile"
import { IWorkExperienceDTO } from "@/types/profile"
import { useMutation } from "@tanstack/react-query"




export const useAddWorkExperience = (id:string) => {
    return useMutation({
        mutationFn: (formData: IWorkExperienceDTO) => profileService.addWorkExperience(id,formData),
    })
}