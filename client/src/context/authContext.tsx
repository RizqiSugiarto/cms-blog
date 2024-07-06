import {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
} from 'react';
import Cookies from 'js-cookie';

export type AuthUser = {
    token: string | undefined;
};

type AuthContextType = {
    authUser: AuthUser | null;
    setAuthUser: (user: AuthUser | null) => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined,
);

export const useAuthContext = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error(
            'useAuthContext must be used within an AuthContextProvider',
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
        const token = Cookies.get('jwt');
        if (token) setAuthUser({ token });
    }, []);

    const handleSetAuthUser = (user: AuthUser | null) => {
        setAuthUser(user);
    };

    const contextValue: AuthContextType = {
        authUser,
        setAuthUser: handleSetAuthUser,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};
