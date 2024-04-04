import React, {useContext} from 'react';
import {AuthContext} from "../contexts/AuthContext.tsx";
import {Box, Text, VStack} from "native-base";
import {StyleSheet} from "react-native";



function ShiftCard() {
    const {nurse, selectedDate} = useContext(AuthContext);
    const shiftDate = new Date(selectedDate.split(".").reverse().join("-"));
    const shift = nurse.shifts.find(shift => shift.start <= shiftDate && shift.end >= shiftDate) || null;

    return (
            <Box style={styles.container} backgroundColor="gray.300" rounded="xl" p="4" mt="2" alignItems="center">

                    {shift ?
                        <VStack>
                            <Text fontSize="lg">{shift.start.toLocaleDateString('tr-TR')}, {shift.start.toLocaleTimeString('tr-TR', {hour: '2-digit', minute: '2-digit'})}</Text>
                            <Text fontSize="lg">{shift.end.toLocaleDateString('tr-TR')}, {shift.end.toLocaleTimeString('tr-TR', {hour: '2-digit', minute: '2-digit'})}</Text>
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