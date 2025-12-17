import profileService from "@/services/profile"
import { IWorkExperienceDTO } from "@/types/profile"
import { useMutation } from "@tanstack/react-query"





export const useUpdateWorkExperience = (userId:string,workExperienceId:string)=>{
   return useMutation({
    mutationFn:(formData:IWorkExperienceDTO)=>   profileService.updateWorkExperience(userId,workExperienceId,formData)
    
   })

}