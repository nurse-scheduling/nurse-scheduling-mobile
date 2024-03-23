import React from 'react';
import {Box} from "native-base";
import Header from "../components/Header.tsx";
import ChangeShiftRequestContent from "../components/ChangeShiftRequestContent.tsx";

function ChangeShiftRequest(): React.JSX.Element {

    return (
        <Box flex={1} justifyContent={"flex-start"} alignItems={"center"} backgroundColor={'white'}>
            <Header></Header>
            <ChangeShiftRequestContent/>
        </Box>
    );
}


export default ChangeShiftRequest;
