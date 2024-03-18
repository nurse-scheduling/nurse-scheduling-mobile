import React, {useContext} from 'react';

import {Avatar, Box, HStack, VStack, Text, Pressable} from "native-base";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {AuthContext} from "../contexts/AuthContext.tsx";

export default function Header() {

    const {userFirstName, userLastName, pictureUrl} = useContext(AuthContext);
    const navigation = useNavigation<StackNavigationProp<any>>();

    return (

        <Box width="100%" alignItems="flex-end" paddingRight={6} position={"absolute"} top={0} zIndex={1}>

            <HStack space={4} paddingTop={6} paddingBottom={6}>
                <VStack alignItems="center" paddingRight={6}>
                    <Text fontSize="lg">Hoş Geldiniz</Text>
                    <Text bold fontSize="xl">{userFirstName} {userLastName}</Text>
                </VStack>
                <Pressable onPress={() => {
                    navigation.navigate("MyProfile", {screen: "Profile"})
                }}>
                    <Avatar bg="#5F374B" source={{uri: pictureUrl}} size="lg"></Avatar>
                </Pressable>
            </HStack>

        </Box>

    );
}



