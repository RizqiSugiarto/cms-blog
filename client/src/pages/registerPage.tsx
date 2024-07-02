import React, { useState } from 'react';
import PasswordInput from '@/components/auth/passwordInput';
import EmailInput from '@/components/auth/emailInput';

const RegisterPage: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    return (
        <div className="flex justify-center items-center w-screen h-screen">
            <div className="w-[323px] h-[700px] md:w-[643px] md:h-[732px] md:border-2 md:rounded-[15px] md:shadow-2xl">
                <div className="md:flex md:justify-center md:items-center">
                    <div className="md:flex-col md:mt-[90px]">
                        <h1 className="font-Poppins font-bold text-[40px] text-purpleCustom">
                            Sign Up
                        </h1>
                        <div className="mt-[90px] md:mt-[45px]">
                            <form action="">
                                <EmailInput
                                    placeholder="Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <PasswordInput
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                                <PasswordInput
                                    placeholder="Password"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                />
                                <button className="block bg-purpleCustom w-[289px] md:w-[353px] h-[54px] mt-[94px] md:mt-[50px] ml-auto mr-auto rounded-[10px] text-[16px] font-semibold text-white">
                                    Create Account
                                </button>
                            </form>
                            <p className="text-center mt-10 text-[12px]">
                                By creating an account or signing
                                <br />
                                you agree to our
                                <br />
                                <b>Terms and Conditions</b>
                            </p>
                            <div className=""></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
