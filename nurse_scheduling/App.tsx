import React from 'react';
import Route from "./Route.tsx";
import {LogBox} from "react-native";


function App(): React.JSX.Element {
    LogBox.ignoreLogs(['In React 18,']);
    return (
        <Route/>
    );
}

export default App;
