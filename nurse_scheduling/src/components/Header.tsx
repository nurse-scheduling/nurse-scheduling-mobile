import React, {useContext} from 'react';

import {Avatar, Box, HStack, VStack, Text, Pressable} from "native-base";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {AuthContext} from "../contexts/AuthContext.tsx";

export default function Header() {

    const {nurse} = useContext(AuthContext);
    const navigation = useNavigation<StackNavigationProp<any>>();

    return (

        <Box width="100%" alignItems="flex-end" paddingRight={'12%'} position={"absolute"} top={0} zIndex={1}>

            <HStack space={4} paddingTop={3} paddingBottom={6}>
                <VStack alignItems="center" paddingRight={'12%'} paddingTop={1}>
                    <Text fontSize="lg">Hoş Geldiniz</Text>
                    <Text bold fontSize="xl">{nurse.firstName} {nurse.lastName}</Text>
                </VStack>
                <Pressable onPress={() => {
                    navigation.navigate("MyProfile", {screen: "Profile"})
                }}>
                    <Avatar bg="#5F374B" source={{uri: nurse.pictureUrl}} size="lg"></Avatar>
                </Pressable>
            </HStack>

        </Box>

    );
}



