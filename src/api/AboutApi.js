const apiUrl = process.env.REACT_APP_API_URL;

export const getAbout = async () => {
    try {

        const response = await fetch(`${apiUrl}/api/about`);
        if (!response.ok) {
            throw new Error('Failed to fetch About data');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};
export const addAbout = async (data) => {
    try {
        const response = await fetch(`${apiUrl}/api/add/about`, {
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

export const editAbout = async (data, id) => {

    try {
        const response = await fetch(`${apiUrl}/api/edit/about/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error updating portfolio:', error);
        throw error;
    }
};

export const AboutDelete = async (id) => {

    const url = `${apiUrl}/api/delete/about/${id}`

    const response = await fetch(url, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Failed to delete portfolio');
    }

    return await response.json();
};


