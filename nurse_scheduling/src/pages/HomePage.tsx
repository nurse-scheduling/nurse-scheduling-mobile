import React from 'react';
import Header from "../components/Header.tsx";
import {Box,  Text} from "native-base";
import HomePageDateCard from "../components/HomePageDateCard.tsx";
import ShiftCard from "../components/ShiftCard.tsx";
import NurseCard from "../components/NurseCard.tsx";


function HomePage(): React.JSX.Element {

    return (
        <Box flex={1} backgroundColor={'white'}>
            <Header></Header>
            <Box mt="24">

                <Box>
                    <HomePageDateCard/>
                </Box>,
                <Box m="2" mt="4">
                    <Text bold>Vardiyalarım</Text>
                    <ShiftCard/>
                </Box>,
                <Box m="2" mt="4">
                    <Text bold>Diğer Çalışanlar</Text>
                    <NurseCard/>
                </Box>

            </Box>


        </Box>
    );
}


export default HomePage;
