const apiUrl = process.env.REACT_APP_API_URL;
export const getHighlight = async () => {
    try {
        const response = await fetch(`${apiUrl}/api/get/highlight`);
        if (!response.ok) {
            throw new Error('Failed to fetch Highlight video data');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};
export const addHighlight = async (data) => {
    
    try {
        const response = await fetch(`${apiUrl}/api/add/highlight`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error adding Highlight video', error);
        throw error;
    }
};


