import { useState } from 'react';

const BaseUrl = import.meta.env.VITE_BASE_URL;

interface UseGetBlogStatsProps {
    getBlogStatsLoading: boolean;
    getBlogStatsErrMessage: string;
    statsBLog: any;
    getBlogStatsByUserId: (userId: string) => Promise<void>;
}

const useGetBlogStatsByUserId = (): UseGetBlogStatsProps => {
    const [getBlogStatsLoading, setGetBlogStatsLoading] = useState<boolean>(false);
    const [getBlogStatsErrMessage, setBlogStatsErrMessage] = useState<string>('');
    const [statsBLog, setStatsBlog] = useState<any>(null);

    const getBlogStatsByUserId = async (userId: string): Promise<void> => {
        setGetBlogStatsLoading(true);

        try {
            const response = await fetch(`${BaseUrl}/blogs/stats/${userId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch All BLog');
            }

            const data = await response.json();
            setStatsBlog(data);
        } catch (error: any) {
            setBlogStatsErrMessage(error.message || 'Failed to fetch getAll blog');
            console.error('Error fetching getAll Blog', error);
        } finally {
            setGetBlogStatsLoading(false);
        }
    };
    return { statsBLog, getBlogStatsErrMessage, getBlogStatsLoading, getBlogStatsByUserId };
};

export default useGetBlogStatsByUserId;
