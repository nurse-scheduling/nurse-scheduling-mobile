import {Button, Text} from "native-base";

type Props={
    onPress:()=>void;
    text:string;
    color:string;
    textColor:string;
    textSize?:string;
    buttonSize?:string;
    disabled?:boolean;
}

function SmallButton(Props:Props) {
    return (
        <Button backgroundColor={Props.color} onPress={Props.onPress} disabled={Props.disabled}>
            <Text fontSize={Props.textSize} color={Props.textColor}>{Props.text}</Text>
        </Button>
    );
}
export default SmallButton;
