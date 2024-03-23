import React, {useState} from 'react';
import {Box, Center, FlatList, Text, Stack} from "native-base";
import ShiftList from "../components/ShiftList.tsx";
import Header from "../components/Header.tsx";
import SmallButton from "../components/SmallButton.tsx";
import {DaysOfAMonth} from "../dummy/DummyData.tsx";

function ShiftSelect(): React.JSX.Element {
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    const today = new Date();
    const openDays = [18, 23, 25, 26, 27, 28];

    return (

        <Center flex={1} backgroundColor={'white'}>
            <Header></Header>
            <Stack space={4} alignItems="center" paddingTop={16}>
                {openDays.includes(today.getDate()) ? (
                    <>
                        <Text fontSize={20}> Hangi Günler Çalışacağınızı Belirtiniz </Text>
                        <Box borderRadius={25} backgroundColor={'blue.300'} alignItems={"center"}
                             justifyContent={"center"} maxHeight={'90%'}>
                            <FlatList width={'75%'} maxHeight={'80%'} data={DaysOfAMonth} renderItem={({item}) => {
                                return (
                                    <ShiftList checked={selectedDays.includes(item.date)} setChecked={setSelectedDays}
                                               date={item.date}/>
                                );
                            }}/>
                        </Box>
                        <Box>
                            <SmallButton onPress={() => {
                                console.log(selectedDays)
                            }} text={"Günleri Gönder"} color={'blue.300'} textColor={'white'}/>
                        </Box>
                    </>
                ) : (
                    <>
                        <Text fontSize={20}>Sadece Her Ayın 25,26,27 ve 28'inci günleri bir sonraki ay için çalışma günü
                            seçebilirsiniz</Text>
                    </>
                )}
            </Stack>
        </Center>
    );
}

export default ShiftSelect;
