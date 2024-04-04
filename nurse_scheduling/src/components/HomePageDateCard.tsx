import React, {useContext} from "react";
import {Box, FlatList, Pressable, Text} from "native-base";
import {StyleSheet} from "react-native";
import {AuthContext} from "../contexts/AuthContext.tsx";


function HomePageDateCard () {

    const days = ["04.04.2024", "05.04.2024", "06.04.2024", "07.04.2024", "08.04.2024", "09.04.2024", "10.04.2024"]
    const {selectedDate, setSelectedDate} = useContext(AuthContext);

    return (
        <FlatList horizontal={true} data={days} renderItem={({item}) => {
            return (<Box style={styles.container} backgroundColor={item === selectedDate ? "blue.300" : "gray.300"} rounded="xl" p="4" m="2" >
                  <Pressable onPress={() => {setSelectedDate(item)}}>
                       <Box>
                          <Text >{item}</Text>
                      </Box>
                   </Pressable>
               </Box>)
        }}></FlatList>


    )

}
const styles = StyleSheet.create({
    container: {
        height: 100,
        justifyContent: 'center',

    },

});

export default HomePageDateCard;
