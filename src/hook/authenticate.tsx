import { useContext, useEffect } from "react";
import { authenticateUser } from "../helper/fetch";
import { clearSession, getUserId, setUserId } from "../session";
import { useLocation, useNavigate } from "react-router-dom";
import { ToasterContext } from "../context/toaster-context";

const UseAuthenticate = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const { addToast } = useContext(ToasterContext);
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
        }
    }, [getUserId()]);
    return <div></div>;
};

export default UseAuthenticate;
