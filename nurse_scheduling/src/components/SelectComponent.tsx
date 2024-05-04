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
    label2?: string;
}
function SelectComponent(props: Props): React.JSX.Element {

    const labelChecker = (item:any) => {
        if(props.label2){
            const date = new Date(item[props.label]);
            const date2 = new Date(item[props.label2]);
            if (!isNaN(date.getTime()) && !isNaN(date2.getTime())) {
                return date.toLocaleDateString("tr-TR", { hour: '2-digit', minute: '2-digit' }) + ' - ' + date2.toLocaleDateString("tr-TR", { hour: '2-digit', minute: '2-digit' });
            }
             return item[props.label] +' ' +item[props.label2];
            }
        return item[props.label]
    }
    return (
        <Select selectedValue={props.selectedValue} display={props.display} minWidth="300"
                placeholder={props.placeholder} _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size="5"/>
        }} mt={1} onValueChange={itemValue => props.onValueChange(itemValue)} isDisabled={props.disabled}>
            {props.list.map((item:any,index:number) => (
                <Select.Item style={{alignItems:'center',justifyContent:'center'}} key={index} label={labelChecker(item)} value={item[props.value]}/>
            ))}
        </Select>
    );
}
export default SelectComponent;
