import {BASE_URL} from "./auth.tsx";
import {postFetch, useFetch} from "./utilities.tsx";
import {WorkDayType} from "../types/WorkDayType.tsx";

export const postWorkDays = async (workDays:Date[] , credentials: string,month:string,year:string) => {
    const url = `${BASE_URL}/api/workdays`;
    const payload = {workDate:workDays,month:month,year:year};
    return await postFetch(url, payload, credentials);
}

export const useFetchWorkDays = (credentials: string,isFocused:boolean,month:string,year:string) => {
    const url = `${BASE_URL}/api/workdays?month=${month}&year=${year}`;
    const {data,isLoading} = useFetch(url,isFocused,credentials);
    let workDays : WorkDayType | undefined;
    if(data){
        workDays = data;
    }
    return {workDays,isLoading};
}
