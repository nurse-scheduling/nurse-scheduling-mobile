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
    const month = (new Date().getMonth() + 1).toString();
    const year = new Date().getFullYear().toString();
    const {shifts} = useGetShiftsByMonthAndYear(nurse.id, month, year, credentials, isFocused);
    const [events, setEvents] = useState<ShiftEvent[]>([]); // Type annotation for events

    useEffect(() => {
        if (shifts) {
            setEvents(shifts.map((shift) => {
                const start = new Date(shift.startDate);
                const end = new Date(shift.endDate);
                const utcStart = new Date(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate(), start.getUTCHours(), start.getUTCMinutes());
                const utcEnd = new Date(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate(), end.getUTCHours(), end.getUTCMinutes());

                return {
                    title: "",
                    start: utcStart,
                    end: utcEnd
                }
            }));
        }
    }, [shifts]);

    return (
        <Calendar mode={"week"} events={events} height={902}/>
    );
}
