
import {BASE_URL} from "./auth.tsx";
import {patchFetch, useFetch} from "./utilities.tsx";
import {ExchangeShiftRequestType} from "../types/ExchangeShiftRequestType.tsx";

export const useFetchExchangeShiftsRequest = (credentials:string,isFocused:boolean) => {
    const url = `${BASE_URL}/api/exchange-shift-requests/my-requests`;
    const {data,isLoading} = useFetch(url,isFocused,credentials);
    let exchangeShiftRequests: ExchangeShiftRequestType[] | undefined;
    if(data){
        exchangeShiftRequests = data;
    }
    return {exchangeShiftRequests,isLoading};
}

export const swapShifts = async (id:string,credentials:string) => {
    const url = `${BASE_URL}/api/exchange-shift-requests/${id}/accept`;
    return await patchFetch(url,{},credentials);
}

export const rejectSwapShifts = async (id:string,credentials:string) => {
    const url = `${BASE_URL}/api/exchange-shift-requests/${id}/reject`;
    return await  patchFetch(url,{},credentials);

}

