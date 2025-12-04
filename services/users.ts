

const getProfileById = async (id: string) => {
    try {
        const response = await fetch(`/api/users/profile/${id}`)
        if (!response.ok) {
            throw new Error('Failed to fetch profile')
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching profile:', error)
        return null
    }
}




const userService = {
    getProfileById
}

export default userService