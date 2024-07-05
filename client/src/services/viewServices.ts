const BaseUrl = import.meta.env.VITE_BASE_URL

export const createView = async (blogId: string) => {
    try {
        const response = await fetch(`${BaseUrl}/view/${blogId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error('Failed to create view');
        }

        return 'Viewed successfully created';
    } catch (error) {
        console.error('Error creating view:', error);
        throw new Error('Failed to create view');
    }
};

export const getTotalViewPerMonthByUserId = async (userId: string) => {
    try {
        const response = await fetch(`${BaseUrl}/view/${userId}`);

        if (!response.ok) {
            throw new Error('Failed to fetch total views per month');
        }

        return response.json();
    } catch (error) {
        console.error('Error fetching total views per month:', error);
        throw new Error('Failed to fetch total views per month');
    }
};
