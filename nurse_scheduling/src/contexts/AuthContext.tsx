import {createContext} from "react";

type AuthContextType = {
    isAuth: boolean;
    setIsAuth: (isAuth: boolean) => void;
    userFirstName: string;
    userLastName: string;
    pictureUrl: string;
}

export const AuthContext = createContext<AuthContextType>({
    isAuth: false,
    setIsAuth: () => {
    },
    userFirstName: "none",
    userLastName: "none",
    pictureUrl: ""
});
