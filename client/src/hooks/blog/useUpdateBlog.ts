import { useState } from 'react';
import { UpdateBlogRequest } from '@/types';

const BaseUrl = import.meta.env.VITE_BASE_URL;

interface UseUpdateBlogProps {
    UpdateBlogLoading: boolean;
    UpdateBlogErrMessage: string;
    updateBlog: (blogRequest: UpdateBlogRequest, file?: File) => Promise<any>;
}

const useUpdateBlog = (): UseUpdateBlogProps => {
    const [UpdateBlogLoading, setUpdateBlogLoading] = useState(false);
    const [UpdateBlogErrMessage, setUpdateBlogErrMessage] =
        useState<string>('');

    const updateBlog = async (
        blogRequest: UpdateBlogRequest,
        file?: File
    ): Promise<any> => {
        setUpdateBlogLoading(true);
        setUpdateBlogErrMessage('');
        try {
            console.log(blogRequest.title, "DAPET KOK")
            const formData = new FormData();
            formData.append('title', blogRequest.title);
            formData.append('content', blogRequest.content);
            formData.append('isDraft', blogRequest.isDraft.toString());
            formData.append('tag', JSON.stringify(blogRequest.tag));

            if (file) {
                formData.append('imageUpload', file);
            }
            console.log(formData, "DARI DEPAN")
            const response = await fetch(
                `${BaseUrl}/blogs/${blogRequest.blogId}`,
                {
                    method: 'PUT',
                    body: formData,
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
