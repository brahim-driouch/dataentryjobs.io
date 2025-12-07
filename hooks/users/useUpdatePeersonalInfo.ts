import userService from "@/services/users"
import { IPersonalInfo } from "@/types/profile"
import { showErrors } from "@/utils/show-errors"
import { showSuccess } from "@/utils/showSuccess"
import { useMutation } from "@tanstack/react-query"






export const useUpdatePersonalInfo = (id:string,formData: IPersonalInfo) => {
 
    return useMutation({
        mutationFn: () => userService.updatePersonalInfo(id,formData),
        onError: (error) => {
          showErrors([error.message],()=>{})
        },
        onSuccess: () => {
          showSuccess("Profile updated successfully 2")
        }
    })
}