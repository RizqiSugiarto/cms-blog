import { useState } from 'react';

const BaseUrl = import.meta.env.VITE_BASE_URL;

interface UseGetBlogByIdProps {
    GetBlogByIdLoading: boolean;
    GetBlogByIdErrMessage: string;
    blog: any;
    getBlogById: (blogId: string) => Promise<void>;
}

const useGetBlogById = (): UseGetBlogByIdProps => {
    const [GetBlogByIdLoading, setGetBlogByIdLoading] = useState(false);
    const [GetBlogByIdErrMessage, setGetBlogByIdErrMessage] = useState<string>('');
    const [blog, setBlog] = useState<any>(null);

    const getBlogById = async (blogId: string): Promise<void> => {
        setGetBlogByIdLoading(true);
        setGetBlogByIdErrMessage('');

        try {
            const response = await fetch(`${BaseUrl}/blogs/${blogId}`);

            if (!response.ok) {
                throw new Error('Failed to fetch blog by ID');
            }

            const data = await response.json();
            setBlog(data);
        } catch (error: any) {
            setGetBlogByIdErrMessage(error.message || 'Failed to fetch blog by ID');
            console.error('Error fetching blog by ID:', error);
        } finally {
            setGetBlogByIdLoading(false);
        }
    };

    return { GetBlogByIdLoading, GetBlogByIdErrMessage, blog, getBlogById };
};

export default useGetBlogById;
