import { useState } from 'react';

const BaseUrl = import.meta.env.VITE_BASE_URL;

interface UseTotalLikePerMonthProps {
    TotalLikeLoading: boolean;
    TotalLikeErrMessage: string;
    TotalLikePerMonth: any;
    getTotalLikePerMonthByUserId: (userId: string) => Promise<void>;
}

const useTotalLikePerMonth = (): UseTotalLikePerMonthProps => {
    const [TotalLikeLoading, setLikeLoading] = useState(false);
    const [TotalLikeErrMessage, setLikeErrMessage] = useState<string>('');
    const [TotalLikePerMonth, setTotalLikePerMonth] = useState<any>(null);

    const getTotalLikePerMonthByUserId = async (
        userId: string
    ): Promise<void> => {
        setLikeLoading(true);
        setLikeErrMessage('');

        try {
            const response = await fetch(`${BaseUrl}/like/${userId}`);

            if (!response.ok) {
                throw new Error('Failed to fetch total likes per month');
            }

            const data = await response.json();
            setTotalLikePerMonth(data);
        } catch (error: any) {
            setLikeErrMessage(
                error.message || 'Failed to fetch total likes per month'
            );
            console.error('Error fetching total likes per month:', error);
        } finally {
            setLikeLoading(false);
        }
    };

    return {
        TotalLikeLoading,
        TotalLikeErrMessage,
        TotalLikePerMonth,
        getTotalLikePerMonthByUserId
    };
};

export default useTotalLikePerMonth;
