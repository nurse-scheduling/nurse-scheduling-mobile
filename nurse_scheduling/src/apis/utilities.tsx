import { useEffect, useState } from "react";

const fetchData = async (url: string, method: string, payload: any, credentials?: string | null) => {
    const headers: { [key: string]: string } = {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
    };

    if (credentials) {
        headers['Authorization'] = `Basic ${credentials}`;
    }

    const requestOptions = await fetch(url, {
        method: method,
        headers: headers,
        body: JSON.stringify(payload),
    });
    let response = {};
    await requestOptions.text().then((text) => {
        response = isJsonString(text) ? JSON.parse(text) : text;
    });

    if (requestOptions.status === 200) {
        return response;
    } else if (requestOptions.status === 400) {
        throw new Error("Bad Request");
    } else if (requestOptions.status === 401) {
        throw new Error("Unauthorized");
    } else if (requestOptions.status === 403) {
        throw new Error("Forbidden");
    } else {
        throw new Error("Something went wrong");
    }
}

export const postFetch = async (url: string, payload: any, credentials?: string) => {
    return await fetchData(url, 'POST', payload, credentials);
}

export const useFetch = (url: string,isFocused:boolean, credentials?: string | null) => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<any>();
    const [error, setError] = useState<string>();

    useEffect(() => {
        const fetchUrl = async () => {
            setData(null);
            setIsLoading(true);
            try {
                const headers: { [key: string]: string } = {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                };

                if (credentials) {
                    headers['Authorization'] = `Basic ${credentials}`;
                }

                const requestOptions = {
                    method: "GET",
                    headers: headers,
                };
                const response = await fetch(url, requestOptions);
                let responseData = undefined;
                if (response.status === 400) {
                    setError("Bad Request");
                }
                if (response.status === 401) {
                    setError("Unauthorized");
                }
                if (!response.ok) {
                    setError(`Request failed with status ${response.status}`);
                }
                await response.text().then((text) => {
                    responseData = isJsonString(text) ? JSON.parse(text) : text;
                });

                setData(responseData);
            } catch (error: any) {
                console.log(error);
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        if (url) {
            fetchUrl();
        }
    }, [url, credentials,isFocused]);

    return { data, isLoading, error };
};

export const patchFetch = async (url: string, payload: any, credentials?: string | null) => {
    return await fetchData(url, 'PATCH', payload, credentials);
}

const isJsonString=(str:string) =>{
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
