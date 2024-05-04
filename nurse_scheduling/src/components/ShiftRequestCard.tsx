import React  from "react";
import {Box, Text, VStack} from "native-base";
import ChangeShiftRequestIcon from "../assets/icons/ChangeShiftRequestIcon.tsx";
import {ExchangeShiftRequestType} from "../types/ExchangeShiftRequestType.tsx";

type Props={
    Shift:ExchangeShiftRequestType;
}

function ShiftRequestCard(Props:Props): React.JSX.Element {
    return (
        <Box backgroundColor={'gray.200'}
             minWidth={'90%'}
             height={300}
             justifyContent={'center'}
             alignItems={'center'}
             marginY={5}
             borderRadius={20}
             borderColor={'black'}
             borderStyle={'solid'}
             borderWidth={1}>
            <VStack space={3} alignItems={'center'} justifyContent={'center'} flexWrap={'wrap'}>
                <VStack alignItems={'center'} space={1}>
                    <Text fontSize={20} maxWidth={200} textAlign={'center'}>
                        {Props.Shift.requestedFullName}
                    </Text>
                    <Text fontSize={20}>
                        {Props.Shift.requesterShiftStartDate}
                    </Text>
                    <Text fontSize={20}>
                        {Props.Shift.requesterShiftEndDate}
                    </Text>
                </VStack>
                <ChangeShiftRequestIcon rotation={90} color={'black'} />
                <VStack alignItems={'center'} space={1}>
                    <Text fontSize={20} maxWidth={200} textAlign={'center'}>
                        {Props.Shift.requesterFullName}
                    </Text>
                    <Text fontSize={20}>
                        {Props.Shift.requestedShiftStartDate}
                    </Text>
                    <Text fontSize={20}>
                        {Props.Shift.requestedShiftEndDate}
                    </Text>
                </VStack>
            </VStack>
        </Box>
    );
}

export default ShiftRequestCard;
