import React from "react";
import { motion } from "framer-motion";
import styles from "./profile-header.module.scss";

interface ProfileHeaderProps {
    profile: any;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profile }) => {
    return (
        <div className={styles.header}>
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            >
                <div className={styles.avatarContainer}>
                    <img src={profile?.profile_picture_url} alt="User Avatar" className={styles.avatar} />
                    {profile?.account_type === "BUSINESS" && <div className={styles.badge}>PRO</div>}
                </div>
            </motion.div>

            <motion.div
                className={styles.details}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
            >
                <h1 className={styles.username}>{profile?.username || "Username"}</h1>
                <div className={styles.accountType}>{profile?.account_type.toLowerCase()}</div>
            </motion.div>
        </div>
    );
};

export default ProfileHeader;
