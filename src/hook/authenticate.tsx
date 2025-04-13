import { useContext, useEffect } from "react";
import { authenticateUser, fetchUserDetails } from "../helper/fetch";
import { clearSession, getUserId, setUserId } from "../session";
import { useLocation, useNavigate } from "react-router-dom";
import { ToasterContext } from "../context/toaster-context";
import { ProfileContext } from "../context/profile-context";

const UseAuthenticate = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const { addToast } = useContext(ToasterContext);
    const { setProfile } = useContext(ProfileContext);
    const userId = queryParams.get("user_id");
    setUserId(userId);
    useEffect(() => {
        if (!getUserId()) {
            authenticateUser()
                .then((res: any) => {
                    const [data, response] = res;
                    if (response.status !== 200) {
                        addToast("User authentication Failed", "error");
                        navigate("/login");
                        clearSession();
                        return;
                    }
                    const userId = queryParams.get("user_id");
                    setUserId(userId);
                    addToast(data.message, "success");
                })
                .catch(() => {
                    addToast("User authentication Failed", "error");
                    navigate("/login");
                });
        } else {
            const fetchProfile = async () => {
                try {
                    const [data] = await fetchUserDetails();
                    setProfile(data);
                } catch (err) {
                    console.error("Failed to fetch profile", err);
                }
            };
            fetchProfile();
        }
    }, [getUserId()]);
    return <div></div>;
};

export default UseAuthenticate;
