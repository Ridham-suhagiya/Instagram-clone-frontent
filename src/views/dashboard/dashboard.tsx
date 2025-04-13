// File: Dashboard.tsx
import React from "react";
import styles from "./Dashboard.module.scss";
import Sidebar from "../../components/sidebar/sidebar";
import { Outlet } from "react-router-dom";
import { dashbaordSidebar } from "../../constants/component-contants";
import UseAuthenticate from "../../hook/authenticate";

const Dashboard: React.FC = () => {
    UseAuthenticate();
    return (
        <div className={styles.dashboardContainer}>
            <Sidebar links={dashbaordSidebar} className={styles} displayLogo={true} defaultCollapsed={false} />

            <main className={styles.mainContent}>
                <Outlet />
            </main>
        </div>
    );
};

export default Dashboard;
