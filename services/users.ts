import { IPersonalInfo } from "@/types/profile"


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


const userService = {
    getProfileByUseryId,
    updatePersonalInfo
}

export default userService