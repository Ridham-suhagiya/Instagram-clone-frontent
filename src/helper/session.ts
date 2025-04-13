export const getUserDetails = () => {
    return JSON.parse(sessionStorage.getItem("user") ?? "{}");
};

export const setUser = (data: any) => {
    data && sessionStorage.setItem("user", JSON.stringify(data));
};

export const setAccessToken = (token: string) => {
    token && sessionStorage.setItem("auth_token", token);
};

export const getAccessToken = () => {
    return sessionStorage.getItem("auth_token") ?? "";
};
