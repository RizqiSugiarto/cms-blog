import { useState } from 'react';

const BaseUrl = import.meta.env.VITE_BASE_URL;

interface UseGetAllBlogProps {
    getAllBlogLoading: boolean;
    getAllErrMessage: string;
    allBLog: any;
    getAllBlogByUserId: (userId: string) => Promise<void>;
}

const useGetAllBlogsByUserId = (): UseGetAllBlogProps => {
    const [getAllBlogLoading, setgetAllBlogLoading] = useState<boolean>(false);
    const [getAllErrMessage, setgetAllErrMessage] = useState<string>('');
    const [allBLog, setallBLog] = useState<any>(null);

    const getAllBlogByUserId = async (userId: string): Promise<void> => {
        setgetAllBlogLoading(true);

        try {
            const response = await fetch(`${BaseUrl}/blogs/user/${userId}`);

            if (!response.ok) {
                throw new Error('Failed to fetch All BLog');
            }

            const data = await response.json();
            setallBLog(data);
        } catch (error: any) {
            setgetAllErrMessage(error.message || 'Failed to fetch getAll blog');
            console.error('Error fetching getAll Blog', error);
        } finally {
            setgetAllBlogLoading(false);
        }
    };
    return { allBLog, getAllErrMessage, getAllBlogLoading, getAllBlogByUserId };
};

export default useGetAllBlogsByUserId;
