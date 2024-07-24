import { useState } from 'react';
import toast from 'react-hot-toast';
import { LoginRequest } from '@/types';

const BaseUrl = import.meta.env.VITE_BASE_URL;

interface UseLoginProps {
    loading: boolean;
    errMessage: string;
    loginUser: any
    login: (loginData: LoginRequest) => Promise<void>;
}

const useLogin = (): UseLoginProps => {
    const [loading, setLoading] = useState(false);
    const [errMessage, setErrMessage] = useState<string>('');
    const [loginUser, setloginUser] = useState<any>(undefined);

    const login = async (loginData: LoginRequest): Promise<void> => {
        setLoading(true);
        setErrMessage('');

        try {
            const response = await fetch(`${BaseUrl}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-web-app': 'cms'
                },
                body: JSON.stringify(loginData)
            });

            const responseBody = await response.json();

            if (!response.ok) {
                throw new Error(responseBody.error || 'Failed to login');
            }
            
            localStorage.setItem('access-token', responseBody.data.token)

            setloginUser(responseBody);
        } catch (error: any) {
            console.error('Error during login:', error);
            setErrMessage(
                error.message || 'Failed to login. Please try again.'
            );
            toast.error(error.message || 'Failed to login. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return { loading, errMessage, loginUser, login };
};

export default useLogin;
