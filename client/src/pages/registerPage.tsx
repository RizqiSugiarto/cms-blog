import React, { ChangeEvent, FormEvent, useState } from 'react';
import useRegister from '@/hooks/auth/useRegister';
import { RegisterRequest } from '@/types';
import InputFrom from '@/components/auth/inputForm';
import ShowPasswordIcon from '@/assets/icon/display.png';
import HidePasswordIcon from '@/assets/icon/hide.png';

const RegisterPage: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const [nameError, setNameError] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const [confirmPasswordError, setConfirmPasswordError] =
        useState<string>('');

    const { loading, errMessage, register } = useRegister();

    //validate
    const validateName = (name: string) => {
        return name.length >= 3 && name.length <= 10;
    };

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password: string) => {
        if (password.length < 8) {
            return false;
        }

        if (!/[A-Z]/.test(password)) {
            return false;
        }

        if (!/[a-z]/.test(password)) {
            return false;
        }

        if (!/\d/.test(password)) {
            return false;
        }

        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            return false;
        }

        if (/\s/.test(password)) {
            return false;
        }

        return true;
    };

    //handle
    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setName(newValue);

        if (newValue.trim() === '') {
            setNameError('Name is required');
        } else if (!validateName(newValue)) {
            setNameError('Name must be between 3 and 10 characters');
        } else {
            setNameError('');
        }
    };

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setEmail(newValue);

        if (!validateEmail(newValue)) {
            setEmailError('Invalid email format');
        } else {
            setEmailError('');
        }
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setPassword(newValue);

        if (!validatePassword(newValue)) {
            setPasswordError(
                'Password must be at least 8 characters and include uppercase, lowercase, number, and special character'
            );
        } else {
            setPasswordError('');
        }
    };

    const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setConfirmPassword(newValue);

        if (password !== newValue) {
            setConfirmPasswordError('Passwords do not match');
        } else {
            setConfirmPasswordError('');
        }
    };

    const togglePasswordVisibilityChange = () => {
        setShowPassword(!showPassword);
    };

    //interact with API
    const req: RegisterRequest = {
        email: email,
        password: password,
        name: name,
        role: 'admin'
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match');
            return;
        }

        if (
            !nameError &&
            !emailError &&
            !passwordError &&
            !confirmPasswordError
        ) {
            await register(req);
        }
    };

    return (
        <div className="flex justify-center items-center w-screen h-screen">
            <div className="w-[323px] h-[700px] md:w-[643px] md:min-h-[732px] md:border-2 md:rounded-[15px] md:shadow-2xl">
                <div className="md:flex md:justify-center md:items-center">
                    <div className="md:flex-col md:mt-[40px]">
                        <h1 className="font-Poppins font-bold text-[40px] text-purpleCustom">
                            Sign Up
                        </h1>
                        <div className="mt-[50px] md:mt-[45px]">
                            {errMessage && (
                                <div className="text-red-500">{errMessage}</div>
                            )}
                            <form onSubmit={handleSubmit}>
                                <InputFrom
                                    placeholder="Name"
                                    value={name}
                                    typeInput="text"
                                    onChange={handleNameChange}
                                    error={nameError}
                                />
                                <InputFrom
                                    placeholder="Email address"
                                    value={email}
                                    typeInput="email"
                                    onChange={handleEmailChange}
                                    error={emailError}
                                />
                                <InputFrom
                                    placeholder="Password"
                                    value={password}
                                    icon={
                                        showPassword
                                            ? ShowPasswordIcon
                                            : HidePasswordIcon
                                    }
                                    typeInput={
                                        showPassword ? 'text' : 'password'
                                    }
                                    togglePasswordVisibility={
                                        togglePasswordVisibilityChange
                                    }
                                    onChange={handlePasswordChange}
                                    error={passwordError}
                                />
                                <InputFrom
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    icon={
                                        showPassword
                                            ? ShowPasswordIcon
                                            : HidePasswordIcon
                                    }
                                    typeInput={
                                        showPassword ? 'text' : 'password'
                                    }
                                    onChange={handleConfirmPasswordChange}
                                    togglePasswordVisibility={
                                        togglePasswordVisibilityChange
                                    }
                                    error={confirmPasswordError}
                                />
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="block bg-purpleCustom w-[289px] md:w-[353px] h-[54px] mt-[94px] md:mt-[50px] ml-auto mr-auto rounded-[10px] text-[16px] font-semibold text-white"
                                >
                                    {loading ? 'Loading' : 'Create Account'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
