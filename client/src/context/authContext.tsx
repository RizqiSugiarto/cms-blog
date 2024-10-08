import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect
} from 'react';
import { jwtDecode } from 'jwt-decode';

export type AuthUser = {
    userId: string;
};

type AuthContextType = {
    authUser: AuthUser | null;
    setAuthUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);

export const useAuthContext = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error(
            'useAuthContext must be used within an AuthContextProvider'
        );
    }
    return context;
};

type AuthContextProviderProps = {
    children: ReactNode;
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const [authUser, setAuthUser] = useState<AuthUser | null>(null);

    useEffect(() => {
        if(!authUser?.userId) {
            const token = localStorage.getItem('access-token');
        if (token) {
            const decodedToken: AuthUser = jwtDecode(token);
            setAuthUser(decodedToken);
        }
        }
    }, []);

    const contextValue: AuthContextType = {
        authUser,
        setAuthUser 
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};
