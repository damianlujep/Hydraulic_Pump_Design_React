import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./components/home/Home";
import NewProject from "./components/newproject/NewProject";
import Workspace from "./components/workspace/Workspace";
import {useAuth} from "./components/contexts/AuthContext";

function App() {
    const { user } = useAuth();

    return (
        <>
            <BrowserRouter>
                    <Switch>
                        <Route
                            exact
                            path="/"
                            component={() => <Home/>}
                        />
                        <Route
                            exact
                            path="/newProject"
                            component={() => <NewProject />}
                        />
                        <Route
                            exact
                            path={`/${user.username}/workspace`}
                            component={() => <Workspace />}
                        />
                    </Switch>
            </BrowserRouter>
        </>
  );
}

export default App;