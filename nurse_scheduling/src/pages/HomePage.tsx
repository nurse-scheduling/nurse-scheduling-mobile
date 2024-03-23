import React from 'react';
import Header from "../components/Header.tsx";
import {Box} from "native-base";

function HomePage(): React.JSX.Element {

    return (
        <Box flex={1} backgroundColor={'white'}>
            <Header></Header>
        </Box>
    );
}


export default HomePage;
