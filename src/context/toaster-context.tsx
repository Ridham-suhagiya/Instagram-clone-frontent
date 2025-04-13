/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useState } from "react";
import Toaster from "../components/toaster/toaster";
import { ToasterType } from "../type";

interface ToasterContextType {
    addToast: (message: string, type: ToasterType) => void;
}

export const ToasterContext = createContext<ToasterContextType>({
    addToast: () => {},
});

// Create a provider component
export const ToasterContextProvider = ({ children }: any) => {
    const [toasts, setToasts] = useState<any>([]);

    // Function to add a new toast
    const addToast = (message: string, type: ToasterType) => {
        const id = Date.now(); // Unique ID for each toast
        setToasts((prevToasts: any) => [...prevToasts, { id, message, type }]);
        // Automatically remove the toast after 5 seconds
        setTimeout(() => {
            removeToast(id as any);
        }, 5000);
    };

    // Function to remove a toast by ID
    const removeToast = (id: string) => {
        setToasts((prevToasts: any) => prevToasts.filter((toast: any) => toast.id !== id));
    };

    return (
        <ToasterContext.Provider value={{ addToast }}>
            {children}
            {toasts.map((toast: any) => (
                <Toaster key={toast.id} message={toast.message} type={toast.type} />
            ))}
        </ToasterContext.Provider>
    );
};
