import React, {useState} from "react";
import {AuthContext} from "../contexts/AuthContext";

export const AuthProvider = ({children}) => {
    const [isAuth, setIsAuth] = useState(false);
    const nurse = {
         firstName : "Test",
         lastName : "Nurse",
         pictureUrl : "https://cdn-icons-png.flaticon.com/512/8496/8496122.png",
         department : "Dahiliye",
         birthDate  : "01.01.1990",
         shifts: [{
             start: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 16, 0),
             end: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1, 8, 0)
         }
         ],

    }
    const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString('tr-TR'));
    return (
        <AuthContext.Provider value={{isAuth, setIsAuth, nurse, selectedDate, setSelectedDate}}>
            {children}
        </AuthContext.Provider>
    );
}
