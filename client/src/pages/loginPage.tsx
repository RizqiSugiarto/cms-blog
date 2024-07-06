import React, { useState } from 'react';
import InputFrom from '@/components/auth/inputForm';
import useLogin from '@/hooks/auth/useLogin';
import { LoginRequest } from '@/types';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const {errMessage, loading, login} = useLogin()

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const loginData: LoginRequest = {
            email,
            password
        }

        await login(loginData)
    }


    return (
        <div className="flex justify-center items-center w-screen h-screen">
            <div className="w-[323px] h-[700px] md:w-[643px] md:h-[732px] md:border-2 rounded-[15px] md:shadow-2xl">
                <div className="md:flex md:justify-center md:items-center">
                    <div className="md:flex-col md:mt-[90px]">
                        <h1 className="font-Poppins font-bold text-[40px] text-purpleCustom">
                            Sign In
                        </h1>
                        {errMessage && (
                                <div className='text-red-500'>
                                    {errMessage}
                                </div>
                            )}
                        <div className="mt-[90px] md:mt-[45px]">
                            <form onSubmit={handleSubmit}>
                            <InputFrom
                                    placeholder="Password"
                                    value={password}
                                    typeInput='password'
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <InputFrom
                                    placeholder="Email address"
                                    value={email}
                                    typeInput='email'
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <button className="block bg-purpleCustom w-[289px] md:w-[353px] h-[54px] mt-[94px] ml-auto mr-auto rounded-[10px] text-[16px] font-semibold text-white">
                                    {loading? 'Loading' : 'Login'}
                                </button>
                            </form>
                            <p className="text-[14px] text-center mt-[83px] pl-[30px] pr-[30px]">
                                Don't have account?{' '}
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
