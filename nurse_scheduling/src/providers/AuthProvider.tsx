import React, {useEffect, useState} from "react";
import {AuthContext} from "../contexts/AuthContext";
import AsyncStorage from "@react-native-community/async-storage";
import {NurseType} from "../types/NurseType.tsx";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuth, setIsAuth] = useState(false);
    const [credentials, setCredentials] = useState("");
    const [nurse, setNurse] = useState({} as NurseType);
    useEffect(() => {
        const fetchAuthStatus = async () => {
            try {
                const [authStatus, loginStatus, nurse, credentials] = await Promise.all([
                    AsyncStorage.getItem("authenticated"),
                    AsyncStorage.getItem("login-time"),
                    AsyncStorage.getItem("nurse"),
                    AsyncStorage.getItem("basicAuth")
                ]);

                if (loginStatus) {
                    const currentTime = new Date().getTime();
                    const storedTime = parseInt(loginStatus, 10);
                    const differenceInMinutes = Math.floor((currentTime - storedTime) / (1000 * 60));
                    if (differenceInMinutes >= 30) {
                        await AsyncStorage.clear();
                        setIsAuth(false);
                        setNurse({} as NurseType);
                        setCredentials("");
                        return;
                    }
                }

                setIsAuth(authStatus === "true");
                if(isAuth && nurse && credentials){
                        const nurseJson = JSON.parse(nurse) as NurseType;
                        const pictureUrl = nurseJson.gender === "Kadın" ? "https://st3.depositphotos.com/1005049/37682/v/1600/depositphotos_376829398-stock-illustration-woman-doctor-icon-female-physician.jpg" :
                            "https://st4.depositphotos.com/1005049/37803/v/1600/depositphotos_378039344-stock-illustration-doctor-icon-male-doctor-white.jpg"
                        const updatedNurse = { ...nurseJson, pictureUrl: pictureUrl };
                        console.log("updatedNurse", updatedNurse)
                        setNurse(updatedNurse);
                        setCredentials(credentials);
                }
            } catch (error) {
                console.error("Error fetching auth status:", error);
            }
        };

        fetchAuthStatus();
    }, [isAuth]);

    const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString('tr-TR'));

    return (
        <AuthContext.Provider value={{isAuth,
            setIsAuth,
            nurse,
            selectedDate,
            setSelectedDate,credentials}}>
            {children}
        </AuthContext.Provider>
    );
}
