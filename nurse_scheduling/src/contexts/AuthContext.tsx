import {createContext} from "react";

interface NurseShift {
    start: Date;
    end: Date;
}

type AuthContextType = {
    isAuth: boolean;
    setIsAuth: (isAuth: boolean) => void;
    nurse :{
        firstName: string;
        lastName: string;
        pictureUrl: string;
        department: string;
        birthDate: string;
        shifts: NurseShift[];
    }
    selectedDate: string;
    setSelectedDate: (date: string) => void;
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
        birthDate: "01.01.1990",
        shifts: [{
            start: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 16, 0),
            end: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1, 8, 0)
        }
        ]
    },
    selectedDate: new Date().toLocaleDateString('tr-TR'),
    setSelectedDate: () => {
    },
});
