import {SafeAreaView} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import Main from "./Main.tsx";
import React from "react";


function Route(): React.JSX.Element {
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: "white",
                paddingTop: 0,
            }}
        >
            <NavigationContainer>
                <Main/>
            </NavigationContainer>
        </SafeAreaView>
    );
}
export default Route;
