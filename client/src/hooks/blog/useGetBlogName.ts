import { useState } from 'react';

const BaseUrl = import.meta.env.VITE_BASE_URL;

interface UseGetBlogsBySimilarNameProps {
    loading: boolean;
    errMessage: string;
    blogs: any;
    getBlogsBySimilarName: (userId: string, title: string) => Promise<void>;
}

const useGetBlogsBySimilarName = (): UseGetBlogsBySimilarNameProps => {
    const [loading, setLoading] = useState(false);
    const [errMessage, setErrMessage] = useState<string>('');
    const [blogs, setBlogs] = useState<any>(null);

    const getBlogsBySimilarName = async (
        userId: string,
        title: string
    ): Promise<void> => {
        setLoading(true);
        setErrMessage('');

        try {
            const response = await fetch(
                `${BaseUrl}/blogs/similar?userId=${userId}&title=${title}`
            );

            if (!response.ok) {
                throw new Error('Failed to fetch blogs by similar name');
            }

            const data = await response.json();
            setBlogs(data);
        } catch (error: any) {
            setErrMessage(
                error.message || 'Failed to fetch blogs by similar name'
            );
            console.error('Error fetching blogs by similar name:', error);
        } finally {
            setLoading(false);
        }
    };

    return { loading, errMessage, blogs, getBlogsBySimilarName };
};

export default useGetBlogsBySimilarName;
