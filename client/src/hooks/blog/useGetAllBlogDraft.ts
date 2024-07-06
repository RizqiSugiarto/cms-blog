import { useState } from 'react';

const BaseUrl = import.meta.env.VITE_BASE_URL;

interface UseGetAllBlogsDraftByUserIdProps {
    loading: boolean;
    errMessage: string;
    drafts: any; 
    getAllBlogsDraftByUserId: (userId: string) => Promise<void>;
}

const useGetAllBlogsDraftByUserId = (): UseGetAllBlogsDraftByUserIdProps => {
    const [loading, setLoading] = useState(false);
    const [errMessage, setErrMessage] = useState<string>('');
    const [drafts, setDrafts] = useState<any>(null);

    const getAllBlogsDraftByUserId = async (userId: string): Promise<void> => {
        setLoading(true);
        setErrMessage('');

        try {
            const response = await fetch(`${BaseUrl}/blogs/draft/${userId}`);

            if (!response.ok) {
                throw new Error('Failed to fetch draft blogs by user ID');
            }

            const data = await response.json();
            setDrafts(data);
        } catch (error: any) {
            setErrMessage(error.message || 'Failed to fetch draft blogs by user ID');
            console.error('Error fetching draft blogs by user ID:', error);
        } finally {
            setLoading(false);
        }
    };

    return { loading, errMessage, drafts, getAllBlogsDraftByUserId };
};

export default useGetAllBlogsDraftByUserId;
