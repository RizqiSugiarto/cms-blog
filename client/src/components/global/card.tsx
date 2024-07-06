import React from 'react';

type CardType = {
    title?: string;
    className?: string;
    children: React.ReactNode;
};

const Card: React.FC<CardType> = ({ title, className, children }) => {
    return (
        <div className={`card bg-base-100 w-full ${className}`}>
            <div className="card-body p-4">
                <h2 className="card-title">{title}</h2>
                {children}
            </div>
        </div>
    );
};

export default Card;
