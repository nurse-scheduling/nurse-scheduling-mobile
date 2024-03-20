import React, { useState } from 'react';
import { Box, Center, FlatList, Text, Stack, Button } from "native-base";
import ShiftList from "../components/ShiftList.tsx";
import Header from "../components/Header.tsx";

function ShiftSelect(): React.JSX.Element {
    const DaysOfAMonth = [
        { date: "01.04.2024" }, { date: "02.04.2024" }, { date: "03.04.2024" },
        { date: "04.04.2024" }, { date: "05.04.2024" }, { date: "06.04.2024" },
        { date: "07.04.2024" }, { date: "08.04.2024" }, { date: "09.04.2024" },
        { date: "10.04.2024" }, { date: "11.04.2024" }, { date: "12.04.2024" },
        { date: "13.04.2024" }, { date: "14.04.2024" }, { date: "15.04.2024" },
        { date: "16.04.2024" }, { date: "17.04.2024" }, { date: "18.04.2024" },
        { date: "19.04.2024" }, { date: "20.04.2024" }, { date: "21.04.2024" },
        { date: "22.04.2024" }, { date: "23.04.2024" }, { date: "24.04.2024" },
        { date: "25.04.2024" }, { date: "26.04.2024" }, { date: "27.04.2024" },
        { date: "28.04.2024" }, { date: "29.04.2024" }, { date: "30.04.2024" },
    ];
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    const today = new Date();
    const openDays = [18,19,25,26,27,28];

    return (

        <Center flex={1}>
            <Header></Header>
            <Stack space={4} alignItems="center" paddingTop={16} >
                {openDays.includes(today.getDate()) ? (
                    <>
                        <Text fontSize={20}> Hangi Günler Çalışacağınızı Belirtiniz </Text>
                        <Box borderRadius={25} style={{ backgroundColor: '#c8e3ff' }} alignItems={"center"} justifyContent={"center"} maxHeight={'90%'}>
                            <FlatList width={'75%'} maxHeight={'80%'} data={DaysOfAMonth} renderItem={({ item }) => {
                                return (
                                    <ShiftList checked={selectedDays.includes(item.date)} setChecked={setSelectedDays} date={item.date} />
                                );
                            }} />
                        </Box>
                        <Box>
                            <Button onPress={() => console.log(selectedDays)} style={{ backgroundColor: '#0000AE' }}>Günleri Gönder</Button>
                        </Box>
                    </>
                ) : (
                    <>
                        <Text fontSize={20}>Sadece Her Ayın 25,26,27 ve 28'inci günleri bir sonraki ay için çalışma günü seçebilirsiniz</Text>
                    </>
                    )}
            </Stack>
        </Center>
    );
}

export default ShiftSelect;
