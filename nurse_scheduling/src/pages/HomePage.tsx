import React from 'react';
import {Box, Text, FlatList} from "native-base";
import Header from "../components/Header.tsx";
import HomePageDateCard from "../components/HomePageDateCard.tsx";
import ShiftCard from "../components/ShiftCard.tsx";
import NurseCard from "../components/NurseCard.tsx";

const HomePage = () => {
    const sections = [
        {
            key: 'header', component: <Box m="2" mt="4">
                <Header/>
            </Box>
        },
        {
            key: 'dateCard', component: <Box m="2" mt="24">
                <HomePageDateCard/>
            </Box>
        },
        {
            key: 'shiftCard', component: (
                <Box m="2" mt="4" pl="5" pr="5">
                    <Text bold>Vardiyalarım</Text>
                    <ShiftCard/>
                </Box>
            )
        },
        {
            key: 'nurseCard', component: (
                <Box m="2" mt="">
                    <Text bold>Diğer Çalışanlar</Text>
                    <NurseCard/>
                </Box>
            )
        },
    ];

    return (
        <Box flex={1} backgroundColor="white">
            <FlatList
                data={sections}
                renderItem={({item}) => <Box>{item.component}</Box>}
                keyExtractor={(item) => item.key}
            />
        </Box>
    );
}

export default HomePage;
