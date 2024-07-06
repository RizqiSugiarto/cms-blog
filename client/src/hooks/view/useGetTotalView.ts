import { useState } from 'react';

const BaseUrl = import.meta.env.VITE_BASE_URL;

interface UseTotalViewPerMonthProps {
    loading: boolean;
    errMessage: string;
    totalViews: any;
    getTotalViewPerMonthByUserId: (userId: string) => Promise<void>;
}

const useTotalViewPerMonth = (): UseTotalViewPerMonthProps => {
    const [loading, setLoading] = useState(false);
    const [errMessage, setErrMessage] = useState<string>('');
    const [totalViews, setTotalViews] = useState<any>(null);

    const getTotalViewPerMonthByUserId = async (
        userId: string
    ): Promise<void> => {
        setLoading(true);
        setErrMessage('');

        try {
            const response = await fetch(`${BaseUrl}/view/${userId}`);

            if (!response.ok) {
                throw new Error('Failed to fetch total views per month');
            }

            const data = await response.json();
            setTotalViews(data);
        } catch (error: any) {
            setErrMessage(
                error.message || 'Failed to fetch total views per month'
            );
            console.error('Error fetching total views per month:', error);
        } finally {
            setLoading(false);
        }
    };

    return { loading, errMessage, totalViews, getTotalViewPerMonthByUserId };
};

export default useTotalViewPerMonth;
