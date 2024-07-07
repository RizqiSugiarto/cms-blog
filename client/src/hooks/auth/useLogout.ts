import { useState } from 'react';

const BaseUrl = import.meta.env.VITE_BASE_URL;

interface UseLogoutProps {
    loading: boolean;
    errMessage: string;
    logout: () => Promise<void>;
}

const useLogout = (): UseLogoutProps => {
    const [loading, setLoading] = useState(false);
    const [errMessage, seterrMessage] = useState<string>('');

    const logout = async (): Promise<void> => {
        setLoading(true);
        seterrMessage('');

        try {
            const response = await fetch(`${BaseUrl}/auth/logout`, {
                credentials: 'include',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('logout Failed');
            }
            return response.json();
        } catch (error: any) {
            seterrMessage(error.message);
            console.error('logout Failed');
        } finally {
            setLoading(false);
        }
    };

    return { loading, errMessage, logout };
};

export default useLogout;
