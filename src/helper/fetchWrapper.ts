import { get } from "lodash";
import { clearSession, getUserId } from "../session";

const transformResponse = async (response: Response): Promise<[any, Response]> => {
    const contentType = response.headers.get("Content-Type");
    let data = null;
    if (contentType) {
        switch (true) {
            case contentType.includes("application/json"):
                data = await response.json();
                break;
            case contentType.includes("application/octet-stream"):
                data = await response.blob();
                break;
        }
    }
    return [data, response];
};

export const fetchWrapper = async (url: string, requestOptions: RequestInit = {}): Promise<[any, Response]> => {
    requestOptions = {
        ...requestOptions,
        headers: {
            user_id: getUserId() || "",
            ...get(requestOptions, "headers", {}),
        },
    };
    requestOptions["method"] = get(requestOptions, "method", "GET");
    const response = await fetch(url, requestOptions);
    if (response.status === 401) {
        clearSession();
        return [{}, response];
    } else {
        return await transformResponse(response);
    }
};
