import { useState } from 'react';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';
import { LoginRequest } from '@/types';

const BaseUrl = import.meta.env.VITE_BASE_URL;

interface UseLoginProps {
    loading: boolean;
    errMessage: string;
    isSuccess: boolean;
    login: (loginData: LoginRequest) => Promise<void>;
}

const useLogin = (): UseLoginProps => {
    const [loading, setLoading] = useState(false);
    const [errMessage, setErrMessage] = useState<string>('');
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    const login = async (loginData: LoginRequest): Promise<void> => {
        setLoading(true);
        setErrMessage('');

        try {
            const response = await fetch(`${BaseUrl}/auth/login`, {
                credentials: 'include',
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

            // Retrieve the JWT token from cookies
            const tokenVal = Cookies.get('jwt');

            if (!tokenVal) {
                throw new Error('No token found. Login might have failed.');
            }

            try {
                // Decode the JWT token
                const userData = jwtDecode(tokenVal);
                // Save user data in local storage
                localStorage.setItem('user-data', JSON.stringify(userData));
            } catch (decodeError) {
                console.error('Error decoding JWT:', decodeError);
                throw new Error('Invalid token format. Please log in again.');
            }

            setIsSuccess(true);
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

    return { loading, errMessage, isSuccess, login };
};

export default useLogin;
