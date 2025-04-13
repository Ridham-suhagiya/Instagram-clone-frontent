import React, { useEffect } from "react";

interface UsemobileType {
    isMobile: boolean;
}

const Usemobile = (): UsemobileType => {
    const [isMobile, setIsMobile] = React.useState<boolean>(false);
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    return { isMobile };
};

export default Usemobile;
