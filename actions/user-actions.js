import axios from "axios";


export const getUserByFirebaseId = async(firebaseId) => {
    try {
        const response = await axios.get(`/api/user/${firebaseId}`);
        
        if (!response.data) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.data;
        
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
}

