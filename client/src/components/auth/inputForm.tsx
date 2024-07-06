import React from "react";

type InputFormProps = {
    placeholder: string;
    value: string;
    typeInput: string;
    error?: string
    icon?: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    togglePasswordVisibility?: () => void;
}

const InputFrom: React.FC<InputFormProps> = ({placeholder, value, typeInput, onChange, error, icon, togglePasswordVisibility}) => {
    return (
        <div>
            <div className="max-w-80">
            {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>
            <div className="mb-5 relative bg-gray-500">
            <input
                type={typeInput}
                placeholder={placeholder}
                className={`w-[323px] h-[60px] md:w-[353px] border-solid border-[2px] ${
                    error ? 'border-red-500 focus:border-red-500' : 'border-grayCustom focus:border-purpleCustom'
                } rounded-[10px] p-[16px] outline-none`}
                value={value}
                onChange={onChange}
            />
            {icon && (
                <img
                src={icon}
                alt="Toggle Password Visibility"
                className="absolute right-[16px] top-[50%] transform -translate-y-1/2 cursor-pointer"
                onClick={togglePasswordVisibility}
            />
            )}
        </div>
        </div>
    )
}

export default InputFrom