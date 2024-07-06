import { useState } from 'react';

const BaseUrl = import.meta.env.VITE_BASE_URL;

interface UseTotalLikePerMonthProps {
    loading: boolean;
    errMessage: string;
    totalLikes: any; 
    getTotalLikePerMonthByUserId: (userId: string) => Promise<void>;
}

const useTotalLikePerMonth = (): UseTotalLikePerMonthProps => {
    const [loading, setLoading] = useState(false);
    const [errMessage, setErrMessage] = useState<string>('');
    const [totalLikes, setTotalLikes] = useState<any>(null); 

    const getTotalLikePerMonthByUserId = async (userId: string): Promise<void> => {
        setLoading(true);
        setErrMessage('');

        try {
            const response = await fetch(`${BaseUrl}/like/${userId}`);

            if (!response.ok) {
                throw new Error('Failed to fetch total likes per month');
            }

            const data = await response.json();
            setTotalLikes(data);
        } catch (error: any) {
            setErrMessage(error.message || 'Failed to fetch total likes per month');
            console.error('Error fetching total likes per month:', error);
        } finally {
            setLoading(false);
        }
    };

    return { loading, errMessage, totalLikes, getTotalLikePerMonthByUserId };
};

export default useTotalLikePerMonth;
