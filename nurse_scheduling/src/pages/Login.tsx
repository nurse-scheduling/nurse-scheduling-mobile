import {Avatar, Box, Center, Input, Icon, Pressable, Stack} from 'native-base';
import React, {useState, useEffect, useContext} from 'react';
import {Icon as ThemedIcon} from '@rneui/themed';
import {
    Text,
} from 'react-native';
import {AuthContext} from "../contexts/AuthContext.tsx";


function Login(): React.JSX.Element {

    const [tcno, setTcno] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [tcnoError, setTcnoError] = useState<string>("");
    const [show, setShow] = React.useState(false);
    const [disabled, setDisabled] = React.useState(true);
    const {setIsAuth} = useContext(AuthContext);

    const handleLogin = () => {
        setIsAuth(true);
    }
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
                    }} InputLeftElement={<Icon as={<ThemedIcon name="person" type="ionicon"/>} size={5} ml="2"
                                               color="muted.400"/>}
                           placeholder="T.C Kimlik No" onChangeText={setTcno}/>
                    <Input w={{
                        base: "75%",
                        md: "25%"
                    }} type={show ? "text" : "password"} InputRightElement={<Pressable onPress={() => setShow(!show)}>
                        <Icon as={<ThemedIcon name={show ? "eye-outline" : "eye-off-outline"} type="ionicon"/>} size={6}
                              mr="3" color="muted.400"/>
                    </Pressable>} placeholder="Parola"/>
                </Stack>
            </Box>
            <Box mt={12}>
                <Pressable style={{backgroundColor: disabled ? 'gray' : "#4f90ff"}} disabled={disabled} rounded="8"
                           onPress={() => handleLogin()}>
                    <Box minWidth="45%" minHeight="8">
                        <Text style={{color: "white", textAlign: "center", fontSize: 20}}>Giriş Yap</Text>
                    </Box>
                </Pressable>
            </Box>
        </Center>
    );
}


export default Login;
