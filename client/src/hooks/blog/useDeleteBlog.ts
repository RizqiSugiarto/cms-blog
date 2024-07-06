import { useState } from 'react';

const BaseUrl = import.meta.env.VITE_BASE_URL;

interface UseDeleteBlogProps {
    loading: boolean;
    errMessage: string;
    deleteBlog: (blogId: string) => Promise<void>;
}

const useDeleteBlog = (): UseDeleteBlogProps => {
    const [loading, setLoading] = useState(false);
    const [errMessage, setErrMessage] = useState<string>('');

    const deleteBlog = async (blogId: string): Promise<void> => {
        setLoading(true);
        setErrMessage('');

        try {
            const response = await fetch(`${BaseUrl}/blogs/${blogId}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Failed to delete blog');
            }

            console.log('Blog deleted successfully');
        } catch (error: any) {
            setErrMessage(error.message || 'Failed to delete blog');
            console.error('Error deleting blog:', error);
        } finally {
            setLoading(false);
        }
    };

    return { loading, errMessage, deleteBlog };
};

export default useDeleteBlog;
