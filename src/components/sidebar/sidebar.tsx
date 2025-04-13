import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import styles from "./sidebar.module.scss";
import LogoutIcon from "../../assets/svgs/logout";

interface SidebarLink {
    label: string;
    to: string;
    icon: React.ReactNode;
    exact?: boolean;
}

interface SidebarProps {
    className?: any;
    displayLogo?: boolean;
    links: SidebarLink[];
    defaultCollapsed?: boolean;
    hoverExpandDelay?: number;
}

const Sidebar: React.FC<SidebarProps> = ({
    className = styles,
    links,
    displayLogo = false,
    defaultCollapsed = false,
    hoverExpandDelay = 300,
}) => {
    const [collapsed, setCollapsed] = useState(defaultCollapsed);
    const [hovering, setHovering] = useState(false);
    const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const location = useLocation();
    const sidebarRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    // Handle hover to expand
    const handleLogout = () => {
        // Clear session (you might want to use your actual session clearing logic)
        localStorage.removeItem("authToken"); // or sessionStorage
        sessionStorage.clear();

        navigate("/login");
    };
    const handleMouseEnter = () => {
        if (collapsed) {
            hoverTimeoutRef.current = setTimeout(() => {
                setHovering(true);
            }, hoverExpandDelay);
        }
    };

    const handleMouseLeave = () => {
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
        }
        if (hovering) {
            setHovering(false);
        }
    };

    // Toggle collapsed state
    const toggleCollapse = () => {
        setCollapsed(!collapsed);
        setHovering(false);
    };

    // Close sidebar when clicking outside (for mobile)
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
                setHovering(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Clear timeout on unmount
    useEffect(() => {
        return () => {
            if (hoverTimeoutRef.current) {
                clearTimeout(hoverTimeoutRef.current);
            }
        };
    }, []);

    const isExpanded = !collapsed || hovering;

    // Check if link is active
    const isLinkActive = (link: SidebarLink) => {
        return location.pathname.endsWith(link.to);
    };
    return (
        <div
            ref={sidebarRef}
            className={`${className.sidebar} ${collapsed ? className.collapsed : ""} ${
                hovering ? className.hovering : ""
            }`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className={className.sidebar__header}>
                {displayLogo && (
                    <img
                        src={logo}
                        alt="Instagram logo"
                        className={`${className.sidebar__logo} ${collapsed ? className.collapsedLogo : ""}`}
                    />
                )}
                <button
                    className={className.sidebar__toggle}
                    onClick={toggleCollapse}
                    aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                >
                    {collapsed ? (
                        <span className={className.chevronRight}>&#8250;</span>
                    ) : (
                        <span className={className.chevronLeft}>&#8249;</span>
                    )}
                </button>
            </div>

            <nav className={className.sidebar__nav}>
                {links.map((link, index) => (
                    <Link
                        to={link.to}
                        className={`${className.sidebar__nav__link} ${isLinkActive(link) ? className.active : ""}`}
                        key={index}
                        title={isExpanded ? "" : link.label}
                    >
                        <span className={className.sidebar__nav__icon}>{link.icon}</span>
                        {isExpanded && <span className={className.sidebar__nav__label}>{link.label}</span>}
                    </Link>
                ))}
                <button
                    onClick={handleLogout}
                    className={`${className.sidebar__nav__link} ${className.sidebar__nav__logout}`}
                    title={isExpanded ? "" : "Logout"}
                >
                    <span className={className.sidebar__nav__icon}>
                        <LogoutIcon />
                    </span>
                    {isExpanded && <span className={className.sidebar__nav__label}>Logout</span>}
                </button>
            </nav>
        </div>
    );
};

export default Sidebar;
