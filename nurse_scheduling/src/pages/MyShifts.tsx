import {Calendar} from 'react-native-big-calendar'
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../contexts/AuthContext.tsx";
import {useGetShiftsByMonthAndYear} from "../apis/shifts.tsx";
import {useIsFocused} from "@react-navigation/native";

interface ShiftEvent {
    title: string;
    start: Date;
    end: Date;
}
export default function MyShifts() {
    const {credentials,nurse} = useContext(AuthContext);
    const isFocused = useIsFocused();
    const month = (new Date().getMonth()+1).toString();
    const year = new Date().getFullYear().toString();
    const {shifts} = useGetShiftsByMonthAndYear(nurse.id,month,year,credentials,isFocused);
    const [events, setEvents] = useState<ShiftEvent[]>([]); // Type annotation for events
    useEffect(() => {
        if (shifts) {
            setEvents(shifts.map((shift) => {
                return {
                    title: "",
                    start: new Date(shift.startDate),
                    end: new Date(shift.endDate)
                }
            }));
        }
    },[shifts]);
    return (
        <Calendar mode={"week"} events={events} height={902}/>
    );

}
