import React, {useContext, useEffect, useState} from 'react';
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import moment from 'moment';
import 'moment/locale/tr'
import {AuthContext} from "../contexts/AuthContext.tsx";
const { width } = Dimensions.get('window');
const HomePageDateCard = () => {
    moment().locale('tr');
    const {selectedDate, setSelectedDate} = useContext(AuthContext);
    const [activeDay, setActiveDay] = useState(moment());
    useEffect(() => {

        if (selectedDate && selectedDate !== ' ' && selectedDate !== '' && selectedDate.length > 0) {
            setActiveDay(moment(selectedDate, 'DD.MM.YYYY'));
        } else {

            setActiveDay(moment());
        }
    }, [selectedDate]);
    const handlePress = (item: moment.Moment) => {
        setActiveDay(item);
        if(setSelectedDate){
            setSelectedDate(item.format('DD.MM.YYYY'));
        }
    };

    const renderItem = ({ item }: { item: moment.Moment }) => (
        <TouchableOpacity style={styles.dayContainer} onPress={() => handlePress(item)}>
            <View style={[styles.dayBox,{ backgroundColor: 'gray'}, item.isSame(activeDay, 'day') && styles.activeDayBox]}>
                <Text style={[styles.dayOfWeek,{color: 'white'}, item.isSame(activeDay, 'day') && styles.activeDayOfWeek]}>{item.format('ddd')}</Text>
                <Text style={[styles.day, {color: 'white'}, item.isSame(activeDay, 'day') && styles.activeDayText]}>{item.format('D')}</Text>
            </View>
        </TouchableOpacity>
    );

    const keyExtractor = (item: moment.Moment) => item.format('YYYY.MM.DD');

    return (
        <FlatList
            data={Array.from({ length: 31 }, (_, i) => moment().subtract(15, 'days').startOf('day').add(i, 'days'))}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            horizontal
            pagingEnabled
            initialScrollIndex={15}
            getItemLayout={(data, index) => ({
                length: width * 0.25,
                offset: width * 0.25 * index,
                index,
            })}
        />
    );
};

const styles = StyleSheet.create({
    dayContainer: {
        width: width * 0.25,
        paddingHorizontal: 10,
        alignItems: 'center',
        marginBottom: 5
    },
    dayBox: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
        width: '100%',
        borderRadius: 15,
    },
    activeDayBox: {
        backgroundColor: '#1890FF',
    },
    day: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
    },
    activeDayText: {
        color: 'white',
    },
    dayOfWeek: {
        fontSize: 14,
        marginBottom: 15,
    },
    activeDayOfWeek: {
        fontWeight: 'bold',
        color: 'white',
    },
});

export default HomePageDateCard;
