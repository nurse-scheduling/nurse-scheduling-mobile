import React from 'react';
import Header from "../components/Header.tsx";
import {Center} from "native-base";

function HomePage(): React.JSX.Element {

    return (
        <Center flex={1}>
            <Header></Header>
        </Center>
    );
}


export default HomePage;
