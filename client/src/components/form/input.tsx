import React from 'react';
import { Dispatch, SetStateAction } from 'react';

type InputType = {
    label?: string;
    type: string;
    setData: Dispatch<SetStateAction<string>>;
    placeholder: string;
    className?: string;
    classInput?: string;
    auth?: boolean;
    required?: boolean;
    value?: any;
};

const Input: React.FC<InputType> = ({
    label,
    type,
    setData,
    placeholder,
    className,
    classInput,
    required,
    value
}) => {
    return (
        <div className={'form-control ' + className}>
            {label && (
                <label className="label">
                    <span className="label-text">{label}</span>
                </label>
            )}
            <input
                required={required}
                value={value}
                type={type || 'text'}
                placeholder={placeholder || label}
                onChange={(e) => setData(e.target.value)}
                className={`input focus:outline-purpleCustom focus:border-none border-purpleCustom ${classInput}`}
            />
        </div>
    );
};

export default Input;
