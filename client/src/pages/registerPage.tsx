import React, { useState } from 'react';
import PasswordInput from '@/components/auth/passwordInput';
import EmailInput from '@/components/auth/emailInput';

const RegisterPage: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    return (
        <div className="flex justify-center items-center w-screen h-screen">
            <div className="w-[323px] h-[700px]">
                <h1 className="font-Poppins font-bold text-[40px] text-purpleCustom">
                    Sign Up
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
                        <PasswordInput
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <button className="block bg-purpleCustom w-[289px] h-[54px] mt-[94px] ml-auto mr-auto rounded-[10px] text-[16px] font-semibold text-white">
                            Create Account
                        </button>
                    </form>
                    <p className="text-[14px] text-center mt-[83px] pl-[30px] pr-[30px]">
                        By creating an account or signing you agree to our{' '}
                        <b>Terms and Conditions</b>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
