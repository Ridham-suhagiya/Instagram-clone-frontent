import React from "react";
import useNavigate from "../navigate/navigate";

interface LinkProps {
    to: string;
    children: React.ReactNode;
    className: any;
}

const Link: React.FC<LinkProps> = ({ to, children, className }) => {
    const navigate = useNavigate();
    const handleClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        navigate(to);
    };

    return (
        <a href={to} onClick={handleClick} className={className} aria-disabled>
            {children}
        </a>
    );
};

export default Link;
