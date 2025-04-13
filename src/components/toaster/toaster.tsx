import React from "react";
import styles from "./toaster.module.scss";
import { ToasterType } from "../../type";

interface ToasterComponent {
    message: string;
    type: ToasterType;
}
const Toaster: React.FC<ToasterComponent> = ({ message, type }) => (
    <div className={`${styles.toaster} ${styles[type]}`}>{message}</div>
);

export default Toaster;
