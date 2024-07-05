const BaseUrl = import.meta.env.VITE_BASE_URL

type createLikeRequest = {
    userId: string
    blogId: string
}

export const createLiked = async (likedData: createLikeRequest) => {
    try {
        const response = await fetch(`${BaseUrl}/like`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(likedData)
        });

        if (!response.ok) {
            throw new Error('Failed to create like');
        }

        return 'Liked successfully created';
    } catch (error) {
        console.error('Error creating like:', error);
        throw new Error('Failed to create like');
    }
};

export const getTotalLikePerMonthByUserId = async (userId: string) => {
    try {
        const response = await fetch(`${BaseUrl}/like/${userId}`);

        if (!response.ok) {
            throw new Error('Failed to fetch total likes per month');
        }

        return response.json();
    } catch (error) {
        console.error('Error fetching total likes per month:', error);
        throw new Error('Failed to fetch total likes per month');
    }
};

export const getMostFavTag = async () => {
    try {
        const response = await fetch(`${BaseUrl}/like/tag`);

        if (!response.ok) {
            throw new Error('Failed to fetch most liked tags');
        }

        return response.json();
    } catch (error) {
        console.error('Error fetching most liked tags:', error);
        throw new Error('Failed to fetch most liked tags');
    }
};