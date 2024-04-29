import React, {useEffect, useState} from "react";
import {AuthContext} from "../contexts/AuthContext";
import AsyncStorage from "@react-native-community/async-storage";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuth, setIsAuth] = useState(false);
    useEffect(() => {
        const fetchAuthStatus = async () => {
            try {
                const authStatus = await AsyncStorage.getItem("authenticated");
                if (authStatus === "true") {
                    setIsAuth(true);
                }
            } catch (error) {
                console.error("Error fetching auth status:", error);
            }
        };

        fetchAuthStatus();
    }, []);

    const nurse = {
        firstName: "Test",
        lastName: "Nurse",
        pictureUrl: "https://cdn-icons-png.flaticon.com/512/8496/8496122.png",
        department: "Dahiliye",
        birthDate: "01.01.1990",
        shifts: [{
            start: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 16, 0),
            end: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1, 8, 0)
        }
        ],

    }
    const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString('tr-TR'));

    return (
        <AuthContext.Provider value={{isAuth,
            setIsAuth,
            nurse,
            selectedDate,
            setSelectedDate}}>
            {children}
        </AuthContext.Provider>
    );
}
