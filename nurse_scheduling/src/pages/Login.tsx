import {Avatar, Box, Center, Input, Icon, Pressable, Stack} from 'native-base';
import React, {useState, useEffect, useContext} from 'react';
import {Icon as ThemedIcon} from '@rneui/themed';
import {
    Text,
} from 'react-native';
import {AuthContext} from "../contexts/AuthContext.tsx";
import {login} from "../apis/auth.tsx";
import {Buffer} from "buffer";
import AsyncStorage from "@react-native-community/async-storage";

function Login(): React.JSX.Element {

    const [tcno, setTcno] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [tcnoError, setTcnoError] = useState<string>("");
    const [show, setShow] = React.useState(false);
    const [disabled, setDisabled] = React.useState(true);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const {setIsAuth} = useContext(AuthContext);

    const handleLoginSubmit = async () => {
        if(tcno.length === 0 || password.length === 0) {
            setErrorMessage("Lütfen tüm alanları doldurunuz.");
            console.error("Login error:", "Lütfen tüm alanları doldurunuz.");
            return;
        }
        const response = await login(tcno, password);
        if(response.errorMessage) {
            setErrorMessage(response.error);
            console.error("Login error:", response.error);
            return;
        }
        const credentials = Buffer.from(`${tcno}:${password}`, 'utf-8').toString('base64');
        await AsyncStorage.setItem("nurse", JSON.stringify(response));
        await AsyncStorage.setItem("basicAuth", credentials);
        await AsyncStorage.setItem("authenticated", "true");
        await AsyncStorage.setItem("login-time", new Date().getTime().toString());
        setIsAuth(true);
    };

    useEffect(() => {
        if (tcno?.length !== 11 && tcno.length !== 0) {
            setDisabled(true);
            setTcnoError("TC Kimlik No 11 haneli olmak zorundadır.");
        } else {
            setDisabled(false);
            setTcnoError("");
        }
    }, [tcno, disabled]);


    return (
        <Center flex={1} backgroundColor={'white'}>
            <Box mb="16">
                <Avatar size="2xl"
                        source={require('../assets/images/akdeniz-universitesi-logo-B017290F9B-seeklogo.com.png')}></Avatar>
            </Box>
            <Box alignItems="center" justifyContent="center">
                <Stack space={4} w="100%" alignItems="center">
                    <Input w={{
                        base: "75%",
                        md: "25%"
                    }} InputLeftElement={<Icon as={<ThemedIcon name="person" type="ionicon"/>} size={6} ml="2"
                                               color="muted.400"/>}
                           placeholder="T.C Kimlik No" onChangeText={setTcno}/>
                    <Input w={{
                        base: "75%",
                        md: "25%"
                    }} type={show ? "text" : "password"} InputLeftElement={<Icon as={<ThemedIcon name="key-outline" type="ionicon"/>} size={6} ml="2"
                                                                                 color="muted.400"/>} InputRightElement={<Pressable onPress={() => setShow(!show)}>
                        <Icon as={<ThemedIcon name={show ? "eye-outline" : "eye-off-outline"} type="ionicon"/>} size={6}
                              mr="3" color="muted.400"/>
                    </Pressable>} placeholder="Parola" onChangeText={setPassword}/>
                </Stack>
            </Box>
            <Box mt={12}>
                <Pressable style={{backgroundColor: disabled ? 'gray' : "#4f90ff"}} disabled={disabled} rounded="8"
                           onPress={() => handleLoginSubmit()}>
                    <Box minWidth="45%" minHeight="8">
                        <Text style={{color: "white", textAlign: "center", fontSize: 20}}>Giriş Yap</Text>
                    </Box>
                </Pressable>
            </Box>
        </Center>
    );
}


export default Login;
