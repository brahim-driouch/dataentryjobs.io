import profileService from "@/services/profile"
import { IWorkExperienceDTO } from "@/types/profile"
import { useMutation } from "@tanstack/react-query"





export const useUpdateWorkExperience = (workExperienceId:string)=>{
   return useMutation({
    mutationFn:(formData:IWorkExperienceDTO)=>   profileService.updateWorkExperience(workExperienceId,formData)
    
   })

}