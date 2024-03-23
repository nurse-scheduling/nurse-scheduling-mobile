import React, {useState} from "react";
import SmallButton from "./SmallButton.tsx";
import {Button, FlatList, Modal, Pressable, Stack, Text} from "native-base";
import {ShiftRequestCardType, shiftRequests} from "../dummy/DummyData.tsx";
import ShiftRequestCard from "./ShiftRequestCard.tsx";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";

function ChangeShiftRequestContent() {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedShift, setSelectedShift] = useState<ShiftRequestCardType | null>(null);
    const navigation = useNavigation<StackNavigationProp<any>>();

    const changeShift = (shift: ShiftRequestCardType) => {
        setModalVisible(true);
        setSelectedShift(shift);
    }

    const navigateToCreateShiftRequest = () => {
        navigation.navigate("CreateShiftRequestScreen", {screen: "ChangeShiftRequest"});
    }

    return <Stack space={2} alignItems={"center"} paddingTop={32}>
      <SmallButton onPress={() => {
          navigateToCreateShiftRequest();
      }}
                   text={"Vardiya Değişimi Talep Et"}
                   color={"blue.300"}
                   textColor={"white"}
                   textSize={'16'}/>
      <Text fontSize={'xl'}>
          Vardiya Değişim Taleplerim
      </Text>
      <FlatList
          data={shiftRequests}
          renderItem={(info: { item: ShiftRequestCardType }) => {
              return <Pressable onPress={() => changeShift(info.item)}>
                  <ShiftRequestCard Shift={info.item}/></Pressable>;
          }}
          keyExtractor={(item: ShiftRequestCardType) => item.id}
      />
      <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
          <Modal.Content width={'2xl'}>
              <Modal.Body>
                  <Stack space={10}>
                      <Text flexWrap={"wrap"} fontWeight={'bold'} textAlign={'center'}>Seçilen tarihlerdeki
                          vardiyanızı değiştirmek istiyor musunuz ? </Text>
                      <Button.Group space={8} alignItems={'center'} justifyContent={'center'}>
                          <Button width={"16"} variant="solid" colorScheme="success" onPress={() => {
                              setModalVisible(false);
                          }}>
                              Evet
                          </Button>
                          <Button width={"16"} variant={"solid"} colorScheme={"error"} onPress={() => {
                              setModalVisible(false);
                          }}>
                              Hayır
                          </Button>
                      </Button.Group>
                  </Stack>
              </Modal.Body>
          </Modal.Content>
      </Modal>
  </Stack>;
}
export default ChangeShiftRequestContent;
