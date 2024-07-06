import { useState } from 'react';

const BaseUrl = import.meta.env.VITE_BASE_URL;

interface UseGetAllBlogsByUserIdProps {
    loading: boolean;
    errMessage: string;
    blogs: any; 
    getAllBlogsByUserId: (userId: string) => Promise<void>;
}

const useGetAllBlogsByUserId = (): UseGetAllBlogsByUserIdProps => {
    const [loading, setLoading] = useState(false);
    const [errMessage, setErrMessage] = useState<string>('');
    const [blogs, setBlogs] = useState<any>(null); 

    const getAllBlogsByUserId = async (userId: string): Promise<void> => {
        setLoading(true);
        setErrMessage('');

        try {
            const response = await fetch(`${BaseUrl}/blogs/user/${userId}`);

            if (!response.ok) {
                throw new Error('Failed to fetch blogs by user ID');
            }

            const data = await response.json();
            setBlogs(data);
        } catch (error: any) {
            setErrMessage(error.message || 'Failed to fetch blogs by user ID');
            console.error('Error fetching blogs by user ID:', error);
        } finally {
            setLoading(false);
        }
    };

    return { loading, errMessage, blogs, getAllBlogsByUserId };
};

export default useGetAllBlogsByUserId;
