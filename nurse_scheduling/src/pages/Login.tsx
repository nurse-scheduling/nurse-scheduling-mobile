import {
    Avatar,
    Box,
    Center,
    Input,
    Icon,
    Pressable,
    Stack,
    Text,
    Alert,
    VStack,
    HStack,
    IconButton,
    CloseIcon, Popover
} from 'native-base';
import React, {useState, useEffect, useContext} from 'react';
import {Icon as ThemedIcon} from '@rneui/themed';
import {AuthContext} from "../contexts/AuthContext.tsx";
import {login} from "../apis/auth.tsx";
import {Buffer} from "buffer";
import AsyncStorage from "@react-native-community/async-storage";
import {NurseType} from "../types/NurseType.tsx";

function Login(): React.JSX.Element {

    const [tcno, setTcno] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPasswordPassword] = React.useState(false);
    const [disabled, setDisabled] = React.useState(true);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const {setIsAuth} = useContext(AuthContext);

    const handleLoginSubmit = async () => {
        if(tcno.length === 0 || password.length === 0) {
            setErrorMessage("Lütfen tüm alanları doldurunuz.");
            return;
        }
        let response = await login(tcno, password) as NurseType;
        if(response && response.errorMessage !== null) {
            setErrorMessage(response.errorMessage);
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
        if (tcno?.length !== 11) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }, [tcno, disabled]);

    const AlertContent = () => {
        return (
            <Center marginBottom={10} rounded={8}>
                <Alert maxW="400" status="error" colorScheme="error">
                    <VStack space={2} flexShrink={1} w="100%">
                        <HStack flexShrink={1} space={2} alignItems="center" justifyContent="space-between">
                            <HStack flexShrink={1} space={4} alignItems="center">
                                <Alert.Icon />
                                <Text fontSize="md" fontWeight="medium" color="coolGray.800">
                                    {errorMessage}
                                </Text>
                            </HStack>
                            <IconButton onPress={() => setErrorMessage("")} variant="unstyled" _focus={{
                                borderWidth: 0
                            }} icon={<CloseIcon size="3" />} _icon={{
                                color: "coolGray.600"
                            }} />
                        </HStack>
                    </VStack>
                </Alert>
            </Center>
        );
    }

    const HintContent = () => {
        return (
            <Box w="14%" alignItems="center">
                <Popover trigger={triggerProps => {
                    return <Pressable {...triggerProps}>
                        <Icon as={<ThemedIcon name={"help_outline"} type="ionicon"/>} size={6}
                              mr="3" color="muted.400"/>
                    </Pressable>
                }}>
                    <Popover.Content accessibilityLabel="TC-KIMLIK" w="96">
                        <Popover.Arrow />
                        <Popover.CloseButton />
                        <Popover.Header>T.C. Kimlik Numarası 11 Haneli Olmak Zorundadır.</Popover.Header>
                    </Popover.Content>
                </Popover>
            </Box>
        )
    }


    return (
        <Center flex={1} backgroundColor={'white'}>
            {errorMessage.length > 0 && <AlertContent/>}
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
                           placeholder="T.C Kimlik No" onChangeText={setTcno} InputRightElement={<HintContent/>}/>
                    <Input w={{
                        base: "75%",
                        md: "25%"
                    }} type={showPassword ? "text" : "password"} InputLeftElement={<Icon as={<ThemedIcon name="key-outline" type="ionicon"/>} size={6} ml="2"
                                                                                 color="muted.400"/>} InputRightElement={<Pressable onPress={() => setShowPasswordPassword(!showPassword)}>
                        <Icon as={<ThemedIcon name={showPassword ? "eye-outline" : "eye-off-outline"} type="ionicon"/>} size={6}
                              mr="3" color="muted.400"/>
                    </Pressable>} placeholder="Parola" onChangeText={setPassword}/>
                </Stack>
            </Box>
            <Box mt={12}>
                <Pressable style={{backgroundColor: disabled ? 'gray' : "#4f90ff"}} disabled={disabled} rounded="8"
                           onPress={() => handleLoginSubmit()}>
                    <Box minWidth="45%" minHeight="8">
                        <Text style={{color: "white", textAlign: "center", fontSize: 20, paddingTop:5,}}>Giriş Yap</Text>
                    </Box>
                </Pressable>
            </Box>
        </Center>
    );
}


export default Login;
