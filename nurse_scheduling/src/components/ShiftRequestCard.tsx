import React  from "react";
import {Box, Text, VStack} from "native-base";
import ChangeShiftRequestIcon from "../assets/icons/ChangeShiftRequestIcon.tsx";

type Props={
    Shift:{
        id: string;
        from: string;
        to: string;
        fromStartDate: string;
        fromEndDate: string;
        fromStartTime: string;
        fromEndTime: string;
        toStartDate: string;
        toEndDate: string;
        toStartTime: string;
        toEndTime: string;
    }
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
                        {Props.Shift.to}
                    </Text>
                    <Text fontSize={20}>
                        {Props.Shift.toStartDate} - {Props.Shift.toStartTime}
                    </Text>
                    <Text fontSize={20}>
                        {Props.Shift.toEndDate} - {Props.Shift.toEndTime}
                    </Text>
                </VStack>
                <ChangeShiftRequestIcon rotation={90} color={'black'} />
                <VStack alignItems={'center'} space={1}>
                    <Text fontSize={20} maxWidth={200} textAlign={'center'}>
                        {Props.Shift.from}
                    </Text>
                    <Text fontSize={20}>
                        {Props.Shift.fromStartDate} - {Props.Shift.fromStartTime}
                    </Text>
                    <Text fontSize={20}>
                        {Props.Shift.fromEndDate} - {Props.Shift.fromEndTime}
                    </Text>
                </VStack>
            </VStack>
        </Box>
    );
}

export default ShiftRequestCard;
