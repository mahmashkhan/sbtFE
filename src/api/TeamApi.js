
const apiUrl = process.env.REACT_APP_API_URL;
export const getTeam = async () => {
    try {
        const response = await fetch(`${apiUrl}/api/get/team`);
        if (!response.ok) {
            throw new Error('Failed to fetch Team Member');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};
export const addTeam = async (formData) => {
    try {
        const response = await fetch(`${apiUrl}/api/add/team`, {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error adding Team Member:', error);
        throw error;
    }
};



export const editTeam = async (data, id) => {
    console.log('Sending data to server:', data);
    try {
        const response = await fetch(`${apiUrl}/api/edit/team/${id}`, {
            method: 'PUT',
            body: data,
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error updating Team Member:', error);
        throw error;
    }
};


export const deleteTeam = async (id) => {
    console.log("api id---------",id);
    const url =`${apiUrl}/api/delete/team/${id}`
    
    const response = await fetch(url, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Failed to delete Team Member');
    }

    return await response.json();
};


