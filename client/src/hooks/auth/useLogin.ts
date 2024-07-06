import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext, AuthUser } from '@/context/authContext';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { LoginRequest } from '@/types';

const BaseUrl = import.meta.env.VITE_BASE_URL;

interface UseLoginProps {
    loading: boolean;
    errMessage: string;
    login: (loginData: LoginRequest) => Promise<void>;
}

const useLogin = (): UseLoginProps => {
    const [loading, setLoading] = useState(false);
    const [errMessage, setErrMessage] = useState<string>('');
    const { setAuthUser } = useAuthContext();

    const login = async (loginData: LoginRequest): Promise<void> => {
        setLoading(true);
        setErrMessage('');

        try {
            const response = await fetch(`${BaseUrl}/auth/login`, {
                credentials: 'include',
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData)
            });

            const responseBody = await response.json();

            if (!response.ok) {
                throw new Error(responseBody.error || 'Failed to login');
            }

            const tokenVal = Cookies.get('jwt');
            const Token: AuthUser = {
                token: tokenVal
            };
            const userData = jwtDecode(tokenVal!);

            localStorage.setItem('user-data', JSON.stringify(userData));

            setAuthUser(Token);
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

    return { loading, errMessage, login };
};

export default useLogin;
