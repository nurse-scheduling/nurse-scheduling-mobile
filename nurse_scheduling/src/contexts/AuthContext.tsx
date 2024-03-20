import {createContext} from "react";

type AuthContextType = {
    isAuth: boolean;
    setIsAuth: (isAuth: boolean) => void;
    nurse :{
        firstName: string;
        lastName: string;
        pictureUrl: string;
        department: string;
        birthDate: string;
    }
}

export const AuthContext = createContext<AuthContextType>({
    isAuth: false,
    setIsAuth: () => {
    },
    nurse:{
        firstName: "Test",
        lastName: "Nurse",
        pictureUrl: "https://cdn-icons-png.flaticon.com/512/8496/8496122.png",
        department: "Dahiliye",
        birthDate: "01.01.1990"
    }
});
