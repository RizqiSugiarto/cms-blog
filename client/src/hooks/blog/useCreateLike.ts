import { useState } from 'react';

const BaseUrl = import.meta.env.VITE_BASE_URL;

interface UseCreateLikedProps {
    loading: boolean;
    errMessage: string;
    createLiked: (likedData: createLikeRequest) => Promise<void>;
}

type createLikeRequest = {
    userId: string;
    blogId: string;
};

const useCreateLiked = (): UseCreateLikedProps => {
    const [loading, setLoading] = useState(false);
    const [errMessage, setErrMessage] = useState<string>('');

    const createLiked = async (likedData: createLikeRequest): Promise<void> => {
        setLoading(true);
        setErrMessage('');

        try {
            const response = await fetch(`${BaseUrl}/blogs/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(likedData)
            });

            if (!response.ok) {
                throw new Error('Failed to create like');
            }

        } catch (error: any) {
            setErrMessage(error.message || 'Failed to create like');
            console.error('Error creating like:', error);
        } finally {
            setLoading(false);
        }
    };

    return { loading, errMessage, createLiked };
};

export default useCreateLiked;
