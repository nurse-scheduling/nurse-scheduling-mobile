import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {Icon as ThemedIcon} from "@rneui/themed";
import {Icon} from "native-base";

const SuccessfulPage = () => {
    const navigation = useNavigation<StackNavigationProp<any>>();

    return (
        <View style={styles.container}>
            <Icon as={<ThemedIcon name={"checkmark-circle-outline"} type="ionicon" size={128} color="green"/>} size={32}
                  mr="3" />
            <Text style={styles.title}>Vardiya Değişim İsteği Başarılı!</Text>
            <Text style={styles.message}>Vardiya değişim isteğine cevap bekleniyor.</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('ChangeShiftRequestScreen', {screen: 'ChangeShiftRequest'})}
            >
                <Text style={styles.buttonText}>Vardiya Değişim Taleplerim</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    message: {
        fontSize: 18,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#3498db',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default SuccessfulPage;
