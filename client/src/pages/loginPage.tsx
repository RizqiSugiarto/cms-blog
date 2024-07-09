import React, { useState, useEffect } from 'react';
import InputFrom from '@/components/auth/inputForm';
import useLogin from '@/hooks/auth/useLogin';
import { LoginRequest } from '@/types';
import ShowPasswordIcon from '@/assets/icon/display.png';
import HidePasswordIcon from '@/assets/icon/hide.png';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useAuthContext } from '@/context/authContext';
import { jwtDecode } from 'jwt-decode';
import { AuthUser } from '@/context/authContext';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const { errMessage, loading, isSuccess, login } = useLogin();
    const navigate = useNavigate();
    const { setAuthUser } = useAuthContext();

    const handletogglePasswordVisibilityChange = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const loginData: LoginRequest = {
            email,
            password
        };

        await login(loginData);
    };

    useEffect(() => {
        if (isSuccess) {
            const token = Cookies.get('jwt');
            if (token) {
                const decodedToken: AuthUser = jwtDecode(token);
                setAuthUser(decodedToken);
            }
            navigate('/dashboard');
        }
    }, [isSuccess, navigate, setAuthUser]);

    return (
        <div className="flex justify-center items-center w-screen h-screen">
            <div className="w-[323px] h-[700px] md:w-[643px] md:h-[732px] md:border-2 rounded-[15px] md:shadow-2xl">
                <div className="md:flex md:justify-center md:items-center">
                    <div className="md:flex-col md:mt-[90px]">
                        <h1 className="font-Poppins font-bold text-[40px] text-purpleCustom">
                            Sign In
                        </h1>
                        <div className='md:relative md:top-8 relative top-20'>
                            {errMessage && (
                                <div className="text-red-500">{errMessage}</div>
                            )}
                        </div>
                        <div className="mt-[90px] md:mt-[45px]">
                            <form onSubmit={handleSubmit}>
                                <InputFrom
                                    placeholder="Email address"
                                    value={email}
                                    typeInput="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <InputFrom
                                    placeholder="Password"
                                    value={password}
                                    typeInput={showPassword ? 'text' : 'password'}
                                    icon={showPassword ? ShowPasswordIcon : HidePasswordIcon}
                                    onChange={(e) => setPassword(e.target.value)}
                                    togglePasswordVisibility={handletogglePasswordVisibilityChange}
                                />
                                <button className="block bg-purpleCustom w-[289px] md:w-[353px] h-[54px] mt-[94px] ml-auto mr-auto rounded-[10px] text-[16px] font-semibold text-white">
                                    {loading ? 'Loading' : 'Login'}
                                </button>
                            </form>
                            <p className="text-[14px] text-center mt-[83px] pl-[30px] pr-[30px]">
                                Don't have an account?{' '}
                                <a
                                    href="/register"
                                    className="text-purpleCustom font-semibold"
                                >
                                    Sign up
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
