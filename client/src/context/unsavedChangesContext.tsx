import React, { createContext, useContext, useState, ReactNode } from 'react';

type UnsavedChangesContextType = {
    isSaved: boolean;
    setIsSaved: React.Dispatch<React.SetStateAction<boolean>>;
};

const UnsavedChangesContext = createContext<
    UnsavedChangesContextType | undefined
>(undefined);

export const useUnsavedChangesContext = (): UnsavedChangesContextType => {
    const context = useContext(UnsavedChangesContext);
    if (!context) {
        throw new Error(
            'useUnsavedChangesContext must be used within an UnsavedChangesProvider'
        );
    }
    return context;
};

type UnsavedChangesContextProviderProps = {
    children: ReactNode;
};

export const UnsavedChangesProvider = ({
    children
}: UnsavedChangesContextProviderProps) => {
    const [isSaved, setIsSaved] = useState<boolean>(false);

    const contextValue: UnsavedChangesContextType = {
        isSaved,
        setIsSaved
    };

    return (
        <UnsavedChangesContext.Provider value={contextValue}>
            {children}
        </UnsavedChangesContext.Provider>
    );
};
