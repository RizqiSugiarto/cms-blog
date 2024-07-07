import { useState } from 'react';
import { CreateblogRequest } from '@/types';

const BaseUrl = import.meta.env.VITE_BASE_URL;

interface UseCreateBlogProps {
    loading: boolean;
    errMessage: string;
    createBlog: (blogRequest: CreateblogRequest, file: File) => Promise<any>;
}

const useCreateBlog = (): UseCreateBlogProps => {
    const [loading, setLoading] = useState(false);
    const [errMessage, setErrMessage] = useState<string>('');

    const createBlog = async (blogRequest: CreateblogRequest, file: File): Promise<any> => {
        setLoading(true);
        setErrMessage('');

        try {
            const formData = new FormData();
            formData.append('title', blogRequest.title);
            formData.append('content', blogRequest.content);
            formData.append('isDraft', blogRequest.isDraft.toString());
            formData.append('tag', JSON.stringify(blogRequest.tag));
            formData.append('imageUpload', file);

            const response = await fetch(`${BaseUrl}/blogs`, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('create blog failed');
            }

            return response.json();
        } catch (error: any) {
            setErrMessage(error.message || 'create blog failed');
            console.error('create blog failed', error);
        } finally {
            setLoading(false);
        }
    };

    return { loading, errMessage, createBlog };
};

export default useCreateBlog;
