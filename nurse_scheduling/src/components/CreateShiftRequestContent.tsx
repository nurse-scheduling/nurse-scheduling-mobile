import React from "react";
import {Stack, Text, VStack} from "native-base";
import SelectComponent from "./SelectComponent.tsx";
import SmallButton from "./SmallButton.tsx";
import {Nurse,Shift,nurseList,shiftList,myShifts} from "../dummy/DummyData.tsx";



function CreateShiftRequestContent(): React.JSX.Element {
    const [selectedNurse, setSelectedNurse] = React.useState<Nurse>();
    const [selectedShift, setSelectedShift] = React.useState<Shift>();
    const [selectedMyShift, setSelectedMyShift] = React.useState<Shift>();

    const selectNurse = (nurseId: string) => {
        setSelectedNurse(nurseList.find((nurse: Nurse) => nurse.id == nurseId))
        setSelectedShift(undefined)
    }
    const selectShift = (shiftId: string) => {
        setSelectedShift(shiftList.find((shift: Shift) => shift.id == shiftId))
    }
    const selectMyShift = (shiftId: string) => {
        setSelectedMyShift(myShifts.find((shift: Shift) => shift.id == shiftId))
    }
    return (
        <Stack space={5} alignItems={"center"} paddingTop={32}>
            <Text fontSize={'xl'}>
                Vardiya Değişim Talebi Oluştur
            </Text>
            <VStack space={10} maxW="300">
                <SelectComponent selectedValue={selectedMyShift?.id}
                                 display={selectedMyShift?.startDate || '' + selectedMyShift?.startTime}
                                 placeholder={"Vardiyanızı Seçiniz"}
                                 list={myShifts}
                                 onValueChange={selectMyShift}
                                 label={"startDate"}
                                 value={"id"}
                                 disabled={myShifts.length<0}/>
                <SelectComponent selectedValue={selectedNurse?.id}
                                 display={selectedNurse?.name}
                                 placeholder={"Hemşire Seçiniz"}
                                 list={nurseList}
                                 onValueChange={selectNurse}
                                 label={"name"}
                                 value={"id"}
                                 disabled={nurseList.length<0 || !selectedMyShift}/>
                <SelectComponent selectedValue={selectedShift?.id}
                                 display={selectedShift?.startDate || '' + selectedShift?.startTime}
                                 placeholder={"Hemşirenin Vardiyasını Seçiniz"}
                                 list={shiftList.filter((item:Shift)=> item.nurseId===selectedNurse?.id)}
                                 onValueChange={selectShift}
                                 label={"startDate"}
                                 value={"id"}
                                 disabled={shiftList.length<0 || !selectedNurse} />
                <SmallButton onPress={() => {console.log("Sa");}}
                             text={"Değişim Talep Et"}
                             color={(!selectedMyShift || !selectedShift || !selectedNurse)?"gray.300":"blue.300"}
                             textColor={"white"}
                             textSize={'16'}
                             disabled={!selectedMyShift || !selectedShift || !selectedNurse}/>
            </VStack>

        </Stack>
    );
}
export default CreateShiftRequestContent;
