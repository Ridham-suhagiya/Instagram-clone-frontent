export const setUserId = (userId: string | null) => {
    if (userId) {
        !getUserId() && sessionStorage.setItem("userId", userId);
    }
};
export const getUserId = () => {
    return sessionStorage.getItem("userId");
};

export const clearSession = () => {
    sessionStorage.removeItem("userId");
};
