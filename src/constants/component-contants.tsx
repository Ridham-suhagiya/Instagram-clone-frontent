import FollowerIcon from "../assets/svgs/Follower";
import FollowingIcon from "../assets/svgs/Following";
import HomeIcon from "../assets/svgs/home";
import InfoIcon from "../assets/svgs/Info";
import PostIcon from "../assets/svgs/Post";
import ProfileIcon from "../assets/svgs/profile";

export const dashbaordSidebar = [
    { label: "Home", to: "feed", icon: <HomeIcon fill="#000" /> },
    { label: "Profile", to: "profile", icon: <ProfileIcon fill="#000" /> },
    // { label: "Settings", to: "/settings", icon: <SettingsIcon fill="#000" /> },
];

export const profileSidebarLinks = [
    {
        label: "Profile Picture",
        to: "picture",
        icon: <ProfileIcon />,
    },
    {
        label: "Username",
        to: "username",
        icon: <ProfileIcon />,
    },
    {
        label: "Bio",
        to: "bio",
        icon: <InfoIcon />,
    },
    {
        label: "Posts",
        to: "posts",
        icon: <PostIcon />,
    },
    {
        label: "Followers",
        to: "followers",
        icon: <FollowerIcon />,
    },
    {
        label: "Following",
        to: "following",
        icon: <FollowingIcon />,
    },
];
