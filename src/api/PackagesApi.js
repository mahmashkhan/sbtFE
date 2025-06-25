
const apiUrl = process.env.REACT_APP_API_URL;
export const getPackagesByCategory = async (slug) => {
    
    try {
        const response = await fetch(`${apiUrl}/api/get/package/${slug}`);
        if (!response.ok) {
            throw new Error('Failed to fetch Packages');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};
export const getPackages = async (slug) => {
    
    try {
        const response = await fetch(`${apiUrl}/api/get/package`);
        if (!response.ok) {
            throw new Error('Failed to fetch Packages');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};
export const addPackages = async (data) => {
    try {
        const response = await fetch(`${apiUrl}/api/add/package`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error adding packages:', error);
        throw error;
    }
};


export const deletePackage = async (id) => {
  
    const url =`${apiUrl}/api/delete/package/${id}`
   
    const response = await fetch(url, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Failed to delete package');
    }

    return await response.json();
};


