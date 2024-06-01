import React, { useContext, useEffect, useState } from "react";
import { Alert, Stack, Text, VStack, Modal, Button } from "native-base";
import SelectComponent from "./SelectComponent.tsx";
import SmallButton from "./SmallButton.tsx";
import { AuthContext } from "../contexts/AuthContext.tsx";
import { useFetchAvailableShiftsByNurseIdAndShift, useGetShiftsByMonthAndYear } from "../apis/shifts.tsx";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { NurseType } from "../types/NurseType.tsx";
import { ShiftType } from "../types/ShiftType.tsx";
import { useFetchNursesList } from "../apis/nurse.tsx";
import { createExchangeShiftRequest } from "../apis/exchangeShiftsRequest.tsx";
import { StackNavigationProp } from "@react-navigation/stack";

function CreateShiftRequestContent(): React.JSX.Element {
    const [selectedNurse, setSelectedNurse] = useState<NurseType>();
    const [selectedShift, setSelectedShift] = useState<ShiftType>();
    const [selectedMyShift, setSelectedMyShift] = useState<ShiftType>();
    const [nurseList, setNurseList] = useState<NurseType[]>();
    const [error, setError] = useState<string>();
    const [convertedMyShifts, setConvertedMyShifts] = useState<ShiftType[]>([]);
    const [convertedNurseShifts, setConvertedNurseShifts] = useState<ShiftType[]>([]);
    const { nurse, credentials } = useContext(AuthContext);
    const isFocused = useIsFocused();
    const today = new Date();
    const month = (today.getMonth() + 1).toString();
    const year = today.getFullYear().toString();
    const { shifts: myShifts } = useGetShiftsByMonthAndYear(nurse.id, month, year, credentials, isFocused);
    const { shifts: selectedNurseShifts } = useFetchAvailableShiftsByNurseIdAndShift(selectedNurse?.id || '', credentials, month, year, selectedMyShift?.id || "", isFocused);
    const { nurses } = useFetchNursesList(credentials, isFocused, nurse.departmentName);
    const navigation = useNavigation<StackNavigationProp<any>>();

    useEffect(() => {
        setNurseList(nurses?.filter((item: NurseType) => item.id != nurse.id)
            .filter((item: NurseType) => item.role == "NURSE")
            .sort((a: NurseType, b: NurseType) => a.firstName.localeCompare(b.firstName)));
    }, [nurses]);

    useEffect(() => {
        if (myShifts) {
            const convertedShifts = myShifts.map(shift => {
                const start = new Date(shift.startDate);
                const end = new Date(shift.endDate);
                const utcStart = new Date(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate(), start.getUTCHours(), start.getUTCMinutes());
                const utcEnd = new Date(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate(), end.getUTCHours(), end.getUTCMinutes());
                return {
                    ...shift,
                    startDate: utcStart,
                    endDate: utcEnd,
                };
            }).filter(value => new Date(value.startDate) > today)
                .sort((a: ShiftType, b: ShiftType) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
            setConvertedMyShifts(convertedShifts);
        }
    }, [myShifts]);

    useEffect(() => {
        if (selectedNurseShifts) {
            const convertedShifts = selectedNurseShifts.map(shift => {
                const start = new Date(shift.startDate);
                const end = new Date(shift.endDate);
                const utcStart = new Date(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate(), start.getUTCHours(), start.getUTCMinutes());
                const utcEnd = new Date(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate(), end.getUTCHours(), end.getUTCMinutes());
                return {
                    ...shift,
                    startDate: utcStart,
                    endDate: utcEnd,
                };
            }).filter(value => new Date(value.startDate) > today)
                .sort((a: ShiftType, b: ShiftType) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
            setConvertedNurseShifts(convertedShifts);
        }
    }, [selectedNurseShifts]);

    const selectNurse = (nurseId: string) => {
        setSelectedNurse(nurses?.find((nurse: NurseType) => nurse.id == nurseId));
        setSelectedShift(undefined);
    };

    const selectShift = (shiftId: string) => {
        setSelectedShift(selectedNurseShifts?.find((shift: ShiftType) => shift.id == shiftId));
    };

    const selectMyShift = async (shiftId: string) => {
        const shift = await myShifts?.find((shift: ShiftType) => shift.id == shiftId);
        if (shift) {
            setSelectedMyShift(shift);
        }
    };

    const convertDate = (date: Date) => {
        const newDate = new Date(date);
        return newDate.toLocaleDateString("tr-TR", { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Istanbul' });
    };

    const createShiftRequest = async () => {
        if (selectedNurse && selectedShift && selectedMyShift) {
            createExchangeShiftRequest(selectedMyShift.id, selectedShift.id, credentials).then((response) => {
                if (response === "Vardiya değişim isteği başarıyla oluşturuldu") {
                    navigation.navigate("SuccessfulPageScreen", { screen: "SuccessfulPage" });
                } else {
                    setError(response.toString());
                }
            });
        }
    };

    return (
        <Stack space={5} alignItems={"center"} paddingTop={32}>
            <Text fontSize={'xl'}>
                Vardiya Değişim Talebi Oluştur
            </Text>
            <VStack space={10} maxW="300">
                <SelectComponent selectedValue={selectedMyShift?.id}
                                 display={selectedMyShift ? convertDate(selectedMyShift.startDate) : ""}
                                 placeholder={"Vardiyanızı Seçiniz"}
                                 list={convertedMyShifts || []}
                                 onValueChange={selectMyShift}
                                 label={"startDate"}
                                 label2={"endDate"}
                                 value={"id"}
                                 disabled={!convertedMyShifts || convertedMyShifts.length == 0} />
                <SelectComponent selectedValue={selectedNurse?.id}
                                 display={selectedNurse ? `${selectedNurse.firstName} ${selectedNurse.lastName}` : ""}
                                 placeholder={"Hemşire Seçiniz"}
                                 list={nurseList || []}
                                 onValueChange={selectNurse}
                                 label={"firstName"}
                                 label2={"lastName"}
                                 value={"id"}
                                 disabled={!nurseList || nurseList.length == 0 || !selectedMyShift} />
                <SelectComponent selectedValue={selectedShift?.id}
                                 display={selectedShift ? convertDate(selectedShift.startDate) : ""}
                                 placeholder={"Hemşirenin Vardiyasını Seçiniz"}
                                 list={convertedNurseShifts?.filter((item: ShiftType) => item.nurseId === selectedNurse?.id) || []}
                                 onValueChange={selectShift}
                                 label={"startDate"}
                                 label2={"endDate"}
                                 value={"id"}
                                 disabled={!convertedNurseShifts || convertedNurseShifts.length == 0 || !selectedNurse} />
                <SmallButton onPress={createShiftRequest}
                             text={"Değişim Talep Et"}
                             color={(!selectedMyShift || !selectedShift || !selectedNurse) ? "gray.300" : "blue.300"}
                             textColor={"white"}
                             textSize={'16'}
                             disabled={!selectedMyShift || !selectedShift || !selectedNurse} />
            </VStack>
            <Modal isOpen={!!error} onClose={() => setError(undefined)}>
                <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header>Hata</Modal.Header>
                    <Modal.Body>
                        <Alert status="error">
                            <VStack space={2} flexShrink={1} w="100%">
                                <VStack space={2} flexShrink={1} w="100%">
                                    <Text>{error}</Text>
                                </VStack>
                            </VStack>
                        </Alert>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onPress={() => setError(undefined)}>
                            Kapat
                        </Button>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        </Stack>
    );
}

export default CreateShiftRequestContent;
