import {BASE_URL} from "./auth.tsx";
import {postFetch} from "./utilities.tsx";
import {WorkDayType} from "../types/WorkDayType.tsx";

export const usePostWorkDays = async (workDays: WorkDayType[], credentials: string) => {
    const url = `${BASE_URL}/api/workdays/generate`;
    const payload = {
        workDays: workDays
    };
    return await postFetch(url, payload, credentials);
}