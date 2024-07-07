import { useState } from 'react';

const BaseUrl = import.meta.env.VITE_BASE_URL;

interface UseGetMostViewedBlogByUserIdProps {
    ViewdLoading: boolean;
    ViewdErrMessage: string;
    mostViewedBlog: any;
    getMostViewedBlogByUserId: (userId: string) => Promise<void>;
}

const useGetMostViewedBlogByUserId = (): UseGetMostViewedBlogByUserIdProps => {
    const [ViewdLoading, setViewdLoading] = useState(false);
    const [ViewdErrMessage, setViewdErrMessage] = useState<string>('');
    const [mostViewedBlog, setMostViewedBlog] = useState<any>(null);

    const getMostViewedBlogByUserId = async (userId: string): Promise<void> => {
        setViewdLoading(true);
        setMostViewedBlog('');

        try {
            const response = await fetch(`${BaseUrl}/blogs/view/${userId}`);

            if (!response.ok) {
                throw new Error('Failed to fetch most viewed blog');
            }

            const data = await response.json();
            setMostViewedBlog(data);
        } catch (error: any) {
            setViewdErrMessage(error.message || 'Failed to fetch most viewed blog');
            console.error('Error fetching most viewed blog:', error);
        } finally {
            setViewdLoading(false);
        }
    };

    return { ViewdLoading, ViewdErrMessage, mostViewedBlog, getMostViewedBlogByUserId };
};

export default useGetMostViewedBlogByUserId;
