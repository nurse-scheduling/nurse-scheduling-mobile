import React, { useContext, useEffect, useState } from "react";
import {
    Button,
    FlatList,
    Modal,
    Pressable,
    Stack,
    Text,
    Spinner,
} from "native-base";
import SmallButton from "./SmallButton.tsx";
import ShiftRequestCard from "./ShiftRequestCard.tsx";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthContext } from "../contexts/AuthContext.tsx";
import {
    rejectSwapShifts,
    swapShifts,
    useFetchExchangeShiftsRequest,
} from "../apis/exchangeShiftsRequest.tsx";
import { ExchangeShiftRequestType } from "../types/ExchangeShiftRequestType.tsx";

function ChangeShiftRequestContent() {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedShift, setSelectedShift] = useState<ExchangeShiftRequestType | null>(null);
    const navigation = useNavigation<StackNavigationProp<any>>();
    const isFocused = useIsFocused();
    const { credentials, nurse } = useContext(AuthContext);
    const { exchangeShiftRequests, isLoading } = useFetchExchangeShiftsRequest(credentials, isFocused);
    const [requests, setRequests] = useState<ExchangeShiftRequestType[]>([]);

    useEffect(() => {
        exchangeShiftRequests ? setRequests(exchangeShiftRequests) : setRequests([]);
    }, [exchangeShiftRequests]);

    const changeShift = (shift: ExchangeShiftRequestType) => {
        setModalVisible(true);
        setSelectedShift(shift);
    };

    const navigateToCreateShiftRequest = () => {
        navigation.navigate("CreateShiftRequestScreen", { screen: "ChangeShiftRequest" });
    };

    const acceptShift = () => {
        if (selectedShift) {
            swapShifts(selectedShift.id, credentials).then(() => {
                removeRequest(selectedShift.id);
                setModalVisible(false);
                setSelectedShift(null);
            });
        }
    };

    const rejectShift = () => {
        if (selectedShift) {
            rejectSwapShifts(selectedShift.id, credentials).then(() => {
                removeRequest(selectedShift.id);
                setModalVisible(false);
                setSelectedShift(null);
            });
        }
    };

    const removeRequest = (id: string) => {
        setRequests(requests.filter((request) => request.id !== id));
    };

    if (nurse.role === "CHARGE") {
        return (
            <Stack space={2} alignItems={"center"} paddingTop={72}>
                <Text fontSize={"xl"} color={"red.600"}>
                    Sorumlu Hemşireler vardiya değişim isteklerinde bulunamazlar.
                </Text>
            </Stack>
        );
    }

    return (
        <Stack space={2} alignItems={"center"} paddingTop={32}>
            <SmallButton
                onPress={navigateToCreateShiftRequest}
                text={"Vardiya Değişimi Talep Et"}
                color={"blue.300"}
                textColor={"white"}
                textSize={"16"}
            />
            <Text fontSize={"xl"}>Vardiya Değişim Taleplerim</Text>
            {isLoading ? (
                <Spinner accessibilityLabel="Loading requests" />
            ) : requests.length > 0 ? (
                <FlatList
                    data={requests}
                    renderItem={({ item }) => (
                        <Pressable onPress={() => changeShift(item)}>
                            <ShiftRequestCard Shift={item} />
                        </Pressable>
                    )}
                    keyExtractor={(item: ExchangeShiftRequestType) => item.id}
                />
            ) : (
                <Text>Hiç isteğiniz yok.</Text>
            )}
            <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
                <Modal.Content width={"2xl"}>
                    <Modal.Body>
                        <Stack space={10}>
                            <Text flexWrap={"wrap"} fontWeight={"bold"} textAlign={"center"}>
                                Seçilen tarihlerdeki vardiyanızı değiştirmek istiyor musunuz ?
                            </Text>
                            <Button.Group space={8} alignItems={"center"} justifyContent={"center"}>
                                <Button
                                    width={"16"}
                                    variant="solid"
                                    colorScheme="success"
                                    onPress={acceptShift}
                                >
                                    Evet
                                </Button>
                                <Button
                                    width={"16"}
                                    variant="solid"
                                    colorScheme="error"
                                    onPress={rejectShift}
                                >
                                    Hayır
                                </Button>
                            </Button.Group>
                        </Stack>
                    </Modal.Body>
                </Modal.Content>
            </Modal>
        </Stack>
    );
}

export default ChangeShiftRequestContent;
