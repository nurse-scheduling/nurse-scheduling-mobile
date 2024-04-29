import {BASE_URL} from "./auth.tsx";
import {useFetch} from "./utilities.tsx";

export const useGetDates = (month:string,credentials?:string) => {
    const url = `${BASE_URL}/api/dates?month=${month}`;
    const {data} = useFetch(url,credentials);
    let days: string[] | undefined;
    if (data) {
        days = data as string[];
    }
    return {days};

}
