import { useState } from 'react';
import {CreateblogRequest} from '@/types'

const BaseUrl = import.meta.env.VITE_BASE_URL;

interface UseCreateBlogProps {
    loading: boolean;
    errMessage: string;
    createBlog: (blogRequest: CreateblogRequest) => Promise<any>;
}


const useCreateBlog = (): UseCreateBlogProps => {
    const [loading, setLoading] = useState(false);
    const [errMessage, setErrMessage] = useState<string>('');

    const createBlog = async (blogRequest: CreateblogRequest): Promise<any> => {
        setLoading(true);
        setErrMessage('');

        try {
            const response = await fetch(`${BaseUrl}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(blogRequest),
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
