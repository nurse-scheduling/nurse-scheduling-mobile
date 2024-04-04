import React, {useContext} from 'react';
import {AuthContext} from "../contexts/AuthContext.tsx";
import {Box, FlatList, Text} from "native-base";


function NurseCard() {
    const { nurse, selectedDate } = useContext(AuthContext);
    const shiftDate = new Date(selectedDate.split(".").reverse().join("-"));
    const nursesOnDuty = nurse.shifts
        .filter(shift => shift.start <= shiftDate && shift.end >= shiftDate)
        .map(shift => ({ firstName: nurse.firstName, lastName: nurse.lastName, start: shift.start, end: shift.end }));


    return (
        <Box>
            <FlatList data={nursesOnDuty} renderItem={({item}) => {
                return (
                    <Box key={`${item.firstName}-${item.lastName}`} backgroundColor="gray.300" rounded="xl" p="2" m="1" alignItems="center">
                        <Text fontSize="lg">{item.firstName} {item.lastName}</Text>
                        <Text fontSize="lg">{item.start.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })} - {item.end.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</Text>
                    </Box>
                )
            }}></FlatList>

        </Box>
    );
}

export default NurseCard;
