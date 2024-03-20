import React, {useState} from "react";
import {AuthContext} from "../contexts/AuthContext";

export const AuthProvider = ({children}) => {
    const [isAuth, setIsAuth] = useState(false);
    const nurse = {
         firstName : "Test",
         lastName : "Nurse",
         pictureUrl : "https://cdn-icons-png.flaticon.com/512/8496/8496122.png",
         department : "Dahiliye",
         birthDate  : "01.01.1990"
    }
    return (
        <AuthContext.Provider value={{isAuth, setIsAuth, nurse}}>
            {children}
        </AuthContext.Provider>
    );
}
