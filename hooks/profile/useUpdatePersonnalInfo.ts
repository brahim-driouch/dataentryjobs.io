import userService from "@/services/profile"
import { IPersonalInfo } from "@/types/profile"
import { useMutation } from "@tanstack/react-query"






export const useUpdatePersonalInfo = (id:string) => {
 
    return useMutation({
        mutationFn: (formData: IPersonalInfo) => userService.updatePersonalInfo(id,formData),
        
    })
}