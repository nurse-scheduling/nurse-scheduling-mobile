import React, { useContext, useEffect, useState } from 'react';
import { Box, Center, FlatList, Spinner, Stack, Text, Button, Modal } from "native-base";
import Header from "../components/Header.tsx";
import SmallButton from "../components/SmallButton.tsx";
import { postWorkDays, useFetchWorkDays } from "../apis/workDays.tsx";
import { AuthContext } from "../contexts/AuthContext.tsx";
import moment from "moment/moment";
import ShiftList from "../components/ShiftList.tsx";
import { WorkDayType } from "../types/WorkDayType.tsx";
import { useIsFocused } from "@react-navigation/native";

function ShiftSelect(): React.JSX.Element {
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    const [validationSelectedDays, setValidationSelectedDays] = useState<WorkDayType>();
    const [disabled, setDisabled] = useState<boolean>(true);
    const [isModalOpen , setIsModalOpen] = useState<boolean>(false);
    const today = new Date();
    const openDays = [22, 25, 26, 27, 28];
    const { credentials } = useContext(AuthContext);
    const month = (today.getMonth() + 2).toString();
    const year = today.getFullYear().toString();
    const isFocused = useIsFocused();
    let { workDays, isLoading } = useFetchWorkDays(credentials, isFocused, month, year);
    const [modalMessage, setModalMessage] = useState<string>("");
    const getDaysOfMonth = () => {
        const daysInMonth = [];
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 2;

        const daysCount = new Date(year, month, 0).getDate();

        for (let i = 1; i <= daysCount; i++) {
            const formattedDate = `${i < 10 ? '0' + i : i}.${month < 10 ? '0' + month : month}.${year}`;
            daysInMonth.push(formattedDate);
        }

        return daysInMonth;
    };
    const daysOfAMonth = getDaysOfMonth();
    useEffect(() => {
        if (workDays) {
            setSelectedDays(workDays.workDate.map(date => new Date(date).toLocaleDateString("tr-TR")));
            setValidationSelectedDays(workDays);
            setDisabled(areDaysEqual(workDays.workDate));
        }
    }, [workDays]);
    useEffect(() => {
        setDisabled(areDaysEqual(validationSelectedDays?.workDate));
    }, [selectedDays]);

    const handleSelectedDays = async () => {
        try {
            const workDate = selectedDays.map(dateString => moment(dateString, "DD.MM.YYYY").toDate());

            if(workDate.length < daysOfAMonth.length-3) {
                setIsModalOpen(true);
                setModalMessage(`Çalışma Günleriniz Kaydedilirken Bir Hata Oluştu! Haziran Ayı için En Az ${daysOfAMonth.length-3} Gün Seçmelisiniz!`);
                return;
            }
            const response = await postWorkDays(workDate, credentials,month,year) as WorkDayType;
            const message = response?.message !== null ? "Çalışma Günleriniz Başarıyla Kaydedildi!"
                : "Çalışma Günleriniz Kaydedilirken Bir Hata Oluştu!";
            setIsModalOpen(true);
            setModalMessage(message);
            setValidationSelectedDays(response)
            const responseDate = response?.workDate.map(date => new Date(date).toLocaleDateString("tr-TR"));
            setSelectedDays(responseDate);
            setDisabled(areDaysEqual(workDays?.workDate));
        } catch (e) {
            console.log(e);
            setModalMessage("Çalışma Günleriniz Kaydedilirken Bir Hata Oluştu!");
        }
    }
    const closeModal = () => {
        setModalMessage("")
        setIsModalOpen(false);
    }
    const checkSelectedDays = (date: string) => selectedDays.includes(date);
    const areDaysEqual = (workDate: Date[] | undefined) =>
        JSON.stringify(selectedDays) === JSON.stringify(workDate?.map(date =>
            new Date(date).toLocaleDateString("tr-TR")));


    const ModalContent = () => (
        <Modal.Content>
            <Modal.CloseButton />
            <Modal.Body>{modalMessage}</Modal.Body>
            <Modal.Footer>
                <Button colorScheme="blue" onPress={closeModal}>Tamam</Button>
            </Modal.Footer>
        </Modal.Content>
    );

    return (
        <Center flex={1} backgroundColor={'white'}>
            <Header />
            <Stack space={4} alignItems="center" paddingTop={16}>
                {openDays.includes(today.getDate()) ? (
                    <>
                        <Text fontSize={20}> Hangi Günler Çalışacağınızı Belirtiniz </Text>
                        <Box borderRadius={25} backgroundColor={'blue.300'} alignItems={"center"}
                             justifyContent={"center"} maxHeight={'90%'}>
                            {isLoading ? (
                                <Spinner color="blue.400" size="lg" />
                            ) : (
                                <FlatList width={'75%'} maxHeight={'80%'} data={daysOfAMonth} keyExtractor={(item) => item} renderItem={({ item }) => {
                                    return (
                                        <ShiftList checked={checkSelectedDays(item)} setChecked={setSelectedDays}
                                                   date={item} />
                                    );
                                }} />
                            )}
                        </Box>
                        <Box>
                            <SmallButton disabled={disabled || isLoading} onPress={handleSelectedDays} text={isLoading ? "İşleniyor..." : "Günleri Gönder"} color={disabled || isLoading ? 'blue.300' : 'blue.600'} textColor={'white'} />
                        </Box>
                    </>
                ) : (
                    <>
                        <Text fontSize={20}>Sadece Her Ayın 25,26,27 ve 28'inci günleri bir sonraki ay için çalışma günü
                            seçebilirsiniz</Text>
                    </>
                )}
            </Stack>
            <Modal isOpen={isModalOpen } onClose={closeModal}>
                <ModalContent />
            </Modal>
        </Center>
    );
}

export default ShiftSelect;
