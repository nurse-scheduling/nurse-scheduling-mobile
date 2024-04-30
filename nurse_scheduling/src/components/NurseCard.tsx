import React, {useContext} from 'react';
import {AuthContext} from "../contexts/AuthContext.tsx";
import {Box, FlatList, Text, VStack} from "native-base";
import moment from "moment/moment";
import {useGetShiftsByDate} from "../apis/shifts.tsx";


function NurseCard() {
    const { selectedDate,credentials} = useContext(AuthContext);
    //"-"ler "." olacak.
    const momentDate = moment(selectedDate,"DD.MM.YYYY").format("YYYY-MM-DD");
    const {shifts,isLoading} = useGetShiftsByDate(momentDate,credentials);
    const convertDate = (date: Date) => {
        const newDate = new Date(date);
        return newDate.toLocaleDateString("tr-TR", {hour: '2-digit', minute: '2-digit'});
    }
    // const { nurse, selectedDate } = useContext(AuthContext);
    // const shiftDate = new Date(selectedDate.split(".").reverse().join("-"));
    // const nursesOnDuty = nurse.shifts
    //     .filter(shift => shift.start <= shiftDate && shift.end >= shiftDate)
    //     .map(shift => ({ firstName: nurse.firstName, lastName: nurse.lastName, start: shift.start, end: shift.end }));
    //
    //
     return (
         <Box>
             <FlatList data={shifts} renderItem={({item}) => {
                 return (

                     <Box key={`${item.nurseFirstName}-${item.nurseLastName}`} backgroundColor="gray.300" rounded="xl" p="2" m="1" alignItems="center">
                         <Text fontSize="lg">{item.nurseFirstName} {item.nurseLastName}</Text>
                         <Text fontSize="lg">{convertDate(item.startDate)} - {convertDate(item.endDate)}</Text>

                     </Box>
                 )
             }}></FlatList>

         </Box>
     );
}

export default NurseCard;
