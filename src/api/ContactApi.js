const apiUrl = process.env.REACT_APP_API_URL;
export const contact = async (data) => {
    console.log('Contact Data:', data);
    try {
        const response = await fetch(`${apiUrl}/api/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error adding portfolio:', error);
        throw error;
    }
};