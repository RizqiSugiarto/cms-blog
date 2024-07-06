import { useState } from 'react';

const BaseUrl = import.meta.env.VITE_BASE_URL;

interface UseGetBlogByIdProps {
    loading: boolean;
    errMessage: string;
    blog: any;
    getBlogById: (blogId: string) => Promise<void>;
}

const useGetBlogById = (): UseGetBlogByIdProps => {
    const [loading, setLoading] = useState(false);
    const [errMessage, setErrMessage] = useState<string>('');
    const [blog, setBlog] = useState<any>(null);

    const getBlogById = async (blogId: string): Promise<void> => {
        setLoading(true);
        setErrMessage('');

        try {
            const response = await fetch(`${BaseUrl}/blogs/${blogId}`);

            if (!response.ok) {
                throw new Error('Failed to fetch blog by ID');
            }

            const data = await response.json();
            setBlog(data);
        } catch (error: any) {
            setErrMessage(error.message || 'Failed to fetch blog by ID');
            console.error('Error fetching blog by ID:', error);
        } finally {
            setLoading(false);
        }
    };

    return { loading, errMessage, blog, getBlogById };
};

export default useGetBlogById;
