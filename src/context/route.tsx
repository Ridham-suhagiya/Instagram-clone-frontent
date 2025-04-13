import { createContext, JSX, useState } from "react";

interface RouterContextType {
    allRoutingElements: any[];
    setAllRoutingElements: (state: any[]) => void;
    outlet: any;
    setOutlet: (state: any) => void;
}

export const RouterContext = createContext<RouterContextType>({
    allRoutingElements: [],
    setAllRoutingElements: () => {},
    outlet: null,
    setOutlet: () => {},
});

const RouterContextProvider = (props: any): JSX.Element => {
    const [allRoutingElements, setAllRoutingElements] = useState<any[]>([]);
    const [outlet, setOutlet] = useState<any>(null);

    return (
        <RouterContext.Provider value={{ allRoutingElements, setAllRoutingElements, outlet, setOutlet }}>   
            {props.children}
        </RouterContext.Provider>
    );
};

export default RouterContextProvider;
