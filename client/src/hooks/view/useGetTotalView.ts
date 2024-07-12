import { useState } from 'react';

const BaseUrl = import.meta.env.VITE_BASE_URL;

interface UseTotalViewPerMonthProps {
    TotalViewLoading: boolean;
    TotalViewErrMessage: string;
    TotalViewPerMonth: any;
    getTotalViewPerMonthByUserId: (userId: string) => Promise<void>;
}

const useTotalViewPerMonth = (): UseTotalViewPerMonthProps => {
    const [TotalViewLoading, setLoadingTotalView] = useState(false);
    const [TotalViewErrMessage, setErrMessageTotalView] = useState<string>('');
    const [TotalViewPerMonth, setTotalViewPerMonth] = useState<any>(null);

    const getTotalViewPerMonthByUserId = async (
        userId: string
    ): Promise<void> => {
        setLoadingTotalView(true);
        setErrMessageTotalView('');

        try {
            const response = await fetch(`${BaseUrl}/view/${userId}`);

            if (!response.ok) {
                throw new Error('Failed to fetch total views per month');
            }

            const data = await response.json();
            setTotalViewPerMonth(data);
        } catch (error: any) {
            setErrMessageTotalView(
                error.message || 'Failed to fetch total views per month'
            );
            console.error('Error fetching total views per month:', error);
        } finally {
            setLoadingTotalView(false);
        }
    };

    return {
        TotalViewLoading,
        TotalViewErrMessage,
        TotalViewPerMonth,
        getTotalViewPerMonthByUserId
    };
};

export default useTotalViewPerMonth;
