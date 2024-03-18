import React from 'react';
import {Center, Checkbox, Text} from 'native-base';


type Props = {
    checked: boolean;
    setChecked: (newCheckedDates: (prev: string[]) => string[]) => void;
    date: string;
};

export default function ShiftList(props: Props) {
    let {checked,setChecked, date} = props;

    const onChange = () => {
        if (checked) {
            setChecked((prev: string[]) => prev.filter((item) => item !== date));
        } else {
            setChecked((prev: string[]) => [...prev, date]);
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
            backgroundColor={'#c8e3ff'}>
            <Checkbox size="md" defaultIsChecked={checked} onChange={() => onChange()} value="blue" colorScheme='green'
                      aria-label={date}/>
            <Text fontSize={18} fontWeight={"bold"}>{date}</Text>
        </Center>
    );
}
