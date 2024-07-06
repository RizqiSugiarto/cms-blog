import { useState } from 'react';
import {UpdateBlogRequest} from '@/types'

const BaseUrl = import.meta.env.VITE_BASE_URL;

interface UseUpdateBlogProps {
    loading: boolean;
    errMessage: string;
    updateBlog: (blogId: string, blogRequest: UpdateBlogRequest) => Promise<any>;
}


const useUpdateBlog = (): UseUpdateBlogProps => {
    const [loading, setLoading] = useState(false);
    const [errMessage, setErrMessage] = useState<string>('');

    const updateBlog = async (blogId: string, blogRequest: UpdateBlogRequest): Promise<any> => {
        setLoading(true);
        setErrMessage('');

        try {
            const response = await fetch(`${BaseUrl}/blogs/${blogId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(blogRequest),
            });

            if (!response.ok) {
                throw new Error('Failed to update blog');
            }

            return response.json();
        } catch (error: any) {
            setErrMessage(error.message || 'Failed to update blog');
            console.error('Error updating blog:', error);
        } finally {
            setLoading(false);
        }
    };

    return { loading, errMessage, updateBlog };
};

export default useUpdateBlog;
