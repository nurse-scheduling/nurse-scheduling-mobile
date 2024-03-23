import React from "react";
import Header from "../components/Header.tsx";
import {Box} from "native-base";
import CreateShiftRequestContent from "../components/CreateShiftRequestContent.tsx";


function CreateShiftRequest(): React.JSX.Element {

    return (
        <Box flex={1} justifyContent={"flex-start"} alignItems={"center"} backgroundColor={'white'}>
            <Header></Header>
            <CreateShiftRequestContent/>
        </Box>
    );
}

export default CreateShiftRequest;
