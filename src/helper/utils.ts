/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { getUserDetails } from "./session";
import { get } from "lodash";
import { NO_AUTH_ROUTES } from "../constants/variable";

export const useEffectAsync = async (callbackFun: any, dependencieArrya: any[]) => {
    return useEffect(callbackFun, dependencieArrya);
};

export const getCurrentUserId = () => {
    const userDetails = getUserDetails();
    return get(userDetails, "ID", "");
};

export const getCurrentUserName = () => {
    const userDetails = getUserDetails();
    return get(userDetails, "Username", "");
};

export const getCurrentUserEmail = () => {
    const userDetails = getUserDetails();
    return get(userDetails, "Email", "");
};

export const checkIfRouteIsNoAuth = (currPath: string) => {
    return NO_AUTH_ROUTES.some((route) => currPath.includes(route));
};
