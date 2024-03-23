import React from "react";
import Header from "../components/Header.tsx";
import {Box, Stack, Text} from "native-base";
import CreateShiftRequestSelects from "../components/CreateShiftRequestSelects.tsx";


function CreateShiftRequest(): React.JSX.Element {

    return (
        <Box flex={1} justifyContent={"flex-start"} alignItems={"center"} backgroundColor={'white'}>
            <Header></Header>
            <Stack space={5} alignItems={"center"} paddingTop={32}>
                <Text fontSize={'xl'}>
                    Vardiya Değişim Talebi Oluştur
                </Text>
                <CreateShiftRequestSelects/>
            </Stack>
        </Box>
    );
}

export default CreateShiftRequest;
