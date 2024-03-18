import React, {useState} from "react";
import {AuthContext} from "../contexts/AuthContext";

export const AuthProvider = ({children}) => {
    const [isAuth, setIsAuth] = useState(false);
    const userFirstName = "John";
    const userLastName = "Doe";
    const pictureUrl = "https://cdn-icons-png.flaticon.com/512/8496/8496122.png";
    return (
        <AuthContext.Provider value={{isAuth, setIsAuth, userFirstName, userLastName, pictureUrl}}>
            {children}
        </AuthContext.Provider>
    );
}
