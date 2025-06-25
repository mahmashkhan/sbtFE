const apiUrl = process.env.REACT_APP_API_URL;
export const getCategory = async () => {
    try {
        const response = await fetch(`${apiUrl}/api/get/category`);
        if (!response.ok) {
            throw new Error('Failed to fetch Category');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};