import ProfileContextProvider from "./profile-context";
import RouterContextProvider from "./route";
import { ToasterContextProvider } from "./toaster-context";

interface AllContextType {
    children: any;
}

const AllContext: React.FC<AllContextType> = (props) => {
    const { children } = props;
    return (
        <RouterContextProvider>
            <ProfileContextProvider>
                <ToasterContextProvider>{children}</ToasterContextProvider>
            </ProfileContextProvider>
        </RouterContextProvider>
    );
};

export default AllContext;
