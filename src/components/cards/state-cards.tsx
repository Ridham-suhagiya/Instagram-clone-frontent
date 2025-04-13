import React from "react";
import { motion } from "framer-motion";
import styles from "./statsCard.module.scss";

interface StatsCardProps {
    title: string;
    value: number;
    icon: any;
    color: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, color }) => {
    return (
        <motion.div
            className={styles.card}
            style={{ borderColor: color }}
            whileHover={{ y: -5, boxShadow: `0 10px 20px ${color}20` }}
        >
            <div className={styles.icon} style={{ color }}>
                {icon}
            </div>
            <div className={styles.value} style={{ color }}>
                {value}
            </div>
            <div className={styles.title}>{title}</div>
        </motion.div>
    );
};

export default StatsCard;
