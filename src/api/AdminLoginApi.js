export const AdminLogin = async (data) => {
    try {
        const response = await fetch('https://sbt-production.up.railway.app/api/sbt/admin/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error Loging In:', error);
        throw error;
    }
};