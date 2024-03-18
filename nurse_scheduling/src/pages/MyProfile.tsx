import {Avatar, Box, Center, HStack, VStack, Text, Input, Pressable, Icon} from 'native-base';
import React from 'react';
import { Icon as ThemedIcon} from '@rneui/themed';



function MYProfile(): React.JSX.Element {
    const nurse = {
        firstName: "Hüseyin Emre",
        lastName: "Üğdül",
        birthDate: "4 Haziran 2000",
        department: "Dahiliye",
        profilePicture: "https://cdn-icons-png.flaticon.com/512/8496/8496122.png"
    }


    return (
        <Box>
            <Center>
                <HStack space={4} alignItems="center" mt="9" mb="9">
                    <Box>
                        <Avatar bg="#5F374B" source={{uri: nurse.profilePicture}} size="2xl" ></Avatar>
                    </Box>
                    <Box>
                        <VStack>
                            <Box>
                                <Text fontSize="2xl">{nurse.firstName}</Text>
                            </Box>
                            <Box>
                                <Text bold fontSize="2xl">{nurse.lastName.toUpperCase()}</Text>
                            </Box>
                        </VStack>
                    </Box>
                </HStack>
            </Center>

            <Box >
                <VStack space="6"  >
                    <HStack alignItems="center">
                        <Text fontSize="md" ml="6">Departman      </Text>
                        <Input variant="outline" placeholder={nurse.department}  w={{
                            base: "55%",
                            md: "25%"
                        }} editable={false}/>
                    </HStack>
                    <HStack alignItems="center">
                        <Text fontSize="md" ml="6">Doğum Tarihi  </Text>
                        <Input variant="outline" placeholder={nurse.birthDate}  w={{
                            base: "55%",
                            md: "25%"
                        }} editable={false}/>
                    </HStack>
                </VStack>
            </Box>

            <Box ml="6" mt={12} w={{
                base: "85%",
                md: "25%"
            }}>
                <Pressable style={{backgroundColor: "gray"}} rounded="8">
                    <HStack justifyContent="space-between" minHeight = "12" alignItems="center">
                        <HStack alignItems="center" space={1}>
                            <Icon as={<ThemedIcon name={"calendar-outline"} type="ionicon" />} size={6} ml="3"  />
                            <Text style={{color: "white", textAlign: "center", fontSize: 20}}>Çalışma Takvimim</Text>
                        </HStack>
                        <Icon as={<ThemedIcon name={"chevron-forward-outline"} type="ionicon" />} size={6} mr="3"  />
                    </HStack>
                </Pressable>
            </Box>

            <Box  ml="6" mt={12} w={{
                base: "85%",
                md: "25%"
            }}>
                <Pressable style={{backgroundColor: "red"}} rounded="8">
                    <HStack justifyContent="space-between" minHeight = "9" alignItems="center">
                        <HStack alignItems="center" space={1}>
                            <Icon as={<ThemedIcon name={"log-out-outline"} type="ionicon" />} size={6} ml="3"  />
                            <Text style={{color: "white", textAlign: "center", fontSize: 20}}>Çıkış Yap</Text>
                        </HStack>
                        <Icon as={<ThemedIcon name={"chevron-forward-outline"} type="ionicon" />} size={6} mr="3" color='#fff' />
                    </HStack>
                </Pressable>

            </Box>
        </Box>
    );
}


export default MYProfile;
