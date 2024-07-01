import React, { useState } from 'react';

interface EmailInputProps {
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EmailInput: React.FC<EmailInputProps> = ({
    placeholder,
    value,
    onChange
}) => {
    const [error, setError] = useState<string>('');

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        onChange(e);
        if (!validateEmail(newValue)) {
            setError('Invalid email format');
        } else {
            setError('');
        }
    };

    return (
        <div className="mb-[46px]">
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <input
                type="email"
                placeholder={placeholder}
                className={`w-[323px] h-[60px] border-solid border-[2px] ${
                    error ? 'border-red-500' : 'border-grayCustom'
                } rounded-[10px] p-[16px] focus:border-purpleCustom`}
                value={value}
                onChange={handleChange}
            />
        </div>
    );
};

export default EmailInput;
