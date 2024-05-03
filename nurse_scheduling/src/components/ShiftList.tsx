import React, { useState } from 'react';
import { Center, Checkbox, Text } from 'native-base';

type Props = {
    checked: boolean;
    setChecked: (newCheckedDates: (prev: string[]) => string[]) => void;
    date: string;
};

const ShiftList = React.memo(function ShiftList(props: Props) {
    const { checked: propChecked, setChecked, date } = props;
    const [checked, setLocalChecked] = useState(propChecked);

    const onChange = () => {
        const newChecked = !checked;
        setLocalChecked(newChecked);
        if (newChecked) {
            setChecked((prev: string[]) => [...prev, date]);
        } else {
            setChecked((prev: string[]) => prev.filter((item) => item !== date));
        }
    };

    return (
        <Center
            flexDirection="row"
            flex={1}
            justifyContent={'space-between'}
            width={'100%'}
            paddingX={15}
            paddingY={15}
            backgroundColor={'blue.300'}>
            <Checkbox
                size="md"
                defaultIsChecked={propChecked}
                isChecked={propChecked}
                onChange={() => onChange()}
                value="blue"
                colorScheme='green'
                aria-label={date}
            />
            <Text fontSize={18} fontWeight={"bold"}>{date}</Text>
        </Center>
    );
});
export default ShiftList;
