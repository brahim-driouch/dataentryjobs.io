import { IPersonalInfo, IWorkExperience, IWorkExperienceDTO } from "@/types/profile"
import { dataTransformerToCamelCase, dataTransformerToSnakeCase } from "@/utils/data-transformer"


const getProfileByUseryId = async (id: string) => {
    try {
        const response = await fetch(`/api/users/profile/${id}`)
       
        const data = await response.json()
         if (!response.ok || !data.success) {
            const errorMessage = data.message || 'Failed to fetch profile'
            throw new Error(errorMessage)
        }
      
        return data
    } catch (error) {
        console.error('Error fetching profile:', error)
        return null
    }
}

const updatePersonalInfo = async (id: string, formData: IPersonalInfo) => {
    try {
        const response = await fetch(`/api/users/profile/${id}/personal-info`, {
         
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        const data = await response.json()
        console.log(data)
        if (!response.ok || !data.success) {
            const errorMessage = data.message || 'Failed to update profile'
            throw new Error(errorMessage)
        }
        console.log(data)
        return data
    } catch (error) {
        console.error('Error updating profile:', error)
        throw error
    }
}

const addWorkExperience = async (id: string, formData: IWorkExperienceDTO) => {
    try {
        const transformedData = dataTransformerToSnakeCase(formData) as IWorkExperience;
        const response = await fetch(`/api/users/profile/${id}/work-experience`, {
         
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transformedData)
        })
        const data = await response.json()
        if (!response.ok || !data.success) {
            const errorMessage = data.message || 'Failed to update profile'
            throw new Error(errorMessage)
        }
        return data
    } catch (error) {
        console.error('Error updating profile:', error)
        throw error
    }
}

const updateWorkExperience = async (workExperienceId: string, formData: IWorkExperienceDTO) => {
    try {
            const transformedData = dataTransformerToSnakeCase(formData) as IWorkExperience;
        const response = await fetch(`/api/users/profile/work-experience/${workExperienceId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transformedData)
        })
        const data = await response.json()
        if (!response.ok || !data.success) {
            const errorMessage = data.message || 'Failed to update work experience'
            throw new Error(errorMessage)
        }
        return dataTransformerToCamelCase(data) as IWorkExperienceDTO
    } catch (error) {
        console.error('Error updating work experience:', error)
        throw error
    }
}
const profileService = {
    getProfileByUseryId,
    updatePersonalInfo,
    addWorkExperience,
    updateWorkExperience
}

export default profileService