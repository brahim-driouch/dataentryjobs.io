import { IPersonalInfo } from "@/types/profile"


const getProfileByUseryId = async (id: string) => {
    try {
        const response = await fetch(`/api/users/profile/${id}`)
        if (!response.ok) {
            throw new Error('Failed to fetch profile')
        }
        const data = await response.json()
        console.log(data)
        return data
    } catch (error) {
        console.error('Error fetching profile:', error)
        return null
    }
}

const updatePersonalInfo = async (id: string, formData: IPersonalInfo) => {
    try {
        const response = await fetch(`/api/users/profile/${id}/personal-info`, {
         
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        if (!response.ok) {
            throw new Error('Failed to update profile')
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error updating profile:', error)
        return null
    }
}


const userService = {
    getProfileByUseryId,
    updatePersonalInfo
}

export default userService