import { useState } from 'react';

const BaseUrl = import.meta.env.VITE_BASE_URL;

interface UseMostFavTagProps {
    FavTagLoading: boolean;
    FavTagErrMessage: string;
    FavTag: any;
    getMostFavTag: () => Promise<void>;
}

const useMostFavTag = (): UseMostFavTagProps => {
    const [FavTagLoading, setLoadingFavTag] = useState(false);
    const [FavTagErrMessage, setErrMessageFavTag] = useState<string>('');
    const [FavTag, setFavTags] = useState<any>(null);

    const getMostFavTag = async (): Promise<void> => {
        setLoadingFavTag(true);
        setErrMessageFavTag('');

        try {
            const response = await fetch(`${BaseUrl}/like/tag`);

            if (!response.ok) {
                throw new Error('Failed to fetch most liked tags');
            }

            const data = await response.json();
            setFavTags(data);
        } catch (error: any) {
            setErrMessageFavTag(
                error.message || 'Failed to fetch most liked tags'
            );
            console.error('Error fetching most liked tags:', error);
        } finally {
            setLoadingFavTag(false);
        }
    };

    return { FavTagLoading, FavTagErrMessage, FavTag, getMostFavTag };
};

export default useMostFavTag;
