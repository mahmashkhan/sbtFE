const apiUrl = process.env.REACT_APP_API_URL;
export const fetchPortfolio = async () => {
    try {
        const response = await fetch(`${apiUrl}/api/get/portfolio`);
        if (!response.ok) {
            throw new Error('Failed to fetch Portfolio data');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}
export const addPortfolio = async (data) => {
    try {
        const response = await fetch(`${apiUrl}/api/add/portfolio`, {
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

export const updatePortfolio = async (data, id) => {
    console.log(JSON.stringify(data), id);
    const url = `${apiUrl}/api/update/portfolio/${id}`
    console.log("url--", url);
    try {
        const response = await fetch(url, {
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

export const PortfolioDelete = async (id) => {
    const response = await fetch(`${apiUrl}/api/delete/portfolio/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Failed to delete portfolio');
    }

    return await response.json();
};
