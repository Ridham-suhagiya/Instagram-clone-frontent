import RouterContextProvider from "./route";
import { ToasterContextProvider } from "./toaster-context";

interface AllContextType {
    children: any;
}

const AllContext: React.FC<AllContextType> = (props) => {
    const { children } = props;
    return (
        <RouterContextProvider>
            <ToasterContextProvider>{children}</ToasterContextProvider>
        </RouterContextProvider>
    );
};

export default AllContext;
