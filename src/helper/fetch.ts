import { URI } from "../constants/variable";
import { fetchWrapper } from "./fetchWrapper";

export const fetchUserDetails = async () => {
    return await fetchWrapper(`${URI}/instagram/profile`);
};

export const fetchUserFeeds = async () => {
    return await fetchWrapper(`${URI}/instagram/feeds`);
};

export const postNewComment = async (mediaId: string, message: string) => {
    return await fetchWrapper(`${URI}/instagram/comment`, {
        method: "POST",
        body: JSON.stringify({ mediaId, message }),
        headers: {
            "Content-Type": "application/json",
        },
    });
};

export const replyToAComment = async (commentId: string, message: string) => {
    return await fetchWrapper(`${URI}/instagram/reply`, {
        method: "POST",
        body: JSON.stringify({ commentId, message }),
        headers: {
            "Content-Type": "application/json",
        },
    });
};

export const authenticateUser = async () => {
    return await fetchWrapper(`${URI}/instagram/authenticateSession`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
};
