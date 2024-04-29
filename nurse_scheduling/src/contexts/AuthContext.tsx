import React, {createContext} from "react";
import moment from "moment";
import {NurseType} from "../types/NurseType.tsx";

type AuthContextType = {
    isAuth: boolean;
    setIsAuth: (isAuth: boolean) => void;
    nurse :NurseType;
    selectedDate: string;
    setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
    credentials: string;
}

export const AuthContext = createContext<AuthContextType>({
    isAuth: false,
    setIsAuth: () => {
    },
    nurse:{id:"0", firstName:"", lastName:"", departmentName:"", phoneNumber:"", birthDate:"", profilePicture:"",role:"",tcKimlikNo:"",errorMessage:""},
    selectedDate:moment().format("DD.MM.YYYY"),
    setSelectedDate: () => {
    },
    credentials: ""
});
