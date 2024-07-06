import { useState } from 'react';

const BaseUrl = import.meta.env.VITE_BASE_URL;

interface UseMostFavTagProps {
    loading: boolean;
    errMessage: string;
    mostFavTags: any;
    getMostFavTag: () => Promise<void>;
}

const useMostFavTag = (): UseMostFavTagProps => {
    const [loading, setLoading] = useState(false);
    const [errMessage, setErrMessage] = useState<string>('');
    const [mostFavTags, setMostFavTags] = useState<any>(null);

    const getMostFavTag = async (): Promise<void> => {
        setLoading(true);
        setErrMessage('');

        try {
            const response = await fetch(`${BaseUrl}/like/tag`);

            if (!response.ok) {
                throw new Error('Failed to fetch most liked tags');
            }

            const data = await response.json();
            setMostFavTags(data);
        } catch (error: any) {
            setErrMessage(error.message || 'Failed to fetch most liked tags');
            console.error('Error fetching most liked tags:', error);
        } finally {
            setLoading(false);
        }
    };

    return { loading, errMessage, mostFavTags, getMostFavTag };
};

export default useMostFavTag;
