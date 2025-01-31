import axios from "axios";


export const getTaskById = async(taskId) => {
    if(taskId === "new") return null;
    try {
        const response = await axios.get(`/api/tasks/${taskId}`);
        
        if (!response.data) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return response.data;
        
    } catch (error) {
        console.error('Error fetching task:', error);
        throw error;
    }
}
