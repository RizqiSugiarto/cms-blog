import { useState } from 'react';
import { UpdateBlogRequest } from '@/types';

const BaseUrl = import.meta.env.VITE_BASE_URL;

interface UseUpdateBlogProps {
    UpdateBlogLoading: boolean;
    UpdateBlogErrMessage: string;
    updateBlog: (blogRequest: UpdateBlogRequest) => Promise<void>;
}

const useUpdateBlog = (): UseUpdateBlogProps => {
    const [UpdateBlogLoading, setUpdateBlogLoading] = useState(false);
    const [UpdateBlogErrMessage, setUpdateBlogErrMessage] =
        useState<string>('');

    const updateBlog = async (
        blogRequest: UpdateBlogRequest
    ): Promise<void> => {
        setUpdateBlogLoading(true);
        setUpdateBlogErrMessage('');
        try {
            const response = await fetch(
                `${BaseUrl}/blogs/${blogRequest.blogId}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(blogRequest)
                }
            );

            if (!response.ok) {
                throw new Error('Failed to update blog');
            }

            return response.json();
        } catch (error: any) {
            setUpdateBlogErrMessage(error.message || 'Failed to update blog');
            console.error('Error updating blog:', error);
        } finally {
            setUpdateBlogLoading(false);
        }
    };

    return { UpdateBlogLoading, UpdateBlogErrMessage, updateBlog };
};

export default useUpdateBlog;
