import {createContext} from "react";

type AuthContextType = {
    isAuth: boolean;
    setIsAuth: (isAuth: boolean) => void;
}

export const AuthContext = createContext<AuthContextType>({
    isAuth: false,
    setIsAuth: () => {
    }
});
