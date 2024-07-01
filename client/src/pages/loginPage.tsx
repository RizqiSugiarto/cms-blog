import React, { useState } from 'react';
import EmailInput from '@/components/auth/emailInput';
import PasswordInput from '@/components/auth/passwordInput';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    return (
        <div className="flex justify-center items-center w-screen h-screen">
            <div className="w-[323px] h-[700px]">
                <h1 className="font-Poppins font-bold text-[40px] text-purpleCustom">
                    Sign In
                </h1>
                <div className="mt-[90px]">
                    <form action="">
                        <EmailInput
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <PasswordInput
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button className="block bg-purpleCustom w-[289px] h-[54px] mt-[94px] ml-auto mr-auto rounded-[10px] text-[16px] font-semibold text-white">
                            Sign In
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
    );
};

export default LoginPage;
