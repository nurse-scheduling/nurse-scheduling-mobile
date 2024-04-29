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

    useEffect(() => {
        const fetchCredentials = async () => {
            try {
                const credentials = await AsyncStorage.getItem("basicAuth");
                if (credentials) {
                    setCredentials(credentials);
                }
            } catch (error) {
                console.error("Error fetching credentials:", error);
            }
        };

        fetchCredentials();
    },[]);

    useEffect(() => {
        const fetchNurse = async () => {
            try {
                const nurse = await AsyncStorage.getItem("nurse");
                if (nurse) {
                    setNurse(JSON.parse(nurse));
                }
            } catch (error) {
                console.error("Error fetching nurse:", error);
            }
        };

        fetchNurse();
    },[]);

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
