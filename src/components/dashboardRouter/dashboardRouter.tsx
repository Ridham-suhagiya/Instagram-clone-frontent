import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../../views/dashboard/dashboard";
import UserProfile from "../../views/profile/profile";
import { dashboard, feed, login, profile } from "../../constants/variable";
import InstagramLogin from "../../views/login/login";
import Feeds from "../../views/feeds/feeds";
import { getUserId } from "../../session";

const ChattinSystem = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to={getUserId() ? `/${dashboard}` : `/${login}`} />} />
                <Route path={`/${login}`} element={<InstagramLogin />} />
                <Route path={`/${dashboard}`} element={<Dashboard />}>
                    <Route path={`${feed}`} element={<Feeds />} />
                    <Route path={`${profile}`} element={<UserProfile />} />
                </Route>

                <Route path={`/${profile}`} element={<UserProfile />} />
            </Routes>
        </BrowserRouter>
    );
};
export default ChattinSystem;
