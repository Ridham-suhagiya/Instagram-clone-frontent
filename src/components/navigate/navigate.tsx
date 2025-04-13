import { useCallback } from "react";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

interface NavigateType {
    (to: string): void;
}

const useNavigate = (): NavigateType => {
    const navigate = useCallback((to: string) => {
        history.push(to);
        window.dispatchEvent(new Event("popstate"));
    }, []);

    return navigate;
};

export default useNavigate;


