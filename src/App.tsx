import "./App.css";
import ChattinSystem from "./components/dashboardRouter/dashboardRouter";
import AllContext from "./context/all-context";

function App() {
    return (
        <AllContext>
            <ChattinSystem />
        </AllContext>
    );
}

export default App;
