import React, {useContext, useEffect,useState} from "react";
import {Button, Modal, Stack, Text, VStack} from "native-base";
import SelectComponent from "./SelectComponent.tsx";
import SmallButton from "./SmallButton.tsx";
import {AuthContext} from "../contexts/AuthContext.tsx";
import {useGetShiftsByMonthAndYear} from "../apis/shifts.tsx";
import {useIsFocused} from "@react-navigation/native";
import {NurseType} from "../types/NurseType.tsx";
import {ShiftType} from "../types/ShiftType.tsx";
import {useFetchNursesList} from "../apis/nurse.tsx";
import {createExchangeShiftRequest} from "../apis/exchangeShiftsRequest.tsx";



function CreateShiftRequestContent(): React.JSX.Element {
    const [selectedNurse, setSelectedNurse] = useState<NurseType>();
    const [selectedShift, setSelectedShift] = useState<ShiftType>();
    const [selectedMyShift, setSelectedMyShift] = useState<ShiftType>();
    const [nurseList,setNurseList] = useState<NurseType[]>();
    const {nurse,credentials} = useContext(AuthContext);
    const isFocused = useIsFocused();
    const today = new Date();
    const month = (today.getMonth()+1).toString();
    const year = today.getFullYear().toString();
    const {shifts : myShifts } = useGetShiftsByMonthAndYear(nurse.id,month,year,credentials,isFocused);
    const {shifts : selectedNurseShifts } = useGetShiftsByMonthAndYear(selectedNurse?.id ||'',month,year,credentials,isFocused);
    const {nurses} = useFetchNursesList(credentials,isFocused,nurse.departmentName);
    const [modalMessage, setModalMessage] = useState<string>('');
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        setNurseList(nurses?.filter((item: NurseType) => item.id != nurse.id));
    },[nurses])

    const selectNurse = (nurseId: string) => {
        setSelectedNurse(nurses?.find((nurse: NurseType) => nurse.id == nurseId))
        setSelectedShift(undefined)
    }
    const selectShift = (shiftId: string) => {
        setSelectedShift(selectedNurseShifts?.find((shift: ShiftType) => shift.id == shiftId))
    }
    const selectMyShift = async (shiftId: string) => {
        const shift = await myShifts?.find((shift: ShiftType) => shift.id == shiftId);
        if(shift){
            setSelectedMyShift(shift);
        }
    }
    const convertDate = (date: Date) => {
        const newDate = new Date(date);
        return newDate.toLocaleDateString("tr-TR", { hour: '2-digit', minute: '2-digit' });
    }

    const createShiftRequest = async () => {
        if (selectedNurse && selectedShift && selectedMyShift) {
            createExchangeShiftRequest(selectedShift.id, selectedMyShift.id, credentials).then((response) => {
                setIsOpen(true);
                setModalMessage(response.toString());
            });
        }
    }
    const closeModal = () => {
        setIsOpen(false);
        setModalMessage('');
    }
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
        <Stack space={5} alignItems={"center"} paddingTop={32}>
            <Text fontSize={'xl'}>
                Vardiya Değişim Talebi Oluştur
            </Text>
            <VStack space={10} maxW="300">
                <SelectComponent selectedValue={selectedMyShift?.id}
                                 display={selectedMyShift?convertDate(selectedMyShift.startDate):""}
                                 placeholder={"Vardiyanızı Seçiniz"}
                                 list={myShifts ||[]}
                                 onValueChange={selectMyShift}
                                 label={"startDate"}
                                 label2={"endDate"}
                                 value={"id"}
                                 disabled={!myShifts ||myShifts.length==0}/>
                <SelectComponent selectedValue={selectedNurse?.id}
                                 display={selectedNurse?.name}
                                 placeholder={"Hemşire Seçiniz"}
                                 list={nurseList ||[]}
                                 onValueChange={selectNurse}
                                 label={"firstName"}
                                 label2={"lastName"}
                                 value={"id"}
                                 disabled={!nurseList ||nurseList.length==0 || !selectedMyShift}/>
                <SelectComponent selectedValue={selectedShift?.id}
                                 display={selectedShift?convertDate(selectedShift.startDate):""}
                                 placeholder={"Hemşirenin Vardiyasını Seçiniz"}
                                 list={selectedNurseShifts?.filter((item:ShiftType)=> item.nurseId===selectedNurse?.id) ||[]}
                                 onValueChange={selectShift}
                                 label={"startDate"}
                                 label2={"endDate"}
                                 value={"id"}
                                 disabled={!selectedNurseShifts|| selectedNurseShifts.length==0 || !selectedNurse} />
                <SmallButton onPress={() => {createShiftRequest()}}
                             text={"Değişim Talep Et"}
                             color={(!selectedMyShift || !selectedShift || !selectedNurse)?"gray.300":"blue.300"}
                             textColor={"white"}
                             textSize={'16'}
                             disabled={!selectedMyShift || !selectedShift || !selectedNurse}/>
            </VStack>
            <Modal isOpen={isOpen} onClose={closeModal}>
                <ModalContent/>
            </Modal>

        </Stack>
    );
}
export default CreateShiftRequestContent;
