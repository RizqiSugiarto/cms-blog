import { useState } from 'react';

const BaseUrl = import.meta.env.VITE_BASE_URL;

interface UseCreateViewProps {
    loading: boolean;
    errMessage: string;
    createView: (blogId: string) => Promise<void>;
}

const useCreateView = (): UseCreateViewProps => {
    const [loading, setLoading] = useState(false);
    const [errMessage, setErrMessage] = useState<string>('');

    const createView = async (blogId: string): Promise<void> => {
        setLoading(true);
        setErrMessage('');

        try {
            const response = await fetch(`${BaseUrl}/view/${blogId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to create view');
            }

        } catch (error: any) {
            setErrMessage(error.message || 'Failed to create view');
            console.error('Error creating view:', error);
        } finally {
            setLoading(false);
        }
    };

    return { loading, errMessage, createView };
};

export default useCreateView;
