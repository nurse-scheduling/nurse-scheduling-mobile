import React, {useContext} from 'react';
import {AuthContext} from "../contexts/AuthContext.tsx";
import {Box, Text, VStack} from "native-base";
import {StyleSheet} from "react-native";
import {useGetMyShifts} from "../apis/shifts.tsx";
import moment from "moment";


function ShiftCard() {
    const { selectedDate,credentials} = useContext(AuthContext);
    const momentDate = moment(selectedDate,"DD.MM.YYYY").format("YYYY.MM.DD");
    const {shift,isLoading} = useGetMyShifts(momentDate,credentials );

    const convertDate = (date: Date) => {
        const newDate = new Date(date);
        return newDate.toLocaleDateString("tr-TR", {hour: '2-digit', minute: '2-digit'});
    }
    return (
            <Box style={styles.container} backgroundColor="gray.300" rounded="xl" p="4" mt="2" alignItems="center">

                    {!isLoading && shift!==undefined ?
                        <VStack>
                            <Text fontSize="lg">{convertDate(shift.startDate)}</Text>
                            <Text fontSize="lg">{convertDate(shift.endDate)}</Text>
                        </VStack>
                        : <Text>Bugün vardiyanız bulunmamaktadir.</Text>
                    }
            </Box>
        );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },

});

export default ShiftCard;
