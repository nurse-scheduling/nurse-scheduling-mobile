import React from "react";
import {CheckIcon, Select} from "native-base";

type Props = {
    selectedValue: string | undefined;
    display: string | undefined;
    placeholder: string;
    list: any[];
    onValueChange: (itemValue: string) => void;
    label: string;
    value: string;
    disabled: boolean;
}
function SelectComponent(props: Props): React.JSX.Element {
    return (
        <Select selectedValue={props.selectedValue} display={props.display} minWidth="300"
                placeholder={props.placeholder} _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size="5"/>
        }} mt={1} onValueChange={itemValue => props.onValueChange(itemValue)} isDisabled={props.disabled}>
            {props.list.map((item:any,index:number) => (
                <Select.Item key={index} label={item[props.label]} value={item[props.value]}/>
            ))}
        </Select>
    );
}
export default SelectComponent;
