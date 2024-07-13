import { useState } from 'react';

const BaseUrl = import.meta.env.VITE_BASE_URL;

interface UseDeleteBlogProps {
    deleteBlogLoading: boolean;
    deleteBlogErrMessage: string;
    deleteBlog: (blogId: string) => Promise<void>;
}

const useDeleteBlog = (): UseDeleteBlogProps => {
    const [deleteBlogLoading, setDeleteBlogLoading] = useState(false);
    const [deleteBlogErrMessage, setDeleteBlogErrMessage] =
        useState<string>('');

    const deleteBlog = async (blogId: string): Promise<void> => {
        setDeleteBlogLoading(true);
        setDeleteBlogErrMessage('');

        try {
            const response = await fetch(`${BaseUrl}/blogs/${blogId}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Failed to delete blog');
            }

            console.log('Blog deleted successfully');
        } catch (error: any) {
            setDeleteBlogErrMessage(error.message || 'Failed to delete blog');
            console.error('Error deleting blog:', error);
        } finally {
            setDeleteBlogLoading(false);
        }
    };

    return { deleteBlogLoading, deleteBlogErrMessage, deleteBlog };
};

export default useDeleteBlog;
