import React, { createContext } from "react";

export interface InstagramProfile {
    id: string;
    username: string;
    account_type: string;
    media_count: number;
    biography?: string;
    website?: string;
    profile_picture_url: string;
    followers_count?: number;
    follows_count?: number;
}

interface ProfileContextType {
    setProfile: (profile: any) => void;
    profile: InstagramProfile | {};
}

export const ProfileContext = createContext<ProfileContextType>({
    setProfile: () => {},
    profile: {},
});

const ProfileContextProvider = ({ children }: any) => {
    const [profile, setProfile] = React.useState<InstagramProfile | {}>({} as InstagramProfile);

    return <ProfileContext.Provider value={{ setProfile, profile }}>{children}</ProfileContext.Provider>;
};

export default ProfileContextProvider;
