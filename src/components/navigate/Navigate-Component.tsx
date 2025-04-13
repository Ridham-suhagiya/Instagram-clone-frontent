import React from "react";
import useNavigate from "./navigate";

interface NavigateComponentType {
    to: string;
}

const NavitateComponent: React.FC<NavigateComponentType> = (props) => {
    const { to } = props;
    const navigate = useNavigate();
    console.log("ivifun");
    navigate(to);
    return <div></div>;
};

export default NavitateComponent;
