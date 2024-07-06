import { useState } from 'react';

const BaseUrl = import.meta.env.VITE_BASE_URL;

interface UseGetMostViewedBlogByUserIdProps {
    loading: boolean;
    errMessage: string;
    mostViewedBlog: any;
    getMostViewedBlogByUserId: (userId: string) => Promise<void>;
}

const useGetMostViewedBlogByUserId = (): UseGetMostViewedBlogByUserIdProps => {
    const [loading, setLoading] = useState(false);
    const [errMessage, setErrMessage] = useState<string>('');
    const [mostViewedBlog, setMostViewedBlog] = useState<any>(null);

    const getMostViewedBlogByUserId = async (userId: string): Promise<void> => {
        setLoading(true);
        setErrMessage('');

        try {
            const response = await fetch(`${BaseUrl}/blogs/view/${userId}`);

            if (!response.ok) {
                throw new Error('Failed to fetch most viewed blog');
            }

            const data = await response.json();
            setMostViewedBlog(data);
        } catch (error: any) {
            setErrMessage(error.message || 'Failed to fetch most viewed blog');
            console.error('Error fetching most viewed blog:', error);
        } finally {
            setLoading(false);
        }
    };

    return { loading, errMessage, mostViewedBlog, getMostViewedBlogByUserId };
};

export default useGetMostViewedBlogByUserId;
