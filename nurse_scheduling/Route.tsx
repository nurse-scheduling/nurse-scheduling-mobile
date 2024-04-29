import {SafeAreaView} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import Main from "./Main.tsx";
import React from "react";
import {NativeBaseProvider} from "native-base";
import {AuthProvider} from "./src/providers/AuthProvider.tsx";


function Route(): React.JSX.Element {
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: "white",
                paddingTop: 0,
            }}
        >
            <NativeBaseProvider>
                <NavigationContainer>
                    <AuthProvider>
                        <Main/>
                    </AuthProvider>
                </NavigationContainer>
            </NativeBaseProvider>

        </SafeAreaView>
    );
}

export default Route;
