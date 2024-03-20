import {Calendar} from 'react-native-big-calendar'
import {useContext} from "react";
import {AuthContext} from "../contexts/AuthContext.tsx";


export default function MyShifts() {
    const {nurse} = useContext(AuthContext);
    const events = [
        {
            title: nurse.firstName+" "+nurse.lastName,
            start: new Date(2024, 2, 18, 0, 0),
            end: new Date(2024, 2, 18, 8, 0),
        },
        {
            title: nurse.firstName+" "+nurse.lastName,
            start: new Date(2024, 2, 19, 8, 0),
            end: new Date(2024, 2, 19, 16, 0),
        },
    ]
    return (
        <Calendar mode={"week"} events={events} height={902}/>
    );

}
