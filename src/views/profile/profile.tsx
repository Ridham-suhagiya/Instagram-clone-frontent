import React, { useEffect, useState } from "react";
import styles from "./profile.module.scss";
import { fetchUserDetails } from "../../helper/fetch";
import { motion } from "framer-motion";
import StatsCard from "../../components/cards/state-cards";
import ProfileHeader from "../../components/profile-header/profile-header";
import PostIcon from "../../assets/svgs/Post";
import FollowerIcon from "../../assets/svgs/Follower";
import FollowingIcon from "../../assets/svgs/Following";
import { getUserId } from "../../session";

interface InstagramProfile {
    id: string;
    username: string;
    account_type: string;
    media_count: number;
    biography?: string;
    website?: string;
    profile_picture_url: string;
    followers_count?: number;
    follows_count?: number;
}

const UserProfile: React.FC = () => {
    const [profile, setProfile] = useState<InstagramProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const [data] = await fetchUserDetails();
                setProfile(data);
            } catch (err) {
                console.error("Failed to fetch profile", err);
            } finally {
                setIsLoading(false);
            }
        };
        if (getUserId()) {
            fetchProfile();
        }
    }, [getUserId()]);

    if (isLoading) {
        return (
            <div className={styles.loadingContainer}>
                <motion.div
                    className={styles.loadingSpinner}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <motion.div
                className={styles.profileSection}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <ProfileHeader profile={profile} />

                <div className={styles.contentGrid}>
                    <div className={styles.mainContent}>
                        <motion.div
                            className={styles.aboutSection}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            <h3 className={styles.sectionTitle}>About</h3>
                            {profile?.biography && <p className={styles.bio}>{profile.biography}</p>}
                            {profile?.website && (
                                <motion.a
                                    href={
                                        profile.website.startsWith("http")
                                            ? profile.website
                                            : `https://${profile.website}`
                                    }
                                    className={styles.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <span>🌐</span> {profile.website.replace(/^https?:\/\//, "")}
                                </motion.a>
                            )}
                        </motion.div>
                    </div>

                    <div className={styles.statsSection}>
                        <motion.div
                            className={styles.statsGrid}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <StatsCard
                                title="Posts"
                                value={profile?.media_count || 0}
                                icon={<PostIcon />}
                                color="#7b2cbf"
                            />
                            <StatsCard
                                title="Followers"
                                value={profile?.followers_count || 0}
                                icon={<FollowerIcon />}
                                color="#4361ee"
                            />
                            <StatsCard
                                title="Following"
                                value={profile?.follows_count || 0}
                                icon={<FollowingIcon />}
                                color="#3a0ca3"
                            />
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default UserProfile;
