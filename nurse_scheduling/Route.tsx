import {SafeAreaView} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import Main from "./Main.tsx";
import React from "react";
import {NativeBaseProvider} from "native-base";


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
                    <Main/>
                </NavigationContainer>
            </NativeBaseProvider>

        </SafeAreaView>
    );
}

export default Route;
