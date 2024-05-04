import {useFetch} from "./utilities.tsx";
import {BASE_URL} from "./auth.tsx";
import {NurseType} from "../types/NurseType.tsx";

export function useFetchNursesList(credentials:string,isFocused:boolean,department:string) {
    let url = `${BASE_URL}/api/nurses/listNurses?&department=${department}`;

    const { data, isLoading, error } = useFetch(url, isFocused,credentials);

    let nurses: NurseType[] | undefined;

    if (data ) {
        nurses = data as NurseType[];
    }

    return { nurses, isLoading, error };
}
