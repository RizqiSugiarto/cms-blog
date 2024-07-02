import React, { useState } from 'react';
import ShowPasswordIcon from '@/assets/icon/display.png';
import HidePasswordIcon from '@/assets/icon/hide.png';

interface PasswordInputProps {
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
    placeholder,
    value,
    onChange
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        onChange(e);
        if (newValue.length < 5) {
            setError(``);
        } else {
            setError('');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="relative mb-[46px]">
            {error && <p className="text-red-500">{error}</p>}
            <input
                type={showPassword ? 'text' : 'password'}
                placeholder={placeholder}
                className="w-[323px] h-[60px] md:w-[353px] border-solid border-[2px] border-l-grayCustom rounded-[10px] p-[16px] pr-[46px]"
                value={value}
                onChange={handleChange}
            />
            <img
                src={showPassword ? HidePasswordIcon : ShowPasswordIcon}
                alt="Toggle Password Visibility"
                className="absolute right-[16px] top-[50%] transform -translate-y-1/2 cursor-pointer"
                onClick={togglePasswordVisibility}
            />
        </div>
    );
};

export default PasswordInput;
